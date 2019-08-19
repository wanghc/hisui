/**
 * 兼容IE6,IE8 
 */
(function($){
	function createRadio(target){
        var t = $(target).empty();
        var opts = $.data(target, 'radio').options;
        if (!opts.id){
            opts.id=opts.label;
            t.attr("id",opts.id);
        }
        if(opts.name!="") t.attr("name",opts.name);
        t.prop("disabled",opts.disabled);
        t.prop("checked",opts.checked);
        
        opts.originalValue = t.prop("checked");   //将初始状态值记录下来 cryze 2019-04-04
        if (!t.hasClass('radio-f')){
            t.addClass('radio-f')                //在原dom增加类radio-f
            var labelHtml = '<label class="radio';
            if (opts.radioClass){ labelHtml+=" hischeckbox_square-blue";}
            if (opts.disabled){ labelHtml += ' disabled';}
            if (opts.checked){ labelHtml += ' checked';}
            labelHtml += '">'+opts.label+'</label>';
            var objlabel = $(labelHtml).insertAfter(t);
            /**事件转到input上*/
            objlabel.unbind('click').bind('click.radio',function(e){
                setValue(target,!$(this).hasClass('checked'));
            });
            t.unbind('click').bind('click.radio',function(e){
                if ($(this).prop("disabled")==false){
                    //setValue(this,!$(this).is(':checked'));
                    var val = $(this).is(':checked');
                    if (val){
                        if (opts.onChecked) opts.onChecked.call(this,e,true);
                    }else{
                        //if (opts.onUnchecked) opts.onUnchecked.call(this,e,false);
                    }
                    if (opts.onCheckChange) opts.onCheckChange.call(this,e,val);
                }
                //e.stopPropagation();
                //return false;
            });
        }
        var lastState=$.data(target, 'radio'); //cryze 2019-4-15
        // cryze 2019-4-15 第二次初始化时 调用iCheck 通过$.data(ele,name,data) 缓存的数据会丢失 再存回去
        $.data(target, 'radio',lastState);
        t.hide();
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
	function setValue(target,val) {
        if ($(target).prop("disabled")==false){
            if ( (val===true)&&(val!=$(target).is(":checked"))){
                var name = $(target).attr('name');
                $('input.radio-f[name="'+name+'"]').next().removeClass('checked');
                $(target).prop("checked",val);
                if (val){
                    $(target).next().addClass('checked');
                }else{
                    $(target).next().removeClass('checked');
                }
                $(target).trigger('click.radio');
            }
        }
    }
    function getValue(target){
        return $(target).is(':checked');
    }
	$.fn.radio.methods = {
		options: function(jq){
			return $.data(jq[0], 'radio').options;
        },
        setValue:function(jq,value){
            return jq.each(function(){
                setValue(jq[0],value);
                fixCls(this);
            });
        },
        getValue:function(jq){
            return getValue(jq[0]);
            //return jq.eq(0).is(':checked');  //radio 是先改变radio的状态，触发事件，改变样式  所以getValue取checked状态
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
                
            });
        },
        determinate:function(jq){
            return jq.each(function(){
                
            });
        },
        update:function(jq){
           
        },
        destroy:function(jq){
            
        },clear:function(jq){ //cryze 2019-04-04 add clear 
            return jq.each(function(){
                setValue(this,false);
            });
        },reset:function(jq){  //cryze 2019-04-04 add reset 
            return jq.each(function(){
                var originalValue=$(this).radio('options').originalValue||false;
                setValue(this,originalValue);
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
        radioClass:"",
		disabled:false,
        checked:false,
        onCheckChange:null,
        onChecked:null
	};
	
})(jQuery);
