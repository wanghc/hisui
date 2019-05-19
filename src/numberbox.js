(function ($) {
    function init(_472) {
        $(_472).addClass("numberbox numberbox-f");
        var v = $("<input type=\"hidden\">").insertAfter(_472);
        var name = $(_472).attr("name");
        if (name) {
            v.attr("name", name);
            $(_472).removeAttr("name").attr("numberboxName", name);
        }
        return v;
    };
    function _473(_474) {
        var opts = $.data(_474, "numberbox").options;
        var fn = opts.onChange;
        opts.onChange = function () {
        };
        _475(_474, opts.parser.call(_474, opts.value));
        opts.onChange = fn;
        opts.originalValue = _476(_474);
    };
    function _477(_478, _479) {
        var opts = $.data(_478, "numberbox").options;
        if (_479) {
            opts.width = _479;
        }
        var t = $(_478);
        var _47a = $("<div style=\"display:none\"></div>").insertBefore(t);
        t.appendTo("body");
        if (isNaN(opts.width)) {
            opts.width = t.outerWidth();
        }
        t._outerWidth(opts.width)._outerHeight(opts.height);
        t.css("line-height", t.height() + "px");
        t.insertAfter(_47a);
        _47a.remove();
    };
    function _476(_47b) {
        return $.data(_47b, "numberbox").field.val();
    };
    function _475(_47c, _47d) {
        var _47e = $.data(_47c, "numberbox");
        var opts = _47e.options;
        var _47f = _476(_47c);
        _47d = opts.parser.call(_47c, _47d);
        opts.value = _47d;
        _47e.field.val(_47d);
        $(_47c).val(opts.formatter.call(_47c, _47d));
        if (_47f != _47d) {
            opts.onChange.call(_47c, _47d, _47f);
        }
    };
    function _480(_481) {
        var opts = $.data(_481, "numberbox").options;
        $(_481).unbind(".numberbox").bind("keypress.numberbox", function (e) {
            return opts.filter.call(_481, e);
        }).bind("blur.numberbox", function () {
            _475(_481, $(this).val());
            $(this).val(opts.formatter.call(_481, _476(_481)));
        }).bind("focus.numberbox", function () {
            var vv = _476(_481);
            if (vv != opts.parser.call(_481, $(this).val())) {
                $(this).val(opts.formatter.call(_481, vv));
            }
        })
        if (opts.isKeyupChange){
            $(_481).bind("keyup.numberbox",function(e){ 
                // neer 2019-04-18 add keydown.numberbox事件 
                // $(dom).on("keydown",function(){
                //   $(this).numberbox("getValue");  //拿到的是上一次的值
                // })
                //console.log("src="+$(this).val());
                _475(_481, $(this).val());
                $(this).val(opts.formatter.call(_481, _476(_481)));
            });
        }
    };
    function _482(_483) {
        if ($.fn.validatebox) {
            var opts = $.data(_483, "numberbox").options;
            $(_483).validatebox(opts);
        }
    };
    function _484(_485, _486) {
        var opts = $.data(_485, "numberbox").options;
        if (_486) {
            opts.disabled = true;
            $(_485).attr("disabled", true);
        } else {
            opts.disabled = false;
            $(_485).removeAttr("disabled");
        }
    };
    $.fn.numberbox = function (_487, _488) {
        if (typeof _487 == "string") {
            var _489 = $.fn.numberbox.methods[_487];
            if (_489) {
                return _489(this, _488);
            } else {
                return this.validatebox(_487, _488);
            }
        }
        _487 = _487 || {};
        return this.each(function () {
            var _48a = $.data(this, "numberbox");
            if (_48a) {
                $.extend(_48a.options, _487);
            } else {
                _48a = $.data(this, "numberbox", { options: $.extend({}, $.fn.numberbox.defaults, $.fn.numberbox.parseOptions(this), _487), field: init(this) });
                $(this).removeAttr("disabled");
                $(this).css({ imeMode: "disabled" });
            }
            _484(this, _48a.options.disabled);
            _477(this);
            _480(this);
            _482(this);
            _473(this);
        });
    };
    $.fn.numberbox.methods = {
        options: function (jq) {
            return $.data(jq[0], "numberbox").options;
        }, destroy: function (jq) {
            return jq.each(function () {
                $.data(this, "numberbox").field.remove();
                $(this).validatebox("destroy");
                $(this).remove();
            });
        }, resize: function (jq, _48b) {
            return jq.each(function () {
                _477(this, _48b);
            });
        }, disable: function (jq) {
            return jq.each(function () {
                _484(this, true);
            });
        }, enable: function (jq) {
            return jq.each(function () {
                _484(this, false);
            });
        }, fix: function (jq) {
            return jq.each(function () {
                _475(this, $(this).val());
            });
        }, setValue: function (jq, _48c) {
            return jq.each(function () {
                _475(this, _48c);
            });
        }, getValue: function (jq) {
            return _476(jq[0]);
        }, clear: function (jq) {
            return jq.each(function () {
                var _48d = $.data(this, "numberbox");
                _48d.field.val("");
                $(this).val("");
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).numberbox("options");
                $(this).numberbox("setValue", opts.originalValue);
            });
        }
    };
    $.fn.numberbox.parseOptions = function (_48e) {
        var t = $(_48e);
        return $.extend({}, $.fn.validatebox.parseOptions(_48e), $.parser.parseOptions(_48e, ["width", "height", "decimalSeparator", "groupSeparator", "suffix", { min: "number", max: "number", precision: "number" }]), { prefix: (t.attr("prefix") ? t.attr("prefix") : undefined), disabled: (t.attr("disabled") ? true : undefined), value: (t.val() || undefined) });
    };
    $.fn.numberbox.defaults = $.extend({}, $.fn.validatebox.defaults, {
        isKeyupChange:false, /*是否在按键时就同步组件的值。默认是blur时同步值 */
        /**wanghc height:22修改成30*/
        width: "auto", height: 30, disabled: false, value: "", min: null, max: null, precision: 0, decimalSeparator: ".", groupSeparator: "", prefix: "", suffix: "", filter: function (e) {
            var opts = $(this).numberbox("options");
            if (e.which == 45) {
                return ($(this).val().indexOf("-") == -1 ? true : false);
            }
            var c = String.fromCharCode(e.which);
            if (c == opts.decimalSeparator) {
                return ($(this).val().indexOf(c) == -1 ? true : false);
            } else {
                if (c == opts.groupSeparator) {
                    return true;
                } else {
                    if ((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false) || e.which == 0 || e.which == 8) {
                        return true;
                    } else {
                        if (e.ctrlKey == true && (e.which == 99 || e.which == 118)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        }, formatter: function (_48f) {
            if (!_48f) {
                return _48f;
            }
            _48f = _48f + "";
            var opts = $(this).numberbox("options");
            var s1 = _48f, s2 = "";
            var dpos = _48f.indexOf(".");
            if (dpos >= 0) {
                s1 = _48f.substring(0, dpos);
                s2 = _48f.substring(dpos + 1, _48f.length);
            }
            if (opts.groupSeparator) {
                var p = /(\d+)(\d{3})/;
                while (p.test(s1)) {
                    s1 = s1.replace(p, "$1" + opts.groupSeparator + "$2");
                }
            }
            if (s2) {
                return opts.prefix + s1 + opts.decimalSeparator + s2 + opts.suffix;
            } else {
                return opts.prefix + s1 + opts.suffix;
            }
        }, parser: function (s) {
            s = s + "";
            var opts = $(this).numberbox("options");
            if (parseFloat(s) != s) {
                if (opts.prefix) {
                    s = $.trim(s.replace(new RegExp("\\" + $.trim(opts.prefix), "g"), ""));
                }
                if (opts.suffix) {
                    s = $.trim(s.replace(new RegExp("\\" + $.trim(opts.suffix), "g"), ""));
                }
                if (opts.groupSeparator) {
                    s = $.trim(s.replace(new RegExp("\\" + opts.groupSeparator, "g"), ""));
                }
                if (opts.decimalSeparator) {
                    s = $.trim(s.replace(new RegExp("\\" + opts.decimalSeparator, "g"), "."));
                }
                s = s.replace(/\s/g, "");
            }
            var val = parseFloat(s).toFixed(opts.precision);
            if (isNaN(val)) {
                val = "";
            } else {
                if (typeof (opts.min) == "number" && val < opts.min) {
                    val = opts.min.toFixed(opts.precision);
                } else {
                    if (typeof (opts.max) == "number" && val > opts.max) {
                        val = opts.max.toFixed(opts.precision);
                    }
                }
            }
            return val;
        }, onChange: function (_490, _491) {
        }
    });
})(jQuery);