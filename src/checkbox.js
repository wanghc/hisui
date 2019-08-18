/**
 * 兼容IE6,IE8
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
        opts.originalValue = t.prop("checked");   //将初始状态值记录下来 cryze 2019-04-04
        if (!t.hasClass('checkbox-f')){
            t.addClass('checkbox-f');                //在原dom增加类checkbox-f
            var labelHtml = '<label class="checkbox';
            if (opts.disabled){labelHtml += ' disabled'; }
            if (opts.checked){labelHtml += ' checked'; }
            labelHtml += '">'+opts.label+'</label>';
            var objlabel = $(labelHtml).insertAfter(t);
            objlabel.unbind('click').bind('click.checkbox',function(e){
                setValue(target,!$(this).hasClass('checked'));
            });
            t.unbind('click').bind('click.checkbox',function(e){
                if ($(this).prop("disabled")==false){
                    var val = $(this).is(':checked');
                    if(val){
                        if (opts.onChecked) opts.onChecked.call(this,e,true);
                    }else{
                        if (opts.onUnchecked) opts.onUnchecked.call(this,e,false);
                    }
                    if (opts.onCheckChange) opts.onCheckChange.call(this,e,val);
                }
                e.stopPropagation();
                return false;
            });
        }
        var lastState=$.data(target, 'checkbox'); //cryze 2019-4-15
        // cryze 2019-4-15 第二次初始化时 调用iCheck 通过$.data(ele,name,data) 缓存的数据会丢失 再存回去
        $.data(target, 'checkbox',lastState);
        t.hide();
    }
    /*通过直接改变checkbox的值，或者用form.reset()  会出现样式和选中状态不一致的现象  
    *如checkbox未选中 样式选中  这时想调用取消选中方法发现无效果 
    *在 check uncheck setValue toggle 后调用 fixCls 同步样式
    *add cryze 2019-04-04
    */
    function fixCls(t){
        /*if($(t).is(':checked')){
            $(t).next().addClass('checked');
        }else{
            $(t).next().removeClass('checked');
        }*/

        return ;
        //var checkedClass=$(t).checkbox('options').checkedClass||'checked';
        //cryze 2019-04-17 是radio 但是却当checkbox调用  之前没加fixCls是可以正常用的 兼容下错误用法 
        var checkedClass=(($.data(t,'checkbox')||$.data(t,'radio')||{})['options']||{})['checkedClass']||'checked';
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
	function setValue(target,val) {
        if ($(target).prop("disabled")==false){
            if (val!=$(target).is(":checked")){
                $(target).prop("checked",val);
                if (val){
                    $(target).next().addClass('checked');
                }else{
                    $(target).next().removeClass('checked');
                }
                $(target).trigger('click.checkbox');
            }
        }
    }
    function getValue(target){
        return $(target).is(':checked');
    }
	$.fn.checkbox.methods = {
		options: function(jq){
			return $.data(jq[0], 'checkbox').options;
        },
        setValue:function(jq,value){
            return jq.each(function(){
                setValue(this,value);
                fixCls(this);
            });
        },
        getValue:function(jq){
            return getValue(jq[0]);
            //return jq.eq(0).is(':checked');  
            //checkbox 是先改变checkBox的状态，触发事件，改变样式 ,原本getValue取是否有样式类,在onChecked事件获取会获取到未选中  所以getValue改为取checked的状态
            //return jq.eq(0).parent().hasClass("checked")?true:false; 
        },
        setDisable:function(jq,value){
            return jq.each(function(){
                var _t = $(this);
                _t.prop("disabled",true);
                _t.next().addClass("disabled");
            });
        },
        check:function(jq){
            return jq.each(function(){
                setValue(this,true);
                fixCls(this);
            });
        },
        uncheck:function(jq){
            return jq.each(function(){
                setValue(this,false);
                fixCls(this);
            });
        },
        toggle:function(jq){
            return jq.each(function(){
                setValue(this,!getValue(this));
                fixCls(this);
            });
        },
        disable:function(jq){
            return jq.each(function(){
                $(this).prop("disabled",true);
                $(this).next().addClass('disabled');
            });
        },
        enable:function(jq){
            return jq.each(function(){
                $(this).prop("disabled",false);
                $(this).next().removeClass('disabled');
            });
        },
        indeterminate:function(jq){ //第三状态
            return jq.each(function(){
                //$(this).iCheck('indeterminate');
            });
        },
        determinate:function(jq){
            return jq.each(function(){
                //$(this).iCheck('determinate');
            });
        },
        update:function(jq){},
        destroy:function(jq){},
        clear:function(jq){ //cryze 2019-04-04 add clear 
            return jq.each(function(){
                setValue(this,false);
            });
        },
        reset:function(jq){  //cryze 2019-04-04 add reset 
            return jq.each(function(){
                var originalValue = $(this).checkbox('options').originalValue||false;
                setValue(this,originalValue);
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
		disabled:false,
        checked:false,
        onCheckChange:null,
        onChecked:null,
        onUnchecked:null
	};
})(jQuery);