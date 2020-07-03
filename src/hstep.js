(function ($) {
	//基础框架
	var baseHtml = "<div class='hstep-container'>"+
        "<ul class='hstep-container-steps'>"+
        "</ul>"+
        "<div class='hstep-progress'>"+
          "<p class='hstep-progress-bar'>"+
            "<span class='hstep-progress-highlight' style='width:0%'>"+
            "</span>"+
          "</p>"+
        "</div>"+
      "</div>";
    //步骤框架
    // data-container='body' data-toggle='popover' data-placement='top' data-title='' data-content='' data-trigger='hover'
    var stepHtml = "<li class='hstep-step undone'></li>";
	function _getStep(target){
		var ind = getStepInd(target)-1;
		var status = $.data(target,'hstep');
		var opts = status.options;
		if (ind>0) return opts.items[ind-1];
		return {};
	};
	function getStepInd(target){
		var curInd = $(target).find('.active').attr('ind');
		return curInd;
	};
	/**
	 * @param {HTMLDocument} target 
	 * @param {Number} ind   跳到指定的位置,开始于1
	 * @param {Number} step  向前1或向后-1
	 */	  
	function _setStep(target,ind,step) {
		var $steps = $(target).find(".hstep-container").find("li");
		var $progress =$(target).find(".hstep-container").find(".hstep-progress-highlight");
		var curInd = getStepInd(target);
		step = step||0;
		if(step!==0) ind = parseInt(curInd)+parseInt(step);
		if(1<=ind && ind<=$steps.length){
			var scale = "%";
			scale = Math.round((ind-1)*100/($steps.length-1))+scale;
			$progress.animate({ width: scale },{
				speed: 1000,
				done: function() {
				$steps.each(function(j,m){
					var _$m = $(m);
					var _j = j+1;
					if(_j < ind){
						_$m.attr("class","done");
					}else if(_j === ind){
						_$m.attr("class","active");
					}else if(_j > ind){
						_$m.attr("class","undone");
					}
				});
				}
			});
		}
	};
	function reSize ($html,stepWidth){
		var stepCount = $html.find("li").length-1,
		containerWidth = (stepCount*stepWidth+stepWidth)+"px",
		progressWidth = (stepCount*stepWidth)+"px";
		$html.css({
			width: containerWidth
		});
		$html.find(".hstep-progress").css({
			width: progressWidth
		});
		$html.find(".hstep-progress-bar").css({
			width: progressWidth
		});
	};
  function init (target){
	var status = $.data(target,'hstep');
	var opts = status.options;
	var $baseHtml = $(baseHtml),
    $stepHtml = $(stepHtml),
    $hstepContainerSteps = $baseHtml.find(".hstep-container-steps"),
    arrayLength = 0,
	$target = $(target);
	$target.addClass('hstep');
	$baseHtml.addClass('hstep-lg');
    var items = opts.items;
	arrayLength = items.length;
	for(var i=0;i<arrayLength;i++){
		var _s = items[i];
		$stepHtml.css("width",opts.stepWidth).attr('ind',1+parseInt(i)).text(_s.title).append('<div class="cnode">'+(opts.showNumber?(i+1):"")+'</div>');
		if (_s.context) $stepHtml.append(_s.context);
		$hstepContainerSteps.append($stepHtml);
		$stepHtml = $(stepHtml); //重置步骤，拿到源生step
	}
	reSize($baseHtml,opts.stepWidth);
    //插入到容器中
    $target.append($baseHtml);
    //默认执行第一个步骤
	_setStep(target,opts.currentInd);
	$(target).unbind('.hstep').bind('click.hstep',function(e){
		var $li = $(e.target).closest('li');
		if(opts.onSelect){
			var _item = opts.items[$li.attr('ind')-1];
			_item.state = $li.hasClass('done')?"done":($li.hasClass('active')?"active":'undone');
			opts.onSelect.call(this,$li.attr('ind'),_item);
		}
	});
  };
  
  $.fn.hstep = function (opts, params) {
		if (typeof opts == "string") {
			return $.fn.hstep.methods[opts](this, params);
		}
		opts = opts || {};
		return this.each(function () {
			var state = $.data(this, "hstep");
			if (state) {
				$.extend(state.options, opts);
			} else {
				$.data(this, "hstep", { options: $.extend({}, $.fn.hstep.defaults, $.fn.hstep.parseOptions(this), opts) });
			}
			init(this);
		});
	};

	$.fn.hstep.methods = {
		options: function (jq) {
			return $.data(jq[0], "hstep").options;
		}, destroy: function (jq) {
			return jq.each(function () {
				//_41f(this);
			});
		}, setStep:function(jq,value,step){
			return jq.each(function () {
				_setStep(this,value,step);
			});
		},nextStep: function (jq) {
			return jq.each(function () {
				_setStep(this,undefined,1);
			});
		}, prevStep: function (jq) {
			return jq.each(function () {
				_setStep(this,undefined,-1);
			});
		}, getStep:function(jq){
			if (jq.length>0) return _getStep(jq[0]);
			return {};
		}
	};	
	$.fn.hstep.parseOptions = function (_441) {
		var t = $(_441);
		return $.extend({}, $.parser.parseOptions(_441, ["showNumber","stepWidth","titlePostion"]));
	};
	$.fn.hstep.defaults = {
		currentInd:1,showNumber:false,stepWidth:100, titlePostion:"top",items:[],onSelect:null
	};
})(jQuery);