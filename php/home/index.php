<?php 
require_once('../includes/hisui_loader.php');
$page = trim($_GET['page'] ?? 'home');
$version = in_array($_GET['version'] ?? '', HISUI_VERSIONS) ? $_GET['version'] : '';
// 安全过滤 page 名称
if (!preg_match('/^[a-zA-Z0-9\/._-]+$/', $page) || strpos($page, '..') !== false) {
    $page = 'home';
}
$PAGE_CONTEXT = array('version' => $version,'title' => 'HISUI');
$PAGE_INFO = array(
    array('name'=>'home','title'=>'HISUI首页'),
    array('name'=>'icon','title'=>'图标'),
    array('name'=>'pic','title'=>'插画'),
    array('name'=>'tooltip','title'=>'提示'),
    array('name'=>'popover','title'=>'泡芙提示'),
    array('name'=>'panel','title'=>'面板'),
    array('name'=>'tab','title'=>'页签'),
    array('name'=>'accordion','title'=>'手风琴'),
    array('name'=>'layout','title'=>'五方布局'),
    array('name'=>'hstep','title'=>'横向节点图'),
    array('name'=>'vstep','title'=>'纵向节点图'),
    array('name'=>'layout-query','title'=>'标准查询界面'),
    array('name'=>'layout-menu','title'=>'左侧菜单布局'),
    array('name'=>'label','title'=>'文本'),
    array('name'=>'linkbutton','title'=>'按钮'),
    array('name'=>'menubutton','title'=>'菜单按钮'),
    array('name'=>'splitbutton','title'=>'分割按钮'),
    array('name'=>'validatebox','title'=>'验证框'),
    array('name'=>'searchbox','title'=>'查询框'),
    array('name'=>'numberbox','title'=>'数字框'),
    array('name'=>'triggerbox','title'=>'触发框'),
    array('name'=>'datebox','title'=>'日期框'),
    array('name'=>'timespinner','title'=>'时间框'),
    array('name'=>'combobox','title'=>'下拉框'),
    array('name'=>'switchbox','title'=>'开关'),
    array('name'=>'checkbox','title'=>'复选框'),
    array('name'=>'radio','title'=>'单选框'),
    array('name'=>'filebox','title'=>'文件框'),
    array('name'=>'keywords','title'=>'关键字列表'),
    array('name'=>'datagrid','title'=>'表格'),
    array('name'=>'datagrid.scroll','title'=>'表格滚动加载'),
    array('name'=>'datagrid.edit','title'=>'表格编辑'),
    array('name'=>'datagrid.celledit','title'=>'单元编辑'),    
    array('name'=>'treegrid','title'=>'树形表格'),
    array('name'=>'tree','title'=>'树'),
    array('name'=>'menutree','title'=>'菜单树'),
    array('name'=>'combogrid','title'=>'下拉表格'),
    array('name'=>'combotree','title'=>'下拉树'),
    array('name'=>'window','title'=>'窗口'),
    array('name'=>'dialog','title'=>'模态窗'),
    array('name'=>'messager','title'=>'消息框'),
    array('name'=>'lookup','title'=>'放大镜'),
    array('name'=>'dateboxq','title'=>'日期框'),
    array('name'=>'timeboxq','title'=>'时间框'),
    array('name'=>'datetimeboxq','title'=>'日期时间')
);
foreach ($PAGE_INFO as $pageindex) {
    if ($pageindex['name']==$page){
        $PAGE_CONTEXT['title'] = $pageindex['title'];
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