(function ($) {
    function _292(_293) {
        var _294 = $.data(_293, "accordion");
        var opts = _294.options;
        var _295 = _294.panels;
        var cc = $(_293);
        opts.fit ? $.extend(opts, cc._fit()) : cc._fit(false);
        if (!isNaN(opts.width)) {
            cc._outerWidth(opts.width);
        } else {
            cc.css("width", "");
        }
        var _296 = 0;
        var _297 = "auto";
        var _298 = cc.find(">div.panel>div.accordion-header");
        if (_298.length) {
            _296 = $(_298[0]).css("height", "")._outerHeight();
        }
        
        if (!isNaN(opts.height)) {
            cc._outerHeight(opts.height);
            _297 = cc.height() - _296 * _298.length;
        } else {
            cc.css("height", "");
        }
        /*
            2018-09-27 add by wanghc 
            accordion-gray ==> margin-top:4px;
        */
        if (cc.hasClass('accordion-gray')){
            _297 -= 4 * (_298.length-1)+1;  // totalHeight - margin-top * (accordionCount-1)
        }
        _299(true, _297 - _299(false) + 1);
        function _299(_29a, _29b) {
            var _29c = 0;
            for (var i = 0; i < _295.length; i++) {
                var p = _295[i];
                var h = p.panel("header")._outerHeight(_296);
                if (p.panel("options").collapsible == _29a) {
                    var _29d = isNaN(_29b) ? undefined : (_29b + _296 * h.length);
                    p.panel("resize", { width: cc.width(), height: (_29a ? _29d : undefined) });
                    _29c += p.panel("panel").outerHeight() - _296;
                }
            }
            return _29c;
        };
    };
    function _29e(_29f, _2a0, _2a1, all) {
        var _2a2 = $.data(_29f, "accordion").panels;
        var pp = [];
        for (var i = 0; i < _2a2.length; i++) {
            var p = _2a2[i];
            if (_2a0) {
                if (p.panel("options")[_2a0] == _2a1) {
                    pp.push(p);
                }
            } else {
                if (p[0] == $(_2a1)[0]) {
                    return i;
                }
            }
        }
        if (_2a0) {
            return all ? pp : (pp.length ? pp[0] : null);
        } else {
            return -1;
        }
    };
    function _2a3(_2a4) {
        return _29e(_2a4, "collapsed", false, true);
    };
    function _2a5(_2a6) {
        var pp = _2a3(_2a6);
        return pp.length ? pp[0] : null;
    };
    function _2a7(_2a8, _2a9) {
        return _29e(_2a8, null, _2a9);
    };
    function _2aa(_2ab, _2ac) {
        var _2ad = $.data(_2ab, "accordion").panels;
        if (typeof _2ac == "number") {
            if (_2ac < 0 || _2ac >= _2ad.length) {
                return null;
            } else {
                return _2ad[_2ac];
            }
        }
        return _29e(_2ab, "title", _2ac);
    };
    function _2ae(_2af) {
        var opts = $.data(_2af, "accordion").options;
        var cc = $(_2af);
        if (opts.border) {
            cc.removeClass("accordion-noborder");
        } else {
            cc.addClass("accordion-noborder");
        }
    };
    function init(_2b0) {
        var _2b1 = $.data(_2b0, "accordion");
        var cc = $(_2b0);
        cc.addClass("accordion");
        _2b1.panels = [];
        cc.children("div").each(function () {
            var opts = $.extend({}, $.parser.parseOptions(this), { selected: ($(this).attr("selected") ? true : undefined) });
            var pp = $(this);
            _2b1.panels.push(pp);
            _2b3(_2b0, pp, opts);
        });
        cc.bind("_resize", function (e, _2b2) {
            var opts = $.data(_2b0, "accordion").options;
            if (opts.fit == true || _2b2) {
                _292(_2b0);
            }
            return false;
        });
    };
    function _2b3(_2b4, pp, _2b5) {
        var opts = $.data(_2b4, "accordion").options;
        pp.panel($.extend({}, { collapsible: true, minimizable: false, maximizable: false, closable: false, doSize: false, collapsed: true, headerCls: "accordion-header", bodyCls: "accordion-body" }, _2b5, {
            onBeforeExpand: function () {
                if (_2b5.onBeforeExpand) {
                    if (_2b5.onBeforeExpand.call(this) == false) {
                        return false;
                    }
                }
                if (!opts.multiple) {
                    var all = $.grep(_2a3(_2b4), function (p) {
                        return p.panel("options").collapsible;
                    });
                    for (var i = 0; i < all.length; i++) {
                        _2be(_2b4, _2a7(_2b4, all[i]));
                    }
                }
                var _2b6 = $(this).panel("header");
                _2b6.addClass("accordion-header-selected");
                _2b6.find(".accordion-collapse").removeClass("accordion-expand");
            }, onExpand: function () {
                if (_2b5.onExpand) {
                    _2b5.onExpand.call(this);
                }
                opts.onSelect.call(_2b4, $(this).panel("options").title, _2a7(_2b4, this));
            }, onBeforeCollapse: function () {
                if (_2b5.onBeforeCollapse) {
                    if (_2b5.onBeforeCollapse.call(this) == false) {
                        return false;
                    }
                }
                var _2b7 = $(this).panel("header");
                _2b7.removeClass("accordion-header-selected");
                _2b7.find(".accordion-collapse").addClass("accordion-expand");
            }, onCollapse: function () {
                if (_2b5.onCollapse) {
                    _2b5.onCollapse.call(this);
                }
                opts.onUnselect.call(_2b4, $(this).panel("options").title, _2a7(_2b4, this));
            }
        }));
        var _2b8 = pp.panel("header");
        var tool = _2b8.children("div.panel-tool");
        tool.children("a.panel-tool-collapse").hide();
        var t = $("<a href=\"javascript:void(0)\"></a>").addClass("accordion-collapse accordion-expand").appendTo(tool);
        t.bind("click", function () {
            var _2b9 = _2a7(_2b4, pp);
            if (pp.panel("options").collapsed) {
                _2ba(_2b4, _2b9);
            } else {
                _2be(_2b4, _2b9);
            }
            return false;
        });
        pp.panel("options").collapsible ? t.show() : t.hide();
        _2b8.click(function () {
            $(this).find("a.accordion-collapse:visible").triggerHandler("click");
            return false;
        });
    };
    function _2ba(_2bb, _2bc) {
        var p = _2aa(_2bb, _2bc);
        if (!p) {
            return;
        }
        _2bd(_2bb);
        var opts = $.data(_2bb, "accordion").options;
        p.panel("expand", opts.animate);
    };
    function _2be(_2bf, _2c0) {
        var p = _2aa(_2bf, _2c0);
        if (!p) {
            return;
        }
        _2bd(_2bf);
        var opts = $.data(_2bf, "accordion").options;
        p.panel("collapse", opts.animate);
    };
    function _2c1(_2c2) {
        var opts = $.data(_2c2, "accordion").options;
        var p = _29e(_2c2, "selected", true);
        if (p) {
            _2c3(_2a7(_2c2, p));
        } else {
            _2c3(opts.selected);
        }
        function _2c3(_2c4) {
            var _2c5 = opts.animate;
            opts.animate = false;
            _2ba(_2c2, _2c4);
            opts.animate = _2c5;
        };
    };
    function _2bd(_2c6) {
        var _2c7 = $.data(_2c6, "accordion").panels;
        for (var i = 0; i < _2c7.length; i++) {
            _2c7[i].stop(true, true);
        }
    };
    function add(_2c8, _2c9) {
        var _2ca = $.data(_2c8, "accordion");
        var opts = _2ca.options;
        var _2cb = _2ca.panels;
        if (_2c9.selected == undefined) {
            _2c9.selected = true;
        }
        _2bd(_2c8);
        var pp = $("<div></div>").appendTo(_2c8);
        _2cb.push(pp);
        _2b3(_2c8, pp, _2c9);
        _292(_2c8);
        opts.onAdd.call(_2c8, _2c9.title, _2cb.length - 1);
        if (_2c9.selected) {
            _2ba(_2c8, _2cb.length - 1);
        }
    };
    function _2cc(_2cd, _2ce) {
        var _2cf = $.data(_2cd, "accordion");
        var opts = _2cf.options;
        var _2d0 = _2cf.panels;
        _2bd(_2cd);
        var _2d1 = _2aa(_2cd, _2ce);
        var _2d2 = _2d1.panel("options").title;
        var _2d3 = _2a7(_2cd, _2d1);
        if (!_2d1) {
            return;
        }
        if (opts.onBeforeRemove.call(_2cd, _2d2, _2d3) == false) {
            return;
        }
        _2d0.splice(_2d3, 1);
        _2d1.panel("destroy");
        if (_2d0.length) {
            _292(_2cd);
            var curr = _2a5(_2cd);
            if (!curr) {
                _2ba(_2cd, 0);
            }
        }
        opts.onRemove.call(_2cd, _2d2, _2d3);
    };
    $.fn.accordion = function (_2d4, _2d5) {
        if (typeof _2d4 == "string") {
            return $.fn.accordion.methods[_2d4](this, _2d5);
        }
        _2d4 = _2d4 || {};
        return this.each(function () {
            var _2d6 = $.data(this, "accordion");
            if (_2d6) {
                $.extend(_2d6.options, _2d4);
            } else {
                $.data(this, "accordion", { options: $.extend({}, $.fn.accordion.defaults, $.fn.accordion.parseOptions(this), _2d4), accordion: $(this).addClass("accordion"), panels: [] });
                init(this);
            }
            _2ae(this);
            _292(this);
            _2c1(this);
        });
    };
    $.fn.accordion.methods = {
        options: function (jq) {
            return $.data(jq[0], "accordion").options;
        }, panels: function (jq) {
            return $.data(jq[0], "accordion").panels;
        }, resize: function (jq) {
            return jq.each(function () {
                _292(this);
            });
        }, getSelections: function (jq) {
            return _2a3(jq[0]);
        }, getSelected: function (jq) {
            return _2a5(jq[0]);
        }, getPanel: function (jq, _2d7) {
            return _2aa(jq[0], _2d7);
        }, getPanelIndex: function (jq, _2d8) {
            return _2a7(jq[0], _2d8);
        }, select: function (jq, _2d9) {
            return jq.each(function () {
                _2ba(this, _2d9);
            });
        }, unselect: function (jq, _2da) {
            return jq.each(function () {
                _2be(this, _2da);
            });
        }, add: function (jq, _2db) {
            return jq.each(function () {
                add(this, _2db);
            });
        }, remove: function (jq, _2dc) {
            return jq.each(function () {
                _2cc(this, _2dc);
            });
        }
    };
    $.fn.accordion.parseOptions = function (_2dd) {
        var t = $(_2dd);
        return $.extend({}, $.parser.parseOptions(_2dd, ["width", "height", { fit: "boolean", border: "boolean", animate: "boolean", multiple: "boolean", selected: "number" }]));
    };
    $.fn.accordion.defaults = {
        width: "auto", height: "auto", fit: false, border: true, animate: true, multiple: false, selected: 0, onSelect: function (_2de, _2df) {
        }, onUnselect: function (_2e0, _2e1) {
        }, onAdd: function (_2e2, _2e3) {
        }, onBeforeRemove: function (_2e4, _2e5) {
        }, onRemove: function (_2e6, _2e7) {
        }
    };
})(jQuery);