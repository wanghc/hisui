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
    <h2>分割按钮</h2>
    <h3>说明:</h3>
    <span>分割按钮（Split Button）包含一个链接按钮（Link Button）和一个菜单（Menu）。当用户点击或者鼠标悬停在向下箭头区域，将会显示一个对应的菜单。</span>
	<h3>透明色按钮</h3>
	<div class="demo-exp-code entry-content"> 
    <div style="width: 533px;border: 1px solid transparent;padding: 1px" class="use-prettyprint lang-html">		
        <a href="javascript:void(0)" id="sb1" class="hisui-splitbutton" data-options="menu:'#mm2',iconCls:'icon-abort-order',onClick:function(){
            $.messager.popover({msg:'按钮自己',type:'info'});
        }">医嘱处理</a>   
        <div id="mm2" style="width:140px;" class="menu-no-icon">   
            <div onclick="$.messager.popover({msg:'停止',type:'info'});">停止</div>
            <div onclick="$.messager.popover({msg:'作废',type:'info'});">作废</div>
            <div onclick="$.messager.popover({msg:'撤销',type:'info'});">撤销</div>
        </div>
    </div>
    </div>
    <h3>蓝色<code>plain:false</code></h3>
    <div class="demo-exp-code entry-content"> 
        <div style="width: 533px;border: 1px solid transparent;padding: 1px" class="use-prettyprint lang-html">
            <a href="javascript:void(0)" id="sb2" class="hisui-splitbutton" data-options="menu:'#mm3',plain:false,onClick:function(){
                $.messager.popover({msg:'按钮自己',type:'info'});
            }">打印[F6]</a>   
            <div id="mm3" style="width:100px;" class="menu-no-icon menu-no-icon-blue">   
                <div onclick="$.messager.popover({msg:'PDF',type:'info'});">打印PDF</div>   
                <div onclick="$.messager.popover({msg:'预览',type:'info'});">打印预览</div>
                <div onclick="$.messager.popover({msg:'报告',type:'info'});">打印报告</div>   
            </div>
        </div>
    </div>
	<h3>淡色<code>splitbutton-light</code></h3>
    <div class="demo-exp-code entry-content"> 
	<div style="width: 533px;border: 1px solid transparent;padding: 1px" class="use-prettyprint lang-html open">
    <a href="javascript:void(0)" id="sb4" class="hisui-splitbutton splitbutton-light" data-options="menu:'#mm4',plain:false,onClick:function(){
        $.messager.popover({msg:'按钮自己',type:'info'});
    }">打印[F6]</a>   
    <div id="mm4" style="width:100px;" class="menu-no-icon splitbutton-light">   
        <div onclick="$.messager.popover({msg:'PDF',type:'info'});">打印PDF</div>   
        <div onclick="$.messager.popover({msg:'预览',type:'info'});">打印预览</div>
        <div onclick="$.messager.popover({msg:'报告',type:'info'});">打印报告</div>   
    </div>
    </div>
    </div>
	<prettyprint/>
</body>
</html>