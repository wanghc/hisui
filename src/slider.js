(function ($) {
    function init(_96e) {
        var _96f = $("<div class=\"slider\">" + "<div class=\"slider-inner\">" + "<a href=\"javascript:void(0)\" class=\"slider-handle\"></a>" + "<span class=\"slider-tip\"></span>" + "</div>" + "<div class=\"slider-rule\"></div>" + "<div class=\"slider-rulelabel\"></div>" + "<div style=\"clear:both\"></div>" + "<input type=\"hidden\" class=\"slider-value\">" + "</div>").insertAfter(_96e);
        var t = $(_96e);
        t.addClass("slider-f").hide();
        var name = t.attr("name");
        if (name) {
            _96f.find("input.slider-value").attr("name", name);
            t.removeAttr("name").attr("sliderName", name);
        }
        return _96f;
    };
    function _970(_971, _972) {
        var _973 = $.data(_971, "slider");
        var opts = _973.options;
        var _974 = _973.slider;
        if (_972) {
            if (_972.width) {
                opts.width = _972.width;
            }
            if (_972.height) {
                opts.height = _972.height;
            }
        }
        if (opts.mode == "h") {
            _974.css("height", "");
            _974.children("div").css("height", "");
            if (!isNaN(opts.width)) {
                _974.width(opts.width);
            }
        } else {
            _974.css("width", "");
            _974.children("div").css("width", "");
            if (!isNaN(opts.height)) {
                _974.height(opts.height);
                _974.find("div.slider-rule").height(opts.height);
                _974.find("div.slider-rulelabel").height(opts.height);
                _974.find("div.slider-inner")._outerHeight(opts.height);
            }
        }
        _975(_971);
    };
    function _976(_977) {
        var _978 = $.data(_977, "slider");
        var opts = _978.options;
        var _979 = _978.slider;
        var aa = opts.mode == "h" ? opts.rule : opts.rule.slice(0).reverse();
        if (opts.reversed) {
            aa = aa.slice(0).reverse();
        }
        _97a(aa);
        function _97a(aa) {
            var rule = _979.find("div.slider-rule");
            var _97b = _979.find("div.slider-rulelabel");
            rule.empty();
            _97b.empty();
            for (var i = 0; i < aa.length; i++) {
                var _97c = i * 100 / (aa.length - 1) + "%";
                var span = $("<span></span>").appendTo(rule);
                span.css((opts.mode == "h" ? "left" : "top"), _97c);
                if (aa[i] != "|") {
                    span = $("<span></span>").appendTo(_97b);
                    span.html(aa[i]);
                    if (opts.mode == "h") {
                        span.css({ left: _97c, marginLeft: -Math.round(span.outerWidth() / 2) });
                    } else {
                        span.css({ top: _97c, marginTop: -Math.round(span.outerHeight() / 2) });
                    }
                }
            }
        };
    };
    function _97d(_97e) {
        var _97f = $.data(_97e, "slider");
        var opts = _97f.options;
        var _980 = _97f.slider;
        _980.removeClass("slider-h slider-v slider-disabled");
        _980.addClass(opts.mode == "h" ? "slider-h" : "slider-v");
        _980.addClass(opts.disabled ? "slider-disabled" : "");
        _980.find("a.slider-handle").draggable({
            axis: opts.mode, cursor: "pointer", disabled: opts.disabled, onDrag: function (e) {
                var left = e.data.left;
                var _981 = _980.width();
                if (opts.mode != "h") {
                    left = e.data.top;
                    _981 = _980.height();
                }
                if (left < 0 || left > _981) {
                    return false;
                } else {
                    var _982 = _994(_97e, left);
                    _983(_982);
                    return false;
                }
            }, onBeforeDrag: function () {
                _97f.isDragging = true;
            }, onStartDrag: function () {
                opts.onSlideStart.call(_97e, opts.value);
            }, onStopDrag: function (e) {
                var _984 = _994(_97e, (opts.mode == "h" ? e.data.left : e.data.top));
                _983(_984);
                opts.onSlideEnd.call(_97e, opts.value);
                opts.onComplete.call(_97e, opts.value);
                _97f.isDragging = false;
            }
        });
        _980.find("div.slider-inner").unbind(".slider").bind("mousedown.slider", function (e) {
            if (_97f.isDragging) {
                return;
            }
            var pos = $(this).offset();
            var _985 = _994(_97e, (opts.mode == "h" ? (e.pageX - pos.left) : (e.pageY - pos.top)));
            _983(_985);
            opts.onComplete.call(_97e, opts.value);
        });
        function _983(_986) {
            var s = Math.abs(_986 % opts.step);
            if (s < opts.step / 2) {
                _986 -= s;
            } else {
                _986 = _986 - s + opts.step;
            }
            _987(_97e, _986);
        };
    };
    function _987(_988, _989) {
        var _98a = $.data(_988, "slider");
        var opts = _98a.options;
        var _98b = _98a.slider;
        var _98c = opts.value;
        if (_989 < opts.min) {
            _989 = opts.min;
        }
        if (_989 > opts.max) {
            _989 = opts.max;
        }
        opts.value = _989;
        $(_988).val(_989);
        _98b.find("input.slider-value").val(_989);
        var pos = _98d(_988, _989);
        var tip = _98b.find(".slider-tip");
        if (opts.showTip) {
            tip.show();
            tip.html(opts.tipFormatter.call(_988, opts.value));
        } else {
            tip.hide();
        }
        if (opts.mode == "h") {
            var _98e = "left:" + pos + "px;";
            _98b.find(".slider-handle").attr("style", _98e);
            tip.attr("style", _98e + "margin-left:" + (-Math.round(tip.outerWidth() / 2)) + "px");
        } else {
            var _98e = "top:" + pos + "px;";
            _98b.find(".slider-handle").attr("style", _98e);
            tip.attr("style", _98e + "margin-left:" + (-Math.round(tip.outerWidth())) + "px");
        }
        if (_98c != _989) {
            opts.onChange.call(_988, _989, _98c);
        }
    };
    function _975(_98f) {
        var opts = $.data(_98f, "slider").options;
        var fn = opts.onChange;
        opts.onChange = function () {
        };
        _987(_98f, opts.value);
        opts.onChange = fn;
    };
    function _98d(_990, _991) {
        var _992 = $.data(_990, "slider");
        var opts = _992.options;
        var _993 = _992.slider;
        var size = opts.mode == "h" ? _993.width() : _993.height();
        var pos = opts.converter.toPosition.call(_990, _991, size);
        if (opts.mode == "v") {
            pos = _993.height() - pos;
        }
        if (opts.reversed) {
            pos = size - pos;
        }
        return pos.toFixed(0);
    };
    function _994(_995, pos) {
        var _996 = $.data(_995, "slider");
        var opts = _996.options;
        var _997 = _996.slider;
        var size = opts.mode == "h" ? _997.width() : _997.height();
        var _998 = opts.converter.toValue.call(_995, opts.mode == "h" ? (opts.reversed ? (size - pos) : pos) : (size - pos), size);
        return _998.toFixed(0);
    };
    $.fn.slider = function (_999, _99a) {
        if (typeof _999 == "string") {
            return $.fn.slider.methods[_999](this, _99a);
        }
        _999 = _999 || {};
        return this.each(function () {
            var _99b = $.data(this, "slider");
            if (_99b) {
                $.extend(_99b.options, _999);
            } else {
                _99b = $.data(this, "slider", { options: $.extend({}, $.fn.slider.defaults, $.fn.slider.parseOptions(this), _999), slider: init(this) });
                $(this).removeAttr("disabled");
            }
            var opts = _99b.options;
            opts.min = parseFloat(opts.min);
            opts.max = parseFloat(opts.max);
            opts.value = parseFloat(opts.value);
            opts.step = parseFloat(opts.step);
            opts.originalValue = opts.value;
            _97d(this);
            _976(this);
            _970(this);
        });
    };
    $.fn.slider.methods = {
        options: function (jq) {
            return $.data(jq[0], "slider").options;
        }, destroy: function (jq) {
            return jq.each(function () {
                $.data(this, "slider").slider.remove();
                $(this).remove();
            });
        }, resize: function (jq, _99c) {
            return jq.each(function () {
                _970(this, _99c);
            });
        }, getValue: function (jq) {
            return jq.slider("options").value;
        }, setValue: function (jq, _99d) {
            return jq.each(function () {
                _987(this, _99d);
            });
        }, clear: function (jq) {
            return jq.each(function () {
                var opts = $(this).slider("options");
                _987(this, opts.min);
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).slider("options");
                _987(this, opts.originalValue);
            });
        }, enable: function (jq) {
            return jq.each(function () {
                $.data(this, "slider").options.disabled = false;
                _97d(this);
            });
        }, disable: function (jq) {
            return jq.each(function () {
                $.data(this, "slider").options.disabled = true;
                _97d(this);
            });
        }
    };
    $.fn.slider.parseOptions = function (_99e) {
        var t = $(_99e);
        return $.extend({}, $.parser.parseOptions(_99e, ["width", "height", "mode", { reversed: "boolean", showTip: "boolean", min: "number", max: "number", step: "number" }]), { value: (t.val() || undefined), disabled: (t.attr("disabled") ? true : undefined), rule: (t.attr("rule") ? eval(t.attr("rule")) : undefined) });
    };
    $.fn.slider.defaults = {
        width: "auto", height: "auto", mode: "h", reversed: false, showTip: false, disabled: false, value: 0, min: 0, max: 100, step: 1, rule: [], tipFormatter: function (_99f) {
            return _99f;
        }, converter: {
            toPosition: function (_9a0, size) {
                var opts = $(this).slider("options");
                return (_9a0 - opts.min) / (opts.max - opts.min) * size;
            }, toValue: function (pos, size) {
                var opts = $(this).slider("options");
                return opts.min + (opts.max - opts.min) * (pos / size);
            }
        }, onChange: function (_9a1, _9a2) {
        }, onSlideStart: function (_9a3) {
        }, onSlideEnd: function (_9a4) {
        }, onComplete: function (_9a5) {
        }
    };
})(jQuery);