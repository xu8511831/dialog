/**
 * @file dialog plugin
 * @author xucaiyu
 * @email 569455187@qq.com
 * @version 1.0.0
 * @date 2014-10-15
 * @license MIT License 
 */
!function(t,e){function n(e){var n,r=this,s=t.extend({},p.drag,e.drag);if(r.css=t.extend({},p.css,e.css),n=t.extend({},p,e),r.options=n,r.type=n.type,r.$parent="string"==typeof n.container?t(n.container):n.container,r.$el=t(i),r._isBody="BODY"==this.$parent[0].nodeName,(n.fixed&&!r._isBody||"msg"==r.type)&&(r.options.isMove=!1),r._cid=o++,r._zIndex=a++,r.$elArr=[],n.beforeFn.apply(this),r.init(s),n.afterFn.apply(this),r.$iframe){var l=r.$iframe[0];l.attachEvent?l.attachEvent("onload",function(){n.onloadFn&&n.onloadFn(),l.detachEvent("onload",arguments.caller)}):l.onload=function(){n.onloadFn&&n.onloadFn(),l.onload=null}}}var i,o=1,a=99999900,r=[],s=!-[1],l=s&&!window.XMLHttpRequest,c=t(document),d=t(window),p={container:"body",css:{padding:"10px"},html:"加载中...",value:"",title:"信息",left:"50%",top:"50%",src:"about:blank",scrolling:"auto",align:"center",animate:!1,winBtn:!0,buttons:[{name:"确定",callback:function(){},disabled:!1,focus:!1},{name:"取消",callback:function(){},disabled:!1,focus:!1}],closeBtn:function(){},beforeFn:function(){},onloadFn:function(){},afterFn:function(){},shade:!0,shadeClose:!1,unload:!0,delay:!1,opacity:.3,fixed:!1,isMove:!0,resize:!0,drag:{limit:!0,range:[0,9999,9999,0],lockX:!1,lockY:!1,onStart:function(){},onMove:function(){},onEnd:function(){}}};i='<table class="xcy-table xcy-warpper"><tbody><tr><td class="xcy-tl"></td><td class="xcy-tc"></td><td class="xcy-tr"></td></tr><tr><td class="xcy-cl"></td><td class="xcy-cc"><div class="xcy-layer"></div></td><td class="xcy-cr"></td></tr><tr><td class="xcy-bl"></td><td class="xcy-bc"></td><td class="xcy-br"></td></tr></tbody></table>';var u={sort:function(e){var n,i,o,a=r.length;for(n=0;a>n;n++)if(r[n]._cid==e){if(n==a-1){if(!i)return;return void t.each(r,function(t,e){e.$el.css("zIndex",e._zIndex)})}i=r[n],o=r[n+1]._zIndex,r[n]=r[n+1],r[n+1]=i,r[n]._zIndex=r[n+1]._zIndex,r[n+1]._zIndex=o}},toNumber:function(t,e){if(!t&&0!==t||"number"==typeof t)return t;var n=t.length-1;return t.lastIndexOf("px")===n-1?t=parseInt(t):t.lastIndexOf("%")===n&&(e||(e=100),t=parseInt(e*t.split("%")[0]/100)),t},debounce:function(t,e,n){if("function"==typeof t){e=e||150,n=n||null;var i,o=function(){t.apply(n)};return function(){window.clearTimeout(i),i=window.setTimeout(o,e)}}}};n.prototype={v:"1.0.0",constructor:n,init:function(e){var n,i=this,o=i.options,a=o.title,r=o.html,s="shade"==i.type||o.shade,c=i.$el,p=o.resize;switch(s&&(n="#shade-layer-"+i._cid,i.$elArr.push(n),i._shadeHtml(n),o.shadeClose&&i._bindShadeClose()),i.type){case"load":n="#load-layer-"+i._cid,i._layerHtml(!1,r,!1);break;case"confirm":n="#confirm-layer-"+i._cid,i._layerHtml(a,r,o.buttons);break;case"prompt":n="#prompt-layer-"+i._cid,i._layerHtml(a,r,o.buttons);break;case"alert":n="#alert-layer-"+i._cid,i._layerHtml(a,r,o.buttons);break;case"msg":n="#msg-layer-"+i._cid,i._layerHtml(a,r,!1);break;case"iframe":n="#iframe-layer-"+i._cid,i._layerHtml(a,!0,!1);break;default:n="#page-layer-"+i._cid,i._layerHtml(a,r,!1)}if(i.$elArr.push(n),c.attr("id",n.substring(1)),o.fixed&&(i._isBody?l?(i._ie6Fix=i._topFixed(d),d.bind("scroll",i._ie6Fix)):i.$el.addClass("xcy-fixed"):(i._ie6Fix=i._topFixed(i.$parent),i.$parent.bind("scroll",i._ie6Fix))),l&&i._ie6SelectFix(),!p||!o.fixed&&o.isMove||(i._winResize=function(){o.isMove&&i._dragObj._size();var e=i.parentHeight-i.warpperHeight,n=i.parentWidth-i.warpperWidth,a=Number(i.top)/e,r=Number(i.left)/n;u.debounce(function(){i._getParentSize();var e=i.parentHeight-i.warpperHeight,n=i.parentWidth-i.warpperWidth,o=Math.round(a*e),l=Math.round(r*n);i.$el.css(i._setCss(o,l)),s&&i._shadeCss(t(i.$elArr[0]))})()},d.bind("resize",i._winResize)),o.isMove){e.selector=n,e.container=o.container,e.fixed=o.fixed,e.target=".xcy-title",e.isBody=i._isBody;var f=e.onMove;e.onMove=function(t,e){i.top=t,i.left=e,f(t,e)},i._dragObj=new h(e)}o.delay&&setTimeout(function(){i._autoClose()},"boolean"==typeof o.delay?1800:o.delay)},_autoClose:function(){var e=this,n=e.$elArr.length-1;t.each(e.$elArr,function(i,o){t(o).animate({opacity:"0"},800,function(){i==n&&e.close()})})},_bindShadeClose:function(){var e=this,n=t(".xcy-shade",e.$parent);n&&n.bind("click",function(){e.close()})},_getContent:function(){return t(".xcy-content",this.$el)},_getTitle:function(){return t(".xcy-title",this.$el)},_getFoot:function(){return t(".xcy-foot",this.$el)},_layerHtml:function(e,n,i){var o,a,r,s,l=this,c=l.options,d=l.type,p=l.$el,u=l.css,h=e!==!1;c.title=e,l._getParentSize(),h&&(o=l._titHtml(e),t(".xcy-layer",p).append(o)),"load"==d?a=l._loadHtml(n):"iframe"==d?a=l._iframeHtml(c.src):("prompt"==d?(a=l._conHtml('<div class="xcy-text"></div><input class="xcy-input" type="text" value="'+c.value+'" />'),a.find(".xcy-text").html(n)):a=l._conHtml(n),t(".xcy-main",a).css(u)),t(".xcy-layer",p).append(a),l.$parent.append(p),i&&(r=l._btnHtml(i),t(".xcy-layer",p).append(r)),"load"!==d&&c.closeBtn&&(s=l._winBtnHtml(d),t(".xcy-layer",p).append(s)),l._setConCss(l._getContent(),c.width,c.height),l._getWarpperSize(p),c.animate?(p.css({top:Number(l.parentHeight)+Number(l.warpperHeight),left:Number(l.parentWidth)-l.warpperWidth}),p.animate(l._setCss(c.top,c.left),1200)):p.css(l._setCss(c.top,c.left),c.delay);try{i&&l.$focus.focus()}catch(f){}},_shadeHtml:function(e){var n=this,i=t('<div class="xcy-shade" id="'+e.substring(1)+'"></div>');n._shadeCss(i),n.$parent.append(i)},_shadeCss:function(e){var n=this,i=n.options.opacity,o=n._isBody,a=o?t("body").outerWidth():n.$parent[0].scrollWidth,r=o?c.innerHeight():n.$parent[0].scrollHeight;e.css({width:a,height:r,opacity:i,"z-index":n._zIndex})},_loadHtml:function(e){var n=this,i=n.options,o=t('<div class="xcy-load"><span class="xcy-load-img"></span><span>'+e+"</span></div>");return n._setConCss(o,i.width,i.height),o},_iframeHtml:function(e){var n=this,i=n.options,o=t('<iframe allowtransparency="true" frameborder="0" class="xcy-iframe" name="xcy-iframe'+n._cid+'"  src="'+e+'" scrolling="'+i.scrolling+'"></iframe>');return n.$iframe=o,n._conHtml("").html(o)},_conHtml:function(e){var n,i,o,a,r=this,s=(r.options,t('<div class="xcy-content"><div class="xcy-main"></div></div>'));return e&&1===e.nodeType&&(n=e.style.display,i=e.previousSibling,o=e.nextSibling,a=e.parentNode,r._elemBack=function(){i&&i.parentNode?i.parentNode.insertBefore(e,i.nextSibling):o&&o.parentNode?o.parentNode.insertBefore(e,o):a&&a.appendChild(e),e.style.display=n,r._elemBack=null}),s.find(".xcy-main").html(e),s},_titHtml:function(e){var n=t('<div class="xcy-title"></div>');return n.append("<span>"+e+"</span>"),n},_btnHtml:function(e){var n=this,i=t('<div class="xcy-foot"></div>'),o="",a=e.length-1;return t.each(e,function(t,e){var n=e.disabled?"disabled":"",i="";i=0===t?"xcy-btn-r":t==a?"xcy-btn-l":"xcy-btn-m",o+='<button class="xcy-btn '+i+'" type="button" '+n+">"+e.name+"</button>"}),i.html(o),i.css("text-align",n.options.align),t("button",i).each(function(i){var o,a,r,s=t(this),l=e[i];s.click(function(){a=l.callback,r=t(".xcy-input",n._getContent()).val(),a&&(o=a(s.text(),r)),o!==!1&&n.close()}),l.focus&&!l.disabled&&(n.$focus=s)}),i},_winBtnHtml:function(e){var n=this,i=n.options,o=i.closeBtn,a=i.winBtn,r=t('<div class="xcy-winBtn"></div>'),s=!0,l="xcy-close-btn";return"iframe"==e&&a&&(r.append('<a class="xcy-winBtn-btn" id="xcy-min-btn" href="javascript:;">-</a>'),r.append('<a class="xcy-winBtn-btn" id="xcy-full-btn" href="javascript:;">+</a>')),("msg"==e&&n.options.title===!1||"page"==e&&n.options.title===!1)&&(l="xcy-x-btn"),r.append('<a class="xcy-winBtn-btn"  id="'+l+'" href="javascript:;">×</a>'),t("a",r).bind("click",function(){var e=t(this).attr("id"),i=!0;switch(e){case"xcy-close-btn":case"xcy-x-btn":if(o&&(i=o(n.title())),i===!1)return;n.close();break;case"xcy-full-btn":s?(n.full(),s=!1):(t("#xcy-min-btn",n.$el).show(),n.restore(),s=!0);break;case"xcy-min-btn":t(this).hide(),n.min(),s=!1}}),r},_topFixed:function(t){var e,n=this;return e=function(){u.debounce(function(){n.$el.css({top:n.top+t.scrollTop(),left:n.left+t.scrollLeft()})})()}},_ie6SelectFix:function(){var t,e=this,n=e.$el,i=e.warpperWidth,o=e.warpperHeight;t=document.createElement("iframe"),t.src="about:blank;",t.style.cssText="position:absolute;z-index:-1;left:0;top:0;filter:alpha(opacity=0);border:0 none;width:"+i+"px;height:"+o+"px;",n.append(t)},_toNumberW:function(t){var e,n,i=this;i._getWarpperSize(i.$el),i._getConWidth(),t&&(-1!==String(t).indexOf("%")&&(e=i.width,n=i.warpperWidth-e,t=u.toNumber(t,i.parentWidth-n)),i.width=t)},_toNumberH:function(t){var e,n,i=this;i._getWarpperSize(i.$el),i._getConHeight(),t&&(-1!==String(t).indexOf("%")&&(e=i.height,n=i.warpperHeight-e,t=u.toNumber(t,i.parentHeight-n)),i.height=t)},_setConCss:function(t,e,n){{var i=this;i.css}i._toNumberW(e),t.css({width:i.width}),i._toNumberH(n),t.css({height:i.height})},_setCss:function(t,n){var i=this,o=i.options,a=(i.$parent,i._isBody),r=0,s=0,d={};return o.fixed&&l&&(r=a?c.scrollTop():i.$parent.scrollTop(),s=a?c.scrollLeft():i.$parent.scrollLeft()),(t===e||""==t)&&(t="50%"),t=u.toNumber(t,i.parentHeight-i.warpperHeight),i.top=t,(n===e||""==n)&&(n="50%"),n=u.toNumber(n,i.parentWidth-i.warpperWidth),i.left=n,d["z-index"]=i._zIndex,d.top=t+r,d.left=n+s,d},_getConWidth:function(){var t=this;t.width=t._getContent().outerWidth()},_getConHeight:function(){var t=this;t.height=t._getContent().outerHeight()},_getParentSize:function(){var t=this,e=(t.options,t.$parent),n=t._isBody;t.parentWidth=n?d.innerWidth():e[0].clientWidth,t.parentHeight=n?d.innerHeight():e[0].clientHeight},_getWarpperSize:function(t){this.warpperWidth=t.outerWidth(),this.warpperHeight=t.outerHeight()},min:function(){this.resize("180","0",0,180*(r.length-1))},full:function(){this.resize("100%","100%",0,0)},restore:function(){var t=this,e=t._restore;t.resize(e.width,e.height,e.top,e.left)},title:function(t){var e=this._getTitle().children("span"),n=t?e.html(t):e.html();return t?this:n},html:function(t){return this._getContent().html(t),this},buttons:function(e){return t("button",this.$el).unbind("click"),this._getFoot().replaceWith(this._btnHtml(e)),this},resize:function(t,n,i,o){var a,r,s,l,c,d,p=this,u=parseInt(p.$el.css("left")),h=parseInt(p.$el.css("top"));return p._restore={top:p.top,left:p.left,height:p.height,width:p.width},p._toNumberW(t),p._toNumberH(n),a=p.width,r=p.height,this.options.height=n,this.options.width=t,l=(a-t)/2,s=(r-n)/2,c=o!==e?o:u+l,d=i!==e?i:h+s,p._setConCss(p._getContent(),t,n),p._getWarpperSize(p.$el),this._dragObj?p._dragObj._move(d,c,p.warpperHeight,p.warpperWidth):p.$el.css(p._setCss(i,o)),this},moveTo:function(t,e){var n=this;return t=u.toNumber(t,n.parentHeight),e=u.toNumber(e,n.parentWidth),box=this._dragObj?n._dragObj.range(t,e,n.warpperWidth,n.warpperHeight):n.$el.css(n._setCss(t,e)),n.$el.css(n._setCss(box.top,box.left)),this},setDrag:function(t){return this._dragObj?(this._dragObj.set(t),this):this},hide:function(){return t.each(this.$elArr,function(e,n){t(n).hide()}),this},show:function(){return t.each(this.$elArr,function(e,n){t(n).show()}),this},close:function(){var t=this;return t.options.unload?void t.unload():void t.hide()},unload:function(){var e,n=this;for(t("button",n.$el).unbind("click"),t(".xcy-winBtn a",n.$el).unbind("click"),n._winResize&&d.unbind("resize",n._winResize),n._ie6Fix&&(d.unbind("scroll",n._ie6Fix),n.$parent.unbind("scroll",n._ie6Fix)),n.options.shadeClose&&t(".xcy-shade",n.$parent).unbind("click"),n.options.isMove&&n._dragObj.disable(),n._elemBack&&n._elemBack(),t.each(n.$elArr,function(e,n){t(n).remove()}),n.$elArr=null,e=r.length;e--;)r[e]._cid===this._cid&&r.splice(e,1)},closeAll:function(){t.each(r,function(t,e){e.close()})}};var h=function(){function n(e){function n(e){var n,o=e.type,a=t(e.target);switch(n=0!==a.parents(i.target).length?a.parents(i.target):a,o){case"mousedown":u.sort(i.options.selector.split("-")[2]),"true"==n.attr("data-move")&&(i.diffx=e.clientX-i.$parent[0].offsetLeft,i.diffy=e.clientY-i.$parent[0].offsetTop,i._getOffSize(),window.getSelection?window.getSelection().removeAllRanges():document.selection.empty(),s?(i.$parent.bind("losecapture",i._end),i.$parent[0].setCapture()):c.bind("blur",i._end),c.bind("mousemove",i._handleEvent),c.bind("mouseup",i._handleEvent),i.options.onStart(),e.preventDefault());break;case"mousemove":var r=e.clientX-i.diffx,l=e.clientY-i.diffy;i._move(l,r,i.offH,i.offW),e.preventDefault();break;case"mouseup":i._end()}}var i=this;i.diffx=0,i.diffy=0,i.options=e,i.$parent=t(i.options.selector),i.target=e.target,i._handleEvent=n,i._init()}return n.prototype={_init:function(){var e=this,n=t(e.target,e.$parent);e._size(),n.attr("data-move","true"),n.css("cursor","move"),e.$parent.bind("mousedown",e._handleEvent)},_getActive:function(){try{var t=document.activeElement,e=t.contentDocument,n=e&&e.activeElement||t;return n}catch(i){}},_size:function(){var n,i=this,o=i.options,a=o.range;o.limit&&(i.mxT=a[0],i.mxR=a[1]!==e?a[1]:a[0],i.mxB=a[2]!==e?a[2]:a[0],i.mxL=a[3]!==e?a[3]:a[1]?a[1]:a[0],i._getOffSize(),n=t(o.container),!o.fixed&&o.isBody?(i.h=c.outerHeight(),i.w=c.outerWidth()):o.fixed&&o.isBody?(i.h=d.innerHeight(),i.w=d.innerWidth()):(i.h=n[0].scrollHeight,i.w=n[0].scrollWidth),"relative"==n.css("position")&&n.css("position","relative"),o.lockX&&(i.mxR=i.mxL=i.left),o.lockY&&(i.mxT=i.mxB=i.top))},_getOffSize:function(){var t=this;t.offW=t.$parent.outerWidth(),t.offH=t.$parent.outerHeight(),t.left=parseInt(t.$parent.css("left")),t.top=parseInt(t.$parent.css("top")),t.mxR=Math.max(t.mxR,t.mxL+t.offW),t.mxB=Math.max(t.mxB,t.mxT+t.offH)},_move:function(t,e,n,i){var o,a,r,s=this;o=s.range(t,e,i,n),a=o.left,r=o.top,s.$parent.css({left:a,top:r}),s.left=a,s.top=r,s.options.onMove(r,a)},_end:function(){var t=this;c.unbind("mousemove",t._handleEvent),c.unbind("mouseup",t._handleEvent),s?(t.$parent.unbind("losecapture",t._end),t.$parent[0].releaseCapture()):c.unbind("blur",t._end),t.options.onEnd()},range:function(t,e,n,i){var o,a,r,s,l=this,c=l.options,d={};return c.limit&&(o=l.mxT,a=l.mxR,r=l.mxL,s=l.mxB,c.container&&(o=Math.max(l.mxT,0),a=Math.min(l.w-n,l.mxR),r=Math.max(l.mxL,0),s=Math.min(l.h-i,l.mxB)),e=Math.max(Math.min(e,a),r),t=Math.max(Math.min(t,s),o)),d.left=e,d.top=t,d},set:function(e){var n=this;e&&t.extend(n.options,e),n._size()},enable:function(){var t=this;t.$parent.bind("mousedown",t._handleEvent)},disable:function(){var t=this;t.$parent.unbind("mousedown",t._handleEvent)}},n}();window.dialog={load:function(t,e,n){return Dialog({type:"load",html:t,fixed:!0,unload:!0,shade:n||!1,delay:"undefined"!=typeof e?e:!1})},prompt:function(t,e,n,i){return Dialog({type:"prompt",html:t,value:e,fixed:!0,width:300,unload:!0,shade:!0,buttons:[{name:"确定",callback:n,disabled:!1,focus:!0},{name:"取消",callback:i,disabled:!1,focus:!1}]})},confirm:function(t,e,n){return Dialog({type:"confirm",html:t,fixed:!0,unload:!0,shade:!0,buttons:[{name:"确定",callback:e,disabled:!1,focus:!0},{name:"取消",callback:n,disabled:!1,focus:!1}]})},alert:function(t,e,n){return"function"==typeof e&&(n=e,e="信息"),Dialog({type:"alert",html:t,shade:!1,fixed:!0,title:e,unload:!0,shade:!0,buttons:[{name:"确定",callback:n,disabled:!1,focus:!0}]})},msg:function(t,e,n){return e="undefined"!=typeof e?e:!0,Dialog({type:"msg",title:!1,html:t,fixed:!0,unload:!0,shade:n||!1,closeBtn:e?!1:function(){},delay:e,isMove:!1})}},Dialog=window.Dialog=function(t){var e=new n(t);return r.push(e),e},Dialog.config=function(e){return t.extend(p,e)}}(jQuery,void 0);