/*! ux_tudian 2013-12-19 */
function TransitionLeft(){if(!end&&!inmotion){inmotion=!0;var e=$(".item[data-active=on]").attr("data-id"),t=$(".item[data-active=next]").attr("data-id"),i=$(".item[data-active=next]").next().attr("data-id");i?$(".item[data-active=next]").removeClass("hide").css("z-index","99").next().attr("data-active","next"):$(".item[data-active=next]").removeClass("hide").css("z-index","99"),$(".item[data-active=prev]").attr("data-active","no"),$(".item[data-id="+e+"]").animate({top:"-=60",left:"-380"},speed,function(){$(this).css("z-index",99).attr("data-active","prev")}),$(".item[data-id="+e+"] img").animate({width:"+=60",height:"+=120",opacity:0},speed),$(".item[data-id="+t+"]").css({top:"40px",left:"30px"}),$(".item[data-id="+t+"]").animate({top:"0",left:"0"},speed,function(){$(this).css("z-index",100).attr("data-active","on")}),$(".item[data-id="+t+"] img").css({height:"370px",width:"240px"}),$(".item[data-id="+t+"] img").animate({width:"+=60",height:"+=80",opacity:1},speed,function(){inmotion=!1}),$(".item[data-active=next]").next().attr("data-id")?(begin=!1,end=!1):end=!0}}function TransitionRight(){if(!begin&&!inmotion){inmotion=!0;var e=$(".item[data-active=on]").attr("data-id"),t=$(".item[data-active=prev]").attr("data-id"),i=$(".item[data-active=prev]").prev().attr("data-id");i?$(".item[data-active=prev]").css("z-index","100").prev().attr("data-active","prev"):$(".item[data-active=prev]").css("z-index","100"),$(".item[data-active=next]").attr("data-active","no"),$(".item[data-id="+e+"]").animate({top:"+=40",left:"+=30"},speed,function(){$(this).css("z-index",99).attr("data-active","next")}),$(".item[data-id="+e+"] img").animate({width:"-=60",height:"-=120",opacity:0},speed),$(".item[data-id="+t+"]").animate({top:"0",left:"0"},speed,function(){$(this).css("z-index",100).attr("data-active","on")}),$(".item[data-id="+t+"] img").animate({width:"-=60",height:"-=120",opacity:1},speed,function(){inmotion=!1}),$(".item[data-active=prev]").prev().attr("data-id")?(begin=!1,end=!1):begin=!0}}function Transition(){$(".item[data-active=on]").attr("data-id"),$(".item[data-active=next]").attr("data-id"),$(".item[data-active=prev]").attr("data-id")}function touchSatrt(e){var t=e.touches[0],i=Number(t.pageX),n=Number(t.pageY);startX=i,startY=n}function touchMove(e){var t=e.touches[0],i=Number(t.pageX),n=Number(t.pageY);endX=i,endY=n}var begin=!0,end=!1,speed=600,inmotion=!1;$(".curl").click(function(){TransitionRight()}),$(".curr").click(function(){TransitionLeft()});var startX,startY,endX,endY;document.body.addEventListener("touchstart",function(){touchSatrt(event)},!1),document.body.addEventListener("touchmove",function(e){touchMove(e)},!1),document.body.addEventListener("touchend",function(){endX-startX>=90?TransitionRight():startX-endX>=90&&TransitionLeft()},!1);