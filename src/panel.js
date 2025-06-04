(function ($) {
    $.fn._remove = function () {
        return this.each(function () {
            $(this).remove();
            try {
                this.outerHTML = "";
            }
            catch (err) {
            }
        });
    };
    function _1e2(node) {
        node._remove();
    };
    function GetCurrentStrWidth(text, font) {
        var currentObj = $('<span></span>').hide().appendTo(document.body);
        $(currentObj).html(text).css('font', font);
        var width = currentObj.width();
        currentObj.remove();
        return width;
    }
    /**
     * 处理title内容，如果内容长度超出面板宽度，显示省略号且悬浮提示；否则正常显示。
     * 考虑setTitle及拖动面板宽度
     * @param {jQuery} pheader 
     */
    function _ellipsizeTitle(_pheader){
        var panelTitleFontSize = $.hisui.getStyleCodeConfigValue('panelTitleFontSize');
        var titleContentWidth = parseInt(GetCurrentStrWidth(_pheader.find(".panel-title").html(),'normal '+panelTitleFontSize+'px "Microsoft Yahei", verdana, helvetica, arial, sans-serif'));
        if (_pheader.length>0){ 
            var titleShowWidth = _pheader.find(".panel-tool").offset().left - _pheader.find(".panel-title").offset().left-16; // 40是文字右侧留白
            //console.log(_pheader.find(".panel-title").text()+",titleContentWidth="+titleContentWidth+",titleShowWidth"+titleShowWidth);
            if (titleContentWidth>titleShowWidth && titleShowWidth>30){ // 显示区域大于30时，才是展开状态。
                _pheader.find(".panel-title").width(titleShowWidth);
                _pheader.tooltip({
                    content:'',
                    style:null,
                    position:'bottom',
                    tipWidth:Math.max($(_pheader).width()-40,100),
                    onShow:function(){
                        var content = $(this).children('.panel-title').html().trim();
                        if(content==''){
                            return $(this).tooltip('tip').hide();
                        }
                        $(this).tooltip('update',content.split(String.fromCharCode(10)).join('<br>')).tooltip('reposition');
                    }
                });
            }else{
                _pheader.children(".panel-title").width('auto');
                if (_pheader.hasClass('tooltip-f')){
                    _pheader.tooltip('destroy');
                }
            }
        }
    }
    // panel.resize
    function _1e3(_1e4, _1e5) {
        //$(this).lookup('panel').panel('resize',{width:1000});
        var _t = $(_1e4);
        if (_t.attr('id')==$.hisui.globalContainerId) {
            _t.css(_1e5);
            $.hisui.fixPanelTLWH();
            return ;
        }
        var opts = $.data(_1e4, "panel").options;
        var _1e6 = $.data(_1e4, "panel").panel;
        var _pheader = _1e6.children("div.panel-header");
        var _pbody = _1e6.children("div.panel-body");
        if (_1e5) {
            $.extend(opts, { width: _1e5.width, height: _1e5.height, left: _1e5.left, top: _1e5.top });
        }
        //opts['width'] = $.parser.parseValue("width", opts['width'], $(_1e6).parent());
        opts.fit ? $.extend(opts, _1e6._fit()) : _1e6._fit(false);
        _1e6.css({ left: opts.left, top: opts.top });
        if (!isNaN(opts.width)) {
            _1e6._outerWidth(opts.width);
        } else {
            _1e6.width("auto");
        }
        _pheader.add(_pbody)._outerWidth(_1e6.width());
        //wanghc card--
        var mustCalcPanelHeaderCardTitleWidth = $.hisui.getStyleCodeConfigValue('mustCalcPanelHeaderCardTitleWidth');
        if (null!=opts.headerCls && "undefined"!=typeof opts.headerCls && opts.headerCls.indexOf("panel-header-card") > -1 && mustCalcPanelHeaderCardTitleWidth) { /*炫彩UI才设置width*/
            if (null!=opts.titleWidth && "undefined"!=typeof opts.titleWidth) {
                _pheader.width(opts.titleWidth);
            }else{
                var headText = _pheader.find(".panel-title").text();
                if (headText.length<=4){
                    _pheader.width(80);
                } else {
                    _pheader.width(40 + parseInt(GetCurrentStrWidth(headText,'normal 14px "Microsoft Yahei", verdana, helvetica, arial, sans-serif')));
                }
            }
        }
        _ellipsizeTitle(_pheader);        
        if (!isNaN(opts.height)) {
            _1e6._outerHeight(opts.height);
            _pbody._outerHeight(_1e6.height() - _pheader._outerHeight());
        } else {
            _pbody.height("auto");
        }
        _1e6.css("height", "");
        opts.onResize.apply(_1e4, [opts.width, opts.height]);
        /*wanghc 2019-11-10 增加each . 否则只触发find->[0]对应的事件*/
        $(_1e4).find(">div,>form>div").filter(":visible").each(function(){
            $(this).triggerHandler("_resize");
        });
        // $(_1e4).find(">div:visible,>form>div:visible").each(function(){
        //     $(this).triggerHandler("_resize");
        // });
    };
    function _1e9(_1ea, _1eb) {
        var opts = $.data(_1ea, "panel").options;
        var _1ec = $.data(_1ea, "panel").panel;
        if (_1eb) {
            if (_1eb.left != null) {
                opts.left = _1eb.left;
            }
            if (_1eb.top != null) {
                opts.top = _1eb.top;
            }
        }
        if(opts.left<0){opts.left = 0; }
        if(opts.top<0){opts.top = 0; }
        _1ec.css({ left: opts.left, top: opts.top });
        opts.onMove.apply(_1ea, [opts.left, opts.top]);
    };
    function _1ed(_1ee) {
        $(_1ee).addClass("panel-body");
        var _1ef = $("<div class=\"panel\"></div>").insertBefore(_1ee);
        _1ef[0].appendChild(_1ee);
        _1ef.bind("_resize", function () {
            var opts = $.data(_1ee, "panel").options;
            if (opts.fit == true) {
                _1e3(_1ee);
            }
            return false;
        });
        return _1ef;
    };
    function _1f0(_1f1) {
        var opts = $.data(_1f1, "panel").options;
        var _1f2 = $.data(_1f1, "panel").panel;
        if (opts.tools && typeof opts.tools == "string") {
            _1f2.find(">div.panel-header>div.panel-tool .panel-tool-a").appendTo(opts.tools);
        }
        _1e2(_1f2.children("div.panel-header"));
        if (opts.title && !opts.noheader) {
            if (opts.notTrans) {
                var _1f3 = $("<div class=\"panel-header\"><div class=\"panel-title\">" + opts.title + "</div></div>").prependTo(_1f2); // 2023-08-01
            } else {
                var _1f3 = $("<div class=\"panel-header\"><div class=\"panel-title\">" + $.hisui.getTrans(opts.title) + "</div></div>").prependTo(_1f2); //add trans 
            }            
            if (opts.iconCls) {
                _1f3.find(".panel-title").addClass("panel-with-icon");
                $("<div class=\"panel-icon\"></div>").addClass(opts.iconCls).appendTo(_1f3);
            }
            var tool = $("<div class=\"panel-tool\"></div>").appendTo(_1f3);
            tool.bind("click", function (e) {
                e.stopPropagation();
            });
            if (opts.tools) {
                if ($.isArray(opts.tools)) {
                    for (var i = 0; i < opts.tools.length; i++) {
                        var t = $("<a href=\"javascript:void(0)\"></a>").addClass(opts.tools[i].iconCls).appendTo(tool);
                        if (opts.tools[i].handler) {
                            t.bind("click", eval(opts.tools[i].handler));
                        }
                    }
                } else {
                    $(opts.tools).children().each(function () {
                        $(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(tool);
                    });
                }
            }
            if (opts.collapsible) {
                $("<a class=\"panel-tool-collapse\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function () {
                    if (opts.collapsed == true) {
                        _210(_1f1, true);
                    } else {
                        _205(_1f1, true);
                    }
                    return false;
                });
            }
            if (opts.minimizable) {
                $("<a class=\"panel-tool-min\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function () {
                    _216(_1f1);
                    return false;
                });
            }
            if (opts.maximizable) {
                $("<a class=\"panel-tool-max\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function () {
                    if (opts.maximized == true) {
                        _219(_1f1);
                    } else {
                        _204(_1f1);
                    }
                    return false;
                });
            }
            if (opts.closable) {
                $("<a class=\"panel-tool-close\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function () {
                    _1f4(_1f1);
                    return false;
                });
            }
            _1f2.children("div.panel-body").removeClass("panel-body-noheader");
        } else {
            _1f2.children("div.panel-body").addClass("panel-body-noheader");
        }
        var ocxFrame="";
        if (opts.isTopZindex){ //modify panel 使window,dialog,alert,confirm,prompt,progress都支持isTopZindex属性 by wanghc 2018-6-21 
            if (!!window.ActiveXObject || "ActiveXObject" in window) { /**Only IE*/
                ocxFrame = '<iframe style="position:absolute;z-index:-1;width:100%;height:100%;top:0;left:0;scrolling:no;" frameborder="0"></iframe>';
                _1f2.prepend(ocxFrame);
            }
        }
    };
    function _1f5(_1f6, _1f7) {
        var _1f8 = $.data(_1f6, "panel");
        var opts = _1f8.options;
        if (_1f9) {
            opts.queryParams = _1f7;
        }
        if (opts.href) {
            if (!_1f8.isLoaded || !opts.cache) {
                var _1f9 = $.extend({}, opts.queryParams);
                if (opts.onBeforeLoad.call(_1f6, _1f9) == false) {
                    return;
                }
                _1f8.isLoaded = false;
                _1fa(_1f6);
                if (opts.loadingMessage) {
                    $(_1f6).html($("<div class=\"panel-loading\"></div>").html(opts.loadingMessage));
                }
                opts.loader.call(_1f6, _1f9, function (data) {
                    _1fb(opts.extractor.call(_1f6, data));
                    opts.onLoad.apply(_1f6, arguments);
                    _1f8.isLoaded = true;
                }, function () {
                    opts.onLoadError.apply(_1f6, arguments);
                });
            }
        } else {
            if (opts.content) {
                if (!_1f8.isLoaded) {
                    _1fa(_1f6);
                    _1fb(opts.content);
                    _1f8.isLoaded = true;
                }
            }
        }
        function _1fb(_1fc) {
            $(_1f6).html(_1fc);
            $.parser.parse($(_1f6));
        };
    };
    function _1fa(_1fd) {
        var t = $(_1fd);
        t.find(".combo-f").each(function () {
            $(this).combo("destroy");
        });
        t.find(".m-btn").each(function () {
            $(this).menubutton("destroy");
        });
        t.find(".s-btn").each(function () {
            $(this).splitbutton("destroy");
        });
        t.find(".tooltip-f").each(function () {
            $(this).tooltip("destroy");
        });
        t.children("div").each(function () {
            $(this)._fit(false);
        });
    };
    function _1fe(_1ff) {
        $(_1ff).find("div.panel,div.accordion,div.tabs-container,div.layout").filter(":visible").each(function () {
            $(this).triggerHandler("_resize", [true]);
        });
    };
    function _200(_201, _202) {
        var opts = $.data(_201, "panel").options;
        var _203 = $.data(_201, "panel").panel;
        if (_202 != true) {
            if (opts.onBeforeOpen.call(_201) == false) {
                return;
            }
        }
        _203.show();
        opts.closed = false;
        opts.minimized = false;
        var tool = _203.children("div.panel-header").find("a.panel-tool-restore");
        if (tool.length) {
            opts.maximized = true;
        }
        if (opts.isTopZindex){windowNPAPITotal=200;$.hisui.findObjectDom(opts,window,true,_201);}
        opts.onOpen.call(_201);
        if (opts.maximized == true) {
            opts.maximized = false;
            _204(_201);
        }
        if (opts.collapsed == true) {
            opts.collapsed = false;
            _205(_201);
        }
        if (!opts.collapsed) {
            _1f5(_201);
            _1fe(_201);
        }
    };
    function _1f4(_206, _207) {
        var opts = $.data(_206, "panel").options;
        var _208 = $.data(_206, "panel").panel;
        if (_207 != true) {
            if (opts.onBeforeClose.call(_206) == false) {
                return;
            }
        }
        _208._fit(false);
        _208.hide();
        if (opts.isTopZindex){windowNPAPITotal=200;$.hisui.findObjectDom(opts,window,false,_206);}
        //如果是先【关闭病历】页签，上面方法不会清空标志，在此清空标志。如【诊疗与病历】双击切换病人
        $.data(_206,"changeIdStr",{NPAPIIdStr:""});
        opts.closed = true;
        opts.onClose.call(_206);
    };
    function _209(_20a, _20b) {
        var opts = $.data(_20a, "panel").options;
        var _20c = $.data(_20a, "panel").panel;
        if (_20b != true) {
            if (opts.onBeforeDestroy.call(_20a) == false) {
                return;
            }
        }
        _1fa(_20a);
        _1e2(_20c);
        opts.onDestroy.call(_20a);
    };
    function _205(_20d, _20e) {
        var opts = $.data(_20d, "panel").options;
        var _20f = $.data(_20d, "panel").panel;
        var body = _20f.children("div.panel-body");
        var tool = _20f.children("div.panel-header").find("a.panel-tool-collapse");
        if (opts.collapsed == true) {
            return;
        }
        body.stop(true, true);
        if (opts.onBeforeCollapse.call(_20d) == false) {
            return;
        }
        tool.addClass("panel-tool-expand");
        tool.closest('.panel').addClass("panel-status-collapse");
        if (_20e == true) {
            body.slideUp("normal", function () {
                opts.collapsed = true;
                opts.onCollapse.call(_20d);
            });
        } else {
            body.hide();
            opts.collapsed = true;
            opts.onCollapse.call(_20d);
        }
    };
    function _210(_211, _212) {
        var opts = $.data(_211, "panel").options;
        var _213 = $.data(_211, "panel").panel;
        var body = _213.children("div.panel-body");
        var tool = _213.children("div.panel-header").find("a.panel-tool-collapse");
        if (opts.collapsed == false) {
            return;
        }
        body.stop(true, true);
        if (opts.onBeforeExpand.call(_211) == false) {
            return;
        }
        tool.removeClass("panel-tool-expand");
        tool.closest('.panel').removeClass("panel-status-collapse");
        if (_212 == true) {
            body.slideDown("normal", function () {
                opts.collapsed = false;
                opts.onExpand.call(_211);
                _1f5(_211);
                _1fe(_211);
            });
        } else {
            body.show();
            opts.collapsed = false;
            opts.onExpand.call(_211);
            _1f5(_211);
            _1fe(_211);
        }
    };
    function _204(_214) {
        var opts = $.data(_214, "panel").options;
        var _215 = $.data(_214, "panel").panel;
        var tool = _215.children("div.panel-header").find("a.panel-tool-max");
        if (opts.maximized == true) {
            return;
        }
        tool.addClass("panel-tool-restore");
        if (!$.data(_214, "panel").original) {
            $.data(_214, "panel").original = { width: opts.width, height: opts.height, left: opts.left, top: opts.top, fit: opts.fit };
        }
        opts.left = 0;
        opts.top = 0;
        opts.fit = true;
        _1e3(_214);
        opts.minimized = false;
        opts.maximized = true;
        opts.onMaximize.call(_214);
    };
    function _216(_217) {
        var opts = $.data(_217, "panel").options;
        var _218 = $.data(_217, "panel").panel;
        _218._fit(false);
        _218.hide();
        opts.minimized = true;
        opts.maximized = false;
        opts.onMinimize.call(_217);
    };
    function _219(_21a) {
        var opts = $.data(_21a, "panel").options;
        var _21b = $.data(_21a, "panel").panel;
        var tool = _21b.children("div.panel-header").find("a.panel-tool-max");
        if (opts.maximized == false) {
            return;
        }
        _21b.show();
        tool.removeClass("panel-tool-restore");
        $.extend(opts, $.data(_21a, "panel").original);
        _1e3(_21a);
        opts.minimized = false;
        opts.maximized = false;
        $.data(_21a, "panel").original = null;
        opts.onRestore.call(_21a);
    };
    function _21c(_21d) {
        var opts = $.data(_21d, "panel").options;
        var _21e = $.data(_21d, "panel").panel;
        var _21f = $(_21d).panel("header");
        var body = $(_21d).panel("body");
        _21e.css(opts.style);
        _21e.addClass(opts.cls);
        if (opts.border) {
            _21f.removeClass("panel-header-noborder");
            body.removeClass("panel-body-noborder");
        } else { //没边框时,panel=height*0 ==> 见484行注释，导致tab下的无border的datagrid显示空白
            _21f.addClass("panel-header-noborder");
            body.addClass("panel-body-noborder");
        }
        _21f.addClass(opts.headerCls);
        _21f.parent().addClass(opts.headerCls+"-parent");
        body.addClass(opts.bodyCls);
        if (opts.id) {
            $(_21d).attr("id", opts.id);
        } else {
            $(_21d).attr("id", "");
        }
    };
    function _220(_221, _222) {
        $.data(_221, "panel").options.title = _222;
        $(_221).panel("header").find("div.panel-title").html(  $.data(_221, "panel").options.notTrans?_222:$.hisui.getTrans(_222)  ); //add trans //up20230906 judge notTrans
        _ellipsizeTitle($(_221).panel("header"));
    };
    var TO = false;
    var _223 = true;
    $(window).unbind(".panel").bind("resize.panel", function () {
        if (!_223) {
            return;
        }
        if (TO !== false) {
            clearTimeout(TO);
        }
        TO = setTimeout(function () {
            _223 = false;
            var _224 = $("body.layout");
            if (_224.length) {
                _224.layout("resize");
            } else {
                /*wanghc 2019-11-10 增加each. 否则只执行children->[0]的_resize*/
                /*宽度都大小0时才触发 :visible选择器*/
                $("body").children("div.panel,div.accordion,div.tabs-container,div.layout").filter(":visible").each(function(){
                    $(this).triggerHandler("_resize");
                });
            }
            _223 = true;
            TO = false;
        }, 200);
    });
    $.fn.panel = function (_225, _226) {
        if (typeof _225 == "string") {
            return $.fn.panel.methods[_225](this, _226);
        }
        _225 = _225 || {};
        return this.each(function () {
            var _227 = $.data(this, "panel");
            var opts;
            if (_227) {
                opts = $.extend(_227.options, _225);
                _227.isLoaded = false;
            } else {
                opts = $.extend({}, $.fn.panel.defaults, $.fn.panel.parseOptions(this), _225);
                $(this).attr("title", "");
                _227 = $.data(this, "panel", { options: opts, panel: _1ed(this), isLoaded: false });
            }
            _1f0(this);
            _21c(this);
            if (opts.doSize == true) {
                _227.panel.css("display", "block");
                _1e3(this);
            }
            if (opts.closed == true || opts.minimized == true) {
                _227.panel.hide();
            } else {
                _200(this);
            }
        });
    };
    $.fn.panel.methods = {
        options: function (jq) {
            return $.data(jq[0], "panel").options;
        }, panel: function (jq) {
            return $.data(jq[0], "panel").panel;
        }, header: function (jq) {
            return $.data(jq[0], "panel").panel.find(">div.panel-header");
        }, body: function (jq) {
            return $.data(jq[0], "panel").panel.find(">div.panel-body");
        }, setTitle: function (jq, _228) {
            return jq.each(function () {
                _220(this, _228);
            });
        }, open: function (jq, _229) {
            return jq.each(function () {
                _200(this, _229);
            });
        }, close: function (jq, _22a) {
            return jq.each(function () {
                _1f4(this, _22a);
            });
        }, destroy: function (jq, _22b) {
            return jq.each(function () {
                _209(this, _22b);
            });
        }, refresh: function (jq, href) {
            return jq.each(function () {
                var _22c = $.data(this, "panel");
                _22c.isLoaded = false;
                if (href) {
                    if (typeof href == "string") {
                        _22c.options.href = href;
                    } else {
                        _22c.options.queryParams = href;
                    }
                }
                _1f5(this);
            });
        }, resize: function (jq, _22d) {
            return jq.each(function () {
                _1e3(this, _22d);
            });
        }, move: function (jq, _22e) {
            return jq.each(function () {
                _1e9(this, _22e);
            });
        }, maximize: function (jq) {
            return jq.each(function () {
                _204(this);
            });
        }, minimize: function (jq) {
            return jq.each(function () {
                _216(this);
            });
        }, restore: function (jq) {
            return jq.each(function () {
                _219(this);
            });
        }, collapse: function (jq, _22f) {
            return jq.each(function () {
                _205(this, _22f);
            });
        }, expand: function (jq, _230) {
            return jq.each(function () {
                _210(this, _230);
            });
        }
    };
    $.fn.panel.parseOptions = function (_231) {
        var t = $(_231);
        return $.extend({}, $.parser.parseOptions(_231, ["id", "width", "height", "left", "top", "title","titleWidth", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href", "method", { cache: "boolean", fit: "boolean", border: "boolean", noheader: "boolean" }, { collapsible: "boolean", minimizable: "boolean", maximizable: "boolean" }, { closable: "boolean", collapsed: "boolean", minimized: "boolean", maximized: "boolean", closed: "boolean" }]), { loadingMessage: (t.attr("loadingMessage") != undefined ? t.attr("loadingMessage") : undefined) });
    };
    $.fn.panel.defaults = {
        isTopZindex:false, //by wanghc 2018-6-21
        id: null, title: null, iconCls: null, width: "auto", height: "auto", left: null, top: null, cls: null, headerCls: null, bodyCls: null, style: {}, href: null, cache: true, fit: false, border: true, doSize: true, noheader: false, content: null, collapsible: false, minimizable: false, maximizable: false, closable: false, collapsed: false, minimized: false, maximized: false, closed: false, tools: null, queryParams: {}, method: "get", href: null, loadingMessage: "Loading...", loader: function (_232, _233, _234) {
            var opts = $(this).panel("options");
            if (!opts.href) {
                return false;
            }
            $.ajax({
                type: opts.method, url: opts.href, cache: false, data: _232, dataType: "html", success: function (data) {
                    _233(data);
                }, error: function () {
                    _234.apply(this, arguments);
                }
            });
        }, extractor: function (data) {
            var _235 = /<body[^>]*>((.|[\n\r])*)<\/body>/im;
            var _236 = _235.exec(data);
            if (_236) {
                return _236[1];
            } else {
                return data;
            }
        }, onBeforeLoad: function (_237) {
        }, onLoad: function () {
        }, onLoadError: function () {
        }, onBeforeOpen: function () {
        }, onOpen: function () {
        }, onBeforeClose: function () {
        }, onClose: function () {
        }, onBeforeDestroy: function () {
        }, onDestroy: function () {
        }, onResize: function (_238, _239) {
        }, onMove: function (left, top) {
        }, onMaximize: function () {
        }, onRestore: function () {
        }, onMinimize: function () {
        }, onBeforeCollapse: function () {
        }, onBeforeExpand: function () {
        }, onCollapse: function () {
        }, onExpand: function () {
        },notTrans:false /*默认自动翻译*/
    };
})(jQuery);