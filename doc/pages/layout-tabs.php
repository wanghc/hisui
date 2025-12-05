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
    <script src="../jquery-tag-demo.js" type="text/javascript"></script>
    <script src="../mock-min.js" type="text/javascript"></script>
    <script src="./data.js" type="text/javascript"></script>
</head>
<body style="padding:0px;box-sizing: border-box;">
    <div class="hisui-panel" data-options="fit:true,title:'',border:false">
        <div class="hisui-layout" fit="true">
            <div data-options="region:'north',border:false,title:'',split:false,isNormalPadding:false,collapsible:false" style="height: 52px;background-color: blanchedalmond;">
                头菜单
            </div> <!--end layout-north-->
            <div data-options="region:'center',border:false,split:false">
                <div class="hisui-tabs" id="menu-tabs" data-options="fit:true,simpleContextMenu:true" >
                    <div title="首页" data-options="iconCls:'icon-home'" style="padding: 10px 15px 15px 15px;">
                        <iframe src="./layout-query-inside.html" width="100%" height="100%" frameborder="0" marginwidth="0" marginheight="0" framespacing="0" ></iframe>
                    </div>
                </div>
            </div> <!--end layout-center-->
        </div><!--end layout-->
    </div>
    <script type="text/javascript">
        $(function(){
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
        })
    </script>
</body>
</html>