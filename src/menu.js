(function ($) {
    function init(target) {
        $(target).appendTo("body");
        $(target).addClass("menu-top");
	    var opts = $.data(target,"menu").options;
        if (opts.isTopZindex){
            var ocxFrame = '<iframe style="position:absolute;z-index:-1;width:100%;height:100%;top:0;left:0;scrolling:no;" frameborder="0"></iframe>';
            $(target).prepend(ocxFrame);
        }
        $(document).unbind(".menu").bind("mousedown.menu", function (e) {
            var m = $(e.target).closest("div.menu,div.combo-p");
            if (m.length) {
                return;
            }
            $("body>div.menu-top:visible").menu("hide");
        });
        var menus = splitMenu($(target));
        for (var i = 0; i < menus.length; i++) {
            createMenu(menus[i]);
        }
        function splitMenu(menu) {
            var menus = [];
            menu.addClass("menu");
            menus.push(menu);
            if (!menu.hasClass("menu-content")) {
                menu.children("div").each(function () {
                    var submenu = $(this).children("div");
                    if (submenu.length) {
                        submenu.insertAfter(target);
                        this.submenu = submenu;
                        var mm = splitMenu(submenu);
                        menus = menus.concat(mm);
                    }
                });
            }
            return menus;
        };
        function createMenu(menu) {
            var wh = $.parser.parseOptions(menu[0], ["width", "height"]);
            menu[0].originalHeight = wh.height || 0;
            if (menu.hasClass("menu-content")) {
                menu[0].originalWidth = wh.width || menu._outerWidth();
            } else {
                menu[0].originalWidth = wh.width || 0;
                menu.children("div").each(function () {
                    var item = $(this);
                    var itemOpts = $.extend({}, $.parser.parseOptions(this, ["name", "iconCls", "href", { separator: "boolean" }]), { disabled: (item.attr("disabled") ? true : undefined) });
                    if (itemOpts.separator) {
                        item.addClass("menu-sep");
                    }
                    if (!item.hasClass("menu-sep")) {
                        item[0].itemName = itemOpts.name || "";
                        item[0].itemHref = itemOpts.href || "";
                        var text = item.addClass("menu-item").html();
                        item.empty().append($("<div class=\"menu-text\"></div>").html($.hisui.getTrans(text))); //add trans
                        if (itemOpts.iconCls) {
                            $("<div class=\"menu-icon\"></div>").addClass(itemOpts.iconCls).appendTo(item);
                        }
                        if (itemOpts.disabled) {
                            setDisabled(target, item[0], true);
                        }
                        if (item[0].submenu) {
                            $("<div class=\"menu-rightarrow\"></div>").appendTo(item);
                        }
                        bindMenuItemEvent(target, item);
                    }
                });
                $("<div class=\"menu-line\"></div>").prependTo(menu);
            }
            setMenuWidth(target, menu);
            menu.hide();
            bindMenuEvent(target, menu);
        };
    };
    function setMenuWidth(target, menu) {
        var opts = $.data(target, "menu").options;
        var style = menu.attr("style") || "";
        menu.css({ display: "block", left: -10000, height: "auto", overflow: "hidden" });
        var el = menu[0];
        var width = el.originalWidth || 0;
        if (!width) {
            width = 0;
            menu.find("div.menu-text").each(function () {
                if (width < $(this)._outerWidth()) {
                    width = $(this)._outerWidth();
                }
                if ("pure"==window.HISUIStyleCode){
                    // 纯净版本时,下拉菜单高度为34,不用+2 [5909505]
                }else{
                    $(this).closest("div.menu-item")._outerHeight($(this)._outerHeight() + 2);
                }
            });
            width += 40;
        }
        width = Math.max(width, opts.minWidth);
        var height = el.originalHeight || menu.outerHeight();
        var lineHeight = Math.max(el.originalHeight, menu.outerHeight()) - 2;
        //cryze menu 若是在options指定宽度，则按指定的宽度
        if (opts.width&&opts.width>0) width=opts.width;
        menu._outerWidth(width)._outerHeight(height);
        menu.children("div.menu-line")._outerHeight(lineHeight);
        style += ";width:" + el.style.width + ";height:" + el.style.height;
        menu.attr("style", style);
    };
    function bindMenuEvent(target, menu) {
        var state = $.data(target, "menu");
        menu.unbind(".menu").bind("mouseenter.menu", function () {
            if (state.timer) {
                clearTimeout(state.timer);
                state.timer = null;
            }
        }).bind("mouseleave.menu", function () {
            if (state.options.hideOnUnhover) {
                state.timer = setTimeout(function () {
                    hideAll(target);
                }, 100);
            }
        });
    };
    function bindMenuItemEvent(target, item) {
        if (!item.hasClass("menu-item")) {
            return;
        }
        item.unbind(".menu");
        item.bind("click.menu", function () {
            if ($(this).hasClass("menu-item-disabled")) {
                return;
            }
            if (!this.submenu) {
                hideAll(target);
                var href = $(this).attr("href");
                if (href) {
                    location.href = href;
                }
            }
            var item = $(target).menu("getItem", this);
            $.data(target, "menu").options.onClick.call(target, item);
        }).bind("mouseenter.menu", function (e) {
            item.siblings().each(function () {
                if (this.submenu) {
                    hideMenu(this.submenu);
                }
                $(this).removeClass("menu-active");
            });
            item.addClass("menu-active");
            if ($(this).hasClass("menu-item-disabled")) {
                item.addClass("menu-active-disabled");
                return;
            }
            var submenu = item[0].submenu;
            if (submenu) {
                $(target).menu("show", { menu: submenu, parent: item });
            }
        }).bind("mouseleave.menu", function (e) {
            item.removeClass("menu-active menu-active-disabled");
            var submenu = item[0].submenu;
            if (submenu) {
                if (e.pageX >= parseInt(submenu.css("left"))) {
                    item.addClass("menu-active");
                } else {
                    hideMenu(submenu);
                }
            } else {
                item.removeClass("menu-active");
            }
        });
    };
    function hideAll(target) {
        var state = $.data(target, "menu");
        if (state) {
            if ($(target).is(":visible")) {
                hideMenu($(target));
                state.options.onHide.call(target);
            }
        }
        if (state.options.isTopZindex){windowNPAPITotal=200;$.hisui.findObjectDom(state.options,window,false,target,"menu");}
        //如果是先【关闭病历】页签，上面方法不会清空标志，在此清空标志。如【诊疗与病历】双击切换病人
        $.data(target,"changeIdStr",{NPAPIIdStr:""});
        return false;
    };
    function showMenu(target, param) {
        var left, top;
        param = param || {};
        var menu = $(param.menu || target);
        var opts = $.data(target, "menu").options;
        if (menu.hasClass("menu-top")) {
            
            $.extend(opts, param);
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
            var parent = param.parent;
            left = parent.offset().left + parent.outerWidth() - 2;
            if (left + menu.outerWidth() + 5 > $(window)._outerWidth() + $(document).scrollLeft()) {
                left = parent.offset().left - menu.outerWidth() + 2;
            }
            var top = parent.offset().top - 3;
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
        if (opts.isTopZindex){windowNPAPITotal=200;$.hisui.findObjectDom(opts,window,true,target,"menu");}
    };
    function hideMenu(menu) {
        if (!menu) {
            return;
        }
        hideit(menu);
        menu.find("div.menu-item").each(function () {
            if (this.submenu) {
                hideMenu(this.submenu);
            }
            $(this).removeClass("menu-active");
        });
        function hideit(m) {
            m.stop(true, true);
            if (m[0].shadow) {
                m[0].shadow.hide();
            }
            m.hide();
        };
    };
    function findItem(target, text) {
        text=$.hisui.getTrans(text); //add trans  用翻译后的值查找 
        var result = null;
        var tmp = $("<div></div>");
        function find(menu) {
            menu.children("div.menu-item").each(function () {
                var item = $(target).menu("getItem", this);
                var s = tmp.empty().html(item.text).text(); //getItem 拿到的text是元素html 是翻译后的值
                if (text == $.trim(s)) {
                    result = item;
                } else {
                    if (this.submenu && !result) {
                        find(this.submenu);
                    }
                }
            });
        };
        find($(target));
        tmp.remove();
        return result;
    };
    function setDisabled(target, itemEl, disabled) {
        var t = $(itemEl);
        if (!t.hasClass("menu-item")) {
            return;
        }
        if (disabled) {
            t.addClass("menu-item-disabled");
            if (itemEl.onclick) {
                itemEl.onclick1 = itemEl.onclick;
                itemEl.onclick = null;
            }
        } else {
            t.removeClass("menu-item-disabled");
            if (itemEl.onclick1) {
                itemEl.onclick = itemEl.onclick1;
                itemEl.onclick1 = null;
            }
        }
    };
    function appendItem(target, param) {
        var menu = $(target);
        if (param.parent) {
            if (!param.parent.submenu) {
                var submenu = $("<div class=\"menu\"><div class=\"menu-line\"></div></div>").appendTo("body");
                submenu.hide();
                param.parent.submenu = submenu;
                $("<div class=\"menu-rightarrow\"></div>").appendTo(param.parent);
            }
            menu = param.parent.submenu;
        }
        if (param.separator) {
            var item = $("<div class=\"menu-sep\"></div>").appendTo(menu);
        } else {
            var item = $("<div class=\"menu-item\"></div>").appendTo(menu);
            $("<div class=\"menu-text\"></div>").html($.hisui.getTrans(param.text)).appendTo(item);  //add trans
        }
        if (param.iconCls) {
            $("<div class=\"menu-icon\"></div>").addClass(param.iconCls).appendTo(item);
        }
        if (param.id) {
            item.attr("id", param.id);
        }
        if (param.name) {
            item[0].itemName = param.name;
        }
        if (param.href) {
            item[0].itemHref = param.href;
        }
        if (param.onclick) {
            if (typeof param.onclick == "string") {
                item.attr("onclick", param.onclick);
            } else {
                item[0].onclick = eval(param.onclick);
            }
        }
        if (param.handler) {
            item[0].onclick = eval(param.handler);
        }
        if (param.disabled) {
            setDisabled(target, item[0], true);
        }
        bindMenuItemEvent(target, item);
        bindMenuEvent(target, menu);
        setMenuWidth(target, menu);
    };
    function removeItem(target, itemEl) {
        function removeit(el) {
            if (el.submenu) {
                el.submenu.children("div.menu-item").each(function () {
                    removeit(this);
                });
                var shadow = el.submenu[0].shadow;
                if (shadow) {
                    shadow.remove();
                }
                el.submenu.remove();
            }
            $(el).remove();
        };
        removeit(itemEl);
    };
    function destroyMenu(target) {
        $(target).children("div.menu-item").each(function () {
            removeItem(target, this);
        });
        if (target.shadow) {
            target.shadow.remove();
        }
        $(target).remove();
    };
    $.fn.menu = function (options, param) {
        if (typeof options == "string") {
            return $.fn.menu.methods[options](this, param);
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "menu");
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, "menu", { options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), options) });
                init(this);
            }
            $(this).css({ left: state.options.left, top: state.options.top });
        });
    };
    $.fn.menu.methods = {
        options: function (jq) {
            return $.data(jq[0], "menu").options;
        }, show: function (jq, pos) {
            return jq.each(function () {
                showMenu(this, pos);
            });
        }, hide: function (jq) {
            return jq.each(function () {
                hideAll(this);
            });
        }, destroy: function (jq) {
            return jq.each(function () {
                destroyMenu(this);
            });
        }, setText: function (jq, param) {
            return jq.each(function () {
                $(param.target).children("div.menu-text").html($.hisui.getTrans(param.text));  //add trans
            });
        }, setIcon: function (jq, param) {
            return jq.each(function () {
                $(param.target).children("div.menu-icon").remove();
                if (param.iconCls) {
                    $("<div class=\"menu-icon\"></div>").addClass(param.iconCls).appendTo(param.target);
                }
            });
        }, getItem: function (jq, itemEl) {
            var t = $(itemEl);
            var item = { target: itemEl, id: t.attr("id"), text: $.trim(t.children("div.menu-text").html()), disabled: t.hasClass("menu-item-disabled"), name: itemEl.itemName, href: itemEl.itemHref, onclick: itemEl.onclick };
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
            return findItem(jq[0], text);
        }, appendItem: function (jq, param) {
            return jq.each(function () {
                appendItem(this, param);
            });
        }, removeItem: function (jq, itemEl) {
            return jq.each(function () {
                removeItem(this, itemEl);
            });
        }, enableItem: function (jq, itemEl) {
            return jq.each(function () {
                setDisabled(this, itemEl, false);
            });
        }, disableItem: function (jq, itemEl) {
            return jq.each(function () {
                setDisabled(this, itemEl, true);
            });
        }
    };
    $.fn.menu.parseOptions = function (target) {
        return $.extend({}, $.parser.parseOptions(target, ["left", "top", { minWidth: "number", hideOnUnhover: "boolean" }]));
    };
    $.fn.menu.defaults = {
        isTopZindex:false,
        zIndex: 110000, left: 0, top: 0, alignTo: null, align: "left", minWidth: 120, hideOnUnhover: true, onShow: function () {
        }, onHide: function () {
        }, onClick: function (item) {
        }
    };
})(jQuery);