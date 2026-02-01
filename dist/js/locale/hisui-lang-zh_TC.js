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
	$.fn.datebox.defaults.currentText = '<span style="color:'+$.hisui.getStyleCodeConfigValue("dateTodayColor")+';font-size:12px;">\u4eca\u5929</span>';
	$.fn.datebox.defaults.closeText = '<span style="color:'+$.hisui.getStyleCodeConfigValue("dateCloseColor")+';font-size:12px;">\u95dc\u9589</span>';
	$.fn.datebox.defaults.okText = '<span style="color:'+$.hisui.getStyleCodeConfigValue("dateOkColor")+';font-size:12px;">\u78ba\u5b9a</span>';

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
		if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
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