<!DOCTYPE html>
<html lang="en">
<head>
	<?php echo renderHisuiResources($PAGE_CONTEXT['version'],$PAGE_CONTEXT['title']); ?>
</head>
<body>
	<h2>提示</h2>
	<h3>说明:</h3>
    <span>当用户点击或者鼠标悬停在此区域，将会显示提示。</span>
	<h3>如：</h3>
	<div class="demo-exp-code entry-content"> 
		<a id="tt1" href="javascript:void(0);" onclick="javascript:void(0);" title="这是提示信息" class="hisui-tooltip" data-options="position:'right'">
			鼠标移动到这
		</a>
	  	<a id="btn" class='hisui-linkbutton' href="javascript:void(0)" style='margin-left: 200px'>点我提示</a>
		<pre class="prettyprint hide lang-html"><code>&lt;a id="tt1" href="#" title="这是提示信息" class="hisui-tooltip" data-options="position:'right'">鼠标移动到这(点击试试)&lt;/a></code></pre>
		<pre class="prettyprint hide lang-js">
$(function(){
	$("#btn").click(function(){
		$HUI.tooltip("#tt1",{position:'bottom'}).show();
		//等价 
		//$("#tt1").tooltip({position:'bottom'}).tooltip('show');
	});
});</pre>
	</div>
	<script type="text/javascript">
		$(function(){
			/*var tt = $HUI.tooltip('#tt',{
				content:'<span style="color:#fff;">这是通过js提示的</span>',
				position: 'bottom'
				,deltaX:50
			});*/
			$("#btn").click(function(){
				$HUI.tooltip("#tt1",{position:'bottom'}).show();
				//$("#tt1").tooltip({position:'bottom'}).tooltip('show');

			});
		});
  </script>	
  <table class="table">
		<tr class="protitle">
			<th>属性</th>
			<th>说明</th>
			<th>默认值</th>
			<th></th>
		</tr>
		<tr>
			<td>position</td>
			<td>提示层的位置</td>
			<td>bottom</td>
			<td>可选值：'top' , 'right', 'bottom', 'left'</td>
		</tr>
		<tr>
			<td>tipWidth</td>
			<td>提示层的宽度</td>
			<td>undefined</td>
			<td>默认为undefined,宽度自动<code>(20210105)</code></td>
		</tr>
	</table>
  <prettyprint/>
</body>
</html>