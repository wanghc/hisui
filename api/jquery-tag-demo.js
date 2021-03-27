/**
 *  根据top层的themecss值 来修改本页面的theme
 *  对外一个方法changeTheme(themecss) 给top层调用
 */
 function runPrettyPrint(){
    try{
        if ($("prettyprint").length>0){
            $('body').append('<link rel="stylesheet" type="text/css" href="../api/prettify.css"><script type="text/javascript" src="../api/prettify.js"><\/script>');
        }
    }catch(e){}
    $(".use-prettyprint").each(function(i,item){
        var h = item.innerHTML ;
        h = h.replace(/^(\n+)|(\n+)$|(\t+)$/g,'');
        var arr = h.split('\n');
        var tabNum = arr[0].search(/[^\t]/);
        if (tabNum<1) tabNum=1;
        var reg = new RegExp("^\t{1,"+tabNum+"}")
        var newArr = [];
        $.each(arr,function(i,x){
            return newArr[i] = x.replace(reg,"")
        });
        h = newArr.join('\n')
        .replace(/<|>/g,function(w){
            return (w=="<")?"&lt;":(w==">"?"&gt;":'');
        });
        var sel = $(item).attr('prettyprintfor');
        if (!sel){
            sel = $('<pre></pre>');
            if ($(item).hasClass('lang-html')){
                sel.addClass('lang-html');
            }else if ($(item).hasClass('lang-js')){
                sel.addClass('lang-js');
            }else{
                if (h.slice(0,4)=="&lt;"){
                    sel.addClass('lang-html');
                }else{
                    sel.addClass('lang-js');
                }
            }            
            sel.appendTo($(item).parent());
        }else{
            sel=$(sel);
        };
        sel.addClass('hide prettyprint linenums').html("<code>"+h+"</code>");
    });
    $("pre.prettyprint").addClass("linenums");
    $("pre.prettyprint").each(function(e){
        var _desc_ = "-隐藏";
        var _pp_ = $(this);
        if (_pp_.hasClass("hide")){
            _pp_.hide();
            _desc_ = '+显示';
        }
        if (_pp_.hasClass("lang-js")) _desc_+="JS";
        if (_pp_.hasClass("lang-html")) _desc_+="HTML";
        _desc_+="代码"
        var width = _pp_.parent().width();
        var jobj = $("<div class='toggle-prettyprint' style='padding-left:"+(width/2)+"px;width:120px;'>"+_desc_+"</div>").insertBefore($(this));
    });
}
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
})();

$(function(){
    /**实现通过源HTML生成示例。用法：class="use-prettyprint" prettyprintfor="#mypp"  by wanghc 2020-1-21*/
    runPrettyPrint();
    $("body").on("click",".toggle-prettyprint",function(){
        var _t = $(this);
        if (window.onResizePretty){onResizePretty();}
        if(_t.text().indexOf("+显示")>-1){
            prettyPrint();
            _t.find("+pre.prettyprint").show();
            _t.text("-隐藏"+_t.text().slice(3));
        }else{
            _t.find("+pre.prettyprint").hide();
            _t.text("+显示"+_t.text().slice(3))
        }
    });
    $(".plain-anchor").linkbutton({
        plain:true
    }).click(function(){
        var url = $(this).data("url");
        var text = '';
        if(url){
            if(parent.addTab){
                parent.$(".api-navi-tab").each(function(){
                    if(url==$(this).attr("src")){
                        text = $(this).text();
                        return false;
                    }
                });
                if(text){
                    parent.addTab(text,url);
                }else{
                    window.open("../"+url);
                }
            }else{
                window.open("../"+url);
            }
        }
    });
})