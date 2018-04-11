/**
 * 仿照easyui1.5 filebox功能 不依赖textbox组件
 */
(function ($) {
    $.parser.plugins.push('filebox');
    var _56e = 0;

    function _56f(_570) {
        var _571 = $.data(_570, "filebox");
        var opts = _571.options;
        opts.fileboxId = "filebox_file_id_" + (++_56e);
        $(_570).addClass("filebox-f").hide();
        var span = $("<span class=\"filebox\">" + "<input class=\"filebox-text\" autocomplete=\"off\">" + "<input type=\"hidden\" class=\"filebox-value\">" + "</span>").insertAfter(_570);
        var name = $(_570).attr("name");
        if (name) {
            span.find("input.filebox-value").attr("name", name);
            $(_570).removeAttr("name").attr("fileboxName", name);
        }
        if(opts.disabled) span.addClass('disabled');
        var btn = $("<a href=\"javascript:;\" class=\"filebox-button\"></a>").prependTo(span);
        btn.addClass("filebox-button-" + opts.buttonAlign).linkbutton({
            text: opts.buttonText,
            iconCls: opts.buttonIcon,
            onClick: function () {
                opts.onClickButton.call(_570);
            },
            disabled:opts.disabled
        });

        var text=span.find("input.filebox-text");
        text.attr("readonly", "readonly").attr('placeholder',opts.prompt||'');
        _571.filebox = $(_570).next();
        var file = _572(_570);

        if (btn.length) {
            $("<label class=\"filebox-label\" for=\"" + opts.fileboxId + "\"></label>").appendTo(btn);
            if (btn.linkbutton("options").disabled) {
                file.attr("disabled", "disabled");
            } else {
                file.removeAttr("disabled");
            }
        }
        span._outerWidth(opts.width)._outerHeight(opts.height);
        var textWidth=span.width()-btn.outerWidth();
        
        text._outerWidth(textWidth).css({height:span.height()+'px',lineHeight:span.height()+'px',marginLeft:(opts.buttonAlign=='left'?btn.outerWidth():0)+'px' });
        
    };

    function _572(_573) {
        var _574 = $.data(_573, "filebox");
        var opts = _574.options;
        _574.filebox.find(".filebox-value").remove();
        opts.oldValue = "";
        var file = $("<input type=\"file\" class=\"filebox-value\">").appendTo(_574.filebox);
        file.attr("id", opts.fileboxId).attr("name", $(_573).attr("fileboxName") || "");
        file.attr("accept", opts.accept);
        file.attr("capture", opts.capture);
        if (opts.multiple) {
            file.attr("multiple", "multiple");
        }
        file.change(function () {
            var _575 = this.value;
            if (this.files) {
                _575 = $.map(this.files, function (file) {
                    return file.name;
                }).join(opts.separator);
            }
            $(_573).filebox("setText", _575);
            opts.onChange.call(_573, _575, opts.oldValue);
            opts.oldValue = _575;
        });
        return file;
    };
    function disable(dom){
        var _574 = $.data(dom, "filebox");
        var opts = _574.options;
        var span=_574.filebox;
        span.addClass('disabled');
        var btn=span.find(".filebox-button");
        btn.linkbutton('disable');
        var file=span.find('.filebox-value');
        file.attr("disabled", "disabled");
        opts.disabled=true;
    }
    function enable(dom){
        var _574 = $.data(dom, "filebox");
        var opts = _574.options;
        var span=_574.filebox;
        span.removeClass('disabled');
        var btn=span.find(".filebox-button");
        btn.linkbutton('enable');
        var file=span.find('.filebox-value');
        file.removeAttr("disabled");
        opts.disabled=false;
    }
    $.fn.filebox = function (_576, _577) {
        if (typeof _576 == "string") {
            var _578 = $.fn.filebox.methods[_576];
            return _578(this, _577);
            
        }
        _576 = _576 || {};
        return this.each(function () {
            var _579 = $.data(this, "filebox");
            if (_579) {
                $.extend(_579.options, _576);
            } else {
                $.data(this, "filebox", {
                    options: $.extend({}, $.fn.filebox.defaults, $.fn.filebox.parseOptions(this), _576)
                });
            }
            _56f(this);
        });
    };
    $.fn.filebox.methods = {
        options: function (jq) {
            return $.data(jq[0], "filebox").options;
        },
        clear: function (jq) {
            return jq.each(function () {
                _572(this);
                $(this).filebox("setText",'');
            });
        },
        reset: function (jq) {
            return jq.each(function () {
                $(this).filebox("clear");
            });
        },
        setValue: function (jq) {
            return jq;
        },
        setValues: function (jq) {
            return jq;
        },
        files: function (jq) {
            return jq.next().find(".filebox-value")[0].files;
        },
        setText:function(jq,text){
            return jq.each(function () {
                $.data(this, "filebox").filebox.find(".filebox-text").val(text);
            });
        },
        button:function(jq){
            return $.data(jq[0], "filebox").filebox.find(".filebox-button");
        },
        disable:function(jq){
            return jq.each(function () {
                disable(this);
            });
        },
        enable:function(jq){
            return jq.each(function () {
                enable(this);
            });
        }
    };
    $.fn.filebox.parseOptions = function (_57a) {
        var t = $(_57a);
        return $.extend({}, $.parser.parseOptions(_57a, ["width","height","prompt","accept", "capture", "separator"]), {
            multiple: (t.attr("multiple") ? true : undefined),
            disabled: (t.attr("disabled") ? true : undefined)
        });
    };
    $.fn.filebox.defaults = $.extend({}, {
        buttonIcon: null,
        buttonText: "Choose File",
        buttonAlign: "right",
        inputEvents: {},
        accept: "",
        capture: "",
        separator: ",",
        multiple: false,
        prompt:'',
        width:'177',
        height:'30',
        disabled:false,
        onClickButton:function(){},
        onChange:function(){}
    });
})(jQuery);