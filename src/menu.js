(function ($) {
    function init(_3a6) {
        $(_3a6).appendTo("body");
        $(_3a6).addClass("menu-top");
        $(document).unbind(".menu").bind("mousedown.menu", function (e) {
            var m = $(e.target).closest("div.menu,div.combo-p");
            if (m.length) {
                return;
            }
            $("body>div.menu-top:visible").menu("hide");
        });
        var _3a7 = _3a8($(_3a6));
        for (var i = 0; i < _3a7.length; i++) {
            _3a9(_3a7[i]);
        }
        function _3a8(menu) {
            var _3aa = [];
            menu.addClass("menu");
            _3aa.push(menu);
            if (!menu.hasClass("menu-content")) {
                menu.children("div").each(function () {
                    var _3ab = $(this).children("div");
                    if (_3ab.length) {
                        _3ab.insertAfter(_3a6);
                        this.submenu = _3ab;
                        var mm = _3a8(_3ab);
                        _3aa = _3aa.concat(mm);
                    }
                });
            }
            return _3aa;
        };
        function _3a9(menu) {
            var wh = $.parser.parseOptions(menu[0], ["width", "height"]);
            menu[0].originalHeight = wh.height || 0;
            if (menu.hasClass("menu-content")) {
                menu[0].originalWidth = wh.width || menu._outerWidth();
            } else {
                menu[0].originalWidth = wh.width || 0;
                menu.children("div").each(function () {
                    var item = $(this);
                    var _3ac = $.extend({}, $.parser.parseOptions(this, ["name", "iconCls", "href", { separator: "boolean" }]), { disabled: (item.attr("disabled") ? true : undefined) });
                    if (_3ac.separator) {
                        item.addClass("menu-sep");
                    }
                    if (!item.hasClass("menu-sep")) {
                        item[0].itemName = _3ac.name || "";
                        item[0].itemHref = _3ac.href || "";
                        var text = item.addClass("menu-item").html();
                        item.empty().append($("<div class=\"menu-text\"></div>").html(text));
                        if (_3ac.iconCls) {
                            $("<div class=\"menu-icon\"></div>").addClass(_3ac.iconCls).appendTo(item);
                        }
                        if (_3ac.disabled) {
                            _3ad(_3a6, item[0], true);
                        }
                        if (item[0].submenu) {
                            $("<div class=\"menu-rightarrow\"></div>").appendTo(item);
                        }
                        _3ae(_3a6, item);
                    }
                });
                $("<div class=\"menu-line\"></div>").prependTo(menu);
            }
            _3af(_3a6, menu);
            menu.hide();
            _3b0(_3a6, menu);
        };
    };
    function _3af(_3b1, menu) {
        var opts = $.data(_3b1, "menu").options;
        var _3b2 = menu.attr("style") || "";
        menu.css({ display: "block", left: -10000, height: "auto", overflow: "hidden" });
        var el = menu[0];
        var _3b3 = el.originalWidth || 0;
        if (!_3b3) {
            _3b3 = 0;
            menu.find("div.menu-text").each(function () {
                if (_3b3 < $(this)._outerWidth()) {
                    _3b3 = $(this)._outerWidth();
                }
                $(this).closest("div.menu-item")._outerHeight($(this)._outerHeight() + 2);
            });
            _3b3 += 40;
        }
        _3b3 = Math.max(_3b3, opts.minWidth);
        var _3b4 = el.originalHeight || menu.outerHeight();
        var _3b5 = Math.max(el.originalHeight, menu.outerHeight()) - 2;
        //cryze menu 若是在options指定宽度，则按指定的宽度
        if (opts.width&&opts.width>0) _3b3=opts.width;
        menu._outerWidth(_3b3)._outerHeight(_3b4);
        menu.children("div.menu-line")._outerHeight(_3b5);
        _3b2 += ";width:" + el.style.width + ";height:" + el.style.height;
        menu.attr("style", _3b2);
    };
    function _3b0(_3b6, menu) {
        var _3b7 = $.data(_3b6, "menu");
        menu.unbind(".menu").bind("mouseenter.menu", function () {
            if (_3b7.timer) {
                clearTimeout(_3b7.timer);
                _3b7.timer = null;
            }
        }).bind("mouseleave.menu", function () {
            if (_3b7.options.hideOnUnhover) {
                _3b7.timer = setTimeout(function () {
                    _3b8(_3b6);
                }, 100);
            }
        });
    };
    function _3ae(_3b9, item) {
        if (!item.hasClass("menu-item")) {
            return;
        }
        item.unbind(".menu");
        item.bind("click.menu", function () {
            if ($(this).hasClass("menu-item-disabled")) {
                return;
            }
            if (!this.submenu) {
                _3b8(_3b9);
                var href = $(this).attr("href");
                if (href) {
                    location.href = href;
                }
            }
            var item = $(_3b9).menu("getItem", this);
            $.data(_3b9, "menu").options.onClick.call(_3b9, item);
        }).bind("mouseenter.menu", function (e) {
            item.siblings().each(function () {
                if (this.submenu) {
                    _3bc(this.submenu);
                }
                $(this).removeClass("menu-active");
            });
            item.addClass("menu-active");
            if ($(this).hasClass("menu-item-disabled")) {
                item.addClass("menu-active-disabled");
                return;
            }
            var _3ba = item[0].submenu;
            if (_3ba) {
                $(_3b9).menu("show", { menu: _3ba, parent: item });
            }
        }).bind("mouseleave.menu", function (e) {
            item.removeClass("menu-active menu-active-disabled");
            var _3bb = item[0].submenu;
            if (_3bb) {
                if (e.pageX >= parseInt(_3bb.css("left"))) {
                    item.addClass("menu-active");
                } else {
                    _3bc(_3bb);
                }
            } else {
                item.removeClass("menu-active");
            }
        });
    };
    function _3b8(_3bd) {
        var _3be = $.data(_3bd, "menu");
        if (_3be) {
            if ($(_3bd).is(":visible")) {
                _3bc($(_3bd));
                _3be.options.onHide.call(_3bd);
            }
        }
        return false;
    };
    function _3bf(_3c0, _3c1) {
        var left, top;
        _3c1 = _3c1 || {};
        var menu = $(_3c1.menu || _3c0);
        if (menu.hasClass("menu-top")) {
            var opts = $.data(_3c0, "menu").options;
            $.extend(opts, _3c1);
            left = opts.left;
            top = opts.top;
            if (opts.alignTo) {
                var at = $(opts.alignTo);
                left = at.offset().left;
                top = at.offset().top + at._outerHeight();
                if (opts.align == "right") {
                    left += at.outerWidth() - menu.outerWidth();
                }
            }
            if (left + menu.outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft()) {
                left = $(window)._outerWidth() + $(document).scrollLeft() - menu.outerWidth() - 5;
            }
            if (left < 0) {
                left = 0;
            }
            if (top + menu.outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                top = $(window)._outerHeight() + $(document).scrollTop() - menu.outerHeight() - 5;
            }
        } else {
            var _3c2 = _3c1.parent;
            left = _3c2.offset().left + _3c2.outerWidth() - 2;
            if (left + menu.outerWidth() + 5 > $(window)._outerWidth() + $(document).scrollLeft()) {
                left = _3c2.offset().left - menu.outerWidth() + 2;
            }
            var top = _3c2.offset().top - 3;
            if (top + menu.outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                top = $(window)._outerHeight() + $(document).scrollTop() - menu.outerHeight() - 5;
            }
        }
        menu.css({ left: left, top: top });
        menu.show(0, function () {
            if (!menu[0].shadow) {
                menu[0].shadow = $("<div class=\"menu-shadow\"></div>").insertAfter(menu);
            }
            menu[0].shadow.css({ display: "block", zIndex: $.fn.menu.defaults.zIndex++, left: menu.css("left"), top: menu.css("top"), width: menu.outerWidth(), height: menu.outerHeight() });
            menu.css("z-index", $.fn.menu.defaults.zIndex++);
            if (menu.hasClass("menu-top")) {
                $.data(menu[0], "menu").options.onShow.call(menu[0]);
            }
        });
    };
    function _3bc(menu) {
        if (!menu) {
            return;
        }
        _3c3(menu);
        menu.find("div.menu-item").each(function () {
            if (this.submenu) {
                _3bc(this.submenu);
            }
            $(this).removeClass("menu-active");
        });
        function _3c3(m) {
            m.stop(true, true);
            if (m[0].shadow) {
                m[0].shadow.hide();
            }
            m.hide();
        };
    };
    function _3c4(_3c5, text) {
        var _3c6 = null;
        var tmp = $("<div></div>");
        function find(menu) {
            menu.children("div.menu-item").each(function () {
                var item = $(_3c5).menu("getItem", this);
                var s = tmp.empty().html(item.text).text();
                if (text == $.trim(s)) {
                    _3c6 = item;
                } else {
                    if (this.submenu && !_3c6) {
                        find(this.submenu);
                    }
                }
            });
        };
        find($(_3c5));
        tmp.remove();
        return _3c6;
    };
    function _3ad(_3c7, _3c8, _3c9) {
        var t = $(_3c8);
        if (!t.hasClass("menu-item")) {
            return;
        }
        if (_3c9) {
            t.addClass("menu-item-disabled");
            if (_3c8.onclick) {
                _3c8.onclick1 = _3c8.onclick;
                _3c8.onclick = null;
            }
        } else {
            t.removeClass("menu-item-disabled");
            if (_3c8.onclick1) {
                _3c8.onclick = _3c8.onclick1;
                _3c8.onclick1 = null;
            }
        }
    };
    function _3ca(_3cb, _3cc) {
        var menu = $(_3cb);
        if (_3cc.parent) {
            if (!_3cc.parent.submenu) {
                var _3cd = $("<div class=\"menu\"><div class=\"menu-line\"></div></div>").appendTo("body");
                _3cd.hide();
                _3cc.parent.submenu = _3cd;
                $("<div class=\"menu-rightarrow\"></div>").appendTo(_3cc.parent);
            }
            menu = _3cc.parent.submenu;
        }
        if (_3cc.separator) {
            var item = $("<div class=\"menu-sep\"></div>").appendTo(menu);
        } else {
            var item = $("<div class=\"menu-item\"></div>").appendTo(menu);
            $("<div class=\"menu-text\"></div>").html(_3cc.text).appendTo(item);
        }
        if (_3cc.iconCls) {
            $("<div class=\"menu-icon\"></div>").addClass(_3cc.iconCls).appendTo(item);
        }
        if (_3cc.id) {
            item.attr("id", _3cc.id);
        }
        if (_3cc.name) {
            item[0].itemName = _3cc.name;
        }
        if (_3cc.href) {
            item[0].itemHref = _3cc.href;
        }
        if (_3cc.onclick) {
            if (typeof _3cc.onclick == "string") {
                item.attr("onclick", _3cc.onclick);
            } else {
                item[0].onclick = eval(_3cc.onclick);
            }
        }
        if (_3cc.handler) {
            item[0].onclick = eval(_3cc.handler);
        }
        if (_3cc.disabled) {
            _3ad(_3cb, item[0], true);
        }
        _3ae(_3cb, item);
        _3b0(_3cb, menu);
        _3af(_3cb, menu);
    };
    function _3ce(_3cf, _3d0) {
        function _3d1(el) {
            if (el.submenu) {
                el.submenu.children("div.menu-item").each(function () {
                    _3d1(this);
                });
                var _3d2 = el.submenu[0].shadow;
                if (_3d2) {
                    _3d2.remove();
                }
                el.submenu.remove();
            }
            $(el).remove();
        };
        _3d1(_3d0);
    };
    function _3d3(_3d4) {
        $(_3d4).children("div.menu-item").each(function () {
            _3ce(_3d4, this);
        });
        if (_3d4.shadow) {
            _3d4.shadow.remove();
        }
        $(_3d4).remove();
    };
    $.fn.menu = function (_3d5, _3d6) {
        if (typeof _3d5 == "string") {
            return $.fn.menu.methods[_3d5](this, _3d6);
        }
        _3d5 = _3d5 || {};
        return this.each(function () {
            var _3d7 = $.data(this, "menu");
            if (_3d7) {
                $.extend(_3d7.options, _3d5);
            } else {
                _3d7 = $.data(this, "menu", { options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), _3d5) });
                init(this);
            }
            $(this).css({ left: _3d7.options.left, top: _3d7.options.top });
        });
    };
    $.fn.menu.methods = {
        options: function (jq) {
            return $.data(jq[0], "menu").options;
        }, show: function (jq, pos) {
            return jq.each(function () {
                _3bf(this, pos);
            });
        }, hide: function (jq) {
            return jq.each(function () {
                _3b8(this);
            });
        }, destroy: function (jq) {
            return jq.each(function () {
                _3d3(this);
            });
        }, setText: function (jq, _3d8) {
            return jq.each(function () {
                $(_3d8.target).children("div.menu-text").html(_3d8.text);
            });
        }, setIcon: function (jq, _3d9) {
            return jq.each(function () {
                $(_3d9.target).children("div.menu-icon").remove();
                if (_3d9.iconCls) {
                    $("<div class=\"menu-icon\"></div>").addClass(_3d9.iconCls).appendTo(_3d9.target);
                }
            });
        }, getItem: function (jq, _3da) {
            var t = $(_3da);
            var item = { target: _3da, id: t.attr("id"), text: $.trim(t.children("div.menu-text").html()), disabled: t.hasClass("menu-item-disabled"), name: _3da.itemName, href: _3da.itemHref, onclick: _3da.onclick };
            var icon = t.children("div.menu-icon");
            if (icon.length) {
                var cc = [];
                var aa = icon.attr("class").split(" ");
                for (var i = 0; i < aa.length; i++) {
                    if (aa[i] != "menu-icon") {
                        cc.push(aa[i]);
                    }
                }
                item.iconCls = cc.join(" ");
            }
            return item;
        }, findItem: function (jq, text) {
            return _3c4(jq[0], text);
        }, appendItem: function (jq, _3db) {
            return jq.each(function () {
                _3ca(this, _3db);
            });
        }, removeItem: function (jq, _3dc) {
            return jq.each(function () {
                _3ce(this, _3dc);
            });
        }, enableItem: function (jq, _3dd) {
            return jq.each(function () {
                _3ad(this, _3dd, false);
            });
        }, disableItem: function (jq, _3de) {
            return jq.each(function () {
                _3ad(this, _3de, true);
            });
        }
    };
    $.fn.menu.parseOptions = function (_3df) {
        return $.extend({}, $.parser.parseOptions(_3df, ["left", "top", { minWidth: "number", hideOnUnhover: "boolean" }]));
    };
    $.fn.menu.defaults = {
        zIndex: 110000, left: 0, top: 0, alignTo: null, align: "left", minWidth: 120, hideOnUnhover: true, onShow: function () {
        }, onHide: function () {
        }, onClick: function (item) {
        }
    };
})(jQuery);