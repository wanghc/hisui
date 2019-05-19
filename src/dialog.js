(function ($) {
    function _260(_261) {
        var cp = document.createElement("div");
        while (_261.firstChild) {
            cp.appendChild(_261.firstChild);
        }
        _261.appendChild(cp);
        var _262 = $(cp);
        _262.attr("style", $(_261).attr("style"));
        $(_261).removeAttr("style").css("overflow", "hidden");
        _262.panel({ border: false, doSize: false, bodyCls: "dialog-content" });
        return _262;
    };
    function _263(_264) {
        var opts = $.data(_264, "dialog").options;
        var _265 = $.data(_264, "dialog").contentPanel;
        if (opts.toolbar) {
            if ($.isArray(opts.toolbar)) {
                $(_264).find("div.dialog-toolbar").remove();
                var _266 = $("<div class=\"dialog-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(_264);
                var tr = _266.find("tr");
                for (var i = 0; i < opts.toolbar.length; i++) {
                    var btn = opts.toolbar[i];
                    if (btn == "-") {
                        $("<td><div class=\"dialog-tool-separator\"></div></td>").appendTo(tr);
                    } else {
                        var td = $("<td></td>").appendTo(tr);
                        var tool = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
                        tool[0].onclick = eval(btn.handler || function () {
                        });
                        tool.linkbutton($.extend({}, btn, { plain: true }));
                    }
                }
            } else {
                $(opts.toolbar).addClass("dialog-toolbar").prependTo(_264);
                $(opts.toolbar).show();
            }
        } else {
            $(_264).find("div.dialog-toolbar").remove();
        }
        if (opts.buttons) {
            if ($.isArray(opts.buttons)) {
                $(_264).find("div.dialog-button").remove();
                var _267 = $("<div class=\"dialog-button\"></div>").appendTo(_264);
                for (var i = 0; i < opts.buttons.length; i++) {
                    var p = opts.buttons[i];
                    var _268 = $("<a href=\"javascript:void(0)\"></a>").appendTo(_267);
                    if (p.handler) {
                        _268[0].onclick = p.handler;
                    }
                    _268.linkbutton(p);
                }
            } else {
                $(opts.buttons).addClass("dialog-button").appendTo(_264);
                $(opts.buttons).show();
            }
        } else {
            $(_264).find("div.dialog-button").remove();
        }
        var _269 = opts.href;
        var _26a = opts.content;
        opts.href = null;
        opts.content = null;
        _265.panel({
            closed: opts.closed, cache: opts.cache, href: _269, content: _26a, onLoad: function () {
                if (opts.height == "auto") {
                    $(_264).window("resize");
                }
                opts.onLoad.apply(_264, arguments);
            }
        });
        $(_264).window($.extend({}, opts, {
            onOpen: function () {
                if (_265.panel("options").closed) {
                    _265.panel("open");
                }
                if (opts.onOpen) {
                    opts.onOpen.call(_264);
                }
            }, onResize: function (_26b, _26c) {
                var _26d = $(_264);
                _265.panel("panel").show();
                _265.panel("resize", { width: _26d.width(), height: (_26c == "auto") ? "auto" : _26d.height() - _26d.children("div.dialog-toolbar")._outerHeight() - _26d.children("div.dialog-button")._outerHeight() });
                if (opts.onResize) {
                    opts.onResize.call(_264, _26b, _26c);
                }
            }
        }));
        opts.href = _269;
        opts.content = _26a;
    };
    function _26e(_26f, href) {
        var _270 = $.data(_26f, "dialog").contentPanel;
        _270.panel("refresh", href);
    };
    $.fn.dialog = function (_271, _272) {
        if (typeof _271 == "string") {
            var _273 = $.fn.dialog.methods[_271];
            if (_273) {
                return _273(this, _272);
            } else {
                return this.window(_271, _272);
            }
        }
        _271 = _271 || {};
        return this.each(function () {
            var _274 = $.data(this, "dialog");
            if (_274) {
                $.extend(_274.options, _271);
            } else {
                $.data(this, "dialog", { options: $.extend({}, $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), _271), contentPanel: _260(this) });
            }
            _263(this);
        });
    };
    $.fn.dialog.methods = {
        options: function (jq) {
            var _275 = $.data(jq[0], "dialog").options;
            var _276 = jq.panel("options");
            $.extend(_275, { closed: _276.closed, collapsed: _276.collapsed, minimized: _276.minimized, maximized: _276.maximized });
            var _277 = $.data(jq[0], "dialog").contentPanel;
            return _275;
        }, dialog: function (jq) {
            return jq.window("window");
        }, refresh: function (jq, href) {
            return jq.each(function () {
                _26e(this, href);
            });
        }
    };
    $.fn.dialog.parseOptions = function (_278) {
        return $.extend({}, $.fn.window.parseOptions(_278), $.parser.parseOptions(_278, ["toolbar", "buttons"]));
    };
    $.fn.dialog.defaults = $.extend({}, $.fn.window.defaults, { title: "New Dialog", collapsible: false, minimizable: false, maximizable: false, resizable: false, toolbar: null, buttons: null });
})(jQuery);