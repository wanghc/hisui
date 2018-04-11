<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <title>HIS UI</title>
    <link rel="stylesheet" type="text/css" href="../../dist/css/hisui.css">
    <script type="text/javascript" src="../../dist/js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="../../dist/lib/icheck-1.x/icheck.js"></script>
    <script type="text/javascript" src="../../dist/lib/bootstrap-switch-1.8.0/static/js/bootstrap-switch.js"></script>
    <script type="text/javascript" src="../../dist/js/jquery.hisui.js"></script>
    <style>
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        ul>li {
            line-height: 30px;
            height: 30px;
            width:180px;
            padding: 0 5px 0 15px;
            float: left;
        }
        ul>li>a {
            text-decoration: none;
            color:#000000;
        }
        ul>li:hover {
            background-color: #E3E3E3;
        }
        .icon{
            padding-left: 20px;
            background-position: left 0px center;
            display: inline-block;
        }
        ul>li span{
            height: 30px;
            display: inline-block;
        }
        pre{
			padding: .2rem .4rem;
		    font-size: 90%;
		    color: #bd4147;
		    background-color: #f7f7f9;
		    border-radius: .25rem;
		    font-family: Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
        }
        .exp-code{
            margin: 10px 0;
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            position: relative;
        }
        .iconlist{
            display: inline-block;
        }
    </style>
</head>
<body>
    <h2>图标列表</h2>
    <h3>所有图标：</h3>
    <ul class="iconlist">
    </ul>
    <h3>说明:</h3>
    <span>各种小图标，可用到按钮(linkbutton),菜单(menu),工具栏(toolbar)</span>
    <h3>如：</h3>
    <div class="exp-code"> 
        <a href="#" class="hisui-linkbutton" iconCls="icon-clear-screen">清屏</a>
        <pre class="prettyprint lang-html">&lt;a href="#" class="hisui-linkbutton" iconCls="icon-clear-screen"&gt;清屏&lt;/a&gt;</pre>
    </div>
    <div class="exp-code"> 
        <a href="#" class="hisui-menubutton" menu='#mm', iconCls="icon-add-note">操作</a>
        <div id="mm">
            <div data-options="iconCls:'icon-undo'">撤销</div>
            <div data-options="iconCls:'icon-redo'">恢复</div>
        </div>
<pre class="prettyprint lang-html">
&lt;a href="#" class="hisui-menubutton" menu='#mm', iconCls="icon-add-note"&gt;操作&lt;/a&gt;
&lt;div id="mm"&gt;
    &lt;div data-options="iconCls:'icon-undo'"&gt;撤销&lt;/div&gt;
    &lt;div data-options="iconCls:'icon-redo'"&gt;恢复&lt;/div&gt;
&lt;/div&gt;
</pre>
    </div>
    <div class="exp-code"> 
		<table class="hisui-datagrid" title="病人列表" style="width:400px;height:150px" 
		data-options="rownumbers:true,singleSelect:true,pagination:false,toolbar:[{
                iconCls: 'icon-edit',
                text:'编辑按钮',
                handler: function(){alert('编辑按钮')}
			},{
				iconCls: 'icon-save',
				text:'保存'
			},{
				iconCls: 'icon-remove',
				text:'编辑出院带药'
			},'-',{
				iconCls: 'icon-help'
			}]">   
			<thead>   
				<tr></tr>   
			</thead>   
			<tbody>   
			</tbody>   
        </table>
        <pre class="prettyprint lang-html">data-options="rownumbers:true,singleSelect:true,pagination:false,toolbar: [{
				iconCls: 'icon-edit',
				text:'编辑按钮',
				handler: function(){alert('编辑按钮')}
			},{
				iconCls: 'icon-save',
				text:'保存'
			},{
				iconCls: 'icon-remove',
				text:'编辑出院带药'
			},'-',{
				iconCls: 'icon-help'
			}]
		"</pre>
    </div>
    <script type="text/javascript">
        $(function(){
            var icons = ['add','edit','remove','save','cut','ok','no','cancel','reload','search','print','help','undo','redo','back','sum','tip','filter'
            ,'mini-add','mini-edit','mini-refresh'
            //,'large-picture','large-clipart','large-shapes','large-smartart','large-chart','large-report'
            ,'bed','house','person','add-note','patient','outhosp-patient','stethoscope','write-order','replace-order','stop-order','cancel-order','abort-order'
            ,'uncheckin','end-adm','change-loc','resort','doctor','clear-screen','clear','read-card','update','upload-cloud','unload-cloud','reset'
            ];
            for(var i=0;i<icons.length;i++){
                $(
                    '<li>\
                    <span class="icon icon-'+icons[i]+'">icon-'+icons[i]+'</span>\
                    </li>'
                ).appendTo(".iconlist");
            }
        });
    </script>
</body>
</html>