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
	<style>
		.my-demo-content{
			background-color: #e3e3e3; 
			height: 100%;
			width: 100%; 
			border-radius: 0px;
			display: grid;
			place-items: center;
		}
	</style>
</head>
<body>
	<h2>面板</h2>
	<h3>说明:</h3>
	<span>面板是其他组件或元素的容器</span>
	<h3>一、面板</h3>
	<div>
		<div class="use-prettyprint">
			<div style="padding: 10px;">
				<div class="hisui-panel" title="图标面板" style="width:500px;height: 300px;padding:10px 14px 14px 14px;"
				data-options="iconCls:'icon-panel-brand',closable:false,minimizable:false">
				<div class="my-demo-content">iconCls:'icon-paper-table'</div>
				</div>
			</div>
		</div>
	</div>
	<h3>二、多面板布局</h3>
	<div>
		<div class="use-prettyprint">
			<div style="padding: 10px;">
				<div>
					<div class="hisui-panel" title="病人信息" style="height:200px;padding:10px 14px 14px 14px;" 
					data-options="iconCls:'icon-panel-brand',closable:false,collapsible:true,minimizable:false,maximizable:false">
						面板
					</div>
				</div>
				<div style="margin: 10px 0;">
					<div class="hisui-panel" title="诊断列表" style="height:200px;padding:10px 14px 14px 14px;" 
					data-options="iconCls:'icon-panel-brand',closable:false,collapsible:true,minimizable:false,maximizable:false">
						医嘱列表信息
					</div>
				</div>
				<div>
					<div class="hisui-panel" title="医嘱列表" style="height:200px;padding:10px 14px 14px 14px;" 
					data-options="iconCls:'icon-panel-brand',closable:false,collapsible:true,minimizable:false,maximizable:false">
						医嘱列表信息
					</div>
				</div>
			</div>
			
		</div>
	</div>
	
		<h3>三、蓝色面板</h3>
		<div>
			<div class="use-prettyprint">
				<div style="padding: 10px;">
					<div>
						<div class="hisui-panel" title="蓝色面板" style="width:500px;height: 300px;padding:10px 14px 14px 14px;" 
						data-options="iconCls:'icon-panel-brand',headerCls:'panel-header-blue',closable:false,minimizable:false,maximizable:false">
							<div class="my-demo-content">
								iconCls:'panel-header-blue'
							</div>
						</div>
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
			<td>bodyCls</td>
			<td>面板内容样式类</td>
			<td>null</td>
			<td>可选值：<code>'panel-body-gray'</code></td>
		</tr>
		<tr>
			<td>headerCls</td>
			<td>面板头样式类</td>
			<td>null</td>
			<td>可选值<code>'showicon'</code>,因极简版默认不显示图标,可用showicon用于强制显示图标</td>
		</tr>
		<tr>
            <td>notTrans</td>
            <td>不自动翻译与否</td>
            <td>false</td>
            <td>默认自动翻译。true表示不翻译 <code>20230801</code></td>
        </tr>
	</table>
	<prettyprint/>
</body>
</html>