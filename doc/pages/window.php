<?php
// 防止直接访问
if (!defined('ACCESS_FROM_INDEX')) {
    http_response_code(403);
    die('Direct access forbidden.');
}
?>
<!DOCTYPE html>
<html>
<head>
	<?php echo renderHisuiResources($PAGE_CONTEXT['version'],$PAGE_CONTEXT['title']); ?>
</head>
<body>	
	<h2>窗口</h2>
	<h3>说明:</h3>
    <span>窗口（window）默认有四个工具：collapsible、minimizable、maximizable和closable。</span>
	<h3>如：</h3>
	<div style="width: 666px;height: 31px"></div>
	<div class="demo-exp-code entry-content">
		<div class="use-prettyprint lang-html"> 
	
		<div class="hisui-window" title="完成接诊" style="width:474px;height:274px;padding:0 20px 20px;" data-options="iconCls:'icon-w-save',resizable:true,modal:false,constrain:true">
			<div class="hisui-panel" fit="true" style="padding: 10px;">
				我是一个Window窗口 <code>hisui-window</code>  
			</div>
	
		</div>
		</div>
	</div>
	<table class="table">
		<tr class="protitle">
			<th>属性</th>
			<th>说明</th>
			<th>默认值</th>
			<th></th>
		</tr>
		<tr>
			<td>isTopZindex</td>
			<td>是否覆盖控件界面</td>
			<td>false</td>
			<td>默认情况下会被病历控件遮盖，true时则可显示到最上层,但dom会复杂些。</td>
		</tr>
	</table>
	<prettyprint/>
</body>
</html>