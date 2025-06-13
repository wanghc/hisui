(function ($) {
    function init(_3fc) {
        $(_3fc).addClass("searchbox-f").hide();
        var span = $("<span class=\"searchbox\"></span>").insertAfter(_3fc);
        var _3fd = $("<input type=\"text\" class=\"searchbox-text\">").appendTo(span);
        $("<span><span class=\"searchbox-button\"></span></span>").appendTo(span);
        var name = $(_3fc).attr("name");
        if (name) {
            _3fd.attr("name", name);
            $(_3fc).removeAttr("name").attr("searchboxName", name);
        }
        return span;
    };
    function _3fe(_3ff, _400) {
        var opts = $.data(_3ff, "searchbox").options;
        var sb = $.data(_3ff, "searchbox").searchbox;
        if (_400) {
            opts.width = _400;
        }
        sb.appendTo("body");
        if (isNaN(opts.width)) {
            opts.width = sb._outerWidth();
        }
        var _401 = sb.find("span.searchbox-button");
        var menu = sb.find("a.searchbox-menu");
        var _402 = sb.find("input.searchbox-text");
        sb._outerWidth(opts.width)._outerHeight(opts.height);
        _402._outerWidth(sb.width() - menu._outerWidth() - _401._outerWidth());
        _402.css({ height: sb.height() + "px", lineHeight: sb.height() + "px" });
        menu._outerHeight(sb.height());
        _401._outerHeight(sb.height());
        var _403 = menu.find("span.l-btn-left");
        _403._outerHeight(sb.height());
        _403.find("span.l-btn-text").css({ height: _403.height() + "px", lineHeight: _403.height() + "px" });
        sb.insertAfter(_3ff);
    };
    function _404(_405) {
        var _406 = $.data(_405, "searchbox");
        var opts = _406.options;
        if (opts.menu) {
            _406.menu = $(opts.menu).menu({
                minWidth: 60,
                onClick: function (item) {
                    _407(item);
                },onShow:function(){
                    _406.searchbox.addClass('searchbox-plain-menu-open');
                    // 菜单外层包裹了1px的边框,菜单left与查询框未对齐
                    $(this).offset({left:_406.searchbox.offset().left});
                },onHide:function(){
                    _406.searchbox.removeClass('searchbox-plain-menu-open');
                }
            });
            var item = _406.menu.children("div.menu-item:first");
            _406.menu.children("div.menu-item").each(function () {
                var _408 = $.extend({}, $.parser.parseOptions(this), { selected: ($(this).attr("selected") ? true : undefined) });
                if (_408.selected) {
                    item = $(this);
                    return false;
                }
            });
            item.triggerHandler("click");
        } else {
            _406.searchbox.find("a.searchbox-menu").remove();
            _406.menu = null;
        }
        function _407(item) {
            _406.searchbox.find("a.searchbox-menu").remove();
            var mb = $("<a class=\"searchbox-menu\" href=\"javascript:void(0)\"></a>").html(item.text);
            mb.prependTo(_406.searchbox).menubutton({ menu: _406.menu, iconCls: item.iconCls });
            _406.searchbox.find("input.searchbox-text").attr("name", item.name || item.text);
            _3fe(_405);
        };
    };
    function _409(_40a) {
        var _40b = $.data(_40a, "searchbox");
        var opts = _40b.options;
        var _40c = _40b.searchbox.find("input.searchbox-text");
        var _40d = _40b.searchbox.find(".searchbox-button");
        _40c.unbind(".searchbox");
        _40d.unbind(".searchbox");
        if (!opts.disabled) {
            _40c.bind("blur.searchbox", function (e) {
                opts.value = $(this).val();
                if (opts.value == "") {
                    $(this).val(opts.prompt);
                    $(this).addClass("searchbox-prompt");
                } else {
                    $(this).removeClass("searchbox-prompt");
                }
            }).bind("focus.searchbox", function (e) {
                if ($(this).val() != opts.value) {
                    $(this).val(opts.value);
                }
                $(this).removeClass("searchbox-prompt");
            }).bind("keydown.searchbox", function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    opts.value = $(this).val();
                    opts.searcher.call(_40a, opts.value, _40c._propAttr("name"));
                    return false;
                }
            });
            _40d.bind("click.searchbox", function () {
                opts.searcher.call(_40a, opts.value, _40c._propAttr("name"));
            }).bind("mouseenter.searchbox", function () {
                $(this).addClass("searchbox-button-hover");
            }).bind("mouseleave.searchbox", function () {
                $(this).removeClass("searchbox-button-hover");
            });
        }
    };
    function _40e(_40f, _410) {
        var _411 = $.data(_40f, "searchbox");
        var opts = _411.options;
        var _412 = _411.searchbox.find("input.searchbox-text");
        var mb = _411.searchbox.find("a.searchbox-menu");
        //cryze searchbox 禁用启用 _411.searchbox为 span.searchbox jq对象
        if (_410) {
            opts.disabled = true;
            $(_40f).attr("disabled", true);
            _412.attr("disabled", true);
            if (mb.length) {
                mb.menubutton("disable");
            }
            _411.searchbox.addClass("disabled");
        } else {
            opts.disabled = false;
            $(_40f).removeAttr("disabled");
            _412.removeAttr("disabled");
            if (mb.length) {
                mb.menubutton("enable");
            }
            _411.searchbox.removeClass("disabled");
        }
    };
    function _413(_414) {
        var _415 = $.data(_414, "searchbox");
        var opts = _415.options;
        var _416 = _415.searchbox.find("input.searchbox-text");
        opts.originalValue = opts.value;
        if (opts.value) {
            _416.val(opts.value);
            _416.removeClass("searchbox-prompt");
        } else {
            _416.val(opts.prompt);
            _416.addClass("searchbox-prompt");
        }
    };
    $.fn.searchbox = function (_417, _418) {
        if (typeof _417 == "string") {
            return $.fn.searchbox.methods[_417](this, _418);
        }
        _417 = _417 || {};
        return this.each(function () {
            var _419 = $.data(this, "searchbox");
            if (_419) {
                $.extend(_419.options, _417);
            } else {
                _419 = $.data(this, "searchbox", { options: $.extend({}, $.fn.searchbox.defaults, $.fn.searchbox.parseOptions(this), _417), searchbox: init(this) });
            }
            _404(this);
            _413(this);
            _409(this);
            _40e(this, _419.options.disabled);
            _3fe(this);
        });
    };
    $.fn.searchbox.methods = {
        options: function (jq) {
            return $.data(jq[0], "searchbox").options;
        }, menu: function (jq) {
            return $.data(jq[0], "searchbox").menu;
        }, textbox: function (jq) {
            return $.data(jq[0], "searchbox").searchbox.find("input.searchbox-text");
        }, getValue: function (jq) {
            return $.data(jq[0], "searchbox").options.value;
        }, setValue: function (jq, _41a) {
            return jq.each(function () {
                $(this).searchbox("options").value = _41a;
                $(this).searchbox("textbox").val(_41a);
                $(this).searchbox("textbox").blur();
            });
        }, clear: function (jq) {
            return jq.each(function () {
                $(this).searchbox("setValue", "");
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).searchbox("options");
                $(this).searchbox("setValue", opts.originalValue);
            });
        }, getName: function (jq) {
            return $.data(jq[0], "searchbox").searchbox.find("input.searchbox-text").attr("name");
        }, selectName: function (jq, name) {
            return jq.each(function () {
                var menu = $.data(this, "searchbox").menu;
                if (menu) {
                    menu.children("div.menu-item[name=\"" + name + "\"]").triggerHandler("click");
                }
            });
        }, destroy: function (jq) {
            return jq.each(function () {
                var menu = $(this).searchbox("menu");
                if (menu) {
                    menu.menu("destroy");
                }
                $.data(this, "searchbox").searchbox.remove();
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
    $.fn.searchbox.parseOptions = function (_41c) {
        var t = $(_41c);
        return $.extend({}, $.parser.parseOptions(_41c, ["width", "height", "prompt", "menu"]), { value: (t.val() || undefined), disabled: (t.attr("disabled") ? true : undefined), searcher: (t.attr("searcher") ? eval(t.attr("searcher")) : undefined) });
    };
    //wanghc searchbox height:22-->30
    $.fn.searchbox.defaults = {
        width: "auto", height: 30, prompt: "", value: "", menu: null, disabled: false, searcher: function (_41d, name) {
        }
    };
})(jQuery);