(function ($) {
    function init(_3f4) {
        var opts = $.data(_3f4, "splitbutton").options;
        $(_3f4).menubutton(opts);
        $(_3f4).addClass("s-btn");
    };
    $.fn.splitbutton = function (_3f5, _3f6) {
        if (typeof _3f5 == "string") {
            var _3f7 = $.fn.splitbutton.methods[_3f5];
            if (_3f7) {
                return _3f7(this, _3f6);
            } else {
                return this.menubutton(_3f5, _3f6);
            }
        }
        _3f5 = _3f5 || {};
        return this.each(function () {
            var _3f8 = $.data(this, "splitbutton");
            if (_3f8) {
                $.extend(_3f8.options, _3f5);
            } else {
                $.data(this, "splitbutton", { options: $.extend({}, $.fn.splitbutton.defaults, $.fn.splitbutton.parseOptions(this), _3f5) });
                $(this).removeAttr("disabled");
            }
            init(this);
        });
    };
    $.fn.splitbutton.methods = {
        options: function (jq) {
            var _3f9 = jq.menubutton("options");
            var _3fa = $.data(jq[0], "splitbutton").options;
            $.extend(_3fa, { disabled: _3f9.disabled, toggle: _3f9.toggle, selected: _3f9.selected });
            return _3fa;
        }
    };
    $.fn.splitbutton.parseOptions = function (_3fb) {
        var t = $(_3fb);
        return $.extend({}, $.fn.linkbutton.parseOptions(_3fb), $.parser.parseOptions(_3fb, ["menu", { plain: "boolean", duration: "number" }]));
    };
    $.fn.splitbutton.defaults = $.extend({}, $.fn.linkbutton.defaults, { plain: true, menu: null, duration: 100, cls: { btn1: "m-btn-active s-btn-active", btn2: "m-btn-plain-active s-btn-plain-active", arrow: "m-btn-downarrow", trigger: "m-btn-line" } });
})(jQuery);