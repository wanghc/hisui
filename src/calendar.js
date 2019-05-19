(function ($) {
    function _492(_493) {
        var opts = $.data(_493, "calendar").options;
        var t = $(_493);
        opts.fit ? $.extend(opts, t._fit()) : t._fit(false);
        var _494 = t.find(".calendar-header");
        t._outerWidth(opts.width);
        t._outerHeight(opts.height);
        t.find(".calendar-body")._outerHeight(t.height() - _494._outerHeight());
    };
    function init(_495) {
        $(_495).addClass("calendar").html("<div class=\"calendar-header\">" + "<div class=\"calendar-prevmonth\"></div>" + "<div class=\"calendar-nextmonth\"></div>" + "<div class=\"calendar-prevyear\"></div>" + "<div class=\"calendar-nextyear\"></div>" + "<div class=\"calendar-title\">" + "<span>Aprial 2010</span>" + "</div>" + "</div>" + "<div class=\"calendar-body\">" + "<div class=\"calendar-menu\">" + "<div class=\"calendar-menu-year-inner\">" + "<span class=\"calendar-menu-prev\"></span>" + "<span><input class=\"calendar-menu-year\" type=\"text\"></input></span>" + "<span class=\"calendar-menu-next\"></span>" + "</div>" + "<div class=\"calendar-menu-month-inner\">" + "</div>" + "</div>" + "</div>");
        $(_495).find(".calendar-title span").hover(function () {
            $(this).addClass("calendar-menu-hover");
        }, function () {
            $(this).removeClass("calendar-menu-hover");
        }).click(function () {
            var menu = $(_495).find(".calendar-menu");
            if (menu.is(":visible")) {
                menu.hide();
            } else {
                _49c(_495);
            }
        });
        $(".calendar-prevmonth,.calendar-nextmonth,.calendar-prevyear,.calendar-nextyear", _495).hover(function () {
            $(this).addClass("calendar-nav-hover");
        }, function () {
            $(this).removeClass("calendar-nav-hover");
        });
        $(_495).find(".calendar-nextmonth").click(function () {
            _496(_495, 1);
        });
        $(_495).find(".calendar-prevmonth").click(function () {
            _496(_495, -1);
        });
        $(_495).find(".calendar-nextyear").click(function () {
            _499(_495, 1);
        });
        $(_495).find(".calendar-prevyear").click(function () {
            _499(_495, -1);
        });
        $(_495).bind("_resize", function () {
            var opts = $.data(_495, "calendar").options;
            if (opts.fit == true) {
                _492(_495);
            }
            return false;
        });
    };
    function _496(_497, _498) {
        var opts = $.data(_497, "calendar").options;
        opts.month += _498;
        if (opts.month > 12) {
            opts.year++;
            opts.month = 1;
        } else {
            if (opts.month < 1) {
                opts.year--;
                opts.month = 12;
            }
        }
        show(_497);
        var menu = $(_497).find(".calendar-menu-month-inner");
        menu.find("td.calendar-selected").removeClass("calendar-selected");
        menu.find("td:eq(" + (opts.month - 1) + ")").addClass("calendar-selected");
    };
    function _499(_49a, _49b) {
        var opts = $.data(_49a, "calendar").options;
        opts.year += _49b;
        show(_49a);
        var menu = $(_49a).find(".calendar-menu-year");
        menu.val(opts.year);
    };
    function _49c(_49d) {
        var opts = $.data(_49d, "calendar").options;
        $(_49d).find(".calendar-menu").show();
        if ($(_49d).find(".calendar-menu-month-inner").is(":empty")) {
            $(_49d).find(".calendar-menu-month-inner").empty();
            var t = $("<table class=\"calendar-mtable\"></table>").appendTo($(_49d).find(".calendar-menu-month-inner"));
            var idx = 0;
            for (var i = 0; i < 3; i++) {
                var tr = $("<tr></tr>").appendTo(t);
                for (var j = 0; j < 4; j++) {
                    $("<td class=\"calendar-menu-month\"></td>").html(opts.months[idx++]).attr("abbr", idx).appendTo(tr);
                }
            }
            $(_49d).find(".calendar-menu-prev,.calendar-menu-next").hover(function () {
                $(this).addClass("calendar-menu-hover");
            }, function () {
                $(this).removeClass("calendar-menu-hover");
            });
            $(_49d).find(".calendar-menu-next").click(function () {
                var y = $(_49d).find(".calendar-menu-year");
                if (!isNaN(y.val())) {
                    y.val(parseInt(y.val()) + 1);
                    _49e();
                }
            });
            $(_49d).find(".calendar-menu-prev").click(function () {
                var y = $(_49d).find(".calendar-menu-year");
                if (!isNaN(y.val())) {
                    y.val(parseInt(y.val() - 1));
                    _49e();
                }
            });
            $(_49d).find(".calendar-menu-year").keypress(function (e) {
                if (e.keyCode == 13) {
                    _49e(true);
                }
            });
            $(_49d).find(".calendar-menu-month").hover(function () {
                $(this).addClass("calendar-menu-hover");
            }, function () {
                $(this).removeClass("calendar-menu-hover");
            }).click(function () {
                var menu = $(_49d).find(".calendar-menu");
                menu.find(".calendar-selected").removeClass("calendar-selected");
                $(this).addClass("calendar-selected");
                _49e(true);
            });
        }
        function _49e(_49f) {
            var menu = $(_49d).find(".calendar-menu");
            var year = menu.find(".calendar-menu-year").val();
            var _4a0 = menu.find(".calendar-selected").attr("abbr");
            if (!isNaN(year)) {
                opts.year = parseInt(year);
                opts.month = parseInt(_4a0);
                show(_49d);
            }
            if (_49f) {
                menu.hide();
            }
        };
        var body = $(_49d).find(".calendar-body");
        var sele = $(_49d).find(".calendar-menu");
        var _4a1 = sele.find(".calendar-menu-year-inner");
        var _4a2 = sele.find(".calendar-menu-month-inner");
        _4a1.find("input").val(opts.year).focus();
        _4a2.find("td.calendar-selected").removeClass("calendar-selected");
        _4a2.find("td:eq(" + (opts.month - 1) + ")").addClass("calendar-selected");
        sele._outerWidth(body._outerWidth());
        sele._outerHeight(body._outerHeight());
        _4a2._outerHeight(sele.height() - _4a1._outerHeight());
    };
    function _4a3(_4a4, year, _4a5) {
        var opts = $.data(_4a4, "calendar").options;
        var _4a6 = [];
        var _4a7 = new Date(year, _4a5, 0).getDate();
        for (var i = 1; i <= _4a7; i++) {
            _4a6.push([year, _4a5, i]);
        }
        var _4a8 = [], week = [];
        var _4a9 = -1;
        while (_4a6.length > 0) {
            var date = _4a6.shift();
            week.push(date);
            var day = new Date(date[0], date[1] - 1, date[2]).getDay();
            if (_4a9 == day) {
                day = 0;
            } else {
                if (day == (opts.firstDay == 0 ? 7 : opts.firstDay) - 1) {
                    _4a8.push(week);
                    week = [];
                }
            }
            _4a9 = day;
        }
        if (week.length) {
            _4a8.push(week);
        }
        var _4aa = _4a8[0];
        if (_4aa.length < 7) {
            while (_4aa.length < 7) {
                var _4ab = _4aa[0];
                var date = new Date(_4ab[0], _4ab[1] - 1, _4ab[2] - 1);
                _4aa.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
        } else {
            var _4ab = _4aa[0];
            var week = [];
            for (var i = 1; i <= 7; i++) {
                var date = new Date(_4ab[0], _4ab[1] - 1, _4ab[2] - i);
                week.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
            _4a8.unshift(week);
        }
        var _4ac = _4a8[_4a8.length - 1];
        while (_4ac.length < 7) {
            var _4ad = _4ac[_4ac.length - 1];
            var date = new Date(_4ad[0], _4ad[1] - 1, _4ad[2] + 1);
            _4ac.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
        }
        if (_4a8.length < 6) {
            var _4ad = _4ac[_4ac.length - 1];
            var week = [];
            for (var i = 1; i <= 7; i++) {
                var date = new Date(_4ad[0], _4ad[1] - 1, _4ad[2] + i);
                week.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
            _4a8.push(week);
        }
        return _4a8;
    };
    function show(_4ae) {
        var opts = $.data(_4ae, "calendar").options;
        if (opts.current && !opts.validator.call(_4ae, opts.current)) {
            opts.current = null;
        }
        var now = new Date();
        var _4af = now.getFullYear() + "," + (now.getMonth() + 1) + "," + now.getDate();
        var _4b0 = opts.current ? (opts.current.getFullYear() + "," + (opts.current.getMonth() + 1) + "," + opts.current.getDate()) : "";
        var _4b1 = 6 - opts.firstDay;
        var _4b2 = _4b1 + 1;
        if (_4b1 >= 7) {
            _4b1 -= 7;
        }
        if (_4b2 >= 7) {
            _4b2 -= 7;
        }
        $(_4ae).find(".calendar-title span").html(opts.months[opts.month - 1] + " " + opts.year);
        var body = $(_4ae).find("div.calendar-body");
        body.children("table").remove();
        var data = ["<table class=\"calendar-dtable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">"];
        data.push("<thead><tr>");
        for (var i = opts.firstDay; i < opts.weeks.length; i++) {
            data.push("<th>" + opts.weeks[i] + "</th>");
        }
        for (var i = 0; i < opts.firstDay; i++) {
            data.push("<th>" + opts.weeks[i] + "</th>");
        }
        data.push("</tr></thead>");
        data.push("<tbody>");
        var _4b3 = _4a3(_4ae, opts.year, opts.month);
        for (var i = 0; i < _4b3.length; i++) {
            var week = _4b3[i];
            var cls = "";
            if (i == 0) {
                cls = "calendar-first";
            } else {
                if (i == _4b3.length - 1) {
                    cls = "calendar-last";
                }
            }
            data.push("<tr class=\"" + cls + "\">");
            for (var j = 0; j < week.length; j++) {
                var day = week[j];
                var s = day[0] + "," + day[1] + "," + day[2];
                var _4b4 = new Date(day[0], parseInt(day[1]) - 1, day[2]);
                var d = opts.formatter.call(_4ae, _4b4);
                var css = opts.styler.call(_4ae, _4b4);
                var _4b5 = "";
                var _4b6 = "";
                if (typeof css == "string") {
                    _4b6 = css;
                } else {
                    if (css) {
                        _4b5 = css["class"] || "";
                        _4b6 = css["style"] || "";
                    }
                }
                var cls = "calendar-day";
                if (!(opts.year == day[0] && opts.month == day[1])) {
                    cls += " calendar-other-month";
                }
                if (s == _4af) {
                    cls += " calendar-today";
                }
                if (s == _4b0) {
                    cls += " calendar-selected";
                }
                if (j == _4b1) {
                    cls += " calendar-saturday";
                } else {
                    if (j == _4b2) {
                        cls += " calendar-sunday";
                    }
                }
                if (j == 0) {
                    cls += " calendar-first";
                } else {
                    if (j == week.length - 1) {
                        cls += " calendar-last";
                    }
                }
                cls += " " + _4b5;
                if (!opts.validator.call(_4ae, _4b4)) {
                    cls += " calendar-disabled";
                }
                data.push("<td class=\"" + cls + "\" abbr=\"" + s + "\" style=\"" + _4b6 + "\">" + d + "</td>");
            }
            data.push("</tr>");
        }
        data.push("</tbody>");
        data.push("</table>");
        body.append(data.join(""));
        var t = body.children("table.calendar-dtable").prependTo(body);
        t.find("td.calendar-day:not(.calendar-disabled)").hover(function () {
            $(this).addClass("calendar-hover");
        }, function () {
            $(this).removeClass("calendar-hover");
        }).click(function () {
            var _4b7 = opts.current;
            t.find(".calendar-selected").removeClass("calendar-selected");
            $(this).addClass("calendar-selected");
            var _4b8 = $(this).attr("abbr").split(",");
            opts.current = new Date(_4b8[0], parseInt(_4b8[1]) - 1, _4b8[2]);
            opts.onSelect.call(_4ae, opts.current);
            if (!_4b7 || _4b7.getTime() != opts.current.getTime()) {
                opts.onChange.call(_4ae, opts.current, _4b7);
            }
        });
    };
    $.fn.calendar = function (_4b9, _4ba) {
        if (typeof _4b9 == "string") {
            return $.fn.calendar.methods[_4b9](this, _4ba);
        }
        _4b9 = _4b9 || {};
        return this.each(function () {
            var _4bb = $.data(this, "calendar");
            if (_4bb) {
                $.extend(_4bb.options, _4b9);
            } else {
                _4bb = $.data(this, "calendar", { options: $.extend({}, $.fn.calendar.defaults, $.fn.calendar.parseOptions(this), _4b9) });
                init(this);
            }
            if (_4bb.options.border == false) {
                $(this).addClass("calendar-noborder");
            }
            _492(this);
            show(this);
            $(this).find("div.calendar-menu").hide();
        });
    };
    $.fn.calendar.methods = {
        options: function (jq) {
            return $.data(jq[0], "calendar").options;
        }, resize: function (jq) {
            return jq.each(function () {
                _492(this);
            });
        }, moveTo: function (jq, date) {
            return jq.each(function () {
                var opts = $(this).calendar("options");
                if (opts.validator.call(this, date)) {
                    var _4bc = opts.current;
                    $(this).calendar({ year: date.getFullYear(), month: date.getMonth() + 1, current: date });
                    if (!_4bc || _4bc.getTime() != date.getTime()) {
                        opts.onChange.call(this, opts.current, _4bc);
                    }
                }
            });
        }
    };
    $.fn.calendar.parseOptions = function (_4bd) {
        var t = $(_4bd);
        return $.extend({}, $.parser.parseOptions(_4bd, ["width", "height", { firstDay: "number", fit: "boolean", border: "boolean" }]));
    };
    $.fn.calendar.defaults = {
        width: 180, height: 180, fit: false, border: true, firstDay: 0, weeks: ["S", "M", "T", "W", "T", "F", "S"], months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], year: new Date().getFullYear(), month: new Date().getMonth() + 1, current: (function () {
            var d = new Date();
            return new Date(d.getFullYear(), d.getMonth(), d.getDate());
        })(), formatter: function (date) {
            return date.getDate();
        }, styler: function (date) {
            return "";
        }, validator: function (date) {
            return true;
        }, onSelect: function (date) {
        }, onChange: function (_4be, _4bf) {
        }
    };
})(jQuery);