/**
 * 兼容IE6,IE8 
 */
(function($){
    function hideTip(target){
        var status = $.data(target, "radio");
        if(status){ /*渲染第一个radio时，第二个，第三个radio还未渲染*/
            var box = status.proxy;
            $(box).tooltip('hide');
        }
    }
    function showTip(target) {
        var status = $.data(target, "radio");
        if(status){ /*渲染第一个radio时，第二个，第三个radio还未渲染*/
            var opts = status.options;
            var box = status.proxy;
            $(box).tooltip($.extend({}, opts.tipOptions, { content: opts.missingMessage, position: opts.tipPosition, deltaX: opts.deltaX })).tooltip("show");
            status.tip = true;
        }
    };
    function isValid(target){
        var status = $.data(target,'radio');
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
            if (opts.showErrorTip) hideTip(nameList.last()[0]);
            var checkedList = nameList.filter(":checked");
            if (checkedList.length==0 && opts.required) {
                nameList.next().addClass('invalid');
                //status.message = opts.missingMessage;
                if (opts.showErrorTip) showTip(nameList.last()[0]);
                return false;
            }
        }
        return true;
    }
	function createRadio(target){
        var t = $(target).empty();
        var state=$.data(target, 'radio');
        var opts = state.options;
        if (!opts.id){
            opts.id=opts.label;
            t.attr("id",opts.id);
        }
        if(opts.name!="") t.attr("name",opts.name);
        t.prop("disabled",opts.disabled);
        t.prop("checked",opts.checked);
        
        opts.originalValue = t.prop("checked");   //将初始状态值记录下来 cryze 2019-04-04
        if (!t.hasClass('radio-f')){
            var optRequiredSel = opts.requiredSel;
            t.addClass('radio-f');                //在原dom增加类radio-f
            var labelHtml = '<label class="radio';
            if (opts.boxPosition=="right"){labelHtml +=' right';}
            if (opts.radioClass){ labelHtml+=" hischeckbox_square-blue";}
            if (opts.disabled){ labelHtml += ' disabled';}
            if (opts.checked){ labelHtml += ' checked';}
            labelHtml += '">'+$.hisui.getTrans(opts.label)+'</label>';  //add trans
            var objlabel = $(labelHtml).insertAfter(t);
            /**事件转到input上*/
            objlabel.unbind('click').bind('click.radio',function(e){
                var _t = $(this); 
                if (!_t.hasClass('disabled')){ // disabled时不能点击
                    
                    setValue(target,!_t.hasClass('checked'),!optRequiredSel);
                    
                }
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
            }).bind('ifChecked',function(e,value){ //原生事件太怪了 自定义事件处理
                if (!($(this).prop("disabled"))){
                    if (opts.onChecked) opts.onChecked.call(this,e,value);
                }
                return false;
            }).bind('ifUnchecked',function(e,value){
                if (!($(this).prop("disabled"))){
                    if (opts.onUnchecked) opts.onUnchecked.call(this,e,value);
                }
                return false;
            }).bind('ifToggled',function(e, value){
                if (!($(this).prop("disabled"))){
                    if (opts.onCheckChange) opts.onCheckChange.call(this,e,value);
                }
                return false;            
            });
            var assignedLabels=$('label[for="' + opts.id + '"]').add(t.closest('label')) ; //for= 或radio在label内
            if (assignedLabels.length) {
                assignedLabels.off('.radio').on('click.radio mouseover.radio mouseout.radio ', function (event) {
                  var type = event['type'],
                    item = $(this);
                  if (!$(target).prop("disabled")) {
                    if (type == 'click') {
                      if ($(event.target).is('a')) {
                        return;
                      }
                      setValue(target,!objlabel.hasClass('checked'),!optRequiredSel); //此处也和objlabel 点击取值一致
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

            if (opts.checked && !objlabel.hasClass('checked')) objlabel.addClass('checked');
            if (!opts.checked && objlabel.hasClass('checked')) objlabel.removeClass('checked');

            if ($.hisui.getTrans(opts.label)!=objlabel.text()) objlabel.text($.hisui.getTrans(opts.label));
        }
        if (opts.name && !t.attr('name')){ //如果options有name,元素属性上没name
            t.attr('name',opts.name);
        }

        var lastState=$.data(target, 'radio'); //cryze 2019-4-15
        // cryze 2019-4-15 第二次初始化时 调用iCheck 通过$.data(ele,name,data) 缓存的数据会丢失 再存回去
        $.data(target, 'radio',lastState);
        t.hide();
        status.validating = true;
    }
    /*通过直接改变radio的值，或者用form.reset()  会出现样式和选中状态不一致的现象  
    *如radio未选中 样式选中  这时想调用取消选中方法发现无效果 
    *在 check uncheck setValue toggle 后调用 fixCls 同步样式
    *add cryze 2019-04-04
    */
    function fixCls(target){
        //新版如果直接改原生组件值 同样有问题
        var objlabel= ($.data(target, 'radio')||$.data(target, 'checkbox')||{})['proxy'];
        if (objlabel){
            if ($(target).prop('checked') && !objlabel.hasClass('checked')) objlabel.addClass('checked');
            if (!$(target).prop('checked') && objlabel.hasClass('checked')) objlabel.removeClass('checked');
            isValid(target);
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
            isValid(this);
		});
    };
    /**
     * 
     * @param {*} target 
     * @param {*} val 
     * @param {*} force 通过点击 不允许设置未选中  但是允许通过js调用setValue
     */
	function setValue(target,val,force) {
        var t=$(target);
        if (val!=t.is(":checked")) { 
            var objlabel= ($.data(target, 'radio')||$.data(target, 'checkbox')||{})['proxy'];
            if (val==true){ //on
                var name = $(target).attr('name');
                if (name ){
                    var form = t.closest('form'),
                    inputs = 'input[name="' + name + '"]';
                    inputs = form.length ? form.find(inputs) : $(inputs);

                    inputs.each(function () {
                        if (this !== target && $.data(this,'radio') ) {
                            setValue(this,false,true);
                        }
                    });
                }
                objlabel.addClass('checked');
                $(target).prop('checked',true).trigger('ifChecked',true).trigger('ifToggled',true);
            }else{
                if (force) {
                    objlabel.removeClass('checked');
                    $(target).prop('checked',false).trigger('ifUnchecked',false).trigger('ifToggled',false); 
                }
            }
        }
        fixCls(target);
    }
    function getValue(target){
        return $(target).is(':checked');
    }
    function setDisable(target,value){  //设置禁用状态 cryze 2019-08-27
        value=(value==true);
        var state= $.data(target, 'radio')||$.data(target, 'checkbox')||{};
        var objlabel=state.proxy;
        if (objlabel) {
            $(target).prop("disabled",value);
            if (value) objlabel.addClass('disabled');
            else objlabel.removeClass('disabled');
            state.options.disabled=value;
        }
    }
	$.fn.radio.methods = {
		options: function(jq){
			return $.data(jq[0], 'radio').options;
        },
        setValue:function(jq,value){
            return jq.each(function(){
                setValue(this,value,true);
            });
        },
        getValue:function(jq){
            return getValue(jq[0]);
            //return jq.eq(0).is(':checked');  //radio 是先改变radio的状态，触发事件，改变样式  所以getValue取checked状态
            //return jq.eq(0).parent().hasClass("checked")?true:false; 
        },
        setDisable:function(jq,value){
            return jq.each(function(){
                setDisable(this,value);
            });
        },
        check:function(jq){
            return jq.each(function(){
                setValue(this,true,true);
            });
        },
        uncheck:function(jq){
            return jq.each(function(){
                setValue(this,false,true);
            });
        },
        toggle:function(jq){
            return jq.each(function(){
                setValue(this,!getValue(this),true);
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
                setValue(this,false,true);
            });
        },reset:function(jq){  //cryze 2019-04-04 add reset 
            return jq.each(function(){
                var originalValue=$(this).radio('options').originalValue||false;
                setValue(this,originalValue,true);
            });
        },isValid:function(jq){
            var rtn = false;
            jq.each(function(){
                rtn = isValid(this);
            });
            return rtn;
        }
    };
    
	$.fn.radio.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target,['label','id','name','checked','required']), {
			disabled: (t.attr('disabled') ? true : undefined)
		});
	};
	
    $.fn.radio.defaults = {
        id:null,
        label:'',
        name:'',
        boxPosition:"left",
        radioClass:"",
		disabled:false,
        checked:false,
        onCheckChange:null,
        onChecked:null,
        required:false,  /*是否必选*/
        novalidate:false,
        missingMessage: "This field is required.",
        validating:false,
        tipPosition:'right',deltaX:0,
        showErrorTip:false, /*是否显示必填提示*/
        tipOptions: {
            position:"right",showEvent: "none", hideEvent: "none", showDelay: 0, hideDelay: 0, zIndex: "", onShow: function () {
                //$(this).tooltip("tip").css({ color: "#000", borderColor: "#CC9933", backgroundColor: "#FFFFCC" });
            }, onHide: function () {
                $(this).tooltip("destroy");
            }
        },
        requiredSel:false /*20191125--默认可以取消选中*/
	};
	
})(jQuery);
