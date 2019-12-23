(function ($) {
    function init(_3fc) {
        $(_3fc).addClass("triggerbox-f").hide();
        var span = $("<span class=\"triggerbox\"></span>").insertAfter(_3fc);
        var _3fd = $("<input type=\"text\" class=\"triggerbox-text\">").appendTo(span);
        $("<span><span class=\"triggerbox-button\"></span></span>").appendTo(span);
        var name = $(_3fc).attr("name");
        if (name) {
            _3fd.attr("name", name);
            $(_3fc).removeAttr("name").attr("triggerboxName", name);
        }
        return span;
    };
    function _3fe(_3ff, _400) {
        var opts = $.data(_3ff, "triggerbox").options;
        var sb = $.data(_3ff, "triggerbox").triggerbox;
        if (_400) {
            opts.width = _400;
        }
        sb.appendTo("body");
        if (isNaN(opts.width)) {
            opts.width = sb._outerWidth();
        }
        var _401 = sb.find("span.triggerbox-button");
        if (_401 && 'string' == typeof opts.icon){
            _401.addClass(opts.icon);
        }
        var _402 = sb.find("input.triggerbox-text");
        sb._outerWidth(opts.width)._outerHeight(opts.height);
        _402._outerWidth(sb.width() - _401._outerWidth());
        _402.css({ height: sb.height() + "px", lineHeight: sb.height() + "px" });
       
        _401._outerHeight(sb.height());
        sb.insertAfter(_3ff);

        if (!opts.plain && sb.hasClass('triggerbox-plain') ) sb.removeClass('triggerbox-plain');  //add 2019-12-23 cryze
        if (opts.plain && !sb.hasClass('triggerbox-plain') ) sb.addClass('triggerbox-plain');
    };
    function _409(_40a) {
        var _40b = $.data(_40a, "triggerbox");
        var opts = _40b.options;
        var _40c = _40b.triggerbox.find("input.triggerbox-text");
        var _40d = _40b.triggerbox.find(".triggerbox-button");
        _40c.unbind(".triggerbox");
        _40d.unbind(".triggerbox");
        if (!opts.disabled) {
            _40c.bind("blur.triggerbox", function (e) {
                opts.value = $(this).val();
                if (opts.value == "") {
                    $(this).val(opts.prompt);
                    $(this).addClass("triggerbox-prompt");
                } else {
                    $(this).removeClass("triggerbox-prompt");
                }
            }).bind("focus.triggerbox", function (e) {
                if ($(this).val() != opts.value) {
                    $(this).val(opts.value);
                }
                $(this).removeClass("triggerbox-prompt");
            });
            _40d.bind("click.triggerbox", function () {
                opts.handler.call(_40a, opts.value, _40c._propAttr("name"));
            }).bind("mouseenter.triggerbox", function () {
                $(this).addClass("triggerbox-button-hover");
            }).bind("mouseleave.triggerbox", function () {
                $(this).removeClass("triggerbox-button-hover");
            });
        }
    };
    function _40e(_40f, _410) {
        var _411 = $.data(_40f, "triggerbox");
        var opts = _411.options;
        var _412 = _411.triggerbox.find("input.triggerbox-text");
        if (_410) {
            opts.disabled = true;
            $(_40f).attr("disabled", true);
            _412.attr("disabled", true);
            _411.triggerbox.addClass("disabled");
        } else {
            opts.disabled = false;
            $(_40f).removeAttr("disabled");
            _412.removeAttr("disabled");
            _411.triggerbox.removeClass("disabled");
        }
    };
    function _413(_414) {
        var _415 = $.data(_414, "triggerbox");
        var opts = _415.options;
        var _416 = _415.triggerbox.find("input.triggerbox-text");
        opts.originalValue = opts.value;
        if (opts.value) {
            _416.val(opts.value);
            _416.removeClass("triggerbox-prompt");
        } else {
            _416.val(opts.prompt);
            _416.addClass("triggerbox-prompt");
        }
    };
    $.fn.triggerbox = function (_417, _418) {
        if (typeof _417 == "string") {
            return $.fn.triggerbox.methods[_417](this, _418);
        }
        _417 = _417 || {};
        return this.each(function () {
            var _419 = $.data(this, "triggerbox");
            if (_419) {
                $.extend(_419.options, _417);
            } else {
                var userOpts=$.extend({},$.fn.triggerbox.parseOptions(this), _417);
                if (typeof userOpts.icon=="undefined" && typeof userOpts.plain=="undefined") { //plain默认还是false 但当使用者不传icon和plain时 plain为true,icon为icon-trigger-box
                    userOpts.icon='icon-trigger-box';
                    userOpts.plain=true;
                }
                _419 = $.data(this, "triggerbox", { options: $.extend({}, $.fn.triggerbox.defaults, userOpts), triggerbox: init(this) });
            }
            _413(this);
            _409(this);
            _40e(this, _419.options.disabled);
            _3fe(this);
        });
    };
    $.fn.triggerbox.methods = {
        options: function (jq) {
            return $.data(jq[0], "triggerbox").options;
        }, textbox: function (jq) {
            return $.data(jq[0], "triggerbox").triggerbox.find("input.triggerbox-text");
        }, getValue: function (jq) {
            return $.data(jq[0], "triggerbox").options.value;
        }, setValue: function (jq, _41a) {
            return jq.each(function () {
                $(this).triggerbox("options").value = _41a;
                $(this).triggerbox("textbox").val(_41a);
                $(this).triggerbox("textbox").blur();
            });
        }, clear: function (jq) {
            return jq.each(function () {
                $(this).triggerbox("setValue", "");
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).triggerbox("options");
                $(this).triggerbox("setValue", opts.originalValue);
            });
        }, getName: function (jq) {
            return $.data(jq[0], "triggerbox").triggerbox.find("input.triggerbox-text").attr("name");
        }, destroy: function (jq) {
            return jq.each(function () {
                $.data(this, "triggerbox").triggerbox.remove();
                $(this).remove();
            });
        }, resize: function (jq, _41b) {
            return jq.each(function () {
                _3fe(this, _41b);
            });
        }, disable: function (jq) {
            return jq.each(function () {
                _40e(this, true);
                _409(this);
            });
        }, enable: function (jq) {
            return jq.each(function () {
                _40e(this, false);
                _409(this);
            });
        }
    };
    $.fn.triggerbox.parseOptions = function (_41c) {
        var t = $(_41c);
        var w = t._outerWidth(); //wanghc 增加宽度定义
        return $.extend({}, $.parser.parseOptions(_41c, ["width", "height", "prompt", { plain: "boolean"}]), { width:w,value: (t.val() || undefined), disabled: (t.attr("disabled") ? true : undefined), handler: (t.attr("handler") ? eval(t.attr("handler")) : undefined) });
    };
    $.fn.triggerbox.defaults = {
        icon:"icon-w-trigger-box",width: "auto", height: 30, prompt: "", value: "", disabled: false, handler: function (_41d, name) {},plain:false
    };
})(jQuery);