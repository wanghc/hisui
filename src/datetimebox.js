(function ($) {
    function _949(target) {
        var _94b = $.data(target, "datetimebox");
        var opts = _94b.options;
        $(target).datebox($.extend({}, opts, {
            onShowPanel: function () {
                var _94c = $(target).datetimebox("getValue");
                _94e(target, _94c, true);
                opts.onShowPanel.call(target);
            }, formatter: $.fn.datebox.defaults.formatter, parser: $.fn.datebox.defaults.parser
        }));
        $(target).removeClass("datebox-f").addClass("datetimebox-f");
        $(target).datebox("calendar").calendar({
            onSelect: function (date) {
                opts.onSelect.call(target, date);
            },
            onDblClick: function (date) {
                // handler
                var bs = $(target).datetimebox('options').buttons;;
                if (bs.length>1 && bs[1].handler) bs[1].handler.call(this, target);
                opts.onDblClick.call(target, date);
            }
        });
        var _94d = $(target).datebox("panel");
        if (!_94b.spinner) {
            //cryze datetimebox de timespinner with 80px->100px  height->24px; height强行指定 24px
            var p = $("<div style=\"padding:2px\"><input style=\"width:100px;height:24px\"></div>").insertAfter(_94d.children("div.datebox-calendar-inner"));
            _94b.spinner = p.children("input");
        }
        _94b.spinner.timespinner({ showSeconds: opts.showSeconds, separator: opts.timeSeparator }).unbind(".datetimebox").bind("mousedown.datetimebox", function (e) {
            e.stopPropagation();
        });
        _94e(target, opts.value);
        $(target).combo('textbox').unbind('.datetimebox').bind("dblclick.datetimebox", function (e) { 
            var ind1 = 0, ind2 = 0, t = this, myselectVal = "";
            var val = $(t).val();
            if (t.selectionStart != null) {
                ind1 = t.selectionStart;
                ind2 = t.selectionEnd;
                myselectVal = val.substring(ind1, ind2);
            } else {
                if (t.createTextRange) {
                    var r = t.createTextRange();
                    var o = document.selection.createRange();
                    myselectVal = o.text; 
                    o.setEndPoint("StartToStart", r);
                    ind2 = o.text.length;
                    if (myselectVal.indexOf(' ')>-1) {
                        ind1 = ind2 - myselectVal.length;
                    }
                }
            }
            if (ind1>0) {
                if (myselectVal.indexOf(' ')>-1) {  //包含空格则不选中空格
                    setSelectionRange($(t), { start: ind1, end: ind2-1 });  
                }                
            }
        });
    };
    /***
     * {start:10,end:12}
     */
    function setSelectionRange(jq, range) {
        return jq.each(function() {
            var _5bb = this;
            var st = range.start;
            var end = range.end;
            if (_5bb.createTextRange) {
                var _5bd = _5bb.createTextRange();
                _5bd.collapse();
                _5bd.moveEnd("character", end);
                _5bd.moveStart("character", st);
                _5bd.select();
            } else {
                _5bb.setSelectionRange(st, end);
            }
            $(this).focus();
        });
    }
    function _94f(_950) {
        var c = $(_950).datetimebox("calendar");
        var t = $(_950).datetimebox("spinner");
        var date = c.calendar("options").current;
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), t.timespinner("getHours"), t.timespinner("getMinutes"), t.timespinner("getSeconds"));
    };
    function _951(_952, q) {
        _94e(_952, q, true);
    };
    function formatterValue(target) {
        var opts = $.data(target, "datetimebox").options;
        var d = _94f(target);
        _94e(target, opts.formatter.call(target, d));        
    }
    function onBlur(target){
        if ($(target).combo('textbox').val()=='') {   //如果当前输入框为空 不再进行格式化值 而是直接setValue空 避免点击关闭和删掉输入框值时又变回当前日期  //cryze 2022-11-04
            _94e(target, ''); 
        }else{
            formatterValue(target);
        }
    }
    function _953(_954) {
        formatterValue(_954);        
        $(_954).combo("hidePanel");
    };
    function _94e(_955, _956, _957) {
        var opts = $.data(_955, "datetimebox").options;
        $(_955).combo("setValue", _956);
        if (!_957) {
            if (_956) {
                var date = opts.parser.call(_955, _956);
                $(_955).combo("setValue", opts.formatter.call(_955, date));
                $(_955).combo("setText", opts.formatter.call(_955, date));
            } else {
                $(_955).combo("setText", _956);
            }
        }
        var date = opts.parser.call(_955, _956);
        $(_955).datetimebox("calendar").calendar("moveTo", date);
        $(_955).datetimebox("spinner").timespinner("setValue", _958(date));
        function _958(date) {
            function _959(_95a) {
                return (_95a < 10 ? "0" : "") + _95a;
            };
            var tt = [_959(date.getHours()), _959(date.getMinutes())];
            if (opts.showSeconds) {
                tt.push(_959(date.getSeconds()));
            }
            return tt.join($(_955).datetimebox("spinner").timespinner("options").separator);
        };
    };
    $.fn.datetimebox = function (_95b, _95c) {
        if (typeof _95b == "string") {
            var _95d = $.fn.datetimebox.methods[_95b];
            if (_95d) {
                return _95d(this, _95c);
            } else {
                return this.datebox(_95b, _95c);
            }
        }
        _95b = _95b || {};
        return this.each(function () {
            var _95e = $.data(this, "datetimebox");
            if (_95e) {
                $.extend(_95e.options, _95b);
            } else {
                $.data(this, "datetimebox", { options: $.extend({}, $.fn.datetimebox.defaults, $.fn.datetimebox.parseOptions(this), _95b) });
            }
            _949(this);
        });
    };
    $.fn.datetimebox.methods = {
        options: function (jq) {
            var _95f = jq.datebox("options");
            return $.extend($.data(jq[0], "datetimebox").options, { originalValue: _95f.originalValue, disabled: _95f.disabled, readonly: _95f.readonly });
        }, spinner: function (jq) {
            return $.data(jq[0], "datetimebox").spinner;
        }, setValue: function (jq, _960) {
            return jq.each(function () {
                _94e(this, _960);
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).datetimebox("options");
                $(this).datetimebox("setValue", opts.originalValue);
            });
        }
    };
    $.fn.datetimebox.parseOptions = function (_961) {
        var t = $(_961);
        return $.extend({}, $.fn.datebox.parseOptions(_961), $.parser.parseOptions(_961, ["timeSeparator", { showSeconds: "boolean" }]));
    };
    $.fn.datetimebox.defaults = $.extend({}, $.fn.datebox.defaults, {
        showSeconds: true, timeSeparator: ":", keyHandler: {
            up: function (e) {
            }, down: function (e) {
            }, left: function (e) {
            }, right: function (e) {
            }, enter: function (e) {
                _953(this);
            }, query: function (q, e) {
                _951(this, q);
            }
        }, buttons: [{
            text: function (_962) {
                return $(_962).datetimebox("options").currentText;
            }, handler: function (_963) {
                var opts = $(_963).datetimebox("options");
                var d = new Date();
                $(_963).datetimebox("calendar").calendar({ year: d.getFullYear(), month: d.getMonth() + 1, current: d });
                var ts = opts.timeSeparator;
                // 点击[今天]按钮，时间设置成当前时间 [4385191]
                $(_963).datetimebox("spinner").timespinner("setValue",d.getHours()+ts+d.getMinutes()+ts+d.getSeconds());
                _953(_963);
            }
        }, {
            text: function (_964) {
                return $(_964).datetimebox("options").okText;
            }, handler: function (_965) {
                _953(_965);
            }
        }, {
            text: function (_966) {
                return $(_966).datetimebox("options").closeText;
            }, handler: function (_967) {
                $(this).closest("div.combo-panel").panel("close");
            }
        }], formatter: function (date) {
            var h = date.getHours();
            var M = date.getMinutes();
            var s = date.getSeconds();
            function _968(_969) {
                return (_969 < 10 ? "0" : "") + _969;
            };
            var _96a = $(this).datetimebox("spinner").timespinner("options").separator;
            var r = $.fn.datebox.defaults.formatter(date) + " " + _968(h) + _96a + _968(M);
            if ($(this).datetimebox("options").showSeconds) {
                r += _96a + _968(s);
            }
            return r;
        }, parser: function (s) {
            if ($.trim(s) == "") {
                return new Date();
            }
            var dt = s.split(" ");
            var d = $.fn.datebox.defaults.parser(dt[0]);
            if (dt.length < 2) {
                return d;
            }
            var _96b = $(this).datetimebox("spinner").timespinner("options").separator;
            var tt = dt[1].split(_96b);
            var hour = parseInt(tt[0], 10) || 0;
            var _96c = parseInt(tt[1], 10) || 0;
            var _96d = parseInt(tt[2], 10) || 0;
            return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, _96c, _96d);
        }, onHidePanel:function(){ //因为修改t快捷键,datebox中增加了这个方法,datetimebox中不用
        }, rules: { //重写datebox方法
        }, onBlur: function (target) { //重写datebox方法
            //formatterValue(target);
            onBlur(target);  //不再直接调用formatterValue cryze 2022-11-04
		}
    });
})(jQuery);