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
        .hisui-accordion ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .hisui-accordion ul>li {
            
            line-height: 35px;
            
	        padding: 0 5px 0 15px;
        }
        .hisui-accordion ul>li>a {
            position: relative;
            display: block;
            text-decoration: none;
            color:#000000;
        }
        .hisui-accordion ul>li:hover{
            
                background-color: #e4f0fe;
                        
        }
        .hisui-accordion ul>li.active{
            
                background-color: #d7e9ff;
                        
        }
        #tabs .panel .panel-body{
            overflow: hidden;
        }
        #navbar{
            width: 100%;
            height: 43px;
            line-height: 43px;
            background: url(http://ylxt.dhcc.com.cn/ylxt/assetsace/images/dhcc-xt-ad/bg_topbluecq.png) #0063a7;
            background-size: auto;
        }
        #navbar .nav-right{
            float:right;height:43px;padding-right:20px;
        }
        #navbar .nav-btn{
            color:#E3E3E3;
            line-height: 43px;
            height: 43px;
            padding: 0;
            position: relative;
            float: left;
            cursor: pointer;
        }
        #navbar .nav-icon{
            background-position-x: 8px;
            padding-left: 30px;
            padding-right: 8px;
            height: 43px;
            line-height: 43px;
            font-size: 16px;
            display: inline-block;
        }
        #navbar .nav-icon:hover{
            background-color: rgba(0,0,0,.1);
        }
        #themediv{
            display: none;
            width:72px;
		  	background-color:#fff; /*#F9FBFF*/
		  	border:1px solid #ccc;
		  	padding:8px 3px 0 0;
		  	position:absolute;
		  	border-radius:3px;
              z-index:100;
              top:10px;
        }
        #themediv span{
            display: inline-block;
            cursor: pointer;
            width: 18px;
            height: 18px;
            margin-left:3px;
            margin-bottom:3px;
            background: #0063a7;
            position: relative;
        }
        #themediv:before {
			background-color:#fff; /*#F9FBFF*/
		  	border:1px solid #ccc;
		  	border-bottom:0;
		  	border-right:0;
			position: absolute;
			content: '';
			width: 10px;
			height: 10px;
			left:34px;
			top:-7px;
			-webkit-transform: rotate(45deg);
			-ms-transform: rotate(45deg);
			transform: rotate(45deg);
            z-index: 101;
          }
        .themeitem-selected:after{
            content: "√";
            display: inline-block;
            font-size: 18px;
            color: #FFF;
            position: absolute;
            left: 0;
            right: 0;
            width: 18px;
            height:18px;
            text-align: center;
            line-height: 18px;
        }
    </style>
</head>
<body class="hisui-layout">
    <!--<div id="themediv">
        <span></span> <span></span> <span></span>
    </div>
    <div region="north" border="false"   style="height:43px;padding:0px;"> 
        <div id="navbar" >
            <span style="font-size:30px">
                HISUI API
            </span>
            <div class="nav-right" >
                <div class="nav-btn" id="themebtn">
                    <span class="nav-icon icon-person">皮肤</span>
                </div>
                <div class="nav-btn">
                    <span class="nav-icon icon-tip">其它</span>
                </div>
            </div>
         </div>   
    </div>-->
    <div id="versionMenu" class="hisui-menu" style="width:120px;">
        <div data-version="pure">纯净</div>
        <div data-version="blue">炫彩</div>
        <div data-version="lite">极简</div>
        <div data-version="lightblue">浅蓝</div>
        <div data-version="vben">扁平</div>
    </div>
    <!-- 隐藏的 color input，用于触发选色器 -->
    <input type="color" id="colorPicker" style="opacity:0;position: relative;width: 16px;height: 16px;top:10px;left:136px;" />
    <script type='text/javascript'>
        var PAGELISTDATA = <?php echo json_encode($PAGE_INFO) ?>;
        function showVersionMenu(){
            // 显示下拉菜单，位置在工具按钮下方
            var panel = $('body').layout('panel','west');
            var toolBtn = panel.panel('header'); // 获取工具区域
            var btn = toolBtn.find('.icon-w-switch').closest('a'); // 找到当前按钮
            $('#versionMenu').menu('show', {
                left: btn.offset().left,
                top: btn.offset().top + btn.outerHeight()
            });
        }
        // 为菜单项绑定点击事件
        $('#versionMenu').menu({
            onClick: function(item) {
                var version = $(item.target).data('version');
                switchTheme(version);
            }
        });
        // 模拟主题切换函数
        function switchTheme(versionName) {
            location.href = `index.php?version=${versionName}`
        }
        function showColorPicker(){
            var panel = $('body').layout('panel','west');
            var toolBtn = panel.panel('header');
            var btn = toolBtn.find('.icon-w-list').closest('a');
            $('#colorPicker').offset({
                left: btn.offset().left,
                top: btn.offset().top
            });
            setTimeout(() => {
                $('#colorPicker').click();
            }, 100);
        }
        // 颜色选择器变化事件
        $('#colorPicker').on('change', function() {
            const selectedColor = this.value; // 格式如 #ff5733
            $.hisui.switchPrimaryColor(selectedColor);
        });
        function showDarkTheme(){
            $.hisui.switchLightDrak();
        }
    </script>
    <div region="west" border="true" split="false" collapsible="false" title="HISUI" 
    data-options="tools:[{iconCls:'icon-w-switch',handler:showVersionMenu}<?php if ($PAGE_CONTEXT['version']=='vben') echo ',{iconCls:\'icon-w-list\',handler:showColorPicker},{iconCls:\'icon-w-clock\',handler:showDarkTheme}' ?>]"  style="width:200px;padding:0px;">
        <div id="accd" class="hisui-accordion  accordion-gray" fit="true" data-options="border:false">
            <div title="基础" id="baseCtt"></div>
            <div title="布局" id="layoutCtt"></div>
            <div title="表单" id="formCtt">
                <!--<ul>
                    <li><a href="javascript:void(0);"  src="inputstyleset/inputstyleset.html" class="api-navi-tab">输入框样式集合</a></li>
                    <li><a href="javascript:void(0);"  src="imedisabled/imedisabled.html" class="api-navi-tab">切换英文输入法</a></li> 
                </ul> -->
            </div>
            <div title="表格及树" id="datagridCtt"></div>
            <div title="窗口" id="winCtt"></div>
            <div title="极速系列" id="quickCtt"></div>
            <div title="测试"> 
                <ul>   
                    <li><a href="javascript:void(0);"  src="treegrid/treegrid.dnd.html" class="api-navi-tab">拖拽树形表格(treegrid.dnd)</a></li>    
                    <li><a href="javascript:void(0);"  src="test/formtest.html" class="api-navi-tab">表单们(formtest)</a></li>
                    <li><a href="javascript:void(0);"  src="test/textbox.html" class="api-navi-tab">文本框(textbox)</a></li>
                    <li><a href="javascript:void(0);" target="_blank" src="layout/layout-query.html" class="api-navi-tab">标准查询界面</a></li>
                    <li><a href="javascript:void(0);" target="_blank" src="layout/layout-menu.html" class="api-navi-tab">左侧菜单布局</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!--   tabs//-->
    <div region="center" border=true split=true title="">
        <div class="hisui-tabs" data-options="border:false,split:true,fit:true" id="tabs">
            <div title="首页" style="padding:20px;" border=true>
                <iframe scrolling="auto" frameborder="0"  src="https://wanghc.github.io/hisui/dist/" style="width:100%;height:100%;"></iframe>
            </div>  
        </div>
    </div>
    <!--   south//-->
    <div border='false' region='south'><center>基础平台 hisui 0.1.0</center></div>
    <script type="text/javascript">
        
        function addTab(title, url){
            if ($('#tabs').tabs('exists', title)){
                $('#tabs').tabs('select', title);   //选中并刷新
                var currTab = $('#tabs').tabs('getSelected');
                //var url = $(currTab.panel('options').content).attr('src');
                if(url != undefined && currTab.panel('options').title != '首页') {
                    $('#tabs').tabs('update',{
                        tab:currTab,
                        options:{
                            content:createFrame(url)
                        }
                    })
                }
            }else{
                var content = createFrame(url);
                $('#tabs').tabs('add',{
                    style:{overflow:'hidden'},
                    title:title,
                    content:content,
                    closable:true
                });
            }
        }
        function createFrame(url) {
            var s = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
            return s;
        }
        //改为在jQuery加载完成调用 不再增加一个tab调用一次
        function tabClose() {
            /*双击关闭TAB选项卡*/
            $('.tabs-header').on('dblclick','.tabs-inner',function(){
                var subtitle = $(this).children(".tabs-closable").text();
                $('#tabs').tabs('close',subtitle);
            }).on('contextmenu','.tabs-inner',function(e){
                e.preventDefault();
                var subtitle =$(this).children(".tabs-title").text();    //不嫩用.tabs-closable
                //做一些右键菜单的禁用启用
                if (subtitle=="首页"){
                    $('#mm').menu('disableItem',$('#mm-tabupdate')[0]);
                    $('#mm').menu('disableItem',$('#mm-tabclose')[0]);
                }else{
                    $('#mm').menu('enableItem',$('#mm-tabupdate')[0]);
                    $('#mm').menu('enableItem',$('#mm-tabclose')[0]);
                }

                var leftnum=$('.tabs-selected').prevAll().length;
                if(leftnum>1){  //有个首页 要大于1
                    $('#mm').menu('enableItem',$('#mm-tabcloseleft')[0]);
                }else{
                    $('#mm').menu('disableItem',$('#mm-tabcloseleft')[0]);
                }
                var rightnum=$('.tabs-selected').nextAll().length;
                if(rightnum>0){
                    $('#mm').menu('enableItem',$('#mm-tabcloseright')[0]);
                }else{
                    $('#mm').menu('disableItem',$('#mm-tabcloseright')[0]);
                }

                if (leftnum>1 || rightnum>0 ){
                    $('#mm').menu('enableItem',$('#mm-tabcloseother')[0]);
                }else{
                    $('#mm').menu('disableItem',$('#mm-tabcloseother')[0]);
                }
                $('#mm').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                });
                $('#mm').data("currtab",subtitle);
                $('#tabs').tabs('select',subtitle);
                return false;
            });
        }

        //绑定右键菜单事件   
        var tabCloseEven= {
            //刷新
            tabupdate:function(){
                var currTab = $('#tabs').tabs('getSelected');
                var url = $(currTab.panel('options').content).attr('src');
                if(url != undefined && currTab.panel('options').title != '首页') {
                    $('#tabs').tabs('update',{
                        tab:currTab,
                        options:{
                            content:createFrame(url)
                        }
                    })
                }
            },
            //关闭当前
            tabclose:function(){
                var currtab_title = $('#mm').data("currtab");
                $('#tabs').tabs('close',currtab_title);
            },
            //全部关闭
            tabcloseall:function(){
                $('.tabs-inner span').each(function(i,n){
                    var t = $(n).text();
                    if(t != '首页') {
                        $('#tabs').tabs('close',t);
                    }
                });
            },
            //关闭除当前之外的TAB
            tabcloseother:function(){
                var prevall = $('.tabs-selected').prevAll();
                var nextall = $('.tabs-selected').nextAll();		
                if(prevall.length>0){
                    prevall.each(function(i,n){
                        var t=$('a:eq(0) span',$(n)).text();
                        if(t != '首页') {
                            $('#tabs').tabs('close',t);
                        }
                    });
                }
                if(nextall.length>0) {
                    nextall.each(function(i,n){
                        var t=$('a:eq(0) span',$(n)).text();
                        if(t != '首页') {
                            $('#tabs').tabs('close',t);
                        }
                    });
                }
                 //需要重新选中当前
                 $('#tabs').tabs('select',$('#mm').data('currtab'));
                return false;
            },
            //关闭当前右侧的TAB
            tabcloseright:function(){
                var nextall = $('.tabs-selected').nextAll();
                if(nextall.length==0){
                    //msgShow('系统提示','后边没有啦~~','error');
                    alert('后边没有啦~~');
                    return false;
                }
                nextall.each(function(i,n){
                    var t=$('a:eq(0) span',$(n)).text();
                    $('#tabs').tabs('close',t);
                });
                //需要重新选中当前
                $('#tabs').tabs('select',$('#mm').data('currtab'));

                return false;
            },
            //关闭当前左侧的TAB
            tabcloseleft:function(){
                var prevall = $('.tabs-selected').prevAll();
                if(prevall.length==0){
                    alert('到头了，前边没有啦~~');
                    return false;
                }
                prevall.each(function(i,n){
                    var t=$('a:eq(0) span',$(n)).text();
                    if(t != '首页') {
                        $('#tabs').tabs('close',t);
                    }
                });
                //需要重新选中当前
                $('#tabs').tabs('select',$('#mm').data('currtab'));
                return false;
            },

            //退出
            exit:function(){
                $('#mm').menu('hide');
            }
        }
        function changeApiTheme(){
            $('#themecss').attr('href','../dist/css/'+themecss);
            for (var i=0;i<window.frames.length;i++){
                if(typeof window.frames[i].changeTheme=="function"){
                    window.frames[i].changeTheme(themecss);
                }
            }
        }
        function initTheme(){
            var themearr=[{
				tip:'标准蓝',
                code:'basic',
                color:'#40a2de',
                css:'hisui.css'
            },{
				tip:'南方绿',
                code:'nfyy',
                color:'#60D1C2',
                css:'hisui.nfyy.css'
            }];
            var html="";
            for (var i=0;i<themearr.length;i++){
                html=html+"<span title='"+themearr[i].tip+"' data-css='"+themearr[i].css+"' style='background-color:"+themearr[i].color+";'></span>";
            }
            $('#themediv').empty().append(html).find('span').eq(0).addClass('themeitem-selected');
            $('#themebtn').click(function(e){
                if($('#themediv').is(':visible')){

                }else{
                    $('#themediv').css({
                        left:$(this).offset().left,
                        top:43
                    }).show();

                }
            })
            $('#themediv').on('click','span',function(){
                themecss=$(this).data('css');
                $('.themeitem-selected').removeClass('themeitem-selected');
                $(this).addClass('themeitem-selected');
                changeApiTheme();
                $('#themediv').hide();
            })
            $('body').click(function(e){
                if(e.target.id=="themediv" || e.target.id=="themebtn" || $('#themediv,#themebtn').find(e.target).length>0 ){
                    return true;
                }else{
                    $('#themediv').hide();
                }
            })
        }
        var themecss="hisui.min.css";
        $(function(){
            $("#accd").find('.accordion-body').each(function(i,item){
                var html = '';
                let id = item.id;
                for (var j=0; j<PAGELISTDATA.length; j++){
                    if (id==PAGELISTDATA[j].parentName){
                        html += `<div class="menu-item" src="${PAGELISTDATA[j].name}" text="${PAGELISTDATA[j].title}" target="${PAGELISTDATA[j].target||""}">
                            <div class="menu-text">${PAGELISTDATA[j].title}(${PAGELISTDATA[j].compName||PAGELISTDATA[j].name})</div>
                        </div>`;
                    }
                }
                $(this).append(html);
            });
            tabClose();
            initTheme();
            $('#accd .menu-item').hover(function() {
                $(this).addClass('menu-active');
            }, function() {
                $(this).removeClass('menu-active');
            });
            $('#accd .menu-item').click(function() {
                var $this = $(this);
                var href = $this.attr('src');
                var title = $this.text();
                var target=$this.attr('target');
                var myhref = `index.php?version=${HISUIStyleCode}&page=${href}&colorRGB=${HISUIColorRGB}&lightDrak=${HISUILightDrak}`;
                $("#accd .menu-item").each(function(){
                    $(this).removeClass('menu-select');
                });
                $(this).addClass('menu-select');
                if (target=='_blank') {
                    window.open(myhref,'_blank');
                    return false;
                }else{
                    addTab(title, myhref);
                    //addTab(title, href);
                }
            });
            if(location.href.indexOf("dev=1")==-1){
                $('#accd').accordion('remove','测试');
            }
            $('#tabs').tabs("options").onSelect=function(title,index){
                $("#accd .menu-item").each(function(){
                    $(this).removeClass('menu-select');
                    if ($(this).text()==title){
                        $(this).addClass('menu-select');;
                    }
                });
                // $(".api-navi-tab").each(function(){
                //     $(this).closest("li").removeClass('active');
                //     if ($(this).text()==title){
                //         $(this).closest("li").addClass('active');
                //     }
                // });
            }
        });	
    </script>
    <div id="mm" class="hisui-menu cs-tab-menu">
        <div id="mm-tabupdate" onclick="tabCloseEven.tabupdate();">刷新</div>
        <div class="menu-sep" ></div>
        <div id="mm-tabclose" onclick="tabCloseEven.tabclose();">关闭</div>
        <div id="mm-tabcloseother" onclick="tabCloseEven.tabcloseother();">关闭其他</div>
        <div id="mm-tabcloseall" onclick="tabCloseEven.tabcloseall();">关闭全部</div>
        <div id="mm-tabcloseleft" onclick="tabCloseEven.tabcloseleft();">关闭左侧</div>
        <div id="mm-tabcloseright" onclick="tabCloseEven.tabcloseright();">关闭右侧</div>
    </div>    
    <script type="text/javascript" src="../pages/home/newtip.js"></script>
    <style>.x-newtip{font-size: 10px;position:  absolute;color:red;z-index:1000;}</style>
    <script type="text/javascript">
        $.parser.onComplete = function(context){
            // 第一次context为undefined,不为空跳出.
            if (!!context) return ;
            //已读过的最高api版本
            // 当前界面只有一处【新】，则newType可定义为readApiVersion
            // 当前界面有多处【新】，则要定义不同newType
            $('.api-navi-tab[src="keywords/keywords.html"]').newtip({
                newVersion:13,newType:"readApiVersion",expires:3600,insertBody:false
            });
        }
    </script>
</body>
</html>