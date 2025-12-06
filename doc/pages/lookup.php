<?php
// 防止直接访问
if (!defined('ACCESS_FROM_INDEX')) {
    http_response_code(403);
    die('Direct access forbidden.');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<?php echo renderHisuiResources($PAGE_CONTEXT['version'],$PAGE_CONTEXT['title']); ?>
</head>
    <body>
	<script src="../pages/lookup/data.js" type="text/javascript"></script>
	<h2>放大镜</h2>
	<h3>说明:</h3>
	<span>继承于comobq与datagrid，按钮实现方式不再一样，在IE8或IE11下速度大大提高。在首次初始化时不初始化列表，无论界面中有多少个放大镜，界面只存在一个列表。即只保留当前激活下拉框列表数据。</span>
	<h3>基础使用</h3>
	<div class="demo-exp-code entry-content">
		<div class="use-prettyprint">
			<table>
				<tbody>
					<tr>
						<td class="r-label">安全组</td>
						<td><input id="group" class="textbox" /></td>
					</tr>
				</tbody>
			</table>
		</div>
		<script type='text/javascript' class="use-prettyprint">
			$(function(){
				$("#group").lookup({
					width:200,
					lookupGridId:"lookupGridId",
					panelWidth:800,
					striped:false,
					
					url:'getGroup',
					mode:'remote',
					idField:'HIDDEN',
					textField:'Description',
					columns:[[  
						{field:'Description',title:'安全组名称',width:200},  
						{field:'HIDDEN',title:'安全组ID',width:100} ,
						{field:'Other',title:'其他信息',width:400,formatter:function(val,row){
							return row['Description']+'：分配人数'+Math.floor(Math.random()*500)
						}} 
					]],
					pagination:true,
					onSelect:function(index,rowData){
						console.log("index="+index+",rowData=",rowData);
						//$('#group').lookup('setText',rowData.HIDDEN+"-"+rowData.Description);  //textField虽是Description，在onSelect这可以自己改显示的值 但此种操作需要自己处理好查询条件间的关系
					}
				});
			})
		</script>
	</div><!--END demo-exp-code entry-content-->


	<h3>当输入3个字符以上开始查询</h3>
	<div class="demo-exp-code entry-content">
		<div class="use-prettyprint">
			<table>
				<tbody>
					<tr>
						<td class="r-label">科室</td>
						<td><input id="loc" class="textbox" /></td>
					</tr>
				</tbody>
			</table>
		</div>
		<script type='text/javascript' class="use-prettyprint">
			$(function(){
				$("#loc").lookup({
					// disabled:true,
					// readOnly:true,
					// hasDownArrow:false,
					width:200,
					
					panelWidth:500,
					
					url:'getLoc',
					mode:'remote',
					idField:'HIDDEN',
					textField:'Description',
					columns:[[  
						{field:'Code',title:'科室代码',width:150},  
						{field:'Description',title:'科室描述',width:200},  
						{field:'HIDDEN',title:'科室ID',width:50}  
					]],
					pagination:true,
					onSelect:function(index,rowData){
						console.log("index="+index+",rowData=",rowData);
					},
					isCombo:true,
					enableNumberEvent:true,
					minQueryLen:1
				});
			})
		</script>
	</div><!--END demo-exp-code entry-content-->

	<h3>禁用启用，是否只读切换示例</h3>
	<div class="demo-exp-code entry-content"> 
		<table class='use-prettyprint'>
			<tbody>
			<tr>
				<td class="r-label">用户</td>
				<td><input id="user" class="textbox"/></td>
				<td style="padding-left: 10px;"><a class="op-btn">禁用</a></td>
				<td style="padding-left: 10px;"><a class="op-btn">启用</a></td>
				<td style="padding-left: 10px;"><a class="op-btn">只读</a></td>
				<td style="padding-left: 10px;"><a class="op-btn">取消只读</a></td>
			</tr>
			</tbody>
		</table>
		<script type='text/javascript' class='use-prettyprint'>
			$(function(){
				$("#user").lookup({
					url:'getUser',
					mode:'remote',
					idField:'HIDDEN',
					textField:'Description',
					columnsLoader:function(){
						return [[  
							{field:'Code',title:'工号',width:150},  
							{field:'Description',title:'姓名',width:150},  
							{field:'HIDDEN',title:'用户ID',width:100}  
						]];
					},
					pagination:true,
					
					panelWidth:550,
					
				});
				$('.op-btn').linkbutton({
					onClick:function(){
						if($(this).text()=="禁用") $("#user").lookup("disable");
						if($(this).text()=="启用") $("#user").lookup("enable");
						if($(this).text()=="只读") $("#user").lookup("readonly",true);
						if($(this).text()=="取消只读") $("#user").lookup("readonly",false);
					
					}
				})
			});
		</script>
	</div><!--END demo-exp-code entry-content-->

	<h3>onBeforeShowPanel事件</h3>
	<div class="demo-exp-code entry-content"> 
		<table class='use-prettyprint'>
			<tbody>
			<tr>
				<td class="r-label">安全组</td>
				<td><input id="group2" class="textbox" /> </td>
				<td style="padding-left: 10px;">当输入值为ad时，不能展开下拉面板</td>
			</tr>
			</tbody>
		</table>
		<script type='text/javascript' class='use-prettyprint'>
			$(function(){
				$("#group2").lookup({
					width:200,
					
					panelWidth:500,
					
					url:'getGroup',
					mode:'remote',
					idField:'HIDDEN',
					textField:'Description',
					columns:[[  
						{field:'Description',title:'安全组名称',width:300},  
						{field:'HIDDEN',title:'安全组ID',width:100}  
					]],
					pagination:true,
					onSelect:function(index,rowData){
						console.log("index="+index+",rowData=",rowData);
					},
					onBeforeShowPanel:function(){
						if ($(this).val()=="ad") return false;
					}
				});
			})
		</script>
	</div><!--END demo-exp-code entry-content-->

	<h3>selectRowRender方法</h3>
	<div class="demo-exp-code entry-content"> 
		<table class='use-prettyprint'>
			<tbody>
			<tr>
				<td class="r-label">安全组</td>
				<td><input id="group3" class="textbox" /> </td>
				<!-- <td><input id="group9" class="textbox" /> </td> 测试医嘱录入放大镜闪烁问题2538239-->
				<td style="padding-left: 10px;">安全组名字长度大于10 提示出来</td>
			</tr>
			</tbody>
		</table>
		<script type='text/javascript' class='use-prettyprint'>
			$(function(){
				$("#group3").keydown(function(e){
					if (e.keyCode ==13){
						setTimeout(function(){$("#group9").focus();},1200);
					}
				});
				$("#group3").lookup({
					width:200,
					
					panelWidth:500,
					
					url:'getGroup',
					mode:'remote',
					idField:'HIDDEN',
					textField:'Description',
					columns:[[  
						{field:'Description',title:'安全组名称',width:300},  
						{field:'HIDDEN',title:'安全组ID',width:100}  
					]],
					pagination:true,
					onSelect:function(index,rowData){
						console.log("index="+index+",rowData=",rowData);
					},
					selectRowRender:function(row){
						console.log('selectRowRender',row);
						if (!row)  return '<p style="margin:0;padding:10px;">无提示信息</p>';
						if (row.Description.length>12){ //安全组名字长于10 显示提示信息
							return '<p style="margin:0;padding:10px;"><span style="font-weight:bold;"></sapn>安全组<span style="color:red;">'+row.Description+',此安全组字符超过12字符，这里可以显示当前行记录的说明信息。此处也测试超长时滚动条问题。,此安全组字符超过12字符，这里可以显示当前行记录的说明信息。此处也测试超长时滚动条问题。,此安全组字符超过12字符，这里可以显示当前行记录的说明信息。此处也测试超长时滚动条问题。</span>';
						}if (row.Description.length==5){ //安全组名字长于10 显示提示信息
							return '<p style="margin:0;padding:10px;display:block;height:40px;overflow:auto;"><span style="font-weight:bold;"></sapn>安全组<span style="color:red;">'+row.Description+',此安全组字符为5字符，这里可以显示当前行记录的说明信息。此处也测试超长时滚动条问题。,此安全组字符为5字符，这里可以显示当前行记录的说明信息。此处也测试超长时滚动条问题。,此安全组字符超过为5字符，这里可以显示当前行记录的说明信息。此处也测试超长时滚动条问题。</span>';
						}else if (row.Description.length>10){ //安全组名字长于10 显示提示信息
							return '<p style="margin:0;padding:10px;"><span style="font-weight:bold;"></sapn>安全组<span style="color:red;">'+row.Description+',此安全组字符超过10字符，这里可以显示当前行记录的说明信息。此处也测试超长时滚动条问题</span>';
						}else if(row.Description.length>8){
							return '<p style="margin:0;padding:10px;"><span style="font-weight:bold;"></sapn>安全组<span style="color:red;">'+row.Description+'</span>';
						}else{
							return '<p style="margin:0;padding:10px;">无提示信息</p>';
						}
						
					}
				});
				$("#group9").lookup({
					width:200,panelWidth:460,
					url:'getGroup',
					mode:'remote',
					idField:'HIDDEN',
					textField:'Description',
					columns:[[  
						{field:'Description',title:'安全组名称',width:200},  
						{field:'HIDDEN',title:'安全组ID',width:50}  
					]],
					pagination:true,
					onSelect:function(index,rowData){
						console.log("index="+index+",rowData=",rowData);
					},
					selectRowRender:function(row){
						console.log('selectRowRender',row);
						if (!row) return '<p style="margin:0;padding:10px;">无提示信息</p>';
						if (row.Description.length>12){ //安全组名字长于10 显示提示信息
							return '<p style="margin:0;padding:10px;"><span style="font-weight:bold;"></sapn>安全组<span style="color:red;">'+row.Description+',此安全组字符超过12字符，这里可以显示当前行记录的说明信息。此处也测试超长时滚动条问题。,此安全组字符超过12字符，这里可以显示当前行记录的说明信息。此处也测试超长时滚动条问题。,此安全组字符超过12字符，这里可以显示当前行记录的说明信息。此处也测试超长时滚动条问题。</span>';
						}if (row.Description.length==5){ //安全组名字长于10 显示提示信息
							return '<p style="margin:0;padding:10px;display:block;height:40px;overflow:auto;"><span style="font-weight:bold;"></sapn>安全组<span style="color:red;">'+row.Description+',此安全组字符为5字符，这里可以显示当前行记录的说明信息。此处也测试超长时滚动条问题。,此安全组字符为5字符，这里可以显示当前行记录的说明信息。此处也测试超长时滚动条问题。,此安全组字符超过为5字符，这里可以显示当前行记录的说明信息。此处也测试超长时滚动条问题。</span>';
						}else if (row.Description.length>10){ //安全组名字长于10 显示提示信息
							return '<p style="margin:0;padding:10px;"><span style="font-weight:bold;"></sapn>安全组<span style="color:red;">'+row.Description+',此安全组字符超过10字符，这里可以显示当前行记录的说明信息。此处也测试超长时滚动条问题</span>';
						}else if(row.Description.length>8){
							return '<p style="margin:0;padding:10px;"><span style="font-weight:bold;"></sapn>安全组<span style="color:red;">'+row.Description+'</span>';
						}else{
							return '<p style="margin:0;padding:10px;">无提示信息</p>'
						}
						
					}
				});
			})
		</script>
	</div><!--END demo-exp-code entry-content-->

	<!--
	<h3>本地数据</h3>
	<div class="demo-exp-code entry-content">
		<div class="use-prettyprint">
			<table>
				<tbody>
					<tr>
						<td class="r-label">安全组</td>
						<td><input id="group-local" class="textbox" /></td>

						<td class="r-label" style="padding-left: 20px;">用户</td>
						<td><input id="user-local" class="textbox" /></td>
					</tr>
				</tbody>
			</table>
		</div>
		<script type='text/javascript' class="use-prettyprint">
			$(function(){
				$("#group-local").lookup({
					width:200,panelWidth:800,
					
					mode:'local',
					data:[{Description:'住院医师',HIDDEN:'1'},{Description:'门诊医师',HIDDEN:'2'},{Description:'门诊护士',HIDDEN:'3'}],
					idField:'HIDDEN',
					textField:'Description',
					columns:[[  
						{field:'Description',title:'安全组名称',width:200},  
						{field:'HIDDEN',title:'安全组ID',width:100} ,
						{field:'Other',title:'其他信息',width:400,formatter:function(val,row){
							return row['Description']+'：分配人数'+Math.floor(Math.random()*500)
						}} 
					]],
					isCombo:true,
					pagination:true
				});
				$("#user-local").lookup({
					width:200,panelWidth:800,
					
					mode:'local',
					data:[{Description:'医生01',Code:'ys01',HIDDEN:'1'},{Description:'医生02',Code:'ys02',HIDDEN:'2'},{Description:'护士01',Code:'hs01',HIDDEN:'3'}],
					idField:'HIDDEN',
					textField:'Description',
					columnsLoader:function(){
						return [[  
							{field:'Code',title:'工号',width:150},  
							{field:'Description',title:'姓名',width:150},  
							{field:'HIDDEN',title:'用户ID',width:50}  
						]];
					},
					isCombo:true,
					panelWidth:500,
				});
			})
		</script>
	</div>--><!--END demo-exp-code entry-content-->

	<div class="demo-exp-code entry-content">
		<h3>放大镜(lookup)组件，属性、事件、方法 </h3>
		<span>扩展自验证框（validatebox）和数据网格（datagrid），下面是为放大镜（lookup）添加的属性、事件、方法</span>
		<table class="table">
			<tr class="protitle">
				<th>属性</th>
				<th>说明</th>
				<th>默认值</th>
				<th></th>
			</tr>
			<tr>
				<td>loadMsg</td>
				<td>当数据网格（datagrid）加载远程数据时显示的消息。</td>
				<td>null</td>
				<td></td>
			</tr>
			<tr>
				<td>idField</td>
				<td>id 的字段名。</td>
				<td>null</td>
				<td></td>
			</tr>
			<tr>
				<td>textField</td>
				<td>显示在文本框中的 text 字段名。</td>
				<td>null</td>
				<td></td>
			</tr>
			<tr>
				<td>mode</td>
				<td>定义当文本改变时如何加载数据网格（datagrid）数据。如果组合网格（combogrid）从服务器加载就设置为 'remote'。当设置为 'remote' 模式时，用户输入的值将会被作为名为 'q' 的 http 请求参数发送到服务器，以获取新的数据。</td>
				<td>'remote'</td>
				<td></td>
			</tr>
			<tr>
				<td>filter</td>
				<td>function(q, row) 定义当 'mode' 设置为 'local' 时如何选择本地数据。返回 true 则选择该行。</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>width</td>
				<td>组件的宽度。</td>
				<td>'auto'</td>
				<td></td>
			</tr>
			<tr>
				<td>panelWidth</td>
				<td>下拉面板宽度</td>
				<td>null</td>
				<td></td>
			</tr>
			<tr>
				<td>panelHeight</td>
				<td>下拉面板高度</td>
				<td>200</td>
				<td></td>
			</tr>
			<tr>
				<td>selectOnNavigation</td>
				<td>定义当通过键盘导航项目时是否选择项目</td>
				<td>false</td>
				<td></td>
			</tr>
			<tr>
				<td>editable</td>
				<td>定义用户是否可以往文本域中直接输入文字</td>
				<td>true</td>
				<td></td>
			</tr>
			<tr>
				<td>disabled</td>
				<td>是否禁用</td>
				<td>false</td>
				<td></td>
			</tr>
			<tr>
				<td>readonly</td>
				<td>是否只读</td>
				<td>false</td>
				<td></td>
			</tr>
			<tr>
				<td>hasDownArrow</td>
				<td>是否有下拉按钮</td>
				<td>true</td>
				<td></td>
			</tr>
			<tr>
				<td>delay</td>
				<td>从最后一个键的输入事件起，延迟进行搜索。</td>
				<td>200</td>
				<td></td>
			</tr>
			<tr>
				<td>isCombo</td>
				<td>是否输入字符即触发事件，进行搜索</td>
				<td>false</td>
				<td></td>
			</tr>
			<tr>
				<td>minQueryLen</td>
				<td>isCombo为true时，可以搜索要求的字符最小长度</td>
				<td>0</td>
				<td></td>
			</tr>
			<tr>
				<td>queryOnSameQueryString</td>
				<td>在查询条件和上一次一致时，回车或点击下拉按钮是否重新搜索</td>
				<td>true</td>
				<td></td>
			</tr>
			<tr>
				<td>
					columnsLoader
				</td>
				<td>函数类型,返回colums。见示例三</td>
				<td>null</td>
				<td></td>
			</tr>
			<tr>
				<td>enableNumberEvent</td>
				<td>是否开启数字选行功能,在isCombo为true时生效。<code>2020-02-14</code>见示例二</td>
				<td>false</td>
				<td></td>
			</tr>
			<tr>
				<td>forceFocus</td>
				<td>加载数据后光标是否到放大镜输入框中。<code>2020-06-22</code>,于便使用toolbar</td>
				<td>true</td>
				<td></td>
			</tr>
			<tr>
				<td>singleRequest</td>
				<td>是否只保留最后一个请求。true时,只保留最后一个请求<code>2021-11-10</code></td>
				<td>true</td>
				<td></td>
			</tr>
			<tr>
				<td>panelHeightFix</td>
				<td>是否自适应高度。在可见区域内最大化显示放大镜高度。</td>
				<td>false</td>
				<td>配置了selectRowRender时,值自动为true</td>
			</tr>
			<tr>
				<td>panelMaxHeight</td>
				<td>自适应高度时,最大高度</td>
				<td>500</td>
				<td></td>
			</tr>
			<tr>
				<td>panelMinHeight</td>
				<td>自适应高度时,最小高度</td>
				<td>160</td>
				<td></td>
			</tr>
			<tr>
				<td>rowSummaryHeight</td>
				<td>行提示区域高度</td>
				<td>0</td>
				<td>默认为0, 为0时区域高度为第一次提示信息区域的高度<code>20230705</code></td>
			</tr>
			<!--   ***************分割线  事件******************************************************                  -->
			<tr class="evttitle">
				<th>事件名</th>
				<th>说明</th>
				<th>入参</th>
				<th></th>
			</tr>
			<tr>
				<td>onBeforeShowPanel</td>
				<td>下拉面板展开前触发，若返回值是false,则阻止展开</td>
				<td>null</td>
				<td></td>
			</tr>
			<tr>
				<td>onShowPanel</td>
				<td>当下拉面板显示的时候触发.</td>
				<td>null</td>
				<td></td>
			</tr>
			<tr>
				<td>onHidePanel</td>
				<td>隐藏时触发</td>
				<td>null</td>
				<td></td>
			</tr>
			<tr>
				<td>selectRowRender</td>
				<td>当高亮一行时调用此function，入参为当前行数据row,返回提示内容的html<br>复现原extjs的lookup</td>
				<td>row</td>
				<td></td>
			</tr>
			 <!--   ***************分割线  方法******************************************************                  -->
			<tr class="mthtitle">
				<th>方法名</th>
				<th>说明</th>
				<th>入参</th>
				<th>返回值</th>
			</tr>
			<tr>
				<td>options</td>
				<td>拿到配置项对象</td>
				<td></td>
				<td>配置对象</td>
			</tr>
			<tr>
				<td>grid</td>
				<td>返回数据网格（datagrid）对象 <br>此方法虽存在，但是获取的grid未必对应此lookup 因为所有的lookup都使用一个grid</td>
				<td></td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>setText</td>
				<td>设置文本框的值</td>
				<td>text</td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>getText</td>
				<td>获取输入框的文本</td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td>setValue</td>
				<td>设置放大镜的值,只设置值,不校验值。选中行后组件会通过此方法把idField对应的值记录起来。<code>2020-02-12</code></td>
				<td>text</td>
				<td></td>
			</tr>
			<tr>
				<td>getValue</td>
				<td>获得放大镜的值。<code>2020-02-12</code></td>
				<td>text</td>
				<td></td>
			</tr>
			<tr>
				<td>clear</td>
				<td>清空组件值</td>
				<td></td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>reset</td>
				<td>重置组件的值</td>
				<td></td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>resize</td>
				<td>调整组件宽度</td>
				<td>width</td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>showPanel</td>
				<td>显示面板</td>
				<td></td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>hidePanel</td>
				<td>隐藏面板</td>
				<td></td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>disable</td>
				<td>禁用组件</td>
				<td></td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>enable</td>
				<td>启用组件</td>
				<td></td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>readonly</td>
				<td>启用/禁用只读模式。</td>
				<td>mode(true|false)</td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>isValid</td>
				<td>返回验证结果</td>
				<td></td>
				<td>true|false</td>
			</tr>
			<tr>
				<td>fixPanelTLWH</td>
				<td>重计算放大镜弹出框位置及大小，方法继承自comboq。<code>2020-02-12</code></td>
				<td>无</td>
				<td>无</td>
			</tr>
		</table>
	</div>
	<prettyprint/>
	<script type="text/javascript">
		$(function(){
			$('.demo-exp-code.entry-content').prev('h3').each(function(ind){
				$(this).text('一二三四五六七八九十'.charAt(ind)+'、'+ $(this).text());
			})
		})
	</script>
</body>
</html>