(function ($) {
    function show(el, type, _279, _27a) {
        var win = $(el).window("window");
        if (!win) {
            return;
        }
        switch (type) {
            case null:
                win.show();
                break;
            case "slide":
                win.slideDown(_279);
                break;
            case "fade":
                win.fadeIn(_279);
                break;
            case "show":
                win.show(_279);
                break;
        }
        var _27b = null;
        if (_27a > 0) {
            _27b = setTimeout(function () {
                hide(el, type, _279);
            }, _27a);
        }
        win.hover(function () {
            if (_27b) {
                clearTimeout(_27b);
            }
        }, function () {
            if (_27a > 0) {
                _27b = setTimeout(function () {
                    hide(el, type, _279);
                }, _27a);
            }
        });
    };
    function hide(el, type, _27c) {
        if (el.locked == true) {
            return;
        }
        el.locked = true;
        var win = $(el).window("window");
        if (!win) {
            return;
        }
        switch (type) {
            case null:
                win.hide();
                break;
            case "slide":
                win.slideUp(_27c);
                break;
            case "fade":
                win.fadeOut(_27c);
                break;
            case "show":
                win.hide(_27c);
                break;
        }
        setTimeout(function () {
            $(el).window("destroy");
        }, _27c);
    };
    function _27d(_27e) {
        var opts = $.extend({}, $.fn.window.defaults, {
            collapsible: false, minimizable: false, maximizable: false, shadow: false, draggable: false, resizable: false, closed: true, style: { left: "", top: "", right: 0, zIndex: $.fn.window.defaults.zIndex++, bottom: -document.body.scrollTop - document.documentElement.scrollTop }, onBeforeOpen: function () {
                show(this, opts.showType, opts.showSpeed, opts.timeout);
                return false;
            }, onBeforeClose: function () {
                hide(this, opts.showType, opts.showSpeed);
                return false;
            }
        }, { title: "", width: 250, height: 100, showType: "slide", showSpeed: 600, msg: "", timeout: 4000 }, _27e);
        opts.style.zIndex = $.fn.window.defaults.zIndex++;
        var win = $("<div class=\"messager-body\"></div>").html($.hisui.getTrans(opts.msg)).appendTo("body"); //add trans
        win.window(opts);
        win.window("window").css(opts.style);
        win.window("open");
        return win;
    };
    
    function showWinByOptions(options) {
        var win = $("<div class=\"messager-body\"></div>").appendTo("body");
        win.append(options.content);
        var bbuttons = options.bbuttons;
        if (bbuttons) {
            var tb = $("<div class=\"messager-button\"></div>").appendTo(win);
            // $.messager.defaults.ok/cancel会取翻译或从中修改
            // 会导致事件不运行
            var mybuttonIndex = 0; /* 第一个按钮marginleft为0,其它的为10px */
            for (var _283 in bbuttons) {
                $("<a></a>").attr("href", "javascript:void(0)").text($.messager.defaults[_283]).css("margin-left",mybuttonIndex==0?0:10).bind("click", eval(bbuttons[_283])).appendTo(tb).linkbutton();
                mybuttonIndex++;
            }
            //add space and esc key event handler add by wanghc  2018-10-09
            win.on('keydown', function (e) {
                if (e.target && e.target.nodeName.toUpperCase()=='INPUT') {
                    return;
                }
                if (tb.children().length > 1) { //多个按钮可用 <- 与 -> 左右按钮切换
                    var $cur = tb.children(".l-btn-focus");
                    if ($cur.length > 0) {  //当前有focus
                        if (e.which==37){ //left
                            e.stopPropagation();
                            if ($cur.prev().length > 0) {
                                $cur.trigger('blur');
                                $cur.prev().trigger('focus');
                            }
                        }
                        if (e.which == 39) { //right
                            e.stopPropagation();
                            if ($cur.next().length > 0) {
                                $cur.trigger('blur');
                                $cur.next().trigger('focus');
                            }
                        }
                    }
                }
                if(e.which==32 || e.which==13){
                    e.stopPropagation();
                    if (tb.children(".l-btn-focus").length>0){
                        tb.children(".l-btn-focus").trigger('click');
                    }else{
                        bbuttons['ok'](e);
                    }
                    return false;
                }
                if(bbuttons['cancel']){ 
                    if(e.which==27){ //Esc
                        e.stopPropagation();
                        bbuttons['cancel'](e);
                        return false;
                    }
                }
            });
            //end 2018-10-09
        }
        win.window({
            isTopZindex:true, //wanghc
            closable:false, //neer---不显示关闭按钮--事件监听问题
            title: options.title, noheader: (options.title ? false : true), width: options.width||300, height: "auto", modal: true, collapsible: false, minimizable: false, maximizable: false, resizable: false, onClose: function () {
                setTimeout(function () {
                    win.window("destroy");
                }, 100);
            }
        });
        win.window("window").addClass("messager-window");
        win.children("div.messager-button").children("a:first").focus();
        return win;
    };
    function _27f(_280, _281, bbuttons) {
        var win = $("<div class=\"messager-body\"></div>").appendTo("body");
        win.append(_281);
        if (bbuttons) {
            var tb = $("<div class=\"messager-button\"></div>").appendTo(win);
            // $.messager.defaults.ok/cancel会取翻译或从中修改
            // 会导致事件不运行
            var mybuttonIndex = 0; /* 第一个按钮marginleft为0,其它的为10px */
            for (var _283 in bbuttons) {
                $("<a></a>").attr("href", "javascript:void(0)").text($.messager.defaults[_283]).css("margin-left",mybuttonIndex==0?0:10).bind("click", eval(bbuttons[_283])).appendTo(tb).linkbutton();
                mybuttonIndex++;
            }
            //add space and esc key event handler add by wanghc  2018-10-09
            win.on('keydown', function (e) {
                if (e.target && e.target.nodeName.toUpperCase()=='INPUT') {
                    return;
                }
                if (tb.children().length > 1) { //多个按钮可用 <- 与 -> 左右按钮切换
                    var $cur = tb.children(".l-btn-focus");
                    if ($cur.length > 0) {  //当前有focus
                        if (e.which==37){ //left
                            e.stopPropagation();
                            if ($cur.prev().length > 0) {
                                $cur.trigger('blur');
                                $cur.prev().trigger('focus');
                            }
                        }
                        if (e.which == 39) { //right
                            e.stopPropagation();
                            if ($cur.next().length > 0) {
                                $cur.trigger('blur');
                                $cur.next().trigger('focus');
                            }
                        }
                    }
                }
                if(e.which==32 || e.which==13){
                    e.stopPropagation();
                    if (tb.children(".l-btn-focus").length>0){
                        tb.children(".l-btn-focus").trigger('click');
                    }else{
                        bbuttons['ok'](e);
                    }
                    return false;
                }
                if(bbuttons['cancel']){ 
                    if(e.which==27){ //Esc
                        e.stopPropagation();
                        bbuttons['cancel'](e);
                        return false;
                    }
                }
            });
            //end 2018-10-09
        }
        win.window({
            isTopZindex:true, //wanghc
            closable:false, //neer---不显示关闭按钮--事件监听问题
            title: _280, noheader: (_280 ? false : true), width: 300, height: "auto", modal: true, collapsible: false, minimizable: false, maximizable: false, resizable: false, onClose: function () {
                setTimeout(function () {
                    win.window("destroy");
                }, 100);
            }
        });
        win.window("window").addClass("messager-window");
        win.children("div.messager-button").children("a:first").focus();
        return win;
    };
    $.messager = {
        show: function (_284) {
            return _27d(_284);
        }, alertSrcMsg: function (_285, msg, icon, fn) {
            var opts = typeof _285 == "object" ? _285 : {
                title:_285,msg:msg,icon:icon,fn:fn
            }
            var cls = opts.icon ? "messager-icon messager-" + opts.icon : "";
            opts = $.extend({}, $.messager.defaults, {                
                /* 对象文字 add margin-left:42px;*/
                content: "<div class=\"" + cls + "\"></div>" + "<div style=\"margin-left:42px;\">" + opts.msg + "</div>" + "<div style=\"clear:both;\"/>",
                bbuttons: {
                    'ok':function (e) {
                        if (e && ("undefined"!=typeof e.clientY && (e.clientY<0))) return false;
                        if (e && ("undefined"!=typeof e.clientX && (e.clientX<0))) return false;
                        win.window("close");
                        if (opts.fn) {
                            opts.fn();
                            return false;
                        }
                    }
                }
            }, opts);
            var win = showWinByOptions(opts);
            // var win = _27f(_285, _286, _287);
            return win;
        }, alert: function (_285, msg, icon, fn) {
            var opts = typeof _285 == "object" ? _285 : {
                title:_285,msg:msg,icon:icon,fn:fn
            }
            opts.msg = $.hisui.getTrans(opts.msg);
            return $.messager.alertSrcMsg(opts);
        }, confirmSrcMsg: function (_288, msg, fn) {
            var _289 = "<div class=\"messager-icon messager-question\"></div>" + "<div style=\"margin-left:42px;\">" +msg+ "</div>" + "<div style=\"clear:both;\"/>"; //add trans
            var _28a = {};
            _28a['ok'] = function (e) {
                // 2020-09-15 于传忠提供bug-demo及解决
                // 解决IE下输入框值改变时弹出confirm，且回车focus下一输入框情况下，如果回车自动触发ok按钮问题
                // 回车--光标跳到下一框--触发change--弹出confirm---自动click-ok
                // if (win.window('panel').is(":visible")) IE下此时panel是visible的
                if (e && ("undefined"!=typeof e.clientY && (e.clientY<0))) return false;
                if (e && ("undefined"!=typeof e.clientX && (e.clientX<0))) return false;
                win.window("close");
                if (fn) {
                    fn(true);
                    return false;
                }
            };
            _28a['cancel'] = function () {
                win.window("close");
                if (fn) {
                    fn(false);
                    return false;
                }
            };
            var win = _27f(_288, _289, _28a);
            return win;
        }, confirm: function (title, msg, fn) {
            return $.messager.confirmSrcMsg(title, $.hisui.getTrans(msg), fn);
        }, confirm3SrcMsg: function (title, msg, fn) {
            var _289 = "<div class=\"messager-icon messager-question\"></div>" + "<div style=\"margin-left:42px;\">" + msg + "</div>" + "<div style=\"clear:both;\"/>"; //add trans
            var _28a = {};
            _28a['ok'] = function (e) {
                if (e && ("undefined"!=typeof e.clientY && (e.clientY<0))) return false;
                if (e && ("undefined"!=typeof e.clientX && (e.clientX<0))) return false;
                win.window("close");
                if (fn) {
                    fn(true);
                    return false;
                }
            };
            _28a['no'] = function () {
                win.window("close");
                if (fn) {
                    fn(false);
                    return false;
                }
            };
            _28a['cancel'] = function () {
                win.window("close");
                if (fn) {
                    fn(undefined);
                    return false;
                }
            };
            var win = _27f(title, _289, _28a);
            return win;
        }, confirm3: function (title, msg, fn) {
            return $.messager.confirm3SrcMsg(title, $.hisui.getTrans(msg), fn);
        }, promptSrcMsg: function (_28b, msg, fn) {
            var _28c = "<div class=\"messager-icon messager-question\"></div>" + "<div style=\"margin-left:42px;\">" + msg + "</div>" + "<br/>" + "<div style=\"clear:both;\"/>" + "<div><input class=\"messager-input\" type=\"text\"/></div>"; //add trans
            var _28d = {};
            _28d['ok'] = function (e) {
                if (e && ("undefined"!=typeof e.clientY && (e.clientY<0))) return false;
                if (e && ("undefined"!=typeof e.clientX && (e.clientX<0))) return false;
                win.window("close");
                if (fn) {
                    fn($(".messager-input", win).val());
                    return false;
                }
            };
            _28d['cancel'] = function () {
                win.window("close");
                if (fn) {
                    fn();
                    return false;
                }
            };
            var win = _27f(_28b, _28c, _28d);
            win.find("input.messager-input").eq(0).focus();
            return win;
        }, prompt: function(_28b, msg, fn){ 
            return $.messager.promptSrcMsg(_28b, $.hisui.getTrans(msg), fn);
        } ,progress: function (_28e) {
            var _28f = {
                bar: function () {
                    return $("body>div.messager-window").find("div.messager-p-bar");
                }, close: function () {
                    var win = $("body>div.messager-window>div.messager-body:has(div.messager-progress)");
                    if (win.length) {
                        win.window("close");
                    }
                }
            };
            if (typeof _28e == "string") {
                var _290 = _28f[_28e];
                return _290();
            }
            var opts = $.extend({ title: "", msg: "", text: undefined, interval: 300 }, _28e || {});
            
            var _291 = "<div class=\"messager-progress\"><div class=\"messager-p-msg\"></div><div class=\"messager-p-bar\"></div></div>";
            var win = _27f(opts.title, _291, null);
            win.find("div.messager-p-msg").html($.hisui.getTrans(opts.msg));  //add trans
            var bar = win.find("div.messager-p-bar");
            bar.progressbar({ text: opts.text });
            /*win.window({
                closable: false, onClose: function () {
                    if (this.timer) {
                        clearInterval(this.timer);
                    }
                    $(this).window("destroy");
                }
            });*/
            /*会触发二次window,关闭只触发一次, 且Options不同导致在病历编辑npapi隐藏不显示*/
            win.window('options').onClose = function () {
                if (this.timer) {
                    clearInterval(this.timer);
                }
                $(this).window("destroy");
            };
            if (opts.interval) {
                win[0].timer = setInterval(function () {
                    var v = bar.progressbar("getValue");
                    v += 10;
                    if (v > 100) {
                        v = 0;
                    }
                    bar.progressbar("setValue", v);
                }, opts.interval);
            }
            return win;
        },popoverSrcMsg: function(opt){
            //default top center;
            // top:document.body.scrollTop+document.documentElement.scrollTop+10  modify by wanghc on 2018-10-18
            var defopt = {style:{top:'',left:''},
               msg:'',type:'error',timeout:3000,showSpeed:'fast',showType:'slide'};
            var o = $.extend({},defopt,opt);
            var html = '<div class="messager-popover '+o.type+'" style="display:none;">'
            +'<span class="messager-popover-icon '+o.type+'"/><span class="content">'+ o.msg +'</span>' //add trans
            if (o.timeout>5000) +'<span class="close"></span>'
            +'</div>';  
            
            var t = $(html).appendTo("body");
            if (o.style.left==''){
                o.style.left = document.body.clientWidth/2-(t.width()/2)
            }
            if (o.style.top==''){
                o.style.top = document.body.clientHeight/2-(t.height()/2)
            }
            t.css(o.style);
            switch (o.showType) {
                case null:
                    t.show();
                    break;
                case "slide":
                    t.slideDown(o.showSpeed);
                    break;
                case "fade":
                    t.fadeIn(o.showSpeed);
                    break;
                case "show":
                    t.show(o.showSpeed);
                    break;
            }
            t.find('.close').click(function(){
                t.remove();
            });
            if (o.timeout>0){
                var timeoutHandle =  setTimeout(function(){
                    switch (o.showType) {
                        case null:
                            t.hide();
                            break;
                        case "slide":
                            t.slideUp(o.showSpeed);
                            break;
                        case "fade":
                            t.fadeOut(o.showSpeed);
                            break;
                        case "show":
                            t.hide(o.showSpeed);
                            break;
                    }
                    setTimeout(function(){t.remove()},o.timeout);
                },o.timeout);
            }
        }, popover: function (opt) {
            opt.msg = $.hisui.getTrans(opt.msg);
            $.messager.popoverSrcMsg(opt);
        }
    };
    $.messager.defaults = { ok: "Ok", cancel: "Cancel" };
})(jQuery);