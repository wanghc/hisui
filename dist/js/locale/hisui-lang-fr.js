if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = 'Page';
	$.fn.pagination.defaults.afterPageText = 'sur {pages}'; 
	$.fn.pagination.defaults.displayMsg = 'De {from} à {to} / {total}'; 
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = 'Traitement en cours, veuillez patienter...';
	$.fn.datagrid.defaults.findBtn = "Rechercher";
	$.fn.datagrid.defaults.clearBtn = "Effacer";
	$.fn.datagrid.defaults.advancedBtn = "Avancé";
	$.fn.datagrid.defaults.advanced2Btn = "Réduire";
	$.fn.datagrid.defaults.like = "Recherche floue";
	$.fn.datagrid.defaults.nocol = "Ordre";
}
if ($.fn.propertygrid) {
	$.fn.propertygrid.defaults.findBtn = "Rechercher";
	$.fn.propertygrid.defaults.clearBtn = "Effacer";
	$.fn.propertygrid.defaults.advancedBtn = "Avancé";
	$.fn.propertygrid.defaults.advanced2Btn = "Réduire";
	$.fn.propertygrid.defaults.like = "Recherche floue";
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = 'OK';
	$.messager.defaults.yes = 'Oui';
	$.messager.defaults.no = 'Non';
	$.messager.defaults.cancel = 'Annuler';
}
if ($.fn.validatebox){
	$.fn.validatebox.defaults.missingMessage = 'Ce champ est obligatoire';
	$.fn.validatebox.defaults.rules.email.message = 'Veuillez entrer une adresse e-mail valide';
	$.fn.validatebox.defaults.rules.url.message = 'Veuillez entrer une URL valide';
	$.fn.validatebox.defaults.rules.length.message = 'La longueur doit être entre {0} et {1}';
	$.fn.validatebox.defaults.rules.remote.message = 'Veuillez corriger ce champ';
	$.fn.validatebox.defaults.rules.idcard.message = "Veuillez entrer un numéro de carte d'identité valide";
	$.fn.validatebox.defaults.rules.idcard.formattermessage = "Format incorrect pour le numéro de carte d'identité";
	$.fn.validatebox.defaults.rules.idcard.addrmessage = "Les deux premiers chiffres du numéro d'identité sont incorrects";
	$.fn.validatebox.defaults.rules.idcard.paritymessage = "Numéro de carte d'identité invalide, chiffre de contrôle incorrect";
	$.fn.validatebox.defaults.rules.mobilephone.message = "Veuillez entrer un numéro de téléphone portable valide";
}
if ($.fn.spinner){
	$.fn.spinner.defaults.missingMessage = 'Ce champ est obligatoire';
}
if ($.fn.timespinner){
	$.fn.timespinner.defaults.missingMessage = 'Ce champ est obligatoire';
}
if ($.fn.numberbox){
	$.fn.numberbox.defaults.missingMessage = 'Ce champ est obligatoire';
	$.fn.numberbox.defaults.rules.min.message = 'La valeur doit être supérieure ou égale à {0}';
	$.fn.numberbox.defaults.rules.max.message = 'La valeur doit être inférieure ou égale à {0}';
}
if ($.fn.combobox){
	$.fn.combobox.defaults.selectAllBtnDesc = 'Tout sélectionner / Tout désélectionner';
	$.fn.combobox.defaults.missingMessage = 'Ce champ est obligatoire';
}
if ($.fn.combotree){
	$.fn.combotree.defaults.missingMessage = 'Ce champ est obligatoire';
}
if ($.fn.combogrid){
	$.fn.combogrid.defaults.missingMessage = 'Ce champ est obligatoire';
	$.fn.combogrid.defaults.loadMsg = 'Traitement en cours, veuillez patienter...';
	$.fn.combogrid.defaults.findBtn = "Rechercher";
	$.fn.combogrid.defaults.clearBtn = "Effacer";
	$.fn.combogrid.defaults.advancedBtn = "Avancé";
	$.fn.combogrid.defaults.advanced2Btn = "Réduire";
	$.fn.combogrid.defaults.like = "Recherche floue";
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
	$.fn.calendar.defaults.months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '<span style="color:'+$.hisui.getStyleCodeConfigValue("dateTodayColor")+';font-size:12px;">Aujourd\'hui</span>';
	$.fn.datebox.defaults.closeText = '<span style="color:'+$.hisui.getStyleCodeConfigValue("dateCloseColor")+';font-size:12px;">Fermer</span>';
	$.fn.datebox.defaults.okText = '<span style="color:'+$.hisui.getStyleCodeConfigValue("dateOkColor")+';font-size:12px;">OK</span>';
	$.fn.datebox.defaults.missingMessage = 'Ce champ est obligatoire';
	$.fn.datebox.defaults.rules.datebox.message = 'Date invalide, format correct : 2019-01-06';
	$.fn.datebox.defaults.rules.minMaxDate.messageMax = 'La date doit être inférieure ou égale à {1}';
	$.fn.datebox.defaults.rules.minMaxDate.messageMin = 'La date doit être supérieure ou égale à {0}';
	$.fn.datebox.defaults.rules.minMaxDate.message = 'Plage de dates non valide';
	$.fn.datebox.defaults.rules.minMaxDate.messageDef = 'Période valide : {0} à {1}';
	$.fn.datebox.defaults.formatter = function(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
	};
	$.fn.datebox.defaults.parser = function(s){
		/*t-n , t+n */
		/* Entrée 2 transformée en jour actuel du mois 2 */
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
			if ('1234567890/-'.indexOf(ch)==-1){  // Caractère spécial
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
				// Nombre pur, uniquement YYYYMMDD YYYYMMD
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
		if (s.indexOf('/')>-1){ // Jour-Mois-Année
			var ss =  s.split('/');
			var d = parseInt(ss[0],10);
			var m = parseInt(ss[1],10);
			var y = parseInt(ss[2],10);
			
			if (isNaN(y) && m>1000 && d>0) { // Format MM/YYYY [3417378]
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
	$.fn.filebox.defaults.buttonText = 'Choisir';
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
	$.fn.timeboxq.defaults.rules.timeboxq.message = "Heure invalide. Exemple correct : 14:10, 1410 ou n+15 signifie 15 minutes plus tard";
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMax = 'L\'heure doit être inférieure ou égale à {1}';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMin = 'L\'heure doit être supérieure ou égale à {0}';
	$.fn.timeboxq.defaults.rules.minMaxTime.message = 'Plage horaire non valide';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageDef = 'Période valide : {0} à {1}';
}
if ($.fn.switchbox){
	$.fn.switchbox.defaults.onText = 'Activer';
	$.fn.switchbox.defaults.offText = 'Désactiver';
}
if ($.fn.radio){
	$.fn.radio.defaults.missingMessage = 'Cet élément est requis';
}
if ($.fn.checkbox){
	$.fn.checkbox.defaults.missingMessage = 'Cet élément est requis';
}
if ($.fn.linkbutton){
	$.fn.linkbutton.defaults.waitingAlert = 'Bouton déjà cliqué, système en réponse, veuillez attendre...';
}
if ($.fn.splitbutton){
	$.fn.splitbutton.defaults.waitingAlert = $.fn.linkbutton.defaults.waitingAlert;
}
if ($.fn.menubutton){
	$.fn.menubutton.defaults.waitingAlert = $.fn.linkbutton.defaults.waitingAlert;
}