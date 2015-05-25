/**
 * @file dialog moblie plugin
 * @author xucaiyu
 * @email 569455187@qq.com
 * @date 
 * @copyright ifind all rights reserved. 
 */
(function(window){
	var isDialog = null,
		_cid = 1,
		_zIndex = 999900,
		defaults = {
			type: 'load',
			time: false,
			shade: true,
			shadeClose: true,
			html: '',
			animation: 'slidedownin',
			unload: true,
			align: 'center',
			buttons: [
				{
					name: '取消',
					callback: function(){}
				},
				{
					name: '确认',
					callback: function(){}
				}
			],
			init: function(){}
		}

	cssStyle = {
		center: {

		}
	}

	function DialogLayer( options ){
		this.options = $.extend( {}, defaults, options ? options : {} );
// console.log($)
		// 销毁存在的对象
		if( isDialog ) isDialog.close();

		this.view();
	}
	DialogLayer.prototype.view = function(){
		var _self = this,
			opts = _self.options,
			type = opts.type,
			html = opts.html,
			$div = $('<div class="xcy-layer"></div>'),
			content = '',
			tags = '',
			align = opts.align,
			cssStyle = {};

		_self.$el = $div;
		
		// 加载 提示框
		if( type == 'load' || type == 'tip' ){
			// 加载 图标
			if( type == 'load' ){
				tags += '<div class="xcy-load"> </div>'
					 + '<div class="xcy-text">' + html +'</div>';
			}else{
				tags += html;
			}
			content = '<div class="xcy-load-box">'
				+ tags
			+ '</div>'
		}
		// 询问框 警告框
		if( type == 'confirm' || type == 'alert' ){
			// 确认取消
			$.each(opts.buttons, function(i, v){
				tags += '<div class="xcy-btn">'+ v.name +'</div>'
			})

			content = '<div class="xcy-box">'
				+ '<div class="xcy-con">' + html +'</div>'
				+ '<div class="xcy-btns">'
					+ tags
				+ '</div>'
			+'</div>'
		}
		if( type == 'page' ){
			// content = html;
			$div.html( html )
		}else{
			// 设置html
			$div.html(
				'<div class="xcy-main">'
					+ '<div class="xcy-section">'
						+ content
					+ '</div>'
				+ '</div>');
		}

		// 遮罩
		if( opts.shade ){
			_self.$shade = $('<div class="xcy-shade"></div>');
			_self.$shade.attr( 'id', 'xcy-layer-' + (_cid++) );

			$( 'body' ).append( _self.$shade );
			// 设置遮罩层css
			_self.$shade.css({
				'zIndex': _zIndex++
			})
		}

		$div.addClass( opts.animation );
		$div.attr( 'id', 'xcy-layer-' + (_cid++) );
		$( 'body' ).append( $div );
		// 绑定事件
		_self.action();
// console.log(_self.$el)
		// 设置弹出层css
		if( align == 'center' ){
			cssStyle = {
				marginTop: -(_self.$el.height()/2),
				marginLeft: -(_self.$el.width()/2),
				left: '50%',
    			top: '50%'
			}
		}else if( align == 'bottom' || align == 'top' ){
			cssStyle[ align ] = 0
			cssStyle[ 'width' ] = '100%'
		}else if( align == 'left' || align == 'right' ){
			cssStyle[ align ] = 0;
			cssStyle[ 'top' ] = 0;
			cssStyle[ 'height' ] = '100%';
		}

		cssStyle[ 'zIndex' ] = _zIndex++;
		_self.$el.css( cssStyle )
	}
	DialogLayer.prototype.action = function(){
		var _self = this,
			opts = _self.options,
			type = opts.type,
			time = opts.time,
			html = opts.html;
// console.log(_self.$el.find( '.xcy-shade' ))
		
		// 定时关闭
		if( time !== false ){
			if( time == true ) time = 1200;
			setTimeout(function(){
				_self.close();
			}, time );
		}

		// 遮罩关闭
		if( opts.shade ){
			_self.$shade.on('click touchmove', function(){
				_self.close();
			})
		}

		// 按钮关闭
		$btns = $('.xcy-btn', _self.$el );
		if( $btns.length !== 0 ){
			// 循环按钮dom
			$('.xcy-btn', _self.$el ).each(function( i ){
				var $btn = $( this ),
					obj = opts.buttons[ i ];
				// 绑定按钮事件
				$btn.click(function(){
					callback = obj.callback ? obj.callback( $btn.text() ) : null;
					// 阻止关闭
					if( callback === false ){
						return;
					}else{
						_self.close();
					}
				})
			})
		}

		// 自定义初始化
		opts.init();
	}
	DialogLayer.prototype.close = function(){
		var _self = this,
			opts = _self.options;

		if( opts.unload ){
			_self.unload();
		}else{
			_self.hide();
		}

		isDialog = null;
	}
	DialogLayer.prototype.unload = function(){
		var _self = this,
			opts = _self.options;

		// 释放动画
		_self.$el.find('.xcy-load').removeClass('xcy-load');
		// 移除事件
		$('.xcy-btn', _self.$el ).off( 'click' );
		// 移除dom
		_self.$el.remove();

		if( opts.shade ){
			_self.$shade.off('click touchmove');
			_self.$shade.remove();
		}
		
	}
	DialogLayer.prototype.show = function(){
		var _self = this;

		_self.$el.show();
		_self.$shade.show();
		isDialog = _self;
	}
	DialogLayer.prototype.hide = function(){
		var _self = this;

		_self.$el.hide();
		_self.$shade.hide();
	}

	var dialog = {
		create: function( options ){
			return isDialog = new DialogLayer( options );
		},
		load: function( html, time, close ){
			return isDialog = new DialogLayer({
				html: html,
				time: time !== undefined ? time : 1200,
				shadeClose: close ? close : false
			});
		},
		confirm: function( html, sure, cancel, close ){
			return isDialog = new DialogLayer({
				type: 'confirm',
				html: html,
				shadeClose: close ? close : false,
				buttons: [
					{
						name: '取消',
						callback: cancel
					},
					{
						name: '确认',
						callback: sure
					}
				]
			});
		},
		alert: function( html, sure, close ){
			return isDialog = new DialogLayer({
				type: 'alert',
				html: html,
				shadeClose: close ? close : false,
				buttons: [{
					name: '确认',
					callback: sure ? sure : function(){}
				}]
			});
		},
		tip: function( html, time, close ){
			return isDialog = new DialogLayer({
				type: 'tip',
				html: html,
				time: time !== undefined ? time : 1200,
				shadeClose: close ? close : true
			});
		},
		page: function( html, callback, close ){
			return isDialog = new DialogLayer({
				type: 'page',
				html: html,
				callback: callback,
				shadeClose: close ? close : true
			});
		},
		config: function( options ){
			defaults = $.extend( defaults, options ? options : {} )
		}
	}

	'function' === typeof define? define(function(){
		return dialog;
	}) : window.Dialog = dialog;
})(window);