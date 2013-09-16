/**
 * 滚动动画
 */
;
(function($,window){

var MIN_WIDTH = 960,
	MIN_HEIGHT = 768;

var animObjects = [];


//第一屏的滚动效果
var partOneSlide = {
	delay: 2000,
	dur: 500,
	data: {
		pics: [
			'http://s5.suc.itc.cn/ux_tudian/asset/desktop/img_scroll01.jpg',
			'http://s5.suc.itc.cn/ux_tudian/asset/desktop/img_scroll02.jpg',
			'http://s5.suc.itc.cn/ux_tudian/asset/desktop/img_scroll03.jpg'
		]
	},
	template: [
		'<ul>',
		'{{#pics}}',
		'<li><img src="{{.}}" alt="" /></li>',
		'{{/pics}}',
		'</ul>'
	].join(''),
	init: function($box){
		this.$box = $box;
		this.$curItem = null;
		this.tid = null;
		this.render();
	},
	render: function(){
		this.$ul && this.$ul.stop();
		this.$box.html(Hogan.compile(this.template).render(this.data));
		this.$ul = this.$box.find('ul');
		this.$ul.css({
			width: this.data.pics.length * 224
		});
	},
	start: function(rebuild){
		if(this.tid) clearInterval(this.tid);
		if(rebuild) this.render();
		if(!this.$curItem) this.$curItem = this.$ul.find('li:first');
		this.tid = setInterval($.proxy(this.slide,this),this.delay+this.dur);
		return this;
	},
	stop: function(index){
		clearInterval(this.tid);
		this.render();
		this.$curItem = null;
		if(index > 0) this.$ul.find('li:lt('+index+')').hide();
		return this;
	},
	slide: function(){
		if(!this.$curItem.next().length){
			//如果没有下一个，把第一张挪到最后
			this.$ul.append(this.$ul.find('li:first'));
		}
		this.$ul
		.css({
			left: - (this.$curItem.index() * 224)
		})
		.animate({
			left: '-=224'
		},this.dur,'swing');
		this.$curItem = this.$curItem.next();
	}
};

//第4屏的滚动效果
// $li.index() * 126 - 22 = 第二个滚动的坐标
var partFourSlide = {
	delay: 2500,
	dur: 200,
	data: {
		pics: [
			{
				pic: 'http://s5.suc.itc.cn/ux_tudian/asset/desktop/img_ss05.png',
				bg: 'http://s5.suc.itc.cn/ux_tudian/asset/desktop/bg_ss05.jpg'
			},
			{
				pic: 'http://s5.suc.itc.cn/ux_tudian/asset/desktop/img_ss01.png',
				bg: 'http://s5.suc.itc.cn/ux_tudian/asset/desktop/bg_ss01.jpg'
			},
			{
				pic: 'http://s5.suc.itc.cn/ux_tudian/asset/desktop/img_ss02.png',
				bg: 'http://s5.suc.itc.cn/ux_tudian/asset/desktop/bg_ss02.jpg'
			},
			{
				pic: 'http://s5.suc.itc.cn/ux_tudian/asset/desktop/img_ss03.png',
				bg: 'http://s5.suc.itc.cn/ux_tudian/asset/desktop/bg_ss03.jpg'
			},
			{
				pic: 'http://s5.suc.itc.cn/ux_tudian/asset/desktop/img_ss04.png',
				bg: 'http://s5.suc.itc.cn/ux_tudian/asset/desktop/bg_ss04.jpg'
			}
		]
	},
	template: [
		'<ul>',
		'{{#pics}}',
		'<li data-bg="{{bg}}"><img src="{{pic}}" alt="" /></li>',
		'{{/pics}}',
		'</ul>'
	].join(''),
	init: function($box,$bg){
		this.$box = $box;
		this.$bg = $bg;
		this.$curItem = null;
		this.tid = null;
		this.render();
	},
	render: function(){
		this.$ul && this.$ul.stop();
		this.$box.html(Hogan.compile(this.template).render(this.data));
		this.$ul = this.$box.find('ul');
		this.$ul.css({
			width: this.data.pics.length * 126
		});
		this.setCurItem();
		this.setBg();
	},
	setCurItem: function(index){
		index = index || 1;
		this.$curItem = this.$ul.find('li').eq(index);
		this.$ul.css({
			left: - (this.$curItem.index() * 126 - 22) 
		});
	},
	start: function(rebuild){
		if(this.tid) clearInterval(this.tid);
		if(rebuild) this.render();
		this.show();
		//这里写动画展开效果
		var $lis = this.$ul.find('li'),
			curIndex = this.$curItem.index(),
			center = this.$curItem.position(),
			pos = [];
		$lis.each(function(){
			pos.push($(this).position());
		});
		var tl = new TimelineLite({
			onComplete: function(){
				$lis.each(function(){
					$(this).css({
						position: 'static',
						left: 'auto',
						top: 'auto'
					});
				});
			},
			paused: true

		}),
			tweens = [];
		$lis.each(function(i){
			var $li = $(this);
			$li.css({
				position: 'absolute',
				left: pos[i].left,
				top: pos[i].top,
				zIndex: (i == curIndex ? 100 : 1)
			});

			tweens.push(TweenMax.from( $li, .25, {css:{top: center.top, left: center.left}}));
		});
		
		tl.add(tweens);
		tl.play();
		this.tid = setInterval($.proxy(this.slide,this),this.delay+this.dur);
		return this;
	},
	stop: function(){
		clearInterval(this.tid);
		this.render();
		return this;
	},
	slide: function(){
		var self = this;
		if(this.$curItem.prevAll().length == 1){
			//如果没有下一个，把第一张挪到最后
			this.$ul.prepend(this.$ul.find('li:last'));
		}
		this.setCurItem(this.$curItem.index());
		this.$ul
		.animate({
			left: '+=126'
		},
		this.dur,
		'swing',
		function(){
			setTimeout($.proxy(self.setBg,self),500);
		});
		this.$curItem = this.$curItem.prev();
	},
	setBg: function(){
		this.$bg.html('<img width="170" height="222" src="'+this.$curItem.attr('data-bg')+'" />').find('img').css('opacity',0.4).animate({opacity:1},500);
	},
	hide: function(){
		this.$ul.hide();
		this.$bg.children().hide();
		return this;
	},
	show: function(){
		this.$ul.show();
		this.$bg.children().show();
		return this;
	},
	clone: function(){
		return this.$ul.clone();
	}
};

var SA = {
	init: function(){
		//先回到顶部
		$(window).scrollTop(0);
		//缓存
		this.$elems = {
			canvas: $('#canvas'),
			part1: $('#part1'),
			part2: $('#part2'),
			part3: $('#part3'),
			part4: $('#part4')
		};
		partOneSlide.init(this.$elems.part1.find('div.pic-scroll'));
		partOneSlide.start();
		partFourSlide.init(this.$elems.part4.find('div.img-scroll'),this.$elems.part4.find('div.bg'));
		//partFourSlide.hide();
		
		//回到顶部
		this.backTop();
		//设置容器宽高
		this.containerAutoSize();
		//sso对象
		this.controller = $.superscrollorama();
		//添加动画
		this.addTweens();
		//绑定事件
		this.scrollToLinks();

		$(window).resize($.proxy(this.resize,this));		
	},
	backTop: function(){
		//回到顶部
		var self = this;
		$('<a href="#" id="back_top"></a>')
		.click(function(event){
			event.preventDefault();
			$.scrollTo(self.$elems.part1,1000);
		})
		.appendTo('body')
		.hide();

		$(window).scroll(function(){
			$('#back_top')[$(this).scrollTop() > 0 ? 'fadeIn' : 'fadeOut']();
		});
	},
	scrollToLinks: function(){
		var self = this;
		$('a.link-one').click(function(event){
			event.preventDefault();
			$.scrollTo(self.$elems.part2,1000);
		});
		$('a.link-two').click(function(event){
			event.preventDefault();
			$.scrollTo(self.$elems.part3,1000);
		});
		$('a.link-three').click(function(event){
			event.preventDefault();
			$.scrollTo(self.$elems.part4,1000);
		});
		$('a.link-four').click(function(event){
			event.preventDefault();
			$.scrollTo(self.$elems.part1,1000);
		});
	},
	containerAutoSize: function(){
		var win_width = $(window).width(),
			win_height =$(window).height();

		if(win_width < MIN_WIDTH){
			this.$elems.part1.width(MIN_WIDTH);
			this.$elems.part2.width(MIN_WIDTH);
			this.$elems.part3.width(MIN_WIDTH);
			this.$elems.part4.width(MIN_WIDTH);
		}else{
			this.$elems.part1.css('width','auto');
			this.$elems.part2.css('width','auto');
			this.$elems.part3.css('width','auto');
			this.$elems.part4.css('width','auto');
		}

		if(win_height > MIN_HEIGHT){
			this.$elems.part1.height(win_height);
			this.$elems.part2.height(win_height);
			this.$elems.part3.height(win_height);
			this.$elems.part4.height(win_height);
		}else{
			this.$elems.part1.css('height','auto');
			this.$elems.part2.css('height','auto');
			this.$elems.part3.css('height','auto');
			this.$elems.part4.css('height','auto');
		}
	},
	addTweens: function(){
		var self = this;
		//添加移动浮层
		$('<img id="mov1" class="pop" src="http://s5.suc.itc.cn/ux_tudian/asset/desktop/img_parttwo.jpg" alt="" />').appendTo(this.$elems.canvas).hide();
		$('<img id="mov2" class="pop" src="http://s5.suc.itc.cn/ux_tudian/asset/desktop/book.png" alt="" />').appendTo(this.$elems.canvas).hide();


		//初始化动画的一些左边信息
		var $mov1 = $('#mov1'),
			$mov2 = $('#mov2'),
			$book_img = this.$elems.part3.find('.book img'),
			top_offset = 5;//为了防止世界被破坏（为了防止动画不能正常播放完毕，所以在播放时长上减少5像素）

		var part2_offset = this.$elems.part2.offset(),
			part3_offset = this.$elems.part3.offset(),
			part4_offset = this.$elems.part4.offset();

		$book_img.eq(0).show().end().eq(1).hide();

		//第一个关键帧
		var at1 = 107,
			from1 = this.$elems.part1.find('div.pic-scroll').offset(),
			to1 = this.$elems.part2.find('div.parttwo-con > div.img').offset(),
			dur1 = part2_offset.top - at1 - top_offset;

		$mov1.css({
			left: from1.left,
			top: from1.top,
			width: 224,
			height: 324,
			zIndex: 100
		});
		//先缓存动画关键帧
		animObjects.push(at1);
		this.controller.addTween(
			at1,
			TweenMax.to(
				$mov1,
				2,
				{
					css:{
						left: to1.left,
						top: to1.top,
						width: 322,
						height: 480,
						zIndex: 1
					},
					onStart: function(){
						$mov1.show();
						partOneSlide.stop(1);
					},
					onReverseComplete: function(){
						$mov1.hide();
						partOneSlide.start(true);
						//console.log('reversed')
					}
				}
			),
			dur1
		);

		//第二个关键帧
		var at2 = part2_offset.top + 180,
			to2 = this.$elems.part3.find('div.book').offset(),
			dur2 = part3_offset.top - at2 - top_offset;

		animObjects.push(at2);
		this.controller.addTween(
			at2,
			TweenMax.to(
				$mov1,
				2,
				{
					css:{
						left: to2.left,
						top: to2.top,
						width: 341,
						height: 443,
						zIndex: 100,
						opacity: .6
					},
					onUpdate: function(){
						var _offset = $mov1.offset();
						if(_offset.left != to2.left || _offset.top != to2.top){
							$mov1.show();
							$book_img.eq(0).show();
							$book_img.eq(1).hide();
						}else{
							$mov1.fadeOut('fast');
							$book_img.eq(0).hide();
							$book_img.eq(1).fadeIn('fast');
							//console.log('at2 else');
						}
					}
				}
			),
			dur2
		);

		//设置初始坐标
		$mov2.css({
			left: to2.left,
			top: to2.top,
			width: 341,
			height: 443,
			zIndex: 100
		});

		//第三个关键帧
		var at3 = part3_offset.top + 180,
			to3 = this.$elems.part4.find('div.img-scroll').offset(),
			dur3 = part4_offset.top - at3 - top_offset;
		//显示出来，并开始计算坐标
		animObjects.push(at3);
		to3.left += 37;//添加偏移量
		to3.top += 251;//偏移量
		this.controller.addTween(
			at3,
			TweenMax.to(
				$mov2,
				2,
				{
					css:{
						left: to3.left ,
						top: to3.top,
						width: 95,
						height: 123,
						zIndex: 100
					},
					onComplete: function(){
						$mov2.hide();
						partFourSlide.start(true);
					},
					onReverseComplete: function(){
						$mov2.hide();
						$book_img.eq(0).hide();
						$book_img.eq(1).show();
					},
					onUpdate: function(){
						var _offset = $mov2.offset();
						if(_offset.left != to3.left || _offset.top != to3.top){
							$mov2.show();
							$book_img.hide();
							partFourSlide.stop().hide();
						}
					}
				}
			),
			dur3
		);

	},
	removeTweens: function(){
		for(var i=0;i<animObjects.length;i+=1){
			this.controller.removeTween(animObjects[i]);
		}
		animObjects = [];
		$('#mov1').remove();
		$('#mov2').remove();
	},
	resize: function(){
		this.containerAutoSize();
		this.removeTweens();
		$(window).scrollTop(0);
		this.addTweens();
	}

};

$(function(){
	SA.init();
});

})(jQuery,window);