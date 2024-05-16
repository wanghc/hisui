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
                            if ($.data(_423, "validatebox")){ // 编辑元素已不存在,不用再validate了
                                $(_423).validatebox("validate");
                            }
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
            // 离开时再校验一次，
            // if (opts.validateOnBlur) {}
            setTimeout(function() {
                if ($.data(_423, "validatebox")){ // 表格编辑时, 编辑元素已不存在,不用再validate了
                    $(_423).validatebox("validate");
                }
            }, 0);            
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
                    box.closest('.combo').addClass("combo-invalid");
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
        box.closest('.combo').removeClass("combo-invalid");
        _425(_42f);
        if (opts.novalidate || box.is(":disabled")) {
            return true;
        }
        if (opts.required) {
            if (_431 == "") {
                box.addClass("validatebox-invalid");
                box.closest('.combo').addClass("combo-invalid");
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
    /*输入框支持disabled属性 yp 2019-9-2*/
    function setDisabled(target, value) {
        var opts = $.data(target, "validatebox").options;
        if (value) {
            opts.disabled = true;
            $(target).attr("disabled", true);
        } else {
            opts.disabled = false;
            $(target).removeAttr("disabled");
        }
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
            $(_43c).attr("placeholder",$.hisui.getTrans(opts.placeholder));
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
            setDisabled(this, $.data(this, "validatebox").options.disabled);
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
        }, setDisabled: function (jq,value) {
            return jq.each(function () {
                setDisabled(this, value);
            });
        }
    };
    $.fn.validatebox.parseOptions = function (_441) {
        var t = $(_441);
        return $.extend({}, $.parser.parseOptions(_441, ["disabled","placeholder","validType", "missingMessage", "invalidMessage", "tipPosition", { delay: "number", deltaX: "number" }]), { required: (t.attr("required") ? true : undefined), novalidate: (t.attr("novalidate") != undefined ? true : undefined) });
    };
    $.fn.validatebox.defaults = {
        disabled: false, /*输入框支持disabled属性 yp 2019-9-2*/
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
            }, idcard: {
                validator:function (value){
                    var status = $.data(this,'validatebox');
                    var opts = status.options;
                    var city = {11:"1",12:"1",13:"1",14:"1",15:"1",21:"1",22:"1",23:"1",31:"1",32:"1",33:"1",34:"1",35:"1",36:"1",37:"1",41:"1",42:"1",43:"1",44:"1",45:"1",46:"1",50:"1",51:"1",52:"1",53:"1",54:"1 ",61:"1",62:"1",63:"1",64:"1",65:"1",71:"1",81:"1",82:"1",91:"1"};
                    //{11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
                    var pass= true;
                    if(!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)){
                        if (opts.rules.idcard.formattermessage) opts.rules.idcard.message = opts.rules.idcard.formattermessage;
                        pass = false;
                    } else if (!city[value.substr(0,2)]){
                        if (opts.rules.idcard.addrmessage) opts.rules.idcard.message = opts.rules.idcard.addrmessage;
                        pass = false;
                    } else{
                        //18位身份证需要验证最后一位校验位
                        if(value.length == 18){
                            value = value.split('');
                            //∑(ai×Wi)(mod 11)//加权因子
                            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                            //校验位
                            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                            var sum = 0;
                            var ai = 0;
                            var wi = 0;
                            for (var i = 0; i < 17; i++){
                                ai = value[i];
                                wi = factor[i];
                                sum += ai * wi;
                            }
                            var last = parity[sum % 11];
                            if(parity[sum % 11] != value[17]){
                                if (opts.rules.idcard.paritymessage) opts.rules.idcard.message = opts.rules.idcard.paritymessage;
                                pass = false;
                            }
                        }
                    }
                    return pass;
                }, message:"Please enter a valid ID card."
            }, mobilephone: {
                validator:function (value){
                    var testmp = function (phone){
                        return (phone.length==11) && /^1[3|4|5|8][0-9]\d{8}$/.test(phone);
                    }
                    var status = false;
                    status = testmp(value);
                    if(value.length == 12 && value.substr(0,1)==0){
                        var inputValue = value.substr(1,11); //去首0
                        if(testmp(inputValue)){
                            $(this).val(inputValue);
                            status = true;
                        }
                    }
                    return status;
                }, message:"Please enter a valid mobile phone."
            }
        }
    };
})(jQuery);