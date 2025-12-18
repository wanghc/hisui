<?php 
// 统一入口, 统一定义变量,其它界面检查必要参数
define('ACCESS_FROM_INDEX', true);
require_once('../includes/hisui_loader.php');
if (!function_exists('renderHisuiResources')) {
    http_response_code(500); // 或 403、503 等
    die('系统错误: 缺少必要renderHisuiResources组件,无法加载页面。');
}
// index.php/vben/layout
// echo $_SERVER['PATH_INFO'] ?? '/';
$page = trim($_GET['page'] ?? 'home');
$version = in_array($_GET['version'] ?? '', HISUI_VERSIONS) ? ($_GET['version']??'') : '';
// 安全过滤 page 名称
if (!preg_match('/^[a-zA-Z0-9\/._-]+$/', $page) || strpos($page, '..') !== false) {
    $page = 'home';
}
$theme = $_GET['theme'] ?? '';
$PAGE_CONTEXT = array('version' => $version,'title' => 'HISUI');
$PAGE_INFO = array(
    array('name'=>'home','title'=>'HISUI首页'),
    array('name'=>'icon','title'=>'图标','parentName'=>'baseCtt'),
    array('name'=>'pic','title'=>'插画','parentName'=>'baseCtt'),
    array('name'=>'tooltip','title'=>'提示','parentName'=>'baseCtt'),
    array('name'=>'popover','title'=>'泡芙提示','parentName'=>'baseCtt'),
    array('name'=>'panel','title'=>'面板','purebgcolor'=>'#CDE6FF','parentName'=>'layoutCtt'),
    array('name'=>'tab','title'=>'页签','purebgcolor'=>'#CDE6FF','parentName'=>'layoutCtt'),
    array('name'=>'accordion','title'=>'手风琴','purebgcolor'=>'#CDE6FF','parentName'=>'layoutCtt'),
    array('name'=>'layout','title'=>'五方布局','purebgcolor'=>'#f1f7fe','parentName'=>'layoutCtt'),
    array('name'=>'hstep','title'=>'横向节点图','parentName'=>'layoutCtt'),
    array('name'=>'vstep','title'=>'纵向节点图','parentName'=>'layoutCtt'),
    array('name'=>'layout-query','title'=>'标准查询界面','purebgcolor'=>'#CDE6FF','parentName'=>'layoutCtt','target'=>'_blank'),
    array('name'=>'layout-menu','title'=>'左侧菜单布局','purebgcolor'=>'#CDE6FF','parentName'=>'layoutCtt','target'=>'_blank'),
    array('name'=>'label','title'=>'文本','parentName'=>'formCtt'),
    array('name'=>'linkbutton','title'=>'按钮','parentName'=>'formCtt'),
    array('name'=>'menubutton','title'=>'菜单按钮','parentName'=>'formCtt'),
    array('name'=>'splitbutton','title'=>'分割按钮','parentName'=>'formCtt'),
    array('name'=>'validatebox','title'=>'验证框','parentName'=>'formCtt'),
    array('name'=>'searchbox','title'=>'查询框','parentName'=>'formCtt'),
    array('name'=>'numberbox','title'=>'数字框','parentName'=>'formCtt'),
    array('name'=>'triggerbox','title'=>'触发框','parentName'=>'formCtt'),
    array('name'=>'datebox','title'=>'日期框','parentName'=>'formCtt'),
    array('name'=>'timespinner','title'=>'时间框','parentName'=>'formCtt'),
    array('name'=>'combobox','title'=>'下拉框','parentName'=>'formCtt'),
    array('name'=>'switchbox','title'=>'开关','parentName'=>'formCtt'),
    array('name'=>'checkbox','title'=>'复选框','parentName'=>'formCtt'),
    array('name'=>'radio','title'=>'单选框','parentName'=>'formCtt'),
    array('name'=>'filebox','title'=>'文件框','parentName'=>'formCtt'),
    array('name'=>'keywords','title'=>'关键字列表','parentName'=>'formCtt'),
    array('name'=>'datagrid','title'=>'表格','purebgcolor'=>'#CDE6FF','parentName'=>'datagridCtt'),
    array('name'=>'datagrid.scroll','title'=>'表格滚动加载','compName'=>'scroll','purebgcolor'=>'#CDE6FF','parentName'=>'datagridCtt'),
    array('name'=>'datagrid.edit','title'=>'表格编辑','compName'=>'editgrid','purebgcolor'=>'#CDE6FF','parentName'=>'datagridCtt'),
    array('name'=>'datagrid.celledit','title'=>'单元编辑','compName'=>'celledit','purebgcolor'=>'#CDE6FF','parentName'=>'datagridCtt'),    
    array('name'=>'treegrid','title'=>'树形表格','purebgcolor'=>'#CDE6FF','parentName'=>'datagridCtt'),
    array('name'=>'tree','title'=>'树','purebgcolor'=>'#CDE6FF','parentName'=>'datagridCtt'),
    array('name'=>'menutree','title'=>'菜单树','purebgcolor'=>'#CDE6FF','parentName'=>'datagridCtt'),
    array('name'=>'combogrid','title'=>'下拉表格','parentName'=>'datagridCtt'),
    array('name'=>'combotree','title'=>'下拉树','parentName'=>'datagridCtt'),
    array('name'=>'window','title'=>'窗口','parentName'=>'winCtt'),
    array('name'=>'dialog','title'=>'模态窗','parentName'=>'winCtt'),
    array('name'=>'messager','title'=>'消息框','parentName'=>'winCtt'),
    array('name'=>'lookup','title'=>'放大镜','parentName'=>'quickCtt'),
    array('name'=>'dateboxq','title'=>'日期框','parentName'=>'quickCtt'),
    array('name'=>'timeboxq','title'=>'时间框','parentName'=>'quickCtt'),
    array('name'=>'datetimeboxq','title'=>'日期时间','parentName'=>'quickCtt')
);
$GLOBALS['CURRENT_HISUI_VERSION'] = $version;
$GLOBALS['CURRENT_HISUI_THEME'] = $theme; // 是暗黑主题色
foreach ($PAGE_INFO as $pageindex) {
    if ($pageindex['name']==$page){
        $PAGE_CONTEXT['title'] = $pageindex['title'];
        $GLOBALS['CURRENT_PAGE_TITLE'] = $pageindex['title'];        
        $GLOBALS['CURRENT_PAGE_NAME'] = $pageindex['name'];
        if ($version=='pure'){
            if (isset($pageindex[ $version . 'bgcolor']) && $pageindex[ $version . 'bgcolor']!="") {
                $GLOBALS['CURRENT_PAGE_BGCOLOR'] = $pageindex[ $version . 'bgcolor'];
            }else{
                $GLOBALS['CURRENT_PAGE_BGCOLOR'] = '#FFFFFF';
            }
        }        
        break;
    }
}
$filePath = '../pages/' . $page . '.php';
if (!file_exists($filePath)) {
    $filePath = '../pages/home.php';
}
$safeBaseDir = realpath(__DIR__ . '/..');
// 当前index.php文件所在的绝对路径
// echo realpath(__DIR__) . "<br/>";
// $filePath文件的绝对路径
// echo realpath($filePath) . '<br/>';
// 防目录穿越
if (strpos(realpath($filePath), $safeBaseDir ) !== 0) {    
    die('Forbidden');
}
include( $filePath);
?>