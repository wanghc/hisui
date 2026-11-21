<?php
// 防止直接访问
if (!defined('ACCESS_FROM_INDEX')) {
    http_response_code(403);
    die('Direct access forbidden.');
}
$PAGE_CONTEXT = $PAGE_CONTEXT ?? [];
?>
<!DOCTYPE html>
<html>
<head>
	<?php echo renderHisuiResources($PAGE_CONTEXT['version'],$PAGE_CONTEXT['title']); ?>
</head>
<body>
	<h2>滑块</h2>
	<h3>说明:</h3>
    <span>滑块（slider）组件允许用户从有限范围内选择一个数值。沿轨道拖动滑块，可以显示当前值，也可以显示刻度尺。</span>
	<h3>如：</h3>
	<div class="demo-exp-code entry-content">
		<div class="use-prettyprint lang-html">
			<div class="hisui-panel" title="基础用法" style="width:580px;padding:30px 20px 30px;" data-options="headerCls:'panel-header-gray',iconCls:'icon-paper',collapsible:false">
				<input class="hisui-slider" value="12" style="width:300px" data-options="showTip:true" rule="[0,'|',25,'|',50,'|',75,'|',100]">
			</div>
		</div>
	</div>
	<h3>垂直滑块</h3>
	<div class="demo-exp-code entry-content">
		<div class="use-prettyprint lang-html">
			<div class="hisui-panel" title="垂直滑块" style="width:300px;height:300px;padding:20px 20px;" data-options="headerCls:'panel-header-gray',iconCls:'icon-paper',collapsible:false">
				<input class="hisui-slider" value="25" style="height:200px" data-options="mode:'v',showTip:true" rule="[0,'|',25,'|',50,'|',75,'|',100]">
			</div>
		</div>
	</div>
	<h3>用js生成，反向与事件</h3>
	<div class="demo-exp-code entry-content">
		<div class="use-prettyprint">
			<div class="hisui-panel" title="用js生成" style="width:580px;padding:30px 20px;" data-options="headerCls:'panel-header-gray',iconCls:'icon-paper',collapsible:false">
				<input id="s3" style="width:300px">
				<p>onChange：<span id="s3onchange">-</span></p>
				<p>onComplete：<span id="s3oncomplete">-</span></p>
			</div>
			<script type="text/javascript" class="use-prettyprint">
				$(function(){
					var s3 = $HUI.slider('#s3',{
						value:80,
						reversed:true,
						showTip:true,
						tipFormatter:function(value){
							return value + '%';
						},
						onChange:function(value,oldValue){
							$('#s3onchange').html('onChange：' + oldValue + ' -> ' + value);
						},
						onComplete:function(value){
							$('#s3oncomplete').html('onComplete：' + value);
						}
					});
				})
			</script>
		</div>
	</div>
	<h3>禁用与常用方法</h3>
	<p>禁用状态下，拖动滑块和点击滑槽都不会改变值，也不会触发 onChange、onComplete 事件。</p>
	<div class="demo-exp-code entry-content">
		<div class="use-prettyprint">
			<div class="hisui-panel" title="禁用与方法" style="width:580px;padding:30px 20px;" data-options="headerCls:'panel-header-gray',iconCls:'icon-paper',collapsible:false">
				<input id="s4" class="hisui-slider" value="30" style="width:300px" data-options="disabled:true,showTip:true">
				<p>当前值：<span id="s4value">30</span></p>
				<p>onChange：<span id="s4onchange">-</span>　onComplete：<span id="s4oncomplete">-</span></p>
				<p>
					<a id="btn-getvalue" class="hisui-linkbutton">getValue</a>
					<a id="btn-setvalue" class="hisui-linkbutton">setValue(80)</a>
					<a id="btn-enable" class="hisui-linkbutton">enable</a>
					<a id="btn-disable" class="hisui-linkbutton">disable</a>
					<a id="btn-reset" class="hisui-linkbutton">reset</a>
					<a id="btn-clear" class="hisui-linkbutton">clear</a>
				</p>
			</div>
			<script type="text/javascript" class="use-prettyprint">
				$(function(){
					$('#s4').slider({
						onChange:function(value,oldValue){
							$('#s4value').html(value);
							$('#s4onchange').html(oldValue + ' -> ' + value);
						},
						onComplete:function(value){
							$('#s4oncomplete').html(value);
						}
					});
					var s4 = $HUI.slider('#s4');
					$('#btn-getvalue').click(function(){
						$('#s4value').html(s4.getValue());
					});
					$('#btn-setvalue').click(function(){
						s4.setValue(80);
						$('#s4value').html(s4.getValue());
					});
					$('#btn-enable').click(function(){
						s4.enable();
					});
					$('#btn-disable').click(function(){
						s4.disable();
					});
					$('#btn-reset').click(function(){
						s4.reset();
						$('#s4value').html(s4.getValue());
					});
					$('#btn-clear').click(function(){
						s4.clear();
						$('#s4value').html(s4.getValue());
					});
				})
			</script>
		</div>
	</div>
	<div>
		<h3>滑块组件的相关配置、事件、方法</h3>
		<table class="table">
			<tr class="protitle">
				<th>属性</th>
				<th>默认值</th>
				<th>说明</th>
				<th></th>
			</tr>
			<tr>
				<td>width</td>
				<td>'auto'</td>
				<td>水平模式时滑块的宽度。</td>
				<td></td>
			</tr>
			<tr>
				<td>height</td>
				<td>'auto'</td>
				<td>垂直模式时滑块的高度。</td>
				<td></td>
			</tr>
			<tr>
				<td>mode</td>
				<td>'h'</td>
				<td>滑块方向，'h'为水平，'v'为垂直。</td>
				<td></td>
			</tr>
			<tr>
				<td>reversed</td>
				<td>false</td>
				<td>true时反向滑动（值越大越靠近左侧）。</td>
				<td></td>
			</tr>
			<tr>
				<td>showTip</td>
				<td>false</td>
				<td>是否在滑块上方显示当前值的提示。</td>
				<td></td>
			</tr>
			<tr>
				<td>disabled</td>
				<td>false</td>
				<td>是否禁用。</td>
				<td></td>
			</tr>
			<tr>
				<td>value</td>
				<td>0</td>
				<td>初始值，也可写在input的value属性上。</td>
				<td></td>
			</tr>
			<tr>
				<td>min</td>
				<td>0</td>
				<td>最小值。</td>
				<td></td>
			</tr>
			<tr>
				<td>max</td>
				<td>100</td>
				<td>最大值。</td>
				<td></td>
			</tr>
			<tr>
				<td>step</td>
				<td>1</td>
				<td>步长，拖动或点击轨道时按步长取整。</td>
				<td></td>
			</tr>
			<tr>
				<td>rule</td>
				<td>[]</td>
				<td>刻度尺配置数组，如rule="[0,'|',25,'|',50,'|',75,'|',100]"，'|'表示只画刻度线不显示文字。</td>
				<td></td>
			</tr>
			<tr>
				<td>tipFormatter</td>
				<td>function(value){return value}</td>
				<td>格式化提示内容的函数。</td>
				<td></td>
			</tr>
			<tr>
				<td>converter</td>
				<td>{toPosition,toValue}</td>
				<td>值与位置之间互相转换的函数，toPosition:function(value,size)，toValue:function(pos,size)。</td>
				<td></td>
			</tr>
			<tr class="evttitle">
				<th>事件名</th>
				<th>说明</th>
				<th>入参</th>
				<th></th>
			</tr>
			<tr>
				<td>onSlideStart</td>
				<td>开始拖动滑块时触发。</td>
				<td>value</td>
				<td></td>
			</tr>
			<tr>
				<td>onSlideEnd</td>
				<td>结束拖动滑块时触发。</td>
				<td>value</td>
				<td></td>
			</tr>
			<tr>
				<td>onComplete</td>
				<td>完成一次操作时触发（拖动结束或点击轨道）。</td>
				<td>value</td>
				<td></td>
			</tr>
			<tr>
				<td>onChange</td>
				<td>值改变时触发。</td>
				<td>value,oldValue</td>
				<td></td>
			</tr>
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
				<td>options对象</td>
			</tr>
			<tr>
				<td>getValue</td>
				<td>获得当前值</td>
				<td></td>
				<td>value</td>
			</tr>
			<tr>
				<td>setValue</td>
				<td>设置值，值会被限制在min与max之间</td>
				<td>value</td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>clear</td>
				<td>把值设置为最小值min</td>
				<td></td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>reset</td>
				<td>把值复位为初始化时的值</td>
				<td></td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>enable</td>
				<td>启用滑块</td>
				<td></td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>disable</td>
				<td>禁用滑块</td>
				<td></td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>resize</td>
				<td>调整滑块大小</td>
				<td>param{width,height}</td>
				<td>jquery对象</td>
			</tr>
			<tr>
				<td>destroy</td>
				<td>销毁滑块</td>
				<td></td>
				<td>jquery对象</td>
			</tr>
		</table>
	</div>
	<prettyprint/>
</body>
</html>
