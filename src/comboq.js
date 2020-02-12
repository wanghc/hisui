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
	function _hide(target){
        var state = $.data(target, 'comboq');
        var opts = state.options;
        state.isShow = false;
		opts.onHidePanel.call(this,target);
        $($.hisui.globalContainerSelector).hide();
        return target;
    }
    function _setText (target,text){
        var state = $.data(target, "comboq");
        if (text != $(target).val()){
            $(target).val(text);
            $(target).comboq("validate");
            state.previousValue = text;
        }
    }
    function init(target){
        var state = $.data(target, 'comboq');
		var opts = state.options;
		var _t = $(target);
        _t.addClass('comboq');
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
            if (input.length && $.data(e.target,'comboq').isShow){ return ; }
            var p = $(e.target).closest($.hisui.globalContainerSelector);
            if (p.length) {
                return; 
            }
            _hide(target);
        });
		_t.unbind('.comboq').bind('mousemove.comboq',function(e){
            if ($(this).hasClass('disabled')) return ;
            if ($(this).hasClass('readonly')) return ;
			//this.style.opacity = 1;
			if(_mouse2Right(e,this)){
				this.style.cursor = "pointer";
			}else{
				this.style.cursor = "auto";
			}
		}).bind('mouseleave.comboq',function(){
			//this.style.opacity = 0.7;
			this.style.cursor = "auto";
		}).bind('click.comboq',function(e){
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
		}).bind("keydown.combo paste.combo drop.combo input.combo", function (e) {
            // input.comboq在IE下,设置值时触发,造成进入有下拉框界面就弹出下拉panel,2018-10-17 增加return
            if ("undefined" ==typeof e.keyCode){return ;}
            //  wanghc 2018-10-08 add bind("input.combo")--firefox下在汉字输入汉字不能即时查询增加input.combo
            switch (e.keyCode) {
                case 38:
                    opts.keyHandler.up.call(target, e);
                    break;
                case 40:
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
                    e.preventDefault();
                    opts.keyHandler.enter.call(target, e);
                    return false;
                case 9:
                case 27:  //Esc
                    _hide(target);
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
                                var q = _t.val();
                                if (state.previousValue != q) {
                                    state.previousValue = q;
                                    if (!state.isShow) $(target).comboq("showPanel");
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
    /**fix panel top left width height */
    function _fixPanelTLWH(target){
        var _t = $(target);
        var state = $.data(target,"comboq");
        var panel = $($.hisui.globalContainerSelector);
        var offset = _t.offset();
        panel.offset({top:offset.top+_t._outerHeight(),left:offset.left});
        /*每200ms, 重计算位置*/
		(function () {
            if (panel.is(":visible")) {
                var myTop = getTop();
                if (Math.abs(myTop-panel.offset().top)>2){
                    panel.offset({top: myTop }); //left: getLeft(),
                    clearTimeout(state.offsettimer);
                    state.offsettimer = null;
                }
				state.offsettimer = setTimeout(arguments.callee, 60);
            }
        })();
        function getLeft() {
            var left = _t.offset().left;
            if (left + panel._outerWidth() > $(window)._outerWidth() + $(document).scrollLeft()) {
                left = $(window)._outerWidth() + $(document).scrollLeft() - panel._outerWidth();
            }
            if (left < 0) {
                left = 0;
            }
            return left;
        };
        function getTop() {
            var top = _t.offset().top + _t._outerHeight();  //默认向下
            if (top + panel._outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                top = _t.offset().top - panel._outerHeight(); //在上面显示
            }
            if (top < $(document).scrollTop()) {
                top = _t.offset().top + _t._outerHeight(); //向下显示 
            }
            top = parseInt(top);
            return top;
        };
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
        if (!opts.panelWidth) {opts.panelWidth = _t._outerWidth()}
        panel.width(opts.panelWidth);
        state.isShow = true;
        panel.show();
        opts.onShowPanel.call(target);
        _fixPanelTLWH(target);
    }
    $.fn.comboq = function (opts, param) {
        if (typeof opts == "string") {
            var _891 = $.fn.comboq.methods[opts];
            if (_891) {
                return _891(this, param);
            } else {
                return this.each(function () {
                    $(this).validatebox(opts, param);
                });
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
            return jq.each(function () {
                _850(this);
            });
        }, resize: function (jq, _894) {
            return jq.each(function () {
                doResize(this, _894);
            });
        }, showPanel: function (jq) {
            return showPanel(jq[0]);
        }, hidePanel: function (jq) {
            return _hide(jq[0]);
        }, disable: function (jq) {
            return jq.each(function () {
                $(this).prop("disabled",true);
                $(this).addClass('disabled');
            });
        }, enable: function (jq) {
            return jq.each(function () {
                $(this).prop("disabled",false);
                $(this).removeClass('disabled');
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
                _872(this);
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $.data(this, "comboq").options;
                if (opts.multiple) {
                    $(this).comboq("setValues", opts.originalValue);
                } else {
                    $(this).comboq("setValue", opts.originalValue);
                }
            });
        }, getText: function (jq) {
            return jq.val();
        }, setText: function (jq, text) {
            return jq.each(function () {
                _setText(this,text);
            });
        }, getValues: function (jq) {
            return _87d(jq[0]);
        }, setValues: function (jq, _896) {
            return jq.each(function () {
                _881(this, _896);
            });
        }, getValue: function (jq) {
            return jq.data('value');;
        }, setValue: function (jq, val) {
            return jq.each(function () {
                $(this).data('value',val);
            });
        }, createPanelBody:function(){
            var panel = $($.hisui.globalContainerSelector); /*全局固定div*/
            if (panel.length){
                panel.empty();
            }else{
                panel = $('<div id="'+$.hisui.globalContainerId+'"></div>').appendTo('body');
            }
            return $('<div></div>').appendTo(panel);
        },fixPanelTLWH:function(jq){
            return jq.each(function () {
               _fixPanelTLWH(this);
            });
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
        }, onChange: function (_899, _89a) {
        }
    });
})(jQuery);