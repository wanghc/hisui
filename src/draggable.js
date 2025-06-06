(function ($) {   //cryze from 1.5
    function drag(e) {
        var state = $.data(e.data.target, "draggable");
        var opts = state.options;
        var proxy = state.proxy;
        var dragData = e.data;
        var left = dragData.startLeft + e.pageX - dragData.startX;
        var top = dragData.startTop + e.pageY - dragData.startY;
        if (proxy) {
            if (proxy.parent()[0] == document.body) {
                if (opts.deltaX != null && opts.deltaX != undefined) {
                    left = e.pageX + opts.deltaX;
                } else {
                    left = e.pageX - e.data.offsetWidth;
                }
                if (opts.deltaY != null && opts.deltaY != undefined) {
                    top = e.pageY + opts.deltaY;
                } else {
                    top = e.pageY - e.data.offsetHeight;
                }
            } else {
                if (opts.deltaX != null && opts.deltaX != undefined) {
                    left += e.data.offsetWidth + opts.deltaX;
                }
                if (opts.deltaY != null && opts.deltaY != undefined) {
                    top += e.data.offsetHeight + opts.deltaY;
                }
            }
        }
        if (e.data.parent != document.body) {
            left += $(e.data.parent).scrollLeft();
            top += $(e.data.parent).scrollTop();
        }
        if (opts.axis == "h") {
            dragData.left = left;
        } else {
            if (opts.axis == "v") {
                dragData.top = top;
            } else {
                dragData.left = left;
                dragData.top = top;
            }
        }
    };

    function applyDrag(e) {
        var state = $.data(e.data.target, "draggable");
        var opts = state.options;
        var proxy = state.proxy;
        if (!proxy) {
            proxy = $(e.data.target);
        }
        // 在有滚动条的父容器下拖拽元素，弹出的跟随元素的位置会偏移 [4865704] 2024-08-15
        proxy.css({
            left: e.data.left - $(e.data.parent).scrollLeft(),
            top: e.data.top - $(e.data.parent).scrollTop()
        });
        $("body").css("cursor", opts.cursor);
    };

    function doDown(e) {
        if (!$.fn.draggable.isDragging) {
            return false;
        }
        var state = $.data(e.data.target, "draggable");
        var opts = state.options;
        var droppables = $(".droppable:visible").filter(function () {
            return e.data.target != this;
        }).filter(function () {
            var accept = $.data(this, "droppable").options.accept;
            if (accept) {
                return $(accept).filter(function () {
                    return this == e.data.target;
                }).length > 0;
            } else {
                return true;
            }
        });
        state.droppables = droppables;
        var proxy = state.proxy;
        if (!proxy) {
            if (opts.proxy) {
                if (opts.proxy == "clone") {
                    proxy = $(e.data.target).clone().insertAfter(e.data.target);
                } else {
                    proxy = opts.proxy.call(e.data.target, e.data.target);
                }
                state.proxy = proxy;
            } else {
                proxy = $(e.data.target);
            }
        }
        proxy.css("position", "absolute");
        drag(e);
        applyDrag(e);
        opts.onStartDrag.call(e.data.target, e);
        return false;
    };

    function doMove(e) {
        if (!$.fn.draggable.isDragging) {
            return false;
        }
        var state = $.data(e.data.target, "draggable");
        drag(e);
        if (state.options.onDrag.call(e.data.target, e) != false) {
            applyDrag(e);
        }
        var source = e.data.target;
        state.droppables.each(function () {
            var dropObj = $(this);
            if (dropObj.droppable("options").disabled) {
                return;
            }
            var p2 = dropObj.offset();
            if (e.pageX > p2.left && e.pageX < p2.left + dropObj.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + dropObj.outerHeight()) {
                if (!this.entered) {
                    $(this).trigger("_dragenter", [source]);
                    this.entered = true;
                }
                $(this).trigger("_dragover", [source]);
            } else {
                if (this.entered) {
                    $(this).trigger("_dragleave", [source]);
                    this.entered = false;
                }
            }
        });
        return false;
    };

    function doUp(e) {
        if (!$.fn.draggable.isDragging) {
            _4e();
            return false;
        }
        doMove(e);
        var state = $.data(e.data.target, "draggable");
        var proxy = state.proxy;
        var opts = state.options;
        opts.onEndDrag.call(e.data.target, e);
        if (opts.revert) {
            if (checkDrop() == true) {
                $(e.data.target).css({
                    position: e.data.startPosition,
                    left: e.data.startLeft,
                    top: e.data.startTop
                });
            } else {
                if (proxy) {
                    var left, top;
                    if (proxy.parent()[0] == document.body) {
                        left = e.data.startX - e.data.offsetWidth;
                        top = e.data.startY - e.data.offsetHeight;
                    } else {
                        left = e.data.startLeft;
                        top = e.data.startTop;
                    }
                    proxy.animate({
                        left: left,
                        top: top
                    }, function () {
                        removeProxy();
                    });
                } else {
                    $(e.data.target).animate({
                        left: e.data.startLeft,
                        top: e.data.startTop
                    }, function () {
                        $(e.data.target).css("position", e.data.startPosition);
                    });
                }
            }
        } else {
            $(e.data.target).css({
                position: "absolute",
                left: e.data.left,
                top: e.data.top
            });
            checkDrop();
        }
        opts.onStopDrag.call(e.data.target, e);
        _4e();

        function removeProxy() {
            if (proxy) {
                proxy.remove();
            }
            state.proxy = null;
        };

        function checkDrop() {
            var dropped = false;
            state.droppables.each(function () {
                var dropObj = $(this);
                if (dropObj.droppable("options").disabled) {
                    return;
                }
                var p2 = dropObj.offset();
                if (e.pageX > p2.left && e.pageX < p2.left + dropObj.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + dropObj.outerHeight()) {
                    if (opts.revert) {
                        $(e.data.target).css({
                            position: e.data.startPosition,
                            left: e.data.startLeft,
                            top: e.data.startTop
                        });
                    }
                    $(this).triggerHandler("_drop", [e.data.target]);
                    removeProxy();
                    dropped = true;
                    this.entered = false;
                    return false;
                }
            });
            if (!dropped && !opts.revert) {
                removeProxy();
            }
            return dropped;
        };
        return false;
    };

    function _4e() {
        if ($.fn.draggable.timer) {
            clearTimeout($.fn.draggable.timer);
            $.fn.draggable.timer = undefined;
        }
        $(document).unbind(".draggable");
        $.fn.draggable.isDragging = false;
        setTimeout(function () {
            $("body").css("cursor", "");
        }, 100);
    };
    $.fn.draggable = function (options, param) {
        if (typeof options == "string") {
            return $.fn.draggable.methods[options](this, param);
        }
        return this.each(function () {
            var opts;
            var state = $.data(this, "draggable");
            if (state) {
                state.handle.unbind(".draggable");
                opts = $.extend(state.options, options);
            } else {
                opts = $.extend({}, $.fn.draggable.defaults, $.fn.draggable.parseOptions(this), options || {});
            }
            var handle = opts.handle ? (typeof opts.handle == "string" ? $(opts.handle, this) : opts.handle) : $(this);
            $.data(this, "draggable", {
                options: opts,
                handle: handle
            });
            if (opts.disabled) {
                $(this).css("cursor", "");
                return;
            }
            handle.unbind(".draggable").bind("mousemove.draggable", {
                target: this
            }, function (e) {
                if ($.fn.draggable.isDragging) {
                    return;
                }
                var opts = $.data(e.data.target, "draggable").options;
                if (checkArea(e)) {
                    $(this).css("cursor", opts.cursor);
                } else {
                    $(this).css("cursor", "");
                }
            }).bind("mouseleave.draggable", {
                target: this
            }, function (e) {
                $(this).css("cursor", "");
            }).bind("mousedown.draggable", {
                target: this
            }, function (e) {
                if (checkArea(e) == false) {
                    return;
                }
                $(this).css("cursor", "");
                var position = $(e.data.target).position();
                var offset = $(e.data.target).offset();
                var data = {
                    startPosition: $(e.data.target).css("position"),
                    startLeft: position.left,
                    startTop: position.top,
                    left: position.left,
                    top: position.top,
                    startX: e.pageX,
                    startY: e.pageY,
                    width: $(e.data.target).outerWidth(),
                    height: $(e.data.target).outerHeight(),
                    offsetWidth: (e.pageX - offset.left),
                    offsetHeight: (e.pageY - offset.top),
                    target: e.data.target,
                    parent: $(e.data.target).parent()[0]
                };
                $.extend(e.data, data);
                var opts = $.data(e.data.target, "draggable").options;
                if (opts.onBeforeDrag.call(e.data.target, e) == false) {
                    return;
                }
                $(document).bind("mousedown.draggable", e.data, doDown);
                $(document).bind("mousemove.draggable", e.data, doMove);
                $(document).bind("mouseup.draggable", e.data, doUp);
                $.fn.draggable.timer = setTimeout(function () {
                    $.fn.draggable.isDragging = true;
                    doDown(e);
                }, opts.delay);
                return false;
            });

            function checkArea(e) {
                var state = $.data(e.data.target, "draggable");
                var handle = state.handle;
                var offset = $(handle).offset();
                var width = $(handle).outerWidth();
                var height = $(handle).outerHeight();
                var t = e.pageY - offset.top;
                var r = offset.left + width - e.pageX;
                var b = offset.top + height - e.pageY;
                var l = e.pageX - offset.left;
                return Math.min(t, r, b, l) > state.options.edge;
            };
        });
    };
    $.fn.draggable.methods = {
        options: function (jq) {
            return $.data(jq[0], "draggable").options;
        },
        proxy: function (jq) {
            return $.data(jq[0], "draggable").proxy;
        },
        enable: function (jq) {
            return jq.each(function () {
                $(this).draggable({
                    disabled: false
                });
            });
        },
        disable: function (jq) {
            return jq.each(function () {
                $(this).draggable({
                    disabled: true
                });
            });
        }
    };
    $.fn.draggable.parseOptions = function (target) {
        var t = $(target);
        return $.extend({}, $.parser.parseOptions(target, ["cursor", "handle", "axis", {
            "revert": "boolean",
            "deltaX": "number",
            "deltaY": "number",
            "edge": "number",
            "delay": "number"
        }]), {
            disabled: (t.attr("disabled") ? true : undefined)
        });
    };
    $.fn.draggable.defaults = {
        proxy: null,
        revert: false,
        cursor: "move",
        deltaX: null,
        deltaY: null,
        handle: null,
        disabled: false,
        edge: 0,
        axis: null,
        delay: 100,
        onBeforeDrag: function (e) {},
        onStartDrag: function (e) {},
        onDrag: function (e) {},
        onEndDrag: function (e) {},
        onStopDrag: function (e) {}
    };
    $.fn.draggable.isDragging = false;
})(jQuery);