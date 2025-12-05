<?php 
require_once('../includes/hisui_loader.php');
$page = trim($_GET['page'] ?? 'home');
$version = in_array($_GET['version'] ?? '', HISUI_VERSIONS) ? $_GET['version'] : '';
// 安全过滤 page 名称
if (!preg_match('/^[a-zA-Z0-9\/._-]+$/', $page) || strpos($page, '..') !== false) {
    $page = 'home';
}
$colorRGB = $_GET['colorRGB'] ?? '';
$isDrak = $_GET['lightDrak'] ?? '';
$PAGE_CONTEXT = array('version' => $version,'title' => 'HISUI','colorRGB' => $colorRGB);
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
$GLOBALS['CURRENT_HISUI_colorRGB'] = $colorRGB; // hisui 主题色
$GLOBALS['CURRENT_PAGE_DRAK'] = $isDrak; // 是暗黑主题色
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
// $GLOBALS['CURRENT_HISUI_VERSION'] = $version;
include( $filePath);

// switch($page) {
//     case 'home':
//         include('home.php');
//         break;
//     case 'accordion':
//         include('accordion/accordion.php');
//         break;
//     case 'ajax':
//         include('ajax/ajax.php');
//         break;
//     case 'checkbox':
//         include('checkbox/checkbox.php');
//         break;
//     case 'combo':
//         include('combo/combo.php');
//         break;
//     case 'combobox':
//         include('combobox/combobox.php');
//         break;
//     case 'combogrid':
//         include('combogrid/combogrid.php');
//         break;
//     case 'comboq':
//         include('comboq/comboq.php');
//         break;
//     case 'combotree':
//         include('combotree/combotree.php');
//         break;
//     case 'common':
//         include('common/function.php');
//         break;
//     case 'datagrid':
//         include('datagrid/datagrid.php');
//         break;
//     case 'datagrid.celledit':
//         include('datagrid/datagrid.celledit.php');
//         break;
//     case 'datagrid.edit':
//         include('datagrid/datagrid.edit.php');
//         break;
//     case 'datagrid.scroll':
//         include('datagrid/datagrid.scroll.php');
//         break;
//     case 'datebox':
//         include('datebox/datebox.php');
//         break;
//     case 'dateboxq':
//         include('datebox/dateboxq.php');
//         break;
//     case 'datetimeboxq':
//         include('datebox/datetimeboxq.php');
//         break;
//     case 'timeboxq':
//         include('timespinner/timeboxq.php');
//         break;
//     case 'dialog':
//         include('dialog/dialog.php');
//         break;
//     case 'excel':
//         include('excel/excel.php');
//         break;
//     case 'filebox':
//         include('filebox/filebox.php');
//         break;
//     case 'hstep':
//         include('hstep/hstep.php');
//         break;
//     case 'icon':
//         include('icon/icon.php');
//         break;    
//     case 'input':
//         include('input/input.php');
//         break;    
//     case 'inputstyleset':
//         include('inputstyleset/inputstyleset.php');
//         break;
//     case 'keywords':
//         include('keywords/keywords.php');
//         break;
//     case 'label':
//         include('label/label.php');
//         break;
//     case 'layout':
//         include('layout/layout.php');
//         break;
//     case 'layout-menu':
//         include('layout/layout-menu.php');
//         break;
//     case 'layout-query':
//         include('layout/layout-query.php');
//         break;
//     case 'linkbutton':
//         include('linkbutton/linkbutton.php');
//         break;
//     case 'lookup':
//         include('lookup/lookup.php');
//         break;    
//     case 'menubutton':
//         include('menubutton/menubutton.php');
//         break;
//     case 'menutree':
//         include('menutree/menutree.php');
//         break;
//     case 'messager':
//         include('messager/messager.php');
//         break;
//     case 'numberbox':
//         include('numberbox/numberbox.php');
//         break;
//     case 'panel':
//         include('panel/panel.php');
//         break;
//     case 'pic':
//         $PAGE_TITLE = '插画';
//         include('pic/pic.php');
//         break;
//     case 'popover':
//         include('popover/popover.php');
//         break;
//     case 'radio':
//         include('radio/radio.php');
//         break;
//     case 'scrollbar':
//         include('scrollbar/datagrid.php');
//         break;
//     case 'searchbox':
//         include('searchbox/searchbox.php');
//         break;
//     case 'splitbutton':
//         include('splitbutton/splitbutton.php');
//         break;
//     case 'switchbutton':
//         include('switchbutton/switchbutton.php');
//         break;
//     case 'tabs':
//         include('tabs/tabs.php');
//         break;
//     case 'timespinner':
//         include('timespinner/timespinner.php');
//         break;
//     case 'tooltip':
//         include('tooltip/tooltip.php');
//         break;
//     case 'tree':
//         include('tree/tree.php');
//         break;    
//     case 'treegrid':
//         include('treegrid/treegrid.php');
//         break;
//     case 'triggerbox':
//         include('triggerbox/triggerbox.php');
//         break;
//     case 'validatebox':
//         include('validatebox/validatebox.php');
//         break;
//     case 'vstep':
//         include('vstep/vstep.php');
//         break;
//     case 'window/window.html':
//         include('window/window.php');
//         break;
//     default:
//         include('home.php');
//         break;
// }
?>