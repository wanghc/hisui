(function ($) {
    function init(_41e) {
        $(_41e).addClass("validatebox-text");
    };
    function _41f(_420) {
        var _421 = $.data(_420, "validatebox");
        _421.validating = false;
        if (_421.timer) {
            clearTimeout(_421.timer);
        }
        $(_420).tooltip("destroy");
        $(_420).unbind();
        $(_420).remove();
    };
    function _422(_423) {
        var box = $(_423);
        var _424 = $.data(_423, "validatebox");
        box.unbind(".validatebox");
        if (_424.options.novalidate) {
            return;
        }
        box.bind("focus.validatebox", function () {
            _424.validating = true;
            _424.value = undefined;
            (function () {
                if (_424.validating) {
                    if (_424.value != box.val()) {
                        _424.value = box.val();
                        if (_424.timer) {
                            clearTimeout(_424.timer);
                        }
                        _424.timer = setTimeout(function () {
                            $(_423).validatebox("validate");
                        }, _424.options.delay);
                    } else {
                        _429(_423);
                    }
                    setTimeout(arguments.callee, 200);
                }
            })();
        }).bind("blur.validatebox", function () {
            if (_424.timer) {
                clearTimeout(_424.timer);
                _424.timer = undefined;
            }
            _424.validating = false;
            _425(_423);
        }).bind("mouseenter.validatebox", function () {
            if (box.hasClass("validatebox-invalid")) {
                _426(_423);
            }
            ////有prompt也tooltip出来 wanghc 2018-2-28
            var vbox = $.data(_423,"validatebox");
            if (vbox.options){
                if (vbox.options.prompt && vbox.options.prompt!=""){
                    vbox.message = vbox.options.prompt;
                    _426(_423);
                }
            }
        }).bind("mouseleave.validatebox", function () {
            if (!_424.validating) {
                _425(_423);
            }
        });
    };
    function _426(_427) {
        var _428 = $.data(_427, "validatebox");
        var opts = _428.options;
        $(_427).tooltip($.extend({}, opts.tipOptions, { content: _428.message, position: opts.tipPosition, deltaX: opts.deltaX })).tooltip("show");
        _428.tip = true;
    };
    function _429(_42a) {
        var _42b = $.data(_42a, "validatebox");
        if (_42b && _42b.tip) {
            $(_42a).tooltip("reposition");
        }
    };
    function _425(_42c) {
        var _42d = $.data(_42c, "validatebox");
        _42d.tip = false;
        $(_42c).tooltip("hide");
    };
    function _42e(_42f) {
        var _430 = $.data(_42f, "validatebox");
        var opts = _430.options;
        var box = $(_42f);
        var _431 = box.val();

        function _432(msg) {
            _430.message = msg;
        };
        function _433(_434, _435) {
            var _436 = /([a-zA-Z_]+)(.*)/.exec(_434);
            var rule = opts.rules[_436[1]];
            if (rule && _431) {
                var _437 = _435 || opts.validParams || eval(_436[2]);
                if (!rule["validator"].call(_42f, _431, _437)) {
                    box.addClass("validatebox-invalid");
                    var _438 = rule["message"];
                    if (_437) {
                        for (var i = 0; i < _437.length; i++) {
                            _438 = _438.replace(new RegExp("\\{" + i + "\\}", "g"), _437[i]);
                        }
                    }
                    _432(opts.invalidMessage || _438);
                    if (_430.validating) {
                        _426(_42f);
                    }
                    return false;
                }
            }
            return true;
        };
        box.removeClass("validatebox-invalid");
        _425(_42f);
        if (opts.novalidate || box.is(":disabled")) {
            return true;
        }
        if (opts.required) {
            if (_431 == "") {
                box.addClass("validatebox-invalid");
                _432(opts.missingMessage);
                if (_430.validating) {
                    _426(_42f);
                }
                return false;
            }
        }
        if (opts.validType) {
            if ($.isArray(opts.validType)) {
                for (var i = 0; i < opts.validType.length; i++) {
                    if (!_433(opts.validType[i])) {
                        return false;
                    }
                }
            } else {
                if (typeof opts.validType == "string") {
                    if (!_433(opts.validType)) {
                        return false;
                    }
                } else {
                    for (var _439 in opts.validType) {
                        var _43a = opts.validType[_439];
                        if (!_433(_439, _43a)) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    };
    function _43b(_43c, _43d) {
        var opts = $.data(_43c, "validatebox").options;
        if (_43d != undefined) {
            opts.novalidate = _43d;
        }
        if (opts.novalidate) {
            $(_43c).removeClass("validatebox-invalid");
            _425(_43c);
        }
        /*输入框支持placeholder属性 wanghc 2018-6-30*/
        if (opts.placeholder!=""){
            $(_43c).attr("placeholder",opts.placeholder);
        }
        _422(_43c);
    };
    $.fn.validatebox = function (_43e, _43f) {
        if (typeof _43e == "string") {
            return $.fn.validatebox.methods[_43e](this, _43f);
        }
        _43e = _43e || {};
        return this.each(function () {
            var _440 = $.data(this, "validatebox");
            if (_440) {
                $.extend(_440.options, _43e);
            } else {
                init(this);
                $.data(this, "validatebox", { options: $.extend({}, $.fn.validatebox.defaults, $.fn.validatebox.parseOptions(this), _43e) });
            }
            _43b(this);
            _42e(this);
        });
    };
    $.fn.validatebox.methods = {
        options: function (jq) {
            return $.data(jq[0], "validatebox").options;
        }, destroy: function (jq) {
            return jq.each(function () {
                _41f(this);
            });
        }, validate: function (jq) {
            return jq.each(function () {
                _42e(this);
            });
        }, isValid: function (jq) {
            return _42e(jq[0]);
        }, enableValidation: function (jq) {
            return jq.each(function () {
                _43b(this, false);
            });
        }, disableValidation: function (jq) {
            return jq.each(function () {
                _43b(this, true);
            });
        }
    };
    $.fn.validatebox.parseOptions = function (_441) {
        var t = $(_441);
        return $.extend({}, $.parser.parseOptions(_441, ["placeholder","validType", "missingMessage", "invalidMessage", "tipPosition", { delay: "number", deltaX: "number" }]), { required: (t.attr("required") ? true : undefined), novalidate: (t.attr("novalidate") != undefined ? true : undefined) });
    };
    $.fn.validatebox.defaults = {
        placeholder:"",/*输入框支持placeholder属性 wanghc 2018-10-18*/
        required: false, validType: null, validParams: null, delay: 200, missingMessage: "This field is required.", invalidMessage: null, tipPosition: "right", deltaX: 0, novalidate: false, tipOptions: {
            showEvent: "none", hideEvent: "none", showDelay: 0, hideDelay: 0, zIndex: "", onShow: function () {
                $(this).tooltip("tip").css({ color: "#000", borderColor: "#CC9933", backgroundColor: "#FFFFCC" });
            }, onHide: function () {
                $(this).tooltip("destroy");
            }
        }, rules: {
            email: {
                validator: function (_442) {
                    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_442);
                }, message: "Please enter a valid email address."
            }, url: {
                validator: function (_443) {
                    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_443);
                }, message: "Please enter a valid URL."
            }, length: {
                validator: function (_444, _445) {
                    var len = $.trim(_444).length;
                    return len >= _445[0] && len <= _445[1];
                }, message: "Please enter a value between {0} and {1}."
            }, remote: {
                validator: function (_446, _447) {
                    var data = {};
                    data[_447[1]] = _446;
                    var _448 = $.ajax({ url: _447[0], dataType: "json", data: data, async: false, cache: false, type: "post" }).responseText;
                    return _448 == "true";
                }, message: "Please fix this field."
            }
        }
    };
})(jQuery);