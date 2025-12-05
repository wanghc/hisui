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
<body style="padding:10px;box-sizing: border-box;">
    <div class="hisui-panel" data-options="fit:true,title:'',border:false">
        <div class="hisui-layout" fit="true">
            <div data-options="region:'north',border:true,title:'面板标题',iconCls:'icon-panel-brand',isNormalPadding:true,collapsible:false " style="height: 153px;padding: 5px 14px; ">
                <table cellspacing="0" cellpadding="0" broder="0">
                    <tr style="height: 42px;">
                        <td class="r-label">条件</td>
                        <td class="l-value"><input type="text" class="textbox" id="arg1" style="width:193px;"></td>
                        <td class="r-label">条件</td>
                        <td class="l-value"><input type="text" class="textbox" id="arg2"></td>
                        <td class="r-label">条件</td>
                        <td class="l-value"><input type="text" class="textbox" id="arg3"></td>
                        <td class="l-value" style="padding-right: 0;font-size: 0;">
                            <input class="hisui-radio" type="radio" name="arg4" label="单选条件" id="arg4-1" />
                            <input class="hisui-radio"type="radio" name="arg4" checked label="单选条件" id="arg4-2" />
                        </td>
                        <td class="l-value">
                            <a href="javascript:void(0);" class="hisui-linkbutton" id="btn-find">查询</a>
                        </td>
                        <td class="l-value">
                            <a href="javascript:void(0);" class="hisui-linkbutton" id="btn-openwin">打开窗口</a>
                        </td>

                    </tr>
                    <tr style="height: 42px;">
                        <td class="r-label">条件</td>
                        <td class="l-value"><input type="text" class="textbox" id="arg5" style="width:193px;"></td>
                        <td class="r-label">条件</td>
                        <td class="l-value"><input type="text" class="textbox" id="arg6"></td>
                        <td class="r-label">条件</td>
                        <td class="l-value"><input type="text" class="textbox" id="arg7"></td>
                        <td class="l-value" style="padding-right: 0;font-size: 0;">
                            <input class="hisui-checkbox" type="checkbox" label="复选条件" id="arg8" />
                            <input class="hisui-checkbox" type="checkbox" checked label="复选条件" id="arg9" />
                        </td>
                        <td>
                            <a href="javascript:void(0);" class="hisui-linkbutton blue" id="btn-clear">清屏</a>
                        </td>
                        <td class="l-value">
                            <a href="javascript:void(0);" class="hisui-linkbutton" id="btn-openabout">关于</a>
                        </td>
                    </tr>
                </table>
            </div> <!--end layout-north-->
            <div data-options="region:'center',border:true">
                <table id="tbl-main"></table>
            </div> <!--end layout-center-->
        </div><!--end layout-->
        <div id="dialog2" title="完成接诊" style="width:400px;height:350px;padding:0 20px;display: none;">   
            <div style="padding:10px;">
                
            </div>
        </div>
        <style>
            .panel-body .aboutMiddle{
                border-radius:6px;
                background-color: #FFFFFF;
                width: 933px;
                height: 602px;
            }
            .panel-body .aboutbody ul>li{
                margin-top:0px;
                line-height: 40px;
                list-style: none;
            }
            .panel-body .aboutMiddle-left-top{
                float: left;
                width: 917px;
                height: 0px;
            }
            .panel-body .aboutMiddle-left-mid{
                float: left;
                width: 399px;
                height: 420px;
                background: url('../../dist/css/icons/pure/about/doc.svg');
                background-repeat:no-repeat;
                background-position: center center;
                margin: 120px 0px 80px 80px;
                padding: 0px;
            }
            .panel-body .aboutbody{
                float: left;
                width: 327px;
                height: 438px;
                background-repeat:no-repeat;
                background-position: 0px 0px;
                margin:80px 0px 0 30px;
            }
            .panel-body .aboutul{
                padding-left: 0px;
                font-size:8px;
                font-family: 'MicrosoftYaHei';
            }
            .panel-body .aboutMiddle-bottom{
                float: left;
                width: 327px;
                height: 16px;
                margin: 68px 0px 0px 0px;
                /*imedical R*/
                background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAAOCAYAAACvtwvjAAAABHNCSVQICAgIfAhkiAAABTJJREFUWEfFWM1uGzcQ5lAK0FscoKf2kJXRe9UnqP0EkaxjD5ZvRWwg8rGnyE8QGbWDAkUR+QFkKU9Q+QmiHHoqYG/uLSr3WMucfsNdrihqfwQjTRcwIFFczvCbbz5+NG0fXbJKH3y4ujnb22kcXU4xlI3Lz6TU++uzvZ6bGz0fN0nzK/c9W8PwRfy6MwzHH/od+Q2QyNfufeS36+cs48gL6f13D+L9Bji+kgis6A/k8GUYbfto1Le/M0VEao5Pc1PXg3jQxmfglwd0uJEkgJojwBMXIFmYXq5vj0+uzzo26Md4pOhA8Vu3loD6yYE+HP2uiBKgWf15c773ucsn6o236I4HC3P/S61e03b8jj5YcGs84HvqxT+1YySdVEIeY1QsbMwDOvmdvolft2fyOQRgCeqnAHqZs8T9mIXNI8d2CdDSccBlqLTaIsV9/E3B+hb++qqupijCEIVpUXQ03lGEOslzT7cCZBHQKOfx9XlnIFOzOcy3qPbjIqBlfc1mn4kiywhFEyRw4VrK31g69xnmNt08WvAkZPRKzlgg/nHvyq0jDFMLtQ9qbWUEYo7VI3qbG/P7caRr5oXEtCzEXEP6Ij5rT937VUCLpNrcldmRokfPR12tqSnjQmSz0MNK6RDddht1Gp4syr9a4FhdQJP284BuHF4OV39LZokMsaFd1x22Q3LmYu3Ybp6ULZI8ZdKRbvCNXzz3OYnJx/75UTYfGxuCVAfyfhHQkRSpbroWXGACNr8kRWA072J/PdkfxltYYl4JNGA58bU42ehSn43hA1TP21wiHdJSCPAib9MZ2AtIEfRLkkHhxkVz/fEioEtB8xYwCgUGW32ylMQ9tawskA7pHr3gvmM0uqELsGfojpaYirRIPXTIbCOg0caoVnIgSaKJFqXfF9TQdb5ZJssn0iorY5AXBOtCQiLQM3Mq0g3Qr26o9zKOZIeIM0CczHGUMbpxOIqJ6KnLIwMU7kiTmS7lLSECYs7CtUPAnQEokw7JXUD1pUPG0D1D6R7pVNnjRkCj1+ceQKeOqcz84ea8E61qOjpgdb7oyzGK1YRHfIrN2UpbVkMakEQjPBNMnZ6InqaM+auK0SYotiuge0+sqC9Ta+umRACLUCwzCQsGgvxc6DqSbtyxB6IyiNMZOtDFXEgOMrYR0Mboidb8bq3iKSPXgLYTl9ZP2IVkJ6uHZrJaKAUOfBdrE3tn10/PjLSEpRYzlA139thWD2xrmnsh0PKOyBaKA6eh3iiGtavxY83cA+GunHnYCGiruYcjYbXnLsTu8cG6HcxhtFKnzgKFxRK9DNf2LyB5v611QBWj5UBC+8GCzcXjyrkQ3B/mjPNCfabmemFwKVsjSSnQFmxxO/+YltYqskw2eipx3H43Bhpag5ZSz3ygpGXDpOXwzO0A5gGkQ5J4G94c1x0H9U1dneo78wrF7VZJhxTG12jrMBS13aEHrR9Dsqzdc3JXrNGrh/8mjA7Jk/d9Y6DBrN7qQZboc9Juy2u8AF3lOvyLj2WDZxerki50HRs6FwAnBZgUx/yfgZYDxddp/8DJA1oAK/HR73FS2wtCpsW5PppxlaWZ30kP9dGg8q1hBW+7/D+MtYSk0GmrF66HSEcVQSj9B5Kdh/aaiSf0x5xNscAl/2yyD1pzIMxYG09tjZtnjTz8pcgGXorFZ7oDIkxO/DTmtmSu5AL30cctryk3Ljc3tWZZHjLuPKvtDk8rs/XhgswjPSy5GbbE+6b76vvx7K2uZn4AOl9YjIj/Rg7fVQEb/v4vUPcmmBW757sAAAAASUVORK5CYII=");
                background-repeat:no-repeat;
                background-position: 0px 0px;
            }
            .panel-body .aboutfooter{
                margin: -3px 0px 0px 90px;
                font-size: 12px;
                background-color: transparent;
                width: 493px;
                margin-top: 0px;
                color: #000000;
                position: relative;
                padding: 0;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                border-top:1px solid transparent;
                height: 12px;
                line-height: 12px;
                padding-left:5px;
            }
            .panel-body .abouBottom{
                float: left;
                width: 917px;
                height: 0px;
            }
            .about-key{
                color:#666666;
            }
            .about-val{
                color: #191919;
            }
        </style>
        <div id="dialog3" title="产品服务支持" style="width:973px;height:680px;padding:0 20px 20px;background-color: transparent; display: none;overflow: hidden;">
            <div class="aboutMiddle">
                <div class="aboutMiddle-left-top"></div>
                <div class="aboutMiddle-left-mid"></div>
                <div class="aboutbody">
                    <div class="pic-about-dhcc-digitalmed" style="width: 256px;height: 42px;background-position-x: left;"></div>
                    <ul class="aboutul">
                        <li><span class="about-key">产品名称：</span><span class="about-val">xxxx</span></li>
                        <li><span class="about-key">产品版本：</span><span class="about-val">xxxx</span></li>
                        <li><span class="about-key">软件许可授权类型：</span><span class="about-val">xxxx</span></li>
                        <li><span class="about-key">软件许可授权截止日期：</span><span class="about-val">2025-12-30</span></li>
                        <li><span class="about-key">软件许可授权使用单位：</span><span class="about-val">xxxx</span></li>
                        <li><span class="about-key">软件许可授权用途：</span><span class="about-val">xxxx</span></li>
                        <li><span class="about-key">软件模块许可授权：</span><span class="about-val">xxxx</span></li>
                        <li>
                            <span class="about-key">机器码：</span><span class="about-val">xxxx-xxxxxx</span>
                        </li>
                    </ul>
                    <div class="aboutMiddle-bottom">
                        <div class="aboutfooter">2025 东华医为科技有限公司版权所有</div>
                    </div>
                </div>
                <div class="abouBottom">
                </div>
            </div>
        </div>
        

    </div>
    <script type="text/javascript">
        $(function(){
            var myTblMainData=[]
            for(var i=1;i<156;i++){
                myTblMainData.push({
                    name:'测试'+i,
                    content:'三级医师未填写备注('+i+')',
                    date:'2017.08.29',
                    time:'10:27:09 AM',
                    doctor:'闫静东',
                    condition:'条件内容',
                    date2:'2017.08.29',
                    time2:'10:27:09'
                })
            }
            Mock.mock("getTblMainData", function( options ){
                console.log("getTblMainData请求开始了",options);
                var obj=getData(options,myTblMainData);
                console.log("getTblMainData请求结束了，结果",obj);
                return obj;

            })

            $('#arg2').combobox({width:200,data:allLoc,valueField:'HIDDEN',textField:'Description'})
            $('#arg3').combobox({width:200,data:allGroup,valueField:'HIDDEN',textField:'Description'})
            $('#arg6').combobox({width:200,data:allUser,valueField:'HIDDEN',textField:'Description'})
            $('#arg7').combobox({width:200,data:allLoc,valueField:'HIDDEN',textField:'Description'})
            $("#btn-openwin").click(function(){
                var btns = $("#dialog2").show().dialog({
                    resizable:true,modal:true,buttons:[{
                        text:'关闭',
                        handler:function(){$HUI.dialog('#dialog2').close();}
                    },{
                        text:'保存',
                        handler:function(){}
                    }]
                });
                btns.children("div.dialog-button").find("a:eq(0)").addClass('white');
                btns.children("div.dialog-button").find("a:eq(1)").addClass('green');
            });
            $("#btn-openabout").click(function(){
                $("#dialog3").show().dialog({
                    resizable:false,modal:true
                });
            });
            $('#tbl-main').datagrid({
                border:false,
                fit:true,
                fitColumns:true,
                rownumbers:true,
		        striped:true,
                frozenColumns:[[
                    {field:'ck',checkbox:true,width:50},
                    {field:'op',title:'操作',formatter:function(val,row,ind){
                        return '<a class="tbl-main-cell-op" href="javascript:void(0);" data-op="op1" data-ind="'+ind+'" iconCls="icon-copy" title="复制"></a>'+
                        '<a class="tbl-main-cell-op" href="javascript:void(0);" data-op="op2" data-ind="'+ind+'" iconCls="icon-cancel" title="删除"></a>';
                    },width:100,align:'center'}
                ]],
                columns:[[
                    
                    {field:'name',title:'姓名',width:100},
                    {field:'content',title:'质控消息内容',width:300},
                    {field:'date',title:'质控日期',width:180,formatter:function(val,row,ind){
                        return val+' '+row['time']
                    }},
                    {field:'doctor',title:'质控医师',width:100},
                    {field:'condition',title:'条件',width:100},
                    {field:'date2',title:'质控日期',width:180,formatter:function(val,row,ind){
                        return row['date']+' '+row['time']
                    }}
                ]],
                url:'getTblMainData', //采用mockjs 模拟数据
                onLoadSuccess:function(){
                    $('.tbl-main-cell-op').off('click').on('click',function(){
                        var op=$(this).data('op');
                        var ind=$(this).data('ind');
                        var row= $('#tbl-main').datagrid('getRows')[ind];
                        $.messager.popover({msg:'点击了'+(ind+1)+'行的'+op+'按钮' ,type:'info' })

                    })
                    $('.tbl-main-cell-op').linkbutton({plain:true}).tooltip({position:'bottom'})
                },
                pagination: true,pageSize:20,
                toolbar:[
                    {text:'新增',iconCls:'icon-add',handler:function(){
                        var text=$(this).text();
                        $.messager.popover({msg:'点击了工具按钮：'+text,type:'info'})
                    }},
                    {text:'修改',iconCls:'icon-edit',handler:function(){
                        var text=$(this).text();
                        $.messager.popover({msg:'点击了工具按钮：'+text,type:'info'})
                    }},

                    {text:'删除',iconCls:'icon-cancel',handler:function(){
                        var text=$(this).text();
                        $.messager.popover({msg:'点击了工具按钮：'+text,type:'info'})
                    }},
                    '-',
                    {text:'剪切',iconCls:'icon-cut',handler:function(){
                        var text=$(this).text();
                        $.messager.popover({msg:'点击了工具按钮：'+text,type:'info'})
                    }},
                    {text:'复制',iconCls:'icon-copy',handler:function(){
                        var text=$(this).text();
                        $.messager.popover({msg:'点击了工具按钮：'+text,type:'info'})
                    }},
                    '-',
                    {text:'禁用',iconCls:'icon-cut',disabled:true,id:'tbl-main-tb-dis1',handler:function(){
                        var text=$(this).text();
                        $.messager.popover({msg:'点击了工具按钮：'+text,type:'info'})
                    }}
                ]
                                    
            })

        })

    </script>
</body>
</html>