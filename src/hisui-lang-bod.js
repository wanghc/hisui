if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = 'པ།';
	$.fn.pagination.defaults.afterPageText = 'ཁྱོན་{pages}ཤོག་ངོས།';
	$.fn.pagination.defaults.displayMsg = 'ཐོ་འགོད་{from}ནས་{to}བར། ཁྱོན་{total}ཐོ་འགོད།';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = 'ད་ལྟ་བཀོལ་སྤྱོད་བྱེད་བཞིན་ཡོད། སྒུག་རོགས་གནང་།...';
	$.fn.datagrid.defaults.findBtn = "འཚོལ་ཞིབ།";
	$.fn.datagrid.defaults.clearBtn = "གསལ་བཤེར།";
	$.fn.datagrid.defaults.advancedBtn = "མཐོ་རིམ།";
	$.fn.datagrid.defaults.advanced2Btn = "བསྡུ་རྒྱག";
	$.fn.datagrid.defaults.like = "ཧྲུལ་པོའི་འཚོལ་ཞིབ།";
	$.fn.datagrid.defaults.nocol = "ཨང་རིམ།";
}
if ($.fn.propertygrid) {
	$.fn.propertygrid.defaults.findBtn = "འཚོལ་ཞིབ།";
	$.fn.propertygrid.defaults.clearBtn = "གསལ་བཤེར།";
	$.fn.propertygrid.defaults.advancedBtn = "མཐོ་རིམ།";
	$.fn.propertygrid.defaults.advanced2Btn = "བསྡུ་རྒྱག";
	$.fn.propertygrid.defaults.like = "ཧྲུལ་པོའི་འཚོལ་ཞིབ།";
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = 'ངེས་པ།';
	$.messager.defaults.yes = 'རེད།';
	$.messager.defaults.no = 'མིན།';
	$.messager.defaults.cancel = 'ཕྱིར་འཐེན།';
}
if ($.fn.validatebox){
	$.fn.validatebox.defaults.missingMessage = 'འདི་ནན་འཇུག་གི་རྣམ་པ་ངེས་པར་དུ་ནང་འཇུག་བྱེད་དགོས།';
	$.fn.validatebox.defaults.rules.email.message = 'ནུས་ལྡན་གྱི་གློག་འཕྲིན་ཁ་བྱང་ནང་འཇུག་གནང་རོགས།';
	$.fn.validatebox.defaults.rules.url.message = 'ནུས་ལྡན་གྱི་URL ཁ་བྱང་ནང་འཇུག་གནང་རོགས།';
	$.fn.validatebox.defaults.rules.length.message = 'ནང་འཇུག་གི་རིང་ཚད་{0}དང་{1}བར་དུ་ཡིན་དགོས།';
	$.fn.validatebox.defaults.rules.remote.message = 'ཞིབ་བཅོས་གནང་རོགས།';
	$.fn.validatebox.defaults.rules.idcard.message = "ནུས་ལྡན་གྱི་ཐོབ་ཐང་ལག་འཁྱེར་ཨང་གྲངས་ནང་འཇུག་གནང་རོགས།";
	$.fn.validatebox.defaults.rules.idcard.formattermessage = "ནུས་ལྡན་གྱི་ཐོབ་ཐང་ལག་འཁྱེར་ཨང་གྲངས་ནང་འཇུག་གནང་རོགས། རྣམ་གཞག་ནོར་འཁྲུལ།";
	$.fn.validatebox.defaults.rules.idcard.addrmessage = "ནུས་ལྡན་གྱི་ཐོབ་ཐང་ལག་འཁྱེར་ཨང་གྲངས་ནང་འཇུག་གནང་རོགས། ཨང་གྲངས་གཉིས་ཞིབ་བཤེར།";
	$.fn.validatebox.defaults.rules.idcard.paritymessage = "ནུས་ལྡན་གྱི་ཐོབ་ཐང་ལག་འཁྱེར་ཨང་གྲངས་ནང་འཇུག་གནང་རོགས། ཞིབ་བཤེར་གནས་ནོར་འཁྲུལ།";
	$.fn.validatebox.defaults.rules.mobilephone.message = "ནུས་ལྡན་གྱི་ལག་ཐོག་ཁ་པར་ཨང་གྲངས་ནང་འཇུག་གནང་རོགས།";
}
if ($.fn.spinner){
	$.fn.spinner.defaults.missingMessage = 'འདི་ནན་འཇུག་གི་རྣམ་པ་ངེས་པར་དུ་ནང་འཇུག་བྱེད་དགོས།';
}
if ($.fn.timespinner){
	$.fn.timespinner.defaults.missingMessage = 'འདི་ནན་འཇུག་གི་རྣམ་པ་ངེས་པར་དུ་ནང་འཇུག་བྱེད་དགོས།';
}
if ($.fn.numberbox){
	$.fn.numberbox.defaults.missingMessage = 'འདི་ནན་འཇུག་གི་རྣམ་པ་ངེས་པར་དུ་ནང་འཇུག་བྱེད་དགོས།';
	$.fn.numberbox.defaults.rules.min.message = 'ནང་འཇུག་གི་གྲངས་ཐང་{0}ལས་མང་ངམ་མཚུངས་དགོས།';
	$.fn.numberbox.defaults.rules.max.message = 'ནང་འཇུག་གི་གྲངས་ཐང་{0}ལས་ཉུང་ངམ་མཚུངས་དགོས།';
}
if ($.fn.combobox){
	$.fn.combobox.defaults.selectAllBtnDesc = 'ཆ་ཚང་འདེམས། / ཆ་ཚང་འདེམས་པ་ཕྱིར་འཐེན།';
	$.fn.combobox.defaults.missingMessage = 'འདི་ནན་འཇུག་གི་རྣམ་པ་ངེས་པར་དུ་ནང་འཇུག་བྱེད་དགོས།';
}
if ($.fn.combotree){
	$.fn.combotree.defaults.missingMessage = 'འདི་ནན་འཇུག་གི་རྣམ་པ་ངེས་པར་དུ་ནང་འཇུག་བྱེད་དགོས།';
}
if ($.fn.combogrid){
	$.fn.combogrid.defaults.missingMessage = 'འདི་ནན་འཇུག་གི་རྣམ་པ་ངེས་པར་དུ་ནང་འཇུག་བྱེད་དགོས།';
	$.fn.combogrid.defaults.loadMsg = 'ད་ལྟ་བཀོལ་སྤྱོད་བྱེད་བཞིན་ཡོད། སྒུག་རོགས་གནང་།...';
	$.fn.combogrid.defaults.findBtn = "འཚོལ་ཞིབ།";
	$.fn.combogrid.defaults.clearBtn = "གསལ་བཤེར།";
	$.fn.combogrid.defaults.advancedBtn = "མཐོ་རིམ།";
	$.fn.combogrid.defaults.advanced2Btn = "བསྡུ་རྒྱག";
	$.fn.combogrid.defaults.like = "ཧྲུལ་པོའི་འཚོལ་ཞིབ།";
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['ཉི།','ཟླ།','མིག','ལྷག','ཕུར','པ་སངས།','སྤེན།'];
	$.fn.calendar.defaults.months = ['ཟླ་དང་པོ།','ཟླ་གཉིས་པ།','ཟླ་གསུམ་པ།','ཟླ་བཞི་པ།','ཟླ་ལྔ་པ།','ཟླ་དྲུག་པ།','ཟླ་བདུན་པ།','ཟླ་བརྒྱད་པ།','ཟླ་དགུ་པ།','ཟླ་བཅུ་པ།','ཟླ་བཅུ་གཅིག་པ།','ཟླ་བཅུ་གཉིས་པ།'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '<span class="date-today-btn">དེ་རིང་།</span>';
	$.fn.datebox.defaults.closeText = '<span class="date-close-btn">ཁ་རྒྱག</span>';
	$.fn.datebox.defaults.okText = '<span class="date-ok-btn">ངེས་པ།</span>';
	$.fn.datebox.defaults.missingMessage = 'འདི་ནན་འཇུག་གི་རྣམ་པ་ངེས་པར་དུ་ནང་འཇུག་བྱེད་དགོས།';
	$.fn.datebox.defaults.rules.datebox.message = 'ཁྲིམས་མཐུན་མིན་པའི་ཚེས་གྲངས། ཡང་དག་པའི་རྣམ་གཞག་: 2019-01-06';
	$.fn.datebox.defaults.rules.minMaxDate.messageMax = 'ཚེས་གྲངས་{1}ལས་ཉུང་ངམ་མཚུངས་དགོས།';
	$.fn.datebox.defaults.rules.minMaxDate.messageMin = 'ཚེས་གྲངས་{0}ལས་མང་ངམ་མཚུངས་དགོས།';
	$.fn.datebox.defaults.rules.minMaxDate.message = 'ནུས་ལྡན་མིན་པའི་ཚེས་གྲངས་ཁྱབ་ཁོངས།';
	$.fn.datebox.defaults.rules.minMaxDate.messageDef = 'ནུས་ལྡན་ཚེས་གྲངས་ཁྱབ་ཁོངས། {0} ནས་ {1} བར།';
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
			if ('1234567890/- :'.indexOf(ch)==-1){  //特殊字符 考虑空格与冒号 30/12/2026 00:00:00->
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
	$.fn.filebox.defaults.buttonText = 'འདེམས་པ།';
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
	$.fn.timeboxq.defaults.rules.timeboxq.message = "ཁྲིམས་མཐུན་མིན་པའི་དུས་ཚོད། དཔེར་ན། 14:10, 1410 ཡང་ན n+15 ནི་སྐར་མ་15 རྗེས་སུ།";
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMax = 'དུས་ཚོད་{1}ལས་ཉུང་ངམ་མཚུངས་དགོས།';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMin = 'དུས་ཚོད་{0}ལས་མང་ངམ་མཚུངས་དགོས།';
	$.fn.timeboxq.defaults.rules.minMaxTime.message = 'ནུས་ལྡན་མིན་པའི་དུས་ཚོད་ཁྱབ་ཁོངས།';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageDef = 'ནུས་ལྡན་དུས་ཚོད་ཁྱབ་ཁོངས། {0} ནས་ {1} བར།';
}
if ($.fn.switchbox){
	$.fn.switchbox.defaults.onText = 'ཕྱེ།';
	$.fn.switchbox.defaults.offText = 'བསྡུ།';
}
if ($.fn.radio){
	$.fn.radio.defaults.missingMessage = 'འདི་ངེས་པར་དུ་འདེམས་དགོས།';
}
if ($.fn.checkbox){
	$.fn.checkbox.defaults.missingMessage = 'འདི་ངེས་པར་དུ་འདེམས་དགོས།';
}
if ($.fn.linkbutton){
	$.fn.linkbutton.defaults.waitingAlert = 'མཐེབ་ལྡེ་མནན་ཟིན། མ་ལག་ལན་སློག་བྱེད་བཞིན་ཡོད། སྒུག་རོགས་གནང་།...';
}
if ($.fn.splitbutton){
	$.fn.splitbutton.defaults.waitingAlert = $.fn.linkbutton.defaults.waitingAlert;
}
if ($.fn.menubutton){
	$.fn.menubutton.defaults.waitingAlert = $.fn.linkbutton.defaults.waitingAlert;
}
if ($.fn.tabs){
	$.fn.tabs.defaults.noHiddenTabs = "（གབ་པའི་ཤོག་ཁ་མེད།）";
	$.fn.tabs.defaults.refreshText = "གསར་བསྒྱུར།";
	$.fn.tabs.defaults.closeText = "ཁ་རྒྱག";
	$.fn.tabs.defaults.closeOtherText = "གཞན་པ་ཁ་རྒྱག";
	$.fn.tabs.defaults.closeAllText = "ཆ་ཚང་ཁ་རྒྱག";
	$.fn.tabs.defaults.closeLeftText = "གཡོན་ཕྱོགས་ཁ་རྒྱག";
	$.fn.tabs.defaults.closeRightText = "གཡས་ཕྱོགས་ཁ་རྒྱག";
}
if ($.fn.menutree){
	$.fn.menutree.defaults.title = "ལམ་སྟོན་མེ་ནུ།";
}
if ($.fn.combogridmult){
	$.fn.combogridmult.defaults.columns = [[
		{field:'id',title:'id',width:60},
		{field:'text',title:'གསལ་བཤད།',width:220},
		{field:'code',title:'ཨང་རྟགས།',width:150}
	]];
}