if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '\u0f54\u0f0d';
	$.fn.pagination.defaults.afterPageText = '\u0f41\u0fb1\u0f7c\u0f53\u0f0b{pages}\u0f64\u0f7c\u0f42\u0f0b\u0f44\u0f7c\u0f66\u0f0d';
	$.fn.pagination.defaults.displayMsg = '\u0f50\u0f7c\u0f0b\u0f60\u0f42\u0f7c\u0f51\u0f0b{from}\u0f53\u0f66\u0f0b{to}\u0f56\u0f62\u0f0d \u0f41\u0fb1\u0f7c\u0f53\u0f0b{total}\u0f50\u0f7c\u0f0b\u0f60\u0f42\u0f7c\u0f51\u0f0d';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '\u0f51\u0f0b\u0f63\u0f9f\u0f0b\u0f56\u0f40\u0f7c\u0f63\u0f0b\u0f66\u0fa4\u0fb1\u0f7c\u0f51\u0f0b\u0f56\u0fb1\u0f7a\u0f51\u0f0b\u0f56\u0f5e\u0f72\u0f53\u0f0b\u0f61\u0f7c\u0f51\u0f0d \u0f66\u0f92\u0f74\u0f42\u0f0b\u0f62\u0f7c\u0f42\u0f66\u0f0b\u0f42\u0f53\u0f44\u0f0b\u0f0d...';
	$.fn.datagrid.defaults.findBtn = "\u0f60\u0f5a\u0f7c\u0f63\u0f0b\u0f5e\u0f72\u0f56\u0f0d";
	$.fn.datagrid.defaults.clearBtn = "\u0f42\u0f66\u0f63\u0f0b\u0f56\u0f64\u0f7a\u0f62\u0f0d";
	$.fn.datagrid.defaults.advancedBtn = "\u0f58\u0f50\u0f7c\u0f0b\u0f62\u0f72\u0f58\u0f0d";
	$.fn.datagrid.defaults.advanced2Btn = "\u0f56\u0f66\u0fa1\u0f74\u0f0b\u0f62\u0f92\u0fb1\u0f42";
	$.fn.datagrid.defaults.like = "\u0f67\u0fb2\u0f74\u0f63\u0f0b\u0f54\u0f7c\u0f60\u0f72\u0f0b\u0f60\u0f5a\u0f7c\u0f63\u0f0b\u0f5e\u0f72\u0f56\u0f0d";
	$.fn.datagrid.defaults.nocol = "\u0f68\u0f44\u0f0b\u0f62\u0f72\u0f58\u0f0d";
}
if ($.fn.propertygrid) {
	$.fn.propertygrid.defaults.findBtn = "\u0f60\u0f5a\u0f7c\u0f63\u0f0b\u0f5e\u0f72\u0f56\u0f0d";
	$.fn.propertygrid.defaults.clearBtn = "\u0f42\u0f66\u0f63\u0f0b\u0f56\u0f64\u0f7a\u0f62\u0f0d";
	$.fn.propertygrid.defaults.advancedBtn = "\u0f58\u0f50\u0f7c\u0f0b\u0f62\u0f72\u0f58\u0f0d";
	$.fn.propertygrid.defaults.advanced2Btn = "\u0f56\u0f66\u0fa1\u0f74\u0f0b\u0f62\u0f92\u0fb1\u0f42";
	$.fn.propertygrid.defaults.like = "\u0f67\u0fb2\u0f74\u0f63\u0f0b\u0f54\u0f7c\u0f60\u0f72\u0f0b\u0f60\u0f5a\u0f7c\u0f63\u0f0b\u0f5e\u0f72\u0f56\u0f0d";
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '\u0f44\u0f7a\u0f66\u0f0b\u0f54\u0f0d';
	$.messager.defaults.yes = '\u0f62\u0f7a\u0f51\u0f0d';
	$.messager.defaults.no = '\u0f58\u0f72\u0f53\u0f0d';
	$.messager.defaults.cancel = '\u0f55\u0fb1\u0f72\u0f62\u0f0b\u0f60\u0f50\u0f7a\u0f53\u0f0d';
}
if ($.fn.validatebox){
	$.fn.validatebox.defaults.missingMessage = '\u0f60\u0f51\u0f72\u0f0b\u0f53\u0f53\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f72\u0f0b\u0f62\u0fa3\u0f58\u0f0b\u0f54\u0f0b\u0f44\u0f7a\u0f66\u0f0b\u0f54\u0f62\u0f0b\u0f51\u0f74\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f56\u0fb1\u0f7a\u0f51\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
	$.fn.validatebox.defaults.rules.email.message = '\u0f53\u0f74\u0f66\u0f0b\u0f63\u0fa1\u0f53\u0f0b\u0f42\u0fb1\u0f72\u0f0b\u0f42\u0fb3\u0f7c\u0f42\u0f0b\u0f60\u0f55\u0fb2\u0f72\u0f53\u0f0b\u0f41\u0f0b\u0f56\u0fb1\u0f44\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f53\u0f44\u0f0b\u0f62\u0f7c\u0f42\u0f66\u0f0d';
	$.fn.validatebox.defaults.rules.url.message = '\u0f53\u0f74\u0f66\u0f0b\u0f63\u0fa1\u0f53\u0f0b\u0f42\u0fb1\u0f72\u0f0bURL \u0f41\u0f0b\u0f56\u0fb1\u0f44\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f53\u0f44\u0f0b\u0f62\u0f7c\u0f42\u0f66\u0f0d';
	$.fn.validatebox.defaults.rules.length.message = '\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f72\u0f0b\u0f62\u0f72\u0f44\u0f0b\u0f5a\u0f51\u0f0b{0}\u0f51\u0f44\u0f0b{1}\u0f56\u0f62\u0f0b\u0f51\u0f74\u0f0b\u0f61\u0f72\u0f53\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
	$.fn.validatebox.defaults.rules.remote.message = '\u0f5e\u0f72\u0f56\u0f0b\u0f56\u0f45\u0f7c\u0f66\u0f0b\u0f42\u0f53\u0f44\u0f0b\u0f62\u0f7c\u0f42\u0f66\u0f0d';
	$.fn.validatebox.defaults.rules.idcard.message = "\u0f53\u0f74\u0f66\u0f0b\u0f63\u0fa1\u0f53\u0f0b\u0f42\u0fb1\u0f72\u0f0b\u0f50\u0f7c\u0f56\u0f0b\u0f50\u0f44\u0f0b\u0f63\u0f42\u0f0b\u0f60\u0f41\u0fb1\u0f7a\u0f62\u0f0b\u0f68\u0f44\u0f0b\u0f42\u0fb2\u0f44\u0f66\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f53\u0f44\u0f0b\u0f62\u0f7c\u0f42\u0f66\u0f0d";
	$.fn.validatebox.defaults.rules.idcard.formattermessage = "\u0f53\u0f74\u0f66\u0f0b\u0f63\u0fa1\u0f53\u0f0b\u0f42\u0fb1\u0f72\u0f0b\u0f50\u0f7c\u0f56\u0f0b\u0f50\u0f44\u0f0b\u0f63\u0f42\u0f0b\u0f60\u0f41\u0fb1\u0f7a\u0f62\u0f0b\u0f68\u0f44\u0f0b\u0f42\u0fb2\u0f44\u0f66\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f53\u0f44\u0f0b\u0f62\u0f7c\u0f42\u0f66\u0f0d \u0f62\u0fa3\u0f58\u0f0b\u0f42\u0f5e\u0f42\u0f0b\u0f53\u0f7c\u0f62\u0f0b\u0f60\u0f41\u0fb2\u0f74\u0f63\u0f0d";
	$.fn.validatebox.defaults.rules.idcard.addrmessage = "\u0f53\u0f74\u0f66\u0f0b\u0f63\u0fa1\u0f53\u0f0b\u0f42\u0fb1\u0f72\u0f0b\u0f50\u0f7c\u0f56\u0f0b\u0f50\u0f44\u0f0b\u0f63\u0f42\u0f0b\u0f60\u0f41\u0fb1\u0f7a\u0f62\u0f0b\u0f68\u0f44\u0f0b\u0f42\u0fb2\u0f44\u0f66\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f53\u0f44\u0f0b\u0f62\u0f7c\u0f42\u0f66\u0f0d \u0f68\u0f44\u0f0b\u0f42\u0fb2\u0f44\u0f66\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f5e\u0f72\u0f56\u0f0b\u0f56\u0f64\u0f7a\u0f62\u0f0d";
	$.fn.validatebox.defaults.rules.idcard.paritymessage = "\u0f53\u0f74\u0f66\u0f0b\u0f63\u0fa1\u0f53\u0f0b\u0f42\u0fb1\u0f72\u0f0b\u0f50\u0f7c\u0f56\u0f0b\u0f50\u0f44\u0f0b\u0f63\u0f42\u0f0b\u0f60\u0f41\u0fb1\u0f7a\u0f62\u0f0b\u0f68\u0f44\u0f0b\u0f42\u0fb2\u0f44\u0f66\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f53\u0f44\u0f0b\u0f62\u0f7c\u0f42\u0f66\u0f0d \u0f5e\u0f72\u0f56\u0f0b\u0f56\u0f64\u0f7a\u0f62\u0f0b\u0f42\u0f53\u0f66\u0f0b\u0f53\u0f7c\u0f62\u0f0b\u0f60\u0f41\u0fb2\u0f74\u0f63\u0f0d";
	$.fn.validatebox.defaults.rules.mobilephone.message = "\u0f53\u0f74\u0f66\u0f0b\u0f63\u0fa1\u0f53\u0f0b\u0f42\u0fb1\u0f72\u0f0b\u0f63\u0f42\u0f0b\u0f50\u0f7c\u0f42\u0f0b\u0f41\u0f0b\u0f54\u0f62\u0f0b\u0f68\u0f44\u0f0b\u0f42\u0fb2\u0f44\u0f66\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f53\u0f44\u0f0b\u0f62\u0f7c\u0f42\u0f66\u0f0d";
}
if ($.fn.spinner){
	$.fn.spinner.defaults.missingMessage = '\u0f60\u0f51\u0f72\u0f0b\u0f53\u0f53\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f72\u0f0b\u0f62\u0fa3\u0f58\u0f0b\u0f54\u0f0b\u0f44\u0f7a\u0f66\u0f0b\u0f54\u0f62\u0f0b\u0f51\u0f74\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f56\u0fb1\u0f7a\u0f51\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
}
if ($.fn.timespinner){
	$.fn.timespinner.defaults.missingMessage = '\u0f60\u0f51\u0f72\u0f0b\u0f53\u0f53\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f72\u0f0b\u0f62\u0fa3\u0f58\u0f0b\u0f54\u0f0b\u0f44\u0f7a\u0f66\u0f0b\u0f54\u0f62\u0f0b\u0f51\u0f74\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f56\u0fb1\u0f7a\u0f51\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
}
if ($.fn.numberbox){
	$.fn.numberbox.defaults.missingMessage = '\u0f60\u0f51\u0f72\u0f0b\u0f53\u0f53\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f72\u0f0b\u0f62\u0fa3\u0f58\u0f0b\u0f54\u0f0b\u0f44\u0f7a\u0f66\u0f0b\u0f54\u0f62\u0f0b\u0f51\u0f74\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f56\u0fb1\u0f7a\u0f51\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
	$.fn.numberbox.defaults.rules.min.message = '\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f72\u0f0b\u0f42\u0fb2\u0f44\u0f66\u0f0b\u0f50\u0f44\u0f0b{0}\u0f63\u0f66\u0f0b\u0f58\u0f44\u0f0b\u0f44\u0f58\u0f0b\u0f58\u0f5a\u0f74\u0f44\u0f66\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
	$.fn.numberbox.defaults.rules.max.message = '\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f72\u0f0b\u0f42\u0fb2\u0f44\u0f66\u0f0b\u0f50\u0f44\u0f0b{0}\u0f63\u0f66\u0f0b\u0f49\u0f74\u0f44\u0f0b\u0f44\u0f58\u0f0b\u0f58\u0f5a\u0f74\u0f44\u0f66\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
}
if ($.fn.combobox){
	$.fn.combobox.defaults.selectAllBtnDesc = '\u0f46\u0f0b\u0f5a\u0f44\u0f0b\u0f60\u0f51\u0f7a\u0f58\u0f66\u0f0d / \u0f46\u0f0b\u0f5a\u0f44\u0f0b\u0f60\u0f51\u0f7a\u0f58\u0f66\u0f0b\u0f54\u0f0b\u0f55\u0fb1\u0f72\u0f62\u0f0b\u0f60\u0f50\u0f7a\u0f53\u0f0d';
	$.fn.combobox.defaults.missingMessage = '\u0f60\u0f51\u0f72\u0f0b\u0f53\u0f53\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f72\u0f0b\u0f62\u0fa3\u0f58\u0f0b\u0f54\u0f0b\u0f44\u0f7a\u0f66\u0f0b\u0f54\u0f62\u0f0b\u0f51\u0f74\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f56\u0fb1\u0f7a\u0f51\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
}
if ($.fn.combotree){
	$.fn.combotree.defaults.missingMessage = '\u0f60\u0f51\u0f72\u0f0b\u0f53\u0f53\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f72\u0f0b\u0f62\u0fa3\u0f58\u0f0b\u0f54\u0f0b\u0f44\u0f7a\u0f66\u0f0b\u0f54\u0f62\u0f0b\u0f51\u0f74\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f56\u0fb1\u0f7a\u0f51\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
}
if ($.fn.combogrid){
	$.fn.combogrid.defaults.missingMessage = '\u0f60\u0f51\u0f72\u0f0b\u0f53\u0f53\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f72\u0f0b\u0f62\u0fa3\u0f58\u0f0b\u0f54\u0f0b\u0f44\u0f7a\u0f66\u0f0b\u0f54\u0f62\u0f0b\u0f51\u0f74\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f56\u0fb1\u0f7a\u0f51\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
	$.fn.combogrid.defaults.loadMsg = '\u0f51\u0f0b\u0f63\u0f9f\u0f0b\u0f56\u0f40\u0f7c\u0f63\u0f0b\u0f66\u0fa4\u0fb1\u0f7c\u0f51\u0f0b\u0f56\u0fb1\u0f7a\u0f51\u0f0b\u0f56\u0f5e\u0f72\u0f53\u0f0b\u0f61\u0f7c\u0f51\u0f0d \u0f66\u0f92\u0f74\u0f42\u0f0b\u0f62\u0f7c\u0f42\u0f66\u0f0b\u0f42\u0f53\u0f44\u0f0b\u0f0d...';
	$.fn.combogrid.defaults.findBtn = "\u0f60\u0f5a\u0f7c\u0f63\u0f0b\u0f5e\u0f72\u0f56\u0f0d";
	$.fn.combogrid.defaults.clearBtn = "\u0f42\u0f66\u0f63\u0f0b\u0f56\u0f64\u0f7a\u0f62\u0f0d";
	$.fn.combogrid.defaults.advancedBtn = "\u0f58\u0f50\u0f7c\u0f0b\u0f62\u0f72\u0f58\u0f0d";
	$.fn.combogrid.defaults.advanced2Btn = "\u0f56\u0f66\u0fa1\u0f74\u0f0b\u0f62\u0f92\u0fb1\u0f42";
	$.fn.combogrid.defaults.like = "\u0f67\u0fb2\u0f74\u0f63\u0f0b\u0f54\u0f7c\u0f60\u0f72\u0f0b\u0f60\u0f5a\u0f7c\u0f63\u0f0b\u0f5e\u0f72\u0f56\u0f0d";
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['\u0f49\u0f72\u0f0d','\u0f5f\u0fb3\u0f0d','\u0f58\u0f72\u0f42','\u0f63\u0fb7\u0f42','\u0f55\u0f74\u0f62','\u0f54\u0f0b\u0f66\u0f44\u0f66\u0f0d','\u0f66\u0fa4\u0f7a\u0f53\u0f0d'];
	$.fn.calendar.defaults.months = ['\u0f5f\u0fb3\u0f0b\u0f51\u0f44\u0f0b\u0f54\u0f7c\u0f0d','\u0f5f\u0fb3\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54\u0f0d','\u0f5f\u0fb3\u0f0b\u0f42\u0f66\u0f74\u0f58\u0f0b\u0f54\u0f0d','\u0f5f\u0fb3\u0f0b\u0f56\u0f5e\u0f72\u0f0b\u0f54\u0f0d','\u0f5f\u0fb3\u0f0b\u0f63\u0f94\u0f0b\u0f54\u0f0d','\u0f5f\u0fb3\u0f0b\u0f51\u0fb2\u0f74\u0f42\u0f0b\u0f54\u0f0d','\u0f5f\u0fb3\u0f0b\u0f56\u0f51\u0f74\u0f53\u0f0b\u0f54\u0f0d','\u0f5f\u0fb3\u0f0b\u0f56\u0f62\u0f92\u0fb1\u0f51\u0f0b\u0f54\u0f0d','\u0f5f\u0fb3\u0f0b\u0f51\u0f42\u0f74\u0f0b\u0f54\u0f0d','\u0f5f\u0fb3\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f54\u0f0d','\u0f5f\u0fb3\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f45\u0f72\u0f42\u0f0b\u0f54\u0f0d','\u0f5f\u0fb3\u0f0b\u0f56\u0f45\u0f74\u0f0b\u0f42\u0f49\u0f72\u0f66\u0f0b\u0f54\u0f0d'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '<span class="date-today-btn">\u0f51\u0f7a\u0f0b\u0f62\u0f72\u0f44\u0f0b\u0f0d</span>';
	$.fn.datebox.defaults.closeText = '<span class="date-close-btn">\u0f41\u0f0b\u0f62\u0f92\u0fb1\u0f42</span>';
	$.fn.datebox.defaults.okText = '<span class="date-ok-btn">\u0f44\u0f7a\u0f66\u0f0b\u0f54\u0f0d</span>';
	$.fn.datebox.defaults.missingMessage = '\u0f60\u0f51\u0f72\u0f0b\u0f53\u0f53\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f42\u0f72\u0f0b\u0f62\u0fa3\u0f58\u0f0b\u0f54\u0f0b\u0f44\u0f7a\u0f66\u0f0b\u0f54\u0f62\u0f0b\u0f51\u0f74\u0f0b\u0f53\u0f44\u0f0b\u0f60\u0f47\u0f74\u0f42\u0f0b\u0f56\u0fb1\u0f7a\u0f51\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
	$.fn.datebox.defaults.rules.datebox.message = '\u0f41\u0fb2\u0f72\u0f58\u0f66\u0f0b\u0f58\u0f50\u0f74\u0f53\u0f0b\u0f58\u0f72\u0f53\u0f0b\u0f54\u0f60\u0f72\u0f0b\u0f5a\u0f7a\u0f66\u0f0b\u0f42\u0fb2\u0f44\u0f66\u0f0d \u0f61\u0f44\u0f0b\u0f51\u0f42\u0f0b\u0f54\u0f60\u0f72\u0f0b\u0f62\u0fa3\u0f58\u0f0b\u0f42\u0f5e\u0f42\u0f0b: 2019-01-06';
	$.fn.datebox.defaults.rules.minMaxDate.messageMax = '\u0f5a\u0f7a\u0f66\u0f0b\u0f42\u0fb2\u0f44\u0f66\u0f0b{1}\u0f63\u0f66\u0f0b\u0f49\u0f74\u0f44\u0f0b\u0f44\u0f58\u0f0b\u0f58\u0f5a\u0f74\u0f44\u0f66\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
	$.fn.datebox.defaults.rules.minMaxDate.messageMin = '\u0f5a\u0f7a\u0f66\u0f0b\u0f42\u0fb2\u0f44\u0f66\u0f0b{0}\u0f63\u0f66\u0f0b\u0f58\u0f44\u0f0b\u0f44\u0f58\u0f0b\u0f58\u0f5a\u0f74\u0f44\u0f66\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
	$.fn.datebox.defaults.rules.minMaxDate.message = '\u0f53\u0f74\u0f66\u0f0b\u0f63\u0fa1\u0f53\u0f0b\u0f58\u0f72\u0f53\u0f0b\u0f54\u0f60\u0f72\u0f0b\u0f5a\u0f7a\u0f66\u0f0b\u0f42\u0fb2\u0f44\u0f66\u0f0b\u0f41\u0fb1\u0f56\u0f0b\u0f41\u0f7c\u0f44\u0f66\u0f0d';
	$.fn.datebox.defaults.rules.minMaxDate.messageDef = '\u0f53\u0f74\u0f66\u0f0b\u0f63\u0fa1\u0f53\u0f0b\u0f5a\u0f7a\u0f66\u0f0b\u0f42\u0fb2\u0f44\u0f66\u0f0b\u0f41\u0fb1\u0f56\u0f0b\u0f41\u0f7c\u0f44\u0f66\u0f0d {0} \u0f53\u0f66\u0f0b {1} \u0f56\u0f62\u0f0d';
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
	$.fn.filebox.defaults.buttonText = '\u0f60\u0f51\u0f7a\u0f58\u0f66\u0f0b\u0f54\u0f0d';
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
	$.fn.timeboxq.defaults.rules.timeboxq.message = "\u0f41\u0fb2\u0f72\u0f58\u0f66\u0f0b\u0f58\u0f50\u0f74\u0f53\u0f0b\u0f58\u0f72\u0f53\u0f0b\u0f54\u0f60\u0f72\u0f0b\u0f51\u0f74\u0f66\u0f0b\u0f5a\u0f7c\u0f51\u0f0d \u0f51\u0f54\u0f7a\u0f62\u0f0b\u0f53\u0f0d 14:10, 1410 \u0f61\u0f44\u0f0b\u0f53 n+15 \u0f53\u0f72\u0f0b\u0f66\u0f90\u0f62\u0f0b\u0f58\u0f0b15 \u0f62\u0f97\u0f7a\u0f66\u0f0b\u0f66\u0f74\u0f0d";
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMax = '\u0f51\u0f74\u0f66\u0f0b\u0f5a\u0f7c\u0f51\u0f0b{1}\u0f63\u0f66\u0f0b\u0f49\u0f74\u0f44\u0f0b\u0f44\u0f58\u0f0b\u0f58\u0f5a\u0f74\u0f44\u0f66\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageMin = '\u0f51\u0f74\u0f66\u0f0b\u0f5a\u0f7c\u0f51\u0f0b{0}\u0f63\u0f66\u0f0b\u0f58\u0f44\u0f0b\u0f44\u0f58\u0f0b\u0f58\u0f5a\u0f74\u0f44\u0f66\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
	$.fn.timeboxq.defaults.rules.minMaxTime.message = '\u0f53\u0f74\u0f66\u0f0b\u0f63\u0fa1\u0f53\u0f0b\u0f58\u0f72\u0f53\u0f0b\u0f54\u0f60\u0f72\u0f0b\u0f51\u0f74\u0f66\u0f0b\u0f5a\u0f7c\u0f51\u0f0b\u0f41\u0fb1\u0f56\u0f0b\u0f41\u0f7c\u0f44\u0f66\u0f0d';
	$.fn.timeboxq.defaults.rules.minMaxTime.messageDef = '\u0f53\u0f74\u0f66\u0f0b\u0f63\u0fa1\u0f53\u0f0b\u0f51\u0f74\u0f66\u0f0b\u0f5a\u0f7c\u0f51\u0f0b\u0f41\u0fb1\u0f56\u0f0b\u0f41\u0f7c\u0f44\u0f66\u0f0d {0} \u0f53\u0f66\u0f0b {1} \u0f56\u0f62\u0f0d';
}
if ($.fn.switchbox){
	$.fn.switchbox.defaults.onText = '\u0f55\u0fb1\u0f7a\u0f0d';
	$.fn.switchbox.defaults.offText = '\u0f56\u0f66\u0fa1\u0f74\u0f0d';
}
if ($.fn.radio){
	$.fn.radio.defaults.missingMessage = '\u0f60\u0f51\u0f72\u0f0b\u0f44\u0f7a\u0f66\u0f0b\u0f54\u0f62\u0f0b\u0f51\u0f74\u0f0b\u0f60\u0f51\u0f7a\u0f58\u0f66\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
}
if ($.fn.checkbox){
	$.fn.checkbox.defaults.missingMessage = '\u0f60\u0f51\u0f72\u0f0b\u0f44\u0f7a\u0f66\u0f0b\u0f54\u0f62\u0f0b\u0f51\u0f74\u0f0b\u0f60\u0f51\u0f7a\u0f58\u0f66\u0f0b\u0f51\u0f42\u0f7c\u0f66\u0f0d';
}
if ($.fn.linkbutton){
	$.fn.linkbutton.defaults.waitingAlert = '\u0f58\u0f50\u0f7a\u0f56\u0f0b\u0f63\u0fa1\u0f7a\u0f0b\u0f58\u0f53\u0f53\u0f0b\u0f5f\u0f72\u0f53\u0f0d \u0f58\u0f0b\u0f63\u0f42\u0f0b\u0f63\u0f53\u0f0b\u0f66\u0fb3\u0f7c\u0f42\u0f0b\u0f56\u0fb1\u0f7a\u0f51\u0f0b\u0f56\u0f5e\u0f72\u0f53\u0f0b\u0f61\u0f7c\u0f51\u0f0d \u0f66\u0f92\u0f74\u0f42\u0f0b\u0f62\u0f7c\u0f42\u0f66\u0f0b\u0f42\u0f53\u0f44\u0f0b\u0f0d...';
}
if ($.fn.splitbutton){
	$.fn.splitbutton.defaults.waitingAlert = $.fn.linkbutton.defaults.waitingAlert;
}
if ($.fn.menubutton){
	$.fn.menubutton.defaults.waitingAlert = $.fn.linkbutton.defaults.waitingAlert;
}
if ($.fn.tabs){
	$.fn.tabs.defaults.noHiddenTabs = "（\u0f42\u0f56\u0f0b\u0f54\u0f60\u0f72\u0f0b\u0f64\u0f7c\u0f42\u0f0b\u0f41\u0f0b\u0f58\u0f7a\u0f51\u0f0d）";
	$.fn.tabs.defaults.refreshText = "\u0f42\u0f66\u0f62\u0f0b\u0f56\u0f66\u0f92\u0fb1\u0f74\u0f62\u0f0d";
	$.fn.tabs.defaults.closeText = "\u0f41\u0f0b\u0f62\u0f92\u0fb1\u0f42";
	$.fn.tabs.defaults.closeOtherText = "\u0f42\u0f5e\u0f53\u0f0b\u0f54\u0f0b\u0f41\u0f0b\u0f62\u0f92\u0fb1\u0f42";
	$.fn.tabs.defaults.closeAllText = "\u0f46\u0f0b\u0f5a\u0f44\u0f0b\u0f41\u0f0b\u0f62\u0f92\u0fb1\u0f42";
	$.fn.tabs.defaults.closeLeftText = "\u0f42\u0f61\u0f7c\u0f53\u0f0b\u0f55\u0fb1\u0f7c\u0f42\u0f66\u0f0b\u0f41\u0f0b\u0f62\u0f92\u0fb1\u0f42";
	$.fn.tabs.defaults.closeRightText = "\u0f42\u0f61\u0f66\u0f0b\u0f55\u0fb1\u0f7c\u0f42\u0f66\u0f0b\u0f41\u0f0b\u0f62\u0f92\u0fb1\u0f42";
}
if ($.fn.menutree){
	$.fn.menutree.defaults.title = "\u0f63\u0f58\u0f0b\u0f66\u0f9f\u0f7c\u0f53\u0f0b\u0f58\u0f7a\u0f0b\u0f53\u0f74\u0f0d";
}
if ($.fn.combogridmult){
	$.fn.combogridmult.defaults.columns = [[
		{field:'id',title:'id',width:60},
		{field:'text',title:'\u0f42\u0f66\u0f63\u0f0b\u0f56\u0f64\u0f51\u0f0d',width:220},
		{field:'code',title:'\u0f68\u0f44\u0f0b\u0f62\u0f9f\u0f42\u0f66\u0f0d',width:150}
	]];
}

/* ==================== 無障礙按鈕標籤（aria-label） ==================== */
(function () {
	/* panel 工具按鈕：折疊/展開/最小化/最大化/還原/關閉（window、dialog、messager 共用） */
	var panelA11y = {
		collapseText: '\u0f56\u0f66\u0fa1\u0f74\u0f0b\u0f56\u0f0d', expandText: '\u0f62\u0f92\u0fb1\u0f0b\u0f66\u0f90\u0fb1\u0f7a\u0f51\u0f0d',
		minimizeText: '\u0f46\u0f74\u0f44\u0f0b\u0f64\u0f7c\u0f66\u0f0b\u0f66\u0f74\u0f0b\u0f56\u0f5f\u0f7c\u0f0b\u0f56\u0f0d', maximizeText: '\u0f46\u0f7a\u0f0b\u0f64\u0f7c\u0f66\u0f0b\u0f66\u0f74\u0f0b\u0f56\u0f5f\u0f7c\u0f0b\u0f56\u0f0d',
		restoreText: '\u0f66\u0fb3\u0f62\u0f0b\u0f42\u0f66\u0f7c\u0f0d', closeText: '\u0f41\u0f0b\u0f62\u0f92\u0fb1\u0f42'
	};
	['panel', 'window', 'dialog', 'datagrid', 'propertygrid', 'treegrid'].forEach(function (n) {
		if ($.fn[n] && $.fn[n].defaults) $.extend($.fn[n].defaults, panelA11y);
	});
	if ($.fn.layout && $.fn.layout.paneldefaults) $.extend($.fn.layout.paneldefaults, panelA11y);

	/* combo 下拉箭頭 / 清空按鈕 */
	var comboA11y = { arrowText: '\u0f50\u0f7c\u0f53\u0f0b\u0f62\u0f72\u0f66\u0f0b\u0f55\u0fb1\u0f7a\u0f0b\u0f56\u0f60\u0f58\u0f0b\u0f56\u0f66\u0fa1\u0f74\u0f0b\u0f56\u0f0d', clearText: '\u0f56\u0f66\u0f74\u0f56\u0f0b\u0f54\u0f0d' };
	['combo', 'combobox', 'combotree', 'combogrid', 'combogridmult', 'datebox', 'datetimebox',
	 'comboq', 'dateboxq', 'datetimeboxq', 'lookup', 'triggerbox'].forEach(function (n) {
		if ($.fn[n] && $.fn[n].defaults) $.extend($.fn[n].defaults, comboA11y);
	});

	/* spinner 上下箭頭 */
	var spinnerA11y = { spinUpText: '\u0f60\u0f55\u0f7a\u0f63\u0f0b\u0f56\u0f0d', spinDownText: '\u0f60\u0f56\u0fb2\u0f72\u0f0b\u0f56\u0f0d' };
	['spinner', 'numberspinner', 'timespinner'].forEach(function (n) {
		if ($.fn[n] && $.fn[n].defaults) $.extend($.fn[n].defaults, spinnerA11y);
	});

	/* tabs 滾動箭頭、溢出菜單按鈕、頁簽關閉按鈕 */
	if ($.fn.tabs) {
		$.extend($.fn.tabs.defaults, {
			closeText: '\u0f41\u0f0b\u0f62\u0f92\u0fb1\u0f42', scrollLeftText: '\u0f42\u0f61\u0f7c\u0f53\u0f0b\u0f55\u0fb1\u0f7c\u0f42\u0f66\u0f0b\u0f66\u0f74\u0f0b\u0f56\u0f66\u0f90\u0f7c\u0f62\u0f0b\u0f56\u0f0d',
			scrollRightText: '\u0f42\u0f61\u0f66\u0f0b\u0f55\u0fb1\u0f7c\u0f42\u0f66\u0f0b\u0f66\u0f74\u0f0b\u0f56\u0f66\u0f90\u0f7c\u0f62\u0f0b\u0f56\u0f0d', overflowBtnText: '\u0f64\u0f7c\u0f42\u0f0b\u0f41\u0f0b\u0f58\u0f44\u0f0b\u0f56\u0f0d'
		});
	}
	/* layout 區域收起/展開按鈕 */
	if ($.fn.layout) {
		$.extend($.fn.layout.defaults, {
			collapseNorthText: '\u0f42\u0f7c\u0f44\u0f0b\u0f55\u0fb1\u0f7c\u0f42\u0f66\u0f0b\u0f56\u0f66\u0fa1\u0f74\u0f0b\u0f56\u0f0d', collapseSouthText: '\u0f60\u0f7c\u0f42\u0f0b\u0f55\u0fb1\u0f7c\u0f42\u0f66\u0f0b\u0f56\u0f66\u0fa1\u0f74\u0f0b\u0f56\u0f0d',
			collapseEastText: '\u0f42\u0f61\u0f66\u0f0b\u0f55\u0fb1\u0f7c\u0f42\u0f66\u0f0b\u0f56\u0f66\u0fa1\u0f74\u0f0b\u0f56\u0f0d', collapseWestText: '\u0f42\u0f61\u0f7c\u0f53\u0f0b\u0f55\u0fb1\u0f7c\u0f42\u0f66\u0f0b\u0f56\u0f66\u0fa1\u0f74\u0f0b\u0f56\u0f0d',
			expandNorthText: '\u0f42\u0f7c\u0f44\u0f0b\u0f55\u0fb1\u0f7c\u0f42\u0f66\u0f0b\u0f62\u0f92\u0fb1\u0f0b\u0f66\u0f90\u0fb1\u0f7a\u0f51\u0f0d', expandSouthText: '\u0f60\u0f7c\u0f42\u0f0b\u0f55\u0fb1\u0f7c\u0f42\u0f66\u0f0b\u0f62\u0f92\u0fb1\u0f0b\u0f66\u0f90\u0fb1\u0f7a\u0f51\u0f0d',
			expandEastText: '\u0f42\u0f61\u0f66\u0f0b\u0f55\u0fb1\u0f7c\u0f42\u0f66\u0f0b\u0f62\u0f92\u0fb1\u0f0b\u0f66\u0f90\u0fb1\u0f7a\u0f51\u0f0d', expandWestText: '\u0f42\u0f61\u0f7c\u0f53\u0f0b\u0f55\u0fb1\u0f7c\u0f42\u0f66\u0f0b\u0f62\u0f92\u0fb1\u0f0b\u0f66\u0f90\u0fb1\u0f7a\u0f51\u0f0d'
		});
	}
	if ($.fn.searchbox) $.fn.searchbox.defaults.searchText = '\u0f60\u0f5a\u0f7c\u0f63\u0f0b\u0f5e\u0f72\u0f56\u0f0d';
	if ($.fn.inputclearbtn) $.fn.inputclearbtn.defaults.clearText = '\u0f56\u0f66\u0f74\u0f56\u0f0b\u0f54\u0f0d';
})();