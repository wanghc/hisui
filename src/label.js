(function ($) {
  function init (target){
	var status = $.data(target,'label');
	var opts = status.options;
	var _t = $(target);
	var txt = _t.text();
	if (!opts.notTrans){
		txt =  $.hisui.getTrans(txt);
		_t.text(txt);
	}
	
	_t.addClass('f-label')
	if (opts.styleCss!="") _t.addClass(opts.styleCss);
	if (opts.required) _t.addClass('required-label');
  };
  
  $.fn.label = function (opts, params) {
		if (typeof opts == "string") {
			return $.fn.label.methods[opts](this, params);
		}
		opts = opts || {};
		return this.each(function () {
			var state = $.data(this, "label");
			if (state) {
				$.extend(state.options, opts);
			} else {
				$.data(this, "label", { options: $.extend({}, $.fn.label.defaults, $.fn.label.parseOptions(this), opts) });
			}
			init(this);
		});
	};

	$.fn.label.methods = {
		options: function (jq) {
			return $.data(jq[0], "label").options;
		}
	};	
	$.fn.label.parseOptions = function (target) {
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, ["text","styleCss","styleCss","required","refInputId","notTrans"]));
	};
	$.fn.label.defaults = {
		styleCss:"r-label",  // 默认右边带10px间距
		required:false,  // 是否必填, 如果是则带红星符号
		refInputId:null, // 关联的输入框Id
		notTrans:false   // 不自动翻译
	};
})(jQuery);