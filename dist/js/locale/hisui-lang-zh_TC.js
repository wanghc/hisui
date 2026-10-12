if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '\u7b2c';
	$.fn.pagination.defaults.afterPageText = '\u5171{pages}\u9801';
	$.fn.pagination.defaults.displayMsg = '\u986f\u793a{from}\u5230{to},\u5171{total}\u8a18\u9304';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '\u6b63\u5728\u8655\u7406\uff0c\u8acb\u7a0d\u5f85\u3002\u3002\u3002';
	$.fn.datagrid.defaults.findBtn = "\u67e5\u8a62";
	$.fn.datagrid.defaults.clearBtn = "\u6e05\u7a7a";
	$.fn.datagrid.defaults.advancedBtn = "\u9ad8\u7d1a";
	$.fn.datagrid.defaults.advanced2Btn = "\u6536\u8d77";
	$.fn.datagrid.defaults.like = "\u6a21\u7cca\u67e5\u8a62";
	$.fn.datagrid.defaults.nocol = "\u5e8f\u865f";
}
if ($.fn.propertygrid) {
	$.fn.propertygrid.defaults.findBtn = "\u67e5\u8a62";
	$.fn.propertygrid.defaults.clearBtn = "\u6e05\u7a7a";
	$.fn.propertygrid.defaults.advancedBtn = "\u9ad8\u7d1a";
	$.fn.propertygrid.defaults.advanced2Btn = "\u6536\u8d77";
	$.fn.propertygrid.defaults.like = "\u6a21\u7cca\u67e5\u8a62";
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '\u78ba\u5b9a';
	$.messager.defaults.yes = '\u662f';
	$.messager.defaults.no = '\u5426';
	$.messager.defaults.cancel = '\u53d6\u6d88';
}
if ($.fn.validatebox){
	$.fn.validatebox.defaults.missingMessage = '\u8a72\u8f38\u5165\u9805\u70ba\u5fc5\u8f38\u9805';
	$.fn.validatebox.defaults.rules.email.message = '\u8acb\u8f38\u5165\u6709\u6548\u7684\u96fb\u5b50\u90f5\u4ef6\u5730\u5740';
	$.fn.validatebox.defaults.rules.url.message = '\u8acb\u8f38\u5165\u6709\u6548\u7684URL\u5730\u5740';
	$.fn.validatebox.defaults.rules.length.message = '\u8f38\u5165\u5167\u5bb9\u9577\u5ea6\u5fc5\u9808\u4ecb\u65bc{0}\u548c{1}\u4e4b\u9593';
	$.fn.validatebox.defaults.rules.remote.message = '\u8acb\u4fee\u6b63\u8a72\u5b57\u6bb5';
	$.fn.validatebox.defaults.rules.idcard.message = "\u8acb\u8f38\u5165\u6709\u6548\u7684\u8eab\u4efd\u8b49\u865f";
	$.fn.validatebox.defaults.rules.idcard.formattermessage = "\u8acb\u8f38\u5165\u6709\u6548\u7684\u8eab\u4efd\u8b49\u865f,\u683c\u5f0f\u932f\u8aa4";
	$.fn.validatebox.defaults.rules.idcard.addrmessage = "\u8acb\u8f38\u5165\u6709\u6548\u7684\u8eab\u4efd\u8b49\u865f\uff0c\u6aa2\u67e5\u524d\u4e8c\u4f4d";
	$.fn.validatebox.defaults.rules.idcard.paritymessage = "\u8acb\u8f38\u5165\u6709\u6548\u7684\u8eab\u4efd\u8b49\u865f,\u6821\u9a57\u4f4d\u932f\u8aa4";
	$.fn.validatebox.defaults.rules.mobilephone.message = "\u8acb\u8f38\u5165\u6709\u6548\u7684\u624b\u6a5f\u865f";
}
if ($.fn.spinner){
	$.fn.spinner.defaults.missingMessage = '\u8a72\u8f38\u5165\u9805\u70ba\u5fc5\u8f38\u9805';
}
if ($.fn.timespinner){
	$.fn.timespinner.defaults.missingMessage = '\u8a72\u8f38\u5165\u9805\u70ba\u5fc5\u8f38\u9805';
}
if ($.fn.numberbox){
	$.fn.numberbox.defaults.missingMessage = '\u8a72\u8f38\u5165\u9805\u70ba\u5fc5\u8f38\u9805';
	$.fn.numberbox.defaults.rules.min.message = '\u8f38\u5165\u7684\u503c\u5fc5\u9808\u5927\u65bc\u6216\u7b49\u65bc{0}';
	$.fn.numberbox.defaults.rules.max.message = '\u8f38\u5165\u7684\u503c\u5fc5\u9808\u5c0f\u65bc\u6216\u7b49\u65bc{0}';
}
if ($.fn.combobox){
	$.fn.combobox.defaults.selectAllBtnDesc = '\u5168\u9078/\u53d6\u6d88\u5168\u9078';
	$.fn.combobox.defaults.missingMessage = '\u8a72\u8f38\u5165\u9805\u70ba\u5fc5\u8f38\u9805';
}
if ($.fn.combotree){
	$.fn.combotree.defaults.missingMessage = '\u8a72\u8f38\u5165\u9805\u70ba\u5fc5\u8f38\u9805';
}
if ($.fn.combogrid){
	$.fn.combogrid.defaults.missingMessage = '\u8a72\u8f38\u5165\u9805\u70ba\u5fc5\u8f38\u9805';
	$.fn.combogrid.defaults.loadMsg = '\u6b63\u5728\u8655\u7406\uff0c\u8acb\u7a0d\u5f85\u3002\u3002\u3002';
	$.fn.combogrid.defaults.findBtn = "\u67e5\u8a62";
	$.fn.combogrid.defaults.clearBtn = "\u6e05\u7a7a";
	$.fn.combogrid.defaults.advancedBtn = "\u9ad8\u7d1a";
	$.fn.combogrid.defaults.advanced2Btn = "\u6536\u8d77";
	$.fn.combogrid.defaults.like = "\u6a21\u7cca\u67e5\u8a62";
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['\u65e5','\u4e00','\u4e8c','\u4e09','\u56db','\u4e94','\u516d'];
	$.fn.calendar.defaults.months = ['\u4e00\u6708','\u4e8c\u6708','\u4e09\u6708','\u56db\u6708','\u4e94\u6708','\u516d\u6708','\u4e03\u6708','\u516b\u6708','\u4e5d\u6708','\u5341\u6708','\u5341\u4e00\u6708','\u5341\u4e8c\u6708'];
}
if ($.fn.datebox){;
	$.fn.datebox.defaults.currentText = '<span class="date-today-btn">\u4eca\u5929</span>';
	$.fn.datebox.defaults.closeText = '<span class="date-close-btn">\u95dc\u9589</span>';
	$.fn.datebox.defaults.okText = '<span class="date-ok-btn">\u78ba\u5b9a</span>';
	$.fn.datebox.defaults.missingMessage = '\u8a72\u8f38\u5165\u9805\u70ba\u5fc5\u8f38\u9805';
	$.fn.datebox.defaults.rules.datebox.message = '\u975e\u6cd5\u65e5\u671f,\u6b63\u78ba\u683c\u5f0f:2019-01-06';
	$.fn.datebox.defaults.rules.minMaxDate.messageMax = '\u65e5\u671f\u5fc5\u9808\u5c0f\u65bc\u6216\u7b49\u65bc{1}';
	$.fn.datebox.defaults.rules.minMaxDate.messageMin = '\u65e5\u671f\u5fc5\u9808\u5927\u65bc\u6216\u7b49\u65bc{0}';
	$.fn.datebox.defaults.rules.minMaxDate.message = '\u975e\u6709\u6548\u65e5\u671f\u7bc4\u570d';
	$.fn.datebox.defaults.rules.minMaxDate.messageDef = '\u6709\u6548\u65e5\u671f\u7bc4\u570d\uff1a{0} \u81f3 {1}';
	$.fn.datebox.defaults.formatter = function(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
	};
	$.fn.datebox.defaults.parser = function(s){
		/*t-n , t+n*/
		if (!s) return new Date();
		if (s=='NaN-NaN-NaN') return new Date();
		function ConvertTDate(dt) {
			var xdays = 0;
			var today=new Date();
			var re = /(\s)+/g ;
			dt=dt.replace(re,'');
			if (dt.charAt(0).toUpperCase()=='T') {
				xdays = dt.slice(2);
				if (xdays=='') xdays=0;
				if (isNaN(xdays)) xdays=0;
				xdays_ms = xdays * 24 * 60 * 60 * 1000;
				if (dt.charAt(1) == '+') today.setTime(today.getTime() + xdays_ms);
				else if (dt.charAt(1) == '-') today.setTime(today.getTime() - xdays_ms);
				else if (dt.length>1) return today;
				return today;
			}
			return today;
		}
		if(s.charAt(0).toUpperCase()=='T'){
			return ConvertTDate(s);
		}
		var ch ='', newStr = '',special=false;
		for(var i=0;i<s.length;i++){
			ch = s.charAt(i);
			if ('1234567890/- :'.indexOf(ch)==-1){  //\u7279\u6b8a\u5b57\u7b26
				if (!special && i!=0 && i!=s.length-1) newStr +='-'
				special = true;
			}else{
				special = false;
			}
			if (!special)  newStr +=ch;
		}
		s = newStr;
		if (s.length>4){
			if (s.indexOf('-')==-1 && s.indexOf('/')==-1){ 
				//\u7d14\u6578\u5b57\u53ea\u8003\u616eYYYYMMDD YYYYMMD
				var reg = /^([0-9]{4})([0-1][0-9])([0-3]?[0-9])*$/;
				var reg1 = /^([0-9]{4})([1-9])([0-3]?[0-9])*$/;
				if (reg.test(s)){
					var ss = reg.exec(s);
					return new Date(ss[1],ss[2]-1,ss[3]||1);
				}else if(reg1.test(s)){
					var ss = reg1.exec(s);
					return new Date(ss[1],ss[2]-1,ss[3]||1);
				}else{
					return new Date();
				}
			}
		}
		if (s.indexOf('/')>-1){ //DMY
			var ss =  s.split('/');
			var d = parseInt(ss[0],10);
			var m = parseInt(ss[1],10);
			var y = parseInt(ss[2],10);
			
			if (isNaN(y) && m>1000 && d>0) { //　s\u662fMM/YYYY\u7684\u683c\u5f0f [3417378]
				return new Date(m,d-1,1);
			}
		}
		if (s.indexOf('-')>-1){
			var ss =  s.split('-');
			var y = parseInt(ss[0],10);
			var m = parseInt(ss[1],10);
			var d = parseInt(ss[2],10);
			if (ss.length==1 && !isNaN(y)){
				return new Date(y,0,1);
			}
			if (ss.length==2 && !isNaN(y) && !isNaN(m) ){
				return new Date(y,m-1,1);
			}
		}
		if (!isNaN(y) && !isNaN(m) && !isNaN(d) && y>=1900 && y<=9999){
			return new Date(y,m-1,d);
		}else{
			var nowDate = new Date();
			if (parseInt(s,10)<32){
				return new Date(nowDate.getFullYear(),nowDate.getMonth(),s);
			}
			return nowDate;
		}
	};
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText,
		missingMessage: $.fn.datebox.defaults.missingMessage
	});
}
if ($.fn.filebox){
	$.fn.filebox.defaults.buttonText = '\u9078\u64c7';
}
if ($.fn.dateboxq){
	$.fn.dateboxq.defaults.parser = $.fn.datebox.defaults.parser;
	$.fn.dateboxq.defaults.formatter = $.fn.datebox.defaults.formatter;
	$.fn.dateboxq.defaults.currentText = $.fn.datebox.defaults.currentText;
	$.fn.dateboxq.defaults.closeText = $.fn.datebox.defaults.closeText;
	$.fn.dateboxq.defaults.okText = $.fn.datebox.defaults.okText;
	$.fn.dateboxq.defaults.missingMessage = $.fn.datebox.defaults.missingMessage
}
if ($.fn.datetimeboxq){
	$.fn.datetimeboxq.defaults.missingMessage = $.fn.datebox.defaults.missingMessage;
	$.fn.datetimeboxq.defaults.currentText = $.fn.datebox.defaults.currentText;
	$.fn.datetimeboxq.defaults.closeText = $.fn.datebox.defaults.closeText;
	$.fn.datetimeboxq.defaults.okText = $.fn.datebox.defaults.okText;
}
if ($.fn.timeboxq){
	$.fn.timeboxq.defaults.missingMessage = $.fn.validatebox.defaults.missingMessage;
	$.fn.timeboxq.defaults.rules.timeboxq.message = "\u975e\u6cd5\u6642\u9593\u3002\u6b63\u78ba\u8f38\u5165\u5982\uff1a14:10\uff0c1410 \u6216 n+15\u8868\u793a15\u5206\u9418\u5f8c";
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMax = '\u6642\u9593\u5fc5\u9808\u5c0f\u65bc\u6216\u7b49\u65bc{1}';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMin = '\u6642\u9593\u5fc5\u9808\u5927\u65bc\u6216\u7b49\u65bc{0}';
	$.fn.timeboxq.defaults.rules.minMaxTime.message = '\u975e\u6709\u6548\u6642\u9593\u7bc4\u570d';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageDef = '\u6709\u6548\u6642\u9593\u7bc4\u570d\uff1a{0} \u81f3 {1}';
}
if ($.fn.switchbox){
	$.fn.switchbox.defaults.onText = '\u958b';
	$.fn.switchbox.defaults.offText = '\u95dc';
}
if ($.fn.radio){
	$.fn.radio.defaults.missingMessage = '\u8a72\u9805\u70ba\u5fc5\u9078\u9805';
}
if ($.fn.checkbox){
	$.fn.checkbox.defaults.missingMessage = '\u8a72\u9805\u70ba\u5fc5\u9078\u9805';
}
if ($.fn.linkbutton){
	$.fn.linkbutton.defaults.waitingAlert = '\u6309\u9215\u5df2\u9ede\u64ca\u904e,\u7cfb\u7d71\u97ff\u61c9\u4e2d,\u8acb\u7b49\u5f85...';
}
if ($.fn.splitbutton){
	$.fn.splitbutton.defaults.waitingAlert = $.fn.linkbutton.defaults.waitingAlert;
}
if ($.fn.menubutton){
	$.fn.menubutton.defaults.waitingAlert = $.fn.linkbutton.defaults.waitingAlert;
}
if ($.fn.tabs){
	$.fn.tabs.defaults.noHiddenTabs = "\uff08\u7121\u96b1\u85cf\u9801\u7c3d\uff09";
	$.fn.tabs.defaults.refreshText = "\u5237\u65b0";
	$.fn.tabs.defaults.closeText = "\u95dc\u9589";
	$.fn.tabs.defaults.closeOtherText = "\u95dc\u9589\u5176\u4ed6";
	$.fn.tabs.defaults.closeAllText = "\u95dc\u9589\u5168\u90e8";
	$.fn.tabs.defaults.closeLeftText = "\u95dc\u9589\u5de6\u5074";
	$.fn.tabs.defaults.closeRightText = "\u95dc\u9589\u53f3\u5074";
}
if ($.fn.menutree){
	$.fn.menutree.defaults.title = "\u5c0e\u822a\u83dc\u55ae";
}
if ($.fn.combogridmult){
	$.fn.combogridmult.defaults.columns = [[
		{field:'id',title:'id',width:60},
		{field:'text',title:'\u63cf\u8ff0',width:220},
		{field:'code',title:'\u4ee3\u78bc',width:150}
	]];
}

/* ==================== \u7121\u969c\u7919\u6309\u9215\u6a19\u7c64\uff08aria-label\uff09 ====================
   \u5716\u6a19\u6309\u9215\u6c92\u6709\u6587\u5b57\uff0c\u8b80\u5c4f\u5668\u4f9d\u8cf4 aria-label \u6717\u8b80\u3002
   \u6ce8\u610f\uff1a\u6d3e\u751f\u7d44\u4ef6\uff08window/dialog/datagrid \u7e7c\u627f panel\uff1bcombobox/datebox \u7e7c\u627f combo\uff1b
   numberspinner \u7e7c\u627f spinner\uff09\u7684 defaults \u662f\u7236\u7d44\u4ef6【\u52a0\u8f09\u6642\u7684\u5feb\u7167】\uff0c
   \u8a9e\u8a00\u5305\u5728\u7d44\u4ef6\u52a0\u8f09\u4e4b\u5f8c\u57f7\u884c\uff0c\u56e0\u6b64\u5fc5\u9808\u6309\u65cf\u9010\u500b\u8986\u84cb\uff0c\u5426\u5247\u6703\u8b80\u5230\u82f1\u6587\u9ed8\u8a8d\u503c\u3002 */
(function () {
	/* panel \u5de5\u5177\u6309\u9215\uff1a\u6298\u758a/\u5c55\u958b/\u6700\u5c0f\u5316/\u6700\u5927\u5316/\u9084\u539f/\u95dc\u9589\uff08window\u3001dialog\u3001messager \u5171\u7528\uff09 */
	var panelA11y = {
		collapseText: '\u6298\u758a', expandText: '\u5c55\u958b',
		minimizeText: '\u6700\u5c0f\u5316', maximizeText: '\u6700\u5927\u5316',
		restoreText: '\u9084\u539f', closeText: '\u95dc\u9589'
	};
	['panel', 'window', 'dialog', 'datagrid', 'propertygrid', 'treegrid'].forEach(function (n) {
		if ($.fn[n] && $.fn[n].defaults) $.extend($.fn[n].defaults, panelA11y);
	});
	if ($.fn.layout && $.fn.layout.paneldefaults) $.extend($.fn.layout.paneldefaults, panelA11y);

	/* combo \u4e0b\u62c9\u7bad\u982d / \u6e05\u7a7a\u6309\u9215 */
	var comboA11y = { arrowText: '\u5c55\u958b/\u6536\u8d77\u4e0b\u62c9\u9762\u677f', clearText: '\u6e05\u7a7a' };
	['combo', 'combobox', 'combotree', 'combogrid', 'combogridmult', 'datebox', 'datetimebox',
	 'comboq', 'dateboxq', 'datetimeboxq', 'lookup', 'triggerbox'].forEach(function (n) {
		if ($.fn[n] && $.fn[n].defaults) $.extend($.fn[n].defaults, comboA11y);
	});

	/* spinner \u4e0a\u4e0b\u7bad\u982d */
	var spinnerA11y = { spinUpText: '\u589e\u52a0', spinDownText: '\u6e1b\u5c11' };
	['spinner', 'numberspinner', 'timespinner'].forEach(function (n) {
		if ($.fn[n] && $.fn[n].defaults) $.extend($.fn[n].defaults, spinnerA11y);
	});

	/* tabs \u6efe\u52d5\u7bad\u982d\u3001\u6ea2\u51fa\u83dc\u55ae\u6309\u9215\u3001\u9801\u7c3d\u95dc\u9589\u6309\u9215 */
	if ($.fn.tabs) {
		$.extend($.fn.tabs.defaults, {
			closeText: '\u95dc\u9589', scrollLeftText: '\u5411\u5de6\u6efe\u52d5',
			scrollRightText: '\u5411\u53f3\u6efe\u52d5', overflowBtnText: '\u66f4\u591a\u9801\u7c64'
		});
	}
	/* layout \u5340\u57df\u6536\u8d77/\u5c55\u958b\u6309\u9215 */
	if ($.fn.layout) {
		$.extend($.fn.layout.defaults, {
			collapseNorthText: '\u6536\u8d77\u4e0a\u65b9\u5340\u57df', collapseSouthText: '\u6536\u8d77\u4e0b\u65b9\u5340\u57df',
			collapseEastText: '\u6536\u8d77\u53f3\u5074\u5340\u57df', collapseWestText: '\u6536\u8d77\u5de6\u5074\u5340\u57df',
			expandNorthText: '\u5c55\u958b\u4e0a\u65b9\u5340\u57df', expandSouthText: '\u5c55\u958b\u4e0b\u65b9\u5340\u57df',
			expandEastText: '\u5c55\u958b\u53f3\u5074\u5340\u57df', expandWestText: '\u5c55\u958b\u5de6\u5074\u5340\u57df'
		});
	}
	if ($.fn.searchbox) $.fn.searchbox.defaults.searchText = '\u641c\u7d22';
	if ($.fn.inputclearbtn) $.fn.inputclearbtn.defaults.clearText = '\u6e05\u9664';
})();