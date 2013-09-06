/**
 * 滚动动画
 */
;
(function($,window){

var MIN_WIDTH = 960,
	MIN_HEIGHT = 768;

var animObjects = [];

var partOneData = {
	pics: [
		'http://s5.suc.itc.cn/ux_tudian/asset/desktop/img_scroll01.jpg',
		'http://s5.suc.itc.cn/ux_tudian/asset/desktop/img_scroll02.jpg',
		'http://s5.suc.itc.cn/ux_tudian/asset/desktop/img_scroll03.jpg'
	]
};

var partOneSlide = {
	delay: 2000,
	template: [
		'<ul>',
		'{{#pics}}',
		'<li><img src="{{.}}" alt="" /></li>',
		'{{/pics}}',
		'</ul>'
	].join(''),
	init: function($box){
		$box.html(Hogan.compile(this.template).render(partOneData));
		this.$box = $box;
		this.$ul = $box.find('ul');
		this.$ul.css({
			width: partOneData.pics.length * 224
		})
		this.curItem = this.$ul.find('li:first');
		this.tid = null;
	},
	/**
	 * [start description]
	 * @param  {[number]} index [从哪张图开始播放，0-n]
	 * @return {[type]}       [description]
	 */
	start: function(index){
		this.tid = setInterval($.proxy(this.slide,this),this,delay);
	},
	/**
	 * [stop description]
	 * @param  {[type]} index [停止在哪张，0-n]
	 * @return {[type]}       [description]
	 */
	stop: function(){
		clearInterval(this.tid);
	},
	slide: function(){
		if(!this.curItem.next().length){
			//如果没有下一个，把第一张挪到最后
		}
	}
};

// $li.index() * 126 - 22 = 第二个滚动的坐标

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
			self.$elems.part1.ScrollTo();
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
			self.$elems.part2.ScrollTo();
		});
		$('a.link-two').click(function(event){
			event.preventDefault();
			self.$elems.part3.ScrollTo();
		});
		$('a.link-three').click(function(event){
			event.preventDefault();
			self.$elems.part4.ScrollTo();
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
		$('<img id="mov2" class="pop" src="http://s5.suc.itc.cn/ux_tudian/asset/desktop/img_book.gif" alt="" />').appendTo(this.$elems.canvas).hide();


		//初始化动画的一些左边信息
		var $mov1 = $('#mov1'),
			$mov2 = $('#mov2'),
			$book_img = this.$elems.part3.find('.book img');

		var part2_offset = this.$elems.part2.offset(),
			part3_offset = this.$elems.part3.offset(),
			part4_offset = this.$elems.part4.offset();

		$book_img.eq(1).hide();

		//第一个关键帧
		var at1 = 107,
			from1 = this.$elems.part1.find('div.pic-scroll').offset(),
			to1 = this.$elems.part2.find('div.parttwo-con > div.img').offset(),
			dur1 = part2_offset.top - at1;

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
					},
					onReverseComplete: function(){
						$mov1.hide();
						console.log('reversed')
					}
				}
			),
			dur1
		);

		//第二个关键帧
		var at2 = part2_offset.top + 170,
			to2 = this.$elems.part3.find('div.book').offset(),
			dur2 = part3_offset.top - at2;

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
					onComplete: function(){
						$mov1.fadeOut();
						$book_img.eq(0).hide();
						$book_img.eq(1).fadeIn();
						console.log('complete')
					},
					onUpdate: function(){
						var _offset = $mov1.offset();
						if(_offset.left != to2.left || _offset.top != to2.top){
							$mov1.show();
							$book_img.eq(0).show();
							$book_img.eq(1).hide();
						}
					}
				}
			),
			dur2
		);

		$mov2.css({
			left: to2.left,
			top: to2.top,
			width: 341,
			height: 443,
			zIndex: 100
		});

		//第三个关键帧
		var at3 = part3_offset.top + 158,
			to3 = this.$elems.part3.find('div.book').offset(),
			dur3 = part3_offset.top - at3;


	},
	removeTweens: function(){

	},
	resize: function(){
		this.containerAutoSize();
	}

};

$(function(){
	SA.init();
});

})(jQuery,window);