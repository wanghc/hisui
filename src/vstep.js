(function ($) {
	//基础框架
	var baseHtml = "<div class='vstep-container'>"+
        "<ul class='vstep-container-steps'>"+
        "</ul>"+
        "<div class='vstep-progress'>"+
          "<p class='vstep-progress-bar'>"+
            "<span class='vstep-progress-highlight' style='height:0%'>"+
            "</span>"+
          "</p>"+
        "</div>"+
      "</div>";
    //步骤框架
    // data-container='body' data-toggle='popover' data-placement='top' data-title='' data-content='' data-trigger='hover'
    var stepHtml = "<li class='vstep-step undone'></li>";
	function _getStep(target){
		var ind = getStepInd(target);
		var status = $.data(target,'vstep');
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
		var status = $.data(target,'vstep');
		var opts = status ? status.options : {};
		var $steps = $(target).find(".vstep-container").find("li");
		var $progress =$(target).find(".vstep-container").find(".vstep-progress-highlight");
		var curInd = getStepInd(target);
		step = step||0;
		if(step!==0) ind = parseInt(curInd)+parseInt(step);
		if(1<=ind && ind<=$steps.length){
			//切换节点前触发，返回false阻止切换（节点未变化时不触发）
			var isSameInd = curInd && parseInt(curInd,10)===parseInt(ind,10);
			if(!isSameInd && curInd && opts.onBeforeSelect && opts.onBeforeSelect.call(target,ind,opts.items[ind-1]) === false) return;
			var scale = "%";
			scale = Math.round((ind-1)*100/($steps.length-1))+scale;
			$progress.animate({ height: scale },{
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
	function reSize ($html,stepHeight){
		var stepCount = $html.find("li").length-1,
		containerHeight = (stepCount*stepHeight+stepHeight)+"px",
		progressHeight = (stepCount*stepHeight)+"px";
		$html.css({
			height: containerHeight
		});
		$html.find(".vstep-progress").css({
			height: progressHeight
		});
		$html.find(".vstep-progress-bar").css({
			height: progressHeight
		});
	};
  function init (target){
	var status = $.data(target,'vstep');
	var opts = status.options;
	var $baseHtml = $(baseHtml),
    $stepHtml = $(stepHtml),
    $hstepContainerSteps = $baseHtml.find(".vstep-container-steps"),
    arrayLength = 0,
	$target = $(target);
	if ($target.hasClass('vstep')){
		$target.empty();
	}
	$target.addClass('vstep');
	$baseHtml.addClass('vstep-lg').width($target.width());
    var items = opts.items;
    var isBtt = opts.direction === "btt";
	arrayLength = items.length;
	for(var i=0;i<arrayLength;i++){
		//反向展示时，节点按倒序渲染，节点序号保持不变
		var _i = isBtt ? arrayLength-1-i : i;
		var _s = items[_i];
		$stepHtml.css("height",opts.stepHeight).attr('ind',1+parseInt(_i)).append('<div class="cnode">'+(opts.showNumber?(_i+1):"")+'</div>').append('<span class="title">'+_s.title+"</span>");
		if (_s.context) $stepHtml.append(_s.context);
		$hstepContainerSteps.append($stepHtml);
		$stepHtml = $(stepHtml); //重置步骤，拿到源生step
	}
	reSize($baseHtml,opts.stepHeight);
	if (isBtt){
		//从下往上展示时，节点从底部开始排列，进度从底部节点开始增长
		var stepHeight = parseFloat(opts.stepHeight) || 0;
		$baseHtml.addClass('vstep-btt');
		$baseHtml.find('.vstep-container-steps').css({top:'auto',bottom:'2px'});
		//底部节点对齐进度条底端（相对底部节点的圆点中心）
		$baseHtml.find('.vstep-progress').css({top:'auto',bottom:(stepHeight-18)+'px'});
		$baseHtml.find('.vstep-progress-bar').css('position','relative');
		//绝对定位的空白span需同时指定left/right，否则宽度会被压缩为0
		$baseHtml.find('.vstep-progress-highlight').css({position:'absolute',left:'0px',right:'0px',bottom:'0px'});
	}
    //插入到容器中
    $target.append($baseHtml);
    //默认执行第一个步骤
	_setStep(target,opts.currentInd);
	$(target).unbind('.vstep').bind('click.vstep',function(e){
		var $li = $(e.target).closest('li');
		$li.closest('.vstep-container-steps').children('li').removeClass('hover clicked');
		$li.addClass('hover clicked');
		if($li.length>0 && opts.onSelect){
			var _item = opts.items[$li.attr('ind')-1];
			_item.state = $li.hasClass('done')?"done":($li.hasClass('active')?"active":'undone');
			opts.onSelect.call(this,$li.attr('ind'),_item);
		}
	});
  };
  
  $.fn.vstep = function (opts, params) {
		if (typeof opts == "string") {
			return $.fn.vstep.methods[opts](this, params);
		}
		opts = opts || {};
		return this.each(function () {
			var state = $.data(this, "vstep");
			if (state) {
				$.extend(state.options, opts);
			} else {
				$.data(this, "vstep", { options: $.extend({}, $.fn.vstep.defaults, $.fn.vstep.parseOptions(this), opts) });
			}
			init(this);
		});
	};

	$.fn.vstep.methods = {
		options: function (jq) {
			return $.data(jq[0], "vstep").options;
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
	$.fn.vstep.parseOptions = function (_441) {
		var t = $(_441);
		return $.extend({}, $.parser.parseOptions(_441, ["showNumber","stepHeight","titlePostion","direction"]));
	};
	$.fn.vstep.defaults = {
		currentInd:1,showNumber:false,stepHeight:60, titlePostion:"top",direction:"ttb",items:[],onSelect:null,onBeforeSelect:null
	};
})(jQuery);