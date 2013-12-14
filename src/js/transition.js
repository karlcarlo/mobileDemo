var begin = true;
var end = false;
var speed = 600;
var inmotion = false;
$('.curl').click(function() {
    TransitionRight();
});
$('.curr').click(function() {
    TransitionLeft();
});
function TransitionLeft() {
    if (end || inmotion) {
        return;
    }
    inmotion = true;
    //取得 当前on的id，以及下一个的id
    var on = $('.item[data-active=on]').attr('data-id');
    var next = $('.item[data-active=next]').attr('data-id');
    //设置下一个显示，并设置z-index=99 , 并且设置当前为next的下一个元素为next
    var nextID = $('.item[data-active=next]').next().attr('data-id');
    if (nextID) {
        $('.item[data-active=next]').removeClass('hide').css('z-index', '99').next().attr('data-active', 'next');
    } else {
        $('.item[data-active=next]').removeClass('hide').css('z-index', '99');
        //$('.item').first().attr('data-active','next');
    }
    //设置当前的prev为no
    $('.item[data-active=prev]').attr('data-active', 'no');
    $('.item[data-id=' + on + ']').animate({
        top: '-=60',
        left: '-380'
    },
    speed,
    function() {
        $(this).css('z-index', 99).attr('data-active', 'prev');
    });
    $('.item[data-id=' + on + '] img').animate({
        width: '+=60',
        height: '+=120',
        opacity: 0
    },
    speed);
    $('.item[data-id=' + next + ']').css({
        'top': '40px',
        'left': '30px'
    });
    $('.item[data-id=' + next + ']').animate({
        top: '0',
        left: '0'
    },
    speed,
    function() {
        $(this).css('z-index', 100).attr('data-active', 'on');
    });
    $('.item[data-id=' + next + '] img').css({
        'height': '370px',
        'width': '240px'
    });
    $('.item[data-id=' + next + '] img').animate({
        width: '+=60',
        height: '+=80',
        opacity: 1
    },
    speed,
    function() {
        //正在运动中不能再次触发
        inmotion = false;
    });
    if ($('.item[data-active=next]').next().attr('data-id')) {
        begin = false;
        end = false;
    } else {
        end = true;
    }
}
function TransitionRight() {
    if (begin || inmotion) {
        return;
    }
    inmotion = true;
    //取得 当前on的id，以及下一个的id
    var on = $('.item[data-active=on]').attr('data-id');
    var prev = $('.item[data-active=prev]').attr('data-id');
    //设置下一个显示，并设置z-index=99 , 并且设置当前为next的下一个元素为next
    var prevID = $('.item[data-active=prev]').prev().attr('data-id');
    if (prevID) {
        $('.item[data-active=prev]').css('z-index', '100').prev().attr('data-active', 'prev');
    } else {
        $('.item[data-active=prev]').css('z-index', '100');
        //$('.item').last().attr('data-active','prev');
    }
    //设置当前的next为no
    $('.item[data-active=next]').attr('data-active', 'no');
    $('.item[data-id=' + on + ']').animate({
        top: '+=40',
        left: '+=30'
    },
    speed,
    function() {
        $(this).css('z-index', 99).attr('data-active', 'next');
    });
    $('.item[data-id=' + on + '] img').animate({
        width: '-=60',
        height: '-=120',
        opacity: 0
    },
    speed);
    //$('.item[data-id=' + prev + ']').css({'top':'40px','left':'30px'});
    $('.item[data-id=' + prev + ']').animate({
        top: '0',
        left: '0'
    },
    speed,
    function() {
        $(this).css('z-index', 100).attr('data-active', 'on');
    });
    //$('.item[data-id=' + prev + '] img').css({'height':'370px','width':'240px'});
    $('.item[data-id=' + prev + '] img').animate({
        width: '-=60',
        height: '-=120',
        opacity: 1
    },
    speed,
    function() {
        //正在运动中不能再次触发
        inmotion = false;
    });
    if ($('.item[data-active=prev]').prev().attr('data-id')) {
        begin = false;
        end = false;
    } else {
        begin = true;
    }
}
function Transition(dir) {
    //左右移动的方法
    //取得 当前on的id，以及下一个的id
    var on = $('.item[data-active=on]').attr('data-id');
    var next = $('.item[data-active=next]').attr('data-id');
    var prev = $('.item[data-active=prev]').attr('data-id');
    //设置下一个显示，并设置z-index=99 , 并且设置当前为next的下一个元素为next
    //设置下一个显示，并设置z-index=99 , 并且设置当前为next的下一个元素为next
}






var startX, startY, endX, endY;
function touchSatrt(e) {
    //e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
    var touch = e.touches[0]; //获取第一个触点
    var x = Number(touch.pageX); //页面触点X坐标
    var y = Number(touch.pageY); //页面触点Y坐标
    //记录触点初始位置
    startX = x;
    startY = y;
}
//touchmove事件
function touchMove(e) {
    //e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
    var touch = e.touches[0]; //获取第一个触点
    var x = Number(touch.pageX); //页面触点X坐标
    var y = Number(touch.pageY); //页面触点Y坐标
    //记录触点结束位置
    endX = x;
    endY = y;
}
document.body.addEventListener('touchstart',function(e) {
    //event.preventDefault();
    touchSatrt(event);
},false);
document.body.addEventListener('touchmove',function(e) {
    //event.preventDefault(event);
    touchMove(e);
},false);
document.body.addEventListener('touchend',function(e) {
    //event.preventDefault(event);
    //判断滑动方向
    if ((endX - startX) >= 90) {
        //左右滑动
        TransitionRight();
    } else if ((startX - endX) >= 90) {
        TransitionLeft();
    }
},false);
















<div class="album-wrapper" id="album_0">
    <div class="photo-wrapper" id="spot_001">   

        <!-- 页码
        <div class="pos-abs pagination"><span class="current">1</span>/<span class="total">2</span></div> pagination
        -->
    


        <!-- 音频 -->
        <div class="pos-abs btn-voice">
            <a class="btn" href="#"><i class="img-stop"></i>6''</a>
            <a class="btn" href="#"><i class="img-play"></i>60''</a>
            <audio controls="controls">
            <source type="audio/mpeg" src="http://fennudegongniu.com/COFFdD0xMzgwMDEyNjM1Jmk9MS4yMDIuMTk4LjEyMyZ1PVNvbmdzL3YyL2ZhaW50UUMvZDAvNWUvMDhhMWEzYjE4ODJiZDc2YzM1YmY5NWM5OTE3YTVlZDAubXAzJm09MWRiMmNhOTk3NDA1YzI3ODU5ODgyZjM2NzkwN2NhNGEmdj1kb3duJm49SW50ZXJuYXRpb25hbHVkZSZzPU1hdHQlMjBQb2tvcmEmcD1z.mp3"></source>
                Your browser does not support the audio element.
            </audio>
        </div><!--voice-->


        <!-- 图点 -->
        <img style="top: 29%; left: 24%; background-image: url(http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a02.jpg);" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="002" data-action="hotspot_goto" class="hotspot blink">
        <img style="top: 50%; left: 20%; background-image: url(http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a03.jpg);" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="003" data-action="hotspot_goto" class="hotspot blink"> 

        <!-- 蒙层 -->
        <div class="pos-abs img-mod">
            <img src="http://img.itc.cn/ph0/c041be72b01cb60edf76dc02833a6a8b.png" style="height: 745px; display: inline-block;">
        </div>

        <!-- 主图 ->
        <div data-type="root" data-parent-id="" data-id="001" data-action="hotspot_back">
            <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(&quot;http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a01.jpg&quot;); height: 745px; display: inline-block;" class="photo" draggable="false">
        </div>

    </div>

</div>




<div id="album_1" class="album-wrapper last-bg">
    <div id="spot_004" class="photo-wrapper">
    <!-- <div class="pos-abs pagination"><span class="current">2</span>/<span class="total">2</span></div> -->

        <img style="top: 18%; left: 38%; background-image: url(http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a05.jpg);" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="005" data-action="hotspot_goto" class="hotspot blink">
        <div class="pos-abs img-mod">
            <img src="http://img.itc.cn/ph0/c041be72b01cb60edf76dc02833a6a8b.png" style="height: 376px; display: inline-block;">
        </div>
        <div data-type="root" data-parent-id="" data-id="004" data-action="hotspot_back">
            <img alt="" style="background-image: url(http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a04.jpg); height: 376px; display: inline-block;" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" class="photo" draggable="false">
        </div>
    </div>
</div>






















































<div class="row">
        <section class="stamp" id="photo_frame">
          <div class="album-wrapper" id="album_0">
            <div class="photo-wrapper" id="spot_001">

              <!--<div class="pos-abs pagination"><span class="current">1</span>/<span class="total">2</span></div> pagination-->
              <div class="pos-abs btn-voice">
                <a class="btn" href="#"><i class="img-stop"></i>6''</a>
                <a class="btn" href="#"><i class="img-play"></i>60''</a>
                <audio controls="controls">
                  <source type="audio/mpeg" src="http://fennudegongniu.com/COFFdD0xMzgwMDEyNjM1Jmk9MS4yMDIuMTk4LjEyMyZ1PVNvbmdzL3YyL2ZhaW50UUMvZDAvNWUvMDhhMWEzYjE4ODJiZDc2YzM1YmY5NWM5OTE3YTVlZDAubXAzJm09MWRiMmNhOTk3NDA1YzI3ODU5ODgyZjM2NzkwN2NhNGEmdj1kb3duJm49SW50ZXJuYXRpb25hbHVkZSZzPU1hdHQlMjBQb2tvcmEmcD1z.mp3"></source>
                Your browser does not support the audio element.
                </audio>
              </div> <!--voice-->
              <img style="top: 29%; left: 24%; background-image: url(&quot;http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a02.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="002" data-action="hotspot_goto" class="hotspot blink">
              <img style="top: 50%; left: 20%; background-image: url(&quot;http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a03.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="003" data-action="hotspot_goto" class="hotspot blink"> 

              <div class="pos-abs img-mod"><img src="http://img.itc.cn/ph0/c041be72b01cb60edf76dc02833a6a8b.png" style="height: 715px; display: inline-block;"></div>

              <div data-type="root" data-parent-id="" data-id="001" data-action="hotspot_back">
                <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(&quot;http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a01.jpg&quot;); height: 715px; display: inline-block;" class="photo" draggable="false">
              </div>
            </div>
          </div>
          <div class="album-wrapper last-bg hide" id="album_1">
            <div class="photo-wrapper" id="spot_004">
              <!-- <div class="pos-abs pagination"><span class="current">2</span>/<span class="total">2</span></div> -->
              <img class="hotspot blink" data-action="hotspot_goto" data-spot-id="005" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" alt="" style="top: 18%; left: 38%; background-image: url(&quot;http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a05.jpg&quot;); display: none;">
              <div class="pos-abs img-mod"><img src="http://img.itc.cn/ph0/c041be72b01cb60edf76dc02833a6a8b.png" style="height: 715px; display: inline-block;"></div>
              <div data-action="hotspot_back" data-id="004" data-parent-id="" data-type="root"><img draggable="false" class="photo" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(&quot;http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/pic/a04.jpg&quot;); height: 715px; display: inline-block;" alt=""></div>
            </div>
          </div>
        <div class="album-wrapper " id="album_0">          <div id="spot_spot_1" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">1</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="1" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_1" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="1" hotspot_cover"="" style="top: 28%; left: 27%; background-image: url(&quot;http://sucimg.itc.cn/youwo/5a1fb5dafa5b1800b428a765b5f643c6.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="2" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/344f82d9ef74628b8ad8079abb66334c.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="1" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/8e6900321275e176bcc5a28bd2770ad4.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_1">          <div id="spot_spot_3" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">2</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="3" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_3" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="3" hotspot_cover"="" blink"="" hotspot="" style="top: 13%; left: 24%; background-image: url(&quot;http://sucimg.itc.cn/youwo/35ede72a72acef0accf4cdc51271e8b3.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="4" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/1b6e167615eb9c0226cb9ed11565a4a9.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="3" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/0d331f7b92be092a9233a23b64ff9b4c.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_2">          <div id="spot_spot_6" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">3</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="6" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_6" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="6" hotspot_cover"="" style="top: 24%; left: 29%; background-image: url(&quot;http://sucimg.itc.cn/youwo/3b405cb224329e20b30f0b9b7012aeaa.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="7" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/9610b6ec1fcf06617595491558bc432b.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="6" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/31b1f5a591bb14103fa7e1a85352c999.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_3">          <div id="spot_spot_8" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">4</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="8" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_8" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="8" hotspot_cover"="" style="top: 46%; left: 78%; background-image: url(&quot;http://sucimg.itc.cn/youwo/92c246917d61f4a37e61339605935eac.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="9" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/a8257dc64c59d5f9dcd804d1ccca3a60.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="8" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/b5e3ae24b313a94db046c2819ac773c5.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_4">          <div id="spot_spot_10" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">5</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="10" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_10" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="10" hotspot_cover"="" style="top: 33%; left: 14%; background-image: url(&quot;http://sucimg.itc.cn/youwo/020f6adb8b772e6308f11ba6275cbbba.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="11" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/9e8e5a74fb8f0dd30222524c85d31601.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="10" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/dc889dca9fb59d575ab3b93a3beaa0b5.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_5">          <div id="spot_spot_12" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">6</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="12" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_12" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="12" hotspot_cover"="" blink"="" hotspot="" style="top: 23%; left: 11%; background-image: url(&quot;http://sucimg.itc.cn/youwo/fabe4cbb797e3bc5234638779e882b77.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="13" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/613d88c73b0a6d7813383c308a6a6051.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="12" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/e6da438b5103aae4f4cdc0e97ca6f911.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_6">          <div id="spot_spot_15" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">7</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="15" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_15" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="15" hotspot_cover"="" style="top: 39%; left: 82%; background-image: url(&quot;http://sucimg.itc.cn/youwo/d7194ebc3fd21314a4b6f06f7226df96.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="16" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/867611e6a7f19797297d2c14c4321224.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="15" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/ebceec2fc9975f05811abe44b827bd26.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_7">          <div id="spot_spot_17" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">8</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="17" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_17" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="17" hotspot_cover"="" style="top: 15%; left: 15%; background-image: url(&quot;http://sucimg.itc.cn/youwo/fa79e67b0499a854d400a4249089b030.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="18" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/fbe2ffc6298fd1d37fa6c6d16ffbfba6.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="17" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/d8a1399f309345b468a3120e38b3e3ed.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_8">          <div id="spot_spot_19" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">9</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="19" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_19" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="19" hotspot_cover"="" style="top: 37%; left: 17%; background-image: url(&quot;http://sucimg.itc.cn/youwo/abfd2fdca7f59f3991e1889acaeb5991.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="20" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/f2c7d1ae5976b44a5ec91d0586e8e1c0.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="19" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/337ef825c3d43958298c0843ff86d1cd.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_9">          <div id="spot_spot_21" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">10</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="21" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_21" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="21" hotspot_cover"="" style="top: 27%; left: 56%; background-image: url(&quot;http://sucimg.itc.cn/youwo/6b52f69aa93fb821c535c44a11a5d7f3.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="22" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/3f5d04748abc57028e26e11e0ea44d1f.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="21" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/dbf1edc89dabce785ac668137b1891c1.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_10">          <div id="spot_spot_23" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">11</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="23" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_23" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="23" hotspot_cover"="" blink"="" hotspot="" style="top: 14%; left: 78%; background-image: url(&quot;http://sucimg.itc.cn/youwo/ecb0e9949932fd2d0a3d916029d08ceb.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="24" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/8fb7959cb497227847def33696bbe129.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="23" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/03acf6864d681cf55520319886a16f38.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_11">          <div id="spot_spot_26" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">12</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="26" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_26" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="26" hotspot_cover"="" blink"="" hotspot="" style="top: 7%; left: 60%; background-image: url(&quot;http://sucimg.itc.cn/youwo/ace0b217c183a65040bcfc282662b224.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="27" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/ea982dc0b70440402e55db157d6af554.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="26" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/63056684521586745fd08ccb5fc4a487.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_12">          <div id="spot_spot_29" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">13</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="29" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_29" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="29" hotspot_cover"="" blink"="" hotspot="" style="top: 65%; left: 71%; background-image: url(&quot;http://sucimg.itc.cn/youwo/443bed4bc9da498cea2a5a784fb129c1.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="30" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/799b37703f9b55ab68816f3774eec2c2.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="29" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/eb86732b8132b6be37191e09bff379aa.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_13">          <div id="spot_spot_32" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">14</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="32" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_32" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="32" hotspot_cover"="" style="top: 61%; left: 14%; background-image: url(&quot;http://sucimg.itc.cn/youwo/5774124b8ac3971f47f2eed10b1f9967.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="33" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/7514d94cb400fdcd38f3907cd8dceb68.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="32" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/3556b09f5d4bd170eeedb97f77cce899.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_14">          <div id="spot_spot_34" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">15</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="34" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_34" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="34" hotspot_cover"="" style="top: 20%; left: 76%; background-image: url(&quot;http://sucimg.itc.cn/youwo/8cd50a7b13785aad9219d2804ec8d174.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="35" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/ff63cad676ee1703c96d786435f7779d.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="34" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/6017ebe85b3d291f8cc9338217fc5fce.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper " id="album_15">          <div id="spot_spot_36" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">16</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="36" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_36" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <img data-type="root" data-parent-id="" data-id="36" hotspot_cover"="" style="top: 24%; left: 71%; background-image: url(&quot;http://sucimg.itc.cn/youwo/efb623b85c2fbe3205c537a2d68beede.jpg&quot;); display: none;" alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/nil.png" data-spot-id="37" data-action="hotspot_goto" class="hotspot blink">        <img style="height: 745px; display: inline-block;" src="http://sucimg.itc.cn/youwo/62dc3cf2f78df681605986738707fa98.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="36" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/15ce28d1d301356f5fa41143fd4793d1.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div><div class="album-wrapper last-bg" id="album_16">          <div id="spot_spot_38" class="photo-wrapper">    <!-- 页码    <div class="pos-abs pagination"><span class="current">17</span>/<span class="total">17</span></div> pagination    -->    <!-- 音频 -->    <div style="top:%; left:%;" data-id="38" class="pos-abs btn-voice hide">        <a href="#" class="btn"><i class="img-stop"></i>"</a>        <a href="#" class="btn"><i class="img-play"></i>"</a>        <audio id="audio_38" controls="controls">        <source src="" type="audio/mpeg"></source>            Your browser does not support the audio element.        </audio>    </div><!--voice-->    <!-- 图点 -->        <!-- 蒙层 -->    <div class="pos-abs img-mod" data-type="root" data-parent-id="" data-id="38" data-action="hotspot_cover">        <img style="height: 715px; display: inline-block;" src="http://sucimg.itc.cn/youwo/e06255453da4f563e08d0b0a9c29a92a.png">    </div>    <!-- 主图 ->    <div data-action="hotspot_back"  data-id="38" data-parent-id="" data-type="root">        <img alt="" src="http://s5.suc.itc.cn/ux_tudian/src/asset/mobile/img_download_filler.png" style="background-image: url(http://sucimg.itc.cn/youwo/1408d9661c7cd5ea7f790f4ac7e82188.jpg); height: 745px; display: inline-block;" class="photo" draggable="false">    </div></div>   </div>--></div></div></section>
        
        <div class="btns">
          <div class="pop-alert">
            <i class="arrow-down"></i>
            ~让你的照片有故事~
          </div>
        
          <a class="btn-download" href="#"><i class="img-btn-text"></i></a>
        </div> <!--btn-->

        <div class="alert-msg">
          如果手机装有“由我图片笔记”客户端<br>
点<i class="img-open"></i>“在浏览器中打开”，可以完美效果阅读画报
        </div>

      </div>