(function ($) {
    function _81(_82) {
        var _83 = $.data(_82, "pagination");
        var _84 = _83.options;
        var bb = _83.bb = {};
        var _85 = $(_82).addClass("pagination").html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr></tr></table>");
        var tr = _85.find("tr");
        var aa = $.extend([], _84.layout);
        if (!_84.showPageList) {
            _86(aa, "list");
        }
        if (!_84.showRefresh) {
            _86(aa, "refresh");
        }
        if (aa[0] == "sep") {
            aa.shift();
        }
        if (aa[aa.length - 1] == "sep") {
            aa.pop();
        }
        for (var _87 = 0; _87 < aa.length; _87++) {
            var _88 = aa[_87];
            if (_88 == "list") {
                var ps = $("<select class=\"pagination-page-list\"></select>");
                ps.bind("change", function () {
                    _84.pageSize = parseInt($(this).val());
                    _84.onChangePageSize.call(_82, _84.pageSize);
                    _8e(_82, _84.pageNumber);
                });
                for (var i = 0; i < _84.pageList.length; i++) {
                    $("<option></option>").text(_84.pageList[i]).appendTo(ps);
                }
                $("<td></td>").append(ps).appendTo(tr);
                //ps.combobox();
            } else {
                if (_88 == "sep") {
                    $("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
                } else {
                    if (_88 == "first") {
                        bb.first = _89("first");
                    } else {
                        if (_88 == "prev") {
                            bb.prev = _89("prev");
                        } else {
                            if (_88 == "next") {
                                bb.next = _89("next");
                            } else {
                                if (_88 == "last") {
                                    bb.last = _89("last");
                                } else {
                                    if (_88 == "manual") {
                                        $("<span style=\"padding-left:6px;\"></span>").html(_84.beforePageText).appendTo(tr).wrap("<td></td>");
                                        bb.num = $("<input class=\"pagination-num\" type=\"text\" value=\"1\" size=\"2\">").appendTo(tr).wrap("<td></td>");
                                        bb.num.unbind(".pagination").bind("keydown.pagination", function (e) {
                                            if (e.keyCode == 13) {
                                                var _8a = parseInt($(this).val()) || 1;
                                                _8e(_82, _8a);
                                                return false;
                                            }
                                        });
                                        bb.after = $("<span style=\"padding-right:6px;\"></span>").appendTo(tr).wrap("<td></td>");
                                    } else {
                                        if (_88 == "refresh") {
                                            bb.refresh = _89("refresh");
                                        } else {
                                            if (_88 == "links") {
                                                $("<td class=\"pagination-links\"></td>").appendTo(tr);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (_84.buttons) {
            $("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
            if ($.isArray(_84.buttons)) {
                for (var i = 0; i < _84.buttons.length; i++) {
                    var btn = _84.buttons[i];
                    if (btn == "-") {
                        $("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
                    } else {
                        var td = $("<td></td>").appendTo(tr);
                        var a = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
                        a[0].onclick = eval(btn.handler || function () {
                        });
                        a.linkbutton($.extend({}, btn, { plain: true }));
                    }
                }
            } else {
                var td = $("<td></td>").appendTo(tr);
                $(_84.buttons).appendTo(td).show();
            }
        }
        $("<div class=\"pagination-info\"></div>").appendTo(_85);
        $("<div style=\"clear:both;\"></div>").appendTo(_85);
        function _89(_8b) {
            var btn = _84.nav[_8b];
            var a = $("<a href=\"javascript:void(0)\"></a>").appendTo(tr);
            a.wrap("<td></td>");
            a.linkbutton({ iconCls: btn.iconCls, plain: true }).unbind(".pagination").bind("click.pagination", function () {
                btn.handler.call(_82);
            });
            return a;
        };
        function _86(aa, _8c) {
            var _8d = $.inArray(_8c, aa);
            if (_8d >= 0) {
                aa.splice(_8d, 1);
            }
            return aa;
        };
    };
    function _8e(_8f, _90) {
        var _91 = $.data(_8f, "pagination").options;
        _92(_8f, { pageNumber: _90 });
        _91.onSelectPage.call(_8f, _91.pageNumber, _91.pageSize);
    };
    function _92(_93, _94) {
        var _95 = $.data(_93, "pagination");
        var _96 = _95.options;
        var bb = _95.bb;
        $.extend(_96, _94 || {});
        var ps = $(_93).find("select.pagination-page-list");
        if (ps.length) {
            ps.val(_96.pageSize + "");
            _96.pageSize = parseInt(ps.val());
        }
        var _97 = Math.ceil(_96.total / _96.pageSize) || 1;
        if (_96.pageNumber < 1) {
            _96.pageNumber = 1;
        }
        if (_96.pageNumber > _97) {
            _96.pageNumber = _97;
        }
        if (bb.num) {
            bb.num.val(_96.pageNumber);
        }
        if (bb.after) {
            bb.after.html(_96.afterPageText.replace(/{pages}/, _97));
        }
        var td = $(_93).find("td.pagination-links");
        if (td.length) {
            td.empty();
            var _98 = _96.pageNumber - Math.floor(_96.links / 2);
            if (_98 < 1) {
                _98 = 1;
            }
            var _99 = _98 + _96.links - 1;
            if (_99 > _97) {
                _99 = _97;
            }
            _98 = _99 - _96.links + 1;
            if (_98 < 1) {
                _98 = 1;
            }
            for (var i = _98; i <= _99; i++) {
                var a = $("<a class=\"pagination-link\" href=\"javascript:void(0)\"></a>").appendTo(td);
                a.linkbutton({ plain: true, text: i });
                if (i == _96.pageNumber) {
                    a.linkbutton("select");
                } else {
                    a.unbind(".pagination").bind("click.pagination", { pageNumber: i }, function (e) {
                        _8e(_93, e.data.pageNumber);
                    });
                }
            }
        }
        var _9a = _96.displayMsg;
        _9a = _9a.replace(/{from}/, _96.total == 0 ? 0 : _96.pageSize * (_96.pageNumber - 1) + 1);
        _9a = _9a.replace(/{to}/, Math.min(_96.pageSize * (_96.pageNumber), _96.total));
        _9a = _9a.replace(/{total}/, _96.total);
        $(_93).find("div.pagination-info").html(_9a);
        if (bb.first) {
            bb.first.linkbutton({ disabled: (_96.pageNumber == 1) });
        }
        if (bb.prev) {
            bb.prev.linkbutton({ disabled: (_96.pageNumber == 1) });
        }
        if (bb.next) {
            bb.next.linkbutton({ disabled: (_96.pageNumber == _97) });
        }
        if (bb.last) {
            bb.last.linkbutton({ disabled: (_96.pageNumber == _97) });
        }
        _9b(_93, _96.loading);
    };
    function _9b(_9c, _9d) {
        var _9e = $.data(_9c, "pagination");
        var _9f = _9e.options;
        _9f.loading = _9d;
        if (_9f.showRefresh && _9e.bb.refresh) {
            _9e.bb.refresh.linkbutton({ iconCls: (_9f.loading ? "pagination-loading" : "pagination-load") });
        }
    };
    $.fn.pagination = function (_a0, _a1) {
        if (typeof _a0 == "string") {
            return $.fn.pagination.methods[_a0](this, _a1);
        }
        _a0 = _a0 || {};
        return this.each(function () {
            var _a2;
            var _a3 = $.data(this, "pagination");
            if (_a3) {
                _a2 = $.extend(_a3.options, _a0);
            } else {
                _a2 = $.extend({}, $.fn.pagination.defaults, $.fn.pagination.parseOptions(this), _a0);
                $.data(this, "pagination", { options: _a2 });
            }
            // pageSize不在pageList内时，增加到pageList内
            if ($.inArray(_a2.pageSize, _a2.pageList) == -1) {
                _a2.pageList.push(_a2.pageSize);
                _a2.pageList.sort(function (a, b) {
                    return a - b;
                });
            }
            _81(this);
            _92(this);
        });
    };
    $.fn.pagination.methods = {
        options: function (jq) {
            return $.data(jq[0], "pagination").options;
        }, loading: function (jq) {
            return jq.each(function () {
                _9b(this, true);
            });
        }, loaded: function (jq) {
            return jq.each(function () {
                _9b(this, false);
            });
        }, refresh: function (jq, _a4) {
            return jq.each(function () {
                _92(this, _a4);
            });
        }, select: function (jq, _a5) {
            return jq.each(function () {
                _8e(this, _a5);
            });
        }
    };
    $.fn.pagination.parseOptions = function (_a6) {
        var t = $(_a6);
        return $.extend({}, $.parser.parseOptions(_a6, [{ total: "number", pageSize: "number", pageNumber: "number", links: "number" }, { loading: "boolean", showPageList: "boolean", showRefresh: "boolean" }]), { pageList: (t.attr("pageList") ? eval(t.attr("pageList")) : undefined) });
    };
    $.fn.pagination.defaults = {
        total: 1, pageSize: 10, pageNumber: 1, pageList: [10, 20, 30, 50], loading: false, buttons: null, showPageList: true, showRefresh: true, links: 10, layout: ["list", "sep", "first", "prev", "sep", "manual", "sep", "next", "last", "sep", "refresh"], onSelectPage: function (_a7, _a8) {
        }, onBeforeRefresh: function (_a9, _aa) {
        }, onRefresh: function (_ab, _ac) {
        }, onChangePageSize: function (_ad) {
        }, beforePageText: "Page", afterPageText: "of {pages}", displayMsg: "Displaying {from} to {to} of {total} items", nav: {
            first: {
                iconCls: "pagination-first", handler: function () {
                    var _ae = $(this).pagination("options");
                    if (_ae.pageNumber > 1) {
                        $(this).pagination("select", 1);
                    }
                }
            }, prev: {
                iconCls: "pagination-prev", handler: function () {
                    var _af = $(this).pagination("options");
                    if (_af.pageNumber > 1) {
                        $(this).pagination("select", _af.pageNumber - 1);
                    }
                }
            }, next: {
                iconCls: "pagination-next", handler: function () {
                    var _b0 = $(this).pagination("options");
                    var _b1 = Math.ceil(_b0.total / _b0.pageSize);
                    if (_b0.pageNumber < _b1) {
                        $(this).pagination("select", _b0.pageNumber + 1);
                    }
                }
            }, last: {
                iconCls: "pagination-last", handler: function () {
                    var _b2 = $(this).pagination("options");
                    var _b3 = Math.ceil(_b2.total / _b2.pageSize);
                    if (_b2.pageNumber < _b3) {
                        $(this).pagination("select", _b3);
                    }
                }
            }, refresh: {
                iconCls: "pagination-refresh", handler: function () {
                    var _b4 = $(this).pagination("options");
                    if (_b4.onBeforeRefresh.call(this, _b4.pageNumber, _b4.pageSize) != false) {
                        $(this).pagination("select", _b4.pageNumber);
                        _b4.onRefresh.call(this, _b4.pageNumber, _b4.pageSize);
                    }
                }
            }
        }
    };
})(jQuery);