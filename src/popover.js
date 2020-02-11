/**
 * popover  在web-popover插件基础上编写, 写成hisui类接口 
 */
(function($){
	function createPopover(target){
        var t = $(target);
        var opts = $.data(target, 'popover').options;
        if (!opts.id){
            opts.id=opts.label;
            t.attr("id",opts.id);
        }
        t.prop("disabled",opts.disabled);
        if(!opts.cache)
            t.webuiPopover('destroy');// yp 2020-01-05 删除该元素所绑定的popover及绑定的数据，避免重复为同一个元素新建popover时无法成功新建，导致popover显示的依然是新建前的内容
        t.webuiPopover(opts);
        /*t.bind('ifChecked',function(e,value){
            if (!opts.disabled){
                if (opts.onChecked) opts.onChecked.call(this,e,value);
			}
			return false;
        }).bind('ifUnchecked',function(e,value){
            if (!opts.disabled){
                if (opts.onUnchecked) opts.onUnchecked.call(this,e,value);
			}
			return false;
        })*/
    }
	$.fn.popover = function(options, param){
		if (typeof options == 'string'){
			return $.fn.popover.methods[options](this, param);
		}
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'popover');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'popover', {
					options: $.extend({}, $.fn.popover.defaults, $.fn.popover.parseOptions(this), options)
				});
			}
			createPopover(this);
		});
	};
	
	$.fn.popover.methods = {
		options: function(jq){
			return $.data(jq[0], 'popover').options;
        },
        show:function(jq){
            return jq.each(function(){
                var _t = $(this);
                _t.webuiPopover('show');
            });
        },
        hide:function(jq){
            return jq.each(function(){
                var _t = $(this);
                // yp 2019-10-22 判断cache是否是false，避免cache是false的时候无法彻底销毁popover，导致popover重构出错
                if(!$.data(this, 'popover').options.cache){
                    _t.webuiPopover('destroy');
                }
                else{
                    _t.webuiPopover('hide');
                }
            });
        },
        destroy:function(jq){
            return jq.each(function(){
                $(this).webuiPopover('destroy');
            });
        },
        senContent:function(jq,value){//yp 2020-02-11 添加setContent方法，用于修改popover弹出层的内容
            return jq.each(function(){
                var oldCache = $.data(this, 'popover').options.cache;
                if($.data(this, 'popover').options.cache){
                    $.data(this, 'popover').options.cache = false;
                }
                var _t = $(this);
                var opts = $.data(this, 'popover').options;
                opts.content = value;
                _t.webuiPopover('destroy');
                _t.webuiPopover(opts);
                $.data(this, 'popover').options.cache = oldCache;
            });
        }
    };
	$.fn.popover.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target,["id"]), {
			disabled: (t.attr('disabled') ? true : undefined)
		});
	};
    $.fn.popover.defaults = {
        id:null,
        disabled:false,
        placement:'auto',//values: auto,top,right,bottom,left,top-right,top-left,bottom-right,bottom-left,auto-top,auto-right,auto-bottom,auto-left,horizontal,vertical
        container: document.body,// The container in which the popover will be added (i.e. The parent scrolling area). May be a jquery object, a selector string or a HTML element. See https://jsfiddle.net/1x21rj9e/1/
        width:'auto',//can be set with  number
        height:'auto',//can be set with  number
        trigger:'click',//values:  click,hover,manual(handle events by your self),sticky(always show after popover is created);
        selector:false,// jQuery selector, if a selector is provided, popover objects will be delegated to the specified. 
        style:'',//values:'',inverse
        animation:null, //pop with animation,values: pop,fade (only take effect in the browser which support css3 transition)
        delay: {//show and hide delay time of the popover, works only when trigger is 'hover',the value can be number or object
            show: null,
            hide: 300
        },
        async: {
            type:'GET', // ajax request method type, default is GET
            before: function(that, xhr) {},//executed before ajax request
            success: function(that, data) {},//executed after successful ajax request
            error: function(that, xhr, data) {} //executed after error ajax request
        },
        cache:true,//if cache is set to false,popover will destroy and recreate
        multi:false,//allow other popovers in page at same time
        arrow:true,//show arrow or not
        title:'',//the popover title, if title is set to empty string,title bar will auto hide
        content:'',//content of the popover,content can be function
        closeable:false,//display close button or not
        direction:'', // direction of the popover content default is ltr ,values:'rtl';
        padding:true,//content padding
        type:'html',//content type, values:'html','iframe','async'
        url:'',//if type equals 'html', value should be jQuery selecor.  if type equels 'async' the plugin will load content by url.
        backdrop:false,//if backdrop is set to true, popover will use backdrop on open
        dismissible:true, // if popover can be dismissed by  outside click or escape key
        autoHide:false, // automatic hide the popover by a specified timeout, the value must be false,or a number(1000 = 1s).
        offsetTop:0,  // offset the top of the popover
        offsetLeft:0,  // offset the left of the popover
        onShow: function($element) {}, // callback after show
        onHide: function($element) {} // callback after hide
	};
})(jQuery);
