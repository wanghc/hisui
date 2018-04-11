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

## 图标列表
### 所有图标
<ul class="iconlist">
</ul>

### 说明
#### 小图标样式可用到按钮(linkbutton)、菜单(menu)、工具栏(toolbar)
#### 如：
<div class="exp-code"> 
    <a href="#" class="hisui-linkbutton" iconCls="icon-clear-screen">清屏</a>
    <pre class="prettyprint lang-html">&lt;a href="#" class="hisui-linkbutton" iconCls="icon-clear-screen"&gt;清屏&lt;/a&gt;</pre>
</div>

```html
<a href="#" class="hisui-linkbutton" iconCls="icon-clear-screen">清屏</a>
```