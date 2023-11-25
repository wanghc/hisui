(function ($) {
    function _b5(_b6) {
        var _b7 = $(_b6);
        _b7.addClass("tree");
        return _b7;
    };
    function _b8(_b9) {
        var _ba = $.data(_b9, "tree").options;
        $(_b9).unbind().bind("mouseover", function (e) {
            var tt = $(e.target);
            var _bb = tt.closest("div.tree-node");
            if (!_bb.length) {
                return;
            }
            _bb.addClass("tree-node-hover");
            if (tt.hasClass("tree-hit")) {
                if (tt.hasClass("tree-expanded")) {
                    tt.addClass("tree-expanded-hover");
                } else {
                    tt.addClass("tree-collapsed-hover");
                }
            }
            e.stopPropagation();
        }).bind("mouseout", function (e) {
            var tt = $(e.target);
            var _bc = tt.closest("div.tree-node");
            if (!_bc.length) {
                return;
            }
            _bc.removeClass("tree-node-hover");
            if (tt.hasClass("tree-hit")) {
                if (tt.hasClass("tree-expanded")) {
                    tt.removeClass("tree-expanded-hover");
                } else {
                    tt.removeClass("tree-collapsed-hover");
                }
            }
            e.stopPropagation();
        }).bind("click", function (e) {
            var tt = $(e.target);
            var _bd = tt.closest("div.tree-node");
            if (!_bd.length) {
                return;
            }
            if (tt.hasClass("tree-hit")) {
                _125(_b9, _bd[0]);
                return false;
            } else {
                if (tt.hasClass("tree-checkbox")) {
                    _check(_b9, _bd[0], !tt.hasClass("tree-checkbox1"));
                    return false;
                } else {
                    _16a(_b9, _bd[0]);
                    _ba.onClick.call(_b9, _c0(_b9, _bd[0]));
                }
            }
            e.stopPropagation();
        }).bind("dblclick", function (e) {
            var _be = $(e.target).closest("div.tree-node");
            if (!_be.length) {
                return;
            }
            _16a(_b9, _be[0]);
            _ba.onDblClick.call(_b9, _c0(_b9, _be[0]));
            e.stopPropagation();
        }).bind("contextmenu", function (e) {
            var _bf = $(e.target).closest("div.tree-node");
            if (!_bf.length) {
                return;
            }
            _ba.onContextMenu.call(_b9, e, _c0(_b9, _bf[0]));
            e.stopPropagation();
        });
    };
    function _c1(_c2) {
        var _c3 = $.data(_c2, "tree").options;
        _c3.dnd = false;
        var _c4 = $(_c2).find("div.tree-node");
        _c4.draggable("disable");
        _c4.css("cursor", "pointer");
    };
    function _c5(_c6) {
        var _c7 = $.data(_c6, "tree");
        var _c8 = _c7.options;
        var _c9 = _c7.tree;
        _c7.disabledNodes = [];
        _c8.dnd = true;
        _c9.find("div.tree-node").draggable({
            disabled: false, revert: true, cursor: "pointer", proxy: function (_ca) {
                var p = $("<div class=\"tree-node-proxy\"></div>").appendTo("body");
                p.html("<span class=\"tree-dnd-icon tree-dnd-no\">&nbsp;</span>" + $(_ca).find(".tree-title").html());
                p.hide();
                return p;
            }, deltaX: 15, deltaY: 15, onBeforeDrag: function (e) {
                if (_c8.onBeforeDrag.call(_c6, _c0(_c6, this)) == false) {
                    return false;
                }
                if ($(e.target).hasClass("tree-hit") || $(e.target).hasClass("tree-checkbox")) {
                    return false;
                }
                if (e.which != 1) {
                    return false;
                }
                $(this).next("ul").find("div.tree-node").droppable({ accept: "no-accept" });
                var _cb = $(this).find("span.tree-indent");
                if (_cb.length) {
                    e.data.offsetWidth -= _cb.length * _cb.width();
                }
            }, onStartDrag: function () {
                $(this).draggable("proxy").css({ left: -10000, top: -10000 });
                _c8.onStartDrag.call(_c6, _c0(_c6, this));
                var _cc = _c0(_c6, this);
                if (_cc.id == undefined) {
                    _cc.id = "hisui_tree_node_id_temp";
                    _108(_c6, _cc);
                }
                _c7.draggingNodeId = _cc.id;
            }, onDrag: function (e) {
                var x1 = e.pageX, y1 = e.pageY, x2 = e.data.startX, y2 = e.data.startY;
                var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                if (d > 3) {
                    $(this).draggable("proxy").show();
                }
                this.pageY = e.pageY;
            }, onStopDrag: function () {
                $(this).next("ul").find("div.tree-node").droppable({ accept: "div.tree-node" });
                for (var i = 0; i < _c7.disabledNodes.length; i++) {
                    $(_c7.disabledNodes[i]).droppable("enable");
                }
                _c7.disabledNodes = [];
                var _cd = _162(_c6, _c7.draggingNodeId);
                if (_cd && _cd.id == "hisui_tree_node_id_temp") {
                    _cd.id = "";
                    _108(_c6, _cd);
                }
                _c8.onStopDrag.call(_c6, _cd);
            }
        }).droppable({
            accept: "div.tree-node", onDragEnter: function (e, _ce) {
                if (_c8.onDragEnter.call(_c6, this, _cf(_ce)) == false) {
                    _d0(_ce, false);
                    $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                    $(this).droppable("disable");
                    _c7.disabledNodes.push(this);
                }
            }, onDragOver: function (e, _d1) {
                if ($(this).droppable("options").disabled) {
                    return;
                }
                var _d2 = _d1.pageY;
                var top = $(this).offset().top;
                var _d3 = top + $(this).outerHeight();
                _d0(_d1, true);
                $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                if (_d2 > top + (_d3 - top) / 2) {
                    if (_d3 - _d2 < 5) {
                        $(this).addClass("tree-node-bottom");
                    } else {
                        $(this).addClass("tree-node-append");
                    }
                } else {
                    if (_d2 - top < 5) {
                        $(this).addClass("tree-node-top");
                    } else {
                        $(this).addClass("tree-node-append");
                    }
                }
                if (_c8.onDragOver.call(_c6, this, _cf(_d1)) == false) {
                    _d0(_d1, false);
                    $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                    $(this).droppable("disable");
                    _c7.disabledNodes.push(this);
                }
            }, onDragLeave: function (e, _d4) {
                _d0(_d4, false);
                $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                _c8.onDragLeave.call(_c6, this, _cf(_d4));
            }, onDrop: function (e, _d5) {
                var _d6 = this;
                var _d7, _d8;
                if ($(this).hasClass("tree-node-append")) {
                    _d7 = _d9;
                    _d8 = "append";
                } else {
                    _d7 = _da;
                    _d8 = $(this).hasClass("tree-node-top") ? "top" : "bottom";
                }
                if (_c8.onBeforeDrop.call(_c6, _d6, _cf(_d5), _d8) == false) {
                    $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
                    return;
                }
                _d7(_d5, _d6, _d8);
                $(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
            }
        });
        function _cf(_db, pop) {
            return $(_db).closest("ul.tree").tree(pop ? "pop" : "getData", _db);
        };
        function _d0(_dc, _dd) {
            var _de = $(_dc).draggable("proxy").find("span.tree-dnd-icon");
            _de.removeClass("tree-dnd-yes tree-dnd-no").addClass(_dd ? "tree-dnd-yes" : "tree-dnd-no");
        };
        function _d9(_df, _e0) {
            if (_c0(_c6, _e0).state == "closed") {
                _11d(_c6, _e0, function () {
                    _e1();
                });
            } else {
                _e1();
            }
            function _e1() {
                var _e2 = _cf(_df, true);
                $(_c6).tree("append", { parent: _e0, data: [_e2] });
                _c8.onDrop.call(_c6, _e0, _e2, "append");
            };
        };
        function _da(_e3, _e4, _e5) {
            var _e6 = {};
            if (_e5 == "top") {
                _e6.before = _e4;
            } else {
                _e6.after = _e4;
            }
            var _e7 = _cf(_e3, true);
            _e6.data = _e7;
            $(_c6).tree("insert", _e6);
            _c8.onDrop.call(_c6, _e4, _e7, _e5);
        };
    };
    function _check(_e9, _ea, _eb) {
        var _ec = $.data(_e9, "tree").options;
        if (!_ec.checkbox) {
            return;
        }
        var _ed = _c0(_e9, _ea);
        if (_ec.onBeforeCheck.call(_e9, _ed, _eb) == false) {
            return;
        }
        var _ee = $(_ea);
        var ck = _ee.find(".tree-checkbox");
        ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
        if (_eb) {
            ck.addClass("tree-checkbox1");
        } else {
            ck.addClass("tree-checkbox0");
        }
        if (_ec.cascadeCheck) {
            _ef(_ee);
            _f0(_ee);
        }
        _ec.onCheck.call(_e9, _ed, _eb);
        function _f0(_f1) {
            var _f2 = _f1.next().find(".tree-checkbox");
            _f2.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
            if (_f1.find(".tree-checkbox").hasClass("tree-checkbox1")) {
                _f2.addClass("tree-checkbox1");
            } else {
                _f2.addClass("tree-checkbox0");
            }
        };
        function _ef(_f3) {
            var _f4 = _130(_e9, _f3[0]);
            if (_f4) {
                var ck = $(_f4.target).find(".tree-checkbox");
                ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
                if (_f5(_f3)) {
                    ck.addClass("tree-checkbox1");
                } else {
                    if (_f6(_f3)) {
                        ck.addClass("tree-checkbox0");
                    } else {
                        ck.addClass("tree-checkbox2");
                    }
                }
                _ef($(_f4.target));
            }
            function _f5(n) {
                var ck = n.find(".tree-checkbox");
                if (ck.hasClass("tree-checkbox0") || ck.hasClass("tree-checkbox2")) {
                    return false;
                }
                var b = true;
                n.parent().siblings().each(function () {
                    if (!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")) {
                        b = false;
                    }
                });
                return b;
            };
            function _f6(n) {
                var ck = n.find(".tree-checkbox");
                if (ck.hasClass("tree-checkbox1") || ck.hasClass("tree-checkbox2")) {
                    return false;
                }
                var b = true;
                n.parent().siblings().each(function () {
                    if (!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")) {
                        b = false;
                    }
                });
                return b;
            };
        };
    };
    function _f7(_f8, _f9) {
        var _fa = $.data(_f8, "tree").options;
        if (!_fa.checkbox) {
            return;
        }
        var _fb = $(_f9);
        if (_fc(_f8, _f9)) {
            var ck = _fb.find(".tree-checkbox");
            if (ck.length) {
                if (ck.hasClass("tree-checkbox1")) {
                    _check(_f8, _f9, true);
                } else {
                    _check(_f8, _f9, false);
                }
            } else {
                if (_fa.onlyLeafCheck) {
                    $("<span class=\"tree-checkbox tree-checkbox0\"></span>").insertBefore(_fb.find(".tree-title"));
                }
            }
        } else {
            var ck = _fb.find(".tree-checkbox");
            if (_fa.onlyLeafCheck) {
                ck.remove();
            } else {
                if (ck.hasClass("tree-checkbox1")) {
                    _check(_f8, _f9, true);
                } else {
                    if (ck.hasClass("tree-checkbox2")) {
                        var _fd = true;
                        var _fe = true;
                        var _ff = _100(_f8, _f9);
                        for (var i = 0; i < _ff.length; i++) {
                            if (_ff[i].checked) {
                                _fe = false;
                            } else {
                                _fd = false;
                            }
                        }
                        if (_fd) {
                            _check(_f8, _f9, true);
                        }
                        if (_fe) {
                            _check(_f8, _f9, false);
                        }
                    }
                }
            }
        }
    };
    function _101(_102, ul, data, _103) {
        var _104 = $.data(_102, "tree");
        var opts = _104.options;
        var _105 = $(ul).prevAll("div.tree-node:first");
        data = opts.loadFilter.call(_102, data, _105[0]);
        var _106 = _107(_102, "domId", _105.attr("id"));
        if (!_103) {
            _106 ? _106.children = data : _104.data = data;
            $(ul).empty();
        } else {
            if (_106) {
                _106.children ? _106.children = _106.children.concat(data) : _106.children = data;
            } else {
                _104.data = _104.data.concat(data);
            }
        }
        opts.view.render.call(opts.view, _102, ul, data);
        if (opts.dnd) {
            _c5(_102);
        }
        if (_106) {
            _108(_102, _106);
        }
        var _109 = [];
        var _10a = [];
        for (var i = 0; i < data.length; i++) {
            var node = data[i];
            if (!node.checked) {
                _109.push(node);
            }
        }
        _10b(data, function (node) {
            if (node.checked) {
                _10a.push(node);
            }
        });
        var _10c = opts.onCheck;
        opts.onCheck = function () {
        };
        if (_109.length) {
            _check(_102, $("#" + _109[0].domId)[0], false);
        }
        for (var i = 0; i < _10a.length; i++) {
            _check(_102, $("#" + _10a[i].domId)[0], true);
        }
        opts.onCheck = _10c;
        setTimeout(function () {
            _10d(_102, _102);
        }, 0);
        opts.onLoadSuccess.call(_102, _106, data);
    };
    function _10d(_10e, ul, _10f) {
        var opts = $.data(_10e, "tree").options;
        if (opts.lines) {
            $(_10e).addClass("tree-lines");
        } else {
            $(_10e).removeClass("tree-lines");
            return;
        }
        if (!_10f) {
            _10f = true;
            $(_10e).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
            $(_10e).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
            var _110 = $(_10e).tree("getRoots");
            if (_110.length > 1) {
                $(_110[0].target).addClass("tree-root-first");
            } else {
                if (_110.length == 1) {
                    $(_110[0].target).addClass("tree-root-one");
                }
            }
        }
        $(ul).children("li").each(function () {
            var node = $(this).children("div.tree-node");
            var ul = node.next("ul");
            if (ul.length) {
                if ($(this).next().length) {
                    _111(node);
                }
                _10d(_10e, ul, _10f);
            } else {
                _112(node);
            }
        });
        var _113 = $(ul).children("li:last").children("div.tree-node").addClass("tree-node-last");
        _113.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
        function _112(node, _114) {
            var icon = node.find("span.tree-icon");
            icon.prev("span.tree-indent").addClass("tree-join");
        };
        function _111(node) {
            var _115 = node.find("span.tree-indent, span.tree-hit").length;
            node.next().find("div.tree-node").each(function () {
                $(this).children("span:eq(" + (_115 - 1) + ")").addClass("tree-line");
            });
        };
    };
    function _116(_117, ul, _118, _119) {
        var opts = $.data(_117, "tree").options;
        _118 = _118 || {};
        var _11a = null;
        if (_117 != ul) {
            var node = $(ul).prev();
            _11a = _c0(_117, node[0]);
        }
        if (opts.onBeforeLoad.call(_117, _11a, _118) == false) {
            return;
        }
        var _11b = $(ul).prev().children("span.tree-folder");
        _11b.addClass("tree-loading");
        var _11c = opts.loader.call(_117, _118, function (data) {
            _11b.removeClass("tree-loading");
            _101(_117, ul, data);
            if (_119) {
                _119();
            }
        }, function () {
            _11b.removeClass("tree-loading");
            opts.onLoadError.apply(_117, arguments);
            if (_119) {
                _119();
            }
        });
        if (_11c == false) {
            _11b.removeClass("tree-loading");
        }
    };
    function _11d(_11e, _11f, _120) {
        var opts = $.data(_11e, "tree").options;
        var hit = $(_11f).children("span.tree-hit");
        if (hit.length == 0) {
            return;
        }
        if (hit.hasClass("tree-expanded")) {
            return;
        }
        var node = _c0(_11e, _11f);
        if (opts.onBeforeExpand.call(_11e, node) == false) {
            return;
        }
        hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
        hit.next().addClass("tree-folder-open");
        var ul = $(_11f).next();
        if (ul.length) {
            if (opts.animate) {
                ul.slideDown("normal", function () {
                    node.state = "open";
                    opts.onExpand.call(_11e, node);
                    if (_120) {
                        _120();
                    }
                });
            } else {
                ul.css("display", "block");
                node.state = "open";
                opts.onExpand.call(_11e, node);
                if (_120) {
                    _120();
                }
            }
        } else {
            var _121 = $("<ul style=\"display:none\"></ul>").insertAfter(_11f);
            _116(_11e, _121[0], { id: node.id }, function () {
                if (_121.is(":empty")) {
                    _121.remove();
                }
                if (opts.animate) {
                    _121.slideDown("normal", function () {
                        node.state = "open";
                        opts.onExpand.call(_11e, node);
                        if (_120) {
                            _120();
                        }
                    });
                } else {
                    _121.css("display", "block");
                    node.state = "open";
                    opts.onExpand.call(_11e, node);
                    if (_120) {
                        _120();
                    }
                }
            });
        }
    };
    function _122(_123, _124) {
        var opts = $.data(_123, "tree").options;
        var hit = $(_124).children("span.tree-hit");
        if (hit.length == 0) {
            return;
        }
        if (hit.hasClass("tree-collapsed")) {
            return;
        }
        var node = _c0(_123, _124);
        if (opts.onBeforeCollapse.call(_123, node) == false) {
            return;
        }
        hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
        hit.next().removeClass("tree-folder-open");
        var ul = $(_124).next();
        if (opts.animate) {
            ul.slideUp("normal", function () {
                node.state = "closed";
                opts.onCollapse.call(_123, node);
            });
        } else {
            ul.css("display", "none");
            node.state = "closed";
            opts.onCollapse.call(_123, node);
        }
    };
    function _125(_126, _127) {
        var hit = $(_127).children("span.tree-hit");
        if (hit.length == 0) {
            return;
        }
        if (hit.hasClass("tree-expanded")) {
            _122(_126, _127);
        } else {
            _11d(_126, _127);
        }
    };
    function _128(_129, _12a) {
        var _12b = _100(_129, _12a);
        if (_12a) {
            _12b.unshift(_c0(_129, _12a));
        }
        for (var i = 0; i < _12b.length; i++) {
            _11d(_129, _12b[i].target);
        }
    };
    function _12c(_12d, _12e) {
        var _12f = [];
        var p = _130(_12d, _12e);
        while (p) {
            _12f.unshift(p);
            p = _130(_12d, p.target);
        }
        for (var i = 0; i < _12f.length; i++) {
            _11d(_12d, _12f[i].target);
        }
    };
    function _131(_132, _133) {
        var c = $(_132).parent();
        while (c[0].tagName != "BODY" && c.css("overflow-y") != "auto") {
            c = c.parent();
        }
        var n = $(_133);
        var ntop = n.offset().top;
        if (c[0].tagName != "BODY") {
            var ctop = c.offset().top;
            if (ntop < ctop) {
                c.scrollTop(c.scrollTop() + ntop - ctop);
            } else {
                if (ntop + n.outerHeight() > ctop + c.outerHeight() - 18) {
                    c.scrollTop(c.scrollTop() + ntop + n.outerHeight() - ctop - c.outerHeight() + 18);
                }
            }
        } else {
            c.scrollTop(ntop);
        }
    };
    function _134(_135, _136) {
        var _137 = _100(_135, _136);
        if (_136) {
            _137.unshift(_c0(_135, _136));
        }
        for (var i = 0; i < _137.length; i++) {
            _122(_135, _137[i].target);
        }
    };
    function _138(_139, _13a) {
        var node = $(_13a.parent);
        var data = _13a.data;
        if (!data) {
            return;
        }
        data = $.isArray(data) ? data : [data];
        if (!data.length) {
            return;
        }
        var ul;
        if (node.length == 0) {
            ul = $(_139);
        } else {
            if (_fc(_139, node[0])) {
                var _13b = node.find("span.tree-icon");
                _13b.removeClass("tree-file").addClass("tree-folder tree-folder-open");
                var hit = $("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_13b);
                if (hit.prev().length) {
                    hit.prev().remove();
                }
            }
            ul = node.next();
            if (!ul.length) {
                ul = $("<ul></ul>").insertAfter(node);
            }
        }
        _101(_139, ul[0], data, true);
        _f7(_139, ul.prev());
    };
    function _13c(_13d, _13e) {
        var ref = _13e.before || _13e.after;
        var _13f = _130(_13d, ref);
        var data = _13e.data;
        if (!data) {
            return;
        }
        data = $.isArray(data) ? data : [data];
        if (!data.length) {
            return;
        }
        _138(_13d, { parent: (_13f ? _13f.target : null), data: data });
        var _140 = _13f ? _13f.children : $(_13d).tree("getRoots");
        for (var i = 0; i < _140.length; i++) {
            if (_140[i].domId == $(ref).attr("id")) {
                for (var j = data.length - 1; j >= 0; j--) {
                    _140.splice((_13e.before ? i : (i + 1)), 0, data[j]);
                }
                _140.splice(_140.length - data.length, data.length);
                break;
            }
        }
        var li = $();
        for (var i = 0; i < data.length; i++) {
            li = li.add($("#" + data[i].domId).parent());
        }
        if (_13e.before) {
            li.insertBefore($(ref).parent());
        } else {
            li.insertAfter($(ref).parent());
        }
    };
    function _141(_142, _143) {
        var _144 = del(_143);
        $(_143).parent().remove();
        if (_144) {
            if (!_144.children || !_144.children.length) {
                var node = $(_144.target);
                node.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
                node.find(".tree-hit").remove();
                $("<span class=\"tree-indent\"></span>").prependTo(node);
                node.next().remove();
            }
            _108(_142, _144);
            _f7(_142, _144.target);
        }
        _10d(_142, _142);
        function del(_145) {
            var id = $(_145).attr("id");
            var _146 = _130(_142, _145);
            var cc = _146 ? _146.children : $.data(_142, "tree").data;
            for (var i = 0; i < cc.length; i++) {
                if (cc[i].domId == id) {
                    cc.splice(i, 1);
                    break;
                }
            }
            return _146;
        };
    };
    function _108(_147, _148) {
        var opts = $.data(_147, "tree").options;
        var node = $(_148.target);
        var data = _c0(_147, _148.target);
        var _149 = data.checked;
        if (data.iconCls) {
            node.find(".tree-icon").removeClass(data.iconCls);
        }
        $.extend(data, _148);
        node.find(".tree-title").html(opts.formatter.call(_147, data));
        if (data.iconCls) {
            node.find(".tree-icon").addClass(data.iconCls);
        }
        if (_149 != data.checked) {
            _check(_147, _148.target, data.checked);
        }
    };
    function _14a(_14b) {
        var _14c = _14d(_14b);
        return _14c.length ? _14c[0] : null;
    };
    function _14d(_14e) {
        var _14f = $.data(_14e, "tree").data;
        for (var i = 0; i < _14f.length; i++) {
            _150(_14f[i]);
        }
        return _14f;
    };
    function _100(_151, _152) {
        var _153 = [];
        var n = _c0(_151, _152);
        var data = n ? n.children : $.data(_151, "tree").data;
        _10b(data, function (node) {
            _153.push(_150(node));
        });
        return _153;
    };
    function _130(_154, _155) {
        var p = $(_155).closest("ul").prevAll("div.tree-node:first");
        return _c0(_154, p[0]);
    };
    function _156(_157, _158) {
        _158 = _158 || "checked";
        if (!$.isArray(_158)) {
            _158 = [_158];
        }
        var _159 = [];
        for (var i = 0; i < _158.length; i++) {
            var s = _158[i];
            if (s == "checked") {
                _159.push("span.tree-checkbox1");
            } else {
                if (s == "unchecked") {
                    _159.push("span.tree-checkbox0");
                } else {
                    if (s == "indeterminate") {
                        _159.push("span.tree-checkbox2");
                    }
                }
            }
        }
        var _15a = [];
        $(_157).find(_159.join(",")).each(function () {
            var node = $(this).parent();
            _15a.push(_c0(_157, node[0]));
        });
        return _15a;
    };
    function _15b(_15c) {
        var node = $(_15c).find("div.tree-node-selected");
        return node.length ? _c0(_15c, node[0]) : null;
    };
    function _15d(_15e, _15f) {
        var data = _c0(_15e, _15f);
        if (data && data.children) {
            _10b(data.children, function (node) {
                _150(node);
            });
        }
        return data;
    };
    function _c0(_160, _161) {
        return _107(_160, "domId", $(_161).attr("id"));
    };
    function _162(_163, id) {
        return _107(_163, "id", id);
    };
    function _107(_164, _165, _166) {
        var data = $.data(_164, "tree").data;
        var _167 = null;
        _10b(data, function (node) {
            if (node[_165] == _166) {
                _167 = _150(node);
                return false;
            }
        });
        return _167;
    };
    function _150(node) {
        var d = $("#" + node.domId);
        node.target = d[0];
        node.checked = d.find(".tree-checkbox").hasClass("tree-checkbox1");
        return node;
    };
    function _10b(data, _168) {
        var _169 = [];
        for (var i = 0; i < data.length; i++) {
            _169.push(data[i]);
        }
        while (_169.length) {
            var node = _169.shift();
            if (_168(node) == false) {
                return;
            }
            if (node.children) {
                for (var i = node.children.length - 1; i >= 0; i--) {
                    _169.unshift(node.children[i]);
                }
            }
        }
    };
    function _16a(_16b, _16c) {
        var opts = $.data(_16b, "tree").options;
        var node = _c0(_16b, _16c);
        if (opts.onBeforeSelect.call(_16b, node) == false) {
            return;
        }
        $(_16b).find("div.tree-node-selected").removeClass("tree-node-selected");
        $(_16c).addClass("tree-node-selected");
        opts.onSelect.call(_16b, node);
    };
    function _fc(_16d, _16e) {
        return $(_16e).children("span.tree-hit").length == 0;
    };
    function _16f(_170, _171) {
        var opts = $.data(_170, "tree").options;
        var node = _c0(_170, _171);
        if (opts.onBeforeEdit.call(_170, node) == false) {
            return;
        }
        $(_171).css("position", "relative");
        var nt = $(_171).find(".tree-title");
        var _172 = nt.outerWidth();
        nt.empty();
        var _173 = $("<input class=\"tree-editor\">").appendTo(nt);
        _173.val(node.text).focus();
        _173.width(_172 + 20);
        _173.height(document.compatMode == "CSS1Compat" ? (18 - (_173.outerHeight() - _173.height())) : 18);
        _173.bind("click", function (e) {
            return false;
        }).bind("mousedown", function (e) {
            e.stopPropagation();
        }).bind("mousemove", function (e) {
            e.stopPropagation();
        }).bind("keydown", function (e) {
            if (e.keyCode == 13) {
                _174(_170, _171);
                return false;
            } else {
                if (e.keyCode == 27) {
                    _178(_170, _171);
                    return false;
                }
            }
        }).bind("blur", function (e) {
            e.stopPropagation();
            _174(_170, _171);
        });
    };
    function _174(_175, _176) {
        var opts = $.data(_175, "tree").options;
        $(_176).css("position", "");
        var _177 = $(_176).find("input.tree-editor");
        var val = _177.val();
        _177.remove();
        var node = _c0(_175, _176);
        node.text = val;
        _108(_175, node);
        opts.onAfterEdit.call(_175, node);
    };
    function _178(_179, _17a) {
        var opts = $.data(_179, "tree").options;
        $(_17a).css("position", "");
        $(_17a).find("input.tree-editor").remove();
        var node = _c0(_179, _17a);
        _108(_179, node);
        opts.onCancelEdit.call(_179, node);
    };
    $.fn.tree = function (_17b, _17c) {
        if (typeof _17b == "string") {
            return $.fn.tree.methods[_17b](this, _17c);
        }
        var _17b = _17b || {};
        return this.each(function () {
            var _17d = $.data(this, "tree");
            var opts;
            if (_17d) {
                opts = $.extend(_17d.options, _17b);
                _17d.options = opts;
            } else {
                opts = $.extend({}, $.fn.tree.defaults, $.fn.tree.parseOptions(this), _17b);
                $.data(this, "tree", { options: opts, tree: _b5(this), data: [] });
                var data = $.fn.tree.parseData(this);
                if (data.length) {
                    _101(this, this, data);
                }
            }
            _b8(this);
            if (opts.data) {
                _101(this, this, $.extend(true, [], opts.data));
            }
            _116(this, this);
        });
    };
    $.fn.tree.methods = {
        options: function (jq) {
            return $.data(jq[0], "tree").options;
        }, loadData: function (jq, data) {
            return jq.each(function () {
                _101(this, this, data);
            });
        }, getNode: function (jq, _17e) {
            return _c0(jq[0], _17e);
        }, getData: function (jq, _17f) {
            return _15d(jq[0], _17f);
        }, reload: function (jq, _180) {
            return jq.each(function () {
                if (_180) {
                    var node = $(_180);
                    var hit = node.children("span.tree-hit");
                    hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
                    node.next().remove();
                    _11d(this, _180);
                } else {
                    $(this).empty();
                    _116(this, this);
                }
            });
        }, getRoot: function (jq) {
            return _14a(jq[0]);
        }, getRoots: function (jq) {
            return _14d(jq[0]);
        }, getParent: function (jq, _181) {
            return _130(jq[0], _181);
        }, getChildren: function (jq, _182) {
            return _100(jq[0], _182);
        }, getChecked: function (jq, _183) {
            return _156(jq[0], _183);
        }, getSelected: function (jq) {
            return _15b(jq[0]);
        }, isLeaf: function (jq, _184) {
            return _fc(jq[0], _184);
        }, find: function (jq, id) {
            return _162(jq[0], id);
        }, select: function (jq, _185) {
            return jq.each(function () {
                _16a(this, _185);
            });
        }, check: function (jq, _186) {
            return jq.each(function () {
                _check(this, _186, true);
            });
        }, uncheck: function (jq, _187) {
            return jq.each(function () {
                _check(this, _187, false);
            });
        }, collapse: function (jq, _188) {
            return jq.each(function () {
                _122(this, _188);
            });
        }, expand: function (jq, _189) {
            return jq.each(function () {
                _11d(this, _189);
            });
        }, collapseAll: function (jq, _18a) {
            return jq.each(function () {
                _134(this, _18a);
            });
        }, expandAll: function (jq, _18b) {
            return jq.each(function () {
                _128(this, _18b);
            });
        }, expandTo: function (jq, _18c) {
            return jq.each(function () {
                _12c(this, _18c);
            });
        }, scrollTo: function (jq, _18d) {
            return jq.each(function () {
                _131(this, _18d);
            });
        }, toggle: function (jq, _18e) {
            return jq.each(function () {
                _125(this, _18e);
            });
        }, append: function (jq, _18f) {
            return jq.each(function () {
                _138(this, _18f);
            });
        }, insert: function (jq, _190) {
            return jq.each(function () {
                _13c(this, _190);
            });
        }, remove: function (jq, _191) {
            return jq.each(function () {
                _141(this, _191);
            });
        }, pop: function (jq, _192) {
            var node = jq.tree("getData", _192);
            jq.tree("remove", _192);
            return node;
        }, update: function (jq, _193) {
            return jq.each(function () {
                _108(this, _193);
            });
        }, enableDnd: function (jq) {
            return jq.each(function () {
                _c5(this);
            });
        }, disableDnd: function (jq) {
            return jq.each(function () {
                _c1(this);
            });
        }, beginEdit: function (jq, _194) {
            return jq.each(function () {
                _16f(this, _194);
            });
        }, endEdit: function (jq, _195) {
            return jq.each(function () {
                _174(this, _195);
            });
        }, cancelEdit: function (jq, _196) {
            return jq.each(function () {
                _178(this, _196);
            });
        }
    };
    $.fn.tree.parseOptions = function (_197) {
        var t = $(_197);
        return $.extend({}, $.parser.parseOptions(_197, ["url", "method", { checkbox: "boolean", cascadeCheck: "boolean", onlyLeafCheck: "boolean" }, { animate: "boolean", lines: "boolean", dnd: "boolean" }]));
    };
    $.fn.tree.parseData = function (_198) {
        var data = [];
        _199(data, $(_198));
        return data;
        function _199(aa, tree) {
            tree.children("li").each(function () {
                var node = $(this);
                var item = $.extend({}, $.parser.parseOptions(this, ["id", "iconCls", "state"]), { checked: (node.attr("checked") ? true : undefined) });
                item.text = node.children("span").html();
                if (!item.text) {
                    item.text = node.html();
                }
                var _19a = node.children("ul");
                if (_19a.length) {
                    item.children = [];
                    _199(item.children, _19a);
                }
                aa.push(item);
            });
        };
    };
    var _19b = 1;
    var _19c = {
        render: function (_19d, ul, data) {
            var opts = $.data(_19d, "tree").options;
            var virtualNode=$("<div id=\"virtual-node\" class=\"tree-node\" style=\"position:absolute;top:-1000px\">").appendTo('body'); //cryze 2018-09-05 创建一个隐藏着的tree-node 来计算高度
            var _19e = $(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
            var cc = _19f(_19e, data);
            $(ul).append(cc.join(""));
            virtualNode.remove();  //cryze 2018-09-05 用完移除
            function _19f(_1a0, _1a1) {
                var cc = [];
                for (var i = 0; i < _1a1.length; i++) {
                    var item = _1a1[i];
                    
                    if (opts.lines && opts.autoNodeHeight){   //cryze 2018-09-05 根据formatter返回计算高度
                        //获取高度
                        virtualNode.empty();
                        var nodeHeight=$("<span class=\"tree-title\">" + opts.formatter.call(_19d, item) + "</span>").appendTo(virtualNode).height();
                    }else{
                        var nodeHeight=0;
                    }

                    if (item.state != "open" && item.state != "closed") {
                        item.state = "open";
                    }
                    item.domId = "_hisui_tree_" + _19b++;
                    cc.push("<li>");
                    cc.push("<div id=\"" + item.domId + "\" class=\"tree-node\">");
                    for (var j = 0; j < _1a0; j++) {
                        cc.push("<span class=\"tree-indent\" "+(nodeHeight>0?('style="height:'+nodeHeight+'px"'):'')+"></span>");   //cryze 2018-09-05 高度
                    }
                    var _1a2 = false;
                    if (item.state == "closed") {
                        cc.push("<span class=\"tree-hit tree-collapsed\" "+(nodeHeight>0?('style="height:'+nodeHeight+'px"'):'')+"></span>");
                        if (nodeHeight>0){ //cryze 2018-09-05 高度
                            cc.push("<span class=\"tree-icon tree-folder tree-icon-lines\" style=\"height:"+nodeHeight+"px\"></span>");                    
                        }else{
                            cc.push("<span class=\"tree-icon tree-folder " + (item.iconCls ? item.iconCls : "") + "\"></span>");
                        }
                        
                    } else {
                        if (item.children && item.children.length) {
                            cc.push("<span class=\"tree-hit tree-expanded\" "+(nodeHeight>0?('style="height:'+nodeHeight+'px"'):'')+"></span>");
                            if(nodeHeight>0){ //cryze 2018-09-05 高度
                                cc.push("<span class=\"tree-icon tree-folder tree-folder-open tree-icon-lines\" style=\"height:"+nodeHeight+"px\"></span>");
                            }else{
                                cc.push("<span class=\"tree-icon tree-folder tree-folder-open " + (item.iconCls ? item.iconCls : "") + "\"></span>");
                            }
                            
                        } else {
                            cc.push("<span class=\"tree-indent\" "+(nodeHeight>0?('style="height:'+nodeHeight+'px"'):'')+"></span>");
                            if(nodeHeight>0){ //cryze 2018-09-05 高度
                                cc.push("<span class=\"tree-icon tree-file tree-icon-lines\" style=\"height:"+nodeHeight+"px\"></span>");
                            }else{
                                cc.push("<span class=\"tree-icon tree-file " + (item.iconCls ? item.iconCls : "") + "\"></span>");
                            }
                            
                            _1a2 = true;
                        }
                    }
                    if (opts.checkbox) {
                        if ((!opts.onlyLeafCheck) || _1a2) {
                            cc.push("<span class=\"tree-checkbox tree-checkbox0\"></span>");
                        }
                    }
                    cc.push("<span class=\"tree-title\">" + opts.formatter.call(_19d, item) + "</span>");
                    cc.push("</div>");
                    if (item.children && item.children.length) {
                        var tmp = _19f(_1a0 + 1, item.children);
                        cc.push("<ul style=\"display:" + (item.state == "closed" ? "none" : "block") + "\">");
                        cc = cc.concat(tmp);
                        cc.push("</ul>");
                    }
                    cc.push("</li>");
                }
                return cc;
            };
        }
    };
    $.fn.tree.defaults = {
        url: null, method: "post", animate: false, checkbox: false, cascadeCheck: true, onlyLeafCheck: false, lines: false, dnd: false, data: null, formatter: function (node) {
            return node.text;
        }, loader: function (_1a3, _1a4, _1a5) {
            var opts = $(this).tree("options");
            if (!opts.url) {
                return false;
            }
            $.ajax({
                type: opts.method, url: opts.url, data: _1a3, dataType: "json", success: function (data) {
                    var mydata = data;                    
                    /*兼容hos数据结构 {"code": "200","msg": "操作成功","data": [{"HOSPRowId": 1,"HOSPDesc": "东华标准版数字化医院[总院]"}],"success": true}*/
                    if ('undefined' !== typeof data.code) {
                        if ($.isArray(data.rows)) {
                            mydata = data.rows;
                        } else if ($.isArray(data.data)) {
                            mydata = data.data;
                        } else if ($.isArray(data.records)) {
                            mydata = data.records;
                        } else if (data.data != null && typeof data.data === 'object' && $.isArray(data.data) === false) {
                            if ($.isArray(data.data.records)) {
                                mydata = data.data.records;
                            }
                        }
                    }
                    _1a4(mydata);
                }, error: function () {
                    _1a5.apply(this, arguments);
                }
            });
        }, loadFilter: function (data, _1a6) {
            return data;
        }, view: _19c, onBeforeLoad: function (node, _1a7) {
        }, onLoadSuccess: function (node, data) {
        }, onLoadError: function () {
        }, onClick: function (node) {
        }, onDblClick: function (node) {
        }, onBeforeExpand: function (node) {
        }, onExpand: function (node) {
        }, onBeforeCollapse: function (node) {
        }, onCollapse: function (node) {
        }, onBeforeCheck: function (node, _1a8) {
        }, onCheck: function (node, _1a9) {
        }, onBeforeSelect: function (node) {
        }, onSelect: function (node) {
        }, onContextMenu: function (e, node) {
        }, onBeforeDrag: function (node) {
        }, onStartDrag: function (node) {
        }, onStopDrag: function (node) {
        }, onDragEnter: function (_1aa, _1ab) {
        }, onDragOver: function (_1ac, _1ad) {
        }, onDragLeave: function (_1ae, _1af) {
        }, onBeforeDrop: function (_1b0, _1b1, _1b2) {
        }, onDrop: function (_1b3, _1b4, _1b5) {
        }, onBeforeEdit: function (node) {
        }, onAfterEdit: function (node) {
        }, onCancelEdit: function (node) {
        }, autoNodeHeight:false
    };
})(jQuery);