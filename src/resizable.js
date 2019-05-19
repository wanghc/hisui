(function ($) {
    $.fn.resizable = function (_57, _58) {
        if (typeof _57 == "string") {
            return $.fn.resizable.methods[_57](this, _58);
        }
        function _59(e) {
            var _5a = e.data;
            var _5b = $.data(_5a.target, "resizable").options;
            if (_5a.dir.indexOf("e") != -1) {
                var _5c = _5a.startWidth + e.pageX - _5a.startX;
                _5c = Math.min(Math.max(_5c, _5b.minWidth), _5b.maxWidth);
                _5a.width = _5c;
            }
            if (_5a.dir.indexOf("s") != -1) {
                var _5d = _5a.startHeight + e.pageY - _5a.startY;
                _5d = Math.min(Math.max(_5d, _5b.minHeight), _5b.maxHeight);
                _5a.height = _5d;
            }
            if (_5a.dir.indexOf("w") != -1) {
                var _5c = _5a.startWidth - e.pageX + _5a.startX;
                _5c = Math.min(Math.max(_5c, _5b.minWidth), _5b.maxWidth);
                _5a.width = _5c;
                _5a.left = _5a.startLeft + _5a.startWidth - _5a.width;
            }
            if (_5a.dir.indexOf("n") != -1) {
                var _5d = _5a.startHeight - e.pageY + _5a.startY;
                _5d = Math.min(Math.max(_5d, _5b.minHeight), _5b.maxHeight);
                _5a.height = _5d;
                _5a.top = _5a.startTop + _5a.startHeight - _5a.height;
            }
        };
        function _5e(e) {
            var _5f = e.data;
            var t = $(_5f.target);
            t.css({ left: _5f.left, top: _5f.top });
            if (t.outerWidth() != _5f.width) {
                t._outerWidth(_5f.width);
            }
            if (t.outerHeight() != _5f.height) {
                t._outerHeight(_5f.height);
            }
        };
        function _60(e) {
            $.fn.resizable.isResizing = true;
            $.data(e.data.target, "resizable").options.onStartResize.call(e.data.target, e);
            return false;
        };
        function _61(e) {
            _59(e);
            if ($.data(e.data.target, "resizable").options.onResize.call(e.data.target, e) != false) {
                _5e(e);
            }
            return false;
        };
        function _62(e) {
            $.fn.resizable.isResizing = false;
            _59(e, true);
            _5e(e);
            $.data(e.data.target, "resizable").options.onStopResize.call(e.data.target, e);
            $(document).unbind(".resizable");
            $("body").css("cursor", "");
            return false;
        };
        return this.each(function () {
            var _63 = null;
            var _64 = $.data(this, "resizable");
            if (_64) {
                $(this).unbind(".resizable");
                _63 = $.extend(_64.options, _57 || {});
            } else {
                _63 = $.extend({}, $.fn.resizable.defaults, $.fn.resizable.parseOptions(this), _57 || {});
                $.data(this, "resizable", { options: _63 });
            }
            if (_63.disabled == true) {
                return;
            }
            $(this).bind("mousemove.resizable", { target: this }, function (e) {
                if ($.fn.resizable.isResizing) {
                    return;
                }
                var dir = _65(e);
                if (dir == "") {
                    $(e.data.target).css("cursor", "");
                } else {
                    $(e.data.target).css("cursor", dir + "-resize");
                }
            }).bind("mouseleave.resizable", { target: this }, function (e) {
                $(e.data.target).css("cursor", "");
            }).bind("mousedown.resizable", { target: this }, function (e) {
                var dir = _65(e);
                if (dir == "") {
                    return;
                }
                function _66(css) {
                    var val = parseInt($(e.data.target).css(css));
                    if (isNaN(val)) {
                        return 0;
                    } else {
                        return val;
                    }
                };
                var _67 = { target: e.data.target, dir: dir, startLeft: _66("left"), startTop: _66("top"), left: _66("left"), top: _66("top"), startX: e.pageX, startY: e.pageY, startWidth: $(e.data.target).outerWidth(), startHeight: $(e.data.target).outerHeight(), width: $(e.data.target).outerWidth(), height: $(e.data.target).outerHeight(), deltaWidth: $(e.data.target).outerWidth() - $(e.data.target).width(), deltaHeight: $(e.data.target).outerHeight() - $(e.data.target).height() };
                $(document).bind("mousedown.resizable", _67, _60);
                $(document).bind("mousemove.resizable", _67, _61);
                $(document).bind("mouseup.resizable", _67, _62);
                $("body").css("cursor", dir + "-resize");
            });
            function _65(e) {
                var tt = $(e.data.target);
                var dir = "";
                var _68 = tt.offset();
                var _69 = tt.outerWidth();
                var _6a = tt.outerHeight();
                var _6b = _63.edge;
                if (e.pageY > _68.top && e.pageY < _68.top + _6b) {
                    dir += "n";
                } else {
                    if (e.pageY < _68.top + _6a && e.pageY > _68.top + _6a - _6b) {
                        dir += "s";
                    }
                }
                if (e.pageX > _68.left && e.pageX < _68.left + _6b) {
                    dir += "w";
                } else {
                    if (e.pageX < _68.left + _69 && e.pageX > _68.left + _69 - _6b) {
                        dir += "e";
                    }
                }
                var _6c = _63.handles.split(",");
                for (var i = 0; i < _6c.length; i++) {
                    var _6d = _6c[i].replace(/(^\s*)|(\s*$)/g, "");
                    if (_6d == "all" || _6d == dir) {
                        return dir;
                    }
                }
                return "";
            };
        });
    };
    $.fn.resizable.methods = {
        options: function (jq) {
            return $.data(jq[0], "resizable").options;
        }, enable: function (jq) {
            return jq.each(function () {
                $(this).resizable({ disabled: false });
            });
        }, disable: function (jq) {
            return jq.each(function () {
                $(this).resizable({ disabled: true });
            });
        }
    };
    $.fn.resizable.parseOptions = function (_6e) {
        var t = $(_6e);
        return $.extend({}, $.parser.parseOptions(_6e, ["handles", { minWidth: "number", minHeight: "number", maxWidth: "number", maxHeight: "number", edge: "number" }]), { disabled: (t.attr("disabled") ? true : undefined) });
    };
    $.fn.resizable.defaults = {
        disabled: false, handles: "n, e, s, w, ne, se, sw, nw, all", minWidth: 10, minHeight: 10, maxWidth: 10000, maxHeight: 10000, edge: 5, onStartResize: function (e) {
        }, onResize: function (e) {
        }, onStopResize: function (e) {
        }
    };
    $.fn.resizable.isResizing = false;
})(jQuery);