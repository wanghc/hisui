(function ($) {
    function setSize(target, param) {
        var opts = $.data(target, "window").options;
        if (param) {
            $.extend(opts, param);
        }
        $(target).panel("resize", opts);
    };
    function moveWindow(target, param) {
        var state = $.data(target, "window");
        if (param) {
            if (param.left != null) {
                state.options.left = param.left;
            }
            if (param.top != null) {
                state.options.top = param.top;
            }
        }
        $(target).panel("move", state.options);
        if (state.shadow) {
            state.shadow.css({ left: state.options.left, top: state.options.top });
        }
    };
    function hcenter(target, tomove) {
        var state = $.data(target, "window");
        var opts = state.options;
        var width = opts.width;
        if (isNaN(width)) {
            width = state.window._outerWidth();
        }else{
            // 当css中定义了min-width，opts.width小于min-width，此时弹出窗口宽实际是min-width，则取更大的宽度值
            width = Math.max(width,$.hisui.getStyleCodeConfigValue("windowMinWidth"));
        }
        if (opts.inline) {
            var parent = state.window.parent();
            opts.left = (parent.width() - width) / 2 + parent.scrollLeft();
        } else {
            opts.left = ($(window)._outerWidth() - width) / 2 + $(document).scrollLeft();
        }
        if (tomove) {
            moveWindow(target);
        }
    };
    function vcenter(target, tomove) {
        var state = $.data(target, "window");
        var opts = state.options;
        var height = opts.height;
        if (isNaN(height)) {
            height = state.window._outerHeight();
        }else{
            // 当css中定义了min-height，opts.height小于min-height，此时弹出窗口宽实际是min-height，则取更大的宽度值
            height = Math.max(height,$.hisui.getStyleCodeConfigValue("windowMinHeight"));            
        }
        if (opts.inline) {
            var parent = state.window.parent();
            opts.top = (parent.height() - height) / 2 + parent.scrollTop();
        } else {
            opts.top = ($(window)._outerHeight() - height) / 2 + $(document).scrollTop();
        }
        if (tomove) {
            moveWindow(target);
        }
    };
    function create(target) {
        var state = $.data(target, "window");
        var winClosed = state.options.closed;
        var win = $(target).panel($.extend({}, state.options, {
            border: false, doSize: true, closed: true, cls: "window", headerCls: "window-header", bodyCls: "window-body " + (state.options.noheader ? "window-body-noheader" : ""), onBeforeDestroy: function () {
                if (state.options.onBeforeDestroy.call(target) == false) {
                    return false;
                }
                if (state.shadow) {
                    state.shadow.remove();
                }
                if (state.mask) {
                    state.mask.remove();
                }
            }, onClose: function () {
                if (state.shadow) {
                    state.shadow.hide();
                }
                if (state.mask) {
                    state.mask.hide();
                }
                state.options.onClose.call(target);
            }, onOpen: function () {
                if (state.mask) {
                    state.mask.css({ display: "block", zIndex: $.fn.window.defaults.zIndex++ });
                }
                if (state.shadow) {
                    state.shadow.css({ display: "block", zIndex: $.fn.window.defaults.zIndex++, left: state.options.left, top: state.options.top, width: state.window._outerWidth(), height: state.window._outerHeight() });
                }
                state.window.css("z-index", $.fn.window.defaults.zIndex++);
                state.options.onOpen.call(target);
            }, onResize: function (width, height) {
                var opts = $(this).panel("options");
                $.extend(state.options, { width: opts.width, height: opts.height, left: opts.left, top: opts.top });
                if (state.shadow) {
                    state.shadow.css({ left: state.options.left, top: state.options.top, width: state.window._outerWidth(), height: state.window._outerHeight() });
                }
                state.options.onResize.call(target, width, height);
            }, onMinimize: function () {
                if (state.shadow) {
                    state.shadow.hide();
                }
                if (state.mask) {
                    state.mask.hide();
                }
                state.options.onMinimize.call(target);
            }, onBeforeCollapse: function () {
                if (state.options.onBeforeCollapse.call(target) == false) {
                    return false;
                }
                if (state.shadow) {
                    state.shadow.hide();
                }
            }, onExpand: function () {
                if (state.shadow) {
                    state.shadow.show();
                }
                state.options.onExpand.call(target);
            }
        }));
        state.window = win.panel("panel");
        if (state.mask) {
            state.mask.remove();
        }
        if (state.options.modal == true) {
            //wanghc 2017-12-14 ---ocx dll
            var maskFrame = ""; //修改window,使window,dialog,alert,confirm,prompt,progress的mask支持ocx
            if (state.options.isTopZindex){
                if (!!window.ActiveXObject || "ActiveXObject" in window){ /**Only IE*/
                    maskFrame = '<iframe style="position:absolute;z-index:-1;width:100%;height:100%;top:0;left:0;scrolling:no;" frameborder="0"></iframe>';
                }
            }
            state.mask = $("<div class=\"window-mask\">"+maskFrame+"</div>").insertAfter(state.window);
            state.mask.css({ width: (state.options.inline ? state.mask.parent().width() : getPageArea().width), height: (state.options.inline ? state.mask.parent().height() : getPageArea().height), display: "none" });
        }
        if (state.shadow) {
            state.shadow.remove();
        }
        if (state.options.shadow == true) {
            state.shadow = $("<div class=\"window-shadow\"></div>").insertAfter(state.window);
            state.shadow.css({ display: "none" });
        }
        if (state.options.left == null) {
            hcenter(target);
        }
        if (state.options.top == null) {
            vcenter(target);
        }
        moveWindow(target);
        if (!winClosed) {
            win.window("open");
        }
    };
    function setProperties(target) {
        var state = $.data(target, "window");
        state.window.draggable({
            handle: ">div.panel-header>div.panel-title", disabled: state.options.draggable == false, onStartDrag: function (e) {
                if (state.mask) {
                    state.mask.css("z-index", $.fn.window.defaults.zIndex++);
                }
                if (state.shadow) {
                    state.shadow.css("z-index", $.fn.window.defaults.zIndex++);
                }
                state.window.css("z-index", $.fn.window.defaults.zIndex++);
                if (!state.proxy) {
                    state.proxy = $("<div class=\"window-proxy\"></div>").insertAfter(state.window);
                }
                state.proxy.css({ display: "none", zIndex: $.fn.window.defaults.zIndex++, left: e.data.left, top: e.data.top });
                state.proxy._outerWidth(state.window._outerWidth());
                state.proxy._outerHeight(state.window._outerHeight());
                setTimeout(function () {
                    if (state.proxy) {
                        state.proxy.show();
                    }
                }, 500);
            }, onDrag: function (e) {
                state.proxy.css({ display: "block", left: e.data.left, top: e.data.top });
                return false;
            }, onStopDrag: function (e) {
                state.options.left = e.data.left;
                state.options.top = e.data.top;
                $(target).window("move");
                state.proxy.remove();
                state.proxy = null;
            }
        });
        state.window.resizable({
            disabled: state.options.resizable == false, onStartResize: function (e) {
                state.pmask = $("<div class=\"window-proxy-mask\"></div>").insertAfter(state.window);
                state.pmask.css({ zIndex: $.fn.window.defaults.zIndex++, left: e.data.left, top: e.data.top, width: state.window._outerWidth(), height: state.window._outerHeight() });
                if (!state.proxy) {
                    state.proxy = $("<div class=\"window-proxy\"></div>").insertAfter(state.window);
                }
                state.proxy.css({ zIndex: $.fn.window.defaults.zIndex++, left: e.data.left, top: e.data.top });
                state.proxy._outerWidth(e.data.width);
                state.proxy._outerHeight(e.data.height);
            }, onResize: function (e) {
                state.proxy.css({ left: e.data.left, top: e.data.top });
                state.proxy._outerWidth(e.data.width);
                state.proxy._outerHeight(e.data.height);
                return false;
            }, onStopResize: function (e) {
                $.extend(state.options, { left: e.data.left, top: e.data.top, width: e.data.width, height: e.data.height });
                setSize(target);
                state.pmask.remove();
                state.pmask = null;
                state.proxy.remove();
                state.proxy = null;
            }
        });
    };
    function getPageArea() {
        if (document.compatMode == "BackCompat") {
            return { width: Math.max(document.body.scrollWidth, document.body.clientWidth), height: Math.max(document.body.scrollHeight, document.body.clientHeight) };
        } else {
            return { width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth), height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) };
        }
    };
    $(window).resize(function () {
        $("body>div.window-mask").css({ width: $(window)._outerWidth(), height: $(window)._outerHeight() });
        setTimeout(function () {
            $("body>div.window-mask").css({ width: getPageArea().width, height: getPageArea().height });
        }, 50);
    });
    $.fn.window = function (options, param) {
        if (typeof options == "string") {
            var method = $.fn.window.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.panel(options, param);
            }
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "window");
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, "window", { options: $.extend({}, $.fn.window.defaults, $.fn.window.parseOptions(this), options) });
                if (!state.options.inline) {
                    document.body.appendChild(this);
                }
            }
            create(this);
            setProperties(this);
        });
    };
    $.fn.window.methods = {
        options: function (jq) {
            var popts = jq.panel("options");
            var wopts = $.data(jq[0], "window").options;
            return $.extend(wopts, { closed: popts.closed, collapsed: popts.collapsed, minimized: popts.minimized, maximized: popts.maximized });
        }, window: function (jq) {
            return $.data(jq[0], "window").window;
        }, resize: function (jq, param) {
            return jq.each(function () {
                setSize(this, param);
            });
        }, move: function (jq, param) {
            return jq.each(function () {
                moveWindow(this, param);
            });
        }, hcenter: function (jq) {
            return jq.each(function () {
                hcenter(this, true);
            });
        }, vcenter: function (jq) {
            return jq.each(function () {
                vcenter(this, true);
            });
        }, center: function (jq) {
            return jq.each(function () {
                hcenter(this);
                vcenter(this);
                moveWindow(this);
            });
        }
    };
    $.fn.window.parseOptions = function (target) {
        return $.extend({}, $.fn.panel.parseOptions(target), $.parser.parseOptions(target, [{ draggable: "boolean", resizable: "boolean", shadow: "boolean", modal: "boolean", inline: "boolean" }]));
    };
    $.fn.window.defaults = $.extend({}, $.fn.panel.defaults, {zIndex: 9000, draggable: true, resizable: true, shadow: true, modal: false, inline: false, title: "New Window", collapsible: true, minimizable: true, maximizable: true, closable: true, closed: false });
})(jQuery);