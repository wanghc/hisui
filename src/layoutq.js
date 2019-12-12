/*耗时-->28ms*/
(function ($) {
    function _fit(t){
        // 让html高度100%
        var toffset = t._fit();
        var p = (t[0].tagName == "BODY" ? t[0] : t.parent()[0]);
        var heightPadding = 0;
        if (p.tagName=='BODY') { //html=panel-fit,height:100%取到的高度没算padding
            heightPadding = parseFloat(p.style.paddingTop||0) + parseFloat(p.style.paddingBottom||0); 
        }
        return { width: toffset.width, height: toffset.height - heightPadding };
    }
    /*包含5方布局所有配置*/
    function regionResize (t){
        var layoutCfg = $.data(t, "layoutq");
        var layoutOpts = layoutCfg.options;
        var o = $(t);
        $.extend(layoutOpts, _fit(o)) ;
        var westObj = o.find(">div.layoutq-west");
        var eastObj = o.find(">div.layoutq-east");
        var northObj = o.find('>div.layoutq-north');
        var southObj = o.find('>div.layoutq-south');
        var centerHeight = layoutCfg.options.height ;
        var centerWidth = layoutCfg.options.width ;
        
        if (northObj.length>0){
            centerHeight -= layoutCfg['north'].height;
        }
        if(southObj.length>0){
            centerHeight -= layoutCfg['south'].height
        }
        var westBorderWidth = 0;
        if (westObj.length>0){
            centerWidth -= layoutCfg['west'].width;
            westBorderWidth += parseFloat(westObj[0].style.borderLeftWidth||0) + parseFloat(westObj[0].style.borderRightWidth||0);
            
        }
        var eastBorderWidth = 0;
        if (eastObj.length>0){
            centerWidth -= layoutCfg['east'].width;
            eastBorderWidth = parseFloat(eastObj[0].style.borderLeftWidth||0) + parseFloat(eastObj[0].style.borderRightWidth||0);
            
        }
        o.find(">div.layoutq-center")._outerHeight(centerHeight)._outerWidth(centerWidth-westBorderWidth-eastBorderWidth);
        if (westObj.length>0) westObj._outerHeight(centerHeight);
        if (eastObj.length>0) eastObj._outerHeight(centerHeight);
        //$(divList[i]).triggerHandler("_resize", [true]);

        var divList = t.getElementsByTagName("div");
        for(var i=0; i<divList.length; i++) {
            var classNameArr = divList[i].className.split(' ');
            for(var j=0;j<classNameArr.length;j++){
                if (classNameArr[j]=='panel' 
                || classNameArr[j]=='accordion'
                || classNameArr[j]=='tabs-container'
                || classNameArr[j]=='layout'){
                    if(divList[i].style && divList[i].style.display!='none'){
                        $(divList[i]).triggerHandler("_resize", [true]);
                    }
                }
            }
        }

        // var ps = $(t).find('>div.layoutq-east,>div.layoutq-south,>div.layoutq-west,>div.layoutq-north,>div.layoutq-center');
        // ps.find('>div.panel').filter(':visible').each(function(){
        //     $(this).triggerHandler("_resize", [true]);
        // });
    }
    function init(target) {
        var cc = $(target);
        var layoutCfg = $.data(target, "layoutq");
        cc.addClass("layoutq");
        cc.children("div").each(function () {
            var _t = $(this);
            var evalOpt = _t.data('options')||"";
            eval("var obj = ({"+evalOpt+"})");
            var opts = {'region':obj['region'],height:0,width:0};
            if ("north,south,east,west,center".indexOf(opts.region) >= 0) {
                layoutCfg[opts.region] = opts;
                if (opts.region=='north' || opts.region=='south'){
                    layoutCfg[opts.region].height = _t._outerHeight();
                }
                if(opts.region=='east' || opts.region=='west'){
                    layoutCfg[opts.region].width = _t._outerWidth();
                }
                $(this).addClass('layoutq-'+opts.region);
                if(opts.title){ //不解析title 在layout中加入panel就可以实现
                    //$(this).prepend('<div class="layoutq-header">'+opts.title+'</div>');
                }
            }
        });
        regionResize(target);
        cc.bind('_resize',function(){
            regionResize(target);
        });
    };
    $.fn.layoutq = function (_39c, _39d) {
        if (typeof _39c == "string") {
            return $.fn.layoutq.methods[_39c](this, _39d);
        }
        _39c = _39c || {};
        return this.each(function () {
            var _39e = $.data(this, "layoutq");
            if (_39e) {
                $.extend(_39e.options, _39c);
            } else {
                var opts = $.extend({}, $.fn.layoutq.defaults, _39c);
                $.data(this, "layoutq", { options: opts });
                init(this);
            }
        });
    };
    $.fn.layoutq.methods = {
        resize: function (jq) {
            return jq.each(function () {
                regionResize(this);
            });
        }
    };
    var TO = false;
    var _223 = true;
    $(window).unbind(".layoutq").bind("resize.layoutq", function () {
        if (!_223) {
            return;
        }
        if (TO !== false) {
            clearTimeout(TO);
        }
        TO = setTimeout(function () {
            _223 = false;
            var _224 = $("body.layoutq");
            if (_224.length) {
                _224.layoutq("resize");
            } else {
                /*wanghc 2019-11-10 增加each. 否则只执行children->[0]的_resize*/
                $("body").children("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,div.layoutq:visible").each(function(){
                    $(this).triggerHandler("_resize");
                });
            }
            _223 = true;
            TO = false;
        }, 200);
    });
    /*$.fn.layoutq.parseOptions = function (target) {
        return $.extend({}, $.parser.parseOptions(target, [{ fit: "boolean" },'width','height']));
    };*/
    //add by wanghc 增加点击侧边收起块，展开侧边 2018-05-17
    $.fn.layoutq.defaults = { fit: false };
    /*$.fn.layoutq.parsePanelOptions = function (_3a5) {
        var t = $(_3a5);
        return $.extend({}, $.parser.parseOptions(_3a5, ["region","width","height"]));
    };*/
})(jQuery);