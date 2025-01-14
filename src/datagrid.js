(function ($) {
    var _501 = 0;
    function _502(a, o) {
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] == o) {
                return i;
            }
        }
        return -1;
    };
    function _503(a, o, id) {
        if (typeof o == "string") {
            for (var i = 0, len = a.length; i < len; i++) {
                if (a[i][o] == id) {
                    a.splice(i, 1);
                    return;
                }
            }
        } else {
            var _504 = _502(a, o);
            if (_504 != -1) {
                a.splice(_504, 1);
            }
        }
    };
    function _505(a, o, r) {
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i][o] == r[o]) {
                return;
            }
        }
        a.push(r);
    };
    // init
    function _506(_507) {
        var _508 = $.data(_507, "datagrid");
        var opts = _508.options;
        var _509 = _508.panel;
        var dc = _508.dc;
        var ss = null;
        if (opts.sharedStyleSheet) {
            ss = typeof opts.sharedStyleSheet == "boolean" ? "head" : opts.sharedStyleSheet;
        } else {
            ss = _509.closest("div.datagrid-view");
            if (!ss.length) {
                ss = dc.view;
            }
        }
        var cc = $(ss);
        var _50a = $.data(cc[0], "ss");
        if (!_50a) {
            _50a = $.data(cc[0], "ss", { cache: {}, dirty: [] });
        }
        return {
            add: function (_50b) {
                var ss = ["<style type=\"text/css\" hisui=\"true\">"];
                for (var i = 0; i < _50b.length; i++) {
                    _50a.cache[_50b[i][0]] = { width: _50b[i][1] ,fontSize:_50b[i][2],lineHeight:_50b[i][3]};
                }
                var _50c = 0;
                for (var s in _50a.cache) {
                    var item = _50a.cache[s];
                    item.index = _50c++;
                    ss.push(s + "{width:" + item.width +"}");
                }
                // 分开做二次循环,把与width无关的放到后面,不然会影响getRule(index)方法获得的样式类，set重写Width不正确，导致列头对不齐 2020-11-25
                for (var s in _50a.cache) {
                    var item = _50a.cache[s];
                    var mycls = "";
                    if (item.fontSize) { //不影响表格标题头 2020-11-13 wanghc
                        mycls += "font-size:"+item.fontSize+";";
                    }
                    if (item.lineHeight){
                        mycls += 'line-height:'+item.lineHeight+";";   
                    }
                    if (mycls!="") ss.push('.datagrid-row '+s+"{"+mycls+"}");    
                }
                ss.push("</style>");
                $(ss.join("\n")).appendTo(cc);
                cc.children("style[hisui]:not(:last)").remove();
            }, getRule: function (_50d) {
                var _50e = cc.children("style[hisui]:last")[0];
                var _50f = _50e.styleSheet ? _50e.styleSheet : (_50e.sheet || document.styleSheets[document.styleSheets.length - 1]);
                var _510 = _50f.cssRules || _50f.rules;
                return _510[_50d];
            }, set: function (_511, _512) {
                var item = _50a.cache[_511];
                if (item) {
                    item.width = _512;
                    var rule = this.getRule(item.index);
                    if (rule) {
                        rule.style["width"] = _512;
                    }
                }
            }, remove: function (_513) {
                var tmp = [];
                for (var s in _50a.cache) {
                    //界面有多个表格时如： _513 = ".datagrid-cell-c1"且s = ".datagrid-cell-c11-specimenName"，这时会误判
                    // if (s.indexOf(_513) == -1) {  // 2024-06-03 修改判断
                    if (s.indexOf(_513+'-') == -1) {  
                        tmp.push([s, _50a.cache[s].width]);
                    }
                }
                _50a.cache = {};
                this.add(tmp);
            }, dirty: function (_514) {
                if (_514) {
                    _50a.dirty.push(_514);
                }
            }, clean: function () {
                for (var i = 0; i < _50a.dirty.length; i++) {
                    this.remove(_50a.dirty[i]);
                }
                _50a.dirty = [];
            }
        };
    };
    function _515(_516, _517) {
        var opts = $.data(_516, "datagrid").options;
        var _518 = $.data(_516, "datagrid").panel;
        if (_517) {
            if (_517.width) {
                opts.width = _517.width;
            }
            if (_517.height) {
                opts.height = _517.height;
            }
        }
        if (opts.fit == true) {
            var p = _518.panel("panel").parent();
            // 解决tab-panel-border.debug.html演示问题，如果为0设置为1，解决tab切换后空白问题
            // 体检中心--个人预约界面--其他项目页签空白问题 datagrid的父不是panel是自己写的div,如果把parent的width设置为1，则后面fit时datagrid的宽也会为1  2020-06-04 
            if (p.hasClass('panel-body') && p.width()==0){p.width(1)}
            opts.width = p.width();
            opts.height = p.height();
        }
        _518.panel("resize", { width: opts.width, height: opts.height });
    };
    function _519(_51a) {
        var opts = $.data(_51a, "datagrid").options;
        var dc = $.data(_51a, "datagrid").dc;
        var wrap = $.data(_51a, "datagrid").panel;
        var _51b = wrap.width();
        var _51c = wrap.height();
        var view = dc.view;
        var _51d = dc.view1;
        var _51e = dc.view2;
        var _51f = _51d.children("div.datagrid-header");
        var _520 = _51e.children("div.datagrid-header");
        var _521 = _51f.find("table");
        var _522 = _520.find("table");
        view.width(_51b);
        var _523 = _51f.children("div.datagrid-header-inner").show();
        //console.log("rownumber-数字列的宽");
        //console.log(_523.find("table").width());
        _51d.width(_523.find("table").width());
        if (!opts.showHeader) {
            _523.hide();
        }
        _51e.width(_51b - _51d._outerWidth());
        _51d.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(_51d.width());
        _51e.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(_51e.width());
        var hh;
        _51f.css("height", "");
        _520.css("height", "");
        _521.css("height", "");
        _522.css("height", "");
        hh = Math.max(_521.height(), _522.height());
        if (hh>0){ // 在多页签界面,非激活状态的页签下datagrid定期刷新数据时，高度变成0问题处理 20240906 [4953831]
            _521.height(hh);
            _522.height(hh);
            _51f.add(_520)._outerHeight(hh);
        }
        if (opts.height != "auto") {
            var _524 = _51c - _51e.children("div.datagrid-header")._outerHeight() - _51e.children("div.datagrid-footer")._outerHeight() - wrap.children("div.datagrid-toolbar")._outerHeight()- wrap.children("div.datagrid-btoolbar")._outerHeight();
            wrap.children("div.datagrid-pager").each(function () {
                _524 -= $(this)._outerHeight();
            });
            dc.body1.add(dc.body2).children("table.datagrid-btable-frozen").css({ position: "absolute", top: dc.header2._outerHeight() });
            var _525 = dc.body2.children("table.datagrid-btable-frozen")._outerHeight();
            _51d.add(_51e).children("div.datagrid-body").css({ marginTop: _525, height: (_524 - _525) });
        }
        // 在多页签界面,非激活状态的页签下datagrid定期刷新数据时，高度变成0问题处理 20240906 [4953831]
        if (_51e.height()>0){  // 隐藏状态下_51e的高度是0,设置后，导致datagrid高度也为0了
            view.height(_51e.height());
        }
    };
    function _fixRowHeight(_527, _528, _529) {
        var rows = $.data(_527, "datagrid").data.rows;
        var opts = $.data(_527, "datagrid").options;
        var dc = $.data(_527, "datagrid").dc;
        if (!dc.body1.is(":empty") && (!opts.nowrap || opts.autoRowHeight || _529)) {
            if (_528 != undefined) {
                var tr1 = opts.finder.getTr(_527, _528, "body", 1);
                var tr2 = opts.finder.getTr(_527, _528, "body", 2);
                _52a(tr1, tr2);
            } else {
                var tr1 = opts.finder.getTr(_527, 0, "allbody", 1);
                var tr2 = opts.finder.getTr(_527, 0, "allbody", 2);
                _52a(tr1, tr2);
                if (opts.showFooter) {
                    var tr1 = opts.finder.getTr(_527, 0, "allfooter", 1);
                    var tr2 = opts.finder.getTr(_527, 0, "allfooter", 2);
                    _52a(tr1, tr2);
                }
            }
        }
        _519(_527);
        if (opts.height == "auto") {
            var _52b = dc.body1.parent();
            var _52c = dc.body2;
            var _52d = _52e(_52c);
            var _52f = _52d.height;
            if (_52d.width > _52c.width()) {
                _52f += 18;
            }
            _52b.height(_52f);
            _52c.height(_52f);
            dc.view.height(dc.view2.height());
        }
        dc.body2.triggerHandler("scroll");
        function _52a(trs1, trs2) {
            // 把数字rownumbers列表与内容列表的高度同步
            // 比如nowrap:false且内容要折行时,会导致运行慢。500行*7列花费10秒左右, 慢在设置数字rownumbers列与内容列的tr的高度上，保证二边view高度一样
            // 当nowrap:false时，可以把rownumbers设置成false，这样就不会慢了
            for (var i = 0; i < trs2.length; i++) {
                var tr1 = $(trs1[i]);
                var tr2 = $(trs2[i]);
                tr1.css("height", "");
                tr2.css("height", "");
                var _530 = Math.max(tr1.height(), tr2.height());
                tr1.css("height", _530);
                tr2.css("height", _530);
            }
        };
        function _52e(cc) {
            var _531 = 0;
            var _532 = 0;
            $(cc).children().each(function () {
                var c = $(this);
                if (c.is(":visible")) {
                    _532 += c._outerHeight();
                    if (_531 < c._outerWidth()) {
                        _531 = c._outerWidth();
                    }
                }
            });
            return { width: _531, height: _532 };
        };
    };
    function _533(_534, _535) {
        var _536 = $.data(_534, "datagrid");
        var opts = _536.options;
        var dc = _536.dc;
        if (!dc.body2.children("table.datagrid-btable-frozen").length) {
            dc.body1.add(dc.body2).prepend("<table class=\"datagrid-btable datagrid-btable-frozen\" cellspacing=\"0\" cellpadding=\"0\"></table>");
        }
        _537(true);
        _537(false);
        _519(_534);
        function _537(_538) {
            var _539 = _538 ? 1 : 2;
            var tr = opts.finder.getTr(_534, _535, "body", _539);
            (_538 ? dc.body1 : dc.body2).children("table.datagrid-btable-frozen").append(tr);
        };
    };
    function _53a(_53b, _53c) {
        function _53d() {
            var _53e = [];
            var _53f = [];
            $(_53b).children("thead").each(function () {
                var opt = $.parser.parseOptions(this, [{ frozen: "boolean" }]);
                $(this).find("tr").each(function () {
                    var cols = [];
                    $(this).find("th").each(function () {
                        var th = $(this);
                        var col = $.extend({}, $.parser.parseOptions(this, ["field", "align", "halign", "order", { sortable: "boolean", checkbox: "boolean", resizable: "boolean", fixed: "boolean" }, { rowspan: "number", colspan: "number", width: "number" }]), { title: (th.html() || undefined), hidden: (th.attr("hidden") ? true : undefined), formatter: (th.attr("formatter") ? eval(th.attr("formatter")) : undefined), styler: (th.attr("styler") ? eval(th.attr("styler")) : undefined), sorter: (th.attr("sorter") ? eval(th.attr("sorter")) : undefined) });
                        if (th.attr("editor")) {
                            var s = $.trim(th.attr("editor"));
                            if (s.substr(0, 1) == "{") {
                                col.editor = eval("(" + s + ")");
                            } else {
                                col.editor = s;
                            }
                        }
                        cols.push(col);
                    });
                    opt.frozen ? _53e.push(cols) : _53f.push(cols);
                });
            });
            return [_53e, _53f];
        };
        var _540 = $("<div class=\"datagrid-wrap\">" + "<div class=\"datagrid-view\">" + "<div class=\"datagrid-view1\">" + "<div class=\"datagrid-header\">" + "<div class=\"datagrid-header-inner\"></div>" + "</div>" + "<div class=\"datagrid-body\">" + "<div class=\"datagrid-body-inner\"></div>" + "</div>" + "<div class=\"datagrid-footer\">" + "<div class=\"datagrid-footer-inner\"></div>" + "</div>" + "</div>" + "<div class=\"datagrid-view2\">" + "<div class=\"datagrid-header\">" + "<div class=\"datagrid-header-inner\"></div>" + "</div>" + "<div class=\"datagrid-body\"></div>" + "<div class=\"datagrid-footer\">" + "<div class=\"datagrid-footer-inner\"></div>" + "</div>" + "</div>" + "</div>" + "</div>").insertAfter(_53b);
        _540.panel({ doSize: false });
        _540.panel("panel").addClass("datagrid").bind("_resize", function (e, _541) {
            var opts = $.data(_53b, "datagrid").options;
            if (opts.fit == true || _541) {
                _515(_53b);
                setTimeout(function () {
                    if ($.data(_53b, "datagrid")) {
                        _542(_53b);
                    }
                }, 0);
            }
            return false;
        });
        //wanghc 2018-1-11 add code --> addClass("datagrid-f") ---> treegrid->checkbox-bind rowevent
        $(_53b).addClass("datagrid-f").hide().appendTo(_540.children("div.datagrid-view"));
        var cc = _53d();
        var view = _540.children("div.datagrid-view");
        var _543 = view.children("div.datagrid-view1");
        var _544 = view.children("div.datagrid-view2");
        return { panel: _540, frozenColumns: cc[0], columns: cc[1], dc: { view: view, view1: _543, view2: _544, header1: _543.children("div.datagrid-header").children("div.datagrid-header-inner"), header2: _544.children("div.datagrid-header").children("div.datagrid-header-inner"), body1: _543.children("div.datagrid-body").children("div.datagrid-body-inner"), body2: _544.children("div.datagrid-body"), footer1: _543.children("div.datagrid-footer").children("div.datagrid-footer-inner"), footer2: _544.children("div.datagrid-footer").children("div.datagrid-footer-inner") } };
    };
    function _545(_546) {
        var _547 = $.data(_546, "datagrid");
        var opts = _547.options;
        var dc = _547.dc;
        var _548 = _547.panel;
        _547.ss = $(_546).datagrid("createStyleSheet");
        _548.panel($.extend({}, opts, {
            id: null, doSize: false, onResize: function (_549, _54a) {
                setTimeout(function () {
                    if ($.data(_546, "datagrid")) {
                        _519(_546);
                        _579(_546);
                        opts.onResize.call(_548, _549, _54a);
                    }
                }, 0);
            }, onExpand: function () {
                _fixRowHeight(_546);
                opts.onExpand.call(_548);
            }
        }));
        _547.rowIdPrefix = "datagrid-row-r" + (++_501);
        _547.cellClassPrefix = "datagrid-cell-c" + _501;
        _54b(dc.header1, opts.frozenColumns, true);
        _54b(dc.header2, opts.columns, false);
        _54c();
        dc.header1.add(dc.header2).css("display", opts.showHeader ? "block" : "none");
        dc.footer1.add(dc.footer2).css("display", opts.showFooter ? "block" : "none");
        if (opts.toolbar) {
            if ($.isArray(opts.toolbar)) {
                $("div.datagrid-toolbar", _548).remove();
                var tb = $("<div class=\"datagrid-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(_548);
                var tr = tb.find("tr");
                for (var i = 0; i < opts.toolbar.length; i++) {
                    var btn = opts.toolbar[i];
                    if (btn == "-") {
                        $("<td><div class=\"datagrid-btn-separator\"></div></td>").appendTo(tr);
                    } else if ('undefined' != typeof btn.type) { /*20220817 增加input类型处理*/
                        if (btn.type == 'input') {
                            var _myinput = $('<td><input class="' + btn.class + '" placeholder="' + btn.placeholder + '"/></td>').appendTo(tr);
                            _myinput.on('keydown',eval(btn.handler || function () {}));
                        } else if (btn.type=="combobox"){
                            var _myinput = $('<td><label class="'+btn.lclass+'">'+btn.label+'</label><input class="' + btn.iclass + '"/></td>').appendTo(tr);
                            _myinput.find('input').eq(0).combobox(btn);
                        }
                    }else {
                        var td = $("<td></td>").appendTo(tr);
                        var tool = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
                        tool[0].onclick = eval(btn.handler || function () {
                        });
                        tool.linkbutton($.extend({}, btn, { plain: true }));
                    }
                }
            } else {
                $(opts.toolbar).addClass("datagrid-toolbar").prependTo(_548);
                $(opts.toolbar).show();
            }
        } else {
            $("div.datagrid-toolbar", _548).remove();
        }
        $("div.datagrid-pager", _548).remove();
        if (opts.pagination) {
            var _54d = $("<div class=\"datagrid-pager\"></div>");
            if (opts.pagePosition == "bottom") {
                _54d.appendTo(_548);
            } else {
                if (opts.pagePosition == "top") {
                    _54d.addClass("datagrid-pager-top").prependTo(_548);
                } else {
                    var ptop = $("<div class=\"datagrid-pager datagrid-pager-top\"></div>").prependTo(_548);
                    _54d.appendTo(_548);
                    _54d = _54d.add(ptop);
                }
            }
            _54d.pagination({
                // 翻页到第2页然后再运行$('#id').datagrid({loadFilter:pagerFilter}).datagrid('loadData', rs)
                // 会进入初始化方法,此时opts.pageNumber=2,如果total:0与真实total不一致
                //  total:0,
                total:opts.pageNumber==1?0:(opts.pageNumber * opts.pageSize),  //cryze 2020-05-22 分页条初始total改为0 在datagrid为lazy或者其它情况一开始没加载数据时显示不正确
                pageNumber: opts.pageNumber, 
                showRefresh: opts.showRefresh,  // wanghc 2018-1-29
                showPageList:opts.showPageList, // wanghc 2018-1-29
                afterPageText:opts.afterPageText,// wanghc 2018-1-29
                beforePageText:opts.beforePageText,// wanghc 2018-1-29
                displayMsg:opts.displayMsg,// wanghc 2018-1-29
                pageSize: opts.pageSize, 
                pageList: opts.pageList, 
                onSelectPage: function (_54e, _54f) {
                    opts.pageNumber = _54e;
                    opts.pageSize = _54f;
                    _54d.pagination("refresh", { pageNumber: _54e, pageSize: _54f });
                    _577(_546);
                }
            });
            opts.pageSize = _54d.pagination("options").pageSize;
        }
        // wanghc 初始化时,增加加滚动条 2018-12-20
        dc.body2.html("<div style='width:"+dc.view2.find('.datagrid-header-row').width()+"px;border:solid 0px;height:1px;'></div>");
        //_54b => renderGridHeader
        function _54b(_550, _551, _552) {
            if (!_551) {
                return;
            }
            $(_550).show();
            $(_550).empty();
            var _553 = [];
            var _554 = [];
            if (opts.sortName) {
                _553 = opts.sortName.split(",");
                _554 = opts.sortOrder.split(",");
            }
            //var tmpclone = $(_550).clone()[0];  //add by lan---2018-12-19 先clone一个节点,生成grid,生成完后再置回
            var t = $("<table class=\"datagrid-htable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody></tbody></table>").appendTo(_550);
            for (var i = 0; i < _551.length; i++) {
                // 2020-05-14 列头高度     -- nurse - yucz 2019-9-26
                var temptr = "<tr class=\"datagrid-header-row ";
                if (!opts.titleNoWrap) temptr += "datagrid-header-autowrap ";
                if (opts.id) temptr += opts.id + "-header-row" + i ; //第i行
                temptr += "\"></tr>";
                var tr = $(temptr).appendTo($("tbody", t));
                var cols = _551[i];
                for (var j = 0; j < cols.length; j++) {
                    var col = cols[j];
                    var attr = "";
                    if (col.rowspan) {
                        attr += "rowspan=\"" + col.rowspan + "\" ";
                    }
                    if (col.colspan) {
                        attr += "colspan=\"" + col.colspan + "\" ";
                    }
                    var td = $("<td " + attr + "></td>").appendTo(tr);
                    if (col.checkbox) {
                        td.attr("field", col.field);
                        $("<div class=\"datagrid-header-check\"></div>").html("<input type=\"checkbox\"/>").appendTo(td);
                    } else {
                        if (col.field) {
                            td.attr("field", col.field)
                            if ("undefined"!=typeof col.columnHeaderTitle && col.columnHeaderTitle) {
                                td.attr("title",col.columnHeaderTitle);
                                td.addClass('datagrid-header-col-tip');
                                td.tooltip({
                                    position:'bottom',
                                    trackMouse:false
                                });
                            }
                            td.append("<div class=\"datagrid-cell\"><span></span><span class=\"datagrid-sort-icon\"></span></div>");
                            var titleTr = col.title;
                            if (true != col.hidden) titleTr = $.hisui.getTrans(col.title); // 隐藏列头不翻译 需求号:3017058
                            if (col.headerCheckbox) {
                                titleTr += '<input type="checkbox" class="">';
                                td.attr('header-checkbox','true');
                            }
                            $("span", td).html( titleTr );  //add trans
                            $("span.datagrid-sort-icon", td).html(""); //html("&nbsp;");-html(""); neer 2019-4-4 当align:'right'时列头与内容没对齐
                           var cell = td.find("div.datagrid-cell");
                            var pos = _502(_553, col.field);
                            if (pos >= 0) {
                                cell.addClass("datagrid-sort-" + _554[pos]);
                            }
                            // 2022-06-30 区分能排序列 , 查看http://www.jeasyui.com/tutorial/datagrid/datagrid8_demo.html实现
                            if(col.sortable){
                                cell.addClass("datagrid-sort");
                            }
                            if (col.resizable == false) {
                                cell.attr("resizable", "false");
                            }
                            if (col.width) {
                                cell._outerWidth(col.width);
                                col.boxWidth = parseInt(cell[0].style.width);
                            } else {
                                col.auto = true;
                            }
                            cell.css("text-align", (col.halign || col.align || ""));
                            col.cellClass = _547.cellClassPrefix + "-" + col.field.replace(/[\.|\s]/g, "-");
                            cell.addClass(col.cellClass).css("width", "");
                            if (col.headerCheckbox) { // 生成列头上的勾选框, 实现全选/全取消功能
                                $('input[type="checkbox"]', cell).checkbox({
                                    id: col.cellClass+ "cb",
                                    onCheckChange: function (e, value) {
                                        var myField = $(e.target).closest('td').attr('field'); // col.field-->总是指向最后一列的col
                                        if (value) {
                                            _checkHeaderCheckbox($(e.target).closest('.datagrid-view2'),myField);
                                        } else {
                                            _uncheckHeaderCheckbox($(e.target).closest('.datagrid-view2'), myField);
                                        }
                                }});
                            }
                        } else {
                            //$("<div class=\"datagrid-cell-group\"></div>").html($.hisui.getTrans(col.title)).appendTo(td);   //add trans //这是原来的代码，下面是新加的
                            // add yucz 2019-9-26 支持不固定的标题行
                            td.append("<div class=\"datagrid-cell-group\"><span></span></div>");
                            $("span", td).html($.hisui.getTrans(col.title));
                            var cell = td.find("div.datagrid-cell-group");
                            cell.css("height", "auto");
                            if (col.halign||col.align) cell.css("text-align", (col.halign || col.align || ""));
                        }
                    }
                    if (col.hidden) {
                        td.hide();
                    }
                }
            }
            if (_552 && opts.rownumbers) {
                var td = $("<td rowspan=\"" + opts.frozenColumns.length + "\"><div class=\"datagrid-header-rownumber\">"+$.hisui.getTrans($.hisui.getStyleCodeConfigValue("datagridRowNumberHeaderTitle"))+"</div></td>");
                if ($("tr", t).length == 0) {
                    var myFrozenColumnsTr = '<tr class="datagrid-header-row';
                    if (!opts.titleNoWrap) myFrozenColumnsTr += ' datagrid-header-autowrap';
                    myFrozenColumnsTr +='"></tr>';
                    td.wrap(myFrozenColumnsTr).parent().appendTo($("tbody", t));
                } else {
                    td.prependTo($("tr:first", t));
                }
            }
            //$(_550).replaceWith(tmpclone);  //add lan 2018-12-19
        };
        function _54c() {
            var _555 = [];
            var _556 = _557(_546, true).concat(_557(_546));
            for (var i = 0; i < _556.length; i++) {
                var col = _getColumnOption(_546, _556[i]);
                if (col && !col.checkbox) {
                    _555.push(["." + col.cellClass, col.boxWidth ? col.boxWidth + "px" : "auto",(col.fontSize?col.fontSize+"px":(opts.fontSize?opts.fontSize+"px":"")),(col.lineHeight?col.lineHeight+"px":(opts.lineHeight?opts.lineHeight+"px":""))]);
                }
            }
            _547.ss.add(_555);
            _547.ss.dirty(_547.cellSelectorPrefix);
            _547.cellSelectorPrefix = "." + _547.cellClassPrefix;
        };

        if (opts.btoolbar) {
            if ($.isArray(opts.btoolbar)) {
                $("div.datagrid-btoolbar", _548).remove();
                var tb = $("<div class=\"datagrid-btoolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").appendTo(_548);
                var tr = tb.find("tr");
                for (var i = 0; i < opts.btoolbar.length; i++) {
                    var btn = opts.btoolbar[i];
                    if (btn == "-") {
                        $("<td><div class=\"datagrid-btn-separator\"></div></td>").appendTo(tr);
                    } else {
                        var td = $("<td></td>").appendTo(tr);
                        var tool = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
                        tool[0].onclick = eval(btn.handler || function () {
                        });
                        tool.linkbutton($.extend({}, btn, { plain: true }));
                    }
                }
            } else {
                $(opts.btoolbar).addClass("datagrid-btoolbar").appendTo(_548);
                $(opts.btoolbar).show();
            }
        } else {
            $("div.datagrid-btoolbar", _548).remove();
        }
    };
    function _559(_55a) {
        var _55b = $.data(_55a, "datagrid");
        var _55c = _55b.panel;
        var opts = _55b.options;
        var dc = _55b.dc;
        var _55d = dc.header1.add(dc.header2);
        /* 不是所有列头上的勾选框都控制行记录 20230710 */
        /* 新要求是每列自己的列头勾选控制当前列的勾 */
        _55d.find(".datagrid-header-check input[type=checkbox]").unbind(".datagrid").bind("click.datagrid", function (e) {
            if (opts.singleSelect && opts.selectOnCheck) {
                return false;
            }
            if ($(this).is(":checked")) {
                _5df(_55a);
            } else {
                _uncheckAll(_55a);
            }
            e.stopPropagation();
        });
        var _55e = _55d.find("div.datagrid-cell");
        _55e.closest("td").unbind(".datagrid").bind("mouseenter.datagrid", function () {
            if (_55b.resizing) {
                return;
            }
            $(this).addClass("datagrid-header-over");
        }).bind("mouseleave.datagrid", function () {
            $(this).removeClass("datagrid-header-over");
        }).bind("contextmenu.datagrid", function (e) {
            var _55f = $(this).attr("field");
            opts.onHeaderContextMenu.call(_55a, e, _55f);
        }).bind("dblclick.datagrid", function (e) {   //cryze 双击列头事件 和表头右键菜单的监听放在一起
            var _55f = $(this).attr("field");
            if (opts.editColumnsPage != null) {
                e.preventDefault();
                var flag = 1;
                if (null != opts.editColumnsGrantUrl) $.ajax({ url: opts.editColumnsGrantUrl, async: false, dataType: 'text', success: function (rtn) { flag = rtn; } });
                // window的zindex使用了$.fn.window.default.zIndex++, combo使用了$.fn.menu.default.zIndex++, 导致在combo列头上又出弹出的window会被下拉层覆盖，修改成window.open
                if(flag==1) window.open(opts.editColumnsPage,"_blank","top=50,left=100,width=1000,height=800,titlebar=no,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes");
                return false;
            }else{
                opts.onDblClickHeader.call(_55a, e, _55f);
            }
        })
        _55e.unbind(".datagrid").bind("click.datagrid", function (e) {
            var p1 = $(this).offset().left + 5;
            var p2 = $(this).offset().left + $(this)._outerWidth() - 5;
            if (e.pageX < p2 && e.pageX > p1) {
                _56c(_55a, $(this).parent().attr("field"));
            }
        }).bind("dblclick.datagrid", function (e) {
            var p1 = $(this).offset().left + 5;
            var p2 = $(this).offset().left + $(this)._outerWidth() - 5;
            var cond = opts.resizeHandle == "right" ? (e.pageX > p2) : (opts.resizeHandle == "left" ? (e.pageX < p1) : (e.pageX < p1 || e.pageX > p2));
            if (cond) {
                var _560 = $(this).parent().attr("field");
                var col = _getColumnOption(_55a, _560);
                if (col.resizable == false) {
                    return;
                }
                $(_55a).datagrid("autoSizeColumn", _560);
                col.auto = false;
            }
        });
        var _561 = opts.resizeHandle == "right" ? "e" : (opts.resizeHandle == "left" ? "w" : "e,w");
        _55e.each(function () {
            $(this).resizable({
                handles: _561, disabled: ($(this).attr("resizable") ? $(this).attr("resizable") == "false" : false), minWidth: 25, onStartResize: function (e) {
                    _55b.resizing = true;
                    _55d.css("cursor", $("body").css("cursor"));
                    if (!_55b.proxy) {
                        _55b.proxy = $("<div class=\"datagrid-resize-proxy\"></div>").appendTo(dc.view);
                    }
                    _55b.proxy.css({ left: e.pageX - $(_55c).offset().left - 1, display: "none" });
                    setTimeout(function () {
                        if (_55b.proxy) {
                            _55b.proxy.show();
                        }
                    }, 500);
                }, onResize: function (e) {
                    _55b.proxy.css({ left: e.pageX - $(_55c).offset().left - 1, display: "block" });
                    return false;
                }, onStopResize: function (e) {
                    _55d.css("cursor", "");
                    $(this).css("height", "");
                    $(this)._outerWidth($(this)._outerWidth());
                    var _562 = $(this).parent().attr("field");
                    var col = _getColumnOption(_55a, _562);
                    col.width = $(this)._outerWidth();
                    col.boxWidth = parseInt(this.style.width);
                    col.auto = undefined;
                    $(this).css("width", "");
                    _542(_55a, _562);
                    _55b.proxy.remove();
                    _55b.proxy = null;
                    if ($(this).parents("div:first.datagrid-header").parent().hasClass("datagrid-view1")) {
                        _519(_55a);
                    }
                    _579(_55a);
                    opts.onResizeColumn.call(_55a, _562, col.width);
                    setTimeout(function () {
                        _55b.resizing = false;
                    }, 0);
                }
            });
        });
        function dgBodyClickFun(e){  //原click事件
            var tt = $(e.target);
            var tr = tt.closest("tr.datagrid-row");
            if (!isValidTr(tr)) {
                return;
            }
            var rowIndex = getRowIndexByTr(tr);
            if (tt.parent().hasClass("datagrid-cell-check")) {
                if (opts.singleSelect && opts.selectOnCheck) {
                    if (!opts.checkOnSelect) {
                        _uncheckAll(_55a, true);
                    }
                    _5d2(_55a, rowIndex);
                } else {
                    if (tt.is(":checked")) {
                        if (opts.shiftCheck && e.shiftKey) {
                            shiftCheckRow(rowIndex, tr, _55a);
                        }
                        _5d2(_55a, rowIndex);
                    } else {
                        if (opts.shiftCheck && e.shiftKey) {
                            shiftUncheckRow(rowIndex, tr, _55a);
                            _5d2(_55a, rowIndex);
                        } else {
                            _uncheckRow(_55a, rowIndex);  /**/
                        }
                    }
                }
            } else {
                var row = opts.finder.getRow(_55a, rowIndex);
                var td = tt.closest("td[field]", tr);
                if (td.length) {
                    var _568 = td.attr("field");
                    opts.onClickCell.call(_55a, rowIndex, _568, row[_568]);
                }
                if (opts.singleSelect == true) {
                    _5cb(_55a, rowIndex);
                } else {
                    if (opts.ctrlSelect) {
                        if (e.ctrlKey) {
                            if (tr.hasClass("datagrid-row-selected")) {
                                _5d3(_55a, rowIndex);
                            } else {
                                _5cb(_55a, rowIndex);
                            }
                        } else {
                            $(_55a).datagrid("clearSelections");
                            _5cb(_55a, rowIndex);
                        }
                    }else {
                        if (tr.hasClass("datagrid-row-selected")) {
                            _5d3(_55a, rowIndex);
                        } else {
                            _5cb(_55a, rowIndex);
                        }
                    }
                }
                if (td) {
                    // 点击数据行中勾选框时, 来处理全选框状态
                    var titleTd = td.closest('.datagrid-view').find('.datagrid-header-row td[field=' + _568 + ']');
                    if ('true' == titleTd.attr('header-checkbox')) {  // 如果是title上有全选勾 2023-07-10
                        _validHeaderCheckboxByData(td.closest('.datagrid-body'), titleTd.parent(), _568);
                    }
                }
                if (opts.clicksToEdit==1){
                    var oldEditRowInd = undefined;
                    var editTr = opts.finder.getTr(_55a, "", "editing", 2);
                    if (editTr) oldEditRowInd = editTr.attr('datagrid-row-index');
                    if (oldEditRowInd!=rowIndex) { //点击切换
                        if(rowIndex>-1 && ('undefined'==typeof oldEditRowInd || $(_55a).datagrid('validateRow',oldEditRowInd))){ //验证通过
                            if ('undefined'!=typeof oldEditRowInd) _5fd(_55a,parseInt(oldEditRowInd), false); //-endedit
                            _5f7(_55a,rowIndex); //开始编辑
                        }
                    }
                }
                opts.onClickRow.call(_55a, rowIndex, row);
            }
        }
        var debouncedDgBodyClickFun=($.hisui.debounce && parseInt(opts.clickDelay)>0)?$.hisui.debounce(dgBodyClickFun,parseInt(opts.clickDelay)):dgBodyClickFun;
        dc.body1.add(dc.body2).unbind().bind("mouseover", function (e) {
            if (_55b.resizing) {
                return;
            }
           /* 2018-11-23 start -- showTip*/
           var td = $(e.target);
           var colname = undefined;
           if ("undefined" == typeof td.attr('field')){
                td = td.closest('td');
           }
            colname = td.attr('field');
            var tr = $(e.target).closest("tr.datagrid-row");
            if (!isValidTr(tr)) {
                return;
            }
            var rowIndex = getRowIndexByTr(tr);
           if (colname && td.text()!=""){ // 为空不进入，如果是空格进入。希望显示提示 [5101555]
               var tmpdg = $.data(_55a, "datagrid");
               var mycm = tmpdg.options.columns||[];
               cm = mycm.concat(tmpdg.options.frozenColumns);
               for (var i=0;i<cm.length; i++){
                   for(var j=0;j<cm[i].length;j++){
                        if (cm[i][j].field==colname){
                            if (cm[i][j].showTip || 'function' == typeof cm[i][j].showTipFormatter) {
                                var tipCtt = td.text();
                                if ('function' == typeof cm[i][j].showTipFormatter) {
                                    var row = opts.finder.getRow(_55a, rowIndex);
                                    tipCtt = cm[i][j].showTipFormatter.call(this, row, rowIndex);
                                }
                                var tipWidth = cm[i][j].tipWidth||350;
                                var tipPosition = cm[i][j].tipPosition||"bottom";
                                var tipTrackMouse = cm[i][j].tipTrackMouse || false;
                                // 返回值不为空时才提示 [5101555]
                                if (""!=tipCtt) td.tooltip({
                                    content:tipCtt,
                                    position:tipPosition,
                                    trackMouse:tipTrackMouse,
                                    tipWidth:tipWidth,
                                    onShow:function(){
                                        var _o = this;
                                        (function(){
                                            if ($(_o).closest("div").length==0){ // td节点实际已不存在 则销毁tooltip组件
                                                $(_o).tooltip("hide");
                                                $(_o).tooltip("destroy");
                                                return;
                                            }
                                            if ($.data(_o, "tooltip")){  // 是tooltip时才继续执行，否则表示组件销毁
                                                setTimeout(arguments.callee, 200);
                                            }
                                        }());
                                    },
                                    onHide:function(){
                                        $(this).tooltip("destroy");
                                    }
                                    /*onShow:function(e1){
                                        //2020-11-03 left不能少于10
                                        var l = e1.pageX-(250/2);
                                        if (l<10) l=10;
                                        $(this).tooltip("tip").css({
                                            width:tipWidth,top:e1.pageY+20,left:l
                                        });
                                    }*/
                                }).tooltip("show",e);
                            }
                            
                        }
                   }
               }
           }
           /** end */
            _5c7(_55a, rowIndex,true);  //高亮显示 增加isMouse 2019-5-24
            e.stopPropagation();
        }).bind("mouseout", function (e) {
            var tr = $(e.target).closest("tr.datagrid-row");
            if (!isValidTr(tr)) {
                return;
            }
            var _566 = getRowIndexByTr(tr);
            opts.finder.getTr(_55a, _566).removeClass("datagrid-row-over");
            e.stopPropagation();
        }).bind("click", function (e) {
            if (parseInt(opts.clickDelay)>0){
                debouncedDgBodyClickFun.call(this,e);
            }else{
                dgBodyClickFun.call(this,e);
            }
            e.stopPropagation();
        }).bind("dblclick", function (e) {
            var tt = $(e.target);
            var tr = tt.closest("tr.datagrid-row");
            if (!isValidTr(tr)) {
                return;
            }
            var _569 = getRowIndexByTr(tr);
            var row = opts.finder.getRow(_55a, _569);
            var td = tt.closest("td[field]", tr);
            if (td.length) {
                var _56a = td.attr("field");
                opts.onDblClickCell.call(_55a, _569, _56a, row[_56a]);
            }
            if (opts.clicksToEdit==2){
                _5f7(_55a,rowIndex);
            }
            // dblclickrow也向后延时
            if (parseInt(opts.clickDelay) > 0) {
                //debouncedDgBodyClickFun.call(this,e);
                setTimeout(function () {
                    opts.onDblClickRow.call(_55a, _569, row);
                },opts.clickDelay);
            } else {
                opts.onDblClickRow.call(_55a, _569, row);
            }
            e.stopPropagation();
        }).bind("contextmenu", function (e) {
            var tr = $(e.target).closest("tr.datagrid-row");
            if (!isValidTr(tr)) {
                return;
            }
            var _56b = getRowIndexByTr(tr);
            var row = opts.finder.getRow(_55a, _56b);
            opts.onRowContextMenu.call(_55a, e, _56b, row);
            e.stopPropagation();
        });
        /* 固定列后,在固定列内容上滚动也应该带动表格滚动 需求号：2902579 */
        dc.body1.bind("mousewheel DOMMouseScroll", function (e) {
            e.preventDefault();
            var e1 = e.originalEvent || window.event;
            var _80 = e1.wheelDelta || e1.detail * (-1);
            if ("deltaY" in e1) {
                _80 = e1.deltaY * -1;
            }
            var dg = $(e.target).closest("div.datagrid-view").children(".datagrid-f");
            var dc = dg.data("datagrid").dc;
            dc.body2.scrollTop(dc.body2.scrollTop() - _80);
        });
        dc.body2.bind("scroll", function () {
            var b1 = dc.view1.children("div.datagrid-body");
            b1.scrollTop($(this).scrollTop());
            var c1 = dc.body1.children(":first");
            var c2 = dc.body2.children(":first");
            if (c1.length && c2.length) {
                var top1 = c1.offset().top;
                var top2 = c2.offset().top;
                if (top1 != top2) {
                    b1.scrollTop(b1.scrollTop() + top1 - top2);
                }
            }
            dc.view2.children("div.datagrid-header,div.datagrid-footer")._scrollLeft($(this)._scrollLeft());
            dc.body2.children("table.datagrid-btable-frozen").css("left", -$(this)._scrollLeft());
        });
        function getRowIndexByTr(tr) {
            if (tr.attr("datagrid-row-index")) {
                return parseInt(tr.attr("datagrid-row-index"));
            } else {
                return tr.attr("node-id");
            }
        };
        function isValidTr(tr) {
            return tr.length && tr.parent().length;
        };
    };
    function _56c(_56d, _56e) {
        var _56f = $.data(_56d, "datagrid");
        var opts = _56f.options;
        _56e = _56e || {};
        var _570 = { sortName: opts.sortName, sortOrder: opts.sortOrder };
        if (typeof _56e == "object") {
            $.extend(_570, _56e);
        }
        var _571 = [];
        var _572 = [];
        if (_570.sortName) {
            _571 = _570.sortName.split(",");
            _572 = _570.sortOrder.split(",");
        }
        if (typeof _56e == "string") {
            var _573 = _56e;
            var col = _getColumnOption(_56d, _573);
            if (!col.sortable || _56f.resizing) {
                return;
            }
            var _574 = col.order || "asc";
            var pos = _502(_571, _573);
            if (pos >= 0) {
                var _575 = _572[pos] == "asc" ? "desc" : "asc";
                if (opts.multiSort && _575 == _574) {
                    _571.splice(pos, 1);
                    _572.splice(pos, 1);
                } else {
                    _572[pos] = _575;
                }
            } else {
                if (opts.multiSort) {
                    _571.push(_573);
                    _572.push(_574);
                } else {
                    _571 = [_573];
                    _572 = [_574];
                }
            }
            _570.sortName = _571.join(",");
            _570.sortOrder = _572.join(",");
        }
        if (opts.onBeforeSortColumn.call(_56d, _570.sortName, _570.sortOrder) == false) {
            return;
        }
        $.extend(opts, _570);
        var dc = _56f.dc;
        var _576 = dc.header1.add(dc.header2);
        _576.find("div.datagrid-cell").removeClass("datagrid-sort-asc datagrid-sort-desc");
        for (var i = 0; i < _571.length; i++) {
            var col = _getColumnOption(_56d, _571[i]);
            _576.find("div." + col.cellClass).addClass("datagrid-sort-" + _572[i]);
        }
        if (opts.remoteSort) {
            _577(_56d);
        } else {
            _578(_56d, $(_56d).datagrid("getData"));
        }
        opts.onSortColumn.call(_56d, opts.sortName, opts.sortOrder);
    };
    function _579(target) {
        var state = $.data(target, "datagrid");
        var opts = state.options;
        var dc = state.dc;
        dc.body2.css("overflow-x", "");
        if (!opts.fitColumns) {
            return;
        }
        if (!state.leftWidth) {
            state.leftWidth = 0;
        }
        var _57c = dc.view2.children("div.datagrid-header");
        var _57d = 0;
        var _57e;
        var cols = _557(target, false);
        for (var i = 0; i < cols.length; i++) {
            var col = _getColumnOption(target, cols[i]);
            if (_580(col)) {
                _57d += col.width;
                _57e = col;
            }
        }
        if (!_57d) {
            return;
        }
        if (_57e) {
            _addWidth(_57e, -state.leftWidth);
        }
        var _582 = _57c.children("div.datagrid-header-inner").show();
        var _583 = _57c.width() - _57c.find("table").width() - opts.scrollbarSize + state.leftWidth;
        var rate = _583 / _57d;
        if (!opts.showHeader) {
            _582.hide();
        }
        for (var i = 0; i < cols.length; i++) {
            var col = _getColumnOption(target, cols[i]);
            if (_580(col)) {
                var _584 = parseInt(col.width * rate);
                _addWidth(col, _584);
                _583 -= _584;
            }
        }
        state.leftWidth = _583;
        if (_57e) {
            _addWidth(_57e, state.leftWidth);
        }
        _542(target);
        if (_57c.width() >= _57c.find("table").width()) {
            dc.body2.css("overflow-x", "hidden");
        }
        function _addWidth(col, _585) {
            if (col.width + _585 > 0) {
                col.width += _585;
                col.boxWidth += _585;
            }
        };
        function _580(col) {
            if (!col.hidden && !col.checkbox && !col.auto && !col.fixed) {
                return true;
            }
        };
    };
    function _586(_587, _588) {
        var _589 = $.data(_587, "datagrid");
        var opts = _589.options;
        var dc = _589.dc;
        var tmp = $("<div class=\"datagrid-cell\" style=\"position:absolute;left:-9999px\"></div>").appendTo("body");
        if (_588) {
            _515(_588);
            if (opts.fitColumns) {
                _519(_587);
                _579(_587);
            }
        } else {
            if (!!opts.autoSizeColumn){ //wanghc 增加配置 影响grid速度
                var _58a = false;
                var _58b = _557(_587, true).concat(_557(_587, false));
                for (var i = 0; i < _58b.length; i++) {
                    var _588 = _58b[i];
                    var col = _getColumnOption(_587, _588);
                    if (!col.hidden && col.auto) {  //by wanghc 增加col.hidden判断,隐藏列不用计算 2018-5-3
                        _515(_588);
                        _58a = true;
                    }
                }
                if (_58a && opts.fitColumns) {
                    _519(_587);
                    _579(_587);
                }
            }
        }
        tmp.remove();
        function _515(_58c) {
            var _58d = dc.view.find("div.datagrid-header td[field=\"" + _58c + "\"] div.datagrid-cell");
            _58d.css("width", "");
            var col = $(_587).datagrid("getColumnOption", _58c);
            col.width = undefined;
            col.boxWidth = undefined;
            col.auto = true;
            $(_587).datagrid("fixColumnSize", _58c);
            var _58e = Math.max(_58f("header"), _58f("allbody"), _58f("allfooter"));
            _58d._outerWidth(_58e);
            col.width = _58e;
            col.boxWidth = parseInt(_58d[0].style.width);
            _58d.css("width", "");
            $(_587).datagrid("fixColumnSize", _58c);
            opts.onResizeColumn.call(_587, _58c, col.width);
            function _58f(type) {
                var _590 = 0;
                if (type == "header") {
                    _590 = _591(_58d);
                } else {
                    opts.finder.getTr(_587, 0, type).find("td[field=\"" + _58c + "\"] div.datagrid-cell").each(function () {
                        var w = _591($(this));
                        if (_590 < w) {
                            _590 = w;
                        }
                    });
                }
                return _590;
                function _591(cell) {
                    return cell.is(":visible") ? cell._outerWidth() : tmp.html(cell.html())._outerWidth();
                };
            };
        };
    };
    function _542(_592, _593) {
        var _594 = $.data(_592, "datagrid");
        var opts = _594.options;
        var dc = _594.dc;
        var _595 = dc.view.find("table.datagrid-btable,table.datagrid-ftable");
        _595.css("table-layout", "fixed");
        if (_593) {
            fix(_593);
        } else {
            var ff = _557(_592, true).concat(_557(_592, false));
            for (var i = 0; i < ff.length; i++) {
                fix(ff[i]);
            }
        }
        _595.css("table-layout", "auto");
        _596(_592);
        setTimeout(function () {
            _fixRowHeight(_592);
            _59b(_592);
            resizeTHGroup(_592);
        }, 0);
        function fix(_597) {
            var col = _getColumnOption(_592, _597);
            if (!col.checkbox) {
                _594.ss.set("." + col.cellClass, col.boxWidth ? col.boxWidth + "px" : "auto");
            }
        };
    };
    /**
     * wanghc 2022-01-27
     * 多层列头时，父列头文本内容长过子列头宽度导致列头与内容对不齐问题处理
     * 需求号：2011212
     * 测试界面：datagrid-mutiColHeader.debug
    */
    function resizeTHGroup(target) {
        var opts = $.data(target, "datagrid").options;
        var dc = $.data(target, "datagrid").dc;
        dc.header1.add(dc.header2).find(".datagrid-cell-group").each(function(){
            $(this).width(1);  //设置为1px, 这样才能得到真实的子列总宽度
            var w = Math.floor($(this).parent().width()) - 16; // 去除padding
            $(this).width(w);
        });
        return false;
        //

        var opts = $.data(target, "datagrid").options;
        var dc = $.data(target, "datagrid").dc;
        var groupIndex = 0;
        var cols = opts.columns;
        var COLROWSPAN = 2;
        if (cols.length == COLROWSPAN) { // 二行头
            var row2ind = 0;
            for (var row1ind = 0; row1ind<cols[0].length;row1ind++){
                if ("undefined"==typeof cols[0][row1ind].rowspan || cols[0][row1ind].rowspan < COLROWSPAN) {
                    // 分二层列头且当前列占多列
                    if (cols[0].field) { //cols[0][row1ind].colspan > 0) {
                    }else{
                        // 1表示第二行列头
                        var w = _calColSpanWidth(dc,1,row2ind, row2ind + cols[0][row1ind].colspan) - 16
                        dc.header1.add(dc.header2).find(".datagrid-cell-group:eq("+groupIndex+")").width(w); //减去padding
                        groupIndex++;
                        row2ind += cols[0][row1ind].colspan; 
                    }
                }
            }
        }
        /***
         * _calColSpanWidth(dc,1,0,2)表示取第二行,前二列的总宽度
         * _calColSpanWidth(dc,2,0,2)表示取第三行列头,前二列的总宽度
         * 
         * */
        function _calColSpanWidth(dc,rowInd,st, end){
            var w = 0;
            dc.header1.add(dc.header2).find(".datagrid-header-row:eq(" + rowInd+")").find(".datagrid-cell").each(function(ind){
                if (ind >= st && ind < end) {
                    // 16 = $(this).css('paddingLeft')+$(this).css('paddingRight')
                    w += parseInt($(this).width()) + 16;  //16为padding-left+padding-right
                } 
            });
            return w;
        }
    };
    function _596(_598) {
        var dc = $.data(_598, "datagrid").dc;
        dc.body1.add(dc.body2).find("td.datagrid-td-merged").each(function () {
            var td = $(this);
            var _599 = td.attr("colspan") || 1;
            var _59a = _getColumnOption(_598, td.attr("field")).width;
            for (var i = 1; i < _599; i++) {
                td = td.next();
                _59a += _getColumnOption(_598, td.attr("field")).width + 1;
            }
            $(this).children("div.datagrid-cell")._outerWidth(_59a);
        });
    };
    /**
     * 
     * @param {Node} _59c target
     * @param {HTMLElement} tr  在此范围下查找可编辑数据
     * 编辑一行时，不要去处理所有行数据，指定行就成 
     */
    function _59b(_59c,tr) {
        var dc = $.data(_59c, "datagrid").dc;
        (tr||dc.view).find("div.datagrid-editable").each(function () {
            var cell = $(this);
            var _59d = cell.parent().attr("field");
            var col = $(_59c).datagrid("getColumnOption", _59d);
            cell._outerWidth(col.width);
            var ed = $.data(this, "datagrid.editor");
            if (ed.actions.resize) {
                ed.actions.resize(ed.target, cell.width());
            }
        });
    };
    function _getColumnOption(target, fieldName) {
        function find(_5a0) {
            if (_5a0) {
                for (var i = 0; i < _5a0.length; i++) {
                    var cc = _5a0[i];
                    for (var j = 0; j < cc.length; j++) {
                        var c = cc[j];
                        if (c.field == fieldName) {
                            return c;
                        }
                    }
                }
            }
            return null;
        };
        var opts = $.data(target, "datagrid").options;
        var col = find(opts.columns);
        if (!col) {
            col = find(opts.frozenColumns);
        }
        return col;
    };
    function _557(_5a1, _5a2) {
        var opts = $.data(_5a1, "datagrid").options;
        var _5a3 = (_5a2 == true) ? (opts.frozenColumns || [[]]) : opts.columns;
        if (_5a3.length == 0) {
            return [];
        }
        var _5a4 = [];
        function _5a5(_5a6) {
            var c = 0;
            var i = 0;
            while (true) {
                if (_5a4[i] == undefined) {
                    if (c == _5a6) {
                        return i;
                    }
                    c++;
                }
                i++;
            }
        };
        function _5a7(r) {
            var ff = [];
            var c = 0;
            for (var i = 0; i < _5a3[r].length; i++) {
                var col = _5a3[r][i];
                if (col.field) {
                    ff.push([c, col.field]);
                }
                c += parseInt(col.colspan || "1");
            }
            for (var i = 0; i < ff.length; i++) {
                ff[i][0] = _5a5(ff[i][0]);
            }
            for (var i = 0; i < ff.length; i++) {
                var f = ff[i];
                _5a4[f[0]] = f[1];
            }
        };
        for (var i = 0; i < _5a3.length; i++) {
            _5a7(i);
        }
		
		var _newRe = [];
		//2020-05-21 护理 add yucz 2019-12-9 返回正确顺序的列字段 
		if (!!$.data(_5a1, "amendDataDisplay") && !!$.data(_5a1, "filelds"))
		{
            // 考虑冻结列情况
            if ($.isArray($.data(_5a1, "filelds")[0])) {
                if (_5a2) { //是冻结列 [["冻结列",""],["非冻结列",""]]
                    _newRe = _newRe.concat($.data(_5a1, "filelds")[0]);
                } else {
                    _newRe = _newRe.concat($.data(_5a1, "filelds")[1]);
                }
            } else {
                _newRe = _newRe.concat($.data(_5a1, "filelds"));
            }
			for (var i = 0;i< _5a4.length; i++)
			{
				var testReg = /^ID/;
				if (testReg.test(_5a4[i]))
				{
					_newRe.splice(i,0,_5a4[i]);
				}				
			}		
			return _newRe;
		}else{
            return _5a4;
        }
    };
    /**
     * 当某列数据全选时，把列头中勾选框也选中
     * 当重新加载数据时，头选中状态要随数据选中变化
     * @param {JQueryObject} body$ 数据区域对应的JQueryObj opts.dc.body2
     * @param {JQueryObject} title$ 列头区域对应的JQueryObj opts.dc.header2
     * @param {String} fieldName 
     */
    function _validHeaderCheckboxByData(body$,title$,fieldName) {
        var mycbcount = 0,mycbcheckcount=0;
        // td.closest('.datagrid-body')
        body$.find('td[field=' + fieldName + '] input[type="checkbox"]').each(function () {
            var cbox = $(this);
            if (cbox.prop('disabled')) return true;
            mycbcount++;
            if (cbox.prop('checked')) {
                mycbcheckcount++;
            } else {
                return false;
            }                            
        });

        var mycb = $('td[field="'+fieldName+'"] input[type="checkbox"]', title$);
        if (mycbcheckcount==mycbcount) {                            
            if (mycb.hasClass('checkbox-f')) {
                // mycb.checkbox('check', true)
                mycb.prop('checked', true);
                mycb.next().addClass('checked');
            }
            else{mycb.prop('checked', true)}
        } else {
            if (mycb.hasClass('checkbox-f')) {
                // mycb.checkbox('uncheck',  true);
                mycb.prop('checked', false);
                mycb.next().removeClass('checked');
            }
            else{mycb.prop('checked', false)}
        }
    }
    /**
     * 勾选全选,选中所有勾选框，disable状态的不勾选
     * @param {JQueryObject} body$ 数据区域对应的JQueryObj
     * @param {String} fieldName 列名
     */
    function _checkHeaderCheckbox(body$,fieldName) {
        var currentColCells = $('.datagrid-row [field="' + fieldName + '"]',body$);
        currentColCells.each(function (index,item) {
            var cbox = $('input[type="checkbox"]', item);
            if (cbox.prop('disabled')) return;
            if (cbox.hasClass('checkbox-f')) { cbox.checkbox('check') }
            else {cbox.prop('checked',true)}
        });
    }
    /**
     * 取消全选勾，取消数据中的勾选
     * @param {JQueryObject} body$ 数据区域对应的JQueryObj
     * @param {String} fieldName 列名
     */
    function _uncheckHeaderCheckbox(body$,fieldName) {
        var currentColCells = $('.datagrid-row [field="' + fieldName + '"]',body$);
        currentColCells.each(function (index,item) {
            var cbox = $('input[type="checkbox"]', item);
            if (cbox.prop('disabled')) return;
            if (cbox.hasClass('checkbox-f')) { cbox.checkbox('uncheck') }
            else {cbox.prop('checked',false)}
        });         
    }
    function _578(_5a8, data) {
        var _5a9 = $.data(_5a8, "datagrid");
        var opts = _5a9.options;
        var dc = _5a9.dc;
        data = opts.loadFilter.call(_5a8, data);
        data.total = parseInt(data.total);
        _5a9.data = data;
        if (data.footer) {
            _5a9.footer = data.footer;
        }
        if (!opts.remoteSort && opts.sortName) {
            var _5aa = opts.sortName.split(",");
            var _5ab = opts.sortOrder.split(",");
            data.rows.sort(function (r1, r2) {
                var r = 0;
                for (var i = 0; i < _5aa.length; i++) {
                    var sn = _5aa[i];
                    var so = _5ab[i];
                    var col = _getColumnOption(_5a8, sn);
                    var _5ac = col.sorter || function (a, b) {
                        return a == b ? 0 : (a > b ? 1 : -1);
                    };
                    r = _5ac(r1[sn], r2[sn]) * (so == "asc" ? 1 : -1);
                    if (r != 0) {
                        return r;
                    }
                }
                return r;
            });
        }
        if (opts.view.onBeforeRender) {
            opts.view.onBeforeRender.call(opts.view, _5a8, data.rows);
        }
        opts.view.render.call(opts.view, _5a8, dc.body2, false);
        opts.view.render.call(opts.view, _5a8, dc.body1, true);
        if (opts.showFooter) {
            opts.view.renderFooter.call(opts.view, _5a8, dc.footer2, false);
            opts.view.renderFooter.call(opts.view, _5a8, dc.footer1, true);
        }
        if (opts.view.onAfterRender) {
            opts.view.onAfterRender.call(opts.view, _5a8);
        }
        _5a9.ss.clean();
        if(opts.clearSelectionsOnload) $(_5a8).datagrid("clearSelections"); // 修复[翻页时全选勾未去掉]问题 [3764732]
        if (opts.rownumbers && opts.fixRowNumber){
            $(_5a8).datagrid("fixRowNumber");
        }
        opts.onLoadSuccess.call(_5a8, data);
        // 20230726 通过数据来判断是否把头上勾选上 [3731015]
        if (opts.columns.length > 0) {
            for (var i = 0; i < opts.columns[0].length; i++) {
                if (true == opts.columns[0][i].headerCheckbox) {
                    _validHeaderCheckboxByData(dc.body2, dc.header2, opts.columns[0][i].field);
                }
            }
        }
        var _5ad = $(_5a8).datagrid("getPager");
        if (_5ad.length) {
            var pgopts = _5ad.pagination("options");
            /*
            [3734901] 20230731 曾经的翻页数据。pgopts => total:16,pageNumber:2
            调用loadData({total:0,rows:{}})时 data.total=0, data.pageNumber=2
            */
            if (pgopts.total != data.total || opts.pageNumber < 1) {
                // 20210727 默认total为0后，第一次进入datagrid且数据为空时，不会重置pageNumber,医生站治疗执行弹出界面，有bug把pageNumber设置成了0,导致有数据时也查询不出来
                _5ad.pagination("refresh", { total: data.total });
                // [3734901] 20230731 调用refresh后，会把pgopts.total与pgopts.pageNumber重置，pgopts.pageNumber=1, opts.pageNumber=2
                if (opts.pageNumber != pgopts.pageNumber) {
                    opts.pageNumber = pgopts.pageNumber;
                    _577(_5a8);
                }
            }
        }
        _fixRowHeight(_5a8);
        dc.body2.triggerHandler("scroll");
        _5af(_5a8);
        $(_5a8).datagrid("autoSizeColumn");
    };
    function _5af(_5b0) {
        var _5b1 = $.data(_5b0, "datagrid");
        var opts = _5b1.options;
        if (opts.idField) {
            var _5b2 = $.data(_5b0, "treegrid") ? true : false;
            var _5b3 = opts.onSelect;
            var _5b4 = opts.onCheck;
            opts.onSelect = opts.onCheck = function () {
            };
            var rows = opts.finder.getRows(_5b0);
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var _5b5 = _5b2 ? row[opts.idField] : i;
                //cryze 2019-3-13
                if (opts.view.type == 'scrollview')  _5b5+= (opts.view.index||0);  //index的作用getTr起作用 拼接得到tr的id，scrollview用的是总的index值
                if (_5b6(_5b1.selectedRows, row)) {
                    /*if (opts.view.type == 'scrollview'){
                        // index为datagrid的rows的index.即为当前页数据源对应的数组,不能只从firstRows中取
                        //_5b5为当前数据的index，当为scrollview插件时，rows为所有数据8000
                        //通过id列查询一次
                        for(var w=0; w<_5b1.data.firstRows.length; w++){
                            if (_5b1.data.firstRows[w][opts.idField] == row[opts.idField]) {
                                _5b5 = w ;
                            }
                        }
                    }*/
                    _5cb(_5b0, _5b5, true);
                }
                if (_5b6(_5b1.checkedRows, row)) {
                    /*if (opts.view.type == 'scrollview'){
                        //_5b5为当前数据的index，当为scrollview插件时，rows为所有数据8000
                        // index为datagrid的rows的index.即为当前页数据源对应的数组,不能只从firstRows中取
                        //通过id列查询一次
                        for(var w=0; w<_5b1.data.firstRows.length; w++){
                            if (_5b1.data.firstRows[w][opts.idField] == row[opts.idField]) {
                                _5b5 = w ;
                            }
                        }
                    }*/
                    _5d2(_5b0, _5b5, true);
                }
            }
            opts.onSelect = _5b3;
            opts.onCheck = _5b4;
        }
        function _5b6(a, r) {
            for (var i = 0; i < a.length; i++) {
                if (a[i][opts.idField] == r[opts.idField]) {
                    a[i] = r;
                    return true;
                }
            }
            return false;
        };
    };
    function _5b7(_5b8, row) {
        var _5b9 = $.data(_5b8, "datagrid");
        var opts = _5b9.options;
        var rows = _5b9.data.rows;
        if (typeof row == "object") {
            return _502(rows, row);
        } else {
            for (var i = 0; i < rows.length; i++) {
                if (opts.idField){ // wanghc 20200609 增加判断。 解决idField未定义时rows[i][null]=>undefined问题，此时return i=>return 0，应该返回-1。合并护理程序导致
                    if (rows[i][opts.idField] == row) {
                        return i;
                    }
                }
            }
            return -1;
        }
    };
    function _5ba(_5bb) {
        var _5bc = $.data(_5bb, "datagrid");
        var opts = _5bc.options;
        var data = _5bc.data;
        if (opts.idField) {
            return _5bc.selectedRows;
        } else {
            var rows = [];
            opts.finder.getTr(_5bb, "", "selected", 2).each(function () {
                rows.push(opts.finder.getRow(_5bb, $(this)));
            });
            return rows;
        }
    };
    function _5bd(_5be) { //getChecked
        var _5bf = $.data(_5be, "datagrid");
        var opts = _5bf.options;
        if (opts.idField) {
            return _5bf.checkedRows;
        } else {
            var rows = [];
            opts.finder.getTr(_5be, "", "checked", 2).each(function () {
                rows.push(opts.finder.getRow(_5be, $(this)));
            });
            return rows;
        }
    };
    function _5c0(_5c1, _5c2) {
        var _5c3 = $.data(_5c1, "datagrid");
        var dc = _5c3.dc;
        var opts = _5c3.options;
        var tr = opts.finder.getTr(_5c1, _5c2);
        if (tr.length) {
            if (tr.closest("table").hasClass("datagrid-btable-frozen")) {
                return;
            }
            var _5c4 = dc.view2.children("div.datagrid-header")._outerHeight();
            var _5c5 = dc.body2;
            var _5c6 = _5c5.outerHeight(true) - _5c5.outerHeight();
            // 需求号：2144042 新版本Chrome.92, datagrid groupview，存在选中一行后，自动跳转滚条问题
            // 多个tr时，取第二个tr
            if (tr.length > 1) tr = tr.eq(1);
            var top = tr.position().top - _5c4 - _5c6;
            if (top < 0) {
                _5c5.scrollTop(_5c5.scrollTop() + top);
            } else {
                if (top + tr._outerHeight() > _5c5.height() - 18) {
                    _5c5.scrollTop(_5c5.scrollTop() + top + tr._outerHeight() - _5c5.height() + 18);
                }
            }
        }
    };

    /**
     * 
     * @param {*} _5c8 target
     * @param {*} _5c9 index
     * @param {*} isMouse 是否是鼠标悬浮高亮 add 2019-5-24
     */
    function _5c7(_5c8, _5c9,isMouse) {
        var _5ca = $.data(_5c8, "datagrid");
        var opts = _5ca.options;
        opts.finder.getTr(_5c8, _5ca.highlightIndex).removeClass("datagrid-row-over");
        opts.finder.getTr(_5c8, _5c9).addClass("datagrid-row-over");
        var previoushighlightIndex=_5ca.highlightIndex;
        _5ca.highlightIndex = _5c9;
        if (isMouse===true && previoushighlightIndex==_5c9 ) {  //鼠标悬浮触发频率很高 是鼠标悬浮且index没改变 不触发onHighlightRow
            
        }else{
            opts.onHighlightRow.call(_5c8,_5c9,_5ca.data.rows[_5c9]); //cryze 2019-5-23 hightlightRow事件
        }
        
    };
    /**
     * 
     * @param {Object} opts 
     * @param {DomObject} target 
     * @param {Number} rowIndex 
     * @param {String} clsName  处理什么样式名 'datagrid-merged-row-selected'
     * @param {Boolean} add     是增加样式还是删除样式 true
     */
    function _handerMergeddRow(opts,target,rowIndex,clsName,add){
        // 合并行的记录也要选中
        try{
            if (opts.finder.getTr(target, rowIndex).children().hasClass('datagrid-td-merged')){
                var tdfirst = opts.finder.getTr(target, rowIndex).children().eq(0); 
                var rowspanCount = tdfirst.attr('rowspan');
                if (rowspanCount>=2){
                    for (var rowspanIndex=1; rowspanIndex <rowspanCount ;rowspanIndex++){
                        if (add){
                            opts.finder.getTr(target, parseInt(rowIndex)+parseInt(rowspanIndex)).addClass("datagrid-merged-row-selected");
                        }else{
                            opts.finder.getTr(target, parseInt(rowIndex)+parseInt(rowspanIndex)).removeClass("datagrid-merged-row-selected");
                        }
                    }
                }
            }
        }catch(e){
            
        }
    }
    function _5cb(target, rowIndex, _5ce) {
        var _5cf = $.data(target, "datagrid");
        var dc = _5cf.dc;
        var opts = _5cf.options;
        var _5d0 = _5cf.selectedRows;
        /*add onBeforeSelect event by wanghc 2018-05-23*/
        var row = opts.finder.getRow(target, rowIndex); //提前
        if (false === opts.onBeforeSelect.call(target, rowIndex,row)){
            return ;
        }
        if (opts.singleSelect) {
            _unselectAll(target);
            _5d0.splice(0, _5d0.length);
        }
        if (!_5ce && opts.checkOnSelect) {
            _5d2(target, rowIndex, true);
        }
        
        if (opts.idField) {
            _505(_5d0, opts.idField, row);
        }
        opts.finder.getTr(target, rowIndex).addClass("datagrid-row-selected");
        _handerMergeddRow(opts,target,rowIndex,"datagrid-merged-row-selected",true);
        opts.onSelect.call(target, rowIndex, row);
        _5c0(target, rowIndex);
    };
    function _5d3(target, rowIndex, _5d6) {
        var _5d7 = $.data(target, "datagrid");
        var dc = _5d7.dc;
        var opts = _5d7.options;
        /*add onBeforeUnselect event by wanghc 2018-05-23*/
        var row = opts.finder.getRow(target, rowIndex); //提前
        if (false === opts.onBeforeUnselect.call(target, rowIndex, row)){
            return ;
        }
        var _5d8 = $.data(target, "datagrid").selectedRows;
        if (!_5d6 && opts.checkOnSelect) {
            _uncheckRow(target, rowIndex, true);
        }
        opts.finder.getTr(target, rowIndex).removeClass("datagrid-row-selected");  
        if (opts.idField) {
            _503(_5d8, opts.idField, row[opts.idField]);
        }
        _handerMergeddRow(opts,target,rowIndex,"datagrid-merged-row-selected",false);
        opts.onUnselect.call(target, rowIndex, row);
    };
    function _5da(_5db, _5dc) {
        var _5dd = $.data(_5db, "datagrid");
        var opts = _5dd.options;
        var rows = opts.finder.getRows(_5db);
        var _5de = $.data(_5db, "datagrid").selectedRows;
        if (!_5dc && opts.checkOnSelect) {
            _5df(_5db, true);
        }
        opts.finder.getTr(_5db, "", "allbody").addClass("datagrid-row-selected");
        if (opts.idField) {
            for (var _5e0 = 0; _5e0 < rows.length; _5e0++) {
                _505(_5de, opts.idField, rows[_5e0]);
            }
        }
        opts.onSelectAll.call(_5db, rows);
    };
    /**
     * 
     * @param {*} _5e1 
     * @param {Boolean} _5e2  不再调用uncheckAll吗？ true不调用
     * @param {Boolean} isAllPage 是否取消所有界面的选择
     */
    function _unselectAll(_5e1, _5e2,isAllPage) { // unselectAll
        var _5e3 = $.data(_5e1, "datagrid");
        var opts = _5e3.options;
        var rows = opts.finder.getRows(_5e1);
        var _5e4 = $.data(_5e1, "datagrid").selectedRows;
        var lastSelectedRowIndex = _5b7(_5e1,_5e4[0]);
        if (!_5e2 && opts.checkOnSelect) {
            _uncheckAll(_5e1, true , isAllPage);
        }
        opts.finder.getTr(_5e1, "", "selected").removeClass("datagrid-row-selected");

        //护理 yucz 2019-11-4 当用户取消选中一行时触发
        if (lastSelectedRowIndex > -1)
            opts.onUnselect.call(_5e1, lastSelectedRowIndex, _5e4[0]);

        if (opts.idField) {
            for (var _5e6 = 0; _5e6 < rows.length; _5e6++) {
                _503(_5e4, opts.idField, rows[_5e6][opts.idField]);
            }
            if (isAllPage) _5e4.length = 0; // 清空所有选中数据
        }
        opts.onUnselectAll.call(_5e1, rows);
    };
    /**
     * 
     * @param {Int} rowIndex 
     * @param {Object} opts 
     * @param {Event} e 
     * @param {jQuery} tr 
     * @param {jQuery} tbl 
     */
    function shiftUncheckRow(rowIndex,tr,tbl) {
            var trId = tr[0].id;
            var preTrId = trId.slice(0, trId.lastIndexOf('-')+1);
            /* 向下查找已勾选 */
            var currTrId = parseInt(rowIndex) + 1;
            while (currTrId>rowIndex) {
                if (document.getElementById(preTrId + currTrId)) {
                    if(document.getElementById(preTrId + currTrId).className.indexOf('datagrid-row-selected') > -1) {
                        _uncheckRow(tbl, currTrId);
                    } else {
                        break;
                    }
                } else {
                    break;
                }
                currTrId++;
            }
        
    }
    /**
     * 单选时无效
     * @param {*} rowIndex 
     * @param {*} opts 
     * @param {*} e 
     * @param {*} tr 
     * @param {*} tbl 
     */
    // shift+左键连选
    function shiftCheckRow(rowIndex, tr, tbl) {
        var trId = tr[0].id;
        var preTrId = trId.slice(0, trId.lastIndexOf('-')+1);
        /* 向上查找到最近的勾选行 */
        var currTrId = parseInt(rowIndex) - 1;
        var myTopSelectRow = -1;
        while (currTrId>-1) {
            if (document.getElementById(preTrId + currTrId).className.indexOf('datagrid-row-selected')>-1) {
                myTopSelectRow = currTrId;
                break;
            }
            currTrId--;
        }
        if (myTopSelectRow>-1) {
            currTrId = myTopSelectRow+1; //myTopSelectRow已选中
            while (currTrId < rowIndex) {
                _5d2(tbl, currTrId);
                currTrId++;
            }
        }
    }

    // checked row(target,index,true|false)
    function _5d2(_5e7, rowIndex, _5e9) {
        var _5ea = $.data(_5e7, "datagrid");
        var opts = _5ea.options;
        /*add onBeforeCheck event by wanghc 2018-05-23*/
        var row = opts.finder.getRow(_5e7, rowIndex);
        if ('undefined' == typeof row) return ; //没有行也去checkRow时会报错
        if (false === opts.onBeforeCheck.call(_5e7, rowIndex, row)){ 
            //点击checkbox时，checkbox在触发onBeforeCheck事件前 就变成了选中 在此要变回去 add 2020-01-13 cryze
            var tr = opts.finder.getTr(_5e7, rowIndex);
            if (!tr.hasClass("datagrid-row-checked")){  // 是原本是未选中状态 才能改
                var ck = tr.find("div.datagrid-cell-check input[type=checkbox]");
                ck._propAttr("checked", false);
            }
            return ;
        }
        if (!_5e9 && opts.selectOnCheck) {
            _5cb(_5e7, rowIndex, true);
        }
        var tr = opts.finder.getTr(_5e7, rowIndex).addClass("datagrid-row-checked");
        var ck = tr.find("div.datagrid-cell-check input[type=checkbox]");
        ck._propAttr("checked", true);
        tr = opts.finder.getTr(_5e7, "", "checked", 2);
        if (tr.length == opts.finder.getRows(_5e7).length) {
            var dc = _5ea.dc;
            var _5eb = dc.header1.add(dc.header2);
            _5eb.find("div.datagrid-header-check input[type=checkbox]")._propAttr("checked", true);  // 2023-07-10增加判断
        }
        
        if (opts.idField) {
            _505(_5ea.checkedRows, opts.idField, row);
        }
        opts.onCheck.call(_5e7, rowIndex, row);
    };
    function _uncheckRow(_5ec, _5ed, _5ee) {
        var _5ef = $.data(_5ec, "datagrid");
        var opts = _5ef.options;
        /*add onBeforeUncheck event by wanghc 2018-05-23 */
        var row = opts.finder.getRow(_5ec, _5ed);
        if(false===opts.onBeforeUncheck.call(_5ec, _5ed, row)){
            //点击checkbox时，checkbox在触发onBeforeUncheck事件前 就变成了未选中 在此要变回去 add 2020-01-13 cryze
            var tr = opts.finder.getTr(_5ec, _5ed);
            if (tr.hasClass("datagrid-row-checked")){  // 得原本是选中状态 才能改
                var ck = tr.find("div.datagrid-cell-check input[type=checkbox]");
                ck._propAttr("checked", true);
            }
            return ;
        }
        if (!_5ee && opts.selectOnCheck) {
            _5d3(_5ec, _5ed, true);
        }
        var tr = opts.finder.getTr(_5ec, _5ed).removeClass("datagrid-row-checked");
        var ck = tr.find("div.datagrid-cell-check input[type=checkbox]");
        ck._propAttr("checked", false);
        var dc = _5ef.dc;
        var _5f0 = dc.header1.add(dc.header2);
        _5f0.find("div.datagrid-header-check input[type=checkbox]")._propAttr("checked", false);
        if (opts.idField) {
            _503(_5ef.checkedRows, opts.idField, row[opts.idField]);
        }
        opts.onUncheck.call(_5ec, _5ed, row);
    };
    function _5df(_5f1, _5f2) {
        var _5f3 = $.data(_5f1, "datagrid");
        var opts = _5f3.options;
        var rows = opts.finder.getRows(_5f1);
        if (!_5f2 && opts.selectOnCheck) {
            _5da(_5f1, true);
        }
        var dc = _5f3.dc;
        var hck = dc.header1.add(dc.header2).find(".datagrid-header-check input[type=checkbox]");
        var bck = opts.finder.getTr(_5f1, "", "allbody").addClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
        hck.add(bck)._propAttr("checked", true);
        if (opts.idField) {
            for (var i = 0; i < rows.length; i++) {
                _505(_5f3.checkedRows, opts.idField, rows[i]);
            }
        }
        opts.onCheckAll.call(_5f1, rows);
    };
    /**
     * 
     * @param {*} _5f4 
     * @param {boolean} _5f5  不再调用unselectAll吗？ true不调用
     * @param {boolean} isAllPage 是否取消所有界面的勾选, true取消所有界面勾选
     */
    function _uncheckAll(_5f4, _5f5, isAllPage) {  // uncheckAll
        var _5f6 = $.data(_5f4, "datagrid");
        var opts = _5f6.options;
        var rows = opts.finder.getRows(_5f4);  // 取当前页json数据
        if (!_5f5 && opts.selectOnCheck) {
            _unselectAll(_5f4, true, isAllPage);  // 清空
        }
        var dc = _5f6.dc;
        var hck = dc.header1.add(dc.header2).find("input[type=checkbox]");
        var bck = opts.finder.getTr(_5f4, "", "checked").removeClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
        hck.add(bck)._propAttr("checked", false);
        if (opts.idField) {
            for (var i = 0; i < rows.length; i++) {
               _503(_5f6.checkedRows, opts.idField, rows[i][opts.idField]);
            }
            // 3243197 , 使用getChecked方法得到跨页勾选数据，但调用unCheckAll方法缺只能清空当前页勾中, 二个方法不对称，现增加isAllPage入参来清空所有界面的勾选
            // 如果不增加isAllPage会影响界面上的全选功能，全选与取消全选都是对当前界面有效的
            if (isAllPage) _5f6.checkedRows.length = 0;
        }
        opts.onUncheckAll.call(_5f4, rows);
    };
    function _5f7(_5f8, rowIndex) {
        var opts = $.data(_5f8, "datagrid").options;
        var tr = opts.finder.getTr(_5f8, rowIndex);
        var row = opts.finder.getRow(_5f8, rowIndex);
        if (tr.hasClass("datagrid-row-editing")) {
            return;
        }
        if (opts.onBeforeEdit.call(_5f8, rowIndex, row) == false) {
            return;
        }
        tr.addClass("datagrid-row-editing");
        _5fa(_5f8, rowIndex);
        _59b(_5f8,tr); /* 2022-07-18 把当前行传给编辑方法 wangqinyong */
        tr.find("div.datagrid-editable").each(function () {
            var _5fb = $(this).parent().attr("field");
            var ed = $.data(this, "datagrid.editor");
            ed.actions.setValue(ed.target, row[_5fb]);
            if ('function'==typeof ed.actions.setText) ed.actions.setText(ed.target, ed.oldHtml);
        });
        _validateRow(_5f8, rowIndex);
        opts.onBeginEdit.call(_5f8, rowIndex, row);
    };
    /// endEdit(t,rowIndex=0,flag)
    function _5fd(_5fe, _5ff, _600) {
        var opts = $.data(_5fe, "datagrid").options;
        var _601 = $.data(_5fe, "datagrid").updatedRows;
        var _602 = $.data(_5fe, "datagrid").insertedRows;
        var tr = opts.finder.getTr(_5fe, _5ff);
        var row = opts.finder.getRow(_5fe, _5ff);
        if (!tr.hasClass("datagrid-row-editing")) {
            return;
        }
        if (!_600) {
            if (!_validateRow(_5fe, _5ff)) {
                return;
            }
            var _603 = false;
            var _604 = {};
            tr.find("div.datagrid-editable").each(function () {
                var _605 = $(this).parent().attr("field");
                var ed = $.data(this, "datagrid.editor");
                var _606 = ed.actions.getValue(ed.target); //护理会扩展
                if ('object'==typeof _606){ //Array---object
                    if (JSON.stringify(row[_605])!=JSON.stringify(_606)){
                        row[_605] = _606;
                        _603 = true;
                        _604[_605] = _606;
                    }
                }else{
                    if (row[_605] != _606) {
                        row[_605] = _606;
                        _603 = true;
                        _604[_605] = _606;
                    }
                }
            });
            if (_603) {
                if (_502(_602, row) == -1) {
                    if (_502(_601, row) == -1) {
                        _601.push(row);
                    }
                }
            }
            opts.onEndEdit.call(_5fe, _5ff, row, _604);
        }
        tr.removeClass("datagrid-row-editing");
        _607(_5fe, _5ff);
        $(_5fe).datagrid("refreshRow", _5ff);
        if (!_600) {
            // datagrid by wanghc 2018-6-21
            if (opts.showChangedStyle){
                if (_601.length>0 || _602.length>0){ //updatedRrows/insertedRows中存的是当前修改/插入的数据，accept后会清空不要显示红色
                    for(var i in _604){
                        tr.children('td[field="'+i+'"]').addClass('datagrid-value-changed');
                    }
                }
                
            }
            opts.onAfterEdit.call(_5fe, _5ff, row, _604);
        } else {
            opts.onCancelEdit.call(_5fe, _5ff, row);
        }
    };
    function _608(_609, _60a) {
        var opts = $.data(_609, "datagrid").options;
        var tr = opts.finder.getTr(_609, _60a);
        var _60b = [];
        tr.children("td").each(function () {
            var cell = $(this).find("div.datagrid-editable");
            if (cell.length) {
                var ed = $.data(cell[0], "datagrid.editor");
                _60b.push(ed);
            }
        });
        return _60b;
    };
    function _60c(_60d, _60e) {
        var _60f = _608(_60d, _60e.index != undefined ? _60e.index : _60e.id);
        for (var i = 0; i < _60f.length; i++) {
            if (_60f[i].field == _60e.field) {
                return _60f[i];
            }
        }
        return null;
    };
    function _5fa(_610, _611) {
        var opts = $.data(_610, "datagrid").options;
        var tr = opts.finder.getTr(_610, _611);
        tr.children("td").each(function () {
            var cell = $(this).find("div.datagrid-cell");
            var _612 = $(this).attr("field");
            var col = _getColumnOption(_610, _612);
            if (col && col.editor) {
                var _613, _614;
                if (typeof col.editor == "string") {
                    _613 = col.editor;
                } else {
                    _613 = col.editor.type;
                    _614 = col.editor.options;
                }
                var _615 = opts.editors[_613];
                if (_615) {
                    var _616 = cell.html();
                    var _617 = cell._outerWidth();
                    cell.addClass("datagrid-editable");
                    cell._outerWidth(_617);
                    cell.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td></td></tr></table>");
                    cell.children("table").bind("click dblclick contextmenu", function (e) {
                        e.stopPropagation();
                    });
                    $.data(cell[0], "datagrid.editor", { actions: _615, target: _615.init(cell.find("td"), _614), field: _612, type: _613, oldHtml: _616 });
                }
            }
        });
        _fixRowHeight(_610, _611, true);
    };
    function _607(_618, _619) {
        var opts = $.data(_618, "datagrid").options;
        var tr = opts.finder.getTr(_618, _619);
        tr.children("td").each(function () {
            var cell = $(this).find("div.datagrid-editable");
            if (cell.length) {
                var ed = $.data(cell[0], "datagrid.editor");
                if (ed.actions.destroy) {
                    ed.actions.destroy(ed.target);
                }
                cell.html(ed.oldHtml);
                $.removeData(cell[0], "datagrid.editor");
                cell.removeClass("datagrid-editable");
                cell.css("width", "");
            }
        });
    };
    function _validateRow(_61a, _61b) {
        var tr = $.data(_61a, "datagrid").options.finder.getTr(_61a, _61b);
        if (!tr.hasClass("datagrid-row-editing")) {
            return true;
        }
        var vbox = tr.find(".validatebox-text");
        vbox.validatebox("validate");
        vbox.trigger("mouseleave");
        var _61c = tr.find(".validatebox-invalid");
        return _61c.length == 0;
    };
    function _61d(_61e, _61f) {
        var _620 = $.data(_61e, "datagrid").insertedRows;
        var _621 = $.data(_61e, "datagrid").deletedRows;
        var _622 = $.data(_61e, "datagrid").updatedRows;
        if (!_61f) {
            var rows = [];
            rows = rows.concat(_620);
            rows = rows.concat(_621);
            rows = rows.concat(_622);
            return rows;
        } else {
            if (_61f == "inserted") {
                return _620;
            } else {
                if (_61f == "deleted") {
                    return _621;
                } else {
                    if (_61f == "updated") {
                        return _622;
                    }
                }
            }
        }
        return [];
    };
    function _623(_624, _625) {
        var _626 = $.data(_624, "datagrid");
        var opts = _626.options;
        var data = _626.data;
        var _627 = _626.insertedRows;
        var _628 = _626.deletedRows;
        $(_624).datagrid("cancelEdit", _625);
        var row = opts.finder.getRow(_624, _625);
        if (_502(_627, row) >= 0) {
            _503(_627, row);
        } else {
            _628.push(row);
        }
        _503(_626.selectedRows, opts.idField, row[opts.idField]);
        _503(_626.checkedRows, opts.idField, row[opts.idField]);
        opts.view.deleteRow.call(opts.view, _624, _625);
        if (opts.height == "auto") {
            _fixRowHeight(_624);
        }
        $(_624).datagrid("getPager").pagination("refresh", { total: data.total });
    };
    function _629(_62a, _62b) {
        var data = $.data(_62a, "datagrid").data;
        var view = $.data(_62a, "datagrid").options.view;
        var _62c = $.data(_62a, "datagrid").insertedRows;
        view.insertRow.call(view, _62a, _62b.index, _62b.row);
        _62c.push(_62b.row);
        $(_62a).datagrid("getPager").pagination("refresh", { total: data.total });
    };
    function _62d(_62e, row) {
        var data = $.data(_62e, "datagrid").data;
        var view = $.data(_62e, "datagrid").options.view;
        var _62f = $.data(_62e, "datagrid").insertedRows;
        view.insertRow.call(view, _62e, null, row);
        _62f.push(row);
        $(_62e).datagrid("getPager").pagination("refresh", { total: data.total });
    };
    function _630(_631) {
        var _632 = $.data(_631, "datagrid");
        var data = _632.data;
        var rows = data.rows;
        var _633 = [];
        for (var i = 0; i < rows.length; i++) {
            _633.push($.extend({}, rows[i]));
        }
        _632.originalRows = _633;
        _632.updatedRows = [];
        _632.insertedRows = [];
        _632.deletedRows = [];
    };
    function _634(_635) {
        var data = $.data(_635, "datagrid").data;
        var ok = true;
        for (var i = 0, len = data.rows.length; i < len; i++) {
            if (_validateRow(_635, i)) {
                _5fd(_635, i, false);
            } else {
                ok = false;
            }
        }
        if (ok) {
            _630(_635);
        }
    };
    function _636(_637) {
        var _638 = $.data(_637, "datagrid");
        var opts = _638.options;
        var _639 = _638.originalRows;
        var _63a = _638.insertedRows;
        var _63b = _638.deletedRows;
        var _63c = _638.selectedRows;
        var _63d = _638.checkedRows;
        var data = _638.data;
        function _63e(a) {
            var ids = [];
            for (var i = 0; i < a.length; i++) {
                ids.push(a[i][opts.idField]);
            }
            return ids;
        };
        function _63f(ids, _640) {
            for (var i = 0; i < ids.length; i++) {
                var _641 = _5b7(_637, ids[i]);
                if (_641 >= 0) {
                    (_640 == "s" ? _5cb : _5d2)(_637, _641, true);
                }
            }
        };
        for (var i = 0; i < data.rows.length; i++) {
            _5fd(_637, i, true);
        }
        var _642 = _63e(_63c);
        var _643 = _63e(_63d);
        _63c.splice(0, _63c.length);
        _63d.splice(0, _63d.length);
        data.total += _63b.length - _63a.length;
        data.rows = _639;
        _578(_637, data);
        _63f(_642, "s");
        _63f(_643, "c");
        _630(_637);
    };
    /*对本地数据重新加载并触发loadfilter*/
    /*发现老的reload在加载本地数据时并不触发loadfilter方法*/
    function _reload2(target) {
        var status = $.data(target, "datagrid");
        var opts = status.options;
        // console.dir(opts.originalRows);     // combogird与datagrid时 - 为undefined
        // getData,getRows //和当前显示相关
        if (opts.toolBarOriginalData == null) {
            opts.toolBarOriginalData = $(target).datagrid('getData');
        }
        if (opts.toolBarOriginalData) {  // combogrid时有值
            $(target).datagrid('loadData', opts.toolBarOriginalData);
        } 
    }
    /**
     * 增加过滤方法,以便过滤工具条使用
     * @param {*} target 
     */
    function addToolLoadFilter(target) {
        var opts = $.data(target, "datagrid").options;
        opts.oldLoadFilter = opts.loadFilter;
        if (opts.filterToolbarType=='remote'){ return ;}
        opts.loadFilter = function (data) {
            
            var tbar = $(target).closest('.datagrid-wrap').find('.datagrid-toolbar');
            // 模糊查询条件值
            var inputAllFieldCond = tbar.find('.datagrid-toolbar-findbox').val().trim().toUpperCase();
            // 每列查询条件值
            var inputConditions = {}, nullInputConditions = true;
            tbar.find('.datagrid-filter-htable').find("td").each(function () {
                var _f = $(this).attr('field');
                var fbox = $(this).find('input[type="text"]');
                if (_f && fbox.length>0 && fbox.val()!="") {
                    inputConditions[_f] = fbox.val().trim().toUpperCase();
                    nullInputConditions = false;
                }
            });
            if (typeof data.length == 'number' && typeof data.splice == 'function') {	// is array
                data = { total: data.length, rows: data }
            }
            // 查询条件为空时跳出
            if (inputAllFieldCond=="" && nullInputConditions) {
                //return data;
                // 2024-09-19 如果查询条件为空时,也要调用一次用户自己定义的loadFilter [4972992]
                return opts.oldLoadFilter.call(this, data);
            }
            var currentDataRows = [];
            // 前端查询时,对【源数据行】进行过滤 2023-08-22
            var allData = data.originalRows || data.rows;
            for (var i = 0; i < allData.length; i++) {
                var item = allData[i];
                var filterSuccess = true;
                var rowArr = [];
                for (var myField in item){
                    if (item.hasOwnProperty(myField)) {
                        //非字符类型--通过
                        if ("string" !== typeof item[myField] && "number" !== typeof item[myField]) {continue;}
                        if (inputConditions.hasOwnProperty(myField) && inputConditions[myField]!="") {
                            /*对应字段没有匹配 - 不通过*/
                            if (item[myField].toString().toUpperCase().indexOf(inputConditions[myField])==-1 && $.hisui.toChineseSpell(item[myField].toString()).toUpperCase().indexOf(inputConditions[myField])==-1) {
                                filterSuccess = false;
                                break;
                            }
                        }
                        rowArr.push(item[myField]);
                    }
                }
                /*不包含 - 不通过*/
                if (filterSuccess && (rowArr.join(',').toUpperCase().indexOf(inputAllFieldCond)==-1 && $.hisui.toChineseSpell(rowArr.join(',')).toUpperCase().indexOf(inputAllFieldCond)==-1)) {
                    filterSuccess = false;
                }
                if (filterSuccess) currentDataRows.push(allData[i]);
            }
            /// 有过滤条件时，显示的是当前过滤结果的总行数
            var obj = { 'total': currentDataRows.length, 'rows': currentDataRows };
            obj = opts.oldLoadFilter.call(this, obj);
            return obj;
        };
    }
    function _577(_644, _645) {
        var opts = $.data(_644, "datagrid").options;
        if (_645) {
            opts.queryParams = _645;
        }
        var _646 = $.extend({}, opts.queryParams);
        if (opts.pagination) {
            $.extend(_646, { page: opts.pageNumber, rows: opts.pageSize });
        }
        if (opts.sortName) {
            $.extend(_646, { sort: opts.sortName, order: opts.sortOrder });
        }
        if (opts.onBeforeLoad.call(_644, _646) == false) {
            return;
        }
        $(_644).datagrid("loading");
        /**
         * cryze 2018-9-13 
         * 为啥要通过setTimeout(fn,0)这种方式调用,不理解  
         * 猜测：连续两次调用 第一次为url1,第二次为url2, 这种操作就可以都按url2获取数据了  
         * 矛盾点：queryParams是第一次按照第一次，第二次按照第二次  
         */
        setTimeout(function () {  
            _647();
        }, 0);
        function _647() {
            var _648 = opts.loader.call(_644, _646, function (data) {
                setTimeout(function () {
                    $(_644).datagrid("loaded");
                }, 0);
                _578(_644, data);
                setTimeout(function () {
                    _630(_644);
                }, 0);
            }, function () {
                setTimeout(function () {
                    $(_644).datagrid("loaded");
                }, 0);
                opts.onLoadError.apply(_644, arguments);
            });
            if (_648 == false) {
                $(_644).datagrid("loaded");
            }
        };
    };
    function _649(_64a, _64b) {
        var opts = $.data(_64a, "datagrid").options;
        _64b.rowspan = _64b.rowspan || 1;
        _64b.colspan = _64b.colspan || 1;
        if (_64b.rowspan == 1 && _64b.colspan == 1) {
            return;
        }
        var tr = opts.finder.getTr(_64a, (_64b.index != undefined ? _64b.index : _64b.id));
        if (!tr.length) {
            return;
        }
        var row = opts.finder.getRow(_64a, tr);
        var _64c = row[_64b.field];
        var td = tr.find("td[field=\"" + _64b.field + "\"]");
        td.attr("rowspan", _64b.rowspan).attr("colspan", _64b.colspan);
        td.addClass("datagrid-td-merged");
        for (var i = 1; i < _64b.colspan; i++) {
            td = td.next();
            td.hide();
            row[td.attr("field")] = _64c;
        }
        for (var i = 1; i < _64b.rowspan; i++) {
            tr = tr.next();
            if (!tr.length) {
                break;
            }
            var row = opts.finder.getRow(_64a, tr);
            var td = tr.find("td[field=\"" + _64b.field + "\"]").hide();
            row[td.attr("field")] = _64c;
            for (var j = 1; j < _64b.colspan; j++) {
                td = td.next();
                td.hide();
                row[td.attr("field")] = _64c;
            }
        }
        _596(_64a);
    };
    function getColumns(options) {
        if (options.columnsUrl!=null){
            var json = "";
            $.ajax({
                url: options.columnsUrl, async: false, dataType: 'json', success: function (rtn) {
                    json = rtn;
            }});
            return json;
        }
        // throw new Error("Not find $cm function. Please include scripts/websys.jquery.js or Setting configuration columns");
        return "";
    }
    var _handerColumns = function (opts,cfg,_64f) {
            if (!!opts.queryName) {
                if (null == opts.editColumnsGrantUrl) opts.editColumnsGrantUrl = $URL + "?ClassName=BSP.SYS.SRV.SSGroup&MethodName=CurrAllowColumnMgr";
                if (null == opts.columnsUrl) opts.columnsUrl = $URL + "?ClassName=websys.Query&MethodName=ColumnDefJson&cn=" + opts.className + "&qn=" + opts.queryName;
                if (null == opts.editColumnsPage) opts.editColumnsPage = '../csp/websys.component.customiselayout.csp?ID=1872&DHCICARE=2&CONTEXT=K' + opts.className + ":" + opts.queryName
                if ((''!=opts.editColumnsPage)&&('function'==typeof window.websys_getMWToken)) opts.editColumnsPage+= "&MWToken=" + websys_getMWToken();
            }
            if (opts.columnsUrl){ //从query中取cm
                var json = getColumns(opts);
                if (json) {
                    if (!opts.sortName) {
                        opts.sortName = json.sortColumnDefault;
                        opts.sortOrder = json.sortOrderDefault;
                    }
                    /*config中出现了, 但object中不存在的属性，将从config对象中复制到object中*/
                    var applyIf = function (object, config, forceField) {
                        var property;
                        if (object) {
                            for (property in config) {
                                if ("string"==typeof forceField && property == forceField) { /*解决defaultsColumns中的title属性覆盖列定义中的*/
                                    object[property] = config[property];  // 强制覆盖列定义中的title属性
                                }
                                if (config.hasOwnProperty(property) && object[property] === undefined) {
                                    object[property] = config[property];
                                }
                            }
                        }
                        return object;
                    };
                    /*把后台cm配置 重写入 前台cm对象 20221109*/
                    var originCm = opts.columns; /*把默认的定义合并到后台的列定义中*/
                    if (originCm && originCm.length>0 && json.cm && json.cm.length>0) {
                        for (var i = 0; i < json.cm.length; i++) {
                            var defaultObj = $.hisui.getArrayItem(originCm[0], 'field', json.cm[i].field)
                            if (defaultObj) {
                                applyIf(json.cm[i], defaultObj);
                            }
                        }
                    }
                    /*把默认的定义合并到后台的列定义中 20220818*/
                    var defaultCm = opts.defaultsColumns;
                    if (defaultCm && defaultCm.length > 0 && json.cm && json.cm.length > 0) {
                        if ($.isArray(defaultCm[0])) { defaultCm = defaultCm[0];}
                        for (var i = 0; i < json.cm.length; i++) {
                            var defaultObj = $.hisui.getArrayItem(defaultCm, 'field', json.cm[i].field)
                            if (defaultObj) {
                                applyIf(json.cm[i], defaultObj,'title');
                            }
                        }
                    }
                    if (opts.onColumnsLoad) opts.onColumnsLoad.call(_64f, json.cm);
                    if (json.cm && json.cm.length > 0) {
                        opts.columns = [json.cm];
                        cfg.columns = opts.columns;  // 兼容scrollview插件,一定要修改原定义中的columns
                    }
                    if ( json.pageSize>0){
                        opts.pageSize = json.pageSize;
                        if (opts.pageList && $.isArray(opts.pageList) && $.inArray(opts.pageSize, opts.pageList) == -1) {
                            opts.pageList.push(opts.pageSize);
                            opts.pageList.sort(function (a, b) { return a - b });
                        }
                    }
                }
            }
    }
    $.fn.datagrid = function (_64d, _64e) {
        if (typeof _64d == "string") {
            return $.fn.datagrid.methods[_64d](this, _64e);
        }
        _64d = _64d || {};
        return this.each(function () {
            var _64f = $.data(this, "datagrid");
            var opts;
            if (_64f) {
                opts = $.extend(_64f.options, _64d);
                _64f.options = opts;
                if('function' == typeof opts.onInitBefore) opts.onInitBefore.call(this,opts);
                _handerColumns(opts,_64d,_64f);
            } else {
                opts = $.extend({}, $.extend({}, $.fn.datagrid.defaults, { queryParams: {} }), $.fn.datagrid.parseOptions(this), _64d);
                if('function' == typeof opts.onInitBefore) opts.onInitBefore.call(this,opts);
                _handerColumns(opts,_64d,_64f);
                $(this).css("width", "").css("height", "");
                var _650 = _53a(this, opts.rownumbers);
                if (!opts.columns) {
                    opts.columns = _650.columns;
                }
                if (!opts.frozenColumns) {
                    opts.frozenColumns = _650.frozenColumns;
                }
                
                opts.columns = $.extend(true, [], opts.columns);
                opts.frozenColumns = $.extend(true, [], opts.frozenColumns);
                opts.view = $.extend({}, opts.view);
                $.data(this, "datagrid", { options: opts, panel: _650.panel, dc: _650.dc, ss: null, selectedRows: [], checkedRows: [], data: { total: 0, rows: [] }, originalRows: [], updatedRows: [], insertedRows: [], deletedRows: [] });
            }
            var _t = this;
            if (opts.showFilterToolbar && (opts.toolbar == null || opts.toolbar == "")) {
                addToolLoadFilter(_t);
                opts.toolbar = [{
                    type: 'input', class: 'textbox datagrid-toolbar-findbox', placeholder: opts.like, handler: function (ev) {
                        if (ev.keyCode == 13) {
                            $(_t).datagrid('reload2');
                        }
                    },notTrans:true 
                }, {
                    text: opts.findBtn, iconCls: 'icon-search', handler: function () {$(_t).datagrid('reload2'); },notTrans:true
                },{
                    text: opts.clearBtn, iconCls: 'icon-clear-screen', handler: function () {
                        var tbar = $(_t).closest('.datagrid-wrap').find('.datagrid-toolbar');
                        tbar.find('.datagrid-toolbar-findbox').val('');
                        tbar.find('.datagrid-filter-htable').find('td input[type="text"]').val('');
                        $(_t).datagrid('reload2');
                        opts.toolBarOriginalData = null;
                    },notTrans:true
                }, {
                    text: opts.advancedBtn, iconCls: 'icon-find-fee-itm', handler: function () {
                        var tbl = $(this).closest('table');
                        if (tbl.next().length == 0) {
                            /*从列头上复制列信息*/
                            $(this).find('.l-btn-text').text(opts.advanced2Btn);
                            var htbl1 = $(this).closest('.datagrid-wrap').find('.datagrid-view1 .datagrid-header .datagrid-header-row');
                            var htbl2 = $(this).closest('.datagrid-wrap').find('.datagrid-view2 .datagrid-header .datagrid-header-row');
                            var h = "";
                            if (htbl1.length > 0) { h += htbl1.html(); }
                            if (htbl2.length > 0) { h += htbl2.html(); }
                            var filterBoxBar = $('<table class="datagrid-filter-htable" border="0" cellspacing="0" cellpadding="0" style="height: 35px;"><tr>'+h+'</tr></table>').insertAfter(tbl);
                            filterBoxBar.find('.datagrid-header-check').removeClass('datagrid-header-check').css({width:27}).find('input').remove();
                            /*在对应列上插入查询输入框*/
                            filterBoxBar.find('.datagrid-cell').each(function () {
                                var pl = $(this).text();
                                $(this).css({ padding: "0 8px" }).removeClass('datagrid-cell');
                                $(this).html('<input type="text" placeholder="' + pl + '" class="datagrid-cell-filter">');
                            });
                            /*过滤事件*/
                            filterBoxBar.on('keydown', function (evt) {
                                if (evt.keyCode==13) {
                                    $(_t).datagrid('reload2');
                                }
                            });
                        } else {
                            if (tbl.next().css('display')!=="none"){
                                $(this).find('.l-btn-text').text(opts.advancedBtn); 
                                tbl.next().hide();
                            } else {
                                $(this).find('.l-btn-text').text(opts.advanced2Btn); 
                                tbl.next().show();
                            }
                        }
                 },notTrans:true }];
            };
            _545(this);
            _559(this);
            _515(this);
            
            if (opts.data) {
                _578(this, opts.data);
                _630(this);
            } else {
                var data = $.fn.datagrid.parseData(this);
                if (data.total > 0) {
                    _578(this, data);
                    _630(this);
                }
            }
            if(!opts.lazy && opts.url){   // lazy为true时  初始化不去远程访问数据  //cryze 2018-9-13  url未配置也不调用 
                _577(this);
            }
            
        });
    };
    var _651 = {
        text: {
            init: function (_652, _653) {
                var _654 = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_652);
                return _654;
            }, getValue: function (_655) {
                return $(_655).val();
            }, setValue: function (_656, _657) {
                $(_656).val(_657);
            }, resize: function (_658, _659) {
                $(_658)._outerWidth(_659)._outerHeight(30);   //cryze 2018-4-13 height 22-30
            }
        }, textarea: {
            init: function (_65a, options) {
                var h = '<textarea class="textbox datagrid-editable-input" style="';
                if ("undefined"!=typeof options){  // 如果有配置项调用validatebox，处理required:true。需求见1339214
                    if (options.height) h +='height:'+options.height+";";
                    if (options.width) h +='width:'+options.width+";";
                }
                var _65c = $(h+'"></textarea>').appendTo(_65a);
                if ("undefined"!=typeof options){  // 如果有配置项调用validatebox，处理required:true。需求见1339214
                    _65c.validatebox(options);
                }
                return _65c;
            }, destroy: function (jObjTarget) {
                if (jObjTarget.length>0 && jObjTarget.hasClass('validatebox-text')) jObjTarget.validatebox("destroy");
            }, getValue: function (_65d) {
                return $(_65d).val();
            }, setValue: function (_65e, _65f) {
                $(_65e).val(_65f);
            }, resize: function (_660, _661) {
                $(_660)._outerWidth(_661);
            }
        },  celltextarea: {
            init: function (_65a, options) {
                $('<div></div>').appendTo(_65a);
                var h = '<textarea class="celltextarea textbox datagrid-editable-input" style="position:absolute;';
                if ("undefined"!=typeof options){  // 如果有配置项调用validatebox，处理required:true。需求见1339214
                    if (options.height) h +='height:'+options.height+";";
                    if (options.width) h +='width:'+options.width+";";
                }
                var editor = $(h+'"></textarea>').appendTo(_65a);
                if ("undefined"!=typeof options){  // 如果有配置项调用validatebox，处理required:true。需求见1339214
                    editor.validatebox(options);
                }
                /*getValue与setValue的入参是这个返回值*/
                return editor;
            }, destroy: function (jObjTarget) {
                jObjTarget.off(".celltextarea");
                jObjTarget.closest('.datagrid-body').off('.celltextarea')
                if (jObjTarget.length>0 && jObjTarget.hasClass('validatebox-text')) jObjTarget.validatebox("destroy");
            }, getValue: function (_65d) {
                return $(_65d).val();
            }, setValue: function (_65e, _65f) {
                $(_65e).val(_65f);
                $(_65e).prev().text(_65f); //填充内容，保持nowarp:true时，行高不变
            }, resize: function (_660, _661) {
                $(_660)._outerWidth(_661);
                /**
                 * 文本框根据输入内容自适应高度
                 * @param   {HTMLElement}   输入框元素
                 * @param   {Number}    设置光标与输入框保持的距离(默认0)
                 * @param   {Number}    设置最大高度(可选)
                 */
                var getMaxHeight = function (elem) {
                    var inputObj = $(elem);
                    var rowHeight = inputObj.closest('div.datagrid-cell').closest('td').height() ;/* td[field='note1']  */
                    var datagridHeight = inputObj.closest('.datagrid-view2')[0].offsetHeight //.scrollHeight;
                    var cellTop = inputObj.parent().offset().top ;   /*16px是行高一半*/;
                    var bodyTop = inputObj.closest('.datagrid-body').offset().top;
                    var cellInBodyTop = cellTop - bodyTop;
                    var downShow = true;  // 默认下方显示
                    if (cellInBodyTop + rowHeight > datagridHeight - cellInBodyTop) {
                        downShow = false;  // 上方显示
                    }
                    var maxHeight = Math.max(cellInBodyTop + rowHeight, datagridHeight - cellInBodyTop);  // 上方显示 与 下方显示 取最大高度
                    maxHeight = Math.min(maxHeight, datagridHeight - 32);
                    if (rowHeight > datagridHeight-32 ) { //单元格高度超grid高
                        maxHeight = datagridHeight - 32;
                        if (cellInBodyTop<0) {
                            downShow = false;
                        } else {
                            downShow = true;
                        }
                    }
                    //console.log({ rowHeight:rowHeight,datagridHeight:datagridHeight,cellTop:cellTop,bodyTop:bodyTop,cellInBodyTop:cellInBodyTop,maxHeight:maxHeight, downShow:downShow });
                    return { maxHeight: maxHeight-32, downShow: downShow };
                }
                var autoTextarea = function (elem, extra, maxHeight,forceCalc) {
                    extra = extra || 0;
                    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
                    isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
                    getStyle = elem.currentStyle ? function(name) {
                        var val = elem.currentStyle[name];
                        if (name === 'height' && val.search(/px/i) !== 1) {
                            var rect = elem.getBoundingClientRect();
                            return rect.bottom - rect.top -
                                parseFloat(getStyle('paddingTop')) -
                                parseFloat(getStyle('paddingBottom')) + 'px';
                        };
                        return val;
                    } : function(name) {
                        return getComputedStyle(elem, null)[name];
                    },
                    minHeight = parseFloat(getStyle('height'));
                    elem.style.resize = 'none';
                    var change = function(forceCalc) {
                        var height,
                            padding = 0,
                            style = elem.style;
                        if (forceCalc!=true && elem._length === elem.value.length) return;
                        elem._length = elem.value.length;
                        if (!isFirefox && !isOpera) {
                            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
                        };
                        elem.style.height = minHeight + 'px';
                        var maxHeightOpt = getMaxHeight(elem);
                        var maxHeight = maxHeightOpt.maxHeight;
                        if (elem.scrollHeight > minHeight) {
                            if (maxHeight && elem.scrollHeight > maxHeight) {
                                height = maxHeight - padding;
                                style.overflowY = 'auto';
                            } else {
                                height = elem.scrollHeight - padding;
                                style.overflowY = 'hidden';
                            };
                            style.height = height + extra + 'px';
                            elem.currHeight = parseInt(style.height);
                        };
                        autoLeftTop($(elem),maxHeightOpt.downShow);
                    };
                    $(elem).off('propertychange.celltextarea').on('propertychange.celltextarea', change);
                    $(elem).off('input.celltextarea').on('input.celltextarea', change);
                    $(elem).off('focus.celltextarea').on('focus.celltextarea', change);
                    change(forceCalc);
                };
                var autoLeftTop = function(textinputJobj,downShow){
                    var os = textinputJobj.parent().offset();   /*16px是行高一半*/
                    var gcell = textinputJobj.closest('div.datagrid-cell');
                    if (gcell.length>0 && gcell[0].style.whiteSpace==""){
                        os.top-=7;      /*强制一行显示内容，nowrap:true时td有padding，但js又取不到。向上移8像素*/
                    }
                    var vi2 = textinputJobj.closest('.datagrid-view2')[0];
                    if (vi2) {
                        if (os) {
                            var datagridTop = textinputJobj.closest(".datagrid").offset().top;
                            if ( "undefined" == typeof downShow) downShow = getMaxHeight(textinputJobj[0]).downShow;
                            if (downShow){ //(os.top-datagridTop > vi2.scrollHeight / 2) {
                                textinputJobj.offset(os);
                            } else {
                                var rowHeight = gcell.closest('td').height() ;/* td[field='note1']  */
                                textinputJobj.offset({ top:os.top + rowHeight  - textinputJobj.height(), left:os.left });
                            }
                        }
                        //IE下最底一行数据，编辑时导致vi2有scrollTop，返原body的scrollTop,可解决vi2的scrollTop
                        if (false == downShow) {
                            if (vi2.scrollTop > 0) {
                                setTimeout(function () {
                                    textinputJobj.closest('.datagrid-body')[0].scrollTop = 100000;
                                },0);
                            }
                        }
                    }
                }
                _660.closest('.datagrid-body').on('scroll.celltextarea', function () {
                    autoLeftTop(_660);
                    //autoTextarea(_660[0], 0,undefined,true); //mh - 32);
                });
                //var vb = $.data(_660[0], "validatebox");
                //if (vb && vb.options && vb.options.maxHeight) mh = vb.options.maxHeight;
                autoTextarea(_660[0], 0, undefined); //mh - 32);
            }
        }, icheckbox:{ /*新的icheckbox*/
            init: function (_662, _663) { 
                var opt = $.extend({on:'on',off:'off'},_663);
                var _664 = $("<input type=\"checkbox\">").appendTo(_662);
                //_664.val(opt.on);
                //_664.attr("offval", opt.off);
                _664.checkbox(opt);
                return _664;
            }, getValue: function (_665) {
                if($(_665).checkbox("getValue")){
                    return $(_665).checkbox("options").on;
                } else {
                    return $(_665).checkbox("options").off;
                }
            }, setValue: function (_666, _667) {
                var _668 = false;
                if ($(_666).checkbox("options").on == _667) {
                    _668 = true;
                }
                $(_666).checkbox("setValue", _668);
            }
        },checkbox:{
            init: function (_662, _663) {
                var _664 = $("<input type=\"checkbox\">").appendTo(_662);
                _664.val(_663.on);
                _664.attr("offval", _663.off);
                return _664;
            }, getValue: function (_665) {
                if ($(_665).is(":checked")) {
                    return $(_665).val();
                } else {
                    return $(_665).attr("offval");
                }
            }, setValue: function (_666, _667) {
                var _668 = false;
                if ($(_666).val() == _667) {
                    _668 = true;
                }
                // true!='true'做以下兼容 [5022029]
                if ('boolean'==typeof _667 && _667 == true && $(_666).val() == 'true'){
                    _668 = true;
                }
                $(_666)._propAttr("checked", _668);
            }
        }, numberbox: {
            init: function (_669, _66a) {
                var _66b = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_669);
                _66b.numberbox(_66a);
                return _66b;
            }, destroy: function (_66c) {
                $(_66c).numberbox("destroy");
            }, getValue: function (_66d) {
                $(_66d).blur();
                return $(_66d).numberbox("getValue");
            }, setValue: function (_66e, _66f) {
                $(_66e).numberbox("setValue", _66f);
            }, resize: function (_670, _671) {
                $(_670)._outerWidth(_671)._outerHeight(30);  //cryze 2018-4-13 height 22-30
            }
        }, validatebox: {
            init: function (_672, _673) {
                var _674 = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_672);
                _674.validatebox(_673);
                return _674;
            }, destroy: function (_675) {
                $(_675).validatebox("destroy");
            }, getValue: function (_676) {
                return $(_676).val();
            }, setValue: function (_677, _678) {
                $(_677).val(_678);
            }, resize: function (_679, _67a) {
                $(_679)._outerWidth(_67a)._outerHeight(30);   //cryze 2018-4-13 height 22-30
            }
        }, datebox: {
            init: function (_67b, _67c) {
                var _67d = $("<input type=\"text\">").appendTo(_67b);
                _67d.datebox(_67c);
                return _67d;
            }, destroy: function (_67e) {
                $(_67e).datebox("destroy");
            }, getValue: function (_67f) {
                return $(_67f).datebox("getValue");
            }, setValue: function (_680, _681) {
                $(_680).datebox("setValue", _681);
            }, resize: function (_682, _683) {
                $(_682).datebox("resize", _683);
            }
        },datetimebox: {    //cryze  行编辑支持datetimebox  直接抄的datebox,变量都加了i,好像没啥意义，主要是看着他们都用的各自的变量名
            init: function (i_67b, i_67c) {
                var i_67d = $("<input type=\"text\">").appendTo(i_67b);
                i_67d.datetimebox(i_67c);
                return i_67d;
            }, destroy: function (i_67e) {
                $(i_67e).datetimebox("destroy");
            }, getValue: function (i_67f) {
                return $(i_67f).datetimebox("getValue");
            }, setValue: function (i_680, i_681) {
                $(i_680).datetimebox("setValue", i_681);
            }, resize: function (i_682, i_683) {
                $(i_682).datetimebox("resize", i_683);
            }
        }, dateboxq: {
            init: function (_67b, _67c) {
                var _67d = $("<input type=\"text\">").appendTo(_67b);
                _67d.dateboxq(_67c);
                return _67d;
            }, destroy: function (_67e) {
                $(_67e).dateboxq("destroy");
            }, getValue: function (_67f) {
                return $(_67f).dateboxq("getValue");
            }, setValue: function (_680, _681) {
                $(_680).dateboxq("setValue", _681);
            }, resize: function (_682, _683) {
                $(_682).dateboxq("resize", _683);
            }
        }, timeboxq: {
            init: function (_67b, _67c) {
                var _67d = $("<input type=\"text\">").appendTo(_67b);
                _67d.timeboxq(_67c);
                return _67d;
            }, destroy: function (_67e) {
                $(_67e).timeboxq("destroy");
            }, getValue: function (_67f) {
                return $(_67f).timeboxq("getValue");
            }, setValue: function (_680, _681) {
                $(_680).timeboxq("setValue", _681);
            }, resize: function (_682, _683) {
                $(_682).timeboxq("resize", _683);
            }
        }, combobox: {
            init: function (_684, _685) {
                var _686 = $("<input type=\"text\">").appendTo(_684);
                _686.combobox(_685 || {});
                return _686;
            }, destroy: function (_687) {
                $(_687).combobox("destroy");
            }, getValue: function (_688) {
                var opts = $(_688).combobox("options");
                if (opts.multiple) {
                    return $(_688).combobox("getValues").join(opts.separator);
                } else {
                    return $(_688).combobox("getValue");
                }
            }, setValue: function (_689, val) {
                var opts = $(_689).combobox("options");
                if (opts.multiple) {
                    if (val) {
                        if ('string'==typeof val && val){
                            val = val.split(opts.separator);
                        }
                        $(_689).combobox("setValues",val);
                    } else {
                        $(_689).combobox("clear");
                    }
                } else {
                    $(_689).combobox("setValue", val);
                }
            }, resize: function (_68b, _68c) {
                $(_68b).combobox("resize", _68c);
            }
        }, combotree: {
            init: function (_68d, _68e) {
                var _68f = $("<input type=\"text\">").appendTo(_68d);
                _68f.combotree(_68e);
                return _68f;
            }, destroy: function (_690) {
                $(_690).combotree("destroy");
            }, getValue: function (_691) {
                var opts = $(_691).combotree("options");
                if (opts.multiple) {
                    return $(_691).combotree("getValues").join(opts.separator);
                } else {
                    return $(_691).combotree("getValue");
                }
            }, setValue: function (_692, _693) {
                var opts = $(_692).combotree("options");
                if (opts.multiple) {
                    if (_693) {
                        $(_692).combotree("setValues", _693.split(opts.separator));
                    } else {
                        $(_692).combotree("clear");
                    }
                } else {
                    $(_692).combotree("setValue", _693);
                }
            }, resize: function (_694, _695) {
                $(_694).combotree("resize", _695);
            }
        }, combogrid: {
            init: function (_696, _697) {
                var _698 = $("<input type=\"text\">").appendTo(_696);
                _698.combogrid(_697);
                return _698;
            }, destroy: function (_699) {
                $(_699).combogrid("destroy");
            }, getValue: function (_69a) {
                var opts = $(_69a).combogrid("options");
                if (opts.multiple) {
                    return $(_69a).combogrid("getValues").join(opts.separator);
                } else {
                    return $(_69a).combogrid("getValue");
                }
            }, setValue: function (_69b, _69c) {
                var opts = $(_69b).combogrid("options");
                if (opts.multiple) {
                    if (_69c) {
                        $(_69b).combogrid("setValues", _69c.split(opts.separator));
                    } else {
                        $(_69b).combogrid("clear");
                    }
                } else {
                    $(_69b).combogrid("setValue", _69c);
                }
            }, setText:function(t,txt){
                if ($(t).combogrid('options').lazy){ // 懒加载下拉表格
                    $(t).combogrid('setText',txt);
                }
            }, resize: function (_69d, _69e) {
                $(_69d).combogrid("resize", _69e);
            }
        },linkbutton: { /*增加linkbutton by wanghc 2018-05-30*/
            //{colHandler:desc}
            init: function (_67b, _67c) {
                var _67d = $("<a href='#'></a>").appendTo(_67b);
                _67d.linkbutton(_67c);
                _67d.click(_67c.handler);
                return _67d;
            }, destroy: function (_67e) {
                //$(_67e).linkbutton("destroy");
            }, getValue: function (_67f) {
                return $(_67f).linkbutton("options").text;
            }, setValue: function (_680, _681) {
                $(_680).linkbutton("options").text = _681;
                $(_680).linkbutton({});
            }, resize: function (_682, _683) {
                //$(_682).linkbutton("resize", _683);
            }
        },
        switchbox: { /*增加switchbox by wanghc 2018-05-30*/
            init: function (_67b, _67c) {
                var _67d = $("<div href='#'></div>").appendTo(_67b);
                _67d.switchbox(_67c);
                return _67d;
            }, destroy: function (_67e) {
                $(_67e).switchbox("destroy");
            }, getValue: function (_67f) {
                if ($(_67f).switchbox("getValue")){
                    return $(_67f).switchbox("options").onText;
                }else{
                    return $(_67f).switchbox("options").offText;
                }
            }, setValue: function (_680, _681) {
                //$(_680).switchbox("setActive",false);
                var flag = false;
                if ($(_680).switchbox("options").onText == _681){ flag=true }
                $(_680).switchbox("setValue",flag,false);
                //$(this).find(inputSelector).prop('checked', value).trigger('change', skipOnChange);
                //$(_680).switchbox("setActive",true);
            }, resize: function (_682, _683) {
                //$(_682).linkbutton("resize", _683);
            }
        },lookup:{
            init: function (_696, _697) {
                var _698 = $("<input class='textbox' type=\"text\">").appendTo(_696);
                _698.lookup(_697);
                return _698;
            }, destroy: function (_699) {
                $(_699).lookup("destroy");
            }, getValue: function (target) {
                return $(target).lookup("getText");
            }, setValue: function (target, val) {
                $(target).lookup("setText", val);
            }, resize: function (target, _69e) {
                $(target).lookup("resize", _69e);
            }
        },timespinner:{
            init: function (celltd, cfg) {
                var _698 = $("<input class='textbox' type=\"text\">").appendTo(celltd);
                _698.timespinner(cfg);
                return _698;
            }, destroy: function (target) {
                $(target).timespinner("destroy");
            }, getValue: function (target) {
                return $(target).timespinner("getValue");
            }, setValue: function (target, val) {
                $(target).timespinner("setValue", val);
            }, resize: function (target, _69e) {
                $(target).timespinner("resize", _69e);
            }
        }
    };
    function _getCheckboxRows(target, fieldName) {
        var arr = [];
        var data = $(target).datagrid('getRows');
        $(target).datagrid('getPanel').find('.datagrid-body td[field="' + fieldName + '"] input[type="checkbox"]').each(function () {
            var c = $(this).prop('checked');
            if (c) {
                var tr = $(this).closest('.datagrid-row');
                var index = tr.attr('datagrid-row-index');
                if (index>-1) arr.push(data[index]);
            }
        });
        return arr;
    };
    $.fn.datagrid.methods = {
        options: function (jq) {
            var _69f = $.data(jq[0], "datagrid").options;
            var _6a0 = $.data(jq[0], "datagrid").panel.panel("options");
            var opts = $.extend(_69f, { width: _6a0.width, height: _6a0.height, closed: _6a0.closed, collapsed: _6a0.collapsed, minimized: _6a0.minimized, maximized: _6a0.maximized });
            return opts;
        }, setSelectionState: function (jq) {
            return jq.each(function () {
                _5af(this);
            });
        }, createStyleSheet: function (jq) {
            return _506(jq[0]);
        }, getPanel: function (jq) {
            return $.data(jq[0], "datagrid").panel;
        }, getPager: function (jq) {
            return $.data(jq[0], "datagrid").panel.children("div.datagrid-pager");
        }, getColumnFields: function (jq, _6a1) {
            return _557(jq[0], _6a1);
        }, getColumnOption: function (jq, _6a2) {
            return _getColumnOption(jq[0], _6a2);
        }, resize: function (jq, _6a3) {
            return jq.each(function () {
                _515(this, _6a3);
            });
        }, load: function (jq, _6a4) {
            return jq.each(function () {
                var opts = $(this).datagrid("options");
                opts.pageNumber = 1;
                var _6a5 = $(this).datagrid("getPager");
                _6a5.pagination("refresh", { pageNumber: 1 });
                _577(this, _6a4);
            });
        }, reload: function (jq, _6a6) {
            return jq.each(function () {
                _577(this, _6a6);
            });
        }, reload2: function (jq) {
            return jq.each(function () {
                _reload2(this);
            });
        }, reloadFooter: function (jq, _6a7) {
            return jq.each(function () {
                var opts = $.data(this, "datagrid").options;
                var dc = $.data(this, "datagrid").dc;
                if (_6a7) {
                    $.data(this, "datagrid").footer = _6a7;
                }
                if (opts.showFooter) {
                    opts.view.renderFooter.call(opts.view, this, dc.footer2, false);
                    opts.view.renderFooter.call(opts.view, this, dc.footer1, true);
                    if (opts.view.onAfterRender) {
                        opts.view.onAfterRender.call(opts.view, this);
                    }
                    $(this).datagrid("fixRowHeight");
                }
            });
        }, loading: function (jq) {
            return jq.each(function () {
                var opts = $.data(this, "datagrid").options;
                $(this).datagrid("getPager").pagination("loading");
                if (opts.loadMsg) {
                    var _6a8 = $(this).datagrid("getPanel");
                    if (!_6a8.children("div.datagrid-mask").length) {
                        $("<div class=\"datagrid-mask\" style=\"display:block\"></div>").appendTo(_6a8);
                        var msg = $("<div class=\"datagrid-mask-msg\" style=\"display:block;left:50%\"></div>").html(opts.loadMsg).appendTo(_6a8);
                        msg._outerHeight(40);
                        msg.css({ marginLeft: (-msg.outerWidth() / 2), lineHeight: (msg.height() + "px") });
                    }
                }
                if (opts.refLinkButton && $(opts.refLinkButton).length>0) $(opts.refLinkButton).linkbutton('operationStart');
            });
        }, loaded: function (jq) {
            return jq.each(function () {
                var opts = $.data(this, "datagrid").options;
                $(this).datagrid("getPager").pagination("loaded");
                var _6a9 = $(this).datagrid("getPanel");
                _6a9.children("div.datagrid-mask-msg").remove();
                _6a9.children("div.datagrid-mask").remove();
                if (opts.refLinkButton && $(opts.refLinkButton).length>0) $(opts.refLinkButton).linkbutton('operationCompleted');
            });
        }, fitColumns: function (jq) {
            return jq.each(function () {
                _579(this);
            });
        }, fixColumnSize: function (jq, _6aa) {
            return jq.each(function () {
                _542(this, _6aa);
            });
        }, fixRowHeight: function (jq, _6ab) {
            return jq.each(function () {
                _fixRowHeight(this, _6ab);
            });
        },fixRowNumber : function (jq) {
                return jq.each(function () {
                    var panel = $(this).datagrid("getPanel");
                    //获取最后一行的number容器,并拷贝一份
                    var clone = $(".datagrid-cell-rownumber", panel).last().clone();
                    //由于在某些浏览器里面,是不支持获取隐藏元素的宽度,所以取巧一下
                    clone.css({
                        "position" : "absolute",
                        left : -1000
                    }).appendTo("body");
                    var width = clone.width("auto").width();
                    //默认宽度是25,所以只有大于25的时候才进行fix
                    if (width > 25) {
                        //多加5个像素,保持一点边距
                        $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 5);
                        //修改了宽度之后,需要对容器进行重新计算,所以调用resize
                        $(this).datagrid("resize");
                        //一些清理工作
                        clone.remove();
                        clone = null;
                    } else {
                        //还原成默认状态
                        $(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");
                    }
                });
            },freezeRow: function (jq, _6ac) {
            return jq.each(function () {
                _533(this, _6ac);
            });
        }, autoSizeColumn: function (jq, _6ad) {
            return jq.each(function () {
                _586(this, _6ad);
            });
        }, loadData: function (jq, data) {
            return jq.each(function () {
                _578(this, data);
                _630(this);
            });
        }, getData: function (jq) {
            return $.data(jq[0], "datagrid").data;
        }, getRows: function (jq) {
            return $.data(jq[0], "datagrid").data.rows;
        }, getFooterRows: function (jq) {
            return $.data(jq[0], "datagrid").footer;
        }, getRowIndex: function (jq, id) {
            return _5b7(jq[0], id);
        }, getChecked: function (jq) {
            return _5bd(jq[0]);
        }, getSelected: function (jq) {
            var rows = _5ba(jq[0]);
            return rows.length > 0 ? rows[0] : null;
        }, getSelections: function (jq) {
            return _5ba(jq[0]);
        }, clearSelections: function (jq) {
            return jq.each(function () {
                var _6ae = $.data(this, "datagrid");
                var _6af = _6ae.selectedRows;
                var _6b0 = _6ae.checkedRows;
                _6af.splice(0, _6af.length);
                _unselectAll(this);
                if (_6ae.options.checkOnSelect) {
                    _6b0.splice(0, _6b0.length);
                }
            });
        }, clearChecked: function (jq) {
            return jq.each(function () {
                var _6b1 = $.data(this, "datagrid");
                var _6b2 = _6b1.selectedRows;
                var _6b3 = _6b1.checkedRows;
                _6b3.splice(0, _6b3.length);
                _uncheckAll(this);
                if (_6b1.options.selectOnCheck) {
                    _6b2.splice(0, _6b2.length);
                }
            });
        }, scrollTo: function (jq, _6b4) {
            return jq.each(function () {
                _5c0(this, _6b4);
            });
        }, highlightRow: function (jq, _6b5) {
            return jq.each(function () {
                _5c7(this, _6b5);
                _5c0(this, _6b5);
            });
        }, selectAll: function (jq) {
            return jq.each(function () {
                _5da(this);
            });
        }, unselectAll: function (jq,isAllPage) {
            return jq.each(function () {
                _unselectAll(this,undefined,isAllPage);
            });
        }, selectRow: function (jq, _6b6) {
            return jq.each(function () {
                _5cb(this, _6b6);
            });
        }, selectRecord: function (jq, id) {
            return jq.each(function () {
                var opts = $.data(this, "datagrid").options;
                if (opts.idField) {
                    var _6b7 = _5b7(this, id);
                    if (_6b7 >= 0) {
                        $(this).datagrid("selectRow", _6b7);
                    }
                }
            });
        }, unselectRow: function (jq, _6b8) {
            return jq.each(function () {
                _5d3(this, _6b8);
            });
        }, checkRow: function (jq, _6b9) {
            return jq.each(function () {
                _5d2(this, _6b9);
            });
        }, uncheckRow: function (jq, _6ba) {
            return jq.each(function () {
                _uncheckRow(this, _6ba);
            });
        }, checkAll: function (jq) {
            return jq.each(function () {
                _5df(this);
            });
        }, uncheckAll: function (jq,isAllPage) {  // 取消所有数据的勾选
            return jq.each(function () {
                _uncheckAll(this,undefined,isAllPage);
            });
        }, beginEdit: function (jq, _6bb) {
            return jq.each(function () {
                _5f7(this, _6bb);
            });
        }, endEdit: function (jq, _6bc) {
            return jq.each(function () {
                _5fd(this, _6bc, false);
            });
        }, cancelEdit: function (jq, _6bd) {
            return jq.each(function () {
                _5fd(this, _6bd, true);
            });
        }, getEditors: function (jq, _6be) {
            return _608(jq[0], _6be);
        }, getEditor: function (jq, _6bf) {
            return _60c(jq[0], _6bf);
        }, refreshRow: function (jq, _6c0) {
            return jq.each(function () {
                var opts = $.data(this, "datagrid").options;
                opts.view.refreshRow.call(opts.view, this, _6c0);
            });
        }, validateRow: function (jq, _6c1) {
            return _validateRow(jq[0], _6c1);
        }, updateRow: function (jq, _6c2) {
            return jq.each(function () {
                var opts = $.data(this, "datagrid").options;
                opts.view.updateRow.call(opts.view, this, _6c2.index, _6c2.row);
            });
        }, appendRow: function (jq, row) {
            return jq.each(function () {
                _62d(this, row);
            });
        }, insertRow: function (jq, _6c3) {
            return jq.each(function () {
                _629(this, _6c3);
            });
        }, deleteRow: function (jq, _6c4) {
            return jq.each(function () {
                _6c4 = parseInt(_6c4);  /** 当传入的rowIndex为字符串时（如"1"，+1后就变成了"11"，而不是期待的数字2) ,导致出现一行空白行*/
                _623(this, _6c4);
            });
        }, getChanges: function (jq, _6c5) {
            return _61d(jq[0], _6c5);
        }, acceptChanges: function (jq) {
            return jq.each(function () {
                _634(this);
            });
        }, rejectChanges: function (jq) {
            return jq.each(function () {
                _636(this);
            });
        }, mergeCells: function (jq, _6c6) {
            return jq.each(function () {
                _649(this, _6c6);
            });
        }, showColumn: function (jq, _6c7) {
            return jq.each(function () {
                var _6c8 = $(this).datagrid("getPanel");
                _6c8.find("td[field=\"" + _6c7 + "\"]").show();
                $(this).datagrid("getColumnOption", _6c7).hidden = false;
                $(this).datagrid("fitColumns");
            });
        }, hideColumn: function (jq, _6c9) {
            return jq.each(function () {
                var _6ca = $(this).datagrid("getPanel");
                _6ca.find("td[field=\"" + _6c9 + "\"]").hide();
                $(this).datagrid("getColumnOption", _6c9).hidden = true;
                $(this).datagrid("fitColumns");
            });
        }, sort: function (jq, _6cb) {
            return jq.each(function () {
                _56c(this, _6cb);
            });
        },setColumnTitle:function(jq,colOpt){
            return jq.each(function(){
                var _69f = $.data($(this)[0], "datagrid").dc.header2;
                //var _6ca = $(this).datagrid("getPanel");
                for(var f in colOpt){
                    _69f.find('.datagrid-header-row td[field="'+f+'"] .datagrid-cell span').first().html( $.hisui.getTrans(colOpt[f])  ); //add trans
                }
            });
        },getEditingIndex: function (jq) {
            var opts = $.data(jq[0], "datagrid").options;
            if(opts) {
                var tr = opts.finder.getTr(jq[0], "", "editing", 2);
                if (tr) return tr.attr("datagrid-row-index");
            }
            return undefined;
        }, getCheckboxRows:function(jq,fieldName) {
            return _getCheckboxRows(jq[0], fieldName);
        }
    };
    $.fn.datagrid.parseOptions = function (_6cc) {
        var t = $(_6cc);
        return $.extend({}, $.fn.panel.parseOptions(_6cc), $.parser.parseOptions(_6cc, ["url", "toolbar","btoolbar", "idField", "sortName", "sortOrder", "pagePosition", "resizeHandle", { sharedStyleSheet: "boolean", fitColumns: "boolean", autoRowHeight: "boolean", striped: "boolean", nowrap: "boolean" }, { rownumbers: "boolean", singleSelect: "boolean", ctrlSelect: "boolean", checkOnSelect: "boolean", selectOnCheck: "boolean" }, { pagination: "boolean", pageSize: "number", pageNumber: "number" }, { multiSort: "boolean", remoteSort: "boolean", showHeader: "boolean", showFooter: "boolean" }, { scrollbarSize: "number" }]), { pageList: (t.attr("pageList") ? eval(t.attr("pageList")) : undefined), loadMsg: (t.attr("loadMsg") != undefined ? t.attr("loadMsg") : undefined), rowStyler: (t.attr("rowStyler") ? eval(t.attr("rowStyler")) : undefined) });
    };
    $.fn.datagrid.parseData = function (_6cd) {
        var t = $(_6cd);
        var data = { total: 0, rows: [] };
        var _6ce = t.datagrid("getColumnFields", true).concat(t.datagrid("getColumnFields", false));
        t.find("tbody tr").each(function () {
            data.total++;
            var row = {};
            $.extend(row, $.parser.parseOptions(this, ["iconCls", "state"]));
            for (var i = 0; i < _6ce.length; i++) {
                row[_6ce[i]] = $(this).find("td:eq(" + i + ")").html();
            }
            data.rows.push(row);
        });
        return data;
    };
    var _6cf = {
        render: function (_6d0, _6d1, _6d2) {
            var _6d3 = $.data(_6d0, "datagrid");
            var opts = _6d3.options;
            var rows = _6d3.data.rows;
            var _6d4 = $(_6d0).datagrid("getColumnFields", _6d2);
            if (_6d2) {
                if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))) {
                    return;
                }
            }
            if (rows.length>0){
                var _6d5 = ["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
                for (var i = 0; i < rows.length; i++) {
                    var css = opts.rowStyler ? opts.rowStyler.call(_6d0, i, rows[i]) : "";
                    var _6d6 = "";
                    var _6d7 = "";
                    if (typeof css == "string") {
                        _6d7 = css;
                    } else {
                        if (css) {
                            _6d6 = css["class"] || "";
                            _6d7 = css["style"] || "";
                        }
                    }
                    var cls = "class=\"datagrid-row " + (i % 2 && opts.striped ? "datagrid-row-alt " : " ") + _6d6 + "\"";
                    var _6d8 = _6d7 ? "style=\"" + _6d7 + "\"" : "";
                    var _6d9 = _6d3.rowIdPrefix + "-" + (_6d2 ? 1 : 2) + "-" + i;
                    _6d5.push("<tr id=\"" + _6d9 + "\" datagrid-row-index=\"" + i + "\" " + cls + " " + _6d8 + ">");
                    _6d5.push(this.renderRow.call(this, _6d0, _6d4, _6d2, i, rows[i]));
                    _6d5.push("</tr>");
                }
                _6d5.push("</tbody></table>");
                /**
                 * wanghc 2022-01-26
                 * 在加载新数据前把前一表格数据中tooltip清除，
                 * 需求号：1998566 对部分消毒包名称较长的，需要增加showTip属性进行提示，如下方式会一直存在提示效果，只有关闭对应界面才能去掉 
                 * 当mouse在数据行上有提示时,load表格数据,以前td的tooltip不会hide，导致一直显示
                 */
                $(_6d1).find("td").tooltip('destroy');
                //$(_6d1).html(_6d5.join("")); // IE中提升速度
                $(_6d1)[0].innerHTML =_6d5.join(""); 
            }else{
                // 增加判断,空数据增加滚动条 2018-12-20 wanghc
                $(_6d1).html("<div style='width:"+_6d3.dc.view2.find(".datagrid-header-row").width()+"px;border:solid 0px;height:1px;'></div>");
            }
        }, renderFooter: function (_6da, _6db, _6dc) {
            var opts = $.data(_6da, "datagrid").options;
            var rows = $.data(_6da, "datagrid").footer || [];
            var _6dd = $(_6da).datagrid("getColumnFields", _6dc);
            var _6de = ["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
            for (var i = 0; i < rows.length; i++) {
                _6de.push("<tr class=\"datagrid-row\" datagrid-row-index=\"" + i + "\">");
                _6de.push(this.renderRow.call(this, _6da, _6dd, _6dc, i, rows[i]));
                _6de.push("</tr>");
            }
            _6de.push("</tbody></table>");
            $(_6db).html(_6de.join(""));
        }, renderRow: function (_6df, _6e0, _6e1, _6e2, _6e3) {
            /** 生成tr内的html: <td>...</td> */
            var opts = $.data(_6df, "datagrid").options;
            var cc = [];
            if (_6e1 && opts.rownumbers) {
                var _6e4 = _6e2 + 1;
                if (opts.pagination) {
                    _6e4 += (opts.pageNumber - 1) * opts.pageSize;
                }
                cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">" + _6e4 + "</div></td>");
            }
            for (var i = 0; i < _6e0.length; i++) {
                var _6e5 = _6e0[i];
                var col = $(_6df).datagrid("getColumnOption", _6e5);
                if (col) {
                    var _6e6 = _6e3[_6e5];
                    var css = col.styler ? (col.styler(_6e6, _6e3, _6e2) || "") : "";
                    var _6e7 = "";
                    var _6e8 = "";
                    if (typeof css == "string") {
                        _6e8 = css;
                    } else {
                        if (css) {
                            _6e7 = css["class"] || "";
                            _6e8 = css["style"] || "";
                        }
                    }
                    var cls = _6e7 ? "class=\"" + _6e7 + "\"" : "";
                    var _6e9 = col.hidden ? "style=\"display:none;" + _6e8 + "\"" : (_6e8 ? "style=\"" + _6e8 + "\"" : "");
                    cc.push("<td field=\"" + _6e5 + "\" " + cls + " " + _6e9 + ">");
                    var _6e9 = "";
                    if (!col.checkbox) {
                        if (col.align) {
                            _6e9 += "text-align:" + col.align + ";";
                        }
                        if ("undefined" != typeof col.wordBreak){
                            _6e9 += "word-break: "+col.wordBreak+";";
                        }
                        if (!opts.nowrap) {
                            _6e9 += "white-space:normal;height:auto;";
                        } else {
                            if (opts.autoRowHeight) {
                                _6e9 += "height:auto;";
                            }
                        }
                    }
                    cc.push("<div style=\"" + _6e9 + "\" ");
                    cc.push(col.checkbox ? "class=\"datagrid-cell-check\"" : "class=\"datagrid-cell " + col.cellClass + "\"");
                    cc.push(">");
                    if (col.checkbox) {
                        cc.push("<input type=\"checkbox\" " + (_6e3.checked ? "checked=\"checked\"" : ""));
                        cc.push(" name=\"" + _6e5 + "\" value=\"" + (_6e6 != undefined ? _6e6 : "") + "\">");
                    } else {
                        if (col.formatter) {
                            cc.push(col.formatter(_6e6, _6e3, _6e2));
                        } else {
                            if('string'==typeof _6e6){
                                if (_6e6.indexOf("<")>-1 && _6e6.indexOf(">")==-1) {
                                    _6e6 = _6e6.replace(/</g,'&lt;'); // wanghc 2019-12-18 转义 <后是字母会导致后面不值不显示
                                }
                                if (_6e6.indexOf(">")>-1 && _6e6.indexOf("<")==-1) {
                                    _6e6 = _6e6.replace(/>/g,'&gt;'); // wanghc 2019-12-18 转义 <后是字母会导致后面不值不显示
                                }
                            }
                            cc.push(_6e6);
                        }
                    }
                    cc.push("</div>");
                    cc.push("</td>");
                }
            }
            return cc.join("");
        }, refreshRow: function (_6ea, _6eb) {
            this.updateRow.call(this, _6ea, _6eb, {});
        }, updateRow: function (_6ec, _6ed, row) {
            var opts = $.data(_6ec, "datagrid").options;
            var rows = $(_6ec).datagrid("getRows");
            $.extend(rows[_6ed], row);
            var css = opts.rowStyler ? opts.rowStyler.call(_6ec, _6ed, rows[_6ed]) : "";
            var _6ee = "";
            var _6ef = "";
            if (typeof css == "string") {
                _6ef = css;
            } else {
                if (css) {
                    _6ee = css["class"] || "";
                    _6ef = css["style"] || "";
                }
            }
            var _6ee = "datagrid-row " + (_6ed % 2 && opts.striped ? "datagrid-row-alt " : " ") + _6ee  ;
            function _6f0(_6f1) {
                var _6f2 = $(_6ec).datagrid("getColumnFields", _6f1);
                var tr = opts.finder.getTr(_6ec, _6ed, "body", (_6f1 ? 1 : 2));
                var _6f3 = tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
                //wanghc 以前td有datagrid-value-changed样式的,还得加上 实现修改后小红三角
                //---start
                if (opts.showChangedStyle){
                    var changedFields=[];
                    tr.children(".datagrid-value-changed").each(function(){
                        changedFields.push($(this).attr("field"));
                    });
                }
                //---end
                tr.html(this.renderRow.call(this, _6ec, _6f2, _6f1, _6ed, rows[_6ed]));
                //---start 加上样式
                if (opts.showChangedStyle){   
                    for (var i=0;i<changedFields.length;i++){
                        tr.children('td[field="'+changedFields[i]+'"]').addClass("datagrid-value-changed");
                    }
                }
                //---end
                // neer 2019-05-19 如果datagrid的配置项checkbox:true时且为可编辑表格时，endEdit调用时不能清空datagrid-row-checked状态d
                var isRowChecked = tr.hasClass('datagrid-row-checked');
                tr.attr("style", _6ef).attr("class", tr.hasClass("datagrid-row-selected") ? _6ee + " datagrid-row-selected" : _6ee)
                if (isRowChecked){ tr.addClass('datagrid-row-checked');}
                if (_6f3) {
                    tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", true);
                }
            };
            _6f0.call(this, true); /** true表示number列 */
            _6f0.call(this, false); /**false表示内容列 */
            $(_6ec).datagrid("fixRowHeight", _6ed);
        }, insertRow: function (_6f4, _6f5, row) {
            var _6f6 = $.data(_6f4, "datagrid");
            var opts = _6f6.options;
            var dc = _6f6.dc;
            var data = _6f6.data;
            if (_6f5 == undefined || _6f5 == null) {
                _6f5 = data.rows.length;
            }
            if (_6f5 > data.rows.length) {
                _6f5 = data.rows.length;
            }
            function _6f7(_6f8) {
                var _6f9 = _6f8 ? 1 : 2;
                for (var i = data.rows.length - 1; i >= _6f5; i--) {
                    var tr = opts.finder.getTr(_6f4, i, "body", _6f9);
                    tr.attr("datagrid-row-index", i + 1);
                    tr.attr("id", _6f6.rowIdPrefix + "-" + _6f9 + "-" + (i + 1));
                    if (_6f8 && opts.rownumbers) {
                        var _6fa = i + 2;
                        if (opts.pagination) {
                            _6fa += (opts.pageNumber - 1) * opts.pageSize;
                        }
                        tr.find("div.datagrid-cell-rownumber").html(_6fa);
                    }
                    if (opts.striped) {
                        tr.removeClass("datagrid-row-alt").addClass((i + 1) % 2 ? "datagrid-row-alt" : "");
                    }
                }
            };
            function _6fb(_6fc) {
                var _6fd = _6fc ? 1 : 2;
                var _6fe = $(_6f4).datagrid("getColumnFields", _6fc);
                var _6ff = _6f6.rowIdPrefix + "-" + _6fd + "-" + _6f5;
                var tr = "<tr id=\"" + _6ff + "\" class=\"datagrid-row\" datagrid-row-index=\"" + _6f5 + "\"></tr>";
                if (_6f5 >= data.rows.length) {
                    if (data.rows.length) {
                        opts.finder.getTr(_6f4, "", "last", _6fd).after(tr);
                    } else {
                        var cc = _6fc ? dc.body1 : dc.body2;
                        cc.html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>" + tr + "</tbody></table>");
                    }
                } else {
                    opts.finder.getTr(_6f4, _6f5 + 1, "body", _6fd).before(tr);
                }
            };
            _6f7.call(this, true);
            _6f7.call(this, false);
            _6fb.call(this, true);
            _6fb.call(this, false);
            data.total += 1;
            data.rows.splice(_6f5, 0, row);
            this.refreshRow.call(this, _6f4, _6f5);
        }, deleteRow: function (_700, _701) {
            var _702 = $.data(_700, "datagrid");
            var opts = _702.options;
            var data = _702.data;
            function _703(_704) {
                var _705 = _704 ? 1 : 2;
                for (var i = _701 + 1; i < data.rows.length; i++) {
                    var tr = opts.finder.getTr(_700, i, "body", _705);
                    tr.attr("datagrid-row-index", i - 1);
                    tr.attr("id", _702.rowIdPrefix + "-" + _705 + "-" + (i - 1));
                    if (_704 && opts.rownumbers) {
                        var _706 = i;
                        if (opts.pagination) {
                            _706 += (opts.pageNumber - 1) * opts.pageSize;
                        }
                        tr.find("div.datagrid-cell-rownumber").html(_706);
                    }
                    if (opts.striped) {
                        tr.removeClass("datagrid-row-alt").addClass((i - 1) % 2 ? "datagrid-row-alt" : "");
                    }
                }
            };
            opts.finder.getTr(_700, _701).remove();
            _703.call(this, true);
            _703.call(this, false);
            data.total -= 1;
            data.rows.splice(_701, 1);
        }, onBeforeRender: function (_707, rows) {
        }, onAfterRender: function (_708) {
            var opts = $.data(_708, "datagrid").options;
            if (opts.showFooter) {
                var _709 = $(_708).datagrid("getPanel").find("div.datagrid-footer");
                _709.find("div.datagrid-cell-rownumber,div.datagrid-cell-check").css("visibility", "hidden");
            }
        }
    };
    $.fn.datagrid.defaults = $.extend({}, $.fn.panel.defaults, {
        columnsUrl: null, /* 获得列定义信息的全路径，返回列定义json 2022-11-01 */
        editColumnsPage: null, /* 修改列定义的界面全路径 2022-11-01 */
        editColumnsGrantUrl: null, /*判断当前判状态能不能修改列定义,返回1能修改，0不能修改*/
        onInitBefore:null, /*在grid初始化前 options,this*/
        loadBeforeClearSelect:false, /* 加载数据前清空全选 2022-01-25 */
        singleRequest:false, /* 发送下一请求前,abort前一请求, 20211110*/
        shiftCheck:false,
        fontSize:"",/*表格内容字体大小 fontSize:9 20200824*/
        lineHeight:"",/*列的行高 20201126*/
        titleNoWrap:true, /*表头不折行 20200824*/
        className:"",
        queryName:"",
        compContext:"",
        showChangedStyle:true, /*wanghc editor状态下,是否显示修改后的左上小红三角 */
        fixRowNumber:false, /*wanghc 行号列是否自动适应 */
        autoSizeColumn:true, /*wanghc 速度更新配置成false*/
        sharedStyleSheet: false, frozenColumns: undefined, columns: undefined, fitColumns: false, resizeHandle: "right", autoRowHeight: true, 
        btoolbar:null, /* bottom tool bar*/
        toolbar: null, striped: true, method: "post", nowrap: true, idField: null, url: null, data: null, loadMsg: "Processing, please wait ...", rownumbers: false, singleSelect: false, ctrlSelect: false, selectOnCheck: true, checkOnSelect: true, pagination: false, pagePosition: "bottom", pageNumber: 1, pageSize: 10, pageList: [10, 20, 30, 40, 50,100,200], queryParams: {}, sortName: null, sortOrder: "asc", multiSort: false, remoteSort: true, showHeader: true, showFooter: false, scrollbarSize: 18, rowStyler: function (_70a, _70b) {
        }, loader: function (_70c, _70d, _70e) {
            var opts = $(this).datagrid("options");
            if (!opts.url) {
                return false;
            }
            /*需求号：2286826 hisui的datagrid的全选勾在刷新datagrid的时候不能清空勾选状态,增加配置. 为true时清空选中状态 */
            if (opts.loadBeforeClearSelect) $(this).datagrid('unselectAll').datagrid('uncheckAll');

            /*医嘱录入界面输入as查询，a查询需要3秒，as查询需要1秒，则会先出来as结果，过2秒后显示a的结果，导致放大镜结果与查询条件不符*/
            /*2021-11-03 发出当前请求时,把上一请求取消掉canceled*/
            if(opts.singleRequest && opts.currentAjax) opts.currentAjax.abort();
            opts.currentAjax = $.ajax({
                type: opts.method, url: opts.url, data: _70c, dataType: "json", success: function (data) {
                    
                    if ('undefined' !== typeof data.code && !$.isArray(data.rows)) {
                        if (data.code == '4001') {
                            $.messager.popover({ msg: data.msg, type: 'error' });
                        }
                        var rowData = {total: 0, rows: [] };
                        if (data.data!=null && 'object' == typeof data.data) {
                            rowData = data.data;
                            if ($.isArray(data.data.records)){ // HOS是使用records作为数组的键名
                                rowData.rows = data.data.records;
                            }
                        }
                        rowData.message = data.message || data.msg;
                        _70d(rowData);
                    } else {
                        _70d(data);
                    }
                }, error: function () {
                    _70e.apply(this, arguments);
                }
            });
        }, loadFilter: function (data) {
            if (typeof data.length == "number" && typeof data.splice == "function") {
                return { total: data.length, rows: data };
            } else {
                return data;
            }
        }, editors: _651, finder: {
            getTr: function (_70f, _710, type, _711) {
                type = type || "body";
                _711 = _711 || 0;
                var _712 = $.data(_70f, "datagrid");
                var dc = _712.dc;
                var opts = _712.options;
                if (_711 == 0) {
                    var tr1 = opts.finder.getTr(_70f, _710, type, 1);
                    var tr2 = opts.finder.getTr(_70f, _710, type, 2);
                    return tr1.add(tr2);
                } else {
                    if (type == "body") {
                        var tr = $("#" + _712.rowIdPrefix + "-" + _711 + "-" + _710);
                        if (!tr.length) {
                            tr = (_711 == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index=" + _710 + "]");
                        }
                        return tr;
                    } else {
                        if (type == "footer") {
                            return (_711 == 1 ? dc.footer1 : dc.footer2).find(">table>tbody>tr[datagrid-row-index=" + _710 + "]");
                        } else {
                            if (type == "selected") {
                                return (_711 == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr.datagrid-row-selected");
                            } else {
                                if (type == "highlight") {
                                    return (_711 == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr.datagrid-row-over");
                                } else {
                                    if (type == "checked") {
                                        return (_711 == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr.datagrid-row-checked");
                                    } else {
                                        if (type == "last") {
                                            return (_711 == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index]:last");
                                        } else {
                                            if (type == "allbody") {
                                                return (_711 == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index]");
                                            } else {
                                                if (type == "allfooter") {
                                                    return (_711 == 1 ? dc.footer1 : dc.footer2).find(">table>tbody>tr[datagrid-row-index]");
                                                }else{
                                                    if (type=="editing"){
                                                        return (_711 == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr.datagrid-row-editing");
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
            }, getRow: function (_713, p) {
                var _714 = (typeof p == "object") ? p.attr("datagrid-row-index") : p;
                return $.data(_713, "datagrid").data.rows[parseInt(_714)];
            }, getRows: function (_715) {
                return $(_715).datagrid("getRows");
            }
        }, view: _6cf, onBeforeLoad: function (_716) {
        }, onLoadSuccess: function () {
        }, onLoadError: function () {
        }, onClickRow: function (_717, _718) {
        }, onDblClickRow: function (_719, _71a) {
        }, onClickCell: function (_71b, _71c, _71d) {
        }, onDblClickCell: function (_71e, _71f, _720) {
        }, onBeforeSortColumn: function (sort, _721) {
        }, onSortColumn: function (sort, _722) {
        }, onResizeColumn: function (_723, _724) {
        }, onBeforeSelect: function (_725, _726) {
        }, onSelect: function (_725, _726) {
        }, onBeforeUnselect:function(_727, _728){
        }, onUnselect: function (_727, _728) {
        }, onSelectAll: function (rows) {
        }, onUnselectAll: function (rows) {
        }, onBeforeCheck:function (_729, _72a){
        }, onCheck: function (_729, _72a) {
        }, onBeforeUncheck:function (_72b, _72c){
        }, onUncheck: function (_72b, _72c) {
        }, onCheckAll: function (rows) {
        }, onUncheckAll: function (rows) {
        }, onBeforeEdit: function (_72d, _72e) {
        }, onBeginEdit: function (_72f, _730) {
        }, onEndEdit: function (_731, _732, _733) {
        }, onAfterEdit: function (_734, _735, _736) {
        }, onCancelEdit: function (_737, _738) {
        }, onHeaderContextMenu: function (e, _739) {
        }, onRowContextMenu: function (e, _73a, _73b) {
        }, onDblClickHeader:function(e,_739){    //cryze 双击表格头事件，默认
        },lazy:false    //cryze 2018-3-22 为true初始化不加载列表数据
        ,onHighlightRow:function(index,row){ //cryze datagrid 高亮行(鼠标悬浮和combogrid上下选时)触发事件
        },onColumnsLoad:function(grid,cm){
        },clickDelay:0,  //cryze 2019-09-10 解决lookup 快速点击行问题
        clicksToEdit: 0, //1单击编辑，2双击编辑，0无
        showFilterToolbar: false, // 显示过滤工具栏
        toolBarOriginalData: null, /*缓存工具条查询初始数据*/
        findBtn:"Find",
        clearBtn:"Clear",
        advancedBtn: "Advance",
        advanced2Btn: "Collapse",
        like: "like",
        defaultsColumns: null,
        clearSelectionsOnload:false,  /*load时清除选中信息*/
        refLinkButton:null,
        //'local'表示过滤originRows||rows数据；
        //'remote'不会过滤数据，只会触发datagrid的reload方法，可以通过onBeforeLoad来重写参数。 默认值'local'
        filterToolbarType : 'local'
    });
})(jQuery);