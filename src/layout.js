(function ($) {
    var _362 = false;


    function fixBodyPadding(ele){
        
        var $ele = $(ele);
        var state=$.data(ele, "layout");
        var opts=state.options;
        if($ele.tagName=="BODY"){
            // var paddingBottom = parseInt($ele.css("padding-bottom"));
            // if(paddingBottom>0){
            //     if($ele.find('.layout-body-fix-padding-proxy').length==0){
            //         $ele.append('<div class="layout-body-fix-padding-proxy" style="background-color:transparent;"></div>');
            //     }
            //     $ele.find('.layout-body-fix-padding-proxy').height(paddingBottom);
            // }else{
            //     $ele.find('.layout-body-fix-padding-proxy').remove();
            // }
        }else if($ele.parent()[0].tagName==="BODY" && opts.fit){
            var $par=$ele.parent();
            var paddingBottom = parseInt($par.css("padding-bottom"));
            if(paddingBottom>0){
                if($par.find('.layout-body-fix-padding-proxy').length==0){
                    $('<div class="layout-body-fix-padding-proxy" style="background-color:transparent;"></div>').insertAfter($ele);
                }
                $par.find('.layout-body-fix-padding-proxy').height(paddingBottom);
            }else{
                $par.find('.layout-body-fix-padding-proxy').remove();
            }

        }

    }

    // layout.resize
    function _363(_364) {
        var _365 = $.data(_364, "layout");
        var opts = _365.options;
        var _366 = _365.panels;
        var cc = $(_364);
        if (_364.tagName == "BODY") {
            cc._fit();
        } else {
            opts.fit ? cc.css(cc._fit()) : cc._fit(false);
        }

        //自身容器的padding
        var cpad={
            top:parseInt(cc.css("padding-top")),
            left:parseInt(cc.css("padding-left")),
            right:parseInt(cc.css("padding-right")),
            bottom:parseInt(cc.css("padding-bottom"))
        }

        var cpos = { top: (cpad.top>0?cpad.top:0), left: (cpad.left>0?cpad.left:0), width: cc.width(), height: cc.height() };
		/*在body内实现padding=10px的layout时,底部没有padding问题 by wanghc */
		if (_364.tagName !== "BODY"){
			var _364parent = $(_364).parent();
            // 如果body不是border-box,则减去padding
			if (_364parent[0].tagName==="BODY" && _364parent.css("box-sizing")!=="border-box"){
				cpos.height = cpos.height - parseInt(_364parent.css("padding-top")) - parseInt(_364parent.css("padding-bottom"));
			}
        }


        fixBodyPadding(_364);  //body上的边距 导致下面的元素本该显示不出来却显示出来了

        _resizeNorthSouth(_isPanelVisible(_366.expandNorth) ? _366.expandNorth : _366.north, "n");
        _resizeNorthSouth(_isPanelVisible(_366.expandSouth) ? _366.expandSouth : _366.south, "s");
        _resizeWestEast(_isPanelVisible(_366.expandEast) ? _366.expandEast : _366.east, "e");
        _resizeWestEast(_isPanelVisible(_366.expandWest) ? _366.expandWest : _366.west, "w");

        _366.center.panel("resize", cpos);
        resizeSubLayout(_366);
        function _36a(pp) {
            var opts = pp.panel("options");
            return Math.min(Math.max(opts.height, opts.minHeight), opts.maxHeight);
        };
        function _36b(pp) {
            var opts = pp.panel("options");
            return Math.min(Math.max(opts.width, opts.minWidth), opts.maxWidth);
        };
        function _resizeNorthSouth(pp, type) {
            if (!pp.length || !_isPanelVisible(pp)) {
                return;
            }
            var opts = pp.panel("options");
            var _36c = _36a(pp);
            //增加考虑layout容器padding
            pp.panel("resize", { width: cc.width(), height: _36c, left: (cpad.left>0?cpad.left:0), top: (type == "n" ? (cpad.top>0?cpad.top:0) : cc.height() - _36c + (cpad.top>0?cpad.top:0)) });
            cpos.height -= _36c;
            if (type == "n") {
                cpos.top += _36c;
                if (!opts.split && opts.border) {
                    cpos.top--;
                }
            }
            if (!opts.split && opts.border) {
                cpos.height++;
            }
        };
        function _resizeWestEast(pp, type) {
            if (!pp.length || !_isPanelVisible(pp)) {
                return;
            }
            var opts = pp.panel("options");
            var _36d = _36b(pp);
            //增加考虑layout容器padding
            pp.panel("resize", { width: _36d, height: cpos.height, left: (type == "e" ? cc.width() - _36d+(cpad.left>0?cpad.left:0) : (cpad.left>0?cpad.left:0)), top: cpos.top });
            cpos.width -= _36d;
            if (type == "w") {
                cpos.left += _36d;
                if (!opts.split && opts.border) {
                    cpos.left--;
                }
            }
            if (!opts.split && opts.border) {
                cpos.width++;
            }
        };
    };
    /*如果w,n,s,e包含layout也得再次触发resize,再例子layout-bug20191110.html*/
    function resizeSubLayout(myObj){
        var subLayoutTarget = "";
        if(myObj.north.hasClass("layout")){
            subLayoutTarget = myObj.north[0];
        }
        if(myObj.south.hasClass("layout")){
            subLayoutTarget = myObj.south[0];
        }
        if(myObj.east.hasClass("layout")){
            subLayoutTarget = myObj.east[0];
        }
        if(myObj.west.hasClass("layout")){
            subLayoutTarget = myObj.west[0];
        }
        if($.data(subLayoutTarget, "layout")){ //判断子也初始化过,才去reszie
            _363(subLayoutTarget);
        }
    }
    function init(_36e) {
        var cc = $(_36e);
        cc.addClass("layout");
        function _36f(cc) {
            cc.children("div").each(function () {
                var opts = $.fn.layout.parsePanelOptions(this);
                // 在options初始化赋值，发现HISStyleCode为undefined,在此再设置一次 [5467918]
                opts.collapsedSize = $.hisui.getStyleCodeConfigValue("collapsedSize");
                opts.collapsedHeight = $.hisui.getStyleCodeConfigValue("collapsedHeight");
                if ("north,south,east,west,center".indexOf(opts.region) >= 0) {
                    _371(_36e, opts, this);
                }
            });
        };
        cc.children("form").length ? _36f(cc.children("form")) : _36f(cc);
        cc.append("<div class=\"layout-split-proxy-h\"></div><div class=\"layout-split-proxy-v\"></div>");
        cc.bind("_resize", function (e, _370) {
            var opts = $.data(_36e, "layout").options;
            if (opts.fit == true || _370) {
                _363(_36e);
            }
            return false;
        });
    };
    function _371(_372, _373, el) {
        _373.region = _373.region || "center";
        var _374 = $.data(_372, "layout").panels;
        var cc = $(_372);
        var dir = _373.region;
        if (_374[dir].length) {
            return;
        }
        var pp = $(el);
        if (!pp.length) {
            pp = $("<div></div>").appendTo(cc);
        }
        var _375 = $.extend({}, $.fn.layout.paneldefaults, {
            width: (pp.length ? parseInt(pp[0].style.width) || pp.outerWidth() : "auto"), height: (pp.length ? parseInt(pp[0].style.height) || pp.outerHeight() : "auto"), doSize: false, collapsible: true, cls: ("layout-panel layout-panel-" + dir), bodyCls: "layout-body", onOpen: function () {
                var tool = $(this).panel("header").children("div.panel-tool");
                tool.children("a.panel-tool-collapse").hide();
                var _376 = { north: "up", south: "down", east: "right", west: "left" };
                if (!_376[dir]) {
                    return;
                }
                var _377 = "layout-button-" + _376[dir];
                var t = tool.children("a." + _377);
                if (!t.length) {
                    t = $("<a href=\"javascript:void(0)\"></a>").addClass(_377).appendTo(tool);
                    t.bind("click", { dir: dir }, function (e) {
                        _383(_372, e.data.dir);
                        return false;
                    });
                }
                $(this).panel("options").collapsible ? t.show() : t.hide();
            }
        }, _373);
        pp.panel(_375);
        _374[dir] = pp;
        if (pp.panel("options").isBigPadding || pp.panel("options").isNormalPadding){
            if (pp.panel("options").isBigPadding){
                pp.panel("panel").addClass("layout-big-split-" + dir);
            }
            if (pp.panel("options").isNormalPadding) {
                pp.panel("panel").addClass("layout-split-" + dir);
            }
        }        
        if (pp.panel("options").split) {
            var _378 = pp.panel("panel");
            _378.addClass("layout-split-" + dir);
            var _379 = "";
            if (dir == "north") {
                _379 = "s";
            }
            if (dir == "south") {
                _379 = "n";
            }
            if (dir == "east") {
                _379 = "w";
            }
            if (dir == "west") {
                _379 = "e";
            }
            _378.resizable($.extend({}, {
                handles: _379, onStartResize: function (e) {
                    _362 = true;
                    if (dir == "north" || dir == "south") {
                        var _37a = $(">div.layout-split-proxy-v", _372);
                    } else {
                        var _37a = $(">div.layout-split-proxy-h", _372);
                    }
                    var top = 0, left = 0, _37b = 0, _37c = 0;
                    var pos = { display: "block" };
                    if (dir == "north") {
                        pos.top = parseInt(_378.css("top")) + _378.outerHeight() - _37a.height();
                        pos.left = parseInt(_378.css("left"));
                        pos.width = _378.outerWidth();
                        pos.height = _37a.height();
                    } else {
                        if (dir == "south") {
                            pos.top = parseInt(_378.css("top"));
                            pos.left = parseInt(_378.css("left"));
                            pos.width = _378.outerWidth();
                            pos.height = _37a.height();
                        } else {
                            if (dir == "east") {
                                pos.top = parseInt(_378.css("top")) || 0;
                                pos.left = parseInt(_378.css("left")) || 0;
                                pos.width = _37a.width();
                                pos.height = _378.outerHeight();
                            } else {
                                if (dir == "west") {
                                    pos.top = parseInt(_378.css("top")) || 0;
                                    pos.left = _378.outerWidth() - _37a.width();
                                    pos.width = _37a.width();
                                    pos.height = _378.outerHeight();
                                }
                            }
                        }
                    }
                    _37a.css(pos);
                    $("<div class=\"layout-mask\"></div>").css({ left: 0, top: 0, width: cc.width(), height: cc.height() }).appendTo(cc);
                }, onResize: function (e) {
                    if (dir == "north" || dir == "south") {
                        var _37d = $(">div.layout-split-proxy-v", _372);
                        _37d.css("top", e.pageY - $(_372).offset().top - _37d.height() / 2);
                    } else {
                        var _37d = $(">div.layout-split-proxy-h", _372);
                        _37d.css("left", e.pageX - $(_372).offset().left - _37d.width() / 2);
                    }
                    return false;
                }, onStopResize: function (e) {
                    cc.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide();
                    pp.panel("resize", e.data);
                    _363(_372);
                    _362 = false;
                    cc.find(">div.layout-mask").remove();
                }
            }, _373));
        }
    };
    function _37e(_37f, _380) {
        var _381 = $.data(_37f, "layout").panels;
        if (_381[_380].length) {
            _381[_380].panel("destroy");
            _381[_380] = $();
            var _382 = "expand" + _380.substring(0, 1).toUpperCase() + _380.substring(1);
            if (_381[_382]) {
                _381[_382].panel("destroy");
                _381[_382] = undefined;
            }
        }
    };
    function _383(_384, _385, _386) {
        
        if (_386 == undefined) {
            _386 = "normal";
        }
        //add by wanghc 增加点击侧边收起块，展开侧边 2018-05-17
        var layoutObj = $.data(_384,"layout");
        var layoutPanels = layoutObj.panels;
        var opt = layoutObj.options;
        var p = layoutPanels[_385];
        var _388 = p.panel("options");
        if (_388.onBeforeCollapse.call(p) == false) {
            return;
        }
        var _389 = "expand" + _385.substring(0, 1).toUpperCase() + _385.substring(1);
        if (!layoutPanels[_389]) {
            layoutPanels[_389] = _38a(_385);
            layoutPanels[_389].panel("panel").bind("click", function () {
                if (opt.clickExpand){
                    _390(_384, _385);
                    return false;
                }else{ 
                    var _38b = _38c();
                    p.panel("expand", false).panel("open").panel("resize", _38b.collapse);
                    p.panel("panel").animate(_38b.expand, function () {
                        $(this).unbind(".layout").bind("mouseleave.layout", { region: _385 }, function (e) {
                            if (_362 == true) {
                                return;
                            }
                            _383(_384, e.data.region);
                        });
                    });
                    return false;
                }
            });
        }
        var _38d = _38c();
        if (!_isPanelVisible(layoutPanels[_389])) {
            layoutPanels.center.panel("resize", _38d.resizeC);
        }
        p.panel("panel").animate(_38d.collapse, _386, function () {
            p.panel("collapse", false).panel("close");
            layoutPanels[_389].panel("open").panel("resize", _38d.expandP);
            $(this).unbind(".layout");
        });
        function _38a(dir) {
            var icon, iconCls="";
            if (dir == "east") {
                icon = "layout-button-left";
            } else {
                if (dir == "west") {
                    icon = "layout-button-right";
                } else {
                    if (dir == "north") {
                        icon = "layout-button-down";
                        iconCls = _388.iconCls;
                    } else {
                        if (dir == "south") {
                            icon = "layout-button-up";
                            iconCls = _388.iconCls;
                        }
                    }
                }
            }
            var p_title="&nbsp;",p_content="";
            if (_388.title!="" && _388.showCollapsedTitle){
                if (dir == "east" || dir == "west") {
                    // 2023-02-14 收起后纵向显示增加翻译 [3202370] 。 panel的content内容是不会自动翻译的，所以手动在layout中翻译
                    p_content="<div class='"+_388.iconCls+"'></div>" + $.hisui.getTrans(_388.title).split("").join('</div><div>');
                    p_content='<div class="layout-expand-body-title"><div>'+p_content+'</div></div>';
                }else{
                    p_title=_388.title;
                }
            }

            var p = $("<div></div>").appendTo(_384);
            p.panel($.extend({}, $.fn.layout.paneldefaults, {
                iconCls:iconCls,
                cls: ("layout-expand layout-expand-" + dir), title: p_title,content:p_content,headerCls:_388.headerCls,bodyCls:_388.bodyCls, closed: true, minWidth: 0, minHeight: 0, doSize: false, tools: [{
                    iconCls: icon, handler: function () {
                        _390(_384, _385);
                        return false;
                    }
                }]
            }));
            p.panel("panel").hover(function () {
                $(this).addClass("layout-expand-over");
            }, function () {
                $(this).removeClass("layout-expand-over");
            });
            return p;
        };
        function _38c() {
            var cc = $(_384);
            var _38e = layoutPanels.center.panel("options");
            var _38f = _388.collapsedSize;
            var cpad={ //自身容器的padding  修正折叠时的位置问题
                top:parseInt(cc.css("padding-top")),
                left:parseInt(cc.css("padding-left")),
                right:parseInt(cc.css("padding-right")),
                bottom:parseInt(cc.css("padding-bottom"))
            }

            if (_385 == "east") {
                var ww = _38e.width + _388.width - _38f;
                if (_388.split || !_388.border) {
                    ww++;
                }
                return { resizeC: { width: ww }, expand: { left: cc.width() - _388.width + (cpad.left>0?cpad.left:0) }, expandP: { top: _38e.top, left: cc.width() - _38f + (cpad.left>0?cpad.left:0), width: _38f, height: _38e.height }, collapse: { left: cc.width(), top: _38e.top, height: _38e.height } };
            } else {
                if (_385 == "west") {
                    var ww = _38e.width + _388.width - _38f;
                    if (_388.split || !_388.border) {
                        ww++;
                    }
                    return { resizeC: { width: ww, left: _38f - 1 + (cpad.left>0?cpad.left:0) }, expand: { left: 0 + (cpad.left>0?cpad.left:0)}, expandP: { left: 0 + (cpad.left>0?cpad.left:0), top: _38e.top, width: _38f, height: _38e.height }, collapse: { left: -_388.width, top: _38e.top, height: _38e.height } };
                } else {
                    if (_385 == "north") {
                        _38f=_388.collapsedHeight ;  //cryze 2018-9-18 
                        var hh = _38e.height;
                        if (!_isPanelVisible(layoutPanels.expandNorth)) {
                            hh += _388.height - _38f + ((_388.split || !_388.border) ? 1 : 0);
                        }
                        layoutPanels.east.add(layoutPanels.west).add(layoutPanels.expandEast).add(layoutPanels.expandWest).panel("resize", { top: _38f - 1 + (cpad.top>0?cpad.top:0), height: hh });
                        return { resizeC: { top: _38f - 1 + (cpad.top>0?cpad.top:0), height: hh }, expand: { top: 0 + (cpad.top>0?cpad.top:0) }, expandP: { top: 0 + (cpad.top>0?cpad.top:0), left: 0 + (cpad.left>0?cpad.left:0), width: cc.width(), height: _38f }, collapse: { top: -_388.height, width: cc.width() } };
                    } else {
                        if (_385 == "south") {
                            _38f=_388.collapsedHeight ;  //cryze 2018-9-18 
                            var hh = _38e.height;
                            if (!_isPanelVisible(layoutPanels.expandSouth)) {
                                hh += _388.height - _38f + ((_388.split || !_388.border) ? 1 : 0);
                            }
                            layoutPanels.east.add(layoutPanels.west).add(layoutPanels.expandEast).add(layoutPanels.expandWest).panel("resize", { height: hh });
                            return { resizeC: { height: hh }, expand: { top: cc.height() - _388.height + (cpad.top>0?cpad.top:0) }, expandP: { top: cc.height() - _38f + (cpad.top>0?cpad.top:0), left: 0 + (cpad.left>0?cpad.left:0), width: cc.width(), height: _38f }, collapse: { top: cc.height(), width: cc.width() } };
                        }
                    }
                }
            }
        };
    };
    function _390(_391, _392) {
        var _393 = $.data(_391, "layout").panels;
        var p = _393[_392];
        var _394 = p.panel("options");
        if (_394.onBeforeExpand.call(p) == false) {
            return;
        }
        var _395 = _396();
        var _397 = "expand" + _392.substring(0, 1).toUpperCase() + _392.substring(1);
        if (_393[_397]) {
            _393[_397].panel("close");
            p.panel("panel").stop(true, true);
            p.panel("expand", false).panel("open").panel("resize", _395.collapse);
            p.panel("panel").animate(_395.expand, function () {
                _363(_391);
            });
        }
        function _396() {
            var cc = $(_391);
            var _398 = _393.center.panel("options");
            if (_392 == "east" && _393.expandEast) {
                return { collapse: { left: cc.width(), top: _398.top, height: _398.height }, expand: { left: cc.width() - _393["east"].panel("options").width } };
            } else {
                if (_392 == "west" && _393.expandWest) {
                    return { collapse: { left: -_393["west"].panel("options").width, top: _398.top, height: _398.height }, expand: { left: 0 } };
                } else {
                    if (_392 == "north" && _393.expandNorth) {
                        return { collapse: { top: -_393["north"].panel("options").height, width: cc.width() }, expand: { top: 0 } };
                    } else {
                        if (_392 == "south" && _393.expandSouth) {
                            return { collapse: { top: cc.height(), width: cc.width() }, expand: { top: cc.height() - _393["south"].panel("options").height } };
                        }
                    }
                }
            }
        };
    };
    function _isPanelVisible(pp) {
        if (!pp) {
            return false;
        }
        if (pp.length) {
            return pp.panel("panel").is(":visible");
        } else {
            return false;
        }
    };
    function _399(_39a) {
        var _39b = $.data(_39a, "layout").panels;
        if (_39b.east.length && _39b.east.panel("options").collapsed) {
            _383(_39a, "east", 0);
        }
        if (_39b.west.length && _39b.west.panel("options").collapsed) {
            _383(_39a, "west", 0);
        }
        if (_39b.north.length && _39b.north.panel("options").collapsed) {
            _383(_39a, "north", 0);
        }
        if (_39b.south.length && _39b.south.panel("options").collapsed) {
            _383(_39a, "south", 0);
        }
    };
    $.fn.layout = function (_39c, _39d) {
        if (typeof _39c == "string") {
            return $.fn.layout.methods[_39c](this, _39d);
        }
        _39c = _39c || {};
        return this.each(function () {
            var _39e = $.data(this, "layout");
            if (_39e) {
                $.extend(_39e.options, _39c);
            } else {
                var opts = $.extend({}, $.fn.layout.defaults, $.fn.layout.parseOptions(this), _39c);
                $.data(this, "layout", { options: opts, panels: { center: $(), north: $(), south: $(), east: $(), west: $() } });
                init(this);
            }
            _363(this);
            _399(this);
        });
    };
    $.fn.layout.methods = {
        resize: function (jq) {
            return jq.each(function () {
                _363(this);
            });
        }, panel: function (jq, _39f) {
            return $.data(jq[0], "layout").panels[_39f];
        }, collapse: function (jq, _3a0) {
            return jq.each(function () {
                _383(this, _3a0);
            });
        }, expand: function (jq, _3a1) {
            return jq.each(function () {
                _390(this, _3a1);
            });
        }, add: function (jq, _3a2) {
            return jq.each(function () {
                _371(this, _3a2);
                _363(this);
                if ($(this).layout("panel", _3a2.region).panel("options").collapsed) {
                    _383(this, _3a2.region, 0);
                }
            });
        }, remove: function (jq, _3a3) {
            return jq.each(function () {
                _37e(this, _3a3);
                _363(this);
            });
        }
    };
    $.fn.layout.parseOptions = function (_3a4) {
        return $.extend({}, $.parser.parseOptions(_3a4, [{ fit: "boolean" }]));
    };
    //add by wanghc 增加点击侧边收起块，展开侧边 2018-05-17
    $.fn.layout.defaults = { fit: false,clickExpand:false };
    $.fn.layout.parsePanelOptions = function (_3a5) {
        var t = $(_3a5);
        return $.extend({}, $.fn.panel.parseOptions(_3a5), $.parser.parseOptions(_3a5, ["region", { split: "boolean",showCollapsedTitle:'boolean', collpasedSize: "number",collapsedHeight:'number', minWidth: "number", minHeight: "number", maxWidth: "number", maxHeight: "number" }]));
    };
    // cryze 2018-9-18 原collapsedSize并不适用于 noth south的折叠高度   ，故新增collapsedHeight表示noth south的折叠高度
    // cryze 2018-9-18 增加 showCollapsedTitle ，控制是否在折叠的时候显示标题
    $.fn.layout.paneldefaults = $.extend({}, $.fn.panel.defaults, { region: null,showCollapsedTitle:false, split: false, 
        collapsedSize: $.hisui.getStyleCodeConfigValue("collapsedSize"),collapsedHeight: $.hisui.getStyleCodeConfigValue("collapsedHeight"), minWidth: 10, minHeight: 10, maxWidth: 10000, maxHeight: 10000,
        isNormalPadding:false,
        isBigPadding:false
     });
})(jQuery);