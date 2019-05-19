(function ($) {
    function _929(_92a) {
        var _92b = $.data(_92a, "datebox");
        var opts = _92b.options;
        $(_92a).addClass("datebox-f").combo($.extend({}, opts, {
            onShowPanel: function () {
                _92c();
                _934(_92a, $(_92a).datebox("getText"), true);
                opts.onShowPanel.call(_92a);
            }
        }));
        $(_92a).combo("textbox").parent().addClass("datebox");
        if (!_92b.calendar) {
            _92d();
        }
        _934(_92a, opts.value);
        function _92d() {
            var _92e = $(_92a).combo("panel").css("overflow", "hidden");
            _92e.panel("options").onBeforeDestroy = function () {
                var sc = $(this).find(".calendar-shared");
                if (sc.length) {
                    sc.insertBefore(sc[0].pholder);
                }
            };
            var cc = $("<div class=\"datebox-calendar-inner\"></div>").appendTo(_92e);
            if (opts.sharedCalendar) {
                var sc = $(opts.sharedCalendar);
                if (!sc[0].pholder) {
                    sc[0].pholder = $("<div class=\"calendar-pholder\" style=\"display:none\"></div>").insertAfter(sc);
                }
                sc.addClass("calendar-shared").appendTo(cc);
                if (!sc.hasClass("calendar")) {
                    sc.calendar();
                }
                _92b.calendar = sc;
            } else {
                _92b.calendar = $("<div></div>").appendTo(cc).calendar();
            }
            $.extend(_92b.calendar.calendar("options"), {
                fit: true, border: false, onSelect: function (date) {
                    var opts = $(this.target).datebox("options");
                    _934(this.target, opts.formatter.call(this.target, date));
                    $(this.target).combo("hidePanel");
                    opts.onSelect.call(_92a, date);
                }
            });
            var _92f = $("<div class=\"datebox-button\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"width:100%\"><tr></tr></table></div>").appendTo(_92e);
            var tr = _92f.find("tr");
            for (var i = 0; i < opts.buttons.length; i++) {
                var td = $("<td></td>").appendTo(tr);
                var btn = opts.buttons[i];
                var t = $("<a href=\"javascript:void(0)\"></a>").html($.isFunction(btn.text) ? btn.text(_92a) : btn.text).appendTo(td);
                t.bind("click", { target: _92a, handler: btn.handler }, function (e) {
                    e.data.handler.call(this, e.data.target);
                });
            }
            tr.find("td").css("width", (100 / opts.buttons.length) + "%");
        };
        function _92c() {
            var _930 = $(_92a).combo("panel");
            var cc = _930.children("div.datebox-calendar-inner");
            _930.children()._outerWidth(_930.width());
            _92b.calendar.appendTo(cc);
            _92b.calendar[0].target = _92a;
            if (opts.panelHeight != "auto") {
                var _931 = _930.height();
                _930.children().not(cc).each(function () {
                    _931 -= $(this).outerHeight();
                });
                cc._outerHeight(_931);
            }
            _92b.calendar.calendar("resize");
        };
    };
    function ConvertTDate(dt) {
        var xdays = 0;
        var today=new Date();
        var re = /(\s)+/g ;
        dt=dt.replace(re,'');
        if (dt.charAt(0).toUpperCase()=='T') {
            xdays = dt.slice(2);
            if (xdays=='') xdays=0;
            if (isNaN(xdays)) return 0;
            xdays_ms = xdays * 24 * 60 * 60 * 1000;
            if (dt.charAt(1) == '+') today.setTime(today.getTime() + xdays_ms);
            else if (dt.charAt(1) == '-') today.setTime(today.getTime() - xdays_ms);
            else if (dt.length>1) return today;
            return today;
        }
        return today;
    }
    function _932(_933, q, flag) {
        // 实现t表示今天功能 by wanghc 20180925
        if (q.indexOf('t')>-1){
            var _937 = $.data(_933, "datebox");
            var opts = _937.options;
            q = ConvertTDate(q);
            q = opts.formatter.call(_933, q);
        }
        if (arguments.length>2) { //增加第三个入参, onHidePanel要调用
            _934(_933, q, flag);
        }else{
            _934(_933, q, true);
        }
    };
    function _935(_936) {
        var _937 = $.data(_936, "datebox");
        var opts = _937.options;
        var _938 = _937.calendar.calendar("options").current;
        if (_938) {
            _934(_936, opts.formatter.call(_936, _938));
            $(_936).combo("hidePanel");
        }
    };
    function _934(_939, _93a, _93b) {
        var _93c = $.data(_939, "datebox");
        var opts = _93c.options;
        var _93d = _93c.calendar;
        $(_939).combo("setValue", _93a);
        _93d.calendar("moveTo", opts.parser.call(_939, _93a));
        if (!_93b) {
            if (_93a) {
                _93a = opts.formatter.call(_939, _93d.calendar("options").current);
                $(_939).combo("setValue", _93a).combo("setText", _93a);
            } else {
                $(_939).combo("setText", _93a);
            }
        }
    };
    $.fn.datebox = function (_93e, _93f) {
        if (typeof _93e == "string") {
            var _940 = $.fn.datebox.methods[_93e];
            if (_940) {
                return _940(this, _93f);
            } else {
                return this.combo(_93e, _93f);
            }
        }
        _93e = _93e || {};
        return this.each(function () {
            var _941 = $.data(this, "datebox");
            if (_941) {
                $.extend(_941.options, _93e);
            } else {
                $.data(this, "datebox", { options: $.extend({}, $.fn.datebox.defaults, $.fn.datebox.parseOptions(this), _93e) });
            }
            _929(this);
        });
    };
    $.fn.datebox.methods = {
        options: function (jq) {
            var _942 = jq.combo("options");
            return $.extend($.data(jq[0], "datebox").options, { originalValue: _942.originalValue, disabled: _942.disabled, readonly: _942.readonly });
        }, calendar: function (jq) {
            return $.data(jq[0], "datebox").calendar;
        }, setValue: function (jq, _943) {
            return jq.each(function () {
                _934(this, _943);
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).datebox("options");
                $(this).datebox("setValue", opts.originalValue);
            });
        }
    };
    $.fn.datebox.parseOptions = function (_944) {
        return $.extend({}, $.fn.combo.parseOptions(_944), $.parser.parseOptions(_944, ["sharedCalendar"]));
    };
    $.fn.datebox.defaults = $.extend({}, $.fn.combo.defaults, {
        panelWidth: 180, panelHeight: "auto", sharedCalendar: null, keyHandler: {
            up: function (e) {
            }, down: function (e) {
            }, left: function (e) {
            }, right: function (e) {
            }, enter: function (e) {
                _935(this);
            }, query: function (q, e) {
                _932(this, q);
            }
        }, currentText: "Today", closeText: "Close", okText: "Ok", buttons: [{
            text: function (_945) {
                return $(_945).datebox("options").currentText;
            }, handler: function (_946) {
                $(_946).datebox("calendar").calendar({ year: new Date().getFullYear(), month: new Date().getMonth() + 1, current: new Date() });
                _935(_946);
            }
        }, {
            text: function (_947) {
                return $(_947).datebox("options").closeText;
            }, handler: function (_948) {
                $(this).closest("div.combo-panel").panel("close");
            }
        }], formatter: function (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            return m + "/" + d + "/" + y;
        }, parser: function (s) {
            var t = Date.parse(s);
            if (!isNaN(t)) {
                return new Date(t);
            } else {
                return new Date();
            }
        }, onSelect: function (date) {
        }, onHidePanel:function(){ // 输入t后,tab或mouse点其它地,为框中赋值 by wanghc 20180925
            var q = $(this).combo("getText");
            _932(this, q, false);
        }
    });
})(jQuery);