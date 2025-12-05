<!DOCTYPE html>
<html>
<head>
	<?php echo renderHisuiResources($PAGE_CONTEXT['version'],$PAGE_CONTEXT['title']); ?>
</head>
<body>
	<h2>JSON转换。</h2>
	<h3>说明: 为兼容所有IE版本下JSON转换,引入json2.js,源自于<a href="https://github.com/douglascrockford/JSON-js" target="_blank">json2.js</a></h3>
	<!---<a href="http://www.json.org/json-zh.html" target="_blank">标准JSON格式</a>下json的“key”与“字符值”应该使用双引号，而有些后台输出为单引号，从而不能解析成json，固-->
	<h3>使用:</h3>
	<span>序列化方法（json对象转字符串）</span>
	<pre class="prettyprint hide lang-js">
<code>var jsonObj = {id:'01',name:'wang'};
JSON.stringify(jsonObj);</code></pre>
<span>反序列化方法（字符串转json对象）</span>

<pre class="prettyprint hide lang-js">
<code>//推荐后台输出修改成标准json格式，json的"key"与"字符值"应该使用双引号包裹
var jsonStr = '{"id":"01","name":"wang"}';  //标准json字符串
JSON.parse(jsonStr); 

var str = "{id:'01',name:'wang'}";   //不符合规范的json字符串，尽量避免
JSON.parse(str);</code></pre>
<prettyprint/>
</body>
</html>