if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = 'Page';
	$.fn.pagination.defaults.afterPageText = 'of {pages}';
	$.fn.pagination.defaults.displayMsg = 'Displaying {from} to {to} of {total} items';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = 'Processing, please wait ...';
	$.fn.datagrid.defaults.findBtn = "Find";
	$.fn.datagrid.defaults.clearBtn = "Clear";
	$.fn.datagrid.defaults.advancedBtn = "Advance";
	$.fn.datagrid.defaults.advanced2Btn = "Collapse";
	$.fn.datagrid.defaults.like = "like";
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = 'Ok';
	$.messager.defaults.yes = 'Yes';
	$.messager.defaults.no = 'No';
	$.messager.defaults.cancel = 'Cancel';
}
if ($.fn.validatebox){
	$.fn.validatebox.defaults.missingMessage = 'This field is required.';
	$.fn.validatebox.defaults.rules.email.message = 'Please enter a valid email address.';
	$.fn.validatebox.defaults.rules.url.message = 'Please enter a valid URL.';
	$.fn.validatebox.defaults.rules.length.message = 'Please enter a value between {0} and {1}.';
	$.fn.validatebox.defaults.rules.remote.message = 'Please fix this field.';
	$.fn.validatebox.defaults.rules.idcard.message = "Please enter a valid ID number";
	$.fn.validatebox.defaults.rules.idcard.formattermessage = "Please enter a valid ID card number, the format is wrong";
	$.fn.validatebox.defaults.rules.idcard.addrmessage = "Please enter a valid ID number to check the first two digits";
	$.fn.validatebox.defaults.rules.idcard.paritymessage = "Please enter a valid ID number, the check bit is wrong";
	$.fn.validatebox.defaults.rules.mobilephone.message = "Please enter a valid mobile number";
}
if ($.fn.spinner){
	$.fn.spinner.defaults.missingMessage = 'This field is required.';
}
if ($.fn.timespinner){
	$.fn.timespinner.defaults.missingMessage = 'This field is required.';
}
if ($.fn.numberbox){
	$.fn.numberbox.defaults.missingMessage = 'This field is required.';
	$.fn.numberbox.defaults.rules.min.message = 'This field is greater than {0}';
	$.fn.numberbox.defaults.rules.max.message = 'This field is less than {0}';
}
if ($.fn.combobox){
	$.fn.combobox.defaults.selectAllBtnDesc = 'select/unselect';
	$.fn.combobox.defaults.missingMessage = 'This field is required.';
}
if ($.fn.combotree){
	$.fn.combotree.defaults.missingMessage = 'This field is required.';
}
if ($.fn.combogrid){
	$.fn.combogrid.defaults.missingMessage = 'This field is required.';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['S','M','T','W','T','F','S'];
	$.fn.calendar.defaults.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '<span style="color:#449edd;font-size:12px;">Today</span>';
	$.fn.datebox.defaults.closeText = 'Close';
	$.fn.datebox.defaults.okText = '<span style="color:#ff2600;font-size:12px;">Ok</span>';
	$.fn.datebox.defaults.missingMessage = 'This field is required.';
	$.fn.datebox.defaults.rules.datebox.message = 'Illegal date, Correct format:2019-01-06';
	$.fn.datebox.defaults.rules.minMaxDate.messageMax = 'Date must be less than{1}';
	$.fn.datebox.defaults.rules.minMaxDate.messageMin = 'Date must be greater than{0}';
	$.fn.datebox.defaults.rules.minMaxDate.message = 'Invalid date range';
	$.fn.datebox.defaults.rules.minMaxDate.messageDef = 'Valid date range：{0} to {1}';
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
		if (s.length>4){
			if (s.indexOf('-')==-1 && s.indexOf('/')==-1){ 
				//纯数字只考虑YYYYMMDD YYYYMMD
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
			if (isNaN(y) && m>1000 && d>0) { //　s是MM/YYYY的格式 [3417378]
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
	$.fn.filebox.defaults.buttonText = 'Choose';
}
if ($.fn.dateboxq){
	$.fn.dateboxq.defaults.parser = $.fn.datebox.defaults.parser;
	$.fn.dateboxq.defaults.formatter = $.fn.datebox.defaults.formatter;
	$.fn.dateboxq.defaults.currentText = $.fn.datebox.defaults.currentText;
	$.fn.dateboxq.defaults.closeText = $.fn.datebox.defaults.closeText;
	$.fn.dateboxq.defaults.okText = $.fn.datebox.defaults.okText;
	$.fn.dateboxq.defaults.missingMessage = $.fn.datebox.defaults.missingMessage;
}
if ($.fn.datetimeboxq){
	$.fn.datetimeboxq.defaults.missingMessage = $.fn.datebox.defaults.missingMessage;
	$.fn.datetimeboxq.defaults.currentText = $.fn.datebox.defaults.currentText;
	$.fn.datetimeboxq.defaults.closeText = $.fn.datebox.defaults.closeText;
	$.fn.datetimeboxq.defaults.okText = $.fn.datebox.defaults.okText;
}
if ($.fn.timeboxq){
	$.fn.timeboxq.defaults.rules.timeboxq.message = "Please enter a valid time. 14:10, 1410, n+15";
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMax = 'Time must be less than{1}';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMin = 'Time must be greater than{0}';
	$.fn.timeboxq.defaults.rules.minMaxTime.message = 'Please enter a valid time.';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageDef = 'Please enter a valid time. from {0} to {1}';
}
if ($.fn.switchbox){
	$.fn.switchbox.defaults.onText = 'OFF';
	$.fn.switchbox.defaults.offText = 'ON';
}
if ($.fn.radio){
	$.fn.radio.defaults.missingMessage = 'This field is required.';
}
if ($.fn.checkbox){
	$.fn.checkbox.defaults.missingMessage = 'This field is required.';
}