if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = 'Página';
	$.fn.pagination.defaults.afterPageText = 'de {pages} páginas';
	$.fn.pagination.defaults.displayMsg = '{from} - {to} / {total}';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = 'Processando, por favor aguarde...';
	$.fn.datagrid.defaults.findBtn = "Pesquisar";
	$.fn.datagrid.defaults.clearBtn = "Limpar";
	$.fn.datagrid.defaults.advancedBtn = "Avançado";
	$.fn.datagrid.defaults.advanced2Btn = "Ocultar";
	$.fn.datagrid.defaults.like = "Pesquisa aproximada";
	$.fn.datagrid.defaults.nocol = "Ordem";
}
if ($.fn.propertygrid) {
	$.fn.propertygrid.defaults.findBtn = "Pesquisar";
	$.fn.propertygrid.defaults.clearBtn = "Limpar";
	$.fn.propertygrid.defaults.advancedBtn = "Avançado";
	$.fn.propertygrid.defaults.advanced2Btn = "Ocultar";
	$.fn.propertygrid.defaults.like = "Pesquisa aproximada";
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = 'OK';
	$.messager.defaults.yes = 'Sim';
	$.messager.defaults.no = 'Não';
	$.messager.defaults.cancel = 'Cancelar';
}
if ($.fn.validatebox){
	$.fn.validatebox.defaults.missingMessage = 'Este campo é obrigatório.';
	$.fn.validatebox.defaults.rules.email.message = 'Por favor, insira um endereço de e-mail válido.';
	$.fn.validatebox.defaults.rules.url.message = 'Por favor, insira um URL válido.';
	$.fn.validatebox.defaults.rules.length.message = 'O comprimento deve estar entre {0} e {1}.';
	$.fn.validatebox.defaults.rules.remote.message = 'Por favor, corrija este campo.';
	$.fn.validatebox.defaults.rules.idcard.message = "Por favor, insira um número de identidade válido.";
	$.fn.validatebox.defaults.rules.idcard.formattermessage = "Formato inválido para o número de identidade.";
	$.fn.validatebox.defaults.rules.idcard.addrmessage = "Número de identidade inválido. Verifique os primeiros dígitos.";
	$.fn.validatebox.defaults.rules.idcard.paritymessage = "Dígito verificador do número de identidade incorreto.";
	$.fn.validatebox.defaults.rules.mobilephone.message = "Por favor, insira um número de celular válido.";
}
if ($.fn.spinner){
	$.fn.spinner.defaults.missingMessage = 'Este campo é obrigatório.';
}
if ($.fn.timespinner){
	$.fn.timespinner.defaults.missingMessage = 'Este campo é obrigatório.';
}
if ($.fn.numberbox){
	$.fn.numberbox.defaults.missingMessage = 'Este campo é obrigatório.';
	$.fn.numberbox.defaults.rules.min.message = 'O valor deve ser maior ou igual a {0}.';
	$.fn.numberbox.defaults.rules.max.message = 'O valor deve ser menor ou igual a {0}.';
}
if ($.fn.combobox){
	$.fn.combobox.defaults.selectAllBtnDesc = 'Selecionar tudo/Desmarcar tudo';
	$.fn.combobox.defaults.missingMessage = 'Este campo é obrigatório.';
}
if ($.fn.combotree){
	$.fn.combotree.defaults.missingMessage = 'Este campo é obrigatório.';
}
if ($.fn.combogrid){
	$.fn.combogrid.defaults.missingMessage = 'Este campo é obrigatório.';
	$.fn.combogrid.defaults.loadMsg = 'Processando, por favor aguarde...';
	$.fn.combogrid.defaults.findBtn = "Pesquisar";
	$.fn.combogrid.defaults.clearBtn = "Limpar";
	$.fn.combogrid.defaults.advancedBtn = "Avançado";
	$.fn.combogrid.defaults.advanced2Btn = "Ocultar";
	$.fn.combogrid.defaults.like = "Pesquisa aproximada";
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
	$.fn.calendar.defaults.months = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '<span style="color:'+$.hisui.getStyleCodeConfigValue("dateTodayColor")+';font-size:12px;">Hoje</span>';
	$.fn.datebox.defaults.closeText = '<span style="color:'+$.hisui.getStyleCodeConfigValue("dateCloseColor")+';font-size:12px;">Fechar</span>';
	$.fn.datebox.defaults.okText = '<span style="color:'+$.hisui.getStyleCodeConfigValue("dateOkColor")+';font-size:12px;">Confirmar</span>';
	$.fn.datebox.defaults.missingMessage = 'Este campo é obrigatório.';
	$.fn.datebox.defaults.rules.datebox.message = 'Data inválida. Formato correto: 2019-01-06';
	$.fn.datebox.defaults.rules.minMaxDate.messageMax = 'A data deve ser menor ou igual a {1}';
	$.fn.datebox.defaults.rules.minMaxDate.messageMin = 'A data deve ser maior ou igual a {0}';
	$.fn.datebox.defaults.rules.minMaxDate.message = 'Intervalo de datas inválido';
	$.fn.datebox.defaults.rules.minMaxDate.messageDef = 'Intervalo válido: {0} até {1}';
	$.fn.datebox.defaults.formatter = function(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
	};
	$.fn.datebox.defaults.parser = function(s){
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
			if ('1234567890/-'.indexOf(ch)==-1){
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
		if (s.indexOf('/')>-1){ 
			var ss =  s.split('/');
			var d = parseInt(ss[0],10);
			var m = parseInt(ss[1],10);
			var y = parseInt(ss[2],10);
			
			if (isNaN(y) && m>1000 && d>0) {
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
	$.fn.filebox.defaults.buttonText = 'Escolher';
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
	$.fn.timeboxq.defaults.rules.timeboxq.message = "Hora inválida. Exemplo: 14:10, 1410 ou n+15 (15 minutos depois)";
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMax = 'A hora deve ser menor ou igual a {1}';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMin = 'A hora deve ser maior ou igual a {0}';
	$.fn.timeboxq.defaults.rules.minMaxTime.message = 'Intervalo de horas inválido';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageDef = 'Intervalo válido: {0} até {1}';
}
if ($.fn.switchbox){
	$.fn.switchbox.defaults.onText = 'Ligado';
	$.fn.switchbox.defaults.offText = 'Desligado';
}
if ($.fn.radio){
	$.fn.radio.defaults.missingMessage = 'Este campo é obrigatório.';
}
if ($.fn.checkbox){
	$.fn.checkbox.defaults.missingMessage = 'Este campo é obrigatório.';
}
if ($.fn.linkbutton){
	$.fn.linkbutton.defaults.waitingAlert = 'Botão já foi clicado, aguarde a resposta do sistema...';
}
if ($.fn.splitbutton){
	$.fn.splitbutton.defaults.waitingAlert = $.fn.linkbutton.defaults.waitingAlert;
}
if ($.fn.menubutton){
	$.fn.menubutton.defaults.waitingAlert = $.fn.linkbutton.defaults.waitingAlert;
}