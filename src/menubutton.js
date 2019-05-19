(function ($) {
    function init(_3e0) {
        var opts = $.data(_3e0, "menubutton").options;
        var btn = $(_3e0);
        btn.linkbutton(opts);
        btn.removeClass(opts.cls.btn1 + " " + opts.cls.btn2).addClass("m-btn");
        btn.removeClass("m-btn-small m-btn-medium m-btn-large").addClass("m-btn-" + opts.size);
        var _3e1 = btn.find(".l-btn-left");
        $("<span></span>").addClass(opts.cls.arrow).appendTo(_3e1);
        $("<span></span>").addClass("m-btn-line").appendTo(_3e1);
        
        btn.removeClass('menubutton-toolbar menubutton-blue').addClass(opts.otherCls);  //cryze  menubutton 按钮增加类opts.otherCls
        
        if (opts.menu) {
            $(opts.menu).addClass(opts.otherCls);  //cryze  menubutton 的menu增加类 opts.otherCls
            if ((opts.otherCls=="menubutton-toolbar")||(opts.otherCls=="menubutton-blue")){
                $(opts.menu).menu({width:btn._outerWidth()});
            }else{
                $(opts.menu).menu();
            }
            var _3e2 = $(opts.menu).menu("options");
            var _3e3 = _3e2.onShow;
            var _3e4 = _3e2.onHide;
            $.extend(_3e2, {
                onShow: function () {
                    var _3e5 = $(this).menu("options");
                    var btn = $(_3e5.alignTo);
                    var opts = btn.menubutton("options");
                    btn.addClass((opts.plain == true) ? opts.cls.btn2 : opts.cls.btn1);
                    _3e3.call(this);
                }, onHide: function () {
                    var _3e6 = $(this).menu("options");
                    var btn = $(_3e6.alignTo);
                    var opts = btn.menubutton("options");
                    btn.removeClass((opts.plain == true) ? opts.cls.btn2 : opts.cls.btn1);
                    _3e4.call(this);
                }
            });
        }
        _3e7(_3e0, opts.disabled);
    };
    function _3e7(_3e8, _3e9) {
        var opts = $.data(_3e8, "menubutton").options;
        opts.disabled = _3e9;
        var btn = $(_3e8);
        var t = btn.find("." + opts.cls.trigger);
        if (!t.length) {
            t = btn;
        }
        t.unbind(".menubutton");
        if (_3e9) {
            btn.linkbutton("disable");
        } else {
            btn.linkbutton("enable");
            var _3ea = null;
            t.bind("click.menubutton", function () {
                _3eb(_3e8);
                return false;
            }).bind("mouseenter.menubutton", function () {
                _3ea = setTimeout(function () {
                    _3eb(_3e8);
                }, opts.duration);
                return false;
            }).bind("mouseleave.menubutton", function (e) {
                if (_3ea) {
                    clearTimeout(_3ea);
                }
                //cryze 鼠标放到button上，menu显示，离开button(且不是放到menu上)应该隐藏munu
                if ($(opts.menu).length>0 && $(opts.menu).find(e.toElement).length==0 && !$(opts.menu).is($(e.toElement))){
                    $(opts.menu).menu('hide');
                }
            });
        }
    };
    function _3eb(_3ec) {
        var opts = $.data(_3ec, "menubutton").options;
        if (opts.disabled || !opts.menu) {
            return;
        }
        $("body>div.menu-top").menu("hide");
        var btn = $(_3ec);
        var mm = $(opts.menu);
        if (mm.length) {
            mm.menu("options").alignTo = btn;
            mm.menu("show", { alignTo: btn, align: opts.menuAlign });
        }
        btn.blur();
    };
    $.fn.menubutton = function (_3ed, _3ee) {
        if (typeof _3ed == "string") {
            var _3ef = $.fn.menubutton.methods[_3ed];
            if (_3ef) {
                return _3ef(this, _3ee);
            } else {
                return this.linkbutton(_3ed, _3ee);
            }
        }
        _3ed = _3ed || {};
        return this.each(function () {
            var _3f0 = $.data(this, "menubutton");
            if (_3f0) {
                $.extend(_3f0.options, _3ed);
            } else {
                $.data(this, "menubutton", { options: $.extend({}, $.fn.menubutton.defaults, $.fn.menubutton.parseOptions(this), _3ed) });
                $(this).removeAttr("disabled");
            }
            init(this);
        });
    };
    $.fn.menubutton.methods = {
        options: function (jq) {
            var _3f1 = jq.linkbutton("options");
            var _3f2 = $.data(jq[0], "menubutton").options;
            _3f2.toggle = _3f1.toggle;
            _3f2.selected = _3f1.selected;
            return _3f2;
        }, enable: function (jq) {
            return jq.each(function () {
                _3e7(this, false);
            });
        }, disable: function (jq) {
            return jq.each(function () {
                _3e7(this, true);
            });
        }, destroy: function (jq) {
            return jq.each(function () {
                var opts = $(this).menubutton("options");
                if (opts.menu) {
                    $(opts.menu).menu("destroy");
                }
                $(this).remove();
            });
        }
    };
    $.fn.menubutton.parseOptions = function (_3f3) {
        var t = $(_3f3);
        //cryze 解析options 解析otherCls 
        var otherCls="";
        if (t.hasClass('menubutton-blue')) {otherCls="menubutton-blue";}
        else if(t.hasClass('menubutton-toolbar')) {otherCls="menubutton-toolbar";}
        return $.extend({otherCls:otherCls}, $.fn.linkbutton.parseOptions(_3f3), $.parser.parseOptions(_3f3, ["menu", { plain: "boolean", duration: "number" }]));
    };
    $.fn.menubutton.defaults = $.extend({}, $.fn.linkbutton.defaults, {otherCls:'', plain: true, menu: null, menuAlign: "left", duration: 100, cls: { btn1: "m-btn-active", btn2: "m-btn-plain-active", arrow: "m-btn-downarrow", trigger: "m-btn" } });
})(jQuery);