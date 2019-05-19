(function ($) {
    function _449(_44a, _44b) {
        _44b = _44b || {};
        var _44c = {};
        if (_44b.onSubmit) {
            if (_44b.onSubmit.call(_44a, _44c) == false) {
                return;
            }
        }
        var form = $(_44a);
        if (_44b.url) {
            form.attr("action", _44b.url);
        }
        var _44d = "hisui_frame_" + (new Date().getTime());
        var _44e = $("<iframe id=" + _44d + " name=" + _44d + "></iframe>").attr("src", window.ActiveXObject ? "javascript:false" : "about:blank").css({ position: "absolute", top: -1000, left: -1000 });
        var t = form.attr("target"), a = form.attr("action");
        form.attr("target", _44d);
        var _44f = $();
        try {
            _44e.appendTo("body");
            _44e.bind("load", cb);
            for (var n in _44c) {
                var f = $("<input type=\"hidden\" name=\"" + n + "\">").val(_44c[n]).appendTo(form);
                _44f = _44f.add(f);
            }
            _450();
            form[0].submit();
        }
        finally {
            form.attr("action", a);
            t ? form.attr("target", t) : form.removeAttr("target");
            _44f.remove();
        }
        function _450() {
            var f = $("#" + _44d);
            if (!f.length) {
                return;
            }
            try {
                var s = f.contents()[0].readyState;
                if (s && s.toLowerCase() == "uninitialized") {
                    setTimeout(_450, 100);
                }
            }
            catch (e) {
                cb();
            }
        };
        var _451 = 10;
        function cb() {
            var _452 = $("#" + _44d);
            if (!_452.length) {
                return;
            }
            _452.unbind();
            var data = "";
            try {
                var body = _452.contents().find("body");
                data = body.html();
                if (data == "") {
                    if (--_451) {
                        setTimeout(cb, 100);
                        return;
                    }
                }
                var ta = body.find(">textarea");
                if (ta.length) {
                    data = ta.val();
                } else {
                    var pre = body.find(">pre");
                    if (pre.length) {
                        data = pre.html();
                    }
                }
            }
            catch (e) {
            }
            if (_44b.success) {
                _44b.success(data);
            }
            setTimeout(function () {
                _452.unbind();
                _452.remove();
            }, 100);
        };
    };
    function load(_453, data) {
        if (!$.data(_453, "form")) {
            $.data(_453, "form", { options: $.extend({}, $.fn.form.defaults) });
        }
        var opts = $.data(_453, "form").options;
        if (typeof data == "string") {
            var _454 = {};
            if (opts.onBeforeLoad.call(_453, _454) == false) {
                return;
            }
            $.ajax({
                url: data, data: _454, dataType: "json", success: function (data) {
                    _455(data);
                }, error: function () {
                    opts.onLoadError.apply(_453, arguments);
                }
            });
        } else {
            _455(data);
        }
        function _455(data) {
            var form = $(_453);
            for (var name in data) {
                var val = data[name];
                var rr = _456(name, val);
                if (!rr.length) {
                    var _457 = _458(name, val);
                    if (!_457) {
                        $("input[name=\"" + name + "\"]", form).val(val);
                        $("textarea[name=\"" + name + "\"]", form).val(val);
                        $("select[name=\"" + name + "\"]", form).val(val);
                    }
                }
                _459(name, val);
            }
            opts.onLoadSuccess.call(_453, data);
            _460(_453);
        };
        function _456(name, val) {
            var rr = $(_453).find("input[name=\"" + name + "\"][type=radio], input[name=\"" + name + "\"][type=checkbox]");
            rr._propAttr("checked", false);
            rr.each(function () {
                var f = $(this);
                if (f.val() == String(val) || $.inArray(f.val(), $.isArray(val) ? val : [val]) >= 0) {
                    f._propAttr("checked", true);
                }
            });
            return rr;
        };
        function _458(name, val) {
            var _45a = 0;
            var pp = ["numberbox", "slider"];
            for (var i = 0; i < pp.length; i++) {
                var p = pp[i];
                var f = $(_453).find("input[" + p + "Name=\"" + name + "\"]");
                if (f.length) {
                    f[p]("setValue", val);
                    _45a += f.length;
                }
            }
            return _45a;
        };
        function _459(name, val) {
            var form = $(_453);
            var cc = ["combobox", "combotree", "combogrid", "datetimebox", "datebox", "combo"];
            var c = form.find("[comboName=\"" + name + "\"]");
            if (c.length) {
                for (var i = 0; i < cc.length; i++) {
                    var type = cc[i];
                    if (c.hasClass(type + "-f")) {
                        if (c[type]("options").multiple) {
                            c[type]("setValues", val);
                        } else {
                            c[type]("setValue", val);
                        }
                        return;
                    }
                }
            }
        };
    };
    function _45b(_45c) {
        $("input,select,textarea", _45c).each(function () {
            var t = this.type, tag = this.tagName.toLowerCase();
            if (t == "text" || t == "hidden" || t == "password" || tag == "textarea") {
                this.value = "";
            } else {
                if (t == "file") {
                    var file = $(this);
                    var _45d = file.clone().val("");
                    _45d.insertAfter(file);
                    if (file.data("validatebox")) {
                        file.validatebox("destroy");
                        _45d.validatebox();
                    } else {
                        file.remove();
                    }
                } else {
                    if (t == "checkbox" || t == "radio") {
                        this.checked = false;
                    } else {
                        if (tag == "select") {
                            this.selectedIndex = -1;
                        }
                    }
                }
            }
        });
        var t = $(_45c);
        var _45e = ["combo", "combobox", "combotree", "combogrid", "slider","radio","checkbox"];  //cryze 2019-04-04 增加支持封装的radio和checkbox 
        for (var i = 0; i < _45e.length; i++) {
            var _45f = _45e[i];
            var r = t.find("." + _45f + "-f");
            if (r.length && r[_45f]) {
                r[_45f]("clear");
            }
        }
        _460(_45c);
    };
    function _461(_462) {
        _462.reset();
        var t = $(_462);
        var _463 = ["combo", "combobox", "combotree", "combogrid", "datebox", "datetimebox", "spinner", "timespinner", "numberbox", "numberspinner", "slider","radio","checkbox"]; //cryze 2019-04-04 增加支持封装的radio和checkbox 
        for (var i = 0; i < _463.length; i++) {
            var _464 = _463[i];
            var r = t.find("." + _464 + "-f");
            if (r.length && r[_464]) {
                r[_464]("reset");
            }
        }
        _460(_462);
    };
    function _465(_466) {
        var _467 = $.data(_466, "form").options;
        var form = $(_466);
        form.unbind(".form").bind("submit.form", function () {
            setTimeout(function () {
                _449(_466, _467);
            }, 0);
            return false;
        });
    };
    function _460(_468) {
        if ($.fn.validatebox) {
            var t = $(_468);
            t.find(".validatebox-text:not(:disabled)").validatebox("validate");
            var _469 = t.find(".validatebox-invalid");
            _469.filter(":not(:disabled):first").focus();
            return _469.length == 0;
        }
        return true;
    };
    function _46a(_46b, _46c) {
        $(_46b).find(".validatebox-text:not(:disabled)").validatebox(_46c ? "disableValidation" : "enableValidation");
    };
    $.fn.form = function (_46d, _46e) {
        if (typeof _46d == "string") {
            return $.fn.form.methods[_46d](this, _46e);
        }
        _46d = _46d || {};
        return this.each(function () {
            if (!$.data(this, "form")) {
                $.data(this, "form", { options: $.extend({}, $.fn.form.defaults, _46d) });
            }
            _465(this);
        });
    };
    $.fn.form.methods = {
        submit: function (jq, _46f) {
            return jq.each(function () {
                var opts = $.extend({}, $.fn.form.defaults, $.data(this, "form") ? $.data(this, "form").options : {}, _46f || {});
                _449(this, opts);
            });
        }, load: function (jq, data) {
            return jq.each(function () {
                load(this, data);
            });
        }, clear: function (jq) {
            return jq.each(function () {
                _45b(this);
            });
        }, reset: function (jq) {
            return jq.each(function () {
                _461(this);
            });
        }, validate: function (jq) {
            return _460(jq[0]);
        }, disableValidation: function (jq) {
            return jq.each(function () {
                _46a(this, true);
            });
        }, enableValidation: function (jq) {
            return jq.each(function () {
                _46a(this, false);
            });
        }
    };
    $.fn.form.defaults = {
        url: null, onSubmit: function (_470) {
            return $(this).form("validate");
        }, success: function (data) {
        }, onBeforeLoad: function (_471) {
        }, onLoadSuccess: function (data) {
        }, onLoadError: function () {
        }
    };
})(jQuery);