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

