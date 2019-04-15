/**
 * checkbox  在icheck插件基础上编写, 写成easyui类接口 
 */
(function($){
	function createCheckBox(target){
        var t = $(target).empty();
        var opts = $.data(target, 'checkbox').options;
        if (!opts.id){
            opts.id=opts.label;
            t.attr("id",opts.id);
        }
        t.prop("disabled",opts.disabled);
        t.prop("checked",opts.checked);
        
        opts.originalValue=t.prop("checked"); //将初始状态值记录下来 cryze 2019-04-04
        t.addClass('checkbox-f')  //在原dom增加类checkbox-f

        t.after('<label for="'+opts.id+'">'+opts.label+'</label>');

        var lastState=$.data(target, 'checkbox'); //cryze 2019-4-15
        t.iCheck(opts);
        // cryze 2019-4-15 第二次初始化时 调用iCheck 通过$.data(ele,name,data) 缓存的数据会丢失 再存回去
        $.data(target, 'checkbox',lastState);  

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
    /*通过直接改变checkbox的值，或者用form.reset()  会出现样式和选中状态不一致的现象  
    *如checkbox未选中 样式选中  这时想调用取消选中方法发现无效果 
    *在 check uncheck setValue toggle 后调用 fixCls 同步样式
    *add cryze 2019-04-04
    */
    function fixCls(t){
        var checkedClass=$(t).checkbox('options').checkedClass||'checked'
        if ( $(t).prop('checked') ){ //checkbox是选中的  样式处于未选中  添加选中样式
            if (!$(t).parent().hasClass(checkedClass)) $(t).parent().addClass(checkedClass);  //
        }else{   //checkbox未选中的     样式是选中的  移除选中样式
            if ($(t).parent().hasClass(checkedClass)) $(t).parent().removeClass(checkedClass);  
        }
    }
	$.fn.checkbox = function(options, param){
		if (typeof options == 'string'){
			return $.fn.checkbox.methods[options](this, param);
		}
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'checkbox');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'checkbox', {
					options: $.extend({}, $.fn.checkbox.defaults, $.fn.checkbox.parseOptions(this), options)
				});
			}
			createCheckBox(this);
		});
	};
	
	$.fn.checkbox.methods = {
		options: function(jq){
			return $.data(jq[0], 'checkbox').options;
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
            return jq.eq(0).is(':checked');  //checkbox 是先改变checkBox的状态，触发事件，改变样式 ,原本getValue取是否有样式类,在onChecked事件获取会获取到未选中  所以getValue改为取checked的状态
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
                $(this).checkbox('setValue',false);
            });
        },reset:function(jq){  //cryze 2019-04-04 add reset 
            return jq.each(function(){
                var originalValue=$(this).checkbox('options').originalValue||false;
                $(this).checkbox('setValue',originalValue);
            });
        }
    };
    
	$.fn.checkbox.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target,["label","name","id","checked"]), {
			disabled: (t.attr('disabled') ? true : undefined)
		});
	};
	
    $.fn.checkbox.defaults = {
        id:null,
        label:'',
        // 'checkbox' or 'radio' to style only checkboxes or radio buttons, both by default
        handle:'',  //icheck插件支持checkbox与radio ,both by default
        // base class added to customized checkboxes
        checkboxClass: 'hischeckbox_square-blue', //'icheckbox',
        // class added on checked state (input.checked = true)
        checkedClass: 'checked',
          // if not empty, used instead of 'checkedClass' option (input type specific)
          checkedCheckboxClass: '',
        // if not empty, added as class name on unchecked state (input.checked = false)
        uncheckedClass: '',
          // if not empty, used instead of 'uncheckedClass' option (input type specific)
          uncheckedCheckboxClass: '',
        // class added on disabled state (input.disabled = true)
        disabledClass: 'disabled',
          // if not empty, used instead of 'disabledClass' option (input type specific)
          disabledCheckboxClass: '',
        // if not empty, added as class name on enabled state (input.disabled = false)
        enabledClass: '',
          // if not empty, used instead of 'enabledClass' option (input type specific)
          enabledCheckboxClass: '',
        // class added on indeterminate state (input.indeterminate = true)
        indeterminateClass: 'indeterminate',
          // if not empty, used instead of 'indeterminateClass' option (input type specific)
          indeterminateCheckboxClass: '',
        // if not empty, added as class name on determinate state (input.indeterminate = false)
        determinateClass: '',
          // if not empty, used instead of 'determinateClass' option (input type specific)
          determinateCheckboxClass: '',
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
