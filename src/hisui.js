/**
*IE8--- console=undefined 
*logger.level=1; // debug,info,warn,error ---print
*logger.level=2; // info,warn,error ---print
*logger.level=3; // warn,error ---print
*logger.level=4; // error ---print
*logger.debug("debug");
*logger.info("info");
*logger.warn("warn");
*logger.error("error");
*/
$URL="websys.Broker.cls";
var Level = {
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4
};
(function(){	
	if ("undefined" === typeof console){		
		var emptyFn = function(){}; 
		console = {
			log: emptyFn,
			debug: emptyFn,
			info: emptyFn,
			warn: emptyFn,
			error: emptyFn,
			assert: emptyFn,
			dir: emptyFn,
			dirxml: emptyFn,
			trace: emptyFn,
			group: emptyFn,
			groupCollapsed: emptyFn,
			time: emptyFn,
			timeEnd: emptyFn,
			profile: emptyFn,
			profileEnd: emptyFn,
			count: emptyFn,
			clear: emptyFn
		};
	}
    var Logger = function () {
        this.level = Level.ERROR; //Level.DEBUG;
    };
    Logger.prototype = {
        log: function (msg) {
            try { console.log(msg); } catch (ex) { }
        },
        debug: function (msg) {
            if (this.level <= Level.DEBUG) {
                this.log(msg);
				//console.trace();
            }
        },
        info: function (msg) {
            if (this.level <= Level.INFO) {
                this.log(msg);
            }
        },
        warn: function (msg) {
            if (this.level <= Level.WARN) {
                console.warn(msg);
				//console.trace();
            }
        },
        error: function (msg) {
            if (this.level <= Level.ERROR) {
                this.log(msg);
				console.trace();
            }
        }
	};
	logger = new Logger();
})();
/**
 * hisui---easyui 
*/
(function (a, $) {
    var HUIObject = {};
    // jquery.validatebox.js中写死了color
    $.fn.validatebox.defaults.tipOptions.onShow = function () {
    	$(this).tooltip("tip").addClass("tooltip-validatebox-invalid");
	};
	/*
	还原到最初的几个定义
	不能定义fn.x.defaults.width默认宽度。
	如有某元素定义class='hisui-combobox width110',此时组件不会去拿对应框的宽度110,而是此处定义的宽度
	*/
	
	$.fn.combo.defaults.width = 177;
	$.fn.combo.defaults.height = $.hisui.getStyleCodeConfigValue("inputHeight");
	$.fn.combobox.defaults.height = $.hisui.getStyleCodeConfigValue("inputHeight");;
	$.fn.combotree.defaults.height = $.hisui.getStyleCodeConfigValue("inputHeight");;
	$.fn.combogrid.defaults.height = $.hisui.getStyleCodeConfigValue("inputHeight");;
	$.fn.datebox.defaults.height = $.hisui.getStyleCodeConfigValue("inputHeight");;
	$.fn.datetimebox.defaults.height = $.hisui.getStyleCodeConfigValue("inputHeight");;
	$.fn.tabs.defaults.tabHeight = $.hisui.getStyleCodeConfigValue("tabHeight");;
	$.fn.filebox.defaults.height = $.hisui.getStyleCodeConfigValue("inputHeight");
	$.fn.validatebox.defaults.height = $.hisui.getStyleCodeConfigValue("inputHeight");

    /*var cardHandler = function(){
        $(".panel-header.panel-header-card,.panel-header.panel-header-card-gray").each(function(){
			var _t = $(this);
			var opts = _t.parent().panel("options");
			if ("undefined"!=opts.titleWidth){
				_t.width(headText.length*20);
			}
            var headText = _t.find(".panel-title").text();
            if (headText.length<=4){
                _t.width(80);
            }else{
                _t.width(headText.length*20);
            }
        });
	}*/
	var mo ={
		numberbox:{
			superui:'validatebox'
		}
		,spinner:{
			superui:'validatebox'
		}
		,timespinner:{
			superui:'spinner'
		}
		,numberspinner:{
			superui:'spinner'
		}
		,combo:{
			superui:'validatebox'
		},
		combobox:{
			superui:'combo'
		},
		combogrid:{
			superui:'combo'
		},
		combotree:{
			superui:'combo'
		},
		window:{
            superui:'panel'
		},
		dialog:{
			superui:'window'
		},
		datebox:{
			superui:'combo'
		}
		,datetimebox:{
			superui:'datebox'
		}
		,menubutton:{
			superui:'linkbutton'
		}
		,splitbutton:{
			superui:'menubutton'
		}
		,propertygrid:{
			superui:'datagrid'
		}
		,treegrid:{
			superui:'datagrid'
		},lookup:{  //cryze 2018-5-10  新增lookup
			superui:'comboq'
		},comboq:{
			superui:'validatebox'
		},timeboxq:{
			superui:'validatebox'
		}
		//,datagrid:{ //$.fn.datagrid.defaults=$.extend({},$.fn.panel.defaults,{...});
			//superui:'panel' 
		//}
	}
	//cryze 在combobox前增加combo
    var comps = ["draggable","droppable","resizable","pagination","tooltip","linkbutton","menu","menubutton","splitbutton","progressbar","tree","combo","combobox","combotree","combogrid","numberbox","validatebox","searchbox","numberspinner","timespinner","calendar","datebox","datetimebox","slider","layout","panel","datagrid","propertygrid","treegrid","tabs","accordion","window","dialog","checkbox","radio","switchbox",'filebox','popover','comboq','lookup','keywords','triggerbox','layoutq','dateboxq','timeboxq'];
	$.each(comps, function (index, comp) {
        //index comp ---let
        HUIObject[comp] = function (selector, options) {
            if (!selector) return;
			var jqobj = $(selector);
			// options!=undefined --> render
            if ("undefined" != typeof options) {
                jqobj[comp](options);
            }
			// {jdata:data对象, jqselect:选择器, 祖先方法名:祖先方法, 父方法名:父方法, 方法名:方法}
			var obj = $.extend({ jdata: jqobj.data(comp) }, { jqselector: selector });
			function jqmth2objmth(){

			}
			// loop祖方法
			if (mo[comp] && mo[comp].superui && mo[mo[comp].superui] && mo[mo[comp].superui].superui ){
				$.each($.fn[ mo[mo[comp].superui].superui ].methods,function(mth,f){
					// if (mth=="getValue"){
					// 	console.log(comp+"的 getValue方法，来自"+mo[comp].superui+"的父"+mo[mo[comp].superui].superui+",f="+f);
					// }
					obj[mth] = function () {
						//es6 // $.fn[comp].methods[mth](jqobj,...arguments);
						var jo = $(this.jqselector); //this --->obj
						Array.prototype.splice.call(arguments,0,0,jo);
						var rtn = f.apply(jo,arguments);
						return rtn;
					}
				});
			}
			// loop parent component method 
			if (mo[comp] && mo[comp].superui){
				$.each($.fn[ mo[comp].superui ].methods,function(mth,f){
					// if (mth=="getValue"){
					// 	console.log(comp+"的 getValue方法，来自"+mo[comp].superui+",f="+f);
					// }
					obj[mth] = function () {
						//es6 // $.fn[comp].methods[mth](jqobj,...arguments);
						var jo = $(this.jqselector); //this --->obj
						Array.prototype.splice.call(arguments,0,0,jo);
						var rtn = f.apply(jo,arguments);
						return rtn;
					}
				});
			}
			// loop component method
			$.each($.fn[comp].methods, function(mth,f){
                obj[mth] = function () {
                    //es6 // $.fn[comp].methods[mth](jqobj,...arguments);
					var jo = $(this.jqselector); //this --->obj
					Array.prototype.splice.call(arguments,0,0,jo);
					var rtn = f.apply(jo,arguments);
					return rtn;
					/*
                    var param = [];
                    param.push(jo);
                    for (var j=0;j<arguments.length;j++){
                        param.push(arguments[j]);
					}
					//f.apply(jo,Array.prototype.slice.call(arguments))
                    var rtn = f.apply(jo, param); //$.fn[comp].methods[mth]
                    return rtn;*/
                }
			});
            return obj;
        }
    });
    /* 
    for(var c=0;c<comps.length;c++){
        var comp = comps[c];
        HUI.prototype[comp]=(function(comp){
            return function(selector,options){
                        if (!selector) return;
                        var jqobj = $(selector);
                        if ("undefined"!=typeof options){
                            jqobj[comp](options);
                        }		
                        var obj = $.extend({jdata:jqobj.data(comp)},{jqselector:selector});
                        for (var m in $.fn[comp].methods){ 
                            // let--var ; let时可以不用闭包返回
                            obj[m]=(function ($,mth){
                                return function(){
                                //es6 // $.fn[comp].methods[mth](jqobj,...arguments);
                                var jo = $(this.jqselector); //this --->obj
                                var param = [];
                                param.push(jo);
                                for (var j =0;j<arguments.length;j++){
                                    param.push(arguments[j]);
                                }
                                var rtn = $.fn[comp].methods[mth].apply(jo, param);
                                return rtn;
                            }
                        })(jQuery,m);
                        }
                        return obj;
                    }
        })(comp); 
    }	*/
    a.$HUI = HUIObject ; //$.extend(new HUI(), HUIObject);
    /*$.parser.onComplete = function(context){
        //cardHandler();
        // 第一次context为undefined,不为空跳出.
        if (!!context) return ;
        $("#Loading").fadeOut("fast");
        //ShowDHCMessageCount();
    }*/
})(window, jQuery);
$(function(){
	// $('body').click(function(e){
	// 	/*点击其它非弹出层时隐藏*/
	// 	var c = $(e.target).closest($.hisui.globalContainerSelector);
	// 	if (c.length==0){
	// 		$($.hisui.globalContainerSelector).hide();
	// 	}
	// });
	$(document.body).on('keydown',function(e){
		var keycode = e.keyCode;
		try{
			if (e.altKey&&keycode==37){ //alt + [<-]
				e.preventDefault(); return false;	
			}
			if (keycode == 8) {
				if (document.designMode == 'on') return ;  /* 3133203 见backspace.edit.html*/
				var srcEl = e.target;
				if ($(srcEl).prop('contenteditable')) return ; /* 3034765 editor编辑器使用了*/
				var srcElementTag = srcEl.tagName.toUpperCase();
				if ($(srcEl).prop('readonly')){ e.preventDefault(); return false;}
				if (srcElementTag=="INPUT"){
					var scrElementType = srcEl.type.toUpperCase();
					if (scrElementType=="CHECKBOX"){
						e.preventDefault();return false;
					}
					if (scrElementType=="RADIO"){
						e.preventDefault();return false;
					}
				}
				//2018-1-24 list上backspace,&&(srcElementTag!=="SELECT")
				if ((srcElementTag!=="INPUT")&&(srcElementTag!=="TEXTAREA")){
					e.preventDefault();return false;
				}
			}
		}catch(e){}
		return true;
	});
});