~function($){
  $(function(){
    Photonote = {
      hotspot_timer: null,
      backspot_timer: null,
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
      critical: 0,
      photo_size:[0,0],
      photo_border:0
    }

    var photo_list = window.json.nodes
    , pages = window.json.roots
    , photo_more = window.json.more
    , current_page = 1
    , $photo_frame = $('#photo_frame')
    , $photo_more = $('.thumbnail')
    , rendered = []
    , default_id = '001'
    , template = {

      spot: [
          '<img class="hotspot blink" data-action="hotspot_goto" data-spot-id="{{spot_id}}" src="http://s5.suc.itc.cn/ux_tudian/asset/mobile/nil.png" alt="" style="top:{{top}}%;left:{{left}}%;background-image:url({{src}});" />'
      ].join('')

      , album: [
          '<div id="album_{{page_num}}" class="album-wrapper data-aid="{{page_num}}" {{#first}}data-active="on"{{/first}} {{#notfirst}}data-active="no"{{/notfirst}} >',
          '   {{#photos}}',
          '       {{>photo}}',
          '   {{/photos}}',
          '</div>'
      ].join('')

      , photo: [

          '<div class="photo-wrapper" id="{{dom_id}}">',
          '    <div class="pos-abs btn-voice {{^records_top}}hide{{/records_top}}" data-id="{{id}}" style="top:{{records_top}}%; left:{{records_left}}%;">',
          '        <a class="btn voice-hide" href="#"><i class="img-stop"></i>{{records_second}}"</a>',
          '        <a class="btn" href="#"><i class="img-play"></i>{{records_second}}"</a>',
          '        <audio controls="controls" id="audio_{{id}}">',
          '        <source type="audio/mpeg" src="{{records_voice}}"></source>',
          '            Your browser does not support the audio element.',
          '        </audio>',
          '    </div>',

          '    {{#hotspot}}',
          '    {{>spot}}',
          '    {{/hotspot}}',

          '    <div id="mod_{{id}}" data-action="hotspot_cover"  data-id="{{id}}" data-parent-id="{{parent_id}}" data-type="{{type}}" class="pos-abs img-mod picmod">',
          '        <img data-info="backcover_zoom" src="{{cover}}" style="width:{{spot_width}}px; height:{{spot_height}}px; display: inline-block;"/>',
          '    </div>',
          '    <div class="picroot" id="picroot{{id}}" data-action="hotspot_back"  data-id="{{id}}" data-parent-id="{{parent_id}}" data-type="{{type}}">',
          '        <img data-info="backcover_zoom" alt="" src="{{src}}" style="width:{{spot_width}}px; height:{{spot_height}}px; display: inline-block;" class="photo" draggable="false"/>',
          '    </div>',
          '</div>',

      ].join('')

      , photospot: [

          '<div class="photo-wrapper" id="{{dom_id}}">',
          '    <div data-action="hotspot_back"  data-id="{{id}}" data-parent-id="{{parent_id}}" data-type="{{type}}">',
          '        <img alt="" src="{{src}}" style=" display: inline-block; width:{{spot_width}}px; height:{{spot_height}}px;" class="photo" draggable="false"/>',
          '    </div>',
          '</div>',

      ].join('')

      , backcover: [
          '<div id="backcover" class="stamp second photo-wrapper">',
          '  <div><img draggable="false" src="http://s5.suc.itc.cn/ux_tudian/asset/mobile/img_second_bg.jpg"></div>',
          '  <div class="pos-rel png-box">',
          '    <img draggable="false" class="second-bg" src="http://s5.suc.itc.cn/ux_tudian/asset/mobile/img_second_bg_p1.png">',
          '    <div class="btn-wrapper"><a href="javascript:void(0);"><img draggable="false" class="img_second_bg" src="http://s5.suc.itc.cn/ux_tudian/src/asset/nil.png" alt=""></a></div>',
          '    <img draggable="false" class="second-bg" src="http://s5.suc.itc.cn/ux_tudian/asset/mobile/img_second_bg_p2.png">',
          '  </div>',
          '</div>'
      ].join('')
    }

    init();

    // private
    function init(){
      // 绘制图册
      gen_albums()

      $photo_frame
      .on('mouseenter', '.hotspot', function(event){

      })
      .on('mouseleave', '.hotspot', function(event){

      })
      .on('click', '[data-action="hotspot_goto"]', function(event){
        
        event.preventDefault()
        goto_spot(this)

          //3秒后关闭
          //2013-11-26 add 打开后3秒自动关闭图片
              //console.log('hotspot_fade')
              //clearTimeout(Photonote.openphoto_timer)
              var spotID = $(this).attr('data-spot-id');
             /* setTimeout(function(){                    
                    //$('#spot_'+spotID+' > div[data-action="hotspot_back"]').click();
                    //back_spot(this);
              }, 4000);*/
      })
      .on('click', '[data-action="hotspot_back"]', function(event){

        event.preventDefault()
        back_spot(this);

      })
      .on('click', '[data-action="hotspot_cover"]', function(event){
        event.preventDefault()

        if(!Photonote.is_hotspot_visible){
          //hotspot_active()
          
        }else{
          hotspot_inversion()
        }

      })
      .on('mouseup', '#photo_frame', function(event){

        if($(event.target).closest('.hotspot').length){
          return
        }
        hotspot_inversion();
      })

      window.addEventListener('orientationchange', function(event){
        clear_width()
        fix_photos_wrapper();
      })

      fix_photos_wrapper();
    }

    function gen_albums(){




      if(!pages.length){
        return
      }

      pages.forEach(function(obj, idx){
        var data = {
            page_num: idx,
            photos: [],
            first:!!((idx+1) == 1),
            notfirst:!((idx+1) == 1)
          } , html = '';

          console.dir(data);

        data.photos.push(get_photo_data(obj));
        html = Hogan.compile(template.album).render(data, template);
        $photo_frame.append(html);
        rendered.push(get_spot_id(obj));
      })
   
      $photo_frame.find('#photo_frame').append(template.backcover);
      $('#' + get_spot_id(default_id)).show();

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

      //console.log('base_width: ' + base_width)

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


    function hotspot_inversion(){
      //console.log('inversion:' + Photonote.is_hotspot_visible)
      if(Photonote.is_hotspot_visible){
        hotspot_disable()
      }else{
        //hotspot_active()
      }
    }


    function hotspot_disable(){
      //console.log('hotspot_disable')
      clearTimeout(Photonote.hotspot_timer)
      
      console.log('308 行 dodolook');
      //$photo_frame.find('.hotspot').hide()
      //Photonote.is_hotspot_visible = false
    }

    function render(data){

      data.spot_width=photo_size[0]+8;
      data.spot_height=photo_size[1]+8;

      console.log('photo_size ' + photo_size );
      console.dir(data);

      var $album_wrapper = $('#' + get_album_id(data.root_id))

      if(rendered.indexOf(data.dom_id) !== -1){
        var $photo_wrapper = $('#' + data.dom_id)

        $album_wrapper.find('div.photo-wrapper').hide()
        $photo_wrapper.show().find('img.expanding').show()
        $photo_wrapper.find('img.hotspot:hidden').fadeIn()

      }
      else{

        var html = Hogan.compile(template.photospot).render(data, template)
          , $photo_wrapper;
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
      
      var photo_voice_obj = photo_list_obj.records[0]

      if(photo_list_obj){
        temp_obj = Object.create(photo_list_obj)
        temp_obj.dom_id = get_spot_id(temp_obj.id)
        temp_obj.hotspot = []
        temp_obj.total_page = pages.length //pages.length + photo_more.length
        temp_obj.current_page = pages.indexOf(temp_obj.root_id || temp_obj.id) - 0 + 1

        //语音部分处理
        if(photo_voice_obj){

          temp_obj.records_top = photo_voice_obj.pos_top
          temp_obj.records_left = photo_voice_obj.pos_left
          temp_obj.records_voice = photo_voice_obj.dataUrl
          temp_obj.records_second = photo_voice_obj.duration
        }

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


      console.log('goto_spot-----> line 343 行');

      var $elem = $(elem)
        , spot_id = $elem.attr('data-spot-id')

      $elem.siblings('img.hotspot').fadeOut()

      // //缓存原始高度，96x96 or 60x60
      $elem.data('style_width') || $elem.data('style_width', $elem.css('width'));
      $elem.data('style_height') || $elem.data('style_height', $elem.css('height'));

      $elem
      .addClass('expanding')
      .animate({
        width: photo_size[0],//图宽
        height: photo_size[1],//图高
        'border-radius': 0,
        'border-width': 0,
        left:0,//（屏幕宽- 图片款）/2
        top: 0 //(parseInt($('.photo-wrapper').css('padding-bottom').slice(0,-2))/2)
      },400, function(){
        render(get_photo_data(spot_id))
      })
    }

    function back_spot(elem){

      console.log('back_spot-----> line 386 行');



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

      console.log('photo_reset-----> line 424 行');


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

    var boxWidth,windowHieght,windowWidth,picHeight,picWidth,modHeight,modWidth,imgHeight,imgWidth,borderNum=4;
    //初始化设置图高为屏幕高度 
    function onResize() {
      windowHieght=window.innerHeight;
      windowWidth=window.innerWidth;

      imgHeight = windowHieght - 28;
      imgWidth = Math.floor((320*imgHeight)/480);
      boxWidth = (imgWidth+8) * window.json.roots.length;


      $('#photo_frame').css('width',boxWidth+'px');
      $('#photo_box').css({'width':(imgWidth+8)+'px', 'height':(imgHeight+8)+'px'});

      console.log('onResize imgHeight'+imgHeight, '   imgWidth'+imgWidth , '   boxWidth :' + boxWidth);

      $('div[data-type="root"] img.photo').height(imgHeight).show();
      $('div[data-type="root"] img.photo').width(imgWidth).show();
      $('.photo-wrapper .img-mod img').height(windowHieght - borderNum*2).show();
      $('.photo-wrapper .img-mod img').width(imgWidth).show();

      $('#photo_frame').css({'height': windowHieght+'px'});
    }
    window.addEventListener("orientationchange", function(){
      setTimeout("onResize()",100);
    } , false);
    onResize();


    //设置左右翻页按钮的位置和定位
    var topOffset = Math.floor( windowHieght/2 - $('.arrow-group a.pos-abs').innerHeight()/2 );
    $('.arrow-group').attr('style','top:' + topOffset+'px; z-index:200; max-width:'+windowWidth+'px;');

    //取图片的宽高
    setTimeout(function(){
      var picroot = $('div.picroot img.photo')[0];
      var picmod = $('div.picmod img')[0];
      picHeight = picroot.height;
      picWidth = picroot.width;
      modHeight = picmod.height;
      modWidth = picmod.width;

      //设置所有的picroot下的img.photo的width=modWidth
      $('div.picroot img.photo').width(imgWidth);

      //设置左侧留白
      var ml = Math.floor( (windowWidth - modWidth - 8) /2 );

      console.log(  '//设置左侧留白 ml '  + ml);
      console.log(  ' 111  windowHieght,windowWidth,clientHeight,clientWidth,marginTop,picHeight,picWidth,modHeight,modWidth,borderNum,imgHeight,imgWidth' );
      console.log(  windowHieght,windowWidth, picHeight,picWidth,modHeight,modWidth,borderNum,imgHeight,imgWidth );


    },300);



    setTimeout(function(){
      //初始化的时候设置第二项的data-active=next
      $('.item[data-active=on]').next().attr('data-active','next');

      //初始化除了第一张图以外所有图的宽高，缩小，适应放大
      // $('div[data-init="zoom"]').css({"top":"40px","left":"30px"});
      // $('div[data-init="zoom"] img').css({"height": (modHeight + borderNum*2 -80)+ "px","width": (modWidth + borderNum*2 -60)+"px"});
      
      // $('img[data-info="hotspot_zoom"]').css({"width":"60px","height":"60px"});

      var picRoot1=$('#picroot1 img');
      photo_size = [ picRoot1.innerWidth(),picRoot1.innerHeight() ];
      photo_border = borderNum;


    },500);


    //初始化一些参数    //左右翻页
    var speed = 400, onmotion = false, indexNum=1, pageNum = window.json.roots.length;

    $('div.arrow-group a.pos-abs i.icon-arrow-left').click(function() {
        transitionRight();
    });

    $('div.arrow-group a.pos-abs i.icon-arrow-right').click(function() {
        //点击点在右侧，向下一个，→翻
        transitionLeft();
    });

    //给body绑定一个全局的click时间，获取坐标！
    //判断是向左还是向右反转图片
    $('.photo-wrapper').on('click', '.img-mod', function(event){

      var xpos = event.clientX;
      var zpos = window.innerWidth/2;

      if(xpos > zpos){
        //点击点在右侧，向下一个，→翻
        transitionLeft();
      }else{
        transitionRight();
      }

    });

    //隐藏第一页的←翻箭头
    function hideFirstArrows(){
        if(indexNum == 1){
          $('div.arrow-group a').first().hide();
        }else{
          $('div.arrow-group a').first().show();
        }
    }
    hideFirstArrows();

    function transitionLeft(){
      console.log('向左转 开始：：下一个--->  indexNum:' + indexNum + ' pageNum:' + pageNum + '   onmotion:'+onmotion);

        //关闭打开的图点 
        setTimeout(function(){ $('div[data-action="hotspot_back"]').click(); }, 500);
     
        if (onmotion) {
            return;
        }
        onmotion = true;
        if(indexNum < pageNum){
            indexNum+=1;
            $('.hotspot[data-action="hotspot_goto"]').fadeOut();
            $('#photo_frame').animate({
                left:-(imgWidth + 8) * (indexNum-1)
            },speed,'swing',function(){
                onmotion = false;
                $('.hotspot[data-action="hotspot_goto"]').fadeIn(500);
            });

            hideFirstArrows();
        }else if(indexNum == pageNum){
              $('html, body, .foot').animate({scrollTop: $(document).height()}, 400);           
        }
    }


    function transitionRight(){

      console.log('向左转 <---- 上一个  indexNum:' + indexNum + ' pageNum:' + pageNum + '   onmotion:'+onmotion);

        //关闭打开的图点 
        setTimeout(function(){ $('div[data-action="hotspot_back"]').click(); }, 500);
        
        if(indexNum == pageNum){
            $('html, body, .foot').animate({scrollTop:0}, 0);     
        }

        if(indexNum != 1){
              indexNum-=1;
              $('.hotspot[data-action="hotspot_goto"]').fadeOut();
              $('#photo_frame').animate({
                left:-(imgWidth + 8) * (indexNum -1)
              },speed,'swing',function(){
                onmotion = false;
                $('.hotspot[data-action="hotspot_goto"]').fadeIn(500);
              });
              hideFirstArrows();            
        }
    }





       function vidplay() {
         var video = document.getElementById("Video1");
         var button = document.getElementById("play");
         if (video.paused) {
            video.play();
            button.textContent = "||";
         } else {
            video.pause();
            button.textContent = ">";
         }
      }


        $('#share').click(function(){
            $('.modal').show();
        });
        $('.modal').click(function(){
            $('.modal').hide();
        });


    //播放音频按钮事件
    $('.btn-voice a.btn i.img-play').click(function(){
        var id = $(this).parents('.btn-voice').attr('data-id');
        document.getElementById('audio_'+id).play();
        $(this).parent().addClass('voice-hide').prev().removeClass('voice-hide');
    });

    //停止播放音频按钮事件
    $('.btn-voice a.btn i.img-stop').click(function(){
        var id = $(this).parents('.btn-voice').attr('data-id');        
        document.getElementById('audio_'+id).pause();
        $(this).parent().addClass('voice-hide').next().removeClass('voice-hide');
    });



    //录音播放按钮高度减掉自身一半
    // $.each($('.btn-voice'),function(i,n){
    //     $(n).attr('style', $(n).attr('style') + 'margin-top:-' +  Math.floor($(n).height()/2) + 'px;');
    // });


      //来自于哪个平台
      //wx , ios , android , pc
    function diffserv(){
      var nav = window.location.href;
      var sUserAgent = navigator.userAgent.toLowerCase();
      var isIpad = sUserAgent.match(/ipad/i) == "ipad";
      var isIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var isMidp = sUserAgent.match(/midp/i) == "midp";
      var isUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var isUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var isAndroid = sUserAgent.match(/android/i) == "android";
      var isCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var isWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

      if(isAndroid){

      }else if(isIphoneOs || isIpad){

        //iphone设备的处理
        //打开之后，尝试跳转到iso_jump

        //为了测试ipad，暂时禁止掉！
        (function(){
            var thisNav = window.location.href;
            setTimeout(function(){
              window.location = json.ios_jump;
            },500);
        })();

        // //调往旅游的地址
        // (function(){
        //     var thisNav = window.location.href;
        //     setTimeout(function(){
        //       window.location = 'travel://com.travelrecord';
        //     },1000);
        // })();


      }else{
        //其他设备，PC，ipad的处理
        console.log('this is pc note3');
      }

    }
    diffserv();
});




/*

<div id="album_0" class="album-wrapper">
  <div id="spot_001" class="photo-wrapper">
    <!///<div class="pos-abs pagination"><span class="current">1</span>/<span class="total">2</span></div>///>
    <div class="pos-abs btn-voice">
      <a href="#" class="btn"><i class="img-stop"></i>6''</a>
      <a href="#" class="btn"><i class="img-play"></i>60''</a>
      <audio controls="controls">
        <source src="http://fennudegongniu.com/COFFdD0xMzgwMDEyNjM1Jmk9MS4yMDIumarginTopk4LjEyMyZ1PVNvbmdzL3YyL2ZhaW50UUMvZDAvNWUvMDhhMWEzYjE4ODJiZDc2YzM1YmY5NWM5OTE3YTVlZDAubXAzJm09MWRiMmNhOTk3NDA1YzI3ODU5ODgyZjM2NzkwN2NhNGEmdj1kb3duJm49SW50ZXJuYXRpb25hbHVkZSZzPU1hdHQlMjBQb2tvcmEmcD1z.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </div>
    <img class="hotspot blink" data-action="hotspot_goto" data-spot-id="002" src="http://s5.suc.itc.cn/ux_tudian/asset/mobile/nil.png" alt="" style="top: 29%; left: 24%; background-image: url(http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a02.jpg);"/>
    <img class="hotspot blink" data-action="hotspot_goto" data-spot-id="003" src="http://s5.suc.itc.cn/ux_tudian/asset/mobile/nil.png" alt="" style="top: 50%; left: 20%; background-image: url(http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a03.jpg);"/> 

    <div class="pos-abs img-mod"><img src="http://img.itc.cn/ph0/c041be72b01cb60edf76dc02833a6a8b.png" /></div>

    <div data-action="hotspot_back" data-id="001" data-parent-id="" data-type="root">
      <img draggable="false" class="photo" style="background-image: url(http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a01.jpg);" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" alt="">
    </div>
  </div>
</div>

<div id="album_1" class="album-wrapper last-bg hide">
  <div id="spot_004" class="photo-wrapper">
    <//-- <div class="pos-abs pagination"><span class="current">2</span>/<span class="total">2</span></div> //>
    <img style="top: 18%; left: 38%; background-image: url(http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a05.jpg);" alt="" src="http://s5.suc.itc.cn/ux_tudian/asset/mobile/nil.png" data-spot-id="005" data-action="hotspot_goto" class="hotspot blink"/>
    <div class="pos-abs img-mod"><img src="http://img.itc.cn/ph0/c041be72b01cb60edf76dc02833a6a8b.png" /></div>
    <div data-type="root" data-parent-id="" data-id="004" data-action="hotspot_back"><img alt="" style="background-image:url(http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a04.jpg);" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" class="photo" draggable="false"/></div>
  </div>
</div>






function transitionLeft(){

  console.log('向左转 下一个--->  是否第一个:' + begin + ' 是否最后一个:' + end + '  正在运动:' + onmotion);

    if (onmotion) {
        return;
    }else if(end){
        $('html, body, .foot').animate({scrollTop: $(document).height()}, 600); 
        return false; 
    }
    onmotion = true;

    //取得 当前on的id，以及下一个的id
    var on    = $('.item[data-active=on]').attr('data-id');
    var next  = $('.item[data-active=next]').attr('data-id');
    //设置下一个显示， , 并且设置当前为next的下一个元素为next

    var nextID = $('.item[data-active=next]').next().attr('data-id');
    if(nextID){
      $('.item[data-active=next]').removeClass('hide').next().attr('data-active','next');
    }else{
      $('.item[data-active=next]').removeClass('hide');
    }

    //设置当前的prev为no
    $('.item[data-active=prev]').attr('data-active','no');

    $('.item[data-id=' + on + ']').animate({
      top:'-=60'
      , left:'-'+(windowWidth+60)
    },speed,function(){
      $(this).attr('data-active','prev');
    });

    $('.item[data-id=' + on + '] img[data-info="backcover_zoom"]').animate({
      opacity:0.3
      , width:'+=60'
      , height:'+=120'
    },speed);

    //$('.item[data-id=' + next + ']').css({'top':'40px','left':'30px'});
    $('.item[data-id=' + next + ']').animate({
      top:'0',
      left:'0'
    },speed,function(){
      $(this).attr('data-active','on');
    });

    $('.item[data-id=' + next + '] img[data-info="backcover_zoom"]').animate({
      opacity:1
      , width:'+=60'
      , height:'+=80'
    },speed,function(){

      //正在运动中不能再次触发
      onmotion = false;
    });

    if($('.item[data-active=next]').next().attr('data-id')){

      begin = false;
      end = false;    
    }else{
      end = true;   

    }

}


function transitionRight(){

    console.log('向右转  <---- 上一个  是否第一个:' + begin + ' 是否最后一个:' + end + '  正在运动:' + onmotion);

    if(begin || onmotion){    
      return;
    }
    onmotion = true;

    //取得 当前on的id，以及下一个的id
    var on    = $('.item[data-active=on]').attr('data-id');
    var prev  = $('.item[data-active=prev]').attr('data-id');
    //设置下一个显示， , 并且设置当前为next的下一个元素为next

    var prevID = $('.item[data-active=prev]').prev().attr('data-id');
    if(prevID){
      $('.item[data-active=prev]').prev().attr('data-active','prev');
    }else{
      $('.item[data-active=prev]');
    }

    //设置当前的next为no
    $('.item[data-active=next]').attr('data-active','no');

    $('.item[data-id=' + on + ']').animate({
      top:'+=40',
      left:'+=30'
    },speed,function(){
      $(this).attr('data-active','next');
    });

    $('.item[data-id=' + on + '] img[data-info="backcover_zoom"]').animate({
      width:'-=60'
      , height:'-=80'
      , opacity:1
    },speed);

    $('.item[data-id=' + prev + ']').animate({
      top:'0',
      left:'0'
    },speed,function(){
      $(this).attr('data-active','on');
    });

    $('.item[data-id=' + prev + '] img[data-info="backcover_zoom"]').animate({
      width:'-=60',
      height:'-=120',
      opacity:1
    },speed,function(){

      //正在运动中不能再次触发
      onmotion = false;
    });

    if($('.item[data-active=prev]').prev().attr('data-id')){
      begin = false;
      end = false;    
    }else{
      begin = true;   
    }
}





*/