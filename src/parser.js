/**
 * jQuery HISUI 0.1.0
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */
 (function ($) {
    /**
     * 用于替换:visible选择器，因为:visible不包含width=0,height=0的元素。
     * 棉花【可见】及【width与height】都为0的元素
     * @author wanghc
     * @param {Node} elem 
     * @returns boolean
     */
    $.expr.pseudos.visibleOrZeroSize = function(elem) {
        // 判断自己不是 display: none
        if ($(elem).css("display") === "none") {
            return false;
        }
        // 检查所有祖先节点，是否有 display: none
        var hasHiddenParent = $(elem).parents().filter(function() {
            return $(this).css("display") === "none";
        }).length > 0;
        // 如果祖先中有隐藏的，则也不选中
        return !hasHiddenParent;
    };
    /*-----1.5.js--jquery.parser.js--method-----start---*/
    $.hisui = {
		/**
		 * Get the index of array item, return -1 when the item is not found.
		 */
		indexOfArray: function(a, o, id){
			for(var i=0,len=a.length; i<len; i++){
				if (id == undefined){
					if (a[i] == o){return i;}
				} else {
					if (a[i][o] == id){return i;}
				}
			}
			return -1;
		},
		/**
		 * Remove array item, 'o' parameter can be item object or id field name.
		 * When 'o' parameter is the id field name, the 'id' parameter is valid.
		 */
		removeArrayItem: function(a, o, id){
			if (typeof o == 'string'){
				for(var i=0,len=a.length; i<len; i++){
					if (a[i][o] == id){
						a.splice(i, 1);
						return;
					}
				}
			} else {
				var index = this.indexOfArray(a,o);
				if (index != -1){
					a.splice(index, 1);
				}
			}
		},
		/**
		 * Add un-duplicate array item, 'o' parameter is the id field name, if the 'r' object is exists, deny the action.
		 */
		addArrayItem: function(a, o, r){
			var index = this.indexOfArray(a, o, r ? r[o] : undefined);
			if (index == -1){
				a.push(r ? r : o);
			} else {
				a[index] = r ? r : o;
			}
		},
		getArrayItem: function(a, o, id){
			var index = this.indexOfArray(a, o, id);
			return index==-1 ? null : a[index];
		},
		forEach: function(data, deep, callback){
			var nodes = [];
			for(var i=0; i<data.length; i++){
				nodes.push(data[i]);
			}
			while(nodes.length){
				var node = nodes.shift();
				if (callback(node) == false){return;}
				if (deep && node.children){
					for(var i=node.children.length-1; i>=0; i--){
						nodes.unshift(node.children[i]);
					}
				}
			}
        }
        ,debounce:function(func, wait, immediate) { //增加防抖
            var timeout, result;
            var debounced = function () {
                var context = this;
                var args = arguments;
        
                if (timeout) clearTimeout(timeout);
                if (immediate) {
                    // 如果已经执行过，不再执行
                    var callNow = !timeout;
                    timeout = setTimeout(function(){
                        timeout = null;
                    }, wait);
                    if (callNow) result = func.apply(context, args);
                }
                else {
                    timeout = setTimeout(function(){
                        func.apply(context, args)
                    }, wait);
                }
                return result;
            };
            debounced.cancel = function() {
                clearTimeout(timeout);
                timeout = null;
            };
            return debounced;
        }
        ,getTrans:function(key){
            if (typeof $g=='function' && typeof key=='string' && /(<[^>]+>)|(&nbsp;)|(<[^>]+\/>)/.test(key)==false) {
                var lan = key;
                try{ lan = $g(key);}catch(e){}  //Ext翻译会报错。\r\n
                return lan;
            }
            return key;
        }
        ,hisuiStyle:null
        , getHisuiStyle:function(){
            if($.hisui.hisuiStyle===null){
                var hisuiStyle='';
                if(typeof HISUIStyleCode=='string'){ //从全局变量取
                    hisuiStyle=HISUIStyleCode;
                }else{
                    $('link').each(function(){
                        if(this.href.indexOf('/hisui.')>-1){
                            var temp=this.href.split('/hisui.')[1].split('.')[0];
                            if(temp!='css' && temp!='min') {
                                hisuiStyle=temp;
                            }else{
                                hisuiStyle='';
                            }
                            return false;
                        }
                    });
                }
                $.hisui.hisuiStyle=hisuiStyle;
                return hisuiStyle;
            }else{
                return $.hisui.hisuiStyle;
            }
        }
        
        ,
        /**
         * 
         * @param {Object} options 
         * @param {Window} win 
         * @param {Boolean} toHide 
         * @param {HTMLElement} trgt 
         * @param {String} hisuiCmpName 
         */
        switchObjectSize: function (options, win, toHide, trgt, hisuiCmpName) {
            var tmpObjList = win.document.querySelectorAll('OBJECT');
            if (tmpObjList.length > 0) {
                for (var j = 0; j < tmpObjList.length; j++) {
                    if ("undefined" == typeof tmpObjList[j].attributes['type']) continue;
                    if ("application/x-iemrplugin" != tmpObjList[j].attributes['type'].value.toLowerCase()) continue; //tmpObjList[j].type
                    var frm = tmpObjList[j]; changeId = frm.id;
                    if ('undefined' != typeof frm.attributes['myid']) {
                        changeId += frm.attributes['myid'].value;
                    }
                    if (frm) {
                        if (null == frm.getAttribute('data-hideTimes')) frm.setAttribute('data-hideTimes', 0);
                        if (0 > frm.getAttribute('data-hideTimes')) frm.setAttribute('data-hideTimes', 0);
                        if (!$.data(trgt, "changeIdStr")) { $.data(trgt, "changeIdStr", { NPAPIIdStr: "" }); }
                        /*20210903 changeId二边加逗号，解决多个病历插件也其中一个id包含另一个id。如id="plugin",另一id="pluginWord",导致不显示*/
                        if (toHide) {
                            if ($.data(trgt, "changeIdStr").NPAPIIdStr.indexOf(','+changeId+',') < 0) {     //多次open只加一次
                                frm.setAttribute('data-hideTimes', parseInt(frm.getAttribute('data-hideTimes')) + 1);
                                $.data(trgt, "changeIdStr").NPAPIIdStr += ','+changeId+',';
                            }
                            //console.log("npapiIdStr="+$.data(trgt,"changeIdStr").NPAPIIdStr+" ,"+hisuiCmpName+" open NPAPI-hide=> "+frm.getAttribute('data-hideTimes')+",frm.style.display="+frm.style.width);
                            frm.style.width = "0px";
                            frm.style.height = "0px";
                        } else {
                            if ($.data(trgt, "changeIdStr").NPAPIIdStr.indexOf(','+changeId+',') > -1) {     //多次close只加一次
                                frm.setAttribute('data-hideTimes', parseInt(frm.getAttribute('data-hideTimes')) - 1);
                            }
                            if (0 > frm.getAttribute('data-hideTimes')) frm.setAttribute('data-hideTimes', 0);
                            $.data(trgt, "changeIdStr").NPAPIIdStr = $.data(trgt, "changeIdStr").NPAPIIdStr.replace(','+changeId+',', "");
                            //console.log("npapiIdStr="+$.data(trgt,"changeIdStr").changeIdStr+" ,"+hisuiCmpName+" close NPAPI-show=> "+frm.getAttribute('data-hideTimes')+",frm.style.display="+frm.style.width);
                            if (frm.getAttribute('data-hideTimes') == 0) {
                                frm.style.width = "100%";
                                frm.style.height = "100%";
                            }
                        }
                    }
                }
            }
        }
        /***
         * @param {Object} options HISUI-CMP的配置项
         * @param {HTMLDomWindow} win 当前要查询的窗口对象。会查询这个win下所有iframe下包含的object
         * @param {Boolean} toHide 是否隐藏插件
         * @param {HTMLDomcument} trgt  事件源对象 如panel,window,dialog ,menu 对象，以便记录他隐藏了哪几个OBJECT
         * @param {String} hisuiCmpName  源对象组件名称。如panel,menu
         */
        ,findObjectDom:function(options,win,toHide,trgt,hisuiCmpName){ /*Chrome系处理病历控件*/
            if (!!window.ActiveXObject || "ActiveXObject" in window) return ;
            if (navigator.userAgent.indexOf("Chrome/49.")==-1){/*不是医为浏览器1版本,跳出*/return ;}
            if (windowNPAPITotal<0) return ;
            hisuiCmpName = hisuiCmpName||"panel";
            windowNPAPITotal--;
            var count = win.frames.length;
            for (var i = 0; i < count; i++) {
                if (!win.frames[i]) continue; //有可能undefined
                var tmpWin = win.frames[i].window;
                try {
                    var myParentPanel = tmpWin.frameElement.closest(".panel");
					//$(t.frames[o].window.frameElement).parents('.panel').filter(":hidden");
                    // 隐藏页签跳出处理
					if (myParentPanel && $(myParentPanel).length>0 && $(myParentPanel).is(":hidden")) continue;
                    tmpWin.document;/*runqian corss*/
                } catch (e) { return; }
                $.hisui.findObjectDom(options, tmpWin, toHide, trgt, hisuiCmpName);
                /*
                var tmpObjList = tmpWin.document.querySelectorAll('OBJECT');
                if (tmpObjList.length > 0) {
                    for (var j = 0; j < tmpObjList.length; j++) {
                        if ("undefined" == typeof tmpObjList[j].attributes['type']) continue;
                        if ("application/x-iemrplugin" != tmpObjList[j].attributes['type'].value.toLowerCase()) continue; //tmpObjList[j].type
                        var frm = tmpWin.frameElement; changeId = frm.id;
                        if (frm) {
                            if (null == frm.getAttribute('data-hideTimes')) frm.setAttribute('data-hideTimes', 0);
                            if (0 > frm.getAttribute('data-hideTimes')) frm.setAttribute('data-hideTimes', 0);
                            if (!$.data(trgt, "changeIdStr")) { $.data(trgt, "changeIdStr", { NPAPIIdStr: "" }); }
                            if (toHide) {
                                if ($.data(trgt, "changeIdStr").NPAPIIdStr.indexOf(changeId) < 0) {     //多次open只加一次
                                    frm.setAttribute('data-hideTimes', parseInt(frm.getAttribute('data-hideTimes')) + 1);
                                    $.data(trgt, "changeIdStr").NPAPIIdStr += changeId;
                                }
                                //console.log("npapiIdStr="+$.data(trgt,"changeIdStr").NPAPIIdStr+" ,"+hisuiCmpName+" open NPAPI-hide=> "+frm.getAttribute('data-hideTimes')+",frm.style.display="+frm.style.display);
                                if (frm.style.display != 'none') {
                                    frm.style.display = "none";
                                }
                            } else {
                                if ($.data(trgt, "changeIdStr").NPAPIIdStr.indexOf(changeId) > -1) {     //多次close只加一次
                                    frm.setAttribute('data-hideTimes', parseInt(frm.getAttribute('data-hideTimes')) - 1);
                                }
                                if (0 > frm.getAttribute('data-hideTimes')) frm.setAttribute('data-hideTimes', 0);
                                $.data(trgt, "changeIdStr").NPAPIIdStr = $.data(trgt, "changeIdStr").NPAPIIdStr.replace(changeId, "");
                                //console.log("npapiIdStr="+$.data(trgt,"changeIdStr").changeIdStr+" ,"+hisuiCmpName+" close NPAPI-show=> "+frm.getAttribute('data-hideTimes')+",frm.style.display="+frm.style.display);
                                if (frm.getAttribute('data-hideTimes') == 0) {
                                    frm.style.display = 'block';
                                }
                            }
                        }
                    }
                }
                $.hisui.findObjectDom(options, tmpWin, toHide, trgt, hisuiCmpName);
                */
            }
            // 当前界面有application/x-iemrplugin
            $.hisui.switchObjectSize(options,win,toHide,trgt,hisuiCmpName);
        },
            /**增加不同版本风格相关变量 */
        styleCodeConfig : {
            mustCalcPanelHeaderCardTitleWidth:{
                "default":true,"blue":true,"lite":false,"lightblue":false,pure:false,"vben":false
            },
            accordionBodyExHeight : {
                "lite":-1,"lightblue":-1,"default":0
            },
            datagridRowNumberHeaderTitle:{
                "pure":function(){return $.fn.datagrid.defaults.nocol;},"vben":function(){return $.fn.datagrid.defaults.nocol;}, "default":''
            },
            dateTodayColor:{
                default:"#449edd",pure:"#008FFF","vben":"#008FFF"
            },
            dateCloseColor:{
                default: "#ff2600",pure:"#939393","vben":"#939393"
            },
            dateOkColor:{
                default: "#ff2600"
            },
            inputHeight:{
                default: 30,pure:32,vben:32
            },
            messagerPromptBtnIndex:{
                default:['ok','cancel'],pure:['cancel','ok'],vben:['cancel','ok']
            },
            messagerConfirm3BtnIndex:{
                default:['ok','no','cancel'],pure:['cancel','no','ok'],vben:['cancel','no','ok']
            },
            messagerConfirmBtnIndex:{
                default:['ok','cancel'],pure:['cancel','ok'],vben:['cancel','ok']
            },
            messagerFocusBtnIndex:{
                default:0,pure:1,vben:1
            },
            tabHeight:{
                default: 36,pure:44,vben:44
            },
            dateboxqPanelHeight:{
                default: 202,pure: 210,vben:210
            },
            datetimeboxPanelHeight:{
                default: 232,pure: 248,vben:248
            },
            collapsedSize:{  /** layout折叠时东西面板宽度 */
                default: 28,pure: 56,vben:56
            },
            collapsedHeight:{ /** layout折叠时南北面板高度 */
                default: 38,pure: 56,vben: 56
            },
            windowMinWidth:{ /** 弹出窗口最小宽度 */
                default:10,pure: 474,vben:474
            },
            windowMinHeight:{ /** 弹出窗口最小高度 */
                default:10,pure: 274,vben:274
            },
            messagerMinWidth:{ /** 消息窗口最小宽度 */
                default:300,pure: 474,vben:474
            },
            panelTitleFontSize:{
                default:14,pure:18,vben:18
            }
        },
        getStyleCodeConfigValue : function(key){
            if ("undefined" == typeof HISUIStyleCode ) return $.hisui.styleCodeConfig[key].default;
            if ("undefined" == typeof $.hisui.styleCodeConfig[key]) return "";
            if ("undefined" == typeof $.hisui.styleCodeConfig[key][HISUIStyleCode]) return $.hisui.styleCodeConfig[key].default;
            if ("function" == typeof $.hisui.styleCodeConfig[key][HISUIStyleCode]){
                return $.hisui.styleCodeConfig[key][HISUIStyleCode].call();
            }
            return $.hisui.styleCodeConfig[key][HISUIStyleCode];
        },
        switchVersion:function(version){ 
            window.HISUIStyleCode = version;
        },
        switchTheme:function(theme){
            var mycss = "";
            if (typeof HISUIStyleCode == 'undefined' || HISUIStyleCode=="blue"){
                mycss = '';
            }else{
                mycss = HISUIStyleCode+".";
                if (typeof theme != 'undefined' && theme!="" && HISUIStyleCode=='vben'){
                    $("body").attr('data-theme',theme);
                    window.HISUITheme = theme;
                }else{
                    window.HISUITheme = '';
                    $("body").attr('data-theme','');
                }
            }
            if (window.HISUIJsPath){
                var cssBasePath = window.HISUIJsPath.replace(/\/js\/$/, '/css/'); // 替换 /js/ 为 /css/
                // 移除已有的主题 link（可选）
                var existingLink = document.getElementById('hisui-css-theme');
                if (existingLink) {
                    existingLink.parentNode.removeChild(existingLink);
                }
                // 创建新的 link
                var link = document.createElement('link');
                link.id = 'hisui-css-theme';
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = cssBasePath + 'hisui.' + mycss + 'min.css';
                document.head.appendChild(link);
            }
            // 把iframe子界面的也切换
            $("iframe").each(function(){
                try{
                    if (this.contentWindow && this.contentWindow.document && this.contentWindow.document.body){
                        this.contentWindow.$.hisui.switchTheme(HISUITheme);
                    }
                }catch(e){}
            });
        },
        // 0或空表示默认-light,1表示dark
        switchLightDrak:function(HISUILightDrak){            
            if (typeof HISUILightDrak != 'undefined'){
                HISUILightDrak = HISUILightDrak=="0"?"":HISUILightDrak;
                $("body").attr('data-theme',HISUILightDrak?'bgdark' : '');
                window.HISUILightDrak = HISUILightDrak;
            }else{
                if ($("body").attr('data-theme')=='bgdark'){
                    $("body").attr('data-theme','');
                    window.HISUILightDrak = '';
                }else{
                    $("body").attr('data-theme','bgdark');
                    window.HISUILightDrak = 1;
                }
            }
            // 把iframe子界面的颜色也切换
            $("iframe").each(function(){
                try{
                    if (this.contentWindow && this.contentWindow.document && this.contentWindow.document.body){
                        this.contentWindow.$.hisui.switchLightDrak(HISUILightDrak);
                    }
                }catch(e){}
            });
        },
        switchPrimaryColor:function(colorValue){
            if (!colorValue){return ;}
            $("body").removeClass('high-saturation medium-saturation low-saturation');
            if (colorValue.indexOf('#')==-1){ colorValue = "#"+colorValue;}
            var o = $.hisui.hexToHsl(colorValue);
            window.HISUIColorRGB = colorValue.slice(1);
            var body = document.body;
            body.style.setProperty('--primary-color', colorValue);
            body.style.setProperty('--primary-h', o.h);
            body.style.setProperty('--primary-s', Math.round(o.s * 100)+'%');
            body.style.setProperty('--primary-l', Math.round(o.l * 100)+'%');
            if (o.s>0.5 && o.s<0.8){
                $("body").addClass('medium-saturation');
            }else if (o.s<=0.5){
                $("body").addClass('low-saturation');
            }else{
                $("body").addClass('high-saturation');  // 默认是高 o.s>=0.8
            }
            if (o.l>0.8){
                $("body").addClass('high-lightness');
            }else{
                $("body").removeClass('high-lightness'); // 默认是低亮
            }
            // 把iframe子界面的颜色也切换
            $("iframe").each(function(){
                try{
                    if (this.contentWindow && this.contentWindow.document && this.contentWindow.document.body){
                        this.contentWindow.$.hisui.switchPrimaryColor(colorValue);
                    }
                }catch(e){}
            });
            
        },
        hexToHsl : function (hex) {
            if (!hex || typeof hex !== 'string') return '';
            // 匹配 #RGB 或 #RRGGBB
            const regex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
            if (!regex.test(hex)) {
                console.error('无效的 HEX 颜色值:', hex);
                return '';
            }

            let h, s, l;
            let c = hex.substring(1); // 去掉 #
            const isShort = c.length === 3;

            const r = parseInt(isShort ? c[0] + c[0] : c.substring(0, 2), 16) / 255;
            const g = parseInt(isShort ? c[1] + c[1] : c.substring(2, 4), 16) / 255;
            const b = parseInt(isShort ? c[2] + c[2] : c.substring(4, 6), 16) / 255;

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const delta = max - min;

            l = (max + min) / 2;

            if (delta === 0) {
                h = s = 0; // 灰色
            } else {
                s = delta / (1 - Math.abs(2 * l - 1));
                switch (max) {
                    case r: h = (g - b) / delta + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / delta + 2; break;
                    case b: h = (r - g) / delta + 4; break;
                }
                h = Math.round(h * 60);
            }
            return {h:h.toFixed(0), s:s.toFixed(2), l:l.toFixed(2)};
            //return `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
        }
    };
    /***
     * 获得target元素相对于dlgWinow的绝对位置
     * @param target DOM元素
     * @param dlgWindow 可以为空, 为空时表示当前window
     * 兼容IE11,chrome内核,但不兼容IE8,如果是老浏览器直接使用$.offset()方法返回
     * */
    $.hisui.offsetInDialogWindow = function(target,dlgWindow) {
        if (!target.getBoundingClientRect){ return $(target).offset(); }
        if (!target.ownerDocument.defaultView){return $(target).offset();}
        if (!dlgWindow && window == target.ownerDocument.defaultView ){ return $(target).offset(); }
        var totalLeft = 0;
        var totalTop = 0;
        // 获取当前窗口的滚动偏移（兼容 IE）
        var currentWin = dlgWindow||window;
        // var doc = currentWin.document.documentElement;
        // var body = currentWin.document.body;
        // var scrollX = currentWin.pageXOffset !== undefined ? currentWin.pageXOffset : (doc && doc.scrollLeft || body && body.scrollLeft || 0);
        // var scrollY = currentWin.pageYOffset !== undefined ? currentWin.pageYOffset : (doc && doc.scrollTop || body && body.scrollTop || 0);
        var srcTargetWin = target.ownerDocument.defaultView;
        var rect = target.getBoundingClientRect();  // 子界面 位置忽略子界面滚动条位置
        totalLeft += rect.left;
        totalTop += rect.top;
        var win = srcTargetWin;
        while (win !== currentWin) {
            var iframe = win.frameElement;
            if (!iframe) {
                // console.error('跨域或到top');
                break;
            }
            // 获取 iframe 所在父窗口的滚动偏移
            var parentWin = win.parent;
            var pDoc = parentWin.document.documentElement;
            var pBody = parentWin.document.body;
            var pScrollX = parentWin.pageXOffset !== undefined ? parentWin.pageXOffset : (pDoc && pDoc.scrollLeft || pBody && pBody.scrollLeft || 0);
            var pScrollY = parentWin.pageYOffset !== undefined ? parentWin.pageYOffset : (pDoc && pDoc.scrollTop || pBody && pBody.scrollTop || 0);
            var iframeRect = iframe.getBoundingClientRect();
            totalLeft += iframeRect.left + pScrollX;
            totalTop += iframeRect.top + pScrollY;
            win = parentWin;
        }
        return { left: Math.round(totalLeft), top: Math.round(totalTop) };
    },
    $.hisui.globalContainerId = 'z-q-container';
    $.hisui.globalContainerSelector = '#'+$.hisui.globalContainerId;
    $.hisui.getLastSrcTargetDom = function(){
        return $.data(document.getElementById($.hisui.globalContainerId), "data").srcTargetDom;
    }
    /**fix panel top left width height */
    $.hisui.fixPanelTLWH = function(){
        var state = $.data(document.getElementById($.hisui.globalContainerId), "data");
        if (!state) return;
        var target = state.srcTargetDom;
        var _t = $(target);
        var panel = $($.hisui.globalContainerSelector);
        // var offset = _t.offset();
        //panel.offset({top:offset.top+_t._outerHeight(),left:offset.left});
        /**清除上一次定时器,当调用renderRowSummary方法时,会多次触发fixPanelTLWH,不用多个定时器来计算位置 */
        if (state.offsettimer) {
            clearTimeout(state.offsettimer);
            state.offsettimer = null;
        }
        /*60ms, 重计算位置*/
        (function () {
            if (panel.is(":visible")) {
                var myTop = parseInt(getTop());
                /*20220923增加面板位置样式, 且面板覆盖处comboq下边或上边1px边框 2745948 2914190*/
                if (myTop > $.hisui.offsetInDialogWindow(_t[0]).top) {
                    myTop--; 
                    panel.removeClass('comboq-p-top').addClass('comboq-p-bottom');
                    _t.removeClass('comboq-textbox-top').addClass('comboq-textbox-bottom');
                } else {
                    myTop++;
                    panel.removeClass('comboq-p-bottom').addClass('comboq-p-top');
                    _t.removeClass('comboq-textbox-bottom').addClass('comboq-textbox-top');
                }
                var myLeft = getLeft();
                if (Math.abs(myTop-panel.offset().top)>2 || Math.abs(myLeft-panel.offset().left)>2){
                    panel.offset({top: myTop, left: myLeft});
                    clearTimeout(state.offsettimer);
                    state.offsettimer = null;
                }
                try{
                    var tmpstate = $.data(document.getElementById($.hisui.globalContainerId), "data");
                    if ('undefined'==typeof $(tmpstate.srcTargetDom).attr("id")){
                        state.offsettimer = setTimeout(arguments.callee, 60);
                    }else{
                        // 闭包中srcTargetDom与当前是同一个才定位
                        if (_t.attr("id")===$(tmpstate.srcTargetDom).attr("id")) state.offsettimer = setTimeout(arguments.callee, 60);
                    }                    
                }catch(ex){
                    console.error(ex);
                }
            }
        })();
        function getLeft() {
            var left = $.hisui.offsetInDialogWindow(_t[0]).left;
            if (left + panel._outerWidth() > $(window)._outerWidth() + $(document).scrollLeft()) {
                left = $(window)._outerWidth() + $(document).scrollLeft() - panel._outerWidth();
            }
            if (left < 0) {
                left = 0;
            }
            return left;
        };
        function getTop() {
            var t1 = $.hisui.offsetInDialogWindow(_t[0]).top;
            var top = t1 + _t._outerHeight();  //默认向下
            if (top + panel._outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                top = t1 - panel._outerHeight(); //在上面显示
            }
            if (top < $(document).scrollTop()) {
                top = t1 + _t._outerHeight(); //向下显示 
            }
            top = parseInt(top);
            return top;
        };
    }

    /*--1.5.js--jquery.parser.js--method-----end---*/
    $.parser = {
        auto: true, onComplete: function (context) {
        }, plugins: ["draggable", "droppable", "resizable", "pagination", "tooltip", "linkbutton", "menu", "menubutton", "splitbutton", "progressbar", "tree", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "numberspinner", "timespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "panel", "datagrid", "propertygrid", "treegrid", "tabs", "accordion", "window", "dialog","checkbox","radio","switchbox","keywords","comboq","lookup","triggerbox","dateboxq","datetimeboxq","timeboxq","label"], parse: function (context) {
            var aa = [];
            for (var i = 0; i < $.parser.plugins.length; i++) {
                var name = $.parser.plugins[i];
                var r = $(".hisui-" + name, context);
                if (r.length) {
                    if (r[name]) {
                        r[name]();
                    } else {
                        aa.push({ name: name, jq: r });
                    }
                }
            }
            if (aa.length && window.easyloader) {
                var names = [];
                for (var i = 0; i < aa.length; i++) {
                    names.push(aa[i].name);
                }
                easyloader.load(names, function () {
                    for (var i = 0; i < aa.length; i++) {
                        var name = aa[i].name;
                        var jq = aa[i].jq;
                        jq[name]();
                    }
                    $.parser.onComplete.call($.parser, context);
                });
            } else {
                $.parser.onComplete.call($.parser, context);
            }
        }, 
	parseValue: function(property, value, parent, delta){  /*width支持百分比,引入1.7.0中的方法*/
			delta = delta || 0;
			var v = $.trim(String(value||''));
			var endchar = v.substr(v.length-1, 1);
			if (endchar == '%'){
				v = parseFloat(v.substr(0, v.length-1));
				if (property.toLowerCase().indexOf('width') >= 0){
					delta += parent[0].offsetWidth-parent[0].clientWidth;
					v = Math.floor((parent.width()-delta) * v / 100.0);
				} else {
					delta += parent[0].offsetHeight-parent[0].clientHeight;
					v = Math.floor((parent.height()-delta) * v / 100.0);
				}
			} else {
				v = parseInt(v) || undefined;
			}
			return v;
        },
        /**
        * parse options, including standard 'data-options' attribute.
        * 
        * calling examples:
        * $.parser.parseOptions(target);
        * $.parser.parseOptions(target, ['id','title','width',{fit:'boolean',border:'boolean'},{min:'number'}]);
        */
       parseOptions: function (target, properties) {
            var t = $(target);
            var options = {};
            var s = $.trim(t.attr('data-options'));
            if (s) {
                if (s.substring(0, 1) != "{") {
                    s = "{" + s +"\n"+ "}";  // 增加\n 兼容options的注释最后一行代码问题，//,required:true
                }
                options = (new Function('return ' + s))();
            }
            if (properties) {
                var opts = {};
                for (var i = 0; i < properties.length; i++) {
                    var pp = properties[i];
                    if (typeof pp == "string") {
                        if (pp == "width" || pp == "height" || pp == "left" || pp == "top") {
                            opts[pp] = parseInt(target.style[pp]) || undefined;
                        } else {
                            opts[pp] = t.attr(pp);
                        }
                    } else {
                        for (var name in pp) {
                            var type = pp[name];
                            if (type == "boolean") {
                                opts[name] = t.attr(name) ? (t.attr(name) == "true") : undefined;
                            } else {
                                if (type == "number") {
                                    opts[name] = t.attr(name) == "0" ? 0 : parseFloat(t.attr(name)) || undefined;
                                }
                            }
                        }
                    }
                }
                $.extend(options, opts);
            }
            return options;
        }
    };
    $(function () {
        var d = $("<div style=\"position:absolute;top:-1000px;width:100px;height:100px;padding:5px\"></div>").appendTo("body");
        d.width(100);
        //$._boxModel = parseInt(d.width()) == 100;
        $._boxModel = Math.abs(parseInt(d.width())-100)<=2;  //add2023-03-28 浏览器缩放126%时 获取宽度为99 在误差2px范围内都认可
        d.remove();
        if (!window.easyloader && $.parser.auto) {
            $.parser.parse();
        }
    });
    $.fn._outerWidth = function (width) {
        if (width == undefined) {
            if (this[0] == window) {
                return this.width() || document.body.clientWidth;
            }
            return this.outerWidth() || 0;
        }
        return this.each(function () {
            if ($._boxModel) {
                $(this).width(width - ($(this).outerWidth() - $(this).width()));
            } else {
                $(this).width(width);
            }
        });
    };
    $.fn._outerHeight = function (height) {
        if (height == undefined) {
            if (this[0] == window) {
                return this.height() || document.body.clientHeight;
            }
            return this.outerHeight() || 0;
        }
        return this.each(function () {
            if ($._boxModel) {
                $(this).height(height - ($(this).outerHeight() - $(this).height()));
            } else {
                $(this).height(height);
            }
        });
    };
    $.fn._scrollLeft = function (left) {
        if (left == undefined) {
            return this.scrollLeft();
        } else {
            return this.each(function () {
                $(this).scrollLeft(left);
            });
        }
    };
    $.fn._propAttr = $.fn.prop || $.fn.attr;
    $.fn._fit = function (fit) {
        fit = fit == undefined ? true : fit;
        var t = this[0];
        var p = (t.tagName == "BODY" ? t : this.parent()[0]);
        var fcount = p.fcount || 0;
        if (fit) {
            if (!t.fitted) {
                t.fitted = true;
                p.fcount = fcount + 1;
                $(p).addClass("panel-noscroll");
                if (p.tagName == "BODY") {
                    $("html").addClass("panel-fit");
                }
            }
        } else {
            if (t.fitted) {
                t.fitted = false;
                p.fcount = fcount - 1;
                if (p.fcount == 0) {
                    $(p).removeClass("panel-noscroll");
                    if (p.tagName == "BODY") {
                        $("html").removeClass("panel-fit");
                    }
                }
            }
        }
        if (this.hasClass("window") || this.hasClass("dialog")){  // window与dialog计算fit的宽度时,包含padding 20250313 [5534619]
            if ($(p).css("box-sizing")=="border-box"){
                return { width: $(p)._outerWidth(), height: $(p)._outerHeight() };
            }else{
                return { width: $(p)._outerWidth(), height: $(p).height() };
            }            
        }
        return { width: $(p).width(), height: $(p).height() };
    };
})(jQuery);
(function ($) {
    var longTouchTimer = null;
    var dblTouchTimer = null;
    var isDblClick = false;
    function onTouchStart(e) {
        if (e.touches.length != 1) {
            return;
        }
        if (!isDblClick) {
            isDblClick = true;
            dblClickTimer = setTimeout(function () {
                isDblClick = false;
            }, 500);
        } else {
            clearTimeout(dblClickTimer);
            isDblClick = false;
            fire(e, "dblclick");
        }
        longTouchTimer = setTimeout(function () {
            fire(e, "contextmenu", 3);
        }, 1000);
        fire(e, "mousedown");
        if ($.fn.draggable.isDragging || $.fn.resizable.isResizing) {
            e.preventDefault();
        }
    };
    function onTouchMove(e) {
        if (e.touches.length != 1) {
            return;
        }
        if (longTouchTimer) {
            clearTimeout(longTouchTimer);
        }
        fire(e, "mousemove");
        if ($.fn.draggable.isDragging || $.fn.resizable.isResizing) {
            e.preventDefault();
        }
    };
    function onTouchEnd(e) {
        if (longTouchTimer) {
            clearTimeout(longTouchTimer);
        }
        fire(e, "mouseup");
        if ($.fn.draggable.isDragging || $.fn.resizable.isResizing) {
            e.preventDefault();
        }
    };
    function fire(e, name, which) {
        var event = new $.Event(name);
        event.pageX = e.changedTouches[0].pageX;
        event.pageY = e.changedTouches[0].pageY;
        event.which = which || 1;
        $(e.target).trigger(event);
    };
    if (document.addEventListener) {
        document.addEventListener("touchstart", onTouchStart, true);
        document.addEventListener("touchmove", onTouchMove, true);
        document.addEventListener("touchend", onTouchEnd, true);
    }
})(jQuery);