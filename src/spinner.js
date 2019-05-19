(function ($) {
    function init(_4c0) {
        var _4c1 = $("<span class=\"spinner\">" + "<span class=\"spinner-arrow\">" + "<span class=\"spinner-arrow-up\"></span>" + "<span class=\"spinner-arrow-down\"></span>" + "</span>" + "</span>").insertAfter(_4c0);
        $(_4c0).addClass("spinner-text spinner-f").prependTo(_4c1);
        return _4c1;
    };
    function _4c2(_4c3, _4c4) {
        var opts = $.data(_4c3, "spinner").options;
        var _4c5 = $.data(_4c3, "spinner").spinner;
        if (_4c4) {
            opts.width = _4c4;
        }
        var _4c6 = $("<div style=\"display:none\"></div>").insertBefore(_4c5);
        _4c5.appendTo("body");
        if (isNaN(opts.width)) {
            opts.width = $(_4c3).outerWidth();
        }
        var _4c7 = _4c5.find(".spinner-arrow");
        _4c5._outerWidth(opts.width)._outerHeight(opts.height);
        $(_4c3)._outerWidth(_4c5.width() - _4c7.outerWidth());
        $(_4c3).css({ height: _4c5.height() + "px", lineHeight: _4c5.height() + "px" });
        _4c7._outerHeight(_4c5.height());
        _4c7.find("span")._outerHeight(_4c7.height() / 2);
        _4c5.insertAfter(_4c6);
        _4c6.remove();
    };
    function _4c8(_4c9) {
        var opts = $.data(_4c9, "spinner").options;
        var _4ca = $.data(_4c9, "spinner").spinner;
        $(_4c9).unbind(".spinner");
        _4ca.find(".spinner-arrow-up,.spinner-arrow-down").unbind(".spinner");
        if (!opts.disabled && !opts.readonly) {
            _4ca.find(".spinner-arrow-up").bind("mouseenter.spinner", function () {
                $(this).addClass("spinner-arrow-hover");
            }).bind("mouseleave.spinner", function () {
                $(this).removeClass("spinner-arrow-hover");
            }).bind("click.spinner", function () {
                opts.spin.call(_4c9, false);
                opts.onSpinUp.call(_4c9);
                $(_4c9).validatebox("validate");
            });
            _4ca.find(".spinner-arrow-down").bind("mouseenter.spinner", function () {
                $(this).addClass("spinner-arrow-hover");
            }).bind("mouseleave.spinner", function () {
                $(this).removeClass("spinner-arrow-hover");
            }).bind("click.spinner", function () {
                opts.spin.call(_4c9, true);
                opts.onSpinDown.call(_4c9);
                $(_4c9).validatebox("validate");
            });
            $(_4c9).bind("change.spinner", function () {
                $(this).spinner("setValue", $(this).val());
            });
        }
    };
    function _4cb(_4cc, _4cd) {
        var opts = $.data(_4cc, "spinner").options;
        if (_4cd) {
            opts.disabled = true;
            $(_4cc).attr("disabled", true);
            $.data(_4cc, "spinner").spinner.addClass("disabled");  //cryze spinner addClass disabled
        } else {
            opts.disabled = false;
            $(_4cc).removeAttr("disabled");
            $.data(_4cc, "spinner").spinner.removeClass("disabled");  //cryze spinner removeClass disabled
        }
    };
    function _4ce(_4cf, mode) {
        var _4d0 = $.data(_4cf, "spinner");
        var opts = _4d0.options;
        opts.readonly = mode == undefined ? true : mode;
        var _4d1 = opts.readonly ? true : (!opts.editable);
        $(_4cf).attr("readonly", _4d1).css("cursor", _4d1 ? "pointer" : "");
    };
    $.fn.spinner = function (_4d2, _4d3) {
        if (typeof _4d2 == "string") {
            var _4d4 = $.fn.spinner.methods[_4d2];
            if (_4d4) {
                return _4d4(this, _4d3);
            } else {
                return this.validatebox(_4d2, _4d3);
            }
        }
        _4d2 = _4d2 || {};
        return this.each(function () {
            var _4d5 = $.data(this, "spinner");
            if (_4d5) {
                $.extend(_4d5.options, _4d2);
            } else {
                _4d5 = $.data(this, "spinner", { options: $.extend({}, $.fn.spinner.defaults, $.fn.spinner.parseOptions(this), _4d2), spinner: init(this) });
                $(this).removeAttr("disabled");
            }
            _4d5.options.originalValue = _4d5.options.value;
            $(this).val(_4d5.options.value);
            _4cb(this, _4d5.options.disabled);
            _4ce(this, _4d5.options.readonly);
            // _4c2为resize方法,render后不用再resize //neer 2019-03-26 增加if判断
            if (true !== $(this).data("rendered")) _4c2(this);
            $(this).validatebox(_4d5.options);
            _4c8(this);
            $(this).data("rendered", true); //neer 2019-03-26
        });
    };
    $.fn.spinner.methods = {
        options: function (jq) {
            var opts = $.data(jq[0], "spinner").options;
            return $.extend(opts, { value: jq.val() });
        }, destroy: function (jq) {
            return jq.each(function () {
                var _4d6 = $.data(this, "spinner").spinner;
                $(this).validatebox("destroy");
                _4d6.remove();
            });
        }, resize: function (jq, _4d7) {
            return jq.each(function () {
                _4c2(this, _4d7);
            });
        }, enable: function (jq) {
            return jq.each(function () {
                _4cb(this, false);
                _4c8(this);
            });
        }, disable: function (jq) {
            return jq.each(function () {
                _4cb(this, true);
                _4c8(this);
            });
        }, readonly: function (jq, mode) {
            return jq.each(function () {
                _4ce(this, mode);
                _4c8(this);
            });
        }, getValue: function (jq) {
            return jq.val();
        }, setValue: function (jq, _4d8) {
            return jq.each(function () {
                var opts = $.data(this, "spinner").options;
                var _4d9 = opts.value;
                opts.value = _4d8;
                $(this).val(_4d8);
                if (_4d9 != _4d8) {
                    opts.onChange.call(this, _4d8, _4d9);
                }
            });
        }, clear: function (jq) {
            return jq.each(function () {
                var opts = $.data(this, "spinner").options;
                opts.value = "";
                $(this).val("");
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).spinner("options");
                $(this).spinner("setValue", opts.originalValue);
            });
        }
    };
    $.fn.spinner.parseOptions = function (_4da) {
        var t = $(_4da);
        return $.extend({}, $.fn.validatebox.parseOptions(_4da), $.parser.parseOptions(_4da, ["width", "height", "min", "max", { increment: "number", editable: "boolean" }]), { value: (t.val() || undefined), disabled: (t.attr("disabled") ? true : undefined), readonly: (t.attr("readonly") ? true : undefined) });
    };
    $.fn.spinner.defaults = $.extend({}, $.fn.validatebox.defaults, {
        /** wanghc height 22--->30*/
        width: "auto", height: 30, deltaX: 19, value: "", min: null, max: null, increment: 1, editable: true, disabled: false, readonly: false, spin: function (down) {
        }, onSpinUp: function () {
        }, onSpinDown: function () {
        }, onChange: function (_4db, _4dc) {
        }
    });
})(jQuery);