(function ($) {
    function _949(_94a) {
        var _94b = $.data(_94a, "datetimeboxq");
        var opts = _94b.options;
        $(_94a).val(opts.value);
		$(_94a).dateboxq($.extend({}, opts, {
            onShowPanel: function () {
                var _94c = $(_94a).datetimeboxq("getValue");
                setPanel(_94a, _94c, true);
                opts.onShowPanel.call(_94a);
            } //, formatter: $.fn.dateboxq.defaults.formatter, parser: $.fn.dateboxq.defaults.parser
		}));
		$(_94a).removeClass("dateboxq-f").addClass("datetimeboxq-f");
        $(_94a).dateboxq("calendar").calendar({
            onSelect: function (date) {
                opts.onSelect.call(_94a, date);
            },
            onDblClick: function (date) {
                // handler
                var bs = $(_94a).datetimeboxq('options').buttons;;
                if (bs.length>1 && bs[1].handler) bs[1].handler.call(this, _94a);
                opts.onDblClick.call(_94a, date);
            }
		});
        // var _94d = $(_94a).datebox("panel");
        // if (!_94b.spinner) {
        //     //cryze datetimebox de timespinner with 80px->100px  height->24px; height强行指定 24px
        //     var p = $("<div style=\"padding:2px\"><input style=\"width:100px;height:24px\"></div>").insertAfter(_94d.children("div.datebox-calendar-inner"));
        //     _94b.spinner = p.children("input");
        // }
        // _94b.spinner.timespinner({ showSeconds: opts.showSeconds, separator: ':' }).unbind(".datetimebox").bind("mousedown.datetimebox", function (e) {
        //     e.stopPropagation();
        // });
        //_94e(_94a, opts.value);
	};
	function _onShowPanel(target,value,remainText){
        
	}
	function _hide(target,opts){
		opts.onHidePanel.call(this,target);
		$($.hisui.globalContainerSelector).hide();
	}
	function doEnter(target,hidePanel) {
		hidePanel = hidePanel===undefined ? true : hidePanel;
		var state = $.data(target, 'datetimeboxq');
		var opts = state.options;
		var current = $(target).val();
		if (current) {
			setValue(target, opts.formatter.call(target, opts.parser.call(target,current)));
			if(hidePanel) _hide(target,opts);
		}
    };
    function setPanel(target){
        var _t = $(target);
        var panel = $($.hisui.globalContainerSelector); /*全局固定div*/
		var opts = $.data(target,"datetimeboxq").options;
        var txt = _t.val();
        var now = new Date();
        var h = now.getHours();
        var M = now.getMinutes();
        var s = now.getSeconds();
        var valueArr = txt.split(" ");
        function _968(_969) {
            return (_969 < 10 ? "0" : "") + _969;
        };
        if (valueArr.length==1){
            timeval = _968(h)+':'+_968(M)+':'+_968(s);
        }else{
            timeval = valueArr[1];
        }
        var cur = opts.parser.call(target,txt);
        var p = $("<div style=\"padding:2px\"><input style=\"width:100px;height:24px\"></div>").insertAfter(panel.children("div.calendar"));
        var spnnr = p.children("input");
        spnnr.timespinner({ showSeconds: opts.showSeconds, separator: ':' }).unbind(".datetimeboxq").bind("mousedown.datetimeboxq", function (e) {
            e.stopPropagation();
        });
        spnnr.timespinner('setValue',timeval);
    }
	function setValue(target, value, remainText){
		var state = $.data(target,'datetimeboxq');
        var opts = state.options;
        var oldVal = $(target).val();
		if (oldVal != value){
			opts.onChange.call(target,value,oldVal);
		}
		$(target).val(value);
		if ($(target).validatebox('isValid')){
			opts.onSelect.call(target,opts.parser.call(target,value));
		}
    }
    function getSelectDate(target) {
        var panel = $($.hisui.globalContainerSelector);
        var date = panel.children('div.calendar').calendar('options').current;
        var t = panel.find('input.spinner-f');
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), t.timespinner("getHours"), t.timespinner("getMinutes"), t.timespinner("getSeconds"));
    };
    $.fn.datetimeboxq = function (_95b, _95c) {
        if (typeof _95b == "string") {
            var _95d = $.fn.datetimeboxq.methods[_95b];
            if (_95d) {
                return _95d(this, _95c);
            } else {
                return this.dateboxq(_95b, _95c);
            }
        }
        _95b = _95b || {};
        return this.each(function () {
            var _95e = $.data(this, "datetimeboxq");
            if (_95e) {
                $.extend(_95e.options, _95b);
            } else {
				var _t = this;
				$.data(this, "datetimeboxq", {
					spinner:{
						/*为了兼容老的写法
						$('#dbq').datetimeboxq("spinner").timespinner("options").*/
						options : $.fn.timespinner.defaults.options,
						timespinner:function(tOpt){
							if (typeof tOpt == 'string'){
								if (tOpt=='options') return $.data(_t,'datetimeboxq').spinner.options;
							}else{
								$.data(_t,'datetimeboxq').spinner.options = tOpt;
							}
						}
					},
					options: $.extend({}, $.fn.datetimeboxq.defaults, $.fn.datetimeboxq.parseOptions(this), _95b) 
				});
				
            }
            _949(this);
        });
    };
    $.fn.datetimeboxq.methods = {
        options: function (jq) {
            var _95f = jq.dateboxq("options");
            return $.extend($.data(jq[0], "datetimeboxq").options, { originalValue: _95f.originalValue, disabled: _95f.disabled, readonly: _95f.readonly });
        }, spinner: function (jq) {
            return $.data(jq[0], "datetimeboxq").spinner;
        }, setValue: function (jq, _960) {
            return jq.each(function () {
                setValue(this, _960);
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).datetimeboxq("options");
                $(this).datetimeboxq("setValue", opts.originalValue);
            });
        }
    };
    $.fn.datetimeboxq.parseOptions = function (_961) {
        var t = $(_961);
        return $.extend({}, $.fn.dateboxq.parseOptions(_961), $.parser.parseOptions(_961, [{ showSeconds: "boolean" }]));
    };
    $.fn.datetimeboxq.defaults = $.extend({}, $.fn.dateboxq.defaults, {
		showSeconds: true,panelHeight:$.hisui.getStyleCodeConfigValue('datetimeboxPanelHeight'),
		buttons: [{
            text: function (_962) {
                return $(_962).dateboxq("options").currentText;
            }, handler: function (target) {
                var n = $(target).dateboxq("options").formatter.call(target,new Date());
				$(target).val(n);
                doEnter(target,true);
            }
        }, {
            text: function (target) {
                return $(target).dateboxq("options").okText;
            }, handler: function (target) {
                var date = getSelectDate(target);
                var state = $.data(target,"datetimeboxq");
				var n = state.options.formatter.call(target,date);
				$(target).val(n);
                doEnter(target,true);
            }
        }, {
            text: function (target) {
                return $(target).dateboxq("options").closeText;
            }, handler: function (target) {
                _hide(target, $(target).datetimeboxq("options"));
            }
        }], formatter: function (date) {
            var h = date.getHours();
            var M = date.getMinutes();
            var s = date.getSeconds();
            function _968(_969) {
                return (_969 < 10 ? "0" : "") + _969;
            };
            var _96a = ":";
            var r = $.fn.dateboxq.defaults.formatter(date) + " " + _968(h) + _96a + _968(M);
            if ($(this).datetimeboxq("options").showSeconds) {
                r += _96a + _968(s);
            }
            return r;
        }, parser: function (s) {
            if ($.trim(s) == "") {
                return new Date();
            }
            var dt = s.split(" ");
            var d = $.fn.dateboxq.defaults.parser(dt[0]);
            if (dt.length < 2) {
                return d;
            }
            var _96b = ":"; //$(this).datetimeboxq("spinner").timespinner("options").separator;
            var tt = dt[1].split(_96b);
            var hour = parseInt(tt[0], 10) || 0;
            var _96c = parseInt(tt[1], 10) || 0;
            var _96d = parseInt(tt[2], 10) || 0;
            return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, _96c, _96d);
        }, onHidePanel:function(){ //因为修改t快捷键,datebox中增加了这个方法,datetimebox中不用
        },rules: { //重写datebox方法
        },onBlur:function(target){ //重写datebox方法
		}
    });
})(jQuery);