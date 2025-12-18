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
	<style>
		code{
			padding: .2rem .4rem;
		    font-size: 90%;
		    color: #bd4147;
		    background-color: #f7f7f9;
		    border-radius: .25rem;
		}
		code, kbd, pre, samp {
		    font-family: Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
		}
		select{
			width:177px;
		}
	</style>
</head>
<body data-theme="bgdark">
	<h2>按钮</h2>
	<div style="width:800px;height:150px;">
		<a id="btn" href="#" class="hisui-linkbutton" data-options="iconCls:'icon-search'"></a>
		<a id="btn" href="#" class="hisui-linkbutton" data-options="iconCls:'icon-search'">查询</a>
		<a href="#" class="hisui-linkbutton" data-options="iconCls:'icon-search'">查询按钮</a>
		<a href="#" class="hisui-linkbutton" data-options="iconCls:'icon-search'">复制长期医嘱</a>		
		<a href="#" class="hisui-linkbutton">确定</a>
		<a href="#" class="hisui-linkbutton">确定提交</a>
		<a href="javascript:void(0)" id="sb" class="hisui-splitbutton" data-options="menu:'#mm2',iconCls:'icon-ok'">作废医嘱</a>   
		<div id="mm2" style="width:100px;">   
			<div>停止</div>   
			<div>作废</div>   
		</div>
		<a href="javascript:void(0)" id="sb" class="hisui-menubutton" data-options="menu:'#mm3',iconCls:'icon-ok'">菜单</a>
		<div id="mm3" style="width:100px;">   
			<div >停止</div>   
			<div>作废</div>     
			<!-- data-options="iconCls:'icon-cancel'" -->
		</div>
		<a href="javascript:void(0)" id="mbedit" class="hisui-menubutton" data-options="menu:'#mmedit',iconCls:'icon-edit'">Edit</a>
		<div id="mmedit" style="width:150px;">
			<div data-options="iconCls:'icon-undo'">Undo</div>
			<div data-options="iconCls:'icon-redo'">Redo</div>
			<div class="menu-sep"></div>
			<div>Cut</div>
			<div>Copy</div>
			<div>Paste</div>
			<div class="menu-sep"></div>
			<div data-options="iconCls:'icon-remove'">Delete</div>
			<div>Select All</div>
		</div>
		<div style="margin: 10px;">
			<a href="#" class="hisui-linkbutton blue" data-options="clickWaitingTime:1000">蓝色按钮</a>
			<a href="#" class="hisui-linkbutton green" data-options="clickWaitingTime:1000">绿色按钮</a>
			<a href="#" class="hisui-linkbutton yellow" data-options="clickWaitingTime:1000">黄色按钮</a>
			<a href="#" class="hisui-linkbutton red" data-options="clickWaitingTime:1000">红色按钮</a>
		</div>
		<div style="margin: 10px;">
			<a href="#" class="hisui-linkbutton" data-options="disabled:true">蓝色按钮</a>
			<a href="#" class="hisui-linkbutton green" data-options="disabled:true">绿色按钮</a>
			<a href="#" class="hisui-linkbutton yellow" data-options="disabled:true">黄色按钮</a>
			<a href="#" class="hisui-linkbutton red" data-options="disabled:true">红色按钮</a>
		</div>
	</div>
	<h2>提示(<code>hisui-tooltip</code>)</h2>
	<a id="tt1" href="#" title="这是提示信息" class="hisui-tooltip" data-options="position:'right'">
		鼠标移动到这
	</a>
	<a href="javascripts:void(0);" class="a-disable">
		禁用状态
	</a>
	<div style="margin:20px 0;"></div>
	<h2>基础验证框(<code>hisui-validatebox</code>)</h2>
	<p>在输入框上加入简单的验证</p>
	<div style="margin:20px 0;"></div>
	<div class="hisui-panel" title="登记" style="width:400px;padding:10px 30px 20px 30px" data-options="iconCls:'icon-save',closable:true,collapsible:true,minimizable:true,maximizable:true">
		<table cellpadding="5">
			<tr>
				<td>HeadButton</td>
				<td>
					<a id="btn" href="#" class="hisui-linkbutton head-btn" data-options="iconCls:'icon-search'"></a>
					&nbsp
					<a id="btn" href="#" class="hisui-linkbutton head-btn" data-options="iconCls:'icon-search'">确认</a>
				</td>
			</tr>
			<tr>
				<td>MenuButton</td>
				<td>
					<a href="javascript:void(0)" id="mb" class="hisui-menubutton" data-options="menu:'#mm',iconCls:'icon-edit'">Edit</a>
					<div id="mm" style="width:150px;">
						<div data-options="iconCls:'icon-undo'">Undo</div>
						<div data-options="iconCls:'icon-redo'">Redo</div>
						<div class="menu-sep"></div>
						<div>Cut</div>
						<div>Copy</div>
						<div>Paste</div>
						<div class="menu-sep"></div>
						<div data-options="iconCls:'icon-remove'">Delete</div>
						<div>Select All</div>
					</div>
				</td>
			</tr>
			<tr>
				<td>开/关</td>
				<td>
					<div id="switch1" class="hisui-switchbox" style="margin-left:5px" data-options="onText:'开',offText:'关',
					sizeClass:'switch-mini',onSwitchChange:function(event,value){console.log(event);console.log(value);}">
					</div>
				</td>
			</tr>
			<tr>
				<td>
					勾选框
				</td>
				<td>
					<input class='hisui-checkbox' type="checkbox" label='已出院' data-options="onCheckChange:function(event,value){console.log(value)}" id="checkbox1">
				</td>
			</tr>
			<tr>
				<td>
					想吃什么
				</td>
				<td>
					<input id="radio1" class='hisui-radio' type="radio" data-options="label:'苹果',disable:false,name:'wantEat',onCheckChange:function(event,value){console.log(value)}">
					<input id="radio2" class='hisui-radio' type="radio" data-options="checked:true,label:'香焦',name:'wantEat',disable:false">
				</td>
			</tr>
			<tr>
				<td>序号</td>
				<td>
					<input id="patno" class="textbox">
				</td>
			</tr>
			<tr>
				<td>患者性名</td>
				<td>
					<input class="hisui-validatebox textbox" data-options="required:true,validType:'length[3,10]'">
				</td>
			</tr>
			<tr>
				<td>邮箱</td>
				<td>
					<input class="hisui-validatebox textbox" data-options="required:true,validType:'email'">
				</td>
			</tr>
			<tr>
				<td>URL:</td>
				<td>
					<input class="hisui-validatebox textbox" data-options="required:true,validType:'url'">
				</td>
			</tr>
			<tr>
				<td>电话:</td>
				<td>
					<input class="hisui-validatebox">
				</td>
			</tr>
			<tr>
				<td>生日:</td>
				<td>
					<input id="dobDateBox" class="hisui-datebox textbox">
				</td>
			</tr>
			<tr>
				<td>下拉框</td>
				<td>
					<input id="cbox" class="textbox" />
				</td>
			</tr>
			<tr>
				<td>下拉框</td>
				<td><select id="stateBox" class="hisui-combobox textbox" name="state">
						<option value="AL">Alabama</option>
						<option value="AK">Alaska</option>
						<option value="AZ">Arizona</option>
						<option value="AR">Arkansas</option>
						<option value="CA">California</option>
						<option value="CO">Colorado</option>
						<option value="CT">Connecticut</option>
						<option value="DE">Delaware</option>
						<option value="FL">Florida</option>
						<option value="GA">Georgia</option>
						<option value="HI">Hawaii</option>
						<option value="ID">Idaho</option>
						<option value="IL">Illinois</option>
						<option value="IN">Indiana</option>
						<option value="IA">Iowa</option>
						<option value="KS">Kansas</option>
						<option value="KY">Kentucky</option>
						<option value="LA">Louisiana</option>
						<option value="ME">Maine</option>
						<option value="MD">Maryland</option>
						<option value="MA">Massachusetts</option>
						<option value="MI">Michigan</option>
						<option value="MN">Minnesota</option>
						<option value="MS">Mississippi</option>
						<option value="MO">Missouri</option>
						<option value="MT">Montana</option>
						<option value="NE">Nebraska</option>
						<option value="NV">Nevada</option>
						<option value="NH">New Hampshire</option>
						<option value="NJ">New Jersey</option>
						<option value="NM">New Mexico</option>
						<option value="NY">New York</option>
						<option value="NC">North Carolina</option>
						<option value="ND">North Dakota</option>
						<option value="OH" selected>Ohio</option>
						<option value="OK">Oklahoma</option>
						<option value="OR">Oregon</option>
						<option value="PA">Pennsylvania</option>
						<option value="RI">Rhode Island</option>
						<option value="SC">South Carolina</option>
						<option value="SD">South Dakota</option>
						<option value="TN">Tennessee</option>
						<option value="TX">Texas</option>
						<option value="UT">Utah</option>
						<option value="VT">Vermont</option>
						<option value="VA">Virginia</option>
						<option value="WA">Washington</option>
						<option value="WV">West Virginia</option>
						<option value="WI">Wisconsin</option>
						<option value="WY">Wyoming</option>
					</select></td>
			</tr>
			<tr>
				<td>下拉树</td>
				<td><input id="cbtree" class="textbox" /></td>
			</tr>
			<tr>
				<td>下拉树</td>
				<td><a id="sumbitBtn" class="hisui-linkbutton">确定<a></td>
			</tr>
		</table>
	</div>
	<script type="text/javascript">
		$(function () {
			var cbox = $HUI.combobox("#cbox", {
				valueField: 'id',
				textField: 'text',
				data: [
					{ id: 'css', text: 'css语言' }
					, { id: 'html', text: 'html语言' }
					, { id: 'c', text: 'c语言' }
					, { id: 'c++', text: 'c++语言' }
					/*,{id:'c#',text:'c3语言'}
					,{id:'vb',text:'vb语言'}
					,{id:'java',text:'java语言'}
					,{id:'javascript',text:'javascript语言'}*/
				],
				onSelect: function (rec) {
					var sbox = $HUI.combobox("#stateBox");
					sbox.select("PA");
					//sbox.setValue("PA"); //只是设置输入框的值
					//$("#stateBox").combobox("select","PA");
				}
			});
			var cbtree = $HUI.combotree('#cbtree',{});
			cbtree.loadData([{
				id: 1,
				text: 'Languages',
				children: [{
					id: 11,
					text: 'Java'
				},{
					id: 12,
					text: 'C++'
				}]
			}]);
			$("#sumbitBtn").click(function(){
				var db = $HUI.datebox("#dobDateBox");
				$.messager.alert("提示",db.getValue());
			});


			return;
			easyloader.theme = "bootstrap";
			easyloader.locale = "zh_CN";
			easyloader.load(['combobox'], function () {
				$('#cbox').combobox({
					valueField: 'id',
					textField: 'text',
					data: [{ id: 'java', text: 'java语言' }, { id: 'css', text: 'css语言' }],
					onselect: function (rec) {
						alert(1);
					}
				});
			});
		});
	</script>
	<script type="text/javascript">
		var init = function () {
			var valbox = $HUI.validatebox("#patno", {
				required: true
			});

			$("#saveBtn").click(function () {
				//$("#patno").data("validatebox").validating=true;
				//$("#patno").validatebox("validate");
				// valbox.jdata <=> $("#patno").data("validatebox")
				//下面二句 可以让tooltip主动显示出来
				valbox.jdata.validating = true;
				valbox.validate();
				// 获得验证结果
				var patnoHasValue = valbox.isValid();
				if (patnoHasValue) {
					alert("序号验证通过");
				} else {
					alert("序号为空");
				}
			});

		}
		$(init);
	</script>
	<h2>面板(<code>hisui-panel</code>)</h2>
	<p>在输入框上加入简单的验证</p>
	<div style="margin:20px 0;"></div>
	<div class="hisui-panel" title="病人信息" style="width:400px;padding:10px 30px 20px 30px" data-options="iconCls:'icon-save',closable:true,collapsible:true,minimizable:true,maximizable:true">
	</div>
	<div style="margin:20px 0;"></div>
	<h2>date-options="<code>headerCls:'panel-header-gray'</code>"</h2>
	<div class="hisui-panel" title="病人信息" style="width:400px;padding:10px 30px 20px 30px;" data-options="iconCls:'icon-save',closable:true,collapsible:true,minimizable:true,maximizable:true,headerCls:'panel-header-gray'">
	</div>
	<div style="margin:20px 0;"></div>
	<h2>date-options="<code>headerCls:'panel-header-blue'</code>"</h2>
	<div class="hisui-panel" title="病人信息" style="width:400px;padding:10px 30px 20px 30px;" data-options="iconCls:'icon-save',closable:true,collapsible:true,minimizable:true,maximizable:true,headerCls:'panel-header-blue'">
	</div>
	<div style="margin:20px 0;"></div>
	<h2> date-options="<code>headerCls:'panel-header-acc'</code>"</h2>
	<div id="accPanel" title="病人信息" style="width:400px;padding:10px 30px 20px 30px;">
	</div>
	<div style="margin:20px 0;"></div>
	<h2>区域date-options=<code>"headerCls:'panel-header-card'"</code></h2>
	<div class="hisui-panel" title="病人信息" style="width:400px;height:150px;padding:10px 30px 20px 30px" data-options="headerCls:'panel-header-card'">
	</div>
	<div style="margin:20px 0;"></div>
	<h2>区域date-options=<code>"headerCls:'panel-header-card-gray'"</code></h2>
	<div class="hisui-panel" title="病人信息" style="width:400px;height:150px;padding:10px 30px 20px 30px" data-options="headerCls:'panel-header-card-gray'">
	</div>
	<script type="text/javascript">
		var init = function () {
			var valbox = $HUI.panel("#accPanel", {
				iconCls: 'icon-save',
				closable: true,
				collapsible: true,
				minimizable: true,
				maximizable: true,
				headerCls: 'panel-header-acc'
			});
		}
		$(init);
	</script>
	<h2>手风琴(<code>hisui-accordion</code>)</h2>
	<style>
		.hisui-accordion ul{
			list-style: none;
			margin: 0;
			padding: 0;
		}
		.hisui-accordion ul>li{
			line-height: 28px;
			padding: 0 5px 0 15px;
		}
		.hisui-accordion ul>li>a{
			text-decoration: none;
			color:#000000;
			
		}
		.hisui-accordion ul>li:hover{
			background-color: #E3E3E3;
		}
	</style>
	<div class="hisui-accordion" style="width:200px;height:450px;float:left;"
	data-options="border:false,multiple:true">   
		<div title="等待区" data-options="collapsible:false,collapsed:false,selected:true" 
		style="overflow:auto;padding:10px;background-color:#F9F9F9;">   
			<h3 style="color:#0099FF;">在class中写入</h3>   
			<p><code>hisui-accordion</code></p>   
		</div>   
		<div title="住院区" data-options="collapsed:false,collapsible:false" 
		style="padding:10px;background-color:#F9F9F9;">   
			<p><code>hisui-accordion</code></p>       
		</div>   
		<div title="出院区" data-options="collapsible:false,collapsed:false," style="background-color:#F9F9F9;">   
			<ul>
				<li><a href="javascript:void(0);" onclick="alert('检查');" >检查结果</a></li>
				<li><a href="javascript:void(0);" >检验结果</a></li>
				<li><a href="javascript:void(0);" >病理报告</a></li>
				<li><a href="javascript:void(0);" >过敏记录</a></li>
				<li><a href="javascript:void(0);" >病程记录</a></li>
				<li><a href="javascript:void(0);" >出院记录</a></li>
			</ul>    
		</div>   
	</div>

	<div style="height:300px;width:20px;float:left"></div>
	<div id="acc" class="hisui-accordion accordion-green" style="width:250px;height:450px;float:left;"
		data-options="border:false">   
		<div title="等待区" data-options="iconCls:'icon-save',selected:true" style="overflow:auto;padding:10px;">   
			<h3 style="color:#0099FF;">在class中写入</h3>   
			<p><code>hisui-accordion accordion-green</code></p>   
		</div>   
		<div title="住院区" data-options="iconCls:'icon-reload'" style="padding:10px;">   
			content2    
		</div>   
		<div title="出院区">   
			content3    
		</div>   
	</div>  
	<div style="height:300px;width:20px;float:left"></div>
	<div style="height:300px;width:120px;float:left"><a id="addBtn" href="#" >增加</a></div>
	<div style="height:300px;width:120px;float:left">
		<a id="removeBtn" href="#" class="hisui-linkbutton">删除当前</a>
	</div>
	<script type="text/javascript">
		$(function(){
		var accObj = $HUI.accordion("#acc");
		$HUI.linkbutton("#addBtn",{
			onClick:function(){
				accObj.add({
					title:'新标题',
					content:'你点击按钮了，我就有了。',
					selected:true //,
					//style:{backgroundColor:'red',borderWidth:2}
				});
			}
		});
		$HUI.linkbutton("#removeBtn",{
			onClick:function(){
				// 删除当前选中的
				var p = accObj.getSelected();
				if (p){
					var index = accObj.getPanelIndex(p);
					accObj.remove(index);
				}
			}
		})
		});
	</script>	
	<div style="height:30px;width:1200px;float:left;font-size:16px;">页签(<code>hisui-tabs</code>)</div>
	<div id="tt" class="hisui-tabs" style="width:500px;height:250px;float:left">   
		<div title="电子病历" style="padding:20px;display:none;">   
			tab1    
		</div>   
		<div title="诊断录入" data-options="iconCls:'icon-edit',closable:true,prject:true" style="overflow:auto;padding:20px;display:none;">   
			tab2    
		</div>   
		<div title="医嘱录入" data-options="iconCls:'icon-save',closable:true" style="padding:20px;display:none;">   
			tab3    
		</div> 
		<div title="电子病历" style="padding:20px;display:none;">   
			tab1    
		</div>   
		<div title="诊断录入" data-options="iconCls:'icon-edit',closable:true" style="overflow:auto;padding:20px;display:none;">   
			tab2    
		</div>   
		<div title="医嘱录入" data-options="iconCls:'icon-save',closable:true" style="padding:20px;display:none;">   
			tab3    
		</div>
	</div>  
	<div style="width:1000px;height:20px;float:left"></div>
	<div style="height:30px;width:1200px;float:left;font-size:16px;">(<code>class='hisui-tabs tabs-gray'</code>)</div>
	<div id="tt2" class="hisui-tabs tabs-gray" data-options="isBrandTabs:true" style="width:1000px;height:250px;float:left">   
		<div title="电子病历" data-options="iconCls:'icon-add-note'" style="padding:20px;">   
			tab1 fdsfdsf   
		</div>   
		<div title="诊断录入" data-options="closable:true,selected:true" style="overflow:auto;padding:20px;">   
			tab2    
		</div>   
		<div title="医嘱录入" data-options="iconCls:'icon-save',closable:true" style="padding:20px;display:none;">   
			tab3    
		</div>  
		<div title="医嘱录入" data-options="closable:true" style="padding:20px;display:none;">   
			tab3    
		</div> 
		<div title="医嘱录入" data-options="closable:true" style="padding:20px;display:none;">   
			tab3    
		</div> 
		<div title="医嘱录入" data-options="closable:true" style="padding:20px;display:none;">   
			tab3    
		</div> 
		<div title="医嘱录入" data-options="closable:true" style="padding:20px;display:none;">   
			tab3    
		</div> 
		<div title="医嘱录入" data-options="closable:true" style="padding:20px;display:none;">   
			tab3    
		</div>  
	</div>
	<script type="text/javascript">
		$(function(){
			$HUI.tabs("#tt2",{
				onBeforeSelect:function(text,index){
					
				}
			});
			//$('#tt2').tabs('disableTab', 0); 
		});
	</script>
	<div id="dd1" class="hisui-window" title="完成接诊" style="width:400px;height:200px;top:10px;left:900px;padding:10px;"   
		data-options="iconCls:'icon-save',resizable:true,modal:false">   
		我是一个Window窗口
		<code>hisui-window</code>  
	</div>
	<div id="dd2" class="hisui-dialog" title="完成接诊" style="width:400px;height:350px;top:250px;left:900px;padding:10px;"   
		data-options="iconCls:'icon-save',resizable:true,modal:false,toolbar:[{
			text:'编辑',
			iconCls:'icon-edit',
			handler:function(){alert('edit')}
		},{
			text:'帮助',
			iconCls:'icon-help',
			handler:function(){alert('help')}
		}],buttons:[{
			text:'保存',
			handler:function(){}
		},{
			text:'关闭',
			handler:function(){$HUI.dialog('#dd2').close();}
		}]">   
		这是一个模态操作框<code>hisui-dialog</code>    
	</div>
	<div style="float:left;width:1000px;height:1000px;">
		<h2>
		<pre>列表<code>hisui-datagird</code></pre>
		</h2>
		<table class="hisui-datagrid" title="病人列表" style="width:600px;height:400px" data-options="singleSelect:true,pagination:true,toolbar: [{
				iconCls: 'icon-edit',
				text:'编辑',
				handler: function(){alert('编辑按钮')}
			},{
				iconCls:'icon-add-note',
				text:'删除行',
				handler:function(){}
			},{
				iconCls: 'icon-save',
				text:'保存医嘱',
				handler: function(){alert('编辑按钮')}
			},{
				iconCls: 'icon-remove',
				text:'编辑出院带药',
				handler: function(){alert('编辑按钮')}
			},'-',{
				iconCls: 'icon-help',
				handler: function(){alert('帮助按钮')}
			}]
		">   
			<thead>   
				<tr>   
					<th data-options="field:'code'">编码</th>   
					<th data-options="field:'name'">名称</th>   
					<th data-options="field:'price'">价格</th>
					<th data-options="field:'num'">数量</th>
					<th data-options="field:'note'">描述</th>
					<th data-options="field:'re'">原因</th>   
				</tr>   
			</thead>   
			<tbody>   
				<tr>   
					<td>001</td><td>王小二</td><td>内三科</td><td>感觉</td><td>name1</td><td>2323</td>   
				</tr>   
				<tr>   
					<td>002</td><td>王小二</td><td>内三科</td><td>感冒</td><td>name1</td><td>2323</td>  
				</tr>
				<tr>   
					<td>001</td><td>王小二</td><td>内三科</td><td>感冒</td><td>name1</td><td>2323</td>   
				</tr>
				<tr>   
					<td>001</td><td>王小二</td><td>内三科</td><td>感冒</td><td>name1</td><td>2323</td>   
				</tr>
				<tr>   
					<td>001</td><td>王小二</td><td>内三科</td><td>感冒</td><td>name1</td><td>2323</td>   
				</tr>   
			</tbody>   
		</table> 
		<pre><code>headerCls:'panel-header-gray'</code></pre>
		<table class="hisui-datagrid" title="病人列表" style="width:600px;height:400px" data-options="rownumbers:true,singleSelect:true,headerCls:'panel-header-gray',pagination:true,toolbar: [{
				iconCls: 'icon-edit',
				text:'编辑按钮',
				handler: function(){alert('编辑按钮')}
			},{
				iconCls: 'icon-save',
				text:'保存',
				handler: function(){alert('编辑按钮')}
			},{
				iconCls: 'icon-remove',
				text:'编辑出院带药',
				handler: function(){alert('编辑按钮')}
			},'-',{
				iconCls: 'icon-help',
				handler: function(){alert('帮助按钮')}
			}]
		">   
			<thead>   
				<tr>   
					<th data-options="field:'code'">编码</th>   
					<th data-options="field:'name'">名称</th>   
					<th data-options="field:'price'">价格</th>
					<th data-options="field:'num'">数量</th>
					<th data-options="field:'note'">描述</th>
					<th data-options="field:'re'">原因</th>   
				</tr>   
			</thead>   
			<tbody>   
				<tr>   
					<td>001</td><td>王小二</td><td>内三科</td><td>感觉</td><td>name1</td><td>2323</td>   
				</tr>   
				<tr>   
					<td>002</td><td>王小二</td><td>内三科</td><td>感冒</td><td>name1</td><td>2323</td>  
				</tr>
				<tr>   
					<td>001</td><td>王小二</td><td>内三科</td><td>感冒</td><td>name1</td><td>2323</td>   
				</tr>
				<tr>   
					<td>001</td><td>王小二</td><td>内三科</td><td>感冒</td><td>name1</td><td>2323</td>   
				</tr>
				<tr>   
					<td>001</td><td>王小二</td><td>内三科</td><td>感冒</td><td>name1</td><td>2323</td>   
				</tr>   
			</tbody>   
		</table> 
	</div>
	<div style="float:left;width:1000px;height:500px;">
		<div id="cc" class="hisui-layout" style="width:600px;height:400px;">   
			<div data-options="region:'north',title:'North Title',split:true,headerCls:'panel-header-gray',collapsed:true" style="height:100px;"></div>   
			<div data-options="region:'south',title:'South Title',split:true,headerCls:'panel-header-gray',collapsed:true" style="height:100px;"></div>   
			<div data-options="region:'east',iconCls:'icon-reload',title:'East',split:true,headerCls:'panel-header-gray',collapsed:true" style="width:100px;"></div>   
			<div data-options="region:'west',title:'West',split:true,headerCls:'panel-header-gray',collapsed:true" style="width:100px;"></div>   
			<div data-options="region:'center',title:'center title',headerCls:'panel-header-gray'" style="padding:5px;background:#eee;"></div>   
		</div>  
	</div>
	<div style="float:left;width:1000px;height:500px;">
		<div class="hisui-panel">
			<ul class="hisui-tree" data-options="lines:true">   
				<li>   
					<span>Folder</span>   
					<ul>   
						<li>   
							<span>Sub Folder 1</span>   
							<ul>   
								<li>   
									<span><a href="#">File 11</a></span>   
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
					<span>File21</span>   
				</li>   
			</ul> 
		</div>
	</div>
	<div style="float:left;width:1000px;height:500px;">
		<table title="Reports using TreeGrid" class="hisui-treegrid" id="treegrid1" style="width:700px;height:400px"
		data-options=" url: 'treegrid_data3.json',
			method: 'get',
			rownumbers: true,
			showFooter: true,
			idField: 'id',
			treeField: 'region'
		">
			<thead frozen="true">
				<tr>
					<th field="region" width="200">Region</th>
				</tr>
			</thead>
			<thead>
				<tr>
					<th colspan="4">2009</th>
					<th colspan="4">2010</th>
				</tr>
				<tr>
					<th field="f1" width="60" align="right">1st qrt.</th>
					<th field="f2" width="60" align="right">2st qrt.</th>
					<th field="f3" width="60" align="right">3st qrt.</th>
					<th field="f4" width="60" align="right">4st qrt.</th>
					<th field="f5" width="60" align="right">1st qrt.</th>
					<th field="f6" width="60" align="right">2st qrt.</th>
					<th field="f7" width="60" align="right">3st qrt.</th>
					<th field="f8" width="60" align="right">4st qrt.</th>
				</tr>
			</thead>
		</table>
		<script type="text/javascript">
			var treegridObj = $HUI.treegrid("#treegrid1",{});
			treegridObj.loadData({"total":9,"rows":[
			{"id":1,"region":"Wyoming"},
			{"id":11,"region":"Albin","f1":2000,"f2":1800,"f3":1903,"f4":2183,"f5":2133,"f6":1923,"f7":2018,"f8":1838,"_parentId":1},
			{"id":12,"region":"Canon","f1":2000,"f2":1800,"f3":1903,"f4":2183,"f5":2133,"f6":1923,"f7":2018,"f8":1838,"_parentId":1},
			{"id":13,"region":"Egbert","f1":2000,"f2":1800,"f3":1903,"f4":2183,"f5":2133,"f6":1923,"f7":2018,"f8":1838,"_parentId":1},
			{"id":2,"region":"Washington"},
			{"id":21,"region":"Bellingham","f1":2000,"f2":1800,"f3":1903,"f4":2183,"f5":2133,"f6":1923,"f7":2018,"f8":1838,"_parentId":2},
			{"id":22,"region":"Chehalis","f1":2000,"f2":1800,"f3":1903,"f4":2183,"f5":2133,"f6":1923,"f7":2018,"f8":1838,"_parentId":2},
			{"id":23,"region":"Ellensburg","f1":2000,"f2":1800,"f3":1903,"f4":2183,"f5":2133,"f6":1923,"f7":2018,"f8":1838,"_parentId":2},
			{"id":24,"region":"Monroe","f1":2000,"f2":1800,"f3":1903,"f4":2183,"f5":2133,"f6":1923,"f7":2018,"f8":1838,"_parentId":2}
		],"footer":[
			{"region":"Total","f1":14000,"f2":12600,"f3":13321,"f4":15281,"f5":14931,"f6":13461,"f7":14126,"f8":12866}
		]});
		</script>
	</div>
</body>

</html>