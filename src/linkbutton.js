(function ($) {
    function _6f(_70) {
        var _71 = $.data(_70, "linkbutton").options;
        var t = $(_70).empty();
        t.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected");
        t.removeClass("l-btn-small l-btn-medium l-btn-large").addClass("l-btn-" + _71.size);
        if (_71.plain) {
            t.addClass("l-btn-plain");
        }
        if (_71.selected) {
            t.addClass(_71.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected");
        }
        t.attr("group", _71.group || "");
        t.attr("id", _71.id || "");
        var _72 = $("<span class=\"l-btn-left\"></span>").appendTo(t);
        if (_71.text) {
            $("<span class=\"l-btn-text\"></span>").html(_71.text).appendTo(_72);
        } else {
            $("<span class=\"l-btn-text l-btn-empty\">&nbsp;</span>").appendTo(_72);
        }
        if (_71.iconImg){
             //wanghc  add iconImg
            $("<span class=\"l-btn-icon\" style=\"background-image:url('"+_71.iconImg+"');background-position:center;background-repeat:no-repeat;\">&nbsp;</span>").appendTo(_72);
            _72.addClass("l-btn-icon-" + _71.iconAlign);
        }else if (_71.iconCls) {
            $("<span class=\"l-btn-icon\">&nbsp;</span>").addClass(_71.iconCls).appendTo(_72);
            _72.addClass("l-btn-icon-" + _71.iconAlign);
        }
        t.unbind(".linkbutton").bind("focus.linkbutton", function () {
            if (!_71.disabled) {
                $(this).addClass("l-btn-focus");
            }
        }).bind("blur.linkbutton", function () {
            $(this).removeClass("l-btn-focus");
        }).bind("click.linkbutton", function () {
            if (!_71.disabled) {
                if (_71.toggle) {
                    if (_71.selected) {
                        $(this).linkbutton("unselect");
                    } else {
                        $(this).linkbutton("select");
                    }
                }
                _71.onClick.call(this);
            }
            //return false; //不要阻止 cryze 2018-4-10  
            //cryze 2018-4-19 不阻止的话若a href="#" 会有跳转行为   判断是否是filebox的button时不阻止  不是 改为原样 还是阻止吧 
            if (!t.hasClass('filebox-button')) return false;
        });
        //禁用时 通过监听其下面子元素click事件，如果被禁用了，则阻止事件冒泡
        t.children('span').unbind(".linkbutton").bind("click.linkbutton", function () {
            if (_71.disabled && _71.stopAllEventOnDisabled) {
                return false;
            }else{
                return true;
            }
        })
        _73(_70, _71.selected);
        _74(_70, _71.disabled);
    };
    function _73(_75, _76) {
        var _77 = $.data(_75, "linkbutton").options;
        if (_76) {
            if (_77.group) {
                $("a.l-btn[group=\"" + _77.group + "\"]").each(function () {
                    var o = $(this).linkbutton("options");
                    if (o.toggle) {
                        $(this).removeClass("l-btn-selected l-btn-plain-selected");
                        o.selected = false;
                    }
                });
            }
            $(_75).addClass(_77.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected");
            _77.selected = true;
        } else {
            if (!_77.group) {
                $(_75).removeClass("l-btn-selected l-btn-plain-selected");
                _77.selected = false;
            }
        }
    };
    function _74(_78, _79) {
        var _7a = $.data(_78, "linkbutton");
        var _7b = _7a.options;
        $(_78).removeClass("l-btn-disabled l-btn-plain-disabled");
        if (_79) {
            _7b.disabled = true;
            var _7c = $(_78).attr("href");
            if (_7c) {
                _7a.href = _7c;
                $(_78).attr("href", "javascript:void(0)");
            }
            if (_78.onclick) {
                _7a.onclick = _78.onclick;
                _78.onclick = null;
            }
            _7b.plain ? $(_78).addClass("l-btn-disabled l-btn-plain-disabled") : $(_78).addClass("l-btn-disabled");
        } else {
            _7b.disabled = false;
            if (_7a.href) {
                $(_78).attr("href", _7a.href);
            }
            if (_7a.onclick) {
                _78.onclick = _7a.onclick;
            }
        }
    };
    $.fn.linkbutton = function (_7d, _7e) {
        if (typeof _7d == "string") {
            return $.fn.linkbutton.methods[_7d](this, _7e);
        }
        _7d = _7d || {};
        return this.each(function () {
            var _7f = $.data(this, "linkbutton");
            if (_7f) {
                $.extend(_7f.options, _7d);
            } else {
                $.data(this, "linkbutton", { options: $.extend({}, $.fn.linkbutton.defaults, $.fn.linkbutton.parseOptions(this), _7d) });
                $(this).removeAttr("disabled");
            }
            _6f(this);
        });
    };
    $.fn.linkbutton.methods = {
        options: function (jq) {
            return $.data(jq[0], "linkbutton").options;
        }, enable: function (jq) {
            return jq.each(function () {
                _74(this, false);
            });
        }, disable: function (jq) {
            return jq.each(function () {
                _74(this, true);
            });
        }, select: function (jq) {
            return jq.each(function () {
                _73(this, true);
            });
        }, unselect: function (jq) {
            return jq.each(function () {
                _73(this, false);
            });
        }
    };
    $.fn.linkbutton.parseOptions = function (_80) {
        var t = $(_80);
        return $.extend({}, $.parser.parseOptions(_80, ["id","iconImg", "iconCls", "iconAlign", "group", "size", { plain: "boolean", toggle: "boolean", selected: "boolean" }]), { disabled: (t.attr("disabled") ? true : undefined), text: $.trim(t.html()), iconCls: (t.attr("icon") || t.attr("iconCls")) });
    };
    $.fn.linkbutton.defaults = {
        //wanghc iconImg:'imgurl' -> background-image:url('../images/uiimages/yellow_paper.png')
        id: null, disabled: false, toggle: false, selected: false, group: null, plain: false, text: "",iconImg:null, iconCls: null, iconAlign: "left", size: "small", onClick: function () {
        },stopAllEventOnDisabled:false //cryze 禁用时,是否禁用其他方式绑定的事件
    };
})(jQuery);