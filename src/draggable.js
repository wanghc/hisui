(function ($) {   //cryze from 1.5
    function _39(e) {
        var _3a = $.data(e.data.target, "draggable");
        var _3b = _3a.options;
        var _3c = _3a.proxy;
        var _3d = e.data;
        var _3e = _3d.startLeft + e.pageX - _3d.startX;
        var top = _3d.startTop + e.pageY - _3d.startY;
        if (_3c) {
            if (_3c.parent()[0] == document.body) {
                if (_3b.deltaX != null && _3b.deltaX != undefined) {
                    _3e = e.pageX + _3b.deltaX;
                } else {
                    _3e = e.pageX - e.data.offsetWidth;
                }
                if (_3b.deltaY != null && _3b.deltaY != undefined) {
                    top = e.pageY + _3b.deltaY;
                } else {
                    top = e.pageY - e.data.offsetHeight;
                }
            } else {
                if (_3b.deltaX != null && _3b.deltaX != undefined) {
                    _3e += e.data.offsetWidth + _3b.deltaX;
                }
                if (_3b.deltaY != null && _3b.deltaY != undefined) {
                    top += e.data.offsetHeight + _3b.deltaY;
                }
            }
        }
        if (e.data.parent != document.body) {
            _3e += $(e.data.parent).scrollLeft();
            top += $(e.data.parent).scrollTop();
        }
        if (_3b.axis == "h") {
            _3d.left = _3e;
        } else {
            if (_3b.axis == "v") {
                _3d.top = top;
            } else {
                _3d.left = _3e;
                _3d.top = top;
            }
        }
    };

    function _3f(e) {
        var _40 = $.data(e.data.target, "draggable");
        var _41 = _40.options;
        var _42 = _40.proxy;
        if (!_42) {
            _42 = $(e.data.target);
        }
        _42.css({
            left: e.data.left,
            top: e.data.top
        });
        $("body").css("cursor", _41.cursor);
    };

    function _43(e) {
        if (!$.fn.draggable.isDragging) {
            return false;
        }
        var _44 = $.data(e.data.target, "draggable");
        var _45 = _44.options;
        var _46 = $(".droppable:visible").filter(function () {
            return e.data.target != this;
        }).filter(function () {
            var _47 = $.data(this, "droppable").options.accept;
            if (_47) {
                return $(_47).filter(function () {
                    return this == e.data.target;
                }).length > 0;
            } else {
                return true;
            }
        });
        _44.droppables = _46;
        var _48 = _44.proxy;
        if (!_48) {
            if (_45.proxy) {
                if (_45.proxy == "clone") {
                    _48 = $(e.data.target).clone().insertAfter(e.data.target);
                } else {
                    _48 = _45.proxy.call(e.data.target, e.data.target);
                }
                _44.proxy = _48;
            } else {
                _48 = $(e.data.target);
            }
        }
        _48.css("position", "absolute");
        _39(e);
        _3f(e);
        _45.onStartDrag.call(e.data.target, e);
        return false;
    };

    function _49(e) {
        if (!$.fn.draggable.isDragging) {
            return false;
        }
        var _4a = $.data(e.data.target, "draggable");
        _39(e);
        if (_4a.options.onDrag.call(e.data.target, e) != false) {
            _3f(e);
        }
        var _4b = e.data.target;
        _4a.droppables.each(function () {
            var _4c = $(this);
            if (_4c.droppable("options").disabled) {
                return;
            }
            var p2 = _4c.offset();
            if (e.pageX > p2.left && e.pageX < p2.left + _4c.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + _4c.outerHeight()) {
                if (!this.entered) {
                    $(this).trigger("_dragenter", [_4b]);
                    this.entered = true;
                }
                $(this).trigger("_dragover", [_4b]);
            } else {
                if (this.entered) {
                    $(this).trigger("_dragleave", [_4b]);
                    this.entered = false;
                }
            }
        });
        return false;
    };

    function _4d(e) {
        if (!$.fn.draggable.isDragging) {
            _4e();
            return false;
        }
        _49(e);
        var _4f = $.data(e.data.target, "draggable");
        var _50 = _4f.proxy;
        var _51 = _4f.options;
        _51.onEndDrag.call(e.data.target, e);
        if (_51.revert) {
            if (_52() == true) {
                $(e.data.target).css({
                    position: e.data.startPosition,
                    left: e.data.startLeft,
                    top: e.data.startTop
                });
            } else {
                if (_50) {
                    var _53, top;
                    if (_50.parent()[0] == document.body) {
                        _53 = e.data.startX - e.data.offsetWidth;
                        top = e.data.startY - e.data.offsetHeight;
                    } else {
                        _53 = e.data.startLeft;
                        top = e.data.startTop;
                    }
                    _50.animate({
                        left: _53,
                        top: top
                    }, function () {
                        _54();
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
            _52();
        }
        _51.onStopDrag.call(e.data.target, e);
        _4e();

        function _54() {
            if (_50) {
                _50.remove();
            }
            _4f.proxy = null;
        };

        function _52() {
            var _55 = false;
            _4f.droppables.each(function () {
                var _56 = $(this);
                if (_56.droppable("options").disabled) {
                    return;
                }
                var p2 = _56.offset();
                if (e.pageX > p2.left && e.pageX < p2.left + _56.outerWidth() && e.pageY > p2.top && e.pageY < p2.top + _56.outerHeight()) {
                    if (_51.revert) {
                        $(e.data.target).css({
                            position: e.data.startPosition,
                            left: e.data.startLeft,
                            top: e.data.startTop
                        });
                    }
                    $(this).triggerHandler("_drop", [e.data.target]);
                    _54();
                    _55 = true;
                    this.entered = false;
                    return false;
                }
            });
            if (!_55 && !_51.revert) {
                _54();
            }
            return _55;
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
    $.fn.draggable = function (_57, _58) {
        if (typeof _57 == "string") {
            return $.fn.draggable.methods[_57](this, _58);
        }
        return this.each(function () {
            var _59;
            var _5a = $.data(this, "draggable");
            if (_5a) {
                _5a.handle.unbind(".draggable");
                _59 = $.extend(_5a.options, _57);
            } else {
                _59 = $.extend({}, $.fn.draggable.defaults, $.fn.draggable.parseOptions(this), _57 || {});
            }
            var _5b = _59.handle ? (typeof _59.handle == "string" ? $(_59.handle, this) : _59.handle) : $(this);
            $.data(this, "draggable", {
                options: _59,
                handle: _5b
            });
            if (_59.disabled) {
                $(this).css("cursor", "");
                return;
            }
            _5b.unbind(".draggable").bind("mousemove.draggable", {
                target: this
            }, function (e) {
                if ($.fn.draggable.isDragging) {
                    return;
                }
                var _5c = $.data(e.data.target, "draggable").options;
                if (_5d(e)) {
                    $(this).css("cursor", _5c.cursor);
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
                if (_5d(e) == false) {
                    return;
                }
                $(this).css("cursor", "");
                var _5e = $(e.data.target).position();
                var _5f = $(e.data.target).offset();
                var _60 = {
                    startPosition: $(e.data.target).css("position"),
                    startLeft: _5e.left,
                    startTop: _5e.top,
                    left: _5e.left,
                    top: _5e.top,
                    startX: e.pageX,
                    startY: e.pageY,
                    width: $(e.data.target).outerWidth(),
                    height: $(e.data.target).outerHeight(),
                    offsetWidth: (e.pageX - _5f.left),
                    offsetHeight: (e.pageY - _5f.top),
                    target: e.data.target,
                    parent: $(e.data.target).parent()[0]
                };
                $.extend(e.data, _60);
                var _61 = $.data(e.data.target, "draggable").options;
                if (_61.onBeforeDrag.call(e.data.target, e) == false) {
                    return;
                }
                $(document).bind("mousedown.draggable", e.data, _43);
                $(document).bind("mousemove.draggable", e.data, _49);
                $(document).bind("mouseup.draggable", e.data, _4d);
                $.fn.draggable.timer = setTimeout(function () {
                    $.fn.draggable.isDragging = true;
                    _43(e);
                }, _61.delay);
                return false;
            });

            function _5d(e) {
                var _62 = $.data(e.data.target, "draggable");
                var _63 = _62.handle;
                var _64 = $(_63).offset();
                var _65 = $(_63).outerWidth();
                var _66 = $(_63).outerHeight();
                var t = e.pageY - _64.top;
                var r = _64.left + _65 - e.pageX;
                var b = _64.top + _66 - e.pageY;
                var l = e.pageX - _64.left;
                return Math.min(t, r, b, l) > _62.options.edge;
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
    $.fn.draggable.parseOptions = function (_67) {
        var t = $(_67);
        return $.extend({}, $.parser.parseOptions(_67, ["cursor", "handle", "axis", {
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