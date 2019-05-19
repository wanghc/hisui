(function ($) {
    function _4dd(_4de) {
        $(_4de).addClass("numberspinner-f");
        var opts = $.data(_4de, "numberspinner").options;
        $(_4de).spinner(opts).numberbox($.extend({}, opts, { width: "auto" }));
    };
    function _4df(_4e0, down) {
        var opts = $.data(_4e0, "numberspinner").options;
        var v = parseFloat($(_4e0).numberbox("getValue") || opts.value) || 0;
        if (down == true) {
            v -= opts.increment;
        } else {
            v += opts.increment;
        }
        $(_4e0).numberbox("setValue", v);
    };
    $.fn.numberspinner = function (_4e1, _4e2) {
        if (typeof _4e1 == "string") {
            var _4e3 = $.fn.numberspinner.methods[_4e1];
            if (_4e3) {
                return _4e3(this, _4e2);
            } else {
                return this.spinner(_4e1, _4e2);
            }
        }
        _4e1 = _4e1 || {};
        return this.each(function () {
            var _4e4 = $.data(this, "numberspinner");
            if (_4e4) {
                $.extend(_4e4.options, _4e1);
            } else {
                $.data(this, "numberspinner", { options: $.extend({}, $.fn.numberspinner.defaults, $.fn.numberspinner.parseOptions(this), _4e1) });
            }
            _4dd(this);
        });
    };
    $.fn.numberspinner.methods = {
        options: function (jq) {
            var opts = $.data(jq[0], "numberspinner").options;
            return $.extend(opts, { value: jq.numberbox("getValue"), originalValue: jq.numberbox("options").originalValue });
        }, setValue: function (jq, _4e5) {
            return jq.each(function () {
                $(this).numberbox("setValue", _4e5);
            });
        }, getValue: function (jq) {
            return jq.numberbox("getValue");
        }, clear: function (jq) {
            return jq.each(function () {
                $(this).spinner("clear");
                $(this).numberbox("clear");
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).numberspinner("options");
                $(this).numberspinner("setValue", opts.originalValue);
            });
        }
    };
    $.fn.numberspinner.parseOptions = function (_4e6) {
        return $.extend({}, $.fn.spinner.parseOptions(_4e6), $.fn.numberbox.parseOptions(_4e6), {});
    };
    $.fn.numberspinner.defaults = $.extend({}, $.fn.spinner.defaults, $.fn.numberbox.defaults, {
        spin: function (down) {
            _4df(this, down);
        }
    });
})(jQuery);