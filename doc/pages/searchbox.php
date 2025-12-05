<!DOCTYPE html>
<html>
<head>
	<?php echo renderHisuiResources($PAGE_CONTEXT['version'],$PAGE_CONTEXT['title']); ?>
</head>
<body>
	<h2>基础查询框</h2>
	<h3>说明:</h3>
    <span>基础查询框（searchbox）用于查询。</span>
	<h3>如：</h3>
	<div class="demo-exp-code entry-content"> 
		<div class="hisui-panel" title="查询" style="width:600px;padding:10px" data-options="headerCls:'panel-header-gray',iconCls:'icon-search'">
			<table>
				<tr>
					<td class="r-label">查询框</td>
					<td>
						<input id="ss" class="hisui-searchbox"/>
					</td>
				</tr>	
			</table>
    	</div><pre class="prettyprint hide lang-html"><code>&lt;div class="hisui-panel" title="查询" style="width:400px;padding:10px" 
			data-options="headerCls:'panel-header-gray',iconCls:'icon-search'">
	&lt;table cellpadding="5">
		&lt;tr>
			&lt;td>查询框&lt;/td>
			&lt;td>
				&lt;input id="ss" href="#" class="hisui-searchbox"/&gt;
			&lt;/td>
		&lt;/tr>				
	&lt;/table&gt;
&lt;/div&gt;</code></pre>
	<prettyprint/>	
</body>
</html>