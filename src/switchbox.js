/**
 * switchbox  在switch插件基础上编写, 写成easyui类接口 
 */
(function($){
	function createSwitchBox(target){
        /*text: 'data-text-label',
        onText: 'data-on-label',
        offText: 'data-off-label',
        onClass: 'data-on',
        offClass: 'data-off',
        sizeClass: function (jq, cls) {
            jq.addClass(cls);
        },
        onSwitchChange: function (jq, fn) {
            jq.on('switch-change', fn);
        }*/
        var t = $(target).empty();
        var opts = $.data(target, 'switchbox').options;
        if (!t.hasClass('has-switch')) {
            var h = '';
            if (opts.disabled){
                h +=' disabled ';
            }
            if (opts.checked){
                h +=' checked '
            }
            t.append('<input type="checkbox"'+h+'>');
        }
        if (opts.size=='mini'){
            t.addClass('switch-mini');
        }else if (opts.size=='small'){
            t.addClass('switch-small');
        }else if(opts.size=='large'){
            t.addClass('switch-large');
        }
        t.attr('data-on',opts.onClass);
        t.attr('data-off',opts.offClass);
        t.attr('data-on-label',opts.onText);
        t.attr('data-off-label',opts.offText);
        t.attr('data-animated',opts.animated);
        t.bootstrapSwitch();
        // switch-change
        t.bind('switch-change',function(e,value){
            if (!opts.disabled){
				opts.onSwitchChange.call(this,e,value);
			}
			return false;
        });
    }
	$.fn.switchbox = function(options, param){
		if (typeof options == 'string'){
			return $.fn.switchbox.methods[options](this, param);
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'switchbox');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'switchbox', {
					options: $.extend({}, $.fn.switchbox.defaults, $.fn.switchbox.parseOptions(this), options)
				});
				$(this).removeAttr('disabled');
			}
			createSwitchBox(this);
		});
	};
	
	$.fn.switchbox.methods = {
		options: function(jq){
			return $.data(jq[0], 'switchbox').options;
        },
        /*obj.on = function (eventString, fn) {
            if (eventString === 'switchChange') {
                that.unbind('switch-change');
                that.on('switch-change', fn);
            }
            return jqSwitch;
        };*/
        /* toggle--disabled*/
		toggleActivation:function(jq){
            return jq.each(function(){
                $(this).bootstrapSwitch('toggleActivation');
            });
        },
		/* toggle--isEnabled*/
        isActive:function(jq){
            //cryze 2018-3-8
            //return jq.each(function(){
            //    $(this).bootstrapSwitch('isActive');
            //});
            return jq.eq(0).bootstrapSwitch('isActive');
        },
		/*set enable*/
        setActive:function(jq,value){
            return jq.each(function(){
                $(this).bootstrapSwitch('setActive',value);
            });
        },
        toggle:function(jq){
            return jq.each(function(){
                $(this).bootstrapSwitch('toggleState');
            });
        },
        setValue:function(jq,value,skipOnChange){ /*增加是否触发事件入参skipOnChange*/
            return jq.each(function(){
                $(this).bootstrapSwitch('setState',value,skipOnChange||true);
            });
        },
        getValue:function(jq){
            //cryze 2018-3-8
            //return jq.each(function(){
            //   $(this).bootstrapSwitch('status');
            //});
            return jq.eq(0).bootstrapSwitch('status');
        },
        setOnText:function(jq,value){
            return jq.each(function(){
                $(this).bootstrapSwitch('setOnLabel',value);
            });
        },
        setOffText:function(jq,value){
            return jq.each(function(){
                $(this).bootstrapSwitch('setOffLabel',value);
            });
        },
        setOnClass:function(jq,value){
            return jq.each(function(){
                $(this).bootstrapSwitch('setOnClass',value);
            });
        },
        setOffClass:function(jq,value){
            return jq.each(function(){
                $(this).bootstrapSwitch('setOffClass',value);
            });
        },
		destroy:function(jq){
            return jq.each(function(){
                $(this).bootstrapSwitch('destroy');
            });
        }
    };
    
	$.fn.switchbox.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, 
			['id','iconCls','iconAlign','group','size',{plain:'boolean',toggle:'boolean',selected:'boolean'}]
		), {
			disabled: (t.attr('disabled') ? true : undefined)
		});
	};
	
	$.fn.switchbox.defaults = {
		id: null,
		disabled: false,
        checked:true,
        animated:false,
		size: 'mini',	//mini  small,large
        onText:'ON', //'开',     // <i class='icon-ok icon-white'></i>
        offText:'OFF', //'关',    // <i class='icon-remove'></i>
        onClass:'success', // primary info success warning danger 
        offClass:'warning',
        onSwitchChange:function(event,value){}
	};
	
})(jQuery);
