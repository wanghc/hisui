/**
 *  根据top层的themecss值 来修改本页面的theme
 *  对外一个方法changeTheme(themecss) 给top层调用
 */
(function(){
	return;
    var changeTheme=function (themecss){
        var links=document.getElementsByTagName("link");
        for(var i=0;i<links.length;i++){
            var href=links[i].href;
            if(href.indexOf("dist/css/hisui")>-1) {
                var thref=href.split("dist/css/hisui")[0]+"dist/css/"+themecss;
                if (thref!=href){
                    links[i].href=thref;
                }
                break;
            }
        }
    }
    //直接替换会导致js中的计算奇奇怪怪  放到$.parser.onComplete再替换吧
    /*
    if (top && top.themecss){
        changeTheme(top.themecss)
    }*/
    $.parser.onComplete = function(context){
        // 第一次context为undefined,不为空跳出.
        if (!!context) return ;
		var css = parent.themecss;
        if (top && top.themecss){
            css = top.themecss;
        }
		changeTheme(css)
    }

    window.changeTheme=changeTheme;
})()

$(function(){
    $("pre.prettyprint").addClass("linenums");
    $("pre.prettyprint").each(function(e){
        var _desc_ = "-隐藏源代码";
        var _pp_ = $(this);
        if (_pp_.hasClass("hide")){
            _pp_.hide();
            _desc_ = '+显示源代码';
        }
        var width = _pp_.parent().width();
        var jobj = $("<span class='toggle-prettyprint' style='padding-left:"+(width/2)+"px;width:100px;'>"+_desc_+"</span>").insertBefore($(this));
        jobj.click(function(){
            var _t = $(this);
            if(_t.text()=="+显示源代码"){
                $(this).find("+pre.prettyprint").show();
                $(this).text("-隐藏源代码")
            }else{
                $(this).find("+pre.prettyprint").hide();
                $(this).text("+显示源代码")
            }

        });
    });
    $("prettyprint").html('<link rel="stylesheet" type="text/css" href="../../api/prettify.css">\
    <script type="text/javascript" src="../../api/prettify.js"></script>\
    <script type="text/javascript">\
        prettyPrint();\
    </script>');

})