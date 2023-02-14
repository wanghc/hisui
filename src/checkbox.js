/**
 * 兼容IE6,IE8
 */
(function($){
    function hideTip(name){
        var nameList = $("input[name='"+name+"']");
        if (nameList.length>0){
            var target = nameList.last()[0];
            var status = $.data(target, "checkbox");
            if(status){         /*渲染第一个时，第二个，第三个还未渲染*/
                var box = status.proxy;
                $(box).tooltip('hide');
            }
        }
    }
    function showTip(name) {
        var nameList = $("input[name='"+name+"']");
        if (nameList.length>0){
            if (nameList.last().next().hasClass('invalid')){
                var target = nameList.last()[0];
                var status = $.data(target, "checkbox");
                if(status){ /*渲染第一个时，第二个，第三个还未渲染*/
                    var opts = status.options;
                    var box = status.proxy;
                    $(box).tooltip($.extend({}, opts.tipOptions, { content: opts.missingMessage, position: opts.tipPosition, deltaX: opts.deltaX })).tooltip("show");
                    status.tip = true;
                }
            }
        }
    };
    function isValid(target){
        var status = $.data(target,'checkbox');
        if (!status) return false;
        var opts = status.options;
        if (opts.name){
            //status.message="";
            var box = $(target).next();
            if (opts.novalidate || box.is(":disabled")) {
                return true;
            }
            var nameList = $("input[name='"+opts.name+"']");
            nameList.next().removeClass('invalid');
            //if (opts.showErrorTip) hideTip(nameList.last()[0]);
            var checkedList = nameList.filter(":checked");
            if (checkedList.length==0 && opts.required) {
                nameList.next().addClass('invalid');
                //status.message = opts.missingMessage;
                //if (opts.showErrorTip) showTip(nameList.last()[0]);
                return false;
            }
        }
        return true;
    }
	function createCheckBox(target){
        var t = $(target).empty();
        var state= $.data(target, 'checkbox');
        var opts =state.options;
        if (!opts.id){
            opts.id=opts.label;
            t.attr("id",opts.id);
        }
        t.prop("disabled",opts.disabled);
        t.prop("checked",opts.checked);
        if (!t.hasClass('checkbox-f')){
            opts.originalValue = t.prop("checked");   //将初始状态值记录下来 cryze 2019-04-04
            t.addClass('checkbox-f');                //在原dom增加类checkbox-f
            var inputCls = target.className.replace('hisui-checkbox','').replace('checkbox-f','') ;
            var labelHtml = '<label class="checkbox '+inputCls;
            if (opts.boxPosition=="right"){labelHtml +=' right';}
            if (opts.disabled){labelHtml += ' disabled'; }
            if (opts.checked){labelHtml += ' checked'; }
            labelHtml += '"'; //className handler end
            if (opts.width){ labelHtml+=' style="width:'+opts.width+'px" '}
            labelHtml += '>'+$.hisui.getTrans(opts.label)+'</label>';  //add trans
            var objlabel = $(labelHtml).insertAfter(t);
            objlabel.unbind('click').bind('click.checkbox',function(e){
                if($(target).prop("disabled")==false) setValue(target,!$(this).hasClass('checked'));  
            });
            t.unbind('click').bind('click.checkbox',function(e){ 
                //如果原生checkbox是disabled时,不会进入
                //if ($(this).prop("disabled")==false){
                    var val = $(this).is(':checked');
                    if(val){
                        if (opts.onChecked) opts.onChecked.call(this,e,true);
                        if (opts.ifChecked) opts.ifChecked.call(this,e,true);
                    }else{
                        if (opts.onUnchecked) opts.onUnchecked.call(this,e,false);
                        if (opts.ifUnchecked) opts.ifUnchecked.call(this,e,false);
                    }
                    if (opts.onCheckChange) opts.onCheckChange.call(this,e,val);
                    if (opts.ifToggled) opts.ifToggled.call(this,e,val);
                    t.trigger("ifChanged");
                //}
                //e.stopPropagation();
                //return false;
            });
            var assignedLabels=$('label[for="' + opts.id + '"]').add(t.closest('label')) ; //for= 或checkbox在label内
            if (assignedLabels.length) {
                assignedLabels.off('.checkbox').on('click.checkbox mouseover.checkbox mouseout.checkbox ', function (event) {
                  var type = event['type'],
                    item = $(this);
                  if (!$(target).prop("disabled")) {
                    if (type == 'click') {
                      if ($(event.target).is('a')) {
                        return;
                      }
                      setValue(target,!objlabel.hasClass('checked')); //此处也和objlabel 点击取值一致
                    } else {
                      // mouseout|touchend
                      if (/ut|nd/.test(type)) {
                        objlabel.removeClass('hover');
                      } else {
                        objlabel.addClass('hover');
                      }
                    }
                    return false;
                  }
                });
              }
            state.proxy=objlabel; //把objlabel存起来
        }else{
            
            var objlabel=state.proxy; //取到对应label
            if (opts.disabled && !objlabel.hasClass('disabled')) objlabel.addClass('disabled');
            if (!opts.disabled && objlabel.hasClass('disabled')) objlabel.removeClass('disabled');
            // 解决$(id).checkbox({checked:false}); 
            if (opts.checked && !objlabel.hasClass('checked')) objlabel.addClass('checked');
            if (!opts.checked && objlabel.hasClass('checked')) objlabel.removeClass('checked');

            if (opts.label!=objlabel.text()) objlabel.text(opts.label);
            
        }
        if (opts.required){
            objlabel.unbind('mouseenter').bind('mouseenter.checkbox',function(e){
                var _t = $(this);
                if (!_t.hasClass('disabled')){
                    showTip(opts.name);
                }
            }).unbind('mouseleave').bind('mouseleave.checkbox',function(e){
                var _t = $(this);
                if (!_t.hasClass('disabled')){
                    hideTip(opts.name);
                }              
            });
        }
        if (opts.name && !t.attr('name')){ //如果options有name,元素属性上没name
            t.attr('name',opts.name);
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
    function fixCls(target){
        //新版如果直接改原生组件值 同样有问题
        var objlabel= ($.data(target, 'checkbox')||$.data(target, 'radio')||{})['proxy'];
        if (objlabel){
            var state= $.data(target, 'checkbox');
            if (state) state.options.checked = $(target).prop('checked');
            if ($(target).prop('checked') && !objlabel.hasClass('checked')) objlabel.addClass('checked');
            if (!$(target).prop('checked') && objlabel.hasClass('checked')) objlabel.removeClass('checked');
            isValid(target);
        }
        if ($.browser.msie && navigator.userAgent.indexOf("MSIE 9.0")>-1){ //$.browser.version < 11) {
			var jqt = objlabel;
            jqt.css('background-position', "-6px 0px");
            if (jqt.hasClass('checked') && jqt.hasClass('disabled')){
                jqt.css('background-position', "-6px -96px");
                return;
			}
			if (jqt.hasClass('checked')){
				jqt.css('background-position', "-6px -48px");
			}
			if (jqt.hasClass('disabled')){
				jqt.css('background-position', "-6px -72px") ;
			}			
			if (jqt.hasClass('invalid')){
				jqt.css('background-position', "-6px -240px");
			}
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
            isValid(this);
		});
	};
	function setValue(target,val) {
        if (val != $(target).is(":checked")){
            if ($(target).prop("disabled")==true){
                //disabled时: 1.测试发现icheck可以setValue,建卡--默认密码勾; 2.不trigger事件
                $(target).prop("disabled",false);
                $(target).prop("checked",val);
                $(target).prop("disabled",true);
            }
            var objlabel= ($.data(target, 'checkbox')||$.data(target, 'radio')||{})['proxy'];
            if (val){
                objlabel.addClass('checked');
            }else{
                objlabel.removeClass('checked');
            }
            $(target).trigger('click.checkbox');
        }
        fixCls(target);
    }
    function getValue(target){
        return $(target).is(':checked');
    }
    function setDisable(target,value){  //设置禁用状态 cryze 2019-08-27
        value=(value==true);
        var state= $.data(target, 'checkbox')||$.data(target, 'radio')||{};
        var objlabel=state.proxy;
        if (objlabel) {
            $(target).prop("disabled",value);
            if (value) objlabel.addClass('disabled');
            else objlabel.removeClass('disabled');
            state.options.disabled=value;
            $(target).trigger("ifChanged");
        }
    }
    function setRequired(target,flag){
        $(target).checkbox({required:flag});
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
                setDisable(this,value);
            });
        },
        check:function(jq){
            return jq.each(function(){
                setValue(this,true);
            });
        },
        uncheck:function(jq){
            return jq.each(function(){
                setValue(this,false);
            });
        },
        toggle:function(jq){
            return jq.each(function(){
                setValue(this,!getValue(this));
            });
        },
        disable:function(jq){
            return jq.each(function(){
                setDisable(this,true);
            });
        },
        enable:function(jq){
            return jq.each(function(){
                setDisable(this,false);
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
        },isValid:function(jq){
            var rtn = false;
            jq.each(function(){
                rtn = isValid(this);
            });
            return rtn;
        },
        setRequired:function(jq,value){
            return jq.each(function(){
                setRequired(this,value);
            });
        }
    };
    
	$.fn.checkbox.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target,["label","name","id","checked","width","required"]), {
			disabled: (t.attr('disabled') ? true : undefined)
		});
	};
	
    $.fn.checkbox.defaults = {
        id:null,
        label:'',
        width:null,
        boxPosition:"left",
		disabled:false,
        checked:false,
        onCheckChange:null,
        onChecked:null,
        onUnchecked:null,
        ifChecked:null,
        ifUnchecked:null,
        ifToggled:null,
        required:false,  /*2020-07-26是否必选*/
        novalidate:false,
        missingMessage: "This field is required.",
        validating:false,
        tipPosition:'right',deltaX:0,
        tipOptions: {
            position:"right",showEvent: "none", hideEvent: "none", showDelay: 0, hideDelay: 0, zIndex: "", onShow: function () {
                //$(this).tooltip("tip").css({ color: "#000", borderColor: "#CC9933", backgroundColor: "#FFFFCC" });
            }, onHide: function () {
                $(this).tooltip("destroy");
            }
        }
	};
})(jQuery);