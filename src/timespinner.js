(function ($) {
    function _4e7(_4e8) {
        var opts = $.data(_4e8, "timespinner").options;
        $(_4e8).addClass("timespinner-f");
        $(_4e8).spinner(opts);
        $(_4e8).unbind(".timespinner");
        $(_4e8).bind("click.timespinner", function () {
            var _4e9 = 0;
            if (this.selectionStart != null) {
                _4e9 = this.selectionStart;
            } else {
                if (this.createTextRange) {
                    var _4ea = _4e8.createTextRange();
                    var s = document.selection.createRange();
                    s.setEndPoint("StartToStart", _4ea);
                    _4e9 = s.text.length;
                }
            }
            opts.highlight = calHighlightTypeByPosi(_4e9);
            _4ec(_4e8);
        }).bind("blur.timespinner", function () {
            _4eb(_4e8);
        });
    };
    /** 通过光标位置计算出,应该高亮的类型0,1,2*/
    function calHighlightTypeByPosi(posi){
        if (posi >= 0 && posi <= 2) {
            return 0;
        } else {
            if (posi >= 3 && posi <= 5) {
                return 1;
            } else {
                if (posi >= 6 && posi <= 8) {
                    return 2;
                }
            }
        }
        return 0;
    }
    //highlight光标所在区
    function _4ec(_4ed) {
        var opts = $.data(_4ed, "timespinner").options;
        var _4ee = 0, end = 0;
        if (_4ed.selectionStart!=null){
            // 光标在哪,哪就高亮
            opts.highlight = calHighlightTypeByPosi(_4ed.selectionStart);
        }
        if (opts.highlight == 0) {
            _4ee = 0;
            end = 2;
        } else {
            if (opts.highlight == 1) {
                _4ee = 3;
                end = 5;
            } else {
                if (opts.highlight == 2) {
                    _4ee = 6;
                    end = 8;
                }
            }
        }
        if (_4ed.selectionStart != null) {
            _4ed.setSelectionRange(_4ee, end);
        } else {
            if (_4ed.createTextRange) {
                var _4ef = _4ed.createTextRange();
                _4ef.collapse();
                _4ef.moveEnd("character", end);
                _4ef.moveStart("character", _4ee);
                _4ef.select();
            }
        }
        $(_4ed).focus();
    };
    function getHMSArr(tm) {
        var arr = [];
        if (tm){
            tm = tm.replace(/\s/g,"");
            var reg = /^([0-2][0-9])([0-6][0-9])([0-9]*)$/;
            var reg1 = /^([3-9])([0-6][0-9])([0-6]*)$/;
            if(reg.test(tm)){
                arr = tm.match(reg);
                arr.splice(0,1);
            }
            if(reg1.test(tm)){
                arr = tm.match(reg1);
                arr.splice(0,1);
            }
        }
        return arr;
    }
    function _4f0(_4f1, _4f2) {
        var opts = $.data(_4f1, "timespinner").options;
        if (!_4f2) {
            return null;
        }
        var vv = [];
        if (_4f2.indexOf(opts.separator)>-1){
            vv = _4f2.split(opts.separator);
            for (var i = 0; i < vv.length; i++) {
                if (isNaN(vv[i])) {
                    return null;
                }
            }
        }else{
            vv = getHMSArr(_4f2);
        }
        
        while (vv.length < 3) {
            vv.push(0);
        }
        return new Date(1900, 0, 0, vv[0], vv[1], vv[2]);
    };
    function _4eb(_4f3) {
        var opts = $.data(_4f3, "timespinner").options;
        var _4f4 = $(_4f3).val();
        var time = _4f0(_4f3, _4f4);
        if (!time) {
            opts.value = "";
            $(_4f3).spinner("setValue", "");
            return;
        }
        var _4f5 = _4f0(_4f3, opts.min);
        var _4f6 = _4f0(_4f3, opts.max);
        if (_4f5 && _4f5 > time) {
            time = _4f5;
        }
        if (_4f6 && _4f6 < time) {
            time = _4f6;
        }
        var tt = [_4f7(time.getHours()), _4f7(time.getMinutes())];
        if (opts.showSeconds) {
            tt.push(_4f7(time.getSeconds()));
        }
        var val = tt.join(opts.separator);
        opts.value = val;
        $(_4f3).spinner("setValue", val);
        function _4f7(_4f8) {
            return (_4f8 < 10 ? "0" : "") + _4f8;
        };
    };
    function _4f9(_4fa, down) {
        var opts = $.data(_4fa, "timespinner").options;
        var val = $(_4fa).val();
        if (val == "") {
            val = [0, 0, 0].join(opts.separator);
        }
        var vv = val.split(opts.separator);
        for (var i = 0; i < vv.length; i++) {
            vv[i] = parseInt(vv[i], 10);
        }
        if (down == true) {
            vv[opts.highlight] -= opts.increment;
        } else {
            vv[opts.highlight] += opts.increment;
        }
        //赋值前记录光标位置
        var orgStart = _4fa.selectionStart;
        //val方法赋值会修改selectionStart为最右边
        $(_4fa).val(vv.join(opts.separator));
        _4eb(_4fa);
        // 赋值结束后,重置光标位置
        _4fa.selectionStart = orgStart;
        _4ec(_4fa);
    };
    $.fn.timespinner = function (_4fb, _4fc) {
        if (typeof _4fb == "string") {
            var _4fd = $.fn.timespinner.methods[_4fb];
            if (_4fd) {
                return _4fd(this, _4fc);
            } else {
                return this.spinner(_4fb, _4fc);
            }
        }
        _4fb = _4fb || {};
        return this.each(function () {
            var _4fe = $.data(this, "timespinner");
            if (_4fe) {
                $.extend(_4fe.options, _4fb);
            } else {
                $.data(this, "timespinner", { options: $.extend({}, $.fn.timespinner.defaults, $.fn.timespinner.parseOptions(this), _4fb) });
            }
            _4e7(this);
        });
    };
    $.fn.timespinner.methods = {
        options: function (jq) {
            var opts = $.data(jq[0], "timespinner").options;
            return $.extend(opts, { value: jq.val(), originalValue: jq.spinner("options").originalValue });
        }, setValue: function (jq, _4ff) {
            return jq.each(function () {
                $(this).val(_4ff);
                _4eb(this);
            });
        }, getHours: function (jq) {
            var opts = $.data(jq[0], "timespinner").options;
            var vv = jq.val().split(opts.separator);
            return parseInt(vv[0], 10);
        }, getMinutes: function (jq) {
            var opts = $.data(jq[0], "timespinner").options;
            var vv = jq.val().split(opts.separator);
            return parseInt(vv[1], 10);
        }, getSeconds: function (jq) {
            var opts = $.data(jq[0], "timespinner").options;
            var vv = jq.val().split(opts.separator);
            return parseInt(vv[2], 10) || 0;
        }
    };
    $.fn.timespinner.parseOptions = function (_500) {
        return $.extend({}, $.fn.spinner.parseOptions(_500), $.parser.parseOptions(_500, ["separator", { showSeconds: "boolean", highlight: "number" }]));
    };
    $.fn.timespinner.defaults = $.extend({}, $.fn.spinner.defaults, {
        separator: ":", showSeconds: false, highlight: 0, spin: function (down) {
            _4f9(this, down);
        },keyHandler: {
            up: function (e) {
                e.preventDefault();
                _4ec(this);  //highlight光标所在区
                _4f9(this, false);
                return false;
            }, down: function (e) {
                e.preventDefault();
                _4ec(this); //highlight光标所在区
                _4f9(this, true);
                return false;
            }, enter: function (e) {
                _4eb(this);
            }
        }
    });
})(jQuery);