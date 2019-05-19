(function ($) {
    function _23a(_23b, _23c) {
        var opts = $.data(_23b, "window").options;
        if (_23c) {
            $.extend(opts, _23c);
        }
        $(_23b).panel("resize", opts);
    };
    function _23d(_23e, _23f) {
        var _240 = $.data(_23e, "window");
        if (_23f) {
            if (_23f.left != null) {
                _240.options.left = _23f.left;
            }
            if (_23f.top != null) {
                _240.options.top = _23f.top;
            }
        }
        $(_23e).panel("move", _240.options);
        if (_240.shadow) {
            _240.shadow.css({ left: _240.options.left, top: _240.options.top });
        }
    };
    function _241(_242, _243) {
        var _244 = $.data(_242, "window");
        var opts = _244.options;
        var _245 = opts.width;
        if (isNaN(_245)) {
            _245 = _244.window._outerWidth();
        }
        if (opts.inline) {
            var _246 = _244.window.parent();
            opts.left = (_246.width() - _245) / 2 + _246.scrollLeft();
        } else {
            opts.left = ($(window)._outerWidth() - _245) / 2 + $(document).scrollLeft();
        }
        if (_243) {
            _23d(_242);
        }
    };
    function _247(_248, _249) {
        var _24a = $.data(_248, "window");
        var opts = _24a.options;
        var _24b = opts.height;
        if (isNaN(_24b)) {
            _24b = _24a.window._outerHeight();
        }
        if (opts.inline) {
            var _24c = _24a.window.parent();
            opts.top = (_24c.height() - _24b) / 2 + _24c.scrollTop();
        } else {
            opts.top = ($(window)._outerHeight() - _24b) / 2 + $(document).scrollTop();
        }
        if (_249) {
            _23d(_248);
        }
    };
    function _24d(_24e) {
        var _24f = $.data(_24e, "window");
        var _250 = _24f.options.closed;
        var win = $(_24e).panel($.extend({}, _24f.options, {
            border: false, doSize: true, closed: true, cls: "window", headerCls: "window-header", bodyCls: "window-body " + (_24f.options.noheader ? "window-body-noheader" : ""), onBeforeDestroy: function () {
                if (_24f.options.onBeforeDestroy.call(_24e) == false) {
                    return false;
                }
                if (_24f.shadow) {
                    _24f.shadow.remove();
                }
                if (_24f.mask) {
                    _24f.mask.remove();
                }
            }, onClose: function () {
                if (_24f.shadow) {
                    _24f.shadow.hide();
                }
                if (_24f.mask) {
                    _24f.mask.hide();
                }
                _24f.options.onClose.call(_24e);
            }, onOpen: function () {
                if (_24f.mask) {
                    _24f.mask.css({ display: "block", zIndex: $.fn.window.defaults.zIndex++ });
                }
                if (_24f.shadow) {
                    _24f.shadow.css({ display: "block", zIndex: $.fn.window.defaults.zIndex++, left: _24f.options.left, top: _24f.options.top, width: _24f.window._outerWidth(), height: _24f.window._outerHeight() });
                }
                _24f.window.css("z-index", $.fn.window.defaults.zIndex++);
                _24f.options.onOpen.call(_24e);
            }, onResize: function (_251, _252) {
                var opts = $(this).panel("options");
                $.extend(_24f.options, { width: opts.width, height: opts.height, left: opts.left, top: opts.top });
                if (_24f.shadow) {
                    _24f.shadow.css({ left: _24f.options.left, top: _24f.options.top, width: _24f.window._outerWidth(), height: _24f.window._outerHeight() });
                }
                _24f.options.onResize.call(_24e, _251, _252);
            }, onMinimize: function () {
                if (_24f.shadow) {
                    _24f.shadow.hide();
                }
                if (_24f.mask) {
                    _24f.mask.hide();
                }
                _24f.options.onMinimize.call(_24e);
            }, onBeforeCollapse: function () {
                if (_24f.options.onBeforeCollapse.call(_24e) == false) {
                    return false;
                }
                if (_24f.shadow) {
                    _24f.shadow.hide();
                }
            }, onExpand: function () {
                if (_24f.shadow) {
                    _24f.shadow.show();
                }
                _24f.options.onExpand.call(_24e);
            }
        }));
        _24f.window = win.panel("panel");
        if (_24f.mask) {
            _24f.mask.remove();
        }
        if (_24f.options.modal == true) {
            //wanghc 2017-12-14 ---ocx dll
            var maskFrame = ""; //修改window,使window,dialog,alert,confirm,prompt,progress的mask支持ocx
            if (_24f.options.isTopZindex){
                maskFrame = '<iframe style="position:absolute;z-index:-1;width:100%;height:100%;top:0;left:0;scrolling:no;" frameborder="0"></iframe>';
            }
            _24f.mask = $("<div class=\"window-mask\">"+maskFrame+"</div>").insertAfter(_24f.window);
            _24f.mask.css({ width: (_24f.options.inline ? _24f.mask.parent().width() : _253().width), height: (_24f.options.inline ? _24f.mask.parent().height() : _253().height), display: "none" });
        }
        if (_24f.shadow) {
            _24f.shadow.remove();
        }
        if (_24f.options.shadow == true) {
            _24f.shadow = $("<div class=\"window-shadow\"></div>").insertAfter(_24f.window);
            _24f.shadow.css({ display: "none" });
        }
        if (_24f.options.left == null) {
            _241(_24e);
        }
        if (_24f.options.top == null) {
            _247(_24e);
        }
        _23d(_24e);
        if (!_250) {
            win.window("open");
        }
    };
    function _254(_255) {
        var _256 = $.data(_255, "window");
        _256.window.draggable({
            handle: ">div.panel-header>div.panel-title", disabled: _256.options.draggable == false, onStartDrag: function (e) {
                if (_256.mask) {
                    _256.mask.css("z-index", $.fn.window.defaults.zIndex++);
                }
                if (_256.shadow) {
                    _256.shadow.css("z-index", $.fn.window.defaults.zIndex++);
                }
                _256.window.css("z-index", $.fn.window.defaults.zIndex++);
                if (!_256.proxy) {
                    _256.proxy = $("<div class=\"window-proxy\"></div>").insertAfter(_256.window);
                }
                _256.proxy.css({ display: "none", zIndex: $.fn.window.defaults.zIndex++, left: e.data.left, top: e.data.top });
                _256.proxy._outerWidth(_256.window._outerWidth());
                _256.proxy._outerHeight(_256.window._outerHeight());
                setTimeout(function () {
                    if (_256.proxy) {
                        _256.proxy.show();
                    }
                }, 500);
            }, onDrag: function (e) {
                _256.proxy.css({ display: "block", left: e.data.left, top: e.data.top });
                return false;
            }, onStopDrag: function (e) {
                _256.options.left = e.data.left;
                _256.options.top = e.data.top;
                $(_255).window("move");
                _256.proxy.remove();
                _256.proxy = null;
            }
        });
        _256.window.resizable({
            disabled: _256.options.resizable == false, onStartResize: function (e) {
                _256.pmask = $("<div class=\"window-proxy-mask\"></div>").insertAfter(_256.window);
                _256.pmask.css({ zIndex: $.fn.window.defaults.zIndex++, left: e.data.left, top: e.data.top, width: _256.window._outerWidth(), height: _256.window._outerHeight() });
                if (!_256.proxy) {
                    _256.proxy = $("<div class=\"window-proxy\"></div>").insertAfter(_256.window);
                }
                _256.proxy.css({ zIndex: $.fn.window.defaults.zIndex++, left: e.data.left, top: e.data.top });
                _256.proxy._outerWidth(e.data.width);
                _256.proxy._outerHeight(e.data.height);
            }, onResize: function (e) {
                _256.proxy.css({ left: e.data.left, top: e.data.top });
                _256.proxy._outerWidth(e.data.width);
                _256.proxy._outerHeight(e.data.height);
                return false;
            }, onStopResize: function (e) {
                $.extend(_256.options, { left: e.data.left, top: e.data.top, width: e.data.width, height: e.data.height });
                _23a(_255);
                _256.pmask.remove();
                _256.pmask = null;
                _256.proxy.remove();
                _256.proxy = null;
            }
        });
    };
    function _253() {
        if (document.compatMode == "BackCompat") {
            return { width: Math.max(document.body.scrollWidth, document.body.clientWidth), height: Math.max(document.body.scrollHeight, document.body.clientHeight) };
        } else {
            return { width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth), height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) };
        }
    };
    $(window).resize(function () {
        $("body>div.window-mask").css({ width: $(window)._outerWidth(), height: $(window)._outerHeight() });
        setTimeout(function () {
            $("body>div.window-mask").css({ width: _253().width, height: _253().height });
        }, 50);
    });
    $.fn.window = function (_257, _258) {
        if (typeof _257 == "string") {
            var _259 = $.fn.window.methods[_257];
            if (_259) {
                return _259(this, _258);
            } else {
                return this.panel(_257, _258);
            }
        }
        _257 = _257 || {};
        return this.each(function () {
            var _25a = $.data(this, "window");
            if (_25a) {
                $.extend(_25a.options, _257);
            } else {
                _25a = $.data(this, "window", { options: $.extend({}, $.fn.window.defaults, $.fn.window.parseOptions(this), _257) });
                if (!_25a.options.inline) {
                    document.body.appendChild(this);
                }
            }
            _24d(this);
            _254(this);
        });
    };
    $.fn.window.methods = {
        options: function (jq) {
            var _25b = jq.panel("options");
            var _25c = $.data(jq[0], "window").options;
            return $.extend(_25c, { closed: _25b.closed, collapsed: _25b.collapsed, minimized: _25b.minimized, maximized: _25b.maximized });
        }, window: function (jq) {
            return $.data(jq[0], "window").window;
        }, resize: function (jq, _25d) {
            return jq.each(function () {
                _23a(this, _25d);
            });
        }, move: function (jq, _25e) {
            return jq.each(function () {
                _23d(this, _25e);
            });
        }, hcenter: function (jq) {
            return jq.each(function () {
                _241(this, true);
            });
        }, vcenter: function (jq) {
            return jq.each(function () {
                _247(this, true);
            });
        }, center: function (jq) {
            return jq.each(function () {
                _241(this);
                _247(this);
                _23d(this);
            });
        }
    };
    $.fn.window.parseOptions = function (_25f) {
        return $.extend({}, $.fn.panel.parseOptions(_25f), $.parser.parseOptions(_25f, [{ draggable: "boolean", resizable: "boolean", shadow: "boolean", modal: "boolean", inline: "boolean" }]));
    };
    $.fn.window.defaults = $.extend({}, $.fn.panel.defaults, {zIndex: 9000, draggable: true, resizable: true, shadow: true, modal: false, inline: false, title: "New Window", collapsible: true, minimizable: true, maximizable: true, closable: true, closed: false });
})(jQuery);