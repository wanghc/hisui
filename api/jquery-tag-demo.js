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
})();

$(function(){
    /**实现通过源HTML生成示例。用法：class="use-prettyprint" prettyprintfor="#mypp"  by wanghc 2020-1-21*/
    $(".use-prettyprint").each((i,item)=>{
        let sel = $(item).attr('prettyprintfor');
        let h = item.innerHTML ;
        h = h.replace(/^(\n)+/g,'');
        let arr = h.split('\n');
        let tabNum = arr[0].indexOf('<');
        let reg = new RegExp("^\t{"+tabNum+"}")
        h = arr.map(x => x.replace(reg,"")).join('\n').replace(/</g,"&lt;").replace(/>/g,"&gt;");
        $(sel).addClass('prettyprint linenums').html("<code>"+h+"</code>");
    });
    $("pre.prettyprint").addClass("linenums");
    $("pre.prettyprint").each(function(e){
        var _desc_ = "-隐藏";
        var _pp_ = $(this);
        if (_pp_.hasClass("hide")){
            _pp_.hide();
            _desc_ = '+显示';
        }
        if (_pp_.hasClass("lang-js")){
            _desc_+="JS"
        }
        if (_pp_.hasClass("lang-html")){
            _desc_+="HTML"
        }
        _desc_+="代码"
        
        var width = _pp_.parent().width();
        var jobj = $("<div class='toggle-prettyprint' style='padding-left:"+(width/2)+"px;width:120px;'>"+_desc_+"</div>").insertBefore($(this));
        jobj.click(function(){
            var _t = $(this);
            if(_t.text().indexOf("+显示")>-1){
                prettyPrint();
                _t.find("+pre.prettyprint").show();
                _t.text("-隐藏"+_t.text().slice(3));
            }else{
                _t.find("+pre.prettyprint").hide();
                _t.text("+显示"+_t.text().slice(3))
            }
        });
    });
    try{
        $("prettyprint").html('<link rel="stylesheet" type="text/css" href="../../api/prettify.css">\
        <script type="text/javascript" src="../../api/prettify.js"></script>\
        ');
    }catch(e){}
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