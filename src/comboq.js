(function ($) {
    function _mouse2Right(e,t){
        var _t = $(t);
        if (_t.hasClass('bginone')) return false;
		var mouseX = e.pageX;
		/*var e = event || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		var x = e.pageX || e.clientX + scrollX;
		var y = e.pageY || e.clientY + scrollY;*/
		var boxWidth = _t._outerWidth();
		var xy = _t.offset(); 
		if (mouseX < xy.left+boxWidth && mouseX>(xy.left+boxWidth-40)){
			return true;
		}
		return false;
    }
    function doResize(target,width){
        $(target)._outerWidth(width);
    }
	function _hide(target){
        var panel = $($.hisui.globalContainerSelector);
        if (panel.length > 0 && $.data(panel[0], "data")) {
            var dataState = $.data(panel[0], "data");
            var qState = dataState.qState;
            /**隐藏时,要把定时器清空*/
            clearTimeout(dataState.offsettimer);
            dataState.offsettimer = null;
            if ("undefined" == typeof target) {
                target = dataState.srcTargetDom ;
            }
        }
        if (panel.is(":visible")) {
            var state = $.data(target, 'comboq') || qState;
            if (state){
                var opts = state.options;
                state.isShow = false;
                opts.onHidePanel.call(this,target);
            }
            $(target).removeClass('comboq-active');
            $($.hisui.globalContainerSelector).hide();
            return $(target);
        }
        if ("undefined" != typeof target) return $(target);
        return null;
    }
    function _clear(target){
        _setText(target,"");
        _setValue(target,"");
    }
    function _setText (target,text){
        var state = $.data(target, "comboq");
        if (text != $(target).val()){
            $(target).val(text);
            $(target).comboq("validate");
            state.previousValue = text;
        }
    }
    function _setValue(target,value){
        var state = $.data(target, "comboq");
        var opts = state.options;
        var oldVal = $(target).data('value');
        if (value != oldVal){
            opts.onChange.call(target,value,oldVal);
            $(target).data('value',value);
            $(target).comboq("validate");
            state.originalRealValue = value;
        }
    }
    function init(target){
        var state = $.data(target, 'comboq');
		var opts = state.options;
		var _t = $(target);
        _t.addClass('comboq');
        _t.attr('autocomplete','off');
        if ($.isNumeric(opts.width)) _t._outerWidth(opts.width);
		if (opts.disabled){
			_t.addClass('disabled');
        }
        if (opts.readOnly){
			_t.addClass('readonly');
        }
        if (!opts.hasDownArrow) {
            _t.addClass('bginone');
        }
        _t.validatebox(opts);
        $(document).unbind(".comboq").bind("mousedown.comboq", function (e) {
            var input = $(e.target).closest('input.comboq');
            // if (input.length>0) console.log(" document mousedown "+ $.data(input[0],'comboq').isShow );
            if (input.length>0 && $.data(input[0],'comboq').isShow){ return ;/*点击自已输入框时不隐藏*/ }

            var p = $(e.target).closest($.hisui.globalContainerSelector);
            if (p.length) {
                return; /*点击弹出层时不隐藏*/
            }
            if ($($.hisui.globalContainerSelector).is(":visible")) _hide();
        });
		_t.unbind('.comboq').bind('mousemove.comboq',function(e){
            if ($(this).hasClass('disabled')) return ;
            if ($(this).hasClass('readonly')) return ;
			//this.style.opacity = 1;
			if(_mouse2Right(e,this)){
                this.style.cursor = "pointer";
                $(this).addClass('comboq-arrow-hover');
			}else{
                this.style.cursor = "auto";
                $(this).removeClass('comboq-arrow-hover');
			}
		}).bind('mouseleave.comboq',function(){
			//this.style.opacity = 0.7;
            this.style.cursor = "auto";
            $(this).removeClass('comboq-arrow-hover');
		}).bind('click.comboq',function(e){
            // console.log(" comboq click = "+ $.data(this,'comboq').isShow );
            if ($(this).hasClass('disabled')) return ;
            if ($(this).hasClass('readonly')) return ;
			if (_mouse2Right(e,this)){
				e.preventDefault();
				e.stopPropagation();
				showPanel(this);
				return false;
			}
		}).bind('blur.comboq',function(e){  //
			if(opts.onBlur) opts.onBlur.call(this,target);
		}).bind("keydown.comboq paste.comboq drop.comboq input.comboq compositionend.comboq", function (e) {
            // input.comboq在IE下,设置值时触发,造成进入有下拉框界面就弹出下拉panel,2018-10-17 增加return
            if ( navigator.userAgent.indexOf('MWBrowser/2')==-1 && "undefined" == typeof e.keyCode) { return; }
            //  wanghc 2018-10-08 add bind("input.combo")--firefox下在汉字输入汉字不能即时查询增加input.combo
            switch (e.keyCode) {
                case 38:
                    opts.keyHandler.up.call(target, e);
                    break;
                case 40:
                    if (!$($.hisui.globalContainerSelector).is(":visible")) {
                        // showPanel返回false时，直接返回不运行查询方法
                        if (false==showPanel(this)) return ;  //下拉按钮时 
                    }
                    opts.keyHandler.down.call(target, e);
                    break;
                case 37:
                    opts.keyHandler.left.call(target, e);
                    break;
                case 39:
                    opts.keyHandler.right.call(target, e);
                    break;
                case 33:
                    opts.keyHandler.pageUp.call(target, e);
                    break;
                case 34:
                    opts.keyHandler.pageDown.call(target, e);
                    break;
                case 13:
                    //e.preventDefault();
                    opts.keyHandler.enter.call(target, e);
                    break;
                    //return false;
                case 9:
                case 27:  //Esc
                    _hide();
                    break;
                default:
                    setTimeout(function (){
                        if (opts.editable) {
                            // 延迟查询
                            if (state.timer) {
                                clearTimeout(state.timer);
                            }
                            if (!opts.isCombo) return;
                            if (opts.minQueryLen>0 && _t.val().length<opts.minQueryLen) return;
                            state.timer = setTimeout(function () {
                                // [4578037] 把显示逻辑提前
                                // 1. 中草药录入界面，当输入gc后,会弹出放大镜
                                // 2. 再点击界面其它地方，让放大镜隐藏
                                // 3. 快速删除c，再输入c，此时放大镜弹窗不自动弹出(previousValue是等于q的)
                                
                                // showPanel返回false时，直接返回不运行查询方法
                                if (!state.isShow) {
                                    var rtn = $(target).comboq("showPanel");
                                    if (rtn == false) return;
                                }
                                var q = _t.val();
                                if (state.previousValue != q) {
                                    state.previousValue = q;                                    
                                    opts.keyHandler.query.call(target, _t.val(), e);
                                    $(target).comboq("validate");
                                }
                            }, opts.delay);
                        }
                    },0);
            }
        });
		return ;
    }
    function setDisabled(target,value){
		if (value) {
            $(target).addClass('disabled');
            $(target).prop("disabled",true);
		}else{
            $(target).removeClass('disabled');
            $(target).prop("disabled",false);
		}
	}
    function showPanel(target){
        var _t = $(target);
        var state = $.data(target,"comboq");
        var opts = state.options;
        if (opts.onBeforeShowPanel.call(target)===false) return false;
        var panel = $($.hisui.globalContainerSelector);
        if (panel.length>0){
			panel.empty();
		}else{
            panel = $('<div id="'+$.hisui.globalContainerId+'"></div>').appendTo('body');
        }
        panel.height(opts.panelHeight);
        panel.css("z-index",$.fn.window.defaults.zIndex++);
        if (!opts.panelWidth) {opts.panelWidth = _t._outerWidth()}
        panel.width(opts.panelWidth);
        state.isShow = true;
        // console.log("showpanel "+state.isShow);
        panel.show();
        $.data(document.getElementById($.hisui.globalContainerId), "data", {
            srcTargetDom : target,
            qState : state     // 医嘱录入界页，先删除行后，再隐藏放大镜，那时就拿不到放大镜上的options
        }); /*下拉层上记录住当前对应的target*/
        opts.onShowPanel.call(target);
        _t.addClass('comboq-active'); /*面板展开时输入框状态就为激活状态,需求号 2914060*/
        $.hisui.fixPanelTLWH();
    }
    $.fn.comboq = function (opts, param) {
        if (typeof opts == "string") {
            var _891 = $.fn.comboq.methods[opts];
            if (_891) {
                return _891(this, param);
            } else {
                return this.validatebox(opts, param);
            
            }
        }
        opts = opts || {};
        return this.each(function () {
            var _893 = $.data(this, "comboq");
            if (_893) {
                $.extend(_893.options, opts);
            } else {
                _893 = $.data(this, "comboq", {isShow:false, options: $.extend({}, $.fn.comboq.defaults, $.fn.comboq.parseOptions(this), opts),previousValue: null });
                var r = init(this);
            }
            //createBox(this);
        });
    };
    $.fn.comboq.methods = {
        options: function (jq) {
            return $.data(jq[0], "comboq").options;
        }, panel: function (jq) { //下拉
            return $($.hisui.globalContainerSelector);
        }, textbox: function (jq) {
            return jq;
        }, destroy: function (jq) {
            return ;
        }, resize: function (jq, _894) {
            return jq.each(function () {
                doResize(this, _894);
            });
        }, showPanel: function (jq) {
            return showPanel(jq[0]);
        }, hidePanel: function (jq) {
            return _hide();
        }, setDisabled:function(jq,value){
			return jq.each(function () {
                setDisabled(this, value);
            });
		}, disable: function (jq) {
            return jq.each(function () {
                setDisabled(this,true);
            });
        }, enable: function (jq) {
            return jq.each(function () {
                setDisabled(this,false);
            });
        }, readonly: function (jq, mode) {
            return jq.each(function () {
                if (mode) {
                    $(this).addClass('readonly');
                }else{
                    $(this).removeClass('readonly');
                }
                $(this).prop('readonly',mode);
            });
        }, isValid: function (jq) {
            return jq.validatebox("isValid");
        }, clear: function (jq) {
            return jq.each(function () {
                _clear(this);
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $.data(this, "comboq").options;
                if (opts.multiple) {
                    $(this).comboq("setValues", opts.originalRealValue);
                    $(this).comboq('setText',opts.originalValue);
                } else {
                    $(this).comboq("setValue", opts.originalRealValue);
                    $(this).comboq('setText',opts.originalValue);
                }
            });
        }, getText: function (jq) {
            return jq.val();
        }, setText: function (jq, text) {
            return jq.each(function () {
                _setText(this,text);
            });
        }, getValues: function (jq) {
            return jq.data('value');
        }, setValues: function (jq, _896) {
            return jq.each(function () {
                if ($.isArray(_896) && _896.length>0) _setValue(this,_896[0]);
                else{_setValue(this,"");}
            });
        }, getValue: function (jq) {
            return jq.data('value');
        }, setValue: function (jq, val) {
            return jq.each(function () {
                _setValue(this,val)
            });
        }, createPanelBody:function(){
            var panel = $($.hisui.globalContainerSelector); /*全局固定div*/
            if (panel.length){
                panel.empty();
            }else{
                panel = $('<div id="'+$.hisui.globalContainerId+'"></div>').appendTo('body');
            }
            return $('<div></div>').appendTo(panel);
        }
    };
    $.fn.comboq.parseOptions = function (_898) {
        var t = $(_898);
        return $.extend({}, $.fn.validatebox.parseOptions(_898), $.parser.parseOptions(_898, ["blurValidValue","width", "height", "separator", "panelAlign", { panelWidth: "number", editable: "boolean", hasDownArrow: "boolean", delay: "number", selectOnNavigation: "boolean" }]), { panelHeight: (t.attr("panelHeight") == "auto" ? "auto" : parseInt(t.attr("panelHeight")) || undefined), multiple: (t.attr("multiple") ? true : undefined), disabled: (t.attr("disabled") ? true : undefined), readonly: (t.attr("readonly") ? true : undefined), value: (t.val() || undefined) });
    };
    
    $.fn.comboq.defaults = $.extend({}, $.fn.validatebox.defaults, {
        blurValidValue:false, /*2018-12-26 wanghc blur时验证组件是否有值,无则清空输入框*/
        /*enterNullValueClear控制 回车时是否清空输入框里的值。by wanghc */
        enterNullValueClear:true,width: "auto", height: 22, panelWidth: null, panelHeight: 200, isCombo:true,minQueryLen:0,
        panelAlign: "left", multiple: false, selectOnNavigation: true, separator: ",", editable: true, disabled: false, 
        readonly: false, hasDownArrow: true, value: "", delay: 200, deltaX: 19, keyHandler: {
            up: function (e) {
            }, down: function (e) {
            }, left: function (e) {
            }, right: function (e) {
            }, enter: function (e) {
            }, query: function (q, e) {
            }
        }, onBeforeShowPanel:function(){

        },onShowPanel: function () {
        }, onHidePanel: function () {
        }, onChange: function (newValue,oldValue) {
        }
    });
    // 跨iframe下，点击其他页面，隐藏下拉框
    $(window).on('blur',function(){
        _hide();
    });
    // if(document.all){
    //     document.getElementById("myframe").attachEvent("onblur",dothis);
    // }else{
    //     document.getElementById("myframe").contentWindow.addEventListener("blur",dothis,false);
    // }
})(jQuery);