if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '第';
	$.fn.pagination.defaults.afterPageText = '共{pages}页';
	$.fn.pagination.defaults.displayMsg = '显示{from}到{to},共{total}记录';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '正在处理，请稍待。。。';
	$.fn.datagrid.defaults.findBtn = "查询";
	$.fn.datagrid.defaults.clearBtn = "清空";
	$.fn.datagrid.defaults.advancedBtn = "高级";
	$.fn.datagrid.defaults.advanced2Btn = "收起";
	$.fn.datagrid.defaults.like = "模糊查询";
	$.fn.datagrid.defaults.nocol = "序号";
}
if ($.fn.propertygrid) {
	$.fn.propertygrid.defaults.findBtn = "查询";
	$.fn.propertygrid.defaults.clearBtn = "清空";
	$.fn.propertygrid.defaults.advancedBtn = "高级";
	$.fn.propertygrid.defaults.advanced2Btn = "收起";
	$.fn.propertygrid.defaults.like = "模糊查询";
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '确定';
	$.messager.defaults.yes = '是';
	$.messager.defaults.no = '否';
	$.messager.defaults.cancel = '取消';
}
if ($.fn.validatebox){
	$.fn.validatebox.defaults.missingMessage = '该输入项为必输项';
	$.fn.validatebox.defaults.rules.email.message = '请输入有效的电子邮件地址';
	$.fn.validatebox.defaults.rules.url.message = '请输入有效的URL地址';
	$.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于{0}和{1}之间';
	$.fn.validatebox.defaults.rules.remote.message = '请修正该字段';
	$.fn.validatebox.defaults.rules.idcard.message = "请输入有效的身份证号";
	$.fn.validatebox.defaults.rules.idcard.formattermessage = "请输入有效的身份证号,格式错误";
	$.fn.validatebox.defaults.rules.idcard.addrmessage = "请输入有效的身份证号，检查前二位";
	$.fn.validatebox.defaults.rules.idcard.paritymessage = "请输入有效的身份证号,校验位错误";
	$.fn.validatebox.defaults.rules.mobilephone.message = "请输入有效的手机号";
}
if ($.fn.spinner){
	$.fn.spinner.defaults.missingMessage = '该输入项为必输项';
}
if ($.fn.timespinner){
	$.fn.timespinner.defaults.missingMessage = '该输入项为必输项';
}
if ($.fn.numberbox){
	$.fn.numberbox.defaults.missingMessage = '该输入项为必输项';
	$.fn.numberbox.defaults.rules.min.message = '输入的值必须大于或等于{0}';
	$.fn.numberbox.defaults.rules.max.message = '输入的值必须小于或等于{0}';
}
if ($.fn.combobox){
	$.fn.combobox.defaults.selectAllBtnDesc = '全选/取消全选';
	$.fn.combobox.defaults.missingMessage = '该输入项为必输项';
}
if ($.fn.combotree){
	$.fn.combotree.defaults.missingMessage = '该输入项为必输项';
}
if ($.fn.combogrid){
	$.fn.combogrid.defaults.missingMessage = '该输入项为必输项';
	$.fn.combogrid.defaults.loadMsg = '正在处理，请稍待。。。';
	$.fn.combogrid.defaults.findBtn = "查询";
	$.fn.combogrid.defaults.clearBtn = "清空";
	$.fn.combogrid.defaults.advancedBtn = "高级";
	$.fn.combogrid.defaults.advanced2Btn = "收起";
	$.fn.combogrid.defaults.like = "模糊查询";
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['日','一','二','三','四','五','六'];
	$.fn.calendar.defaults.months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '<span style="color:'+$.hisui.getStyleCodeConfigValue("dateTodayColor")+';font-size:12px;">今天</span>';
	$.fn.datebox.defaults.closeText = '<span style="color:'+$.hisui.getStyleCodeConfigValue("dateCloseColor")+';font-size:12px;">关闭</span>';
	$.fn.datebox.defaults.okText = '<span style="color:'+$.hisui.getStyleCodeConfigValue("dateOkColor")+';font-size:12px;">确定</span>';
	$.fn.datebox.defaults.missingMessage = '该输入项为必输项';
	$.fn.datebox.defaults.rules.datebox.message = '非法日期,正确格式:2019-01-06';
	$.fn.datebox.defaults.rules.minMaxDate.messageMax = '日期必须小于或等于{1}';
	$.fn.datebox.defaults.rules.minMaxDate.messageMin = '日期必须大于或等于{0}';
	$.fn.datebox.defaults.rules.minMaxDate.message = '非有效日期范围';
	$.fn.datebox.defaults.rules.minMaxDate.messageDef = '有效日期范围：{0} 至 {1}';
	$.fn.datebox.defaults.formatter = function(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
	};
	$.fn.datebox.defaults.parser = function(s){
		/*t-n , t+n */
		/* 2回车 解析成当前月份2日 */
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
			if ('1234567890/-'.indexOf(ch)==-1){  //特殊字符
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
	$.fn.filebox.defaults.buttonText = '选择';
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
	$.fn.timeboxq.defaults.rules.timeboxq.message = "非法时间。正确输入如：14:10，1410 或 n+15表示15分钟后";
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMax = '时间必须小于或等于{1}';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMin = '时间必须大于或等于{0}';
	$.fn.timeboxq.defaults.rules.minMaxTime.message = '非有效时间范围';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageDef = '有效时间范围：{0} 至 {1}';
}
if ($.fn.switchbox){
	$.fn.switchbox.defaults.onText = '开';
	$.fn.switchbox.defaults.offText = '关';
}
if ($.fn.radio){
	$.fn.radio.defaults.missingMessage = '该项为必选项';
}
if ($.fn.checkbox){
	$.fn.checkbox.defaults.missingMessage = '该项为必选项';
}
if ($.fn.linkbutton){
	$.fn.linkbutton.defaults.waitingAlert = '按钮已点击过,系统响应中,请等待...';
}
if ($.fn.splitbutton){
	$.fn.splitbutton.defaults.waitingAlert = $.fn.linkbutton.defaults.waitingAlert;
}
if ($.fn.menubutton){
	$.fn.menubutton.defaults.waitingAlert = $.fn.linkbutton.defaults.waitingAlert;
}