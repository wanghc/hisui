(function($){
	function _mouse2Right(e,t){
		var mouseX = e.pageX;
		/*var e = event || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		var x = e.pageX || e.clientX + scrollX;
		var y = e.pageY || e.clientY + scrollY;*/
		var boxWidth = $(t)._outerWidth();
		var xy = $(t).offset(); 
		if (mouseX < xy.left+boxWidth && mouseX>(xy.left+boxWidth-40)){
			return true;
		}
		return false;
	}
	function _hide(){
		$($.hisui.globalContainerSelector).hide();
	}
	function createBox(target){
		var state = $.data(target, 'dateboxq');
		var opts = state.options;
		var _t = $(target);
		_t.addClass('dateboxq');
		if (opts.disabled || opts.readOnly){
			_t.addClass('disabled');
		}
		_t.validatebox(opts);
		_t.unbind('.dateboxq').bind('mousemove.dateboxq',function(e){
			if ($(this).hasClass('disabled')) return ;
			if(_mouse2Right(e,this)){
				this.style.cursor = "pointer";
			}else{
				this.style.cursor = "auto";
			}
		}).bind('mouseleave.dateboxq',function(){
			this.style.cursor = "auto";
		}).bind('click.dateboxq',function(e){
			if ($(this).hasClass('disabled')) return ;
			if (_mouse2Right(e,this)){
				e.preventDefault();
				e.stopPropagation();
				createCalendar(target);
				return false;
			}
		}).bind('blur.dateboxq',function(e){
			opts.onBlur.call(this,target);
		});
		return ;
	}
	function createCalendar(target){
		var _t = $(target);
		var panel = $($.hisui.globalContainerSelector); /*全局固定div*/
		if (panel.length){
			panel.empty();
		}else{
			panel = $('<div id="'+$.hisui.globalContainerId+'"></div>').appendTo('body');
		}
		var opts = $.data(target,"dateboxq").options;
		var txt = _t.val();
		var cur = opts.parser.call(target,txt);
		var offset = _t.offset();
		panel.show();
		panel.offset({top:offset.top+_t._outerHeight(),left:offset.left});
		$('<div></div>').appendTo(panel).calendar({
			current: cur,
			onSelect: function(date){
				var opts = $(target).dateboxq('options');
				setValue(target,opts.formatter.call(target, date));
				panel.hide();
			}
		});
		var button = $('<div class="datebox-button"><table cellspacing="0" cellpadding="0" style="width:100%"><tr></tr></table></div>').appendTo(panel);
		var tr = button.find('tr');
		for(var i=0; i<opts.buttons.length; i++){
			var td = $('<td></td>').appendTo(tr);
			var btn = opts.buttons[i];
			var t = $('<a href="javascript:void(0)"></a>').html($.isFunction(btn.text) ? btn.text(target) : btn.text).appendTo(td);
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
			if(hidePanel) _hide();
		}
	}
	function doBlur(target){
		if ($(target).validatebox("isValid")) {
			doEnter(target,false);
		}
	}
	function setDisabled(target,value){
		if (value) {
			$(target).addClass('disabled');
		}else{
			$(target).removeClass('disabled');
		}
	}
	function getValue(target){
		return $(target).val();
	}
	function setValue(target, value, remainText){
		var state = $.data(target,'dateboxq');
		var opts = state.options;
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
				return this.validatebox(options, param);
			}
		}
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'dateboxq');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'dateboxq', {
					options: $.extend({
						parser:$.fn.datebox.defaults.parser,
						formatter:$.fn.datebox.defaults.formatter,
						currentText:$.fn.datebox.defaults.currentText,
						closeText:$.fn.datebox.defaults.closeText,
						okText:$.fn.datebox.defaults.okText,
					}, $.fn.dateboxq.defaults, $.fn.dateboxq.parseOptions(this), options)
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
		setDisabled:function(jq,value){
			return jq.each(function () {
                setDisabled(this, value);
            });
		}
	};	
	$.fn.dateboxq.parseOptions = function(target){
		return $.extend({}, $.fn.validatebox.parseOptions(target), $.parser.parseOptions(target));
	};
	$.fn.dateboxq.defaults = $.extend({}, $.fn.validatebox.defaults, {
		disabled:false,
		readOnly:false,
		buttons:[{
			text: function(target){return $(target).dateboxq('options').currentText;},
			handler: function(target){
				$(target).val('t');
				doEnter(target);
			}
		},{
			text: function(target){return $(target).dateboxq('options').closeText;},
			handler: function(target){
				$($.hisui.globalContainerSelector).hide();
			}
		}],
		onBlur:function(target){
			doBlur(target);
		},
        onSelect:function(date){},
		validType:['datebox["YMD"]','minMaxDate[null,null]'],
		minDate:null,
		maxDate:null
	});
})(jQuery);
