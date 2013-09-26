~function($){
  $(function(){

    Photonote = {
      hotspot_timer: null,
      touchstart_x: 0,
      touchstart_y: 0,
      wrapper_start_x: 0,
      is_scroll_horizontal: false,
      is_scroll_vertacal: false,
      is_turning: false,
      is_sliding: false,
      is_hotspot_visible: false,
      on_backcover: false,
      is_prev: false,
      is_next: false,
      drap: false,
      drop: false,
      mouseover: false,
      mouseout: true,
      mousedown: false,
      mouseup: true,
      start_x: 0,
      start_y: 0,
      move_timer: 0,
      is_moving: false,
      base_width: 0,
      critical: 0
    }

    var photo_list = window.json.nodes;
    var pages = window.json.roots;
    var photo_more = window.json.more;

    var current_page = 1

    , $photo_frame = $('#photo_frame')

    , $photo_more = $('.thumbnail')

    //, $albums_wrapper = $photo_frame.find('#photo_frame')
    , $albums_wrapper = $photo_frame.find('#photo_frame')

    , rendered = []

    , default_id = '001'

    , template = {

      spot: [
'<img class="hotspot blink" data-action="hotspot_goto" data-spot-id="{{spot_id}}" src="http://10.2.58.132/ux_tudian/src/asset/mobile/nil.png" alt="" style="top:{{top}}%;left:{{left}}%;background-image:url({{src}});">'        

      ].join(''),

      album: [
'<div id="album_{{page_num}}" class="album-wrapper">',
'{{#photos}}',
'{{>photo}}',
'{{/photos}}',
'</div>',

      ].join(''),


/*<div class="pos-abs btn-voice">
  <a href="#" class="btn"><i class="img-stop"></i>60''</a>
  <a href="#" class="btn"><i class="img-play"></i>60''</a>
  <audio controls="controls">
    <source src="">
  Your browser does not support the audio element.
  </audio>
</div>*/



      photo: [
'<div id="{{dom_id}}" class="photo-wrapper">',
'<div class="pos-abs pagination"><span class="current">{{current_page}}</span>/<span class="total">{{total_page}}</span></div>',

'<div class="pos-abs btn-voice">',
'  <a href="javascript:;" class="btn"><i class="img-stop"></i>{{second}}"</a>',
'  <a href="javascript:;" class="btn"><i class="img-play"></i>{{second}}"</a>',
'  <audio controls="controls">',
'    <source src="{{voice}}">',
'     Your browser does not support the audio element.',
'  </audio>',
'</div>',

'{{#hotspot}}',
'{{>spot}}',
'{{/hotspot}}',
'<div data-action="hotspot_cover"  data-id="{{id}}" data-parent-id="{{parent_id}}" data-type="{{type}}" class="pos-abs img-mod"><img src="{{cover}}" /></div>',
'<div data-action="hotspot_back" data-id="{{id}}" data-parent-id="{{parent_id}}" data-type="{{type}}"><img draggable="false" class="photo" src="{{src}}" alt=""></div>',
'</div>',
      ].join(''),

      backcover: [
'<div id="backcover" class="stamp second photo-wrapper">',
'  <div><img draggable="false" src="http://10.2.58.132/ux_tudian/src/asset/mobile/img_second_bg.jpg"></div>',
'  <div class="pos-rel png-box">',
'    <img draggable="false" class="second-bg" src="http://10.2.58.132/ux_tudian/src/asset/mobile/img_second_bg_p1.png">',
'    <div class="btn-wrapper"><a href="javascript:void(0);"><img draggable="false" class="img_second_bg" src="http://10.2.58.132/ux_tudian/src/asset/nil.png" alt=""></a></div>',
'    <img draggable="false" class="second-bg" src="http://10.2.58.132/ux_tudian/src/asset/mobile/img_second_bg_p2.png">',
'  </div>',
'</div>'
      ].join(''),

      more: [
'<a data-action="download" href="javascript:;">',
'<img src="{{url}}"/>',
'</a>'
      ].join('')

    }


    init();


    // private
    function init(){
      // 绘制图册
      gen_albums()

      $photo_frame
      .on('mouseenter', '.hotspot', function(event){
        console.log('mouseenter')
        hotspot_active()
      })
      .on('mouseleave', '.hotspot', function(event){
        hotspot_fade()
      })
      .on('click', '[data-action="hotspot_goto"]', function(event){
        event.preventDefault()
        goto_spot(this)
      })
      .on('click', '[data-action="hotspot_back"]', function(event){
        event.preventDefault()
        back_spot(this)

        
        //hotspot_inversion()

        if(!Photonote.is_hotspot_visible){
          hotspot_active()
          hotspot_fade()
        }


      })
      .on('click', '[data-action="hotspot_cover"]', function(event){
        event.preventDefault()

        if(!Photonote.is_hotspot_visible){
          hotspot_active()
          hotspot_fade()
        }else{
          hotspot_inversion()
        }

      })

      .on('mouseup', '#photo_frame', function(event){

      //   Photonote.mouseup = true
      //   Photonote.mousedown = false
      //   drag_cancel(event)

        if($(event.target).closest('.hotspot').length){
          return
        }

        hotspot_inversion()
      })


      window.addEventListener('orientationchange', function(event){
        console.log('orientationchange')
        clear_width()
        fix_photos_wrapper()
      })

      fix_photos_wrapper()

      hotspot_fade()


    }

    function gen_albums(){
      if(!pages.length){
        return
      }

      // render albums
      pages.forEach(function(obj, idx){
        var data = {
            page_num: idx,
            photos: []
          }
          , html = ''

        data.photos.push(get_photo_data(obj))

        html = Hogan.compile(template.album).render(data, template)

        $photo_frame.append(html)
        //$albums_wrapper.append(html)

        // rendered cache
        rendered.push(get_spot_id(obj))
      })

      //more——photo
      var photo_more_html=[];
      photo_more.forEach(function(url){ 
        var data = {
          url:url
        };
        photo_more_html.push(Hogan.compile(template.more).render(data));
      })
      $photo_more.append(photo_more_html.join(''));



      
      $photo_frame.find('#photo_frame')
        .append(template.backcover)

      $('#' + get_spot_id(default_id)).show()
    }

    function clear_width(){
      // $photo_frame.find('.photo-wrapper').css({
      //   width: 'auto'
      // })
    }

    function fix_photos_wrapper(){
      var base_width = $photo_frame.find('.photo-wrapper').eq(0).width()

      Photonote.base_width = base_width
      Photonote.critical = base_width * 0.3

      console.log('base_width: ' + base_width)

      // 获取宽度并设置为像素单位
      // $photo_frame.find('.photo-wrapper').css({
      //   width: base_width
      // })

      // 设置图册容器总宽度, 实际页数 + 封底
      // $photo_frame.find('#photo_frame').css({
      //   // width: base_width * (pages.length + 1)
      //   width: base_width
      // })

      // $photo_frame.find('.')
      // $elem.data('style_width') || $elem.data('style_width', $elem.css('width'))
      // $elem.data('style_height') || $elem.data('style_height', $elem.css('height'))

    }


    function hotspot_active(){
      console.log('hotspot_active')
      clearTimeout(Photonote.hotspot_timer)
      $photo_frame.find('.hotspot').show()
      Photonote.is_hotspot_visible = true
      // console.log('active')
    }

    function hotspot_inversion(){
      console.log('inversion:' + Photonote.is_hotspot_visible)
      if(Photonote.is_hotspot_visible){
        hotspot_disable()
      }
      else{
        hotspot_active()
        hotspot_fade()
      }
    }

    function hotspot_fade(){
      console.log('hotspot_fade')
      clearTimeout(Photonote.hotspot_timer)
      Photonote.hotspot_timer = setTimeout(function(){
        $photo_frame.find('.hotspot').fadeOut('slow')
        Photonote.is_hotspot_visible = false
      }, 3000)
    }

    function hotspot_disable(){
      console.log('hotspot_disable')
      clearTimeout(Photonote.hotspot_timer)
      $photo_frame.find('.hotspot').hide()
      Photonote.is_hotspot_visible = false
    }

    function render(data){
      var $album_wrapper = $('#' + get_album_id(data.root_id))

      if(rendered.indexOf(data.dom_id) !== -1){
        var $photo_wrapper = $('#' + data.dom_id)

        $album_wrapper.find('div.photo-wrapper').hide()
        $photo_wrapper.show().find('img.expanding').show()
        $photo_wrapper.find('img.hotspot:hidden').fadeIn()
      }
      else{
        var html = Hogan.compile(template.photo).render(data, template)
          , $photo_wrapper
        $album_wrapper.append(html)

        $photo_wrapper = $('#' + data.dom_id)

        rendered.push(data.dom_id)
        $album_wrapper.find('div.photo-wrapper').hide()
        $photo_wrapper.show().find('img.hotspot:hidden').fadeIn()
      }
    }

    function objlength(obj){
      var size = 0, key;
      for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    }



    function get_photo_data(id){

      id = id || default_id

      var temp_obj = {}
        , photo_list_obj = photo_list[id]
      
      var photo_voice_obj = photo_list_obj.records

      if(photo_list_obj){
        temp_obj = Object.create(photo_list_obj)
        temp_obj.dom_id = get_spot_id(temp_obj.id)
        temp_obj.hotspot = []
        temp_obj.records =[] 
        temp_obj.total_page = pages.length + photo_more.length
        temp_obj.current_page = pages.indexOf(temp_obj.root_id || temp_obj.id) - 0 + 1

        console.log('AAAAAAAAA++++photo_list_obj')
        console.dir(photo_list_obj)

            // temp_obj.records.push({
            //   top:photo_voice_obj.pos_top,
            //   left:photo_voice_obj.pos_left,
            //   voice:photo_voice_obj.dataUrl,
            //   second:photo_voice_obj.duration
            // })

            console.log('photo_voice_obj= ' + photo_voice_obj )
            console.dir(photo_voice_obj)
          
        })


        photo_list_obj.hotspot.forEach(function(id, i){
          if(typeof photo_list[id] === 'object'){
            temp_obj.hotspot.push({
              spot_id: photo_list[id].id,
              top: photo_list[id].top,
              left: photo_list[id].left,
              src: photo_list[id].src,
              cover: photo_list[id].cover
            })
          }
        })
      }

      return temp_obj;
    }

    function get_spot_id(id){
      return 'spot_' + id || default_id
    }

    function get_album_id(root_id){
      return 'album_' + pages.indexOf(root_id)
    }

    function goto_spot(elem){
      var $elem = $(elem)
        , spot_id = $elem.attr('data-spot-id')

      $elem.siblings('img.hotspot').fadeOut()


      //缓存原始高度，96x96 or 60x60
      $elem.data('style_width') || $elem.data('style_width', $elem.css('width'))
      $elem.data('style_height') || $elem.data('style_height', $elem.css('height'))

      $elem
      .addClass('expanding')
      .animate({
        width: '100%',
        height: '100%',
        'border-radius': 0,
        'border-width': 0,
        left: 0,
        top: -(parseInt($('.photo-wrapper').css('padding-bottom').slice(0,-2))/2)
      }, function(){
        render(get_photo_data(spot_id))
      })
    }

    function back_spot(elem){
      var $elem = $(elem)
        , parent_id = $elem.attr('data-parent-id')
        , parent_dom_id = get_spot_id(parent_id)
        , $parent = null
        , type = $elem.attr('data-type')
        , id = $elem.attr('data-id')
        , photo_obj = photo_list[id]

      if(type === 'root'){
        return
      }

      $parent = $('#' + parent_dom_id)

      render({
        dom_id: parent_dom_id,
        root_id: photo_obj.root_id
      })

      var $expanded = $parent.find('img.expanding')

      $expanded
      .removeClass('expanding')
      .animate({
        width: $expanded.data('style_width'),
        height: $expanded.data('style_height'),
        left: photo_obj.left + '%',
        top: photo_obj.top + '%',
        'border-radius': '50%',
        'border-width': '0.2em'
      })

    }

    function photo_reset(){
      rendered.forEach(function(dom_id, i){
        var id = dom_id.substring(dom_id.indexOf('_') + 1)
          , $elem = $('#' + dom_id)

        $elem
        .find('img.hotspot')
        .each(function(i){
          var $spot = $(this)
            , spot_id = $spot.attr('data-spot-id')
            , photo_obj = photo_list[spot_id]
            
          $spot
          .removeClass('expanding')
          .css({
            width: $spot.data('style_width'),
            height: $spot.data('style_height'),
            left: photo_obj.left + '%',
            top: photo_obj.top + '%',
            borderRadius: '50%',
            borderWidth: '0.2em'
          })
        })
        .show()

        $elem.hide()
      })

      // show root pages
      album_reset()
    }

    function album_reset(){
      pages.forEach(function(id, i){
        var $elem = $('#' + get_spot_id(id))
        $elem.show();
      })
    }

    function display(data){
      $('#start_x')[0].innerHTML = data.start_x
      $('#start_y')[0].innerHTML = data.start_y
      $('#client_x')[0].innerHTML = data.client_x
      $('#client_y')[0].innerHTML = data.client_y
    }

  })

}(jQuery)



jQuery(document).ready(function($) {
        
        $('#share').click(function(){
            $('.modal').show();
        });
        $('.modal').click(function(){
            $('.modal').hide();
        });



        $('.thumbnail').on('click', '[data-action="download"]', function(event){
          event.preventDefault()
          if(window.confirm("下载由我图记，查看全部内容","no")){
            window.location.href="http://sohu.com"
          }
        })


        $('.footer').on('click', '[data-action="create_album"]', function(event){
          event.preventDefault()
          window.location.href="http://sohu.com"
        })


        //window.open('youworld://youwo.com');

        //window.location.href="youworld://youwo.com";
          /*try(window.location.href="youworld://youwo.com"){
            alert("ok");
          }catch(err){
            alert("err");
          }*/

        
        //console.dir(json);

      //$('.photo-wrapper').css('padding-bottom')
});

