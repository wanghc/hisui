(function ($) {
    function init(_1b6) {
        $(_1b6).addClass("progressbar");
        $(_1b6).html("<div class=\"progressbar-text\"></div><div class=\"progressbar-value\"><div class=\"progressbar-text\"></div></div>");
        return $(_1b6);
    };
    function _1b7(_1b8, _1b9) {
        var opts = $.data(_1b8, "progressbar").options;
        var bar = $.data(_1b8, "progressbar").bar;
        if (_1b9) {
            opts.width = _1b9;
        }
        bar._outerWidth(opts.width)._outerHeight(opts.height);
        bar.find("div.progressbar-text").width(bar.width());
        bar.find("div.progressbar-text,div.progressbar-value").css({ height: bar.height() + "px", lineHeight: bar.height() + "px" });
    };
    $.fn.progressbar = function (_1ba, _1bb) {
        if (typeof _1ba == "string") {
            var _1bc = $.fn.progressbar.methods[_1ba];
            if (_1bc) {
                return _1bc(this, _1bb);
            }
        }
        _1ba = _1ba || {};
        return this.each(function () {
            var _1bd = $.data(this, "progressbar");
            if (_1bd) {
                $.extend(_1bd.options, _1ba);
            } else {
                _1bd = $.data(this, "progressbar", { options: $.extend({}, $.fn.progressbar.defaults, $.fn.progressbar.parseOptions(this), _1ba), bar: init(this) });
            }
            $(this).progressbar("setValue", _1bd.options.value);
            _1b7(this);
        });
    };
    $.fn.progressbar.methods = {
        options: function (jq) {
            return $.data(jq[0], "progressbar").options;
        }, resize: function (jq, _1be) {
            return jq.each(function () {
                _1b7(this, _1be);
            });
        }, getValue: function (jq) {
            return $.data(jq[0], "progressbar").options.value;
        }, setValue: function (jq, _1bf) {
            if (_1bf < 0) {
                _1bf = 0;
            }
            if (_1bf > 100) {
                _1bf = 100;
            }
            return jq.each(function () {
                var opts = $.data(this, "progressbar").options;
                var text = opts.text.replace(/{value}/, _1bf);
                var _1c0 = opts.value;
                opts.value = _1bf;
                $(this).find("div.progressbar-value").width(_1bf + "%");
                $(this).find("div.progressbar-text").html(text);
                if (_1c0 != _1bf) {
                    opts.onChange.call(this, _1bf, _1c0);
                }
            });
        }
    };
    $.fn.progressbar.parseOptions = function (_1c1) {
        return $.extend({}, $.parser.parseOptions(_1c1, ["width", "height", "text", { value: "number" }]));
    };
    $.fn.progressbar.defaults = {
        width: "auto", height: 22, value: 0, text: "{value}%", onChange: function (_1c2, _1c3) {
        }
    };
})(jQuery);