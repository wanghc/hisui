/**
 * radio  在icheck插件基础上编写, 写成easyui类接口 
 */
(function($){
	function createRadio(target){
        var t = $(target).empty();
        var opts = $.data(target, 'radio').options;
        if (!opts.id){
            opts.id=opts.label;
            t.attr("id",opts.id);
        }
        t.prop("disabled",opts.disabled);
        t.prop("checked",opts.checked);
        
        opts.originalValue=t.prop("checked");//将初始状态值记录下来 cryze 2019-04-04
        t.addClass('radio-f'); //在原dom增加类 radio-f

        t.after('<label for="'+opts.id+'">'+opts.label+'</label>');
        t.attr("name",opts.name); 
        var lastState=$.data(target, 'radio'); //cryze 2019-4-15
        t.iCheck(opts);
        // cryze 2019-4-15 第二次初始化时 调用iCheck 通过$.data(ele,name,data) 缓存的数据会丢失 再存回去
        $.data(target, 'radio',lastState);  

        t.bind('ifChecked',function(e,value){
            if (!opts.disabled){
                if (opts.onChecked) opts.onChecked.call(this,e,value);
			}
			return false;
        }).bind('ifUnchecked',function(e,value){
            if (!opts.disabled){
                if (opts.onUnchecked) opts.onUnchecked.call(this,e,value);
			}
			return false;
        }).bind('ifToggled',function(e, value){
            if (!opts.disabled){
                if (opts.onCheckChange) opts.onCheckChange.call(this,e,value);
			}
			return false;            
        });
    }
    /*通过直接改变radio的值，或者用form.reset()  会出现样式和选中状态不一致的现象  
    *如radio未选中 样式选中  这时想调用取消选中方法发现无效果 
    *在 check uncheck setValue toggle 后调用 fixCls 同步样式
    *add cryze 2019-04-04
    */
    function fixCls(t){
        //var checkedClass=$(t).radio('options').checkedClass||'checked'
        //cryze 2019-04-17 是checkbox 但是却当radio  之前没加fixCls是可以正常用的 兼容下错误用法 
        var checkedClass=(($.data(t,'radio')||$.data(t,'checkbox')||{})['options']||{})['checkedClass']||'checked';  
        if ( $(t).prop('checked') ){ //checkbox是选中的  样式处于未选中  添加选中样式
            if (!$(t).parent().hasClass(checkedClass)) $(t).parent().addClass(checkedClass);  //
        }else{   //checkbox未选中的     样式是选中的  移除选中样式
            if ($(t).parent().hasClass(checkedClass)) $(t).parent().removeClass(checkedClass);  
        }
    }
	$.fn.radio = function(options, param){
		if (typeof options == 'string'){
			return $.fn.radio.methods[options](this, param);
		}
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'radio');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'radio', {
					options: $.extend({}, $.fn.radio.defaults, $.fn.radio.parseOptions(this), options)
                });
			}
			createRadio(this);
		});
	};
	
	$.fn.radio.methods = {
		options: function(jq){
			return $.data(jq[0], 'radio').options;
        },
        setValue:function(jq,value){
            return jq.each(function(){
                var _t = $(this);
                if (value === true) {
					_t.iCheck('check');
				} else {
					_t.iCheck('uncheck');
                }
                fixCls(this);
            });
        },
        getValue:function(jq){
            return jq.eq(0).is(':checked');  //radio 是先改变radio的状态，触发事件，改变样式  所以getValue取checked状态
            //return jq.eq(0).parent().hasClass("checked")?true:false; 
        },
        setDisable:function(jq,value){
            return jq.each(function(){
                var _t = $(this);
                if (value === true) {
					_t.iCheck('disable');
				} else {
					_t.iCheck('enable');
				}
            });
        },
        check:function(jq){
            return jq.each(function(){
                $(this).iCheck('check');
                fixCls(this);
            });
        },
        uncheck:function(jq){
            return jq.each(function(){
                $(this).iCheck('uncheck');
                fixCls(this);
            });
        },
        toggle:function(jq){
            return jq.each(function(){
                $(this).iCheck('toggle');
                fixCls(this);
            });
        },
        disable:function(jq){
            return jq.each(function(){
                $(this).iCheck('disable');
            });
        },
        enable:function(jq){
            return jq.each(function(){
                $(this).iCheck('enable');
            });
        },
        indeterminate:function(jq){ //第三状态
            return jq.each(function(){
                $(this).iCheck('indeterminate');
            });
        },
        determinate:function(jq){
            return jq.each(function(){
                $(this).iCheck('determinate');
            });
        },
        update:function(jq){
            return jq.each(function(){
                $(this).iCheck('update');
            });
        },
        destroy:function(jq){
            return jq.each(function(){
                $(this).iCheck('destroy');
            });
        },clear:function(jq){ //cryze 2019-04-04 add clear 
            return jq.each(function(){
                $(this).radio('setValue',false);
            });
        },reset:function(jq){  //cryze 2019-04-04 add reset 
            return jq.each(function(){
                var originalValue=$(this).radio('options').originalValue||false;
                $(this).radio('setValue',originalValue);
            });
        }
    };
    
	$.fn.radio.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target,['label','id','name','checked']), {
			disabled: (t.attr('disabled') ? true : undefined)
		});
	};
	
    $.fn.radio.defaults = {
        id:null,
        label:'',
        name:'',
        // 'checkbox' or 'radio' to style only checkboxes or radio buttons, both by default
        handle:'',  //icheck插件支持checkbox与radio ,both by default
        // base class added to customized radio buttons
        radioClass: 'hisradio_square-blue', //'iradio',
        // class added on checked state (input.checked = true)
        checkedClass: 'checked',
          checkedRadioClass: '',
        // if not empty, added as class name on unchecked state (input.checked = false)
        uncheckedClass: '',
          uncheckedRadioClass: '',
        // class added on disabled state (input.disabled = true)
        disabledClass: 'disabled',
          disabledRadioClass: '',
        // if not empty, added as class name on enabled state (input.disabled = false)
        enabledClass: '',
          enabledRadioClass: '',
        // class added on indeterminate state (input.indeterminate = true)
        indeterminateClass: 'indeterminate',
          indeterminateRadioClass: '',
        // if not empty, added as class name on determinate state (input.indeterminate = false)
        determinateClass: '',
          determinateRadioClass: '',
        // class added on hover state (pointer is moved onto input)
        hoverClass: 'hover',
        // class added on focus state (input has gained focus)
        focusClass: 'focus',
        // class added on active state (mouse button is pressed on input)
        activeClass: 'active',
        // adds hoverClass to customized input on label hover and labelHoverClass to label on input hover
        labelHover: true,
          // class added to label if labelHover set to true
          labelHoverClass: 'hover',
        // increase clickable area by given % (negative number to decrease)
        increaseArea: '',
        // true to set 'pointer' CSS cursor over enabled inputs and 'default' over disabled
        cursor: false,
        // set true to inherit original input's class name
        inheritClass: false,
        // if set to true, input's id is prefixed with 'iCheck-' and attached
        inheritID: false,
        // set true to activate ARIA support
        aria: false,
        // add HTML code or text inside customized input
        insert: '',
		disabled:false,
        checked:false,
        onCheckChange:null,
        onChecked:null
	};
	
})(jQuery);
