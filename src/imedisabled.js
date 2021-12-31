/**
 * 禁用输入
 * $("#mytest").imedisabled({});
*/
(function ($) {
  var baseHtml = '<input id="imedisabled_password_input" type="password" style="width: 1px; height: 1px; position: absolute; border: 0px; padding: 0px;">';
  function init (target){
      	var status = $.data(target, 'imedisabled');
	  	var opts = status.options;
	  	if (!!window.ActiveXObject || "ActiveXObject" in window) {
			$(target).css({ imeMode: 'disabled'});  
		}else  {
			var $pwdInput = $("#imedisabled_password_input");
			if ($pwdInput.length == 0) { $(target).after(baseHtml); }
			var disabledIME = function (event) {
				//event.stopPropagation();
				document.getElementById('imedisabled_password_input').focus();
				$(this).focus();
				$(this).one('focus', disabledIME);
			};
			$(target).one(opts.imeEventType, disabledIME);
		}
  };
  
  $.fn.imedisabled = function (opts, params) {
		if (typeof opts == "string") {
			return $.fn.imedisabled.methods[opts](this, params);
		}
		opts = opts || {};
		return this.each(function () {
			var state = $.data(this, "imedisabled");
			if (state) {
				$.extend(state.options, opts);
			} else {
				$.data(this, "imedisabled", { options: $.extend({}, $.fn.imedisabled.defaults, $.fn.imedisabled.parseOptions(this), opts) });
			}
			init(this);
		});
	};

	$.fn.imedisabled.methods = {
		options: function (jq) {
			return $.data(jq[0], "imedisabled").options;
		}, destroy: function (jq) {
			return jq.each(function () {
				//_41f(this);
			});
		}
	};	
	$.fn.imedisabled.parseOptions = function (target) {
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, ["imeEventType"]));
	};
	$.fn.imedisabled.defaults = {
		imeEventType: 'focus'
	};
})(jQuery);