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
        t.after('<label for="'+opts.id+'">'+opts.label+'</label>');
        t.iCheck(opts);
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
            });
        },
        getValue:function(jq){
            return jq.eq(0).parent().hasClass("checked")?true:false; 
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
            });
        },
        uncheck:function(jq){
            return jq.each(function(){
                $(this).iCheck('uncheck');
            });
        },
        toggle:function(jq){
            return jq.each(function(){
                $(this).iCheck('toggle');
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
