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
		var status = $.data(target,'hstep');
		var opts = status ? status.options : {};
		var $steps = $(target).find(".hstep-container").find("li");
		var $progress =$(target).find(".hstep-container").find(".hstep-progress-highlight");
		var curInd = getStepInd(target);
		step = step||0;
		if(step!==0) ind = parseInt(curInd)+parseInt(step);
		if(1<=ind && ind<=$steps.length){
			//切换节点前触发，返回false阻止切换（节点未变化时不触发）
			var isSameInd = curInd && parseInt(curInd,10)===parseInt(ind,10);
			if(!isSameInd && curInd && opts.onBeforeSelect && opts.onBeforeSelect.call(target,ind,opts.items[ind-1]) === false) return;
			var scale = "%";
			scale = Math.round((ind-1)*100/($steps.length-1))+scale;
			$progress.animate({ width: scale },{
				speed: 1000,
				done: function() {
				$steps.each(function(){
					var _$m = $(this);
					var _j = parseInt(_$m.attr("ind"),10);
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
    var isRtl = opts.direction === "rtl";
	arrayLength = items.length;
	for(var i=0;i<arrayLength;i++){
		//反向展示时，节点按倒序渲染，节点序号保持不变
		var _i = isRtl ? arrayLength-1-i : i;
		var _s = items[_i];
		$stepHtml.css("width",opts.stepWidth).attr('ind',1+parseInt(_i)).append('<span class="title">'+_s.title+'</span>').append('<div class="cnode">'+(opts.showNumber?(_i+1):"")+'</div>');
		if (_s.context) $stepHtml.append(_s.context);
		$hstepContainerSteps.append($stepHtml);
		$stepHtml = $(stepHtml); //重置步骤，拿到源生step
	}
	reSize($baseHtml,opts.stepWidth);
	if (isRtl){
		//从右往左展示时，进度从右侧开始增长
		$baseHtml.addClass('hstep-rtl');
		$baseHtml.find('.hstep-progress-bar').css('position','relative');
		$baseHtml.find('.hstep-progress-highlight').css({position:'absolute',top:'0px',right:'0px'});
	}
    //插入到容器中
    $target.append($baseHtml);
    //默认执行第一个步骤
	_setStep(target,opts.currentInd);
	$(target).unbind('.hstep').bind('click.hstep',function(e){
		var $li = $(e.target).closest('li');
		$li.closest('.hstep-container-steps').children('li').removeClass('hover clicked');
		$li.addClass('hover clicked');
		if($li.length>0 && opts.onSelect){
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
		return $.extend({}, $.parser.parseOptions(_441, ["showNumber","stepWidth","titlePostion","direction"]));
	};
	$.fn.hstep.defaults = {
		currentInd:1,showNumber:false,stepWidth:100, titlePostion:"top",direction:"ltr",items:[],onSelect:null,onBeforeSelect:null
	};
})(jQuery);