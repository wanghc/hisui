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
    <style>
		.demo-exp-code td{padding:5px 0;}
		.demo-exp-code td.r-label{padding-right: 10px;}
	</style>
	<h2>基础文字组件</h2>
	<h3>说明:</h3>
    <span>基础文字组件（label）用来实现翻译，固定间距及加红星功能 。</span>
	<h3>如：</h3>
	<div class="demo-exp-code entry-content">
		<div class="use-prettyprint lang-html"> 
		<div class="hisui-panel" title="文字组件示例" style="width:500px;padding:10px;" data-options="headerCls:'panel-header-gray',iconCls:'icon-paper',closable:false,collapsible:true,minimizable:false,maximizable:true">
			<table>
				<tr>
					<td class="hisui-label" data-options="required:true">姓名</td>
					<td>
						<input class="hisui-validatebox textbox" data-options="required:true,validType:'length[3,10]'">
					</td>
				</tr>
				<tr>
					<td class="hisui-label">生日</td>
					<td>
						<input class="hisui-datebox textbox">
					</td>
				</tr>
			</table>
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
			<td>required</td>
			<td>是否加红星符号</td>
			<td>false<code>2024-03-08</code></td>
			<td></td>
		</tr>
		<tr>
			<td>notTrans</td>
			<td>是否自动翻译,true表示不自动翻译</td>
			<td>false<code>2024-03-08</code></td>
			<td></td>
		</tr>
		<tr>
			<td>styleCss</td>
			<td>附加样式类名，默认'r-label'表示与右边元素保留10px间距</td>
			<td>r-label<code>2024-03-08</code></td>
			<td></td>
		</tr>
	</table>
	<prettyprint/>	
</body>
</html>