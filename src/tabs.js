(function ($) {
    function _2e8(_2e9) {
        var opts = $.data(_2e9, "tabs").options;
        if (opts.tabPosition == "left" || opts.tabPosition == "right" || !opts.showHeader) {
            return;
        }
        var _2ea = $(_2e9).children("div.tabs-header");
        var tool = _2ea.children("div.tabs-tool");
        var _2eb = _2ea.children("div.tabs-scroller-left");
        var _2ec = _2ea.children("div.tabs-scroller-right");
        var wrap = _2ea.children("div.tabs-wrap");
        var _2ed = _2ea.outerHeight();
        if (opts.plain) {
            _2ed -= _2ed - _2ea.height();
        }
        tool._outerHeight(_2ed);
        var _2ee = 0;
        $("ul.tabs li", _2ea).each(function () {
            _2ee += $(this).outerWidth(true);
        });
        var _2ef = _2ea.width() - tool._outerWidth();
        if (_2ee > _2ef) {
            _2eb.add(_2ec).show()._outerHeight(_2ed);
            if (opts.toolPosition == "left") {
                tool.css({ left: _2eb.outerWidth(), right: "" });
                wrap.css({ marginLeft: _2eb.outerWidth() + tool._outerWidth(), marginRight: _2ec._outerWidth(), width: _2ef - _2eb.outerWidth() - _2ec.outerWidth() });
            } else {
                tool.css({ left: "", right: _2ec.outerWidth() });
                wrap.css({ marginLeft: _2eb.outerWidth(), marginRight: _2ec.outerWidth() + tool._outerWidth(), width: _2ef - _2eb.outerWidth() - _2ec.outerWidth() });
            }
        } else {
            _2eb.add(_2ec).hide();
            if (opts.toolPosition == "left") {
                tool.css({ left: 0, right: "" });
                wrap.css({ marginLeft: tool._outerWidth(), marginRight: 0, width: _2ef });
            } else {
                tool.css({ left: "", right: 0 });
                wrap.css({ marginLeft: 0, marginRight: tool._outerWidth(), width: _2ef });
            }
        }
    };
    function _2f0(_2f1) {
        var opts = $.data(_2f1, "tabs").options;
        var _2f2 = $(_2f1).children("div.tabs-header");
        if (opts.tools) {
            if (typeof opts.tools == "string") {
                $(opts.tools).addClass("tabs-tool").appendTo(_2f2);
                $(opts.tools).show();
            } else {
                _2f2.children("div.tabs-tool").remove();
                var _2f3 = $("<div class=\"tabs-tool\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"height:100%\"><tr></tr></table></div>").appendTo(_2f2);
                var tr = _2f3.find("tr");
                for (var i = 0; i < opts.tools.length; i++) {
                    var td = $("<td></td>").appendTo(tr);
                    var tool = $("<a href=\"javascript:void(0);\"></a>").appendTo(td);
                    tool[0].onclick = eval(opts.tools[i].handler || function () {
                    });
                    tool.linkbutton($.extend({}, opts.tools[i], { plain: true }));
                }
            }
        } else {
            _2f2.children("div.tabs-tool").remove();
        }
    };
    function _2f4(_2f5) {
        var _2f6 = $.data(_2f5, "tabs");
        var opts = _2f6.options;
        var cc = $(_2f5);
        opts.fit ? $.extend(opts, cc._fit()) : cc._fit(false);
        cc.width(opts.width).height(opts.height);
        var _2f7 = $(_2f5).children("div.tabs-header");
        var _2f8 = $(_2f5).children("div.tabs-panels");
        var wrap = _2f7.find("div.tabs-wrap");
        var ul = wrap.find(".tabs");
        for (var i = 0; i < _2f6.tabs.length; i++) {
            var _2f9 = _2f6.tabs[i].panel("options");
            var p_t = _2f9.tab.find("a.tabs-inner");
            var _2fa = parseInt(_2f9.tabWidth || opts.tabWidth) || undefined;
            if (_2fa) {
                p_t._outerWidth(_2fa);
            } else {
                p_t.css("width", "");
            }
            p_t._outerHeight(opts.tabHeight);
            p_t.css("lineHeight", p_t.height() + "px");
        }
        if (opts.tabPosition == "left" || opts.tabPosition == "right") {
            _2f7._outerWidth(opts.showHeader ? opts.headerWidth : 0);
            _2f8._outerWidth(cc.width() - _2f7.outerWidth());
            _2f7.add(_2f8)._outerHeight(opts.height);
            wrap._outerWidth(_2f7.width());
            ul._outerWidth(wrap.width()).css("height", "");
        } else {
            var lrt = _2f7.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool");
            _2f7._outerWidth(opts.width).css("height", "");
            if (opts.showHeader) {
                _2f7.css("background-color", "");
                wrap.css("height", "");
                lrt.show();
            } else {
                _2f7.css("background-color", "transparent");
                _2f7._outerHeight(0);
                wrap._outerHeight(0);
                lrt.hide();
            }
            ul._outerHeight(opts.tabHeight).css("width", "");
            _2e8(_2f5);
            var _2fb = opts.height;
            if (!isNaN(_2fb)) {
                _2f8._outerHeight(_2fb - _2f7.outerHeight());
            } else {
                _2f8.height("auto");
            }
            var _2fa = opts.width;
            if (!isNaN(_2fa)) {
                _2f8._outerWidth(_2fa);
            } else {
                _2f8.width("auto");
            }
        }
    };
    function _2fc(_2fd) {
        var opts = $.data(_2fd, "tabs").options;
        var tab = _2fe(_2fd);
        if (tab) {
            var _2ff = $(_2fd).children("div.tabs-panels");
            var _300 = opts.width == "auto" ? "auto" : _2ff.width();
            var _301 = opts.height == "auto" ? "auto" : _2ff.height();
            tab.panel("resize", { width: _300, height: _301 });
        }
    };
    function _302(_303) {
        var tabs = $.data(_303, "tabs").tabs;
        var cc = $(_303);
        cc.addClass("tabs-container");
        var pp = $("<div class=\"tabs-panels\"></div>").insertBefore(cc);
        cc.children("div").each(function () {
            pp[0].appendChild(this);
        });
        cc[0].appendChild(pp[0]);
        $("<div class=\"tabs-header\">" + "<div class=\"tabs-scroller-left\"></div>" + "<div class=\"tabs-scroller-right\"></div>" + "<div class=\"tabs-wrap\">" + "<ul class=\"tabs\"></ul>" + "</div>" + "</div>").prependTo(_303);
        cc.children("div.tabs-panels").children("div").each(function (i) {
            var opts = $.extend({}, $.parser.parseOptions(this), { selected: ($(this).attr("selected") ? true : undefined) });
            var pp = $(this);
            tabs.push(pp);
            _310(_303, pp, opts);
        });
        cc.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function () {
            $(this).addClass("tabs-scroller-over");
        }, function () {
            $(this).removeClass("tabs-scroller-over");
        });
        cc.bind("_resize", function (e, _304) {
            var opts = $.data(_303, "tabs").options;
            if (opts.fit == true || _304) {
                _2f4(_303);
                _2fc(_303);
            }
            return false;
        });
    };
    function _305(_306) {
        var _307 = $.data(_306, "tabs");
        var opts = _307.options;
        $(_306).children("div.tabs-header").unbind().bind("click", function (e) {
            if ($(e.target).hasClass("tabs-scroller-left")) {
                $(_306).tabs("scrollBy", -opts.scrollIncrement);
            } else {
                if ($(e.target).hasClass("tabs-scroller-right")) {
                    $(_306).tabs("scrollBy", opts.scrollIncrement);
                } else {
                    var li = $(e.target).closest("li");
                    if (li.hasClass("tabs-disabled")) {
                        return;
                    }
                    var a = $(e.target).closest("a.tabs-close");
                    if (a.length) {
                        _321(_306, _308(li));
                    } else {
                        if (li.length) {
                            var _309 = _308(li);
                            var _30a = _307.tabs[_309].panel("options");
                            if (_30a.collapsible) {
                                _30a.closed ? _317(_306, _309) : _338(_306, _309);
                            } else {
                                _317(_306, _309);
                            }
                        }
                    }
                }
            }
        }).bind("contextmenu", function (e) {
            var li = $(e.target).closest("li");
            if (li.hasClass("tabs-disabled")) {
                return;
            }
            if (li.length) {
                opts.onContextMenu.call(_306, e, li.find("span.tabs-title").html(), _308(li));
            }
        });
        function _308(li) {
            var _30b = 0;
            li.parent().children("li").each(function (i) {
                if (li[0] == this) {
                    _30b = i;
                    return false;
                }
            });
            return _30b;
        };
    };
    function _30c(_30d) {
        var opts = $.data(_30d, "tabs").options;
        var _30e = $(_30d).children("div.tabs-header");
        var _30f = $(_30d).children("div.tabs-panels");
        _30e.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right");
        _30f.removeClass("tabs-panels-top tabs-panels-bottom tabs-panels-left tabs-panels-right");
        if (opts.tabPosition == "top") {
            _30e.insertBefore(_30f);
        } else {
            if (opts.tabPosition == "bottom") {
                _30e.insertAfter(_30f);
                _30e.addClass("tabs-header-bottom");
                _30f.addClass("tabs-panels-top");
            } else {
                if (opts.tabPosition == "left") {
                    _30e.addClass("tabs-header-left");
                    _30f.addClass("tabs-panels-right");
                } else {
                    if (opts.tabPosition == "right") {
                        _30e.addClass("tabs-header-right");
                        _30f.addClass("tabs-panels-left");
                    }
                }
            }
        }
        if (opts.plain == true) {
            _30e.addClass("tabs-header-plain");
        } else {
            _30e.removeClass("tabs-header-plain");
        }
        if (opts.border == true) {
            _30e.removeClass("tabs-header-noborder");
            _30f.removeClass("tabs-panels-noborder");
        } else {
            _30e.addClass("tabs-header-noborder");
            _30f.addClass("tabs-panels-noborder");
        }
    };
    function _310(_311, pp, _312) {
        var _313 = $.data(_311, "tabs");
        _312 = _312 || {};
        pp.panel($.extend({}, _312, {
            border: false, noheader: true, closed: true, doSize: false, iconCls: (_312.icon ? _312.icon : undefined), onLoad: function () {
                if (_312.onLoad) {
                    _312.onLoad.call(this, arguments);
                }
                _313.options.onLoad.call(_311, $(this));
            }
        }));
        var opts = pp.panel("options");
        var tabs = $(_311).children("div.tabs-header").find("ul.tabs");
        
        //cryze 2018-3-15  add class 'tab-brand' to first tab of BrandTabs
        if (!!_313.options.isBrandTabs && tabs.children('li').length==0) {
            opts.tab = $("<li class='tabs-brand'></li>").appendTo(tabs);
        }else{
            opts.tab = $("<li></li>").appendTo(tabs);
        }
        
        opts.tab.append("<a href=\"javascript:void(0)\" class=\"tabs-inner\">" + "<span class=\"tabs-title\"></span>" + "<span class=\"tabs-icon\"></span>" + "</a>");
        $(_311).tabs("update", { tab: pp, options: opts });
    };
    function _314(_315, _316) {
        var opts = $.data(_315, "tabs").options;
        var tabs = $.data(_315, "tabs").tabs;
        if (_316.selected == undefined) {
            _316.selected = true;
        }
        var pp = $("<div></div>").appendTo($(_315).children("div.tabs-panels"));
        tabs.push(pp);
        _310(_315, pp, _316);
        opts.onAdd.call(_315, _316.title, tabs.length - 1);
        _2f4(_315);
        if (_316.selected) {
            _317(_315, tabs.length - 1);
        }
    };
    function _318(_319, _31a) {
        var _31b = $.data(_319, "tabs").selectHis;
        var pp = _31a.tab;
        var _31c = pp.panel("options").title;
        pp.panel($.extend({}, _31a.options, { iconCls: (_31a.options.icon ? _31a.options.icon : undefined) }));
        var opts = pp.panel("options");
        var tab = opts.tab;
        var _31d = tab.find("span.tabs-title");
        var _31e = tab.find("span.tabs-icon");
        _31d.html(opts.title);
        _31e.attr("class", "tabs-icon");
        tab.find("a.tabs-close").remove();
        if (opts.closable) {
            _31d.addClass("tabs-closable");
            $("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
        } else {
            _31d.removeClass("tabs-closable");
        }
        if (opts.iconCls) {
            _31d.addClass("tabs-with-icon");
            _31e.addClass(opts.iconCls);
        } else {
            _31d.removeClass("tabs-with-icon");
        }
        if (_31c != opts.title) {
            for (var i = 0; i < _31b.length; i++) {
                if (_31b[i] == _31c) {
                    _31b[i] = opts.title;
                }
            }
        }
        tab.find("span.tabs-p-tool").remove();
        if (opts.tools) {
            var _31f = $("<span class=\"tabs-p-tool\"></span>").insertAfter(tab.find("a.tabs-inner"));
            if ($.isArray(opts.tools)) {
                for (var i = 0; i < opts.tools.length; i++) {
                    var t = $("<a href=\"javascript:void(0)\"></a>").appendTo(_31f);
                    t.addClass(opts.tools[i].iconCls);
                    if (opts.tools[i].handler) {
                        t.bind("click", { handler: opts.tools[i].handler }, function (e) {
                            if ($(this).parents("li").hasClass("tabs-disabled")) {
                                return;
                            }
                            e.data.handler.call(this);
                        });
                    }
                }
            } else {
                $(opts.tools).children().appendTo(_31f);
            }
            var pr = _31f.children().length * 12;
            if (opts.closable) {
                pr += 8;
            } else {
                pr -= 3;
                _31f.css("right", "5px");
            }
            _31d.css("padding-right", pr + "px");
        }
        _2f4(_319);
        $.data(_319, "tabs").options.onUpdate.call(_319, opts.title, _320(_319, pp));
    };
    function _321(_322, _323) {
        var opts = $.data(_322, "tabs").options;
        var tabs = $.data(_322, "tabs").tabs;
        var _324 = $.data(_322, "tabs").selectHis;
        if (!_325(_322, _323)) {
            return;
        }
        var tab = _326(_322, _323);
        var _327 = tab.panel("options").title;
        var _328 = _320(_322, tab);
        if (opts.onBeforeClose.call(_322, _327, _328) == false) {
            return;
        }
        var tab = _326(_322, _323, true);
        tab.panel("options").tab.remove();
        tab.panel("destroy");
        opts.onClose.call(_322, _327, _328);
        _2f4(_322);
        for (var i = 0; i < _324.length; i++) {
            if (_324[i] == _327) {
                _324.splice(i, 1);
                i--;
            }
        }
        var _329 = _324.pop();
        if (_329) {
            _317(_322, _329);
        } else {
            if (tabs.length) {
                _317(_322, 0);
            }
        }
    };
    function _326(_32a, _32b, _32c) {
        var tabs = $.data(_32a, "tabs").tabs;
        if (typeof _32b == "number") {
            if (_32b < 0 || _32b >= tabs.length) {
                return null;
            } else {
                var tab = tabs[_32b];
                if (_32c) {
                    tabs.splice(_32b, 1);
                }
                return tab;
            }
        }
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if (tab.panel("options").title == _32b) {
                if (_32c) {
                    tabs.splice(i, 1);
                }
                return tab;
            }
        }
        return null;
    };
    function _320(_32d, tab) {
        var tabs = $.data(_32d, "tabs").tabs;
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i][0] == $(tab)[0]) {
                return i;
            }
        }
        return -1;
    };
    function _2fe(_32e) {
        var tabs = $.data(_32e, "tabs").tabs;
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if (tab.panel("options").closed == false) {
                return tab;
            }
        }
        return null;
    };
    function _32f(_330) {   // init after  select one default selected tab
        var _331 = $.data(_330, "tabs");
        var tabs = _331.tabs;
        var isBrandTabs=!!_331.options.isBrandTabs;  //cryze 2018-3-15
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].panel("options").selected && !(isBrandTabs && i==0)) {  //cryze 2018-3-15
                _317(_330, i);
                return;
            }
        }
        if(isBrandTabs && _331.options.selected==0) _331.options.selected=1;   //cryze 2018-3-15
        _317(_330, _331.options.selected);
    };
    function _317(_332, _333) {
        var _334 = $.data(_332, "tabs");
        var opts = _334.options;
        var tabs = _334.tabs;
        var _335 = _334.selectHis;
        if (tabs.length == 0) {
            return;
        }
        var _336 = _326(_332, _333);
        if (!_336) {
            return;
        }
        var _337 = _2fe(_332);
        /*wanghc add onBeforeSelect event*/
        if (opts.onBeforeSelect) {
            if (false == opts.onBeforeSelect.call(_332, _336.panel("options").title, _320(_332, _336))) {
                return false;
            }
        }
        if (!!opts.isBrandTabs) { /*first tab  is brand tab  . wanghc */
            if (_320(_332, _336) == 0) {
                return false;
            }
        }
        if (_337) {
            if (_336[0] == _337[0]) {
                _2fc(_332);
                return;
            }
            _338(_332, _320(_332, _337));
            if (!_337.panel("options").closed) {
                return;
            }
        }
        _336.panel("open");
        var _339 = _336.panel("options").title;
        _335.push(_339);
        var tab = _336.panel("options").tab;
        tab.addClass("tabs-selected");
        var wrap = $(_332).find(">div.tabs-header>div.tabs-wrap");
        var left = tab.position().left;
        var _33a = left + tab.outerWidth();
        if (left < 0 || _33a > wrap.width()) {
            var _33b = left - (wrap.width() - tab.width()) / 2;
            $(_332).tabs("scrollBy", _33b);
        } else {
            $(_332).tabs("scrollBy", 0);
        }
        _2fc(_332);
        opts.onSelect.call(_332, _339, _320(_332, _336));
    };
    function _338(_33c, _33d) {
        var _33e = $.data(_33c, "tabs");
        var p = _326(_33c, _33d);
        if (p) {
            var opts = p.panel("options");
            if (!opts.closed) {
                p.panel("close");
                if (opts.closed) {
                    opts.tab.removeClass("tabs-selected");
                    _33e.options.onUnselect.call(_33c, opts.title, _320(_33c, p));
                }
            }
        }
    };
    function _325(_33f, _340) {
        return _326(_33f, _340) != null;
    };
    function _341(_342, _343) {
        var opts = $.data(_342, "tabs").options;
        opts.showHeader = _343;
        $(_342).tabs("resize");
    };
    $.fn.tabs = function (_344, _345) {
        if (typeof _344 == "string") {
            return $.fn.tabs.methods[_344](this, _345);
        }
        _344 = _344 || {};
        return this.each(function () {
            var _346 = $.data(this, "tabs");
            var opts;
            if (_346) {
                opts = $.extend(_346.options, _344);
                _346.options = opts;
            } else {
                $.data(this, "tabs", { options: $.extend({}, $.fn.tabs.defaults, $.fn.tabs.parseOptions(this), _344), tabs: [], selectHis: [] });
                _302(this);
            }
            _2f0(this);
            _30c(this);
            _2f4(this);
            _305(this);
            _32f(this);
        });
    };
    $.fn.tabs.methods = {
        options: function (jq) {
            var cc = jq[0];
            var opts = $.data(cc, "tabs").options;
            var s = _2fe(cc);
            opts.selected = s ? _320(cc, s) : -1;
            return opts;
        }, tabs: function (jq) {
            return $.data(jq[0], "tabs").tabs;
        }, resize: function (jq) {
            return jq.each(function () {
                _2f4(this);
                _2fc(this);
            });
        }, add: function (jq, _347) {
            return jq.each(function () {
                _314(this, _347);
            });
        }, close: function (jq, _348) {
            return jq.each(function () {
                _321(this, _348);
            });
        }, getTab: function (jq, _349) {
            return _326(jq[0], _349);
        }, getTabIndex: function (jq, tab) {
            return _320(jq[0], tab);
        }, getSelected: function (jq) {
            return _2fe(jq[0]);
        }, select: function (jq, _34a) {
            return jq.each(function () {
                _317(this, _34a);
            });
        }, unselect: function (jq, _34b) {
            return jq.each(function () {
                _338(this, _34b);
            });
        }, exists: function (jq, _34c) {
            return _325(jq[0], _34c);
        }, update: function (jq, _34d) {
            return jq.each(function () {
                _318(this, _34d);
            });
        }, enableTab: function (jq, _34e) {
            return jq.each(function () {
                $(this).tabs("getTab", _34e).panel("options").tab.removeClass("tabs-disabled");
            });
        }, disableTab: function (jq, _34f) {
            return jq.each(function () {
                $(this).tabs("getTab", _34f).panel("options").tab.addClass("tabs-disabled");
            });
        }, showHeader: function (jq) {
            return jq.each(function () {
                _341(this, true);
            });
        }, hideHeader: function (jq) {
            return jq.each(function () {
                _341(this, false);
            });
        }, scrollBy: function (jq, _350) {
            return jq.each(function () {
                var opts = $(this).tabs("options");
                var wrap = $(this).find(">div.tabs-header>div.tabs-wrap");
                var pos = Math.min(wrap._scrollLeft() + _350, _351());
                wrap.animate({ scrollLeft: pos }, opts.scrollDuration);
                function _351() {
                    var w = 0;
                    var ul = wrap.children("ul");
                    ul.children("li").each(function () {
                        w += $(this).outerWidth(true);
                    });
                    return w - wrap.width() + (ul.outerWidth() - ul.width());
                };
            });
        }
    };
    $.fn.tabs.parseOptions = function (_352) {
        return $.extend({}, $.parser.parseOptions(_352, ["width", "height", "tools", "toolPosition", "tabPosition", { fit: "boolean", border: "boolean", plain: "boolean", headerWidth: "number", tabWidth: "number", tabHeight: "number", selected: "number", showHeader: "boolean" }]));
    };
    $.fn.tabs.defaults = {
        width: "auto", height: "auto", headerWidth: 150, tabWidth: "auto", tabHeight: 27, selected: 0, showHeader: true, plain: false, fit: false, border: true, tools: null, toolPosition: "right", tabPosition: "top", scrollIncrement: 100, scrollDuration: 400, onLoad: function (_353) {
        }, onSelect: function (_354, _355) {
        }, onUnselect: function (_356, _357) {
        }, onBeforeClose: function (_358, _359) {
        }, onClose: function (_35a, _35b) {
        }, onAdd: function (_35c, _35d) {
        }, onUpdate: function (_35e, _35f) {
        }, onContextMenu: function (e, _360, _361) {
        }
    };
})(jQuery);