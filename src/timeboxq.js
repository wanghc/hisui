(function($){
	function doEnter(target,hidePanel){
		var state = $.data(target, 'timeboxq');
		var opts = state.options;
		var current = $(target).val();
		if (current){
			setValue(target, opts.formatter.call(target, opts.parser.call(target,current)));
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
		var state = $.data(target,'timeboxq');
		var opts = state.options;
		var oldVal = $(target).val();
		if (oldVal != value){
			opts.onChange.call(target,value,oldVal);
		}
		$(target).val(value);
		if ($(target).validatebox('isValid')){
			opts.onSelect.call(target,value);
		}
	}	
	$.fn.timeboxq = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.timeboxq.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.validatebox(options, param);
			}
		}
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'timeboxq');
			if (state){
				$.extend(state.options, options);
			} else {
				var _t = this;
				$.data(this, 'timeboxq', {
					options: $.extend({}, $.fn.timeboxq.defaults, $.fn.timeboxq.parseOptions(this), options)
				});
				var opts = $.data(this, 'timeboxq').options;
				if(opts.minTime!=null){
					opts.validType.minMaxTime[0] = opts.formatter.call(this,opts.parser.call(this,opts.minTime));
				}
				if(opts.maxTime!=null) {
					opts.validType.minMaxTime[1] = opts.formatter.call(this,opts.parser.call(this,opts.maxTime));
				}
				$(_t).validatebox($.extend({},opts));
				$(_t).css({ imeMode: "disabled" }).addClass('timeboxq').on('blur.timeboxq',function(){
					if(opts.onBlur) opts.onBlur.call(this,_t);
				});
			}
		});
	};
	// 把时间转成 1970 年 1 月 1 日至今的毫秒数。
	function doParser(txt){
		var opt = $.data(this, 'timeboxq').options;
		var frmt = opt.timeFormat;
		if (txt.indexOf(":")==-1){
			if (isNaN(txt.charAt(0))){
				txt = ConvNTime(txt,frmt);
			}else{
				txt = ConvertNoDelimTime(txt,frmt);
			}
		}
		if (txt.indexOf(":")>-1){
			var t = new Date();
			var arr = txt.split(':');
			var h = arr[0];
			var m = arr[1];
			var s = arr.length>2?arr[2]:0;
			t.setHours(h);
			t.setMinutes(m);
			t.setSeconds(s)
			return t.getTime();
		}
		return txt;
	}
	function ReWriteTime(h,m,s,frmt) {
		var newtime='';
		if (h<10) h='0'+h;
		if (m<10) m='0'+m;
		if (s<10) s='0'+s;
		if (frmt=='HMS'){newtime=h+':'+m+':'+s ;}
		if (frmt=='HM'){newtime=h+':'+m ;}
		return newtime;
	}
	function ConvNTime(tm,frmt) { 
		//支持 n+15 转成15分钟后,n-1, 如果格式不对原样运回
		var now=new Date();
		var re = /(\s)+/g ;
		var xmin_ms;
		tm=tm.replace(re,'');
		if (tm.charAt(0).toUpperCase()=='N') {
			xmin = tm.slice(2);
			if (xmin=='') xmin=0;
			if (isNaN(xmin)) return tm;
			xmin_ms = xmin * 60 * 1000;
			if (tm.charAt(1) == '+') now.setTime(now.getTime() + xmin_ms);
			else if (tm.charAt(1) == '-') now.setTime(now.getTime() - xmin_ms);
			else if (tm.length>1) return tm;
			var txt = ReWriteTime(now.getHours(),now.getMinutes(),now.getSeconds(),frmt);
			return txt;
		}
		return tm;
	}
	function ConvertNoDelimTime(tm,frmt)  {
		// 转换纯数字时间
		if (isNaN(tm)) return tm;
		var hr=tm.slice(0,2);
		if (isNaN(hr)) return tm;
		var mn=tm.slice(2,4)||0;
		var s=tm.slice(4)||0;
		return ReWriteTime(hr,parseInt(mn),parseInt(s),frmt);
	}

	function doFormatter (val){
		if (val=="") return "";
		var opt = $.data(this, 'timeboxq').options;
		var frmt = opt.timeFormat;
		var t = new Date();
		t.setTime(val);
		return ReWriteTime(t.getHours(),t.getMinutes(),t.getSeconds(),frmt);;
	}
	function doResize(target,width){
		$(target)._outerWidth(width);
	}
	$.fn.timeboxq.methods = {
		options: function(jq){
			return $.data(jq[0], 'timeboxq').options;
		},
		setValue: function(jq, value){
			return jq.each(function(){
				setValue(this, value);
			});
		},
		getValue:function(jq){
			return getValue(jq[0]);
		},
		resize: function (jq, _894) {
            return jq.each(function () {
                doResize(this, _894);
            });
        }		
	};
	$.fn.timeboxq.parseOptions = function(target){
		return $.extend({}, $.fn.validatebox.parseOptions(target), $.parser.parseOptions(target));
	};
	$.fn.timeboxq.defaults = $.extend({}, $.fn.validatebox.defaults, {
		panelWidth:180,
		parser:doParser,
		formatter:doFormatter,
		onBlur:function(target){
			doBlur(target);
		},
		onSelect:function(val){},
		onChange:function(newValue,oldValue){},
		validType:{"timeboxq":"","minMaxTime":[null,null]},
		timeFormat:"HMS",
		minTime:'00:00:00',
		maxTime:'23:59:59', 
		rules: {
            timeboxq: {
                validator: function (txt) {
					return /^(20|21|22|23|[0-1]\d|\d)(:[0-5]\d){1,2}$/i.test(txt) || /^(20|21|22|23|\d|[0-1]\d)([0-5]\d){0,2}$/i.test(txt) || /^[nN][-+]*\d*$/i.test(txt);
                }, message: "Please enter a valid time. 14:10, 1410, n+15"
			},
			minMaxTime:{
				validator: function (_442,params) {
					var target = this;
					var _t = $(this);
					var state = $.data(target, 'timeboxq');
					if(state){
						var tmpOpt = state.options;
						var v = tmpOpt.parser.call(target, _442);
						tmpOpt.validType.minMaxTime = [null,null];
						if (tmpOpt.minTime!=null || tmpOpt.maxTime!=null){
							if(tmpOpt.minTime==null&&tmpOpt.rules.minMaxTime.messageMax){
								tmpOpt.rules.minMaxTime.message = tmpOpt.rules.minMaxTime.messageMax;
							}else if(tmpOpt.maxTime==null&&tmpOpt.rules.minMaxTime.messageMin){
								tmpOpt.rules.minMaxTime.message = tmpOpt.rules.minMaxTime.messageMin;
							}else{
								tmpOpt.rules.minMaxTime.message = tmpOpt.rules.minMaxTime.messageDef;
							}
							if(tmpOpt.minTime!=null){
								tmpOpt.validType.minMaxTime[0] = tmpOpt.formatter.call(target,tmpOpt.parser.call(target,tmpOpt.minTime));
							}
							if(tmpOpt.maxTime!=null) {
								tmpOpt.validType.minMaxTime[1] = tmpOpt.formatter.call(target,tmpOpt.parser.call(target,tmpOpt.maxTime));
							}
						}else{
							tmpOpt.rules.minMaxTime.message = tmpOpt.rules.timeboxq.message;
						}
						var minv = tmpOpt.parser.call(target, tmpOpt.validType.minMaxTime[0]);
						var maxv = tmpOpt.parser.call(target, tmpOpt.validType.minMaxTime[1]);
						if (v>maxv || v<minv) return false;
					}
					return true;
				}, message:"Please enter a valid time.", messageDef:"Please enter a valid time : from {0} to {1}'"
			}
		}
	});
})(jQuery);