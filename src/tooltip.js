(function ($) {
    function init(_1c4) {
        $(_1c4).addClass("tooltip-f");
    };
    function _1c5(_1c6) {
        var opts = $.data(_1c6, "tooltip").options;
        $(_1c6).unbind(".tooltip").bind(opts.showEvent + ".tooltip", function (e) {
            _1cd(_1c6, e);
        }).bind(opts.hideEvent + ".tooltip", function (e) {
            _1d3(_1c6, e);
        }).bind("mousemove.tooltip", function (e) {
            if (opts.trackMouse) {
                opts.trackMouseX = e.pageX;
                opts.trackMouseY = e.pageY;
                _1c7(_1c6);
            }
        });
    };
    function _1c8(_1c9) {
        var _1ca = $.data(_1c9, "tooltip");
        if (_1ca.showTimer) {
            clearTimeout(_1ca.showTimer);
            _1ca.showTimer = null;
        }
        if (_1ca.hideTimer) {
            clearTimeout(_1ca.hideTimer);
            _1ca.hideTimer = null;
        }
    };
    function _1c7(_1cb) {
        var _1cc = $.data(_1cb, "tooltip");
        if (!_1cc || !_1cc.tip) {
            return;
        }
        var opts = _1cc.options;
        var tip = _1cc.tip;
        if (opts.trackMouse) {
            t = $();
            var left = opts.trackMouseX + opts.deltaX;
            var top = opts.trackMouseY + opts.deltaY;
        } else {
            var t = $(_1cb);
            var left = t.offset().left + opts.deltaX;
            var top = t.offset().top + opts.deltaY;
        }
        switch (opts.position) {
            case "right":
                left += t._outerWidth() + 12 + (opts.trackMouse ? 12 : 0);
                top -= (tip._outerHeight() - t._outerHeight()) / 2;
                break;
            case "left":
                left -= tip._outerWidth() + 12 + (opts.trackMouse ? 12 : 0);
                top -= (tip._outerHeight() - t._outerHeight()) / 2;
                break;
            case "top":
                left -= (tip._outerWidth() - t._outerWidth()) / 2;
                top -= tip._outerHeight() + 12 + (opts.trackMouse ? 12 : 0);
                break;
            case "bottom":
                left -= (tip._outerWidth() - t._outerWidth()) / 2;
                top += t._outerHeight() + 12 + (opts.trackMouse ? 12 : 0);
                break;
        }
        if (!$(_1cb).is(":visible")) {
            left = -100000;
            top = -100000;
        }
        tip.css({ left: left, top: top, zIndex: (opts.zIndex != undefined ? opts.zIndex : ($.fn.window ? $.fn.window.defaults.zIndex++ : "")) });
        opts.onPosition.call(_1cb, left, top);
    };
    function _1cd(_1ce, e) {
        var _1cf = $.data(_1ce, "tooltip");
        var opts = _1cf.options;
        var tip = _1cf.tip;
        if (!tip) {
            tip = $("<div tabindex=\"-1\" class=\"tooltip\">" + "<div class=\"tooltip-content\"></div>" + "<div class=\"tooltip-arrow-outer\"></div>" + "<div class=\"tooltip-arrow\"></div>" + "</div>").appendTo("body");
            _1cf.tip = tip;
            _1d0(_1ce);
        }
        if (opts.tipWidth) tip.css('width',opts.tipWidth);
        tip.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-" + opts.position);
        _1c8(_1ce);
        _1cf.showTimer = setTimeout(function () {
            _1c7(_1ce);
            tip.show();
            /*处理提示层超出界面问题 2022-01-10*/
            var left1 = tip.offset().left;
            if (left1 < 0) { // 整体向右移动
                tip.offset({ left: 0 });
                // 箭头向右移动
                tip.children('div.tooltip-arrow').eq(0).css({ marginLeft:left1-6});
            }
            opts.onShow.call(_1ce, e);
            var _1d1 = tip.children(".tooltip-arrow-outer");
            var _1d2 = tip.children(".tooltip-arrow");
            var bc = "border-" + opts.position + "-color";
            _1d1.add(_1d2).css({ borderTopColor: "", borderBottomColor: "", borderLeftColor: "", borderRightColor: "" });
            _1d1.css(bc, tip.css(bc));
            _1d2.css(bc, tip.css("backgroundColor"));
        }, opts.showDelay);
    };
    function _1d3(_1d4, e) {
        var _1d5 = $.data(_1d4, "tooltip");
        if (_1d5 && _1d5.tip) {
            _1c8(_1d4);
            _1d5.hideTimer = setTimeout(function () {
                _1d5.tip.hide();
                _1d5.options.onHide.call(_1d4, e);
            }, _1d5.options.hideDelay);
        }
    };
    function _1d0(_1d6, _1d7) {
        var _1d8 = $.data(_1d6, "tooltip");
        var opts = _1d8.options;
        if (_1d7) {
            opts.content = _1d7;
        }
        if (!_1d8.tip) {
            return;
        }
        var cc = typeof opts.content == "function" ? opts.content.call(_1d6) : opts.content;
        _1d8.tip.children(".tooltip-content").html($.hisui.getTrans(cc)); //add trans
        opts.onUpdate.call(_1d6, cc);
    };
    function _1d9(_1da) {
        var _1db = $.data(_1da, "tooltip");
        if (_1db) {
            _1c8(_1da);
            var opts = _1db.options;
            if (_1db.tip) {
                _1db.tip.remove();
            }
            if (opts._title) {
                $(_1da).attr("title", opts._title);
            }
            $.removeData(_1da, "tooltip");
            $(_1da).unbind(".tooltip").removeClass("tooltip-f");
            opts.onDestroy.call(_1da);
        }
    };
    $.fn.tooltip = function (_1dc, _1dd) {
        if (typeof _1dc == "string") {
            return $.fn.tooltip.methods[_1dc](this, _1dd);
        }
        _1dc = _1dc || {};
        return this.each(function () {
            var _1de = $.data(this, "tooltip");
            if (_1de) {
                $.extend(_1de.options, _1dc);
            } else {
                $.data(this, "tooltip", { options: $.extend({}, $.fn.tooltip.defaults, $.fn.tooltip.parseOptions(this), _1dc) });
                init(this);
            }
            _1c5(this);
            _1d0(this);
        });
    };
    $.fn.tooltip.methods = {
        options: function (jq) {
            return $.data(jq[0], "tooltip").options;
        }, tip: function (jq) {
            return $.data(jq[0], "tooltip").tip;
        }, arrow: function (jq) {
            return jq.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow");
        }, show: function (jq, e) {
            return jq.each(function () {
                _1cd(this, e);
            });
        }, hide: function (jq, e) {
            return jq.each(function () {
                _1d3(this, e);
            });
        }, update: function (jq, _1df) {
            return jq.each(function () {
                _1d0(this, _1df);
            });
        }, reposition: function (jq) {
            return jq.each(function () {
                _1c7(this);
            });
        }, destroy: function (jq) {
            return jq.each(function () {
                _1d9(this);
            });
        }
    };
    $.fn.tooltip.parseOptions = function (_1e0) {
        var t = $(_1e0);
        var opts = $.extend({}, $.parser.parseOptions(_1e0, ["position", "showEvent", "hideEvent", "content","tipWidth", { deltaX: "number", deltaY: "number", showDelay: "number", hideDelay: "number" }]), { _title: t.attr("title") });
        t.attr("title", "");
        if (!opts.content) {
            opts.content = opts._title;
        }
        return opts;
    };
    $.fn.tooltip.defaults = {
        tipWidth:undefined,
        position: "bottom", content: null, trackMouse: false, deltaX: 0, deltaY: 0, showEvent: "mouseenter", hideEvent: "mouseleave", showDelay: 200, hideDelay: 100, onShow: function (e) {
        }, onHide: function (e) {
        }, onUpdate: function (_1e1) {
        }, onPosition: function (left, top) {
        }, onDestroy: function () {
        }
    };
})(jQuery);