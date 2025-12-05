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
	<h2>树</h2>
	<h3>说明:</h3>
	<span>树形菜单（Tree）可从标记创建，也可定义在 &lt;ul> 元素中。无序列表的 &lt;ul> 元素提供一个基础的树（Tree）结构。每一个 &lt;li> 元素将产生一个树节点，子 &lt;ul> 元素将产生一个父树节点。</span>
	<h3>一、无线条树(<code>lines:false</code>)</h3>
	
	<div class="demo-exp-code entry-content" style="background-color: #f1f7fe;">
	
		<div class="use-prettyprint">
			<ul class="hisui-tree" data-options="lines:false">
				<li>
					<span>Folder</span>
					<ul>
						<li>
							<span>Sub Folder 1</span>
							<ul>
								<li>
									<span>
										<a href="#">File 11</a>
									</span>
								</li>
								<li>
									<span>File 12</span>
								</li>
								<li>
									<span>File 13</span>
								</li>
							</ul>
						</li>
						<li>
							<span>File 2</span>
						</li>
						<li>
							<span>File 3</span>
						</li>
					</ul>
				</li>
				<li>
					<span>Folder</span>
					<ul>
						<li>
							<span>Sub Folder 1</span>
							<ul>
								<li>
									<span>
										<a href="#">File 11</a>
									</span>
								</li>
								<li>
									<span>File 12</span>
								</li>
								<li>
									<span>File 13</span>
								</li>
							</ul>
						</li>
						<li>
							<span>File 2</span>
						</li>
						<li>
							<span>File 3</span>
						</li>
					</ul>
				</li>
				<li>
					<span>Folder</span>
					<ul>
						<li>
							<span>Sub Folder 1</span>
							<ul>
								<li>
									<span>
										<a href="#">File 11</a>
									</span>
								</li>
								<li>
									<span>File 12</span>
								</li>
								<li>
									<span>File 13</span>
								</li>
							</ul>
						</li>
						<li>
							<span>File 2</span>
						</li>
						<li>
							<span>File 3</span>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<h3>二、有线条树(<code>lines:true</code>)</h3>
	
	<div class="demo-exp-code entry-content" style="background-color: #f1f7fe;">
	
		<div class="use-prettyprint">
			<ul class="hisui-tree" data-options="lines:true">
				<li>
					<span>Folder</span>
					<ul>
						<li>
							<span>Sub Folder 1</span>
							<ul>
								<li>
									<span>
										<a href="#">File 11</a>
									</span>
								</li>
								<li>
									<span>File 12</span>
								</li>
								<li>
									<span>File 13</span>
								</li>
							</ul>
						</li>
						<li>
							<span>File 2</span>
						</li>
						<li>
							<span>File 3</span>
						</li>
					</ul>
				</li>
				<li>
					<span>Folder</span>
					<ul>
						<li>
							<span>Sub Folder 1</span>
							<ul>
								<li>
									<span>
										<a href="#">File 11</a>
									</span>
								</li>
								<li>
									<span>File 12</span>
								</li>
								<li>
									<span>File 13</span>
								</li>
							</ul>
						</li>
						<li>
							<span>File 2</span>
						</li>
						<li>
							<span>File 3</span>
						</li>
					</ul>
				</li>
				<li>
					<span>Folder</span>
					<ul>
						<li>
							<span>Sub Folder 1</span>
							<ul>
								<li>
									<span>
										<a href="#">File 11</a>
									</span>
								</li>
								<li>
									<span>File 12</span>
								</li>
								<li>
									<span>File 13</span>
								</li>
							</ul>
						</li>
						<li>
							<span>File 2</span>
						</li>
						<li>
							<span>File 3</span>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<h3>三、formatter实现节点自定义格式</h3>
	<div class="demo-exp-code entry-content" style="background-color: #f1f7fe;">
		
		<p>formatter返回的html高度不定，需要为tree增加配置项<code>autoNodeHeight:true,lines:true</code>;原文件夹或文件图标会替换成线条<p>
		<div class="use-prettyprint">
		<style>
			#sptt .tree-node{
				position: relative;
			}
			#sptt{
			.tree-file {
				margin-top:10px !important;
			
			}
			}
		</style>
		<div style="width:290px;border:1px solid #ccc">
			<ul id="sptt" data-options="animate:true"></ul>
		</div>
		<script type="text/javascript">
			$(function () {
				$('#sptt').tree({
					data: [{
						"id": 1,
						"text": "病程记录",
						"state": "open",
						"children": [{
							"id": 11,
							"text": "Node 11",
							"children": [{
								"id": 111,
								"text": "Node 999"
							}, {
								"id": 112,
								"text": "Node 112"
							}]
						}, {
							"id": 12,
							"text": "Node 12"
						}]
					}, {
						"id": 2,
						"text": "手术记录",
						"state": "open",
						"children": [{
							"id": 21,
							"text": "Node 21",
							"children": [{
								"id": 211,
								"text": "Node 211"
							}, {
								"id": 212,
								"text": "Node 212",
								"children": [{
									"id": 2121,
									"text": "Node 2121"
								}, {
									"id": 2122,
									"text": "Node 2122"
								}]
							}]
						}, {
							"id": 22,
							"text": "Node 22"
						}]
					}, {
						"id": 3,
						"text": "其他记录",
						"state": "closed",
						"children": [{
							"id": 31,
							"text": "Node 31",
							"children": [{
								"id": 311,
								"text": "Node 311"
							}, {
								"id": 312,
								"text": "Node 312"
							}]
						}, {
							"id": 32,
							"text": "Node 32"
						}]
					}, {
						"id": 4,
						"text": "病案首页"
					}],
					formatter:function(node){
						//formatter  此时isLeaf方法还无法判断是不是叶子节点 可通过children
						if (node.children){
							return node.text;
						}else{
							return "<div >"
								+"<span data-id='"+node.id+"' class='icon icon-edit' style='display:block;width:16px;height:16px;position:absolute;right:8px;top:13px;'></span>"
								+"<div style='height:20px;line-height:20px;color:#939393'>"+(new Date()).toLocaleString()+"</div>"
								+"<div style='height:20px;line-height:20px;'>"+node.text+"</div>"
								+"</div>";
							//同时给此树下的tree-node 加上position: relative;   以实现小图标靠右
						}
						
					},
					lines:false,autoNodeHeight:false
				})

				//可能还需要监听事件
				$('#sptt').on('click','.icon-edit',function(){
					var id=$(this).data('id');
					var node=$('#sptt').tree('find',id);
					console.log(node);
					alert(node.text);
				})
			})
		</script>
		</div>
	</div>
	

	<h3>tree新增属性、方法</h3>
	<table class="table">
		<tr class="protitle">
			<th>属性</th>
			<th>说明</th>
			<th>默认值</th>
			<th></th>
		</tr>
		<tr>
			<td>autoNodeHeight</td>
			<td>在<code>lines</code>为true时，formatter返回的html高度不定时，要配置此属性为true,自动计算线条高度</td>
			<td>false</td>
			<td></td>
		</tr>
	</table>
	<prettyprint/>
</body>

</html>