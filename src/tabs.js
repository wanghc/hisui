(function ($) {
    function setScrollers(container) {
        var opts = $.data(container, "tabs").options;
        if (opts.tabPosition == "left" || opts.tabPosition == "right" || !opts.showHeader) {
            return;
        }
        var header = $(container).children("div.tabs-header");
        var tool = header.children("div.tabs-tool");
        var sLeft = header.children("div.tabs-scroller-left");
        var sRight = header.children("div.tabs-scroller-right");
        var wrap = header.children("div.tabs-wrap");
        var tHeight = header.outerHeight();
        if (opts.plain) {
            tHeight -= tHeight - header.height();
        }
        tool._outerHeight(tHeight);
        var tabsWidth = 0;
        $("ul.tabs li", header).each(function () {
            tabsWidth += $(this).outerWidth(true);
        });
        var cWidth = header.width() - tool._outerWidth();
        if (tabsWidth > cWidth) {
            sLeft.add(sRight).show()._outerHeight(tHeight);
            if (opts.toolPosition == "left") {
                tool.css({ left: sLeft.outerWidth(), right: "" });
                wrap.css({ marginLeft: sLeft.outerWidth() + tool._outerWidth(), marginRight: sRight._outerWidth(), width: cWidth - sLeft.outerWidth() - sRight.outerWidth() });
            } else {
                tool.css({ left: "", right: sRight.outerWidth() });
                wrap.css({ marginLeft: sLeft.outerWidth(), marginRight: sRight.outerWidth() + tool._outerWidth(), width: cWidth - sLeft.outerWidth() - sRight.outerWidth() });
            }
        } else {
            sLeft.add(sRight).hide();
            if (opts.toolPosition == "left") {
                tool.css({ left: 0, right: "" });
                wrap.css({ marginLeft: tool._outerWidth(), marginRight: 0, width: cWidth });
            } else {
                tool.css({ left: "", right: 0 });
                wrap.css({ marginLeft: 0, marginRight: tool._outerWidth(), width: cWidth });
            }
        }
    };
    function addTools(container) {
        var opts = $.data(container, "tabs").options;
        var header = $(container).children("div.tabs-header");
        if (opts.tools) {
            if (typeof opts.tools == "string") {
                $(opts.tools).addClass("tabs-tool").appendTo(header);
                $(opts.tools).show();
            } else {
                header.children("div.tabs-tool").remove();
                var tools = $("<div class=\"tabs-tool\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"height:100%\"><tr></tr></table></div>").appendTo(header);
                var tr = tools.find("tr");
                for (var i = 0; i < opts.tools.length; i++) {
                    var td = $("<td></td>").appendTo(tr);
                    var tool = $("<a href=\"javascript:void(0);\"></a>").appendTo(td);
                    tool[0].onclick = eval(opts.tools[i].handler || function () {
                    });
                    tool.linkbutton($.extend({}, opts.tools[i], { plain: true }));
                }
            }
        } else {
            header.children("div.tabs-tool").remove();
        }
    };
    //简单的右键菜单
    function createSimpleContextMenu(ele){
        var state = $.data(ele, "tabs");
        var opts=state.options;
        if(opts.simpleContextMenu){
            var ctxmenu=$('<div class="tabs-ctx-menu">'
                            +'<div class="tabs-ctx-menu-refresh" >刷新</div>'
                            +'<div class="menu-sep" ></div>'
                            +'<div class="tabs-ctx-menu-close" >关闭</div>'
                            +'<div class="tabs-ctx-menu-closeother" >关闭其他</div>'
                            +'<div class="tabs-ctx-menu-closeall" >关闭全部</div>'
                            +'<div class="tabs-ctx-menu-closeleft" >关闭左侧</div>'
                            +'<div class="tabs-ctx-menu-closeright">关闭右侧</div>'
                        +'</div>').appendTo('body');
            ctxmenu.menu({})
            state.ctxmenu=ctxmenu;

            ctxmenu.find('.tabs-ctx-menu-refresh').off('click.tabs').on('click.tabs',function(){
                if($(this).hasClass('menu-item-disabled')){
                    return;
                }
                var currTabInd = ctxmenu.data("currtab"),
                currTab= $(ele).tabs('getTab',currTabInd);
                var frame=currTab.find('iframe')
                $(ele).tabs('select',currTabInd);  //刷新选中当前页
                if(frame.length>0){
                    frame.attr('src',frame.attr('src'));
                }
            });
    
            ctxmenu.find('.tabs-ctx-menu-close').off('click.tabs').on('click.tabs',function(){
                if($(this).hasClass('menu-item-disabled')){
                    return;
                }
                var currTabInd = ctxmenu.data("currtab");
	            $(ele).tabs('close',currTabInd);
            });

            ctxmenu.find('.tabs-ctx-menu-closeother').off('click.tabs').on('click.tabs',function(){
                if($(this).hasClass('menu-item-disabled')){
                    return;
                }
                var currTabInd = ctxmenu.data("currtab"),newCurrTabInd=currTabInd;
                var tabs=$(ele).tabs('tabs');
                for (var i=tabs.length-1;i>0;i--){  //从最后一个关
                    if (i!=currTabInd) {
                        $(ele).tabs('close',i);
                        if(i<currTabInd) newCurrTabInd--;  //关闭当前标签左侧的 当前标签索引会-1
                    }
                    
                }
                //需要重新选中当前
                $(ele).tabs('select',newCurrTabInd);
                return false;
            });

            ctxmenu.find('.tabs-ctx-menu-closeall').off('click.tabs').on('click.tabs',function(){
                if($(this).hasClass('menu-item-disabled')){
                    return;
                }
                var tabs=$(ele).tabs('tabs');
                for (var i=tabs.length-1;i>0;i--){  //从最后一个关
                    $(ele).tabs('close',i);
                }
            });
            ctxmenu.find('.tabs-ctx-menu-closeleft').off('click.tabs').on('click.tabs',function(){
                if($(this).hasClass('menu-item-disabled')){
                    return;
                }
                var currTabInd = ctxmenu.data("currtab"),newCurrTabInd=currTabInd;
                var tabs=$(ele).tabs('tabs');
                for (var i=tabs.length-1;i>0;i--){  //从最后一个关
                    if (i<currTabInd) {
                        $(ele).tabs('close',i);
                        if(i<currTabInd) newCurrTabInd--;  //关闭当前标签左侧的 当前标签索引会-1
                    }
                    
                }
                //需要重新选中当前
                $(ele).tabs('select',newCurrTabInd);
                return false;
            });
            ctxmenu.find('.tabs-ctx-menu-closeright').off('click.tabs').on('click.tabs',function(){
                if($(this).hasClass('menu-item-disabled')){
                    return;
                }
                var currTabInd = ctxmenu.data("currtab"),newCurrTabInd=currTabInd;
                var tabs=$(ele).tabs('tabs');
                for (var i=tabs.length-1;i>0;i--){  //从最后一个关
                    if (i>currTabInd) {
                        $(ele).tabs('close',i);
                    }
                    
                }
                //需要重新选中当前
                $(ele).tabs('select',newCurrTabInd);
                return false;
            });

        }


    }
    function showSimpleContextMenu(ele,e,title,index){
        var state = $.data(ele, "tabs");
        var ctxmenu=state.ctxmenu;
        var opts=state.options;
        var tabsCount=$(ele).tabs('tabs').length;

        var currTab=$(ele).tabs('getTab',index);
        var currTabClosable=currTab.panel('options').closable;
        var frame=currTab.find('iframe');

        if(frame.length==0){
            ctxmenu.menu('disableItem',ctxmenu.find('.tabs-ctx-menu-refresh')[0]);
        }else{
            ctxmenu.menu('enableItem',ctxmenu.find('.tabs-ctx-menu-refresh')[0]);
        }
        
        if (!currTabClosable){ //不可关闭
            ctxmenu.menu('disableItem',ctxmenu.find('.tabs-ctx-menu-close')[0]);
        }else{
            ctxmenu.menu('enableItem',ctxmenu.find('.tabs-ctx-menu-close')[0]);
        }

        if(index>1){  //有个首页 第三个起 才可以关闭左侧
            ctxmenu.menu('enableItem',ctxmenu.find('.tabs-ctx-menu-closeleft')[0]);
        }else{
            ctxmenu.menu('disableItem',ctxmenu.find('.tabs-ctx-menu-closeleft')[0]);
        }
        if(index<tabsCount-1){  //倒数第二个才可以关闭右侧
            ctxmenu.menu('enableItem',ctxmenu.find('.tabs-ctx-menu-closeright')[0]);
        }else{
            ctxmenu.menu('disableItem',ctxmenu.find('.tabs-ctx-menu-closeright')[0]);
        }

        if ( index>1 || index<tabsCount-1 ){ //能关闭左侧  或能关闭右侧  即能关闭其它
            ctxmenu.menu('enableItem',ctxmenu.find('.tabs-ctx-menu-closeother')[0]);
        }else{
            ctxmenu.menu('disableItem',ctxmenu.find('.tabs-ctx-menu-closeother')[0]);
        }
        ctxmenu.menu('show', {
            left: e.pageX,
            top: e.pageY
        });
        ctxmenu.data("currtab",index);
    }
    var debounced_showSimpleContextMenu=$.hisui.debounce(showSimpleContextMenu,200)

    function setSize(container) {
        var state = $.data(container, "tabs");
        var opts = state.options;
        var cc = $(container);
        opts.fit ? $.extend(opts, cc._fit()) : cc._fit(false);
        cc.width(opts.width).height(opts.height);
        var header = $(container).children("div.tabs-header");
        var panels = $(container).children("div.tabs-panels");
        var wrap = header.find("div.tabs-wrap");
        var ul = wrap.find(".tabs");
        for (var i = 0; i < state.tabs.length; i++) {
            var p_opts = state.tabs[i].panel("options");
            var p_t = p_opts.tab.find("a.tabs-inner");
            var width = parseInt(p_opts.tabWidth || opts.tabWidth) || undefined;
            if (width) {
                p_t._outerWidth(width);
            } else {
                p_t.css("width", "");
            }
            p_t._outerHeight(opts.tabHeight);
            p_t.css("lineHeight", p_t.height() + "px");
        }
        if (opts.tabPosition == "left" || opts.tabPosition == "right") {
            header._outerWidth(opts.showHeader ? opts.headerWidth : 0);
            //panels._outerWidth(cc.width() - header.outerWidth());
            //cc.width(opts.width)设置值与再cc.width()取到值在浏览器缩放时会不一致 甚至cc.width(1305) 出现cc.width()获取到1306
            var ccWidth=cc.width();
            if(ccWidth>opts.width) ccWidth=opts.width;
            panels._outerWidth(ccWidth - header.outerWidth());
            header.add(panels)._outerHeight(opts.height);
            wrap._outerWidth(header.width());
            ul._outerWidth(wrap.width()).css("height", "");
        } else {
            var lrt = header.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool");
            header._outerWidth(opts.width).css("height", "");
            if (opts.showHeader) {
                header.css("background-color", "");
                header.removeClass("tabs-noheader");
                wrap.css("height", "");
                lrt.show();
            } else {
                header.css("background-color", "transparent");
                header.removeClass("tabs-noheader").addClass("tabs-noheader");
                header._outerHeight(0);
                wrap._outerHeight(0);
                lrt.hide();
            }
            ul._outerHeight(opts.tabHeight).css("width", "");
            setScrollers(container);
            var height = opts.height;
            if (!isNaN(height)) {
                panels._outerHeight(height - header.outerHeight());
            } else {
                panels.height("auto");
            }
            var width = opts.width;
            if (!isNaN(width)) {
                panels._outerWidth(width);
            } else {
                panels.width("auto");
            }
        }
    };
    function setSelectedSize(container) {
        var opts = $.data(container, "tabs").options;
        var tab = getSelectedTab(container);
        if (tab) {
            var panels = $(container).children("div.tabs-panels");
            var width = opts.width == "auto" ? "auto" : panels.width();
            var height = opts.height == "auto" ? "auto" : panels.height();
            tab.panel("resize", { width: width, height: height });
        }
    };
    function wrapTabs(container) {
        var tabs = $.data(container, "tabs").tabs;
        var cc = $(container);
        cc.addClass("tabs-container");
        var pp = $("<div class=\"tabs-panels\"></div>").insertBefore(cc);
        cc.children("div").each(function () {
            pp[0].appendChild(this);
        });
        cc[0].appendChild(pp[0]);
        $("<div class=\"tabs-header\">" + "<div class=\"tabs-scroller-left\"></div>" + "<div class=\"tabs-scroller-right\"></div>" + "<div class=\"tabs-wrap\">" + "<ul class=\"tabs\"></ul>" + "</div>" + "</div>").prependTo(container);
        cc.children("div.tabs-panels").children("div").each(function (i) {
            var opts = $.extend({}, $.parser.parseOptions(this), { selected: ($(this).attr("selected") ? true : undefined) });
            var pp = $(this);
            tabs.push(pp);
            createTab(container, pp, opts);
        });
        cc.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function () {
            $(this).addClass("tabs-scroller-over");
        }, function () {
            $(this).removeClass("tabs-scroller-over");
        });
        cc.bind("_resize", function (e, force) {
            var opts = $.data(container, "tabs").options;
            if (opts.fit == true || force) {
                setSize(container);
                setSelectedSize(container);
            }
            return false;
        });
    };
    function bindEvents(container) {
        var state = $.data(container, "tabs");
        var opts = state.options;
        $(container).children("div.tabs-header").unbind().bind("click", function (e) {
            if ($(e.target).hasClass("tabs-scroller-left")) {
                $(container).tabs("scrollBy", -opts.scrollIncrement);
            } else {
                if ($(e.target).hasClass("tabs-scroller-right")) {
                    $(container).tabs("scrollBy", opts.scrollIncrement);
                } else {
                    var li = $(e.target).closest("li");
                    if (li.hasClass("tabs-disabled")) {
                        return;
                    }
                    var a = $(e.target).closest("a.tabs-close");
                    if (a.length) {
                        closeTab(container, getLiIndex(li));
                    } else {
                        if (li.length) {
                            var index = getLiIndex(li);
                            var popts = state.tabs[index].panel("options");
                            if (popts.collapsible) {
                                popts.closed ? selectTab(container, index) : unselectTab(container, index);
                            } else {
                                selectTab(container, index);
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
                var liIndex= getLiIndex(li);
                var liTitle= getTab(container,liIndex).panel('options').title;
                //opts.onContextMenu.call(container, e, li.find("span.tabs-title").html(), getLiIndex(li));
                var liIndex= getLiIndex(li);
                var liTitle= getTab(container,liIndex).panel('options').title;
                if (opts.simpleContextMenu){ //显示简单的右键菜单
                    e.preventDefault();
                    debounced_showSimpleContextMenu(container,e,liTitle,liIndex);
                }
                opts.onContextMenu.call(container, e, liTitle,liIndex); //opts上的title不翻译 元素显示上的是翻译过后的
            }
        });
        function getLiIndex(li) {
            var index = 0;
            li.parent().children("li").each(function (i) {
                if (li[0] == this) {
                    index = i;
                    return false;
                }
            });
            return index;
        };
    };
    function setProperties(container) {
        var opts = $.data(container, "tabs").options;
        var header = $(container).children("div.tabs-header");
        var panels = $(container).children("div.tabs-panels");
        header.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right");
        panels.removeClass("tabs-panels-top tabs-panels-bottom tabs-panels-left tabs-panels-right");
        if (opts.tabPosition == "top") {
            header.insertBefore(panels);
        } else {
            if (opts.tabPosition == "bottom") {
                header.insertAfter(panels);
                header.addClass("tabs-header-bottom");
                panels.addClass("tabs-panels-top");
            } else {
                if (opts.tabPosition == "left") {
                    header.addClass("tabs-header-left");
                    panels.addClass("tabs-panels-right");
                } else {
                    if (opts.tabPosition == "right") {
                        header.addClass("tabs-header-right");
                        panels.addClass("tabs-panels-left");
                    }
                }
            }
        }
        if (opts.plain == true) {
            header.addClass("tabs-header-plain");
        } else {
            header.removeClass("tabs-header-plain");
        }
        if (opts.border == true) {
            header.removeClass("tabs-header-noborder");
            panels.removeClass("tabs-panels-noborder");
        } else {
            header.addClass("tabs-header-noborder");
            panels.addClass("tabs-panels-noborder");
        }
    };
    function createTab(container, pp, options) {
        var state = $.data(container, "tabs");
        options = options || {};
        pp.panel($.extend({}, options, {
            border: false, noheader: true, closed: true, doSize: false, iconCls: (options.icon ? options.icon : undefined), onLoad: function () {
                if (options.onLoad) {
                    options.onLoad.call(this, arguments);
                }
                state.options.onLoad.call(container, $(this));
            }
        }));
        var opts = pp.panel("options");
        var tabs = $(container).children("div.tabs-header").find("ul.tabs");
        
        //cryze 2018-3-15  add class 'tab-brand' to first tab of BrandTabs
        if (!!state.options.isBrandTabs && tabs.children('li').length==0) {
            opts.tab = $("<li class='tabs-brand'></li>").appendTo(tabs);
        }else{
            opts.tab = $("<li></li>").appendTo(tabs);
        }
        
        opts.tab.append("<a href=\"javascript:void(0)\" class=\"tabs-inner\">" + "<span class=\"tabs-title\"></span>" + "<span class=\"tabs-icon\"></span>" + "</a>");
        $(container).tabs("update", { tab: pp, options: opts });
    };
    function addTab(container, options) {
        var opts = $.data(container, "tabs").options;
        var tabs = $.data(container, "tabs").tabs;
        if (options.selected == undefined) {
            options.selected = true;
        }
        var pp = $("<div></div>").appendTo($(container).children("div.tabs-panels"));
        tabs.push(pp);
        createTab(container, pp, options);
        opts.onAdd.call(container, options.title, tabs.length - 1);
        setSize(container);
        if (options.selected) {
            selectTab(container, tabs.length - 1);
        }
    };
    /**
	* wanghc---不能重刷新content-iframe
	*/
	function updateTabOpt(container, param){
		var selectHis = $.data(container, 'tabs').selectHis;
		var pp = param.tab;	// the tab panel
		var paramOpts = param.options; 		
		var opts = pp.panel('options');	// get the tab panel options
		var oldTitle = opts.title;
		var tab = opts.tab;		
		var s_title = tab.find('span.tabs-title');
		var s_icon = tab.find('span.tabs-icon');
		if (paramOpts.title) {
			s_title.html(paramOpts.title);
			pp.panel("options").title=paramOpts.title;
		}
		if (paramOpts.title){
			 s_title.html(paramOpts.title);
			if (oldTitle != opts.title){
				for(var i=0; i<selectHis.length; i++){
					if (selectHis[i] == oldTitle){
						selectHis[i] = opts.title;
					}
				}
			}
		}
	}
    function updateTab(container, param) {
        var selectHis = $.data(container, "tabs").selectHis;
        var pp = param.tab;
        var oldTitle = pp.panel("options").title;
        pp.panel($.extend({}, param.options, { iconCls: (param.options.icon ? param.options.icon : undefined) }));
        var opts = pp.panel("options");
        var tab = opts.tab;
        var s_title = tab.find("span.tabs-title");
        var s_icon = tab.find("span.tabs-icon");
        s_title.html($.hisui.getTrans(opts.title));  //add trans
        s_icon.attr("class", "tabs-icon");
        tab.find("a.tabs-close").remove();
        if (opts.closable) {
            s_title.addClass("tabs-closable");
            $("<a href=\"javascript:void(0)\" class=\"tabs-close\"></a>").appendTo(tab);
        } else {
            s_title.removeClass("tabs-closable");
        }
        if (opts.iconCls) {
            s_title.addClass("tabs-with-icon");
            s_icon.addClass(opts.iconCls);
        } else {
            s_title.removeClass("tabs-with-icon");
        }
        if (oldTitle != opts.title) {
            for (var i = 0; i < selectHis.length; i++) {
                if (selectHis[i] == oldTitle) {
                    selectHis[i] = opts.title;
                }
            }
        }
        tab.find("span.tabs-p-tool").remove();
        if (opts.tools) {
            var p_tool = $("<span class=\"tabs-p-tool\"></span>").insertAfter(tab.find("a.tabs-inner"));
            if ($.isArray(opts.tools)) {
                for (var i = 0; i < opts.tools.length; i++) {
                    var t = $("<a href=\"javascript:void(0)\"></a>").appendTo(p_tool);
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
                $(opts.tools).children().appendTo(p_tool);
            }
            var pr = p_tool.children().length * 12;
            if (opts.closable) {
                pr += 8;
            } else {
                pr -= 3;
                p_tool.css("right", "5px");
            }
            s_title.css("padding-right", pr + "px");
        }
        setSize(container);
        $.data(container, "tabs").options.onUpdate.call(container, opts.title, getTabIndex(container, pp));
    };
    function closeTab(container, which) {
        var opts = $.data(container, "tabs").options;
        var tabs = $.data(container, "tabs").tabs;
        var selectHis = $.data(container, "tabs").selectHis;
        if (!exists(container, which)) {
            return;
        }
        var tab = getTab(container, which);
        var title = tab.panel("options").title;
        var index = getTabIndex(container, tab);
        if (opts.onBeforeClose.call(container, title, index) == false) {
            return;
        }
        var tab = getTab(container, which, true);
        tab.panel("options").tab.remove();
        tab.panel("destroy");
        opts.onClose.call(container, title, index);
        setSize(container);
        for (var i = 0; i < selectHis.length; i++) {
            if (selectHis[i] == title) {
                selectHis.splice(i, 1);
                i--;
            }
        }
        var hisTitle = selectHis.pop();
        if (hisTitle) {
            selectTab(container, hisTitle);
        } else {
            if (tabs.length) {
                selectTab(container, 0);
            }
        }
    };
	/**
	* $("#tabsReg").tabs("getTab"{val:"EPR",key:'itarget'});
	* $("#tabsReg").tabs("getTab",{val:"医嘱录入",key:'title'});
	* $("#tabsReg").tabs("getTab",{val:"dhcdoc.main.view",key:'id'});
	*/
	function getTabByOpt(container, opt){
		var tabs = $.data(container, 'tabs').tabs;
		for(var i=0; i<tabs.length; i++){
			var tab = tabs[i];
			if (tab.panel('options')[opt['key']] == opt['val']){
				return tab;
			}
		}
		return null;
	};
    function getTab(container, which, removeit) {
        var tabs = $.data(container, "tabs").tabs;
        if (typeof which == "number") {
            if (which < 0 || which >= tabs.length) {
                return null;
            } else {
                var tab = tabs[which];
                if (removeit) {
                    tabs.splice(which, 1);
                }
                return tab;
            }
        }
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if (tab.panel("options").title == which) {
                if (removeit) {
                    tabs.splice(i, 1);
                }
                return tab;
            }
        }
        return null;
    };
    function getTabIndex(container, tab) {
        var tabs = $.data(container, "tabs").tabs;
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i][0] == $(tab)[0]) {
                return i;
            }
        }
        return -1;
    };
    function getSelectedTab(container) {
        var tabs = $.data(container, "tabs").tabs;
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            if (tab.panel("options").closed == false) {
                return tab;
            }
        }
        return null;
    };
    function doFirstSelect(container) {   // init after  select one default selected tab
        var state = $.data(container, "tabs");
        var tabs = state.tabs;
        var isBrandTabs=!!state.options.isBrandTabs;  //cryze 2018-3-15
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].panel("options").selected && !(isBrandTabs && i==0)) {  //cryze 2018-3-15
                selectTab(container, i);
                return;
            }
        }
        if(isBrandTabs && state.options.selected==0) state.options.selected=1;   //cryze 2018-3-15
        selectTab(container, state.options.selected);
    };
    function selectTab(container, which) {
        var state = $.data(container, "tabs");
        var opts = state.options;
        var tabs = state.tabs;
        var selectHis = state.selectHis;
        if (tabs.length == 0) {
            return;
        }
        var panel = getTab(container, which);
        if (!panel) {
            return;
        }
        var selected = getSelectedTab(container);
        /*wanghc add onBeforeSelect event*/
        if (opts.onBeforeSelect) {
            if (false == opts.onBeforeSelect.call(container, panel.panel("options").title, getTabIndex(container, panel))) {
                return false;
            }
        }
        if (!!opts.isBrandTabs) { /*first tab  is brand tab  . wanghc */
            if (getTabIndex(container, panel) == 0) {
                return false;
            }
        }
        if (selected) {
            if (panel[0] == selected[0]) {
                setSelectedSize(container);
                return;
            }
            unselectTab(container, getTabIndex(container, selected));
            if (!selected.panel("options").closed) {
                return;
            }
        }
        panel.panel("open");
        var title = panel.panel("options").title;
        selectHis.push(title);
        var tab = panel.panel("options").tab;
        tab.addClass("tabs-selected");
        var wrap = $(container).find(">div.tabs-header>div.tabs-wrap");
        var left = tab.position().left;
        var right = left + tab.outerWidth();
        if (left < 0 || right > wrap.width()) {
            var deltaX = left - (wrap.width() - tab.width()) / 2;
            $(container).tabs("scrollBy", deltaX);
        } else {
            $(container).tabs("scrollBy", 0);
        }
        setSelectedSize(container);
        opts.onSelect.call(container, title, getTabIndex(container, panel));
    };
    function unselectTab(container, which) {
        var state = $.data(container, "tabs");
        var p = getTab(container, which);
        if (p) {
            var opts = p.panel("options");
            if (!opts.closed) {
                p.panel("close");
                if (opts.closed) {
                    opts.tab.removeClass("tabs-selected");
                    state.options.onUnselect.call(container, opts.title, getTabIndex(container, p));
                }
            }
        }
    };
    function exists(container, which) {
        return getTab(container, which) != null;
    };
    function showHeader(container, visible) {
        var opts = $.data(container, "tabs").options;
        opts.showHeader = visible;
        $(container).tabs("resize");
    };
    $.fn.tabs = function (options, param) {
        if (typeof options == "string") {
            return $.fn.tabs.methods[options](this, param);
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "tabs");
            var opts;
            if (state) {
                opts = $.extend(state.options, options);
                state.options = opts;
            } else {
                $.data(this, "tabs", { options: $.extend({}, $.fn.tabs.defaults, $.fn.tabs.parseOptions(this), options), tabs: [], selectHis: [] });
                wrapTabs(this);
            }
            addTools(this);
            createSimpleContextMenu(this);  //简单右键菜单
            setProperties(this);
            setSize(this);
            bindEvents(this);
            doFirstSelect(this);
        });
    };
    $.fn.tabs.methods = {
        options: function (jq) {
            var cc = jq[0];
            var opts = $.data(cc, "tabs").options;
            var s = getSelectedTab(cc);
            opts.selected = s ? getTabIndex(cc, s) : -1;
            return opts;
        }, tabs: function (jq) {
            return $.data(jq[0], "tabs").tabs;
        }, resize: function (jq) {
            return jq.each(function () {
                setSize(this);
                setSelectedSize(this);
            });
        }, add: function (jq, options) {
            return jq.each(function () {
                addTab(this, options);
            });
        }, close: function (jq, which) {
            return jq.each(function () {
                closeTab(this, which);
            });
        }, getTabByOpt:function(jq,opt){
            return getTabByOpt(jq[0],opt);
        }, getTab: function (jq, which) {
            return getTab(jq[0], which);
        }, getTabIndex: function (jq, tab) {
            return getTabIndex(jq[0], tab);
        }, getSelected: function (jq) {
            return getSelectedTab(jq[0]);
        }, select: function (jq, which) {
            return jq.each(function () {
                selectTab(this, which);
            });
        }, unselect: function (jq, which) {
            return jq.each(function () {
                unselectTab(this, which);
            });
        }, exists: function (jq, which) {
            return exists(jq[0], which);
        }, update: function (jq, options) {
            return jq.each(function () {
                updateTab(this, options);
            });
	    },updateOpt:function(jq,options){
	        return jq.each(function(){
                updateTabOpt(this, options);
            });
        }, enableTab: function (jq, which) {
            return jq.each(function () {
                $(this).tabs("getTab", which).panel("options").tab.removeClass("tabs-disabled");
            });
        }, disableTab: function (jq, which) {
            return jq.each(function () {
                $(this).tabs("getTab", which).panel("options").tab.addClass("tabs-disabled");
            });
        }, showHeader: function (jq) {
            return jq.each(function () {
                showHeader(this, true);
            });
        }, hideHeader: function (jq) {
            return jq.each(function () {
                showHeader(this, false);
            });
        }, scrollBy: function (jq, deltaX) {
            return jq.each(function () {
                var opts = $(this).tabs("options");
                var wrap = $(this).find(">div.tabs-header>div.tabs-wrap");
                var pos = Math.min(wrap._scrollLeft() + deltaX, getMaxScrollWidth());
                wrap.animate({ scrollLeft: pos }, opts.scrollDuration);
                function getMaxScrollWidth() {
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
    $.fn.tabs.parseOptions = function (target) {
        return $.extend({}, $.parser.parseOptions(target, ["width", "height", "tools", "toolPosition", "tabPosition", { fit: "boolean", border: "boolean", plain: "boolean", headerWidth: "number", tabWidth: "number", tabHeight: "number", selected: "number", showHeader: "boolean" }]));
    };
    /*单独引入tabs.js时,页签头高度不对,所以tabHeight高度27修改成36。hisui.js中也有写*/
    $.fn.tabs.defaults = {
        width: "auto", height: "auto", headerWidth: 150, tabWidth: "auto", tabHeight: 36, selected: 0, showHeader: true, plain: false, fit: false, border: true, tools: null, toolPosition: "right", tabPosition: "top", scrollIncrement: 100, scrollDuration: 400, onLoad: function (panel) {
        }, onSelect: function (title, index) {
        }, onUnselect: function (title, index) {
        }, onBeforeClose: function (title, index) {
        }, onClose: function (title, index) {
        }, onAdd: function (title, index) {
        }, onUpdate: function (title, index) {
        }, onContextMenu: function (e, title, index) {
        },simpleContextMenu:false  //是否显示简单右键菜单
    };
})(jQuery);