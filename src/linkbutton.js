(function ($) {
    function createButton(target) {
        var opts = $.data(target, "linkbutton").options;
        var t = $(target).empty();
        t.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected");
        t.removeClass("l-btn-small l-btn-medium l-btn-large").addClass("l-btn-" + opts.size);
        if (opts.plain) {
            t.addClass("l-btn-plain");
        }
        if (opts.selected) {
            t.addClass(opts.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected");
        }
        t.attr("group", opts.group || "");
        t.attr("id", opts.id || "");
        // 点击原事件
        function _clickLinkButton(t){
            var opts = $(this).linkbutton('options');
            if (!opts.disabled) {
                if (opts.toggle) {
                    if (opts.selected) {
                        $(this).linkbutton("unselect");
                    } else {
                        $(this).linkbutton("select");
                    }
                }
                opts.onClick.call(this);
            }
        }
        // 立即执行事件, 但下一次点击只能在clickWaitingTimems毫秒后
        opts.debouncedClickFun = $.hisui.debounce(_clickLinkButton,parseInt(opts.clickWaitingTime),true);
        var inner = $("<span class=\"l-btn-left\"></span>").appendTo(t);
        if (opts.text) {
            if (opts.notTrans) {
                $("<span class=\"l-btn-text\"></span>").html(opts.text).appendTo(inner); // 20230801 增加不自动翻译配置项  
            } else {
                $("<span class=\"l-btn-text\"></span>").html($.hisui.getTrans(opts.text)).appendTo(inner); //add trans    
            }
            
        } else {
            $("<span class=\"l-btn-text l-btn-empty\">&nbsp;</span>").appendTo(inner);
        }
        if (opts.iconImg){
             //wanghc  add iconImg
            $("<span class=\"l-btn-icon\" style=\"background-image:url('"+opts.iconImg+"');background-position:center;background-repeat:no-repeat;\">&nbsp;</span>").appendTo(inner);
            inner.addClass("l-btn-icon-" + opts.iconAlign);
        }else if (opts.iconCls) {
            $("<span class=\"l-btn-icon\">&nbsp;</span>").addClass(opts.iconCls).appendTo(inner);
            inner.addClass("l-btn-icon-" + opts.iconAlign);
        }
        t.unbind(".linkbutton").bind("focus.linkbutton", function () {
            if (!opts.disabled) {
                $(this).addClass("l-btn-focus");
            }
        }).bind("blur.linkbutton", function () {
            $(this).removeClass("l-btn-focus");
        }).bind("click.linkbutton", function () {
            _operationStart(target);
            // 立即调用
            opts.debouncedClickFun.call(this,target);
            //return false; //不要阻止 cryze 2018-4-10  
            //cryze 2018-4-19 不阻止的话若a href="#" 会有跳转行为   判断是否是filebox的button时不阻止  不是 改为原样 还是阻止吧 
            if (!t.hasClass('filebox-button')) return false;
        });
        //禁用时 通过监听其下面子元素click事件，如果被禁用了，则阻止事件冒泡
        t.children('span').unbind(".linkbutton").bind("click.linkbutton", function () {
            if (opts.waiting) {
                if (opts.waitingAlert!=""){
                    $.messager.popover({
                        msg: opts.waitingAlert,
                        type: 'alert',
                        timeout: 2000, 		//0不自动关闭。3000s
                        showSpeed: 'slow', //fast,slow,normal,1500
                        showType: 'fade'  //show,fade,slide
                    });
                }
                return false;
            }
            if (opts.disabled && opts.stopAllEventOnDisabled) {
                return false;
            }else{
                return true;
            }
        })
        setSelected(target, opts.selected);
        setDisabled(target, opts.disabled);
    };
    function _operationStart(target){
        var t = $(target);
        t.addClass('l-btn-waiting');
        t.removeClass('l-btn-focus');
        var opts = t.linkbutton('options');
        opts.waiting = true;
        opts.waitingTimer = setTimeout(function(){
            _operationCompleted(target);
        },parseInt(opts.clickWaitingTime));
    }
    function _operationCompleted(target){
        var lb = $.data(target, "linkbutton");
        if (lb){ // messager.alert界面的按钮，点击后会卸载，此时lb为undefined
            var opts = lb.options;
            if (opts.waiting){opts.waiting = false;}else{return ;}
            clearTimeout(opts.waitingTimer);
            if (opts.debouncedClickFun && 'function' == typeof opts.debouncedClickFun.cancel) opts.debouncedClickFun.cancel();
            $(target).removeClass('l-btn-waiting');
        }
    }
    function setSelected(target, selected) {
        var opts = $.data(target, "linkbutton").options;
        if (selected) {
            if (opts.group) {
                $("a.l-btn[group=\"" + opts.group + "\"]").each(function () {
                    var o = $(this).linkbutton("options");
                    if (o.toggle) {
                        $(this).removeClass("l-btn-selected l-btn-plain-selected");
                        o.selected = false;
                    }
                });
            }
            $(target).addClass(opts.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected");
            opts.selected = true;
        } else {
            if (!opts.group) {
                $(target).removeClass("l-btn-selected l-btn-plain-selected");
                opts.selected = false;
            }
        }
    };
    function setDisabled(target, disabled) {
        var state = $.data(target, "linkbutton");
        if ('undefined'==typeof state) {return;}
        var opts = state.options;
        $(target).removeClass("l-btn-disabled l-btn-plain-disabled");
        if (disabled) {
            opts.disabled = true;
            var href = $(target).attr("href");
            if (href) {
                state.href = href;
                $(target).attr("href", "javascript:void(0)");
            }
            if (target.onclick) {
                state.onclick = target.onclick;
                target.onclick = null;
            }
            opts.plain ? $(target).addClass("l-btn-disabled l-btn-plain-disabled") : $(target).addClass("l-btn-disabled");
        } else {
            opts.disabled = false;
            if (state.href) {
                $(target).attr("href", state.href);
            }
            if (state.onclick) {
                target.onclick = state.onclick;
            }
        }
    };
    $.fn.linkbutton = function (options, param) {
        if (typeof options == "string") {
            return $.fn.linkbutton.methods[options](this, param);
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "linkbutton");
            if (state) {
                $.extend(state.options, options);
            } else {
                $.data(this, "linkbutton", { options: $.extend({}, $.fn.linkbutton.defaults, $.fn.linkbutton.parseOptions(this), options) });
                $(this).removeAttr("disabled");
            }
            createButton(this);
        });
    };
    $.fn.linkbutton.methods = {
        options: function (jq) {
            return $.data(jq[0], "linkbutton").options;
        }, enable: function (jq) {
            return jq.each(function () {
                setDisabled(this, false);
            });
        }, disable: function (jq) {
            return jq.each(function () {
                setDisabled(this, true);
            });
        }, select: function (jq) {
            return jq.each(function () {
                setSelected(this, true);
            });
        }, unselect: function (jq) {
            return jq.each(function () {
                setSelected(this, false);
            });
        }, operationCompleted:function(jq){
            return jq.each(function(){
                _operationCompleted(this);
            });
        }, operationStart:function(jq){
            return jq.each(function(){
                _operationStart(this);
            });
        }
    };
    $.fn.linkbutton.parseOptions = function (target) {
        var t = $(target);
        return $.extend({}, $.parser.parseOptions(target, ["id","iconImg", "iconCls", "iconAlign", "group", "size", { plain: "boolean", toggle: "boolean", selected: "boolean" }]), { disabled: (t.attr("disabled") ? true : undefined), text: $.trim(t.html()), iconCls: (t.attr("icon") || t.attr("iconCls")) });
    };
    $.fn.linkbutton.defaults = {
        //wanghc iconImg:'imgurl' -> background-image:url('../images/uiimages/yellow_paper.png')
        id: null, disabled: false, toggle: false, selected: false, group: null, plain: false, text: "",iconImg:null, iconCls: null, iconAlign: "left", size: "small", onClick: function () {
        }, stopAllEventOnDisabled: false //cryze 禁用时,是否禁用其他方式绑定的事件
        , notTrans:false /*默认自动翻译*/
        , clickWaitingTime:200 // wanghc 点击后按钮禁用毫秒数
        , waitingAlert:'The button has been clicked and the system is responding. Please wait'
    };
})(jQuery);