if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '\u7b2c';
	$.fn.pagination.defaults.afterPageText = '\u5171{pages}\u9875';
	$.fn.pagination.defaults.displayMsg = '\u663e\u793a{from}\u5230{to},\u5171{total}\u8bb0\u5f55';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '\u6b63\u5728\u5904\u7406\uff0c\u8bf7\u7a0d\u5f85\u3002\u3002\u3002';
	$.fn.datagrid.defaults.findBtn = "\u67e5\u8be2";
	$.fn.datagrid.defaults.clearBtn = "\u6e05\u7a7a";
	$.fn.datagrid.defaults.advancedBtn = "\u9ad8\u7ea7";
	$.fn.datagrid.defaults.advanced2Btn = "\u6536\u8d77";
	$.fn.datagrid.defaults.like = "\u6a21\u7cca\u67e5\u8be2";
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '\u786e\u5b9a';
	$.messager.defaults.yes = '\u662f';
	$.messager.defaults.no = '\u5426';
	$.messager.defaults.cancel = '\u53d6\u6d88';
}
if ($.fn.validatebox){
	$.fn.validatebox.defaults.missingMessage = '\u8be5\u8f93\u5165\u9879\u4e3a\u5fc5\u8f93\u9879';
	$.fn.validatebox.defaults.rules.email.message = '\u8bf7\u8f93\u5165\u6709\u6548\u7684\u7535\u5b50\u90ae\u4ef6\u5730\u5740';
	$.fn.validatebox.defaults.rules.url.message = '\u8bf7\u8f93\u5165\u6709\u6548\u7684URL\u5730\u5740';
	$.fn.validatebox.defaults.rules.length.message = '\u8f93\u5165\u5185\u5bb9\u957f\u5ea6\u5fc5\u987b\u4ecb\u4e8e{0}\u548c{1}\u4e4b\u95f4';
	$.fn.validatebox.defaults.rules.remote.message = '\u8bf7\u4fee\u6b63\u8be5\u5b57\u6bb5';
	$.fn.validatebox.defaults.rules.idcard.message = "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u8eab\u4efd\u8bc1\u53f7";
	$.fn.validatebox.defaults.rules.idcard.formattermessage = "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u8eab\u4efd\u8bc1\u53f7,\u683c\u5f0f\u9519\u8bef";
	$.fn.validatebox.defaults.rules.idcard.addrmessage = "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u8eab\u4efd\u8bc1\u53f7\uff0c\u68c0\u67e5\u524d\u4e8c\u4f4d";
	$.fn.validatebox.defaults.rules.idcard.paritymessage = "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u8eab\u4efd\u8bc1\u53f7,\u6821\u9a8c\u4f4d\u9519\u8bef";
	$.fn.validatebox.defaults.rules.mobilephone.message = "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u624b\u673a\u53f7";
}
if ($.fn.spinner){
	$.fn.spinner.defaults.missingMessage = '\u8be5\u8f93\u5165\u9879\u4e3a\u5fc5\u8f93\u9879';
}
if ($.fn.timespinner){
	$.fn.timespinner.defaults.missingMessage = '\u8be5\u8f93\u5165\u9879\u4e3a\u5fc5\u8f93\u9879';
}
if ($.fn.numberbox){
	$.fn.numberbox.defaults.missingMessage = '\u8be5\u8f93\u5165\u9879\u4e3a\u5fc5\u8f93\u9879';
	$.fn.numberbox.defaults.rules.min.message = '\u8f93\u5165\u7684\u503c\u5fc5\u987b\u5927\u4e8e\u6216\u7b49\u4e8e{0}';
	$.fn.numberbox.defaults.rules.max.message = '\u8f93\u5165\u7684\u503c\u5fc5\u987b\u5c0f\u4e8e\u6216\u7b49\u4e8e{0}';
}
if ($.fn.combobox){
	$.fn.combobox.defaults.selectAllBtnDesc = '\u5168\u9009/\u53d6\u6d88\u5168\u9009';
	$.fn.combobox.defaults.missingMessage = '\u8be5\u8f93\u5165\u9879\u4e3a\u5fc5\u8f93\u9879';
}
if ($.fn.combotree){
	$.fn.combotree.defaults.missingMessage = '\u8be5\u8f93\u5165\u9879\u4e3a\u5fc5\u8f93\u9879';
}
if ($.fn.combogrid){
	$.fn.combogrid.defaults.missingMessage = '\u8be5\u8f93\u5165\u9879\u4e3a\u5fc5\u8f93\u9879';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['\u65e5','\u4e00','\u4e8c','\u4e09','\u56db','\u4e94','\u516d'];
	$.fn.calendar.defaults.months = ['\u4e00\u6708','\u4e8c\u6708','\u4e09\u6708','\u56db\u6708','\u4e94\u6708','\u516d\u6708','\u4e03\u6708','\u516b\u6708','\u4e5d\u6708','\u5341\u6708','\u5341\u4e00\u6708','\u5341\u4e8c\u6708'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '<span style="color:#449edd;font-size:12px;">\u4eca\u5929</span>';
	$.fn.datebox.defaults.closeText = '\u5173\u95ed';
	$.fn.datebox.defaults.okText = '<span style="color:#ff2600;font-size:12px;">\u786e\u5b9a</span>';
	$.fn.datebox.defaults.missingMessage = '\u8be5\u8f93\u5165\u9879\u4e3a\u5fc5\u8f93\u9879';
	$.fn.datebox.defaults.rules.datebox.message = '\u975e\u6cd5\u65e5\u671f,\u6b63\u786e\u683c\u5f0f:2019-01-06';
	$.fn.datebox.defaults.rules.minMaxDate.messageMax = '\u65e5\u671f\u5fc5\u987b\u5c0f\u4e8e\u6216\u7b49\u4e8e{1}';
	$.fn.datebox.defaults.rules.minMaxDate.messageMin = '\u65e5\u671f\u5fc5\u987b\u5927\u4e8e\u6216\u7b49\u4e8e{0}';
	$.fn.datebox.defaults.rules.minMaxDate.message = '\u975e\u6709\u6548\u65e5\u671f\u8303\u56f4';
	$.fn.datebox.defaults.rules.minMaxDate.messageDef = '\u6709\u6548\u65e5\u671f\u8303\u56f4\uff1a{0} \u81f3 {1}';
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
			if ('1234567890/-'.indexOf(ch)==-1){  //\u7279\u6b8a\u5b57\u7b26
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
				//\u7eaf\u6570\u5b57\u53ea\u8003\u8651YYYYMMDD YYYYMMD
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
			return new Date();
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
	$.fn.filebox.defaults.buttonText = '\u9009\u62e9';
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
	$.fn.timeboxq.defaults.rules.timeboxq.message = "\u975e\u6cd5\u65f6\u95f4\u3002\u6b63\u786e\u8f93\u5165\u5982\uff1a14:10\uff0c1410 \u6216 n+15\u8868\u793a15\u5206\u949f\u540e";
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMax = '\u65f6\u95f4\u5fc5\u987b\u5c0f\u4e8e\u6216\u7b49\u4e8e{1}';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMin = '\u65f6\u95f4\u5fc5\u987b\u5927\u4e8e\u6216\u7b49\u4e8e{0}';
	$.fn.timeboxq.defaults.rules.minMaxTime.message = '\u975e\u6709\u6548\u65f6\u95f4\u8303\u56f4';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageDef = '\u6709\u6548\u65f6\u95f4\u8303\u56f4\uff1a{0} \u81f3 {1}';
}
if ($.fn.switchbox){
	$.fn.switchbox.defaults.onText = '\u5f00';
	$.fn.switchbox.defaults.offText = '\u5173';
}
if ($.fn.radio){
	$.fn.radio.defaults.missingMessage = '\u8be5\u9879\u4e3a\u5fc5\u9009\u9879';
}
if ($.fn.checkbox){
	$.fn.checkbox.defaults.missingMessage = '\u8be5\u9879\u4e3a\u5fc5\u9009\u9879';
}