(function ($) {
    var _73c;
    function _73d(_73e) {
        var _73f = $.data(_73e, "propertygrid");
        var opts = $.data(_73e, "propertygrid").options;
        $(_73e).datagrid($.extend({}, opts, {
            cls: "propertygrid", view: (opts.showGroup ? opts.groupView : opts.view), onClickRow: function (_740, row) {
                if (_73c != this) {
                    _741(_73c);
                    _73c = this;
                }
                if (opts.editIndex != _740 && row.editor) {
                    var col = $(this).datagrid("getColumnOption", "value");
                    col.editor = row.editor;
                    _741(_73c);
                    $(this).datagrid("beginEdit", _740);
                    $(this).datagrid("getEditors", _740)[0].target.focus();
                    opts.editIndex = _740;
                }
                opts.onClickRow.call(_73e, _740, row);
            }, loadFilter: function (data) {
                _741(this);
                return opts.loadFilter.call(this, data);
            }
        }));
        $(document).unbind(".propertygrid").bind("mousedown.propertygrid", function (e) {
            var p = $(e.target).closest("div.datagrid-view,div.combo-panel");
            if (p.length) {
                return;
            }
            _741(_73c);
            _73c = undefined;
        });
    };
    function _741(_742) {
        var t = $(_742);
        if (!t.length) {
            return;
        }
        var opts = $.data(_742, "propertygrid").options;
        var _743 = opts.editIndex;
        if (_743 == undefined) {
            return;
        }
        var ed = t.datagrid("getEditors", _743)[0];
        if (ed) {
            ed.target.blur();
            if (t.datagrid("validateRow", _743)) {
                t.datagrid("endEdit", _743);
            } else {
                t.datagrid("cancelEdit", _743);
            }
        }
        opts.editIndex = undefined;
    };
    $.fn.propertygrid = function (_744, _745) {
        if (typeof _744 == "string") {
            var _746 = $.fn.propertygrid.methods[_744];
            if (_746) {
                return _746(this, _745);
            } else {
                return this.datagrid(_744, _745);
            }
        }
        _744 = _744 || {};
        return this.each(function () {
            var _747 = $.data(this, "propertygrid");
            if (_747) {
                $.extend(_747.options, _744);
            } else {
                var opts = $.extend({}, $.fn.propertygrid.defaults, $.fn.propertygrid.parseOptions(this), _744);
                opts.frozenColumns = $.extend(true, [], opts.frozenColumns);
                opts.columns = $.extend(true, [], opts.columns);
                $.data(this, "propertygrid", { options: opts });
            }
            _73d(this);
        });
    };
    $.fn.propertygrid.methods = {
        options: function (jq) {
            return $.data(jq[0], "propertygrid").options;
        }
    };
    $.fn.propertygrid.parseOptions = function (_748) {
        return $.extend({}, $.fn.datagrid.parseOptions(_748), $.parser.parseOptions(_748, [{ showGroup: "boolean" }]));
    };
    var _749 = $.extend({}, $.fn.datagrid.defaults.view, {
        render: function (_74a, _74b, _74c) {
            var _74d = [];
            var _74e = this.groups;
            for (var i = 0; i < _74e.length; i++) {
                _74d.push(this.renderGroup.call(this, _74a, i, _74e[i], _74c));
            }
            $(_74b).html(_74d.join(""));
        }, renderGroup: function (_74f, _750, _751, _752) {
            var _753 = $.data(_74f, "datagrid");
            var opts = _753.options;
            var _754 = $(_74f).datagrid("getColumnFields", _752);
            var _755 = [];
            _755.push("<div class=\"datagrid-group\" group-index=" + _750 + ">");
            _755.push("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"height:100%\"><tbody>");
            _755.push("<tr>");
            if ((_752 && (opts.rownumbers || opts.frozenColumns.length)) || (!_752 && !(opts.rownumbers || opts.frozenColumns.length))) {
                _755.push("<td style=\"border:0;text-align:center;width:25px\"><span class=\"datagrid-row-expander datagrid-row-collapse\" style=\"display:inline-block;width:16px;height:16px;cursor:pointer\">&nbsp;</span></td>");
            }
            _755.push("<td style=\"border:0;\">");
            if (!_752) {
                _755.push("<span class=\"datagrid-group-title\">");
                _755.push(opts.groupFormatter.call(_74f, _751.value, _751.rows));
                _755.push("</span>");
            }
            _755.push("</td>");
            _755.push("</tr>");
            _755.push("</tbody></table>");
            _755.push("</div>");
            _755.push("<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>");
            var _756 = _751.startIndex;
            for (var j = 0; j < _751.rows.length; j++) {
                var css = opts.rowStyler ? opts.rowStyler.call(_74f, _756, _751.rows[j]) : "";
                var _757 = "";
                var _758 = "";
                if (typeof css == "string") {
                    _758 = css;
                } else {
                    if (css) {
                        _757 = css["class"] || "";
                        _758 = css["style"] || "";
                    }
                }
                var cls = "class=\"datagrid-row " + (_756 % 2 && opts.striped ? "datagrid-row-alt " : " ") + _757 + "\"";
                var _759 = _758 ? "style=\"" + _758 + "\"" : "";
                var _75a = _753.rowIdPrefix + "-" + (_752 ? 1 : 2) + "-" + _756;
                _755.push("<tr id=\"" + _75a + "\" datagrid-row-index=\"" + _756 + "\" " + cls + " " + _759 + ">");
                _755.push(this.renderRow.call(this, _74f, _754, _752, _756, _751.rows[j]));
                _755.push("</tr>");
                _756++;
            }
            _755.push("</tbody></table>");
            return _755.join("");
        }, bindEvents: function (_75b) {
            var _75c = $.data(_75b, "datagrid");
            var dc = _75c.dc;
            var body = dc.body1.add(dc.body2);
            var _75d = ($.data(body[0], "events") || $._data(body[0], "events")).click[0].handler;
            body.unbind("click").bind("click", function (e) {
                var tt = $(e.target);
                var _75e = tt.closest("span.datagrid-row-expander");
                if (_75e.length) {
                    var _75f = _75e.closest("div.datagrid-group").attr("group-index");
                    if (_75e.hasClass("datagrid-row-collapse")) {
                        $(_75b).datagrid("collapseGroup", _75f);
                    } else {
                        $(_75b).datagrid("expandGroup", _75f);
                    }
                } else {
                    _75d(e);
                }
                e.stopPropagation();
            });
        }, onBeforeRender: function (_760, rows) {
            var _761 = $.data(_760, "datagrid");
            var opts = _761.options;
            _762();
            var _763 = [];
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var _764 = _765(row[opts.groupField]);
                if (!_764) {
                    _764 = { value: row[opts.groupField], rows: [row] };
                    _763.push(_764);
                } else {
                    _764.rows.push(row);
                }
            }
            var _766 = 0;
            var _767 = [];
            for (var i = 0; i < _763.length; i++) {
                var _764 = _763[i];
                _764.startIndex = _766;
                _766 += _764.rows.length;
                _767 = _767.concat(_764.rows);
            }
            _761.data.rows = _767;
            this.groups = _763;
            var that = this;
            setTimeout(function () {
                that.bindEvents(_760);
            }, 0);
            function _765(_768) {
                for (var i = 0; i < _763.length; i++) {
                    var _769 = _763[i];
                    if (_769.value == _768) {
                        return _769;
                    }
                }
                return null;
            };
            function _762() {
                if (!$("#datagrid-group-style").length) {
                    $("head").append("<style id=\"datagrid-group-style\">" + ".datagrid-group{height:25px;overflow:hidden;font-weight:bold;border-bottom:1px solid #ccc;}" + "</style>");
                }
            };
        }
    });
    $.extend($.fn.datagrid.methods, {
        expandGroup: function (jq, _76a) {
            return jq.each(function () {
                var view = $.data(this, "datagrid").dc.view;
                var _76b = view.find(_76a != undefined ? "div.datagrid-group[group-index=\"" + _76a + "\"]" : "div.datagrid-group");
                var _76c = _76b.find("span.datagrid-row-expander");
                if (_76c.hasClass("datagrid-row-expand")) {
                    _76c.removeClass("datagrid-row-expand").addClass("datagrid-row-collapse");
                    _76b.next("table").show();
                }
                $(this).datagrid("fixRowHeight");
            });
        }, collapseGroup: function (jq, _76d) {
            return jq.each(function () {
                var view = $.data(this, "datagrid").dc.view;
                var _76e = view.find(_76d != undefined ? "div.datagrid-group[group-index=\"" + _76d + "\"]" : "div.datagrid-group");
                var _76f = _76e.find("span.datagrid-row-expander");
                if (_76f.hasClass("datagrid-row-collapse")) {
                    _76f.removeClass("datagrid-row-collapse").addClass("datagrid-row-expand");
                    _76e.next("table").hide();
                }
                $(this).datagrid("fixRowHeight");
            });
        }
    });
    $.fn.propertygrid.defaults = $.extend({}, $.fn.datagrid.defaults, {
        singleSelect: true, remoteSort: false, fitColumns: true, loadMsg: "", frozenColumns: [[{ field: "f", width: 16, resizable: false }]], columns: [[{ field: "name", title: "Name", width: 100, sortable: true }, { field: "value", title: "Value", width: 100, resizable: false }]], showGroup: false, groupView: _749, groupField: "group", groupFormatter: function (_770, rows) {
            return _770;
        }
    });
})(jQuery);