(function($){
	/**
	 * create date box
	 */
	function createBox(target){
		var state = $.data(target, 'datebox');
		var opts = state.options;
		
		$(target).addClass('datebox-f').combo($.extend({}, opts, {
			onShowPanel:function(){
				if (!state.calendar){
					createCalendar();
				}
				setCalendar();
				setValue(target, $(target).datebox('getText'), true);
//				setValue(target, $(target).datebox('getText'));
				opts.onShowPanel.call(target);
			}
		}));
		$(target).combo('textbox').parent().addClass('datebox');
		
		/**
		 * if the calendar isn't created, create it.
		 */
		/**初始化时不画日历 */
		if (opts.allParse){
			if (!state.calendar){
				createCalendar();
			}
		}
		setValue(target, opts.value);
		$(target).combo('textbox').unbind('.datebox').bind("blur.datebox",function(e){
			//calendar-nav-hover
			/*var rt = $(e.relatedTarget) ;
			if (rt.length>0){
				if (rt.closest('.datebox-button').length==0 && rt.closest('.datebox-calendar-inner').length==0){
					doBlur(target);
				}
			}else{
				var cl = $.data(target,'datebox').calendar.closest('.panel-body');
				if (cl.find('.calendar-hover').length==0 && cl.find('.calendar-nav-hover').length==0){
					doBlur(target);
				}
			}*/	
			/** 点击 calendar时不触发doBlur, 点击今天没办法判断(转成setTimeout判断) */
			if ($(target).combo('textbox').parent().find('.combo-arrow-hover').length>0){return ;}
			if ($.data(target,'datebox').calendar){
				var cl = $.data(target,'datebox').calendar.closest('.panel-body');
				if (cl.find('.calendar-hover').length>0){return ;}
				if (cl.find('.calendar-nav-hover').length>0){return ;}
				if (cl.find('.calendar-menu-hover').length>0){return ;}
			}
			var curVal = $(target).combo('getText'); 
			setTimeout(function(){
				// curVal不为空才去校验日期格式, 为空时调用doEnter会默认上当天日期
				// 2020-02-17 注掉下面if,doEnter增加calender显示状态下回车才选中值
				//if (curVal!="" && curVal == $(target).combo('getText')){ //没有点击今天,或日历中其它日期
					opts.onBlur(target);
				//}
			},200);
		})
		function createCalendar(){
			var panel = $(target).combo('panel').css('overflow','hidden');
			panel.panel('options').onBeforeDestroy = function(){
				var sc = $(this).find('.calendar-shared');
				if (sc.length){
					sc.insertBefore(sc[0].pholder);
				}
			};
			var cc = $('<div class="datebox-calendar-inner"></div>').appendTo(panel);
			if (opts.sharedCalendar){
				var sc = $(opts.sharedCalendar);
				if (!sc[0].pholder){
					sc[0].pholder = $('<div class="calendar-pholder" style="display:none"></div>').insertAfter(sc);
				}
				sc.addClass('calendar-shared').appendTo(cc);
				if (!sc.hasClass('calendar')){
					sc.calendar();
				}
				state.calendar = sc;
//				state.calendar = $(opts.sharedCalendar).appendTo(cc);
//				if (!state.calendar.hasClass('calendar')){
//					state.calendar.calendar();
//				}
			} else {
				state.calendar = $('<div></div>').appendTo(cc).calendar();
			}
			$.extend(state.calendar.calendar('options'), {
				fit:true,
				border:false,
				onSelect:function(date){
					var opts = $(this.target).datebox('options');
					setValue(this.target, opts.formatter.call(this.target, date));
					$(this.target).combo('hidePanel');
					opts.onSelect.call(target, date);
				},
				validator: function (date, validParams) {
					// date为当前时间2022-07-15 14:43:00
					// maxDate日期的转换时间:2022-07-15 00:0:00, 虽然是同一天, 当前时间不在maxDate内，有bug， 增加onlyDate处理
					var onlyDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
					var tmpState = $.data(target, 'datebox');
					var tmpOpt = tmpState.options;
					var rtn = true;
					if (null != tmpOpt.minDate){
						if (validParams) validParams[0]=tmpOpt.minDate;
						var d1 = tmpOpt.parser.call(target, tmpOpt.minDate);
						if (d1>onlyDate) rtn= false;
					}
					if (null != tmpOpt.maxDate){
						if (validParams) validParams[1]=tmpOpt.maxDate;
						var d2 = tmpOpt.parser.call(target, tmpOpt.maxDate);
						if (d2<onlyDate) rtn = false;
					}
					return rtn;
				}
			});
//			setValue(target, opts.value);
			
			var button = $('<div class="datebox-button"><table cellspacing="0" cellpadding="0" style="width:100%"><tr></tr></table></div>').appendTo(panel);
			var tr = button.find('tr');
			for(var i=0; i<opts.buttons.length; i++){
				var td = $('<td></td>').appendTo(tr);
				var btn = opts.buttons[i];
				// 加onclick属性，兼容血透调用病历界面，解决弹出空白界面问题
				var t = $('<a href="javascript:void(0)" onclick="javascript:return false;"></a>').html($.isFunction(btn.text) ? btn.text(target) : btn.text).appendTo(td);
				t.bind('click', {target: target, handler: btn.handler}, function(e){
					e.data.handler.call(this, e.data.target);
				});
			}
			tr.find('td').css('width', (100/opts.buttons.length)+'%');
		}
		
		function setCalendar(){
			var panel = $(target).combo('panel');
			var cc = panel.children('div.datebox-calendar-inner');
			panel.children()._outerWidth(panel.width());
			state.calendar.appendTo(cc);
			state.calendar[0].target = target;
			if (opts.panelHeight != 'auto'){
				var height = panel.height();
				panel.children().not(cc).each(function(){
					height -= $(this).outerHeight();
				});
				cc._outerHeight(height);
			}
			state.calendar.calendar('resize');
		}
	}
	
	/**
	 * called when user inputs some value in text box
	 */
	function doQuery(target, q){
		setValue(target, q, true);
	}
	function validDate(s){
        /*t-n , t+n*/
		if (!s) return false;
		if (s.charAt(0).toUpperCase()=='T'){return true;}
		if ("undefined"!=typeof dtformat &&  dtformat == 'DMY'){
			var ss = s.split('/');
			y = parseInt(ss[2],10);
			m = parseInt(ss[1],10);
			d = parseInt(ss[0],10);
			if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
				if ((m>12)||(d>31)){ return false;}
				return true;
			} else {
				return false;
			}
		}
		if (s.charAt(0).toUpperCase()=='T'){
			/*2019-6-6 => 2019-06-06 */
			var ss =  s.split('-');
			var ss1 = parseInt(ss[0],10);
			var ss2 = parseInt(ss[1],10);
			var ss3 = parseInt(ss[2],10);
			if (!isNaN(ss1) && !isNaN(ss2) && !isNaN(ss3)){
				s = ss1+"-"+(ss2>9?ss2:'0'+ss2)+'-'+(ss3>9?ss3:'0'+ss3);
			}else{
				return false;
			}
		}
		var reg = /((?!0000)[0-9]{4}((0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])(29|30)|(0[13578]|1[02])31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)0229)/;
		var reg2 = /((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)/;
        var y=NaN, m=NaN, d=NaN;    
		if (reg.test(s)){
			y = parseInt(s.slice(0,4),10);
			m = parseInt(s.slice(4,6));
			d = parseInt(s.slice(6,8));
		}else if(reg2.test(s)){
			var ss = s.split('-');
			y = parseInt(ss[0],10);
			m = parseInt(ss[1],10);
			d = parseInt(ss[2],10);
		}
		if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
			return true;
		} else {
			return false;
		}
    }
	/**
	 * called when user press enter key
	 * param force  true强制设置值 2020-09-07增加,在输入框内值为空时,点击today按钮不赋值问题
	 */
	function doEnter(target,force){
		var state = $.data(target, 'datebox');
		var opts = state.options;
		var val = $(target).datebox('getText'); //取当前文本框中值，然后对比日历值是不是一致
		var current ;
		if (state.calendar && val!=""){ //state.calendar.is(":visible")){  //日历可见时,回车才默认日期
			current = state.calendar.calendar('options').current;
		}
		if (force===true){  //20200907, 为不影响以前逻辑，扩展入参
			current = state.calendar.calendar('options').current;
		}
		if (current){
			setValue(target, opts.formatter.call(target, current));
			$(target).combo('hidePanel');
		}
	}
	function doBlur(target){
		$(target).combo('textbox').validatebox('enableValidation');
		if ($(target).combo('textbox').validatebox("isValid")) {
			doEnter(target);
		}
	}
	function setValue(target, value, remainText){
		var state = $.data(target, 'datebox');
		var opts = state.options;
		$(target).combo('setValue', value);
		var calendar = state.calendar;
		if(calendar) {calendar.calendar('moveTo', opts.parser.call(target, value));}
		if (!remainText){
			if (value){
				if (calendar) {
					value = opts.formatter.call(target, calendar.calendar('options').current);
				}else{
					value = opts.formatter.call(target, opts.parser.call(target,value));
				}
				$(target).combo('setValue', value).combo('setText', value);
			} else {
				$(target).combo('setText', value);
			}
		}
	}
	
	$.fn.datebox = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.datebox.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.combo(options, param);
			}
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'datebox');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'datebox', {
					options: $.extend({}, $.fn.datebox.defaults, $.fn.datebox.parseOptions(this), options)
				});
			}
			createBox(this);
		});
	};
	
	$.fn.datebox.methods = {
		options: function(jq){
			var copts = jq.combo('options');
			return $.extend($.data(jq[0], 'datebox').options, {
				originalValue: copts.originalValue,
				disabled: copts.disabled,
				readonly: copts.readonly
			});
		},
		calendar: function(jq){	// get the calendar object
			return $.data(jq[0], 'datebox').calendar;
		},
		setValue: function(jq, value){
			return jq.each(function(){
				setValue(this, value);
			});
		},
		reset: function(jq){
			return jq.each(function(){
				var opts = $(this).datebox('options');
				$(this).datebox('setValue', opts.originalValue);
			});
		}
	};
	
	$.fn.datebox.parseOptions = function(target){
		return $.extend({}, $.fn.combo.parseOptions(target), $.parser.parseOptions(target, ['sharedCalendar']));
	};

	$.fn.datebox.defaults = $.extend({}, $.fn.combo.defaults, {
		panelWidth:180,
		panelHeight:'auto',
		sharedCalendar:null,
		keyHandler: {
			up:function(e){},
			down:function(e){},
			left: function(e){},
			right: function(e){},
			enter:function(e){doBlur(this);},
			query:function(q,e){
				$(this).combo('textbox').validatebox('disableValidation');
				doQuery(this, q);
			}
		},
		
		currentText:'Today',
		closeText:'Close',
		okText:'Ok',
		
		buttons:[{
			text: function(target){return $(target).datebox('options').currentText;},
			handler: function(target){
				$(target).datebox('calendar').calendar({
					year:new Date().getFullYear(),
					month:new Date().getMonth()+1,
					current:new Date()
				});
				doEnter(target,true);
			}
		},{
			text: function(target){return $(target).datebox('options').closeText;},
			handler: function(target){
				$(this).closest('div.combo-panel').panel('close');
			}
		}],
		formatter:function(date){
			var y = date.getFullYear();
			var m = date.getMonth()+1;
			var d = date.getDate();
			return m+'/'+d+'/'+y;
		},
		parser:function(s){
			var t = Date.parse(s);
			if (!isNaN(t)){
				return new Date(t);
			} else {
				return new Date();
			}
		},
		onBlur:function(target){
			doBlur(target);
		},
        onSelect:function(date){},
		validType:{"datebox":(typeof dtformat=="undefined"?"":dtformat),"minMaxDate":[null,null]}, //['datebox["YMD"]','minMaxDate[null,null]'],
		//validParams:"YMD",
		minDate:(typeof dtformat=="undefined"?null:(dtformat=="YMD"?'1841-01-01':null)),
		maxDate:null,
		allParse:true  //默认初始化calendar,设置false提升速度一个日期控件(110ms--36ms)
	});
	/*20191120 单独extend,不然会覆盖validatebox的rules*/
	$.extend($.fn.datebox.defaults.rules, {
		datebox: {
			validator: function (_442,params) {
				var _t = $(this);
				var state = "", target = "";
				if (_t.hasClass('dateboxq')){
					target = this;
					state = $.data(target, 'dateboxq');
				}else{
					target = _t.closest('.datebox').prev()[0];
					if (target){
						state = $.data(target, 'datebox');
					}
				}
				if(state){
					var tmpOpt = state.options;
					if (tmpOpt.validParams=="YM") return true;
				}
				if (params=="YMD"){
					return validDate(_442);
				}
				return true;
			}, message:"Please enter a valid date."
		},
		minMaxDate:{
			validator: function (_442,params) {
				var _t = $(this);
				var state = "", target = "";
				if (_t.hasClass('dateboxq')){
					target = this;
					state = $.data(target, 'dateboxq');
				}else{
					target = _t.closest('.datebox').prev()[0];
					if (target){
						state = $.data(target, 'datebox');
					}
				}
				if(state){
					var tmpOpt = state.options;
					var v = tmpOpt.parser.call(target, _442);
					tmpOpt.validType.minMaxDate = [null,null];
					if (tmpOpt.minDate!=null || tmpOpt.maxDate!=null){
						if(tmpOpt.minDate==null&&tmpOpt.rules.minMaxDate.messageMax){
							tmpOpt.rules.minMaxDate.message = tmpOpt.rules.minMaxDate.messageMax;
						}else if(tmpOpt.maxDate==null&&tmpOpt.rules.minMaxDate.messageMin){
							tmpOpt.rules.minMaxDate.message = tmpOpt.rules.minMaxDate.messageMin;
						}else{
							tmpOpt.rules.minMaxDate.message = tmpOpt.rules.minMaxDate.messageDef;
						}
						if(tmpOpt.minDate!=null) tmpOpt.validType.minMaxDate[0]=tmpOpt.minDate;
						if(tmpOpt.maxDate!=null) tmpOpt.validType.minMaxDate[1]=tmpOpt.maxDate;
					}else{
						tmpOpt.rules.minMaxDate.message = tmpOpt.rules.datebox.message;
					}
					if (state.calendar) return state.calendar.calendar('options').validator(v,params);
				}
				return true;
			}, message:"Please enter a valid date.", messageDef:"Please enter a valid date."
		}
	});
})(jQuery);
