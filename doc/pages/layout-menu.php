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
        td.l-value{
            text-align: left;
            padding-right: 20px;
        }
    </style>
    <script src="../pages/layout/data.js" type="text/javascript"></script>
</head>
<body class="hisui-layout">
    <div data-options="region:'west',border:false" style="width:200px;padding:15px 0 15px 15px;<?php if($GLOBALS['CURRENT_HISUI_VERSION']=='pure') echo 'background-color: #cde6ff;' ?>" >
        <div id="mm"></div>
    </div>
    <div data-options="region:'center',border:false" style="padding: 15px;<?php if($GLOBALS['CURRENT_HISUI_VERSION']=='pure') echo 'background-color: #cde6ff;' ?>">
        <div class="hisui-tabs" id="menu-tabs" data-options="fit:true,simpleContextMenu:true" >
            <div title="首页" data-options="iconCls:'icon-home'" style="padding: 10px 15px 15px 15px;">首页内容</div>
        </div>
    </div>
    <script type="text/javascript">
        $(function(){
            var myMenuData=[];
            for(var i=1;i<4;i++){
                var item={id:i+'',text:'一级菜单'+i,state:'open',children:[]}
                for (var j=1;j<(6-i);j++){
                    item.children.push({
                        id:i+'-'+j,
                        text:'二级菜单'+i+'-'+j,
                        state:'open',
                        attributes:{
                            url:'index.php?page=layout-query-inside&version='+HISUIStyleCode+'&colorRGB='+HISUIColorRGB+"&lightDrak="+HISUILightDrak,
                            count:(i==1&&j<=2)?j:0
                        }
                    })

                }
                myMenuData.push(item);
                
            }
            Mock.mock("getMenuData", function( options ){
                console.log("getMenuData请求开始了",options);
                var obj=myMenuData
                console.log("getMenuData请求结束了，结果",obj);
                return obj;

            })

            var addOrOpenTab=function(tabOpts){
                var tab=$('#menu-tabs').tabs('getTab',tabOpts.title)
                if (tab){
                    $('#menu-tabs').tabs('select',tabOpts.title)
                }else{
                    var myTabOpts={
                        id:'mmt-'+tabOpts.code,
                        title:tabOpts.title,
                        iconCls:'icon-tabs',
                        content:'<iframe name="menu-tabs-frame-'+tabOpts.code+'" src="'+tabOpts.url+'" style="display:block;width: 100%;height: 100%; margin:0; border: 0;" scroll="auto"></iframe>',
                        closable:true
                    }
                    $('#menu-tabs').tabs('add',myTabOpts)

                }
            }
            
            $('#menu-tabs').tabs('options').onSelect=function(title,ind){
                var tab=$('#menu-tabs').tabs('getTab',ind);
                if(tab && tab.attr('id') && tab.attr('id').indexOf('mmt-')==0) {
                    var menuid=tab.attr('id').slice(4);
                    $('#mm').menutree('selectById',menuid);
                }

            }
            
            $('#mm').menutree({
                url:'getMenuData',
                prompt:'检索菜单',
                fit:true,
				rootCollapsible:false,
                collapsible:location.href.indexOf('collapsible')>-1,
                onMenuClick: function (node) {
                    console.log(node)
                    if(node && node.attributes &&node.attributes.url) {
                        addOrOpenTab($.extend({
                            code:node.id,
                            title:node.text
                        },node.attributes))
                    }
                },onPanelCollapse:function(width){
						//$.messager.popover({msg:'您折叠了菜单树,宽度为'+width,type:'info'})

                        $('body').layout('panel','west').panel('resize',{width:width+10});
                        $('body').layout('resize');
                },onPanelExpand:function(width){
                    //$.messager.popover({msg:'您展开了菜单树,宽度为'+width,type:'info'})
                    $('body').layout('panel','west').panel('resize',{width:width+10});
                        $('body').layout('resize');
                }
            })
            
            


        })
    </script>
</body>
</html>