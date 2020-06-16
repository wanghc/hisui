(function($){
	function createBox(target){
		var state = $.data(target, 'dateboxq');
		var opts = state.options;
		var _t = $(target);
		_t.comboq($.extend({},opts,{
			onShowPanel:function(){
				state.panel = $(target).comboq('panel');
				createCalendar(target);
                opts.onShowPanel.call(target);
			}
		}));
		_t.addClass('dateboxq');
		return ;
	}
	function createCalendar(target){
		var _t = $(target);
		var state = $.data(target,"dateboxq");
		var opts = state.options;
		var txt = $(target).comboq('getText');
		var cur = opts.parser.call(target,txt);		
		if (opts.minDate!=null || opts.maxDate!=null){
			$(target).dateboxq('calendar').options.validator = function(date,validParams){
				var tmpState = $.data(target, 'dateboxq');
				var tmpOpt = tmpState.options;
				var rtn = true;
				if (null != tmpOpt.minDate){
					if (validParams) validParams[0]=tmpOpt.minDate;
					var d1 = tmpOpt.parser.call(target, tmpOpt.minDate);
					if (d1>date) rtn= false;
				}
				if (null != tmpOpt.maxDate){
					if (validParams) validParams[1]=tmpOpt.maxDate;
					var d2 = tmpOpt.parser.call(target, tmpOpt.maxDate);
					if (d2<date) rtn = false;
				}
				return rtn;
			}
		}
		var calOpt = $.extend({
			current: cur,
			border:false,
			//validator: $(target).dateboxq('calendar').options.validator,
			onSelect: function(date){
				var opts = $(target).dateboxq('options');
				setValue(target , opts.formatter.call(target, date));
				$(target).comboq('hidePanel');
			}
		},  $(target).dateboxq("calendar").calendar('options') );
		var panel = $(target).comboq('panel');
		var panelBody = $(target).comboq('createPanelBody');
		panelBody.calendar(calOpt);

		var button = $('<div class="datebox-button"><table cellspacing="0" cellpadding="0" style="width:100%"><tr></tr></table></div>').appendTo(panel);
		var tr = button.find('tr');
		for(var i=0; i<opts.buttons.length; i++){
			var td = $('<td></td>').appendTo(tr);
			var btn = opts.buttons[i];
			var t = $('<a href="javascript:void(0)" onclick="javascript:return false;"></a>').html($.isFunction(btn.text) ? btn.text(target) : btn.text).appendTo(td);
			t.bind('click', {target: target, handler: btn.handler}, function(e){
				e.data.handler.call(this, e.data.target);
			});
		}
		tr.find('td').css('width', (100/opts.buttons.length)+'%');
		return ;
	}
	function doEnter(target,hidePanel){
		hidePanel = hidePanel===undefined ? true : hidePanel;
		var state = $.data(target, 'dateboxq');
		var opts = state.options;
		var current = $(target).val();
		if (current){
			setValue(target, opts.formatter.call(target, opts.parser.call(target,current)));
			if(hidePanel) $(target).comboq('hidePanel');
		}
	}
	function doBlur(target){
		if ($(target).validatebox("isValid")) {
			doEnter(target,false);
		}
	}
	function getValue(target){
		return $(target).val();
	}
	function setValue(target, value, remainText){
		var state = $.data(target,'dateboxq');
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
	$.fn.dateboxq = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.dateboxq.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.comboq(options, param);
			}
		}
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'dateboxq');
			if (state){
				$.extend(state.options, options);
			} else {
				var _t = this;
				$.data(this, 'dateboxq', {
					calendar:{ 
						/*为了兼容老的写法
						$('#dbq').dateboxq('calendar').calendar({
							validator:function(date){
								var now = new Date();
								return date<=now;
							}
						});*/
						options:{
							validator:$.fn.calendar.defaults.validator
						},
						calendar:function(calendarOpt){
							if (typeof calendarOpt == 'string'){
								if (calendarOpt=='options') return $.data(_t,'dateboxq').calendar.options;
							}else{
								$.extend($.data(_t,'dateboxq').calendar.options,calendarOpt);
							}
						}
					},
					options: $.extend({}, $.fn.dateboxq.defaults, $.fn.dateboxq.parseOptions(this), options)
				});
				$(this).css({ imeMode: "disabled" });
			}
			createBox(this);
		});
	};
	
	$.fn.dateboxq.methods = {
		options: function(jq){
			return $.data(jq[0], 'dateboxq').options;
		},
		setValue: function(jq, value){
			return jq.each(function(){
				setValue(this, value);
			});
		},
		getValue:function(jq){
			return getValue(jq[0]);
		},
		calendar:function(jq){
			return $.data(jq[0], 'dateboxq').calendar;
		}
	};	
	$.fn.dateboxq.parseOptions = function(target){
		return $.extend({}, $.fn.comboq.parseOptions(target), $.parser.parseOptions(target));
	};
	$.fn.dateboxq.defaults = $.extend({}, $.fn.comboq.defaults, {
		panelWidth:180,
		parser:$.fn.datebox.defaults.parser,
		formatter:$.fn.datebox.defaults.formatter,
		currentText:$.fn.datebox.defaults.currentText,
		closeText:$.fn.datebox.defaults.closeText,
		okText:$.fn.datebox.defaults.okText,
		buttons:[{
			text: function(target){return $(target).dateboxq('options').currentText;},
			handler: function(target){
				$(target).val('t');
				doEnter(target);
			}
		},{
			text: function(target){return $(target).dateboxq('options').closeText;},
			handler: function(target){
				$(target).comboq('hidePanel');
			}
		}],
		onBlur:function(target){
			doBlur(target);
		},
		onSelect:function(date){},
		onChange:function(newValue,oldValue){},
		validType:{"datebox":(typeof dtformat=="undefined"?"":dtformat),"minMaxDate":[null,null]},
		minDate:(typeof dtformat=="undefined"?null:(dtformat=="YMD"?'1841-01-01':null)),
		maxDate:null
	});
})(jQuery);