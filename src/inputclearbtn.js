(function ($) {
	$.parser.plugins.push("inputclearbtn");
	function _init(target) {
        var state = $.data(target, 'inputclearbtn');
        var opts = state.options;
		var _t = $(target);
		if (_t.hasClass('searchbox-f')) {
			_t.next().find('input').addClass('inputclearbtn-f');	
		} else if (_t.hasClass('triggerbox-f')) {
			_t.next().find('input').addClass('inputclearbtn-f');	
		} else if (_t.hasClass('combo-f')) {
			_t.next().find('input').addClass('inputclearbtn-f');	
		} else if (_t.hasClass('filebox-f')) {
			_t.next().find('input').addClass('inputclearbtn-f');
		} else {
			_t.addClass('inputclearbtn-f');
		}
		var clearBtn = $('.z-q-clearbtn');
		if (clearBtn.length == 0) {
			clearBtn = $('<span class="z-q-clearbtn"><i class="z-q-clearbtnicon">&nbsp;</i></span>').appendTo('body');
			$(document.body).delegate('input.inputclearbtn-f', 'mouseenter.inputclearbtn focus.inputclearbtn', function (e) {
				if ("" !== e.target.value) {
					var btn = $('.z-q-clearbtn');
					if (btn.length == 0) {
						btn = $('<span class="z-q-clearbtn"><i class="z-q-clearbtnicon">&nbsp;</i></span>').appendTo('body');
					}
					var srct = e.target;
					var _input = $(srct);
					var w = _input.outerWidth();
					var h = _input.outerHeight();
					var offset = _input.offset();
					var l = offset.left + w - 22;
					var t = offset.top + h / 2 - 8;
					if (_input.hasClass('comboq') || _input.hasClass('validatebox-invalid')) {
						l -= 22;  /*不与原有图标重叠*/
					}
					btn.css({ top: t, left: l, display: 'block', fontSize: '10px', position: 'absolute' });
					btn.bind('click.inputclearbtn', function (e) {
						var originInput = srct,cmpname="";
						if (_input.hasClass('searchbox-text')) {
							originInput = $(srct).parent().prev()[0];
							cmpname = 'searchbox';
						}
						if (_input.hasClass('triggerbox-text')) {
							originInput = $(srct).parent().prev()[0];
							cmpname = 'triggerbox';
						}
						if ($(srct).hasClass('numberbox-f')) {
							originInput = srct;
							cmpname = 'numberbox';
						}
						if (_input.hasClass('combo-text')) {
							originInput = $(srct).parent().prev()[0];
							if ($(originInput).hasClass('datetimebox-f')) {
								cmpname = 'datetimebox';
							} else if($(originInput).hasClass('datebox-f')) {
								cmpname = 'datebox';
							} else if ($(originInput).hasClass('combobox-f')) {
								cmpname = 'combobox';
							} else {
								cmpname = 'combo';
							}
						}
						var state = $.data(originInput, 'inputclearbtn');
						if (state) {
							var opts = state.options;
							if (opts.onClearBefore) {
								opts.onClearBefore.call(originInput, _input.val());
							}
						}
						
						if (cmpname!="") {
							if (cmpname=='combo') {
								$.fn[cmpname].methods.clear($(originInput));
							} else {
								$.fn[cmpname].methods.setValue($(originInput), "");
							}
						} else {
							_input.val('');
							_input.focus();
						}
						btn.hide();
						if (opts && opts.onClearAfter) {
							opts.onClearAfter.call(srct,_input.val());
						}
					})
				}
			}).delegate('input.inputclearbtn-f', 'mouseleave.inputclearbtn blur.inputclearbtn', function (e) {
				if ($(e.toElement).hasClass('z-q-clearbtn') || $(e.toElement).hasClass('z-q-clearbtnicon')) {
					return;
				}
				var btn = $('.z-q-clearbtn');
				if (btn.length > 0) {
					btn.hide();
					btn.unbind('.inputclearbtn');
				}
			});
		}
    }	
	$.fn.inputclearbtn = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.inputclearbtn.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.inputclearbtn(options, param);
			}
		}
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'inputclearbtn');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'inputclearbtn', {
					options: $.extend({}, $.fn.inputclearbtn.parseOptions(this), options)
				});
			}
			_init(this);
		});
	};
	
	$.fn.inputclearbtn.methods = {
		options: function(jq){
			return $.data(jq[0], 'inputclearbtn').options;
		},
		show: function(jq){
			return jq.each(function(){
				_show(this);
			});
		},
		hide:function(jq){
			return jq.each(function(){
				_hide(this);
			});
		}
	};	
	$.fn.inputclearbtn.parseOptions = function(target){
		return $.extend({}, $.parser.parseOptions(target));
	};
    $.fn.inputclearbtn.defaults = $.extend({}, {
        clearCls: 'default',
        clearBtnRight: 10,
        clearBtnTop: 20,
        onClearBefore: null,
        onClearAfter:null
	});
})(jQuery);