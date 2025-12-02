<?php 
require_once('./includes/hisui_loader.php');
$page = $_GET['page']??'home';
$version = $_GET['version']??'pure';
if (!in_array($version, HISUI_VERSIONS)) {
    $version = 'pure';
}
$GLOBALS['CURRENT_HISUI_VERSION'] = $version;
switch($page) {
    case 'home':
        include('home.php');
        break;
    case 'tooltip/tooltip.html':
        include('tooltip/tooltip.php');
        break;
    case 'accordion/accordion.html':
        include('accordion/accordion.php');
        break;
    case 'button/button.html':
        include('button/button.php');
        break;
    case 'checkbox/checkbox.html':
        include('checkbox/checkbox.php');
        break;
    case 'combobox/combobox.html':
        include('combobox/combobox.php');
        break;
    case 'datagrid/datagrid.html':
        include('datagrid/datagrid.php');
        break;
    case 'datalist/datalist.html':
        include('datalist/datalist.php');
        break;
    case 'datebox/datebox.html':
        include('datebox/datebox.php');
        break;
    case 'dialog/dialog.html':
        include('dialog/dialog.php');
        break;
    case 'form/form.html':
        include('form/form.php');
        break;
    case 'layout/layout.html':
        include('layout/layout.php');
        break;
    case 'linkbutton/linkbutton.html':
        include('linkbutton/linkbutton.php');
        break;
    case 'menu/menu.html':
        include('menu/menu.php');
        break;
    case 'menubutton/menubutton.html':
        include('menubutton/menubutton.php');
        break;
    case 'messager/messager.html':
        include('messager/messager.php');
        break;
    case 'numberbox/numberbox.html':
        include('numberbox/numberbox.php');
        break;
    case 'pagination/pagination.html':
        include('pagination/pagination.php');
        break;
    case 'panel/panel.html':
        include('panel/panel.php');
        break;
    case 'progressbar/progressbar.html':
        include('progressbar/progressbar.php');
        break;
    case 'propertygrid/propertygrid.html':
        include('propertygrid/propertygrid.php');
        break;
    case 'searchbox/searchbox.html':
        include('searchbox/searchbox.php');
        break;
    case 'slider/slider.html':
        include('slider/slider.php');
        break;
    case 'spinner/spinner.html':
        include('spinner/spinner.php');
        break;
    case 'splitbutton/splitbutton.html':
        include('splitbutton/splitbutton.php');
        break;
    case 'switchbutton/switchbutton.html':
        include('switchbutton/switchbutton.php');
        break;
    case 'tabs/tabs.html':
        include('tabs/tabs.php');
        break;
    case 'textbox/textbox.html':
        include('textbox/textbox.php');
        break;
    case 'timespinner/timespinner.html':
        include('timespinner/timespinner.php');
        break;
    case 'tree/tree.html':
        include('tree/tree.php');
        break;
    case 'validatebox/validatebox.html':
        include('validatebox/validatebox.php');
        break;
    case 'window/window.html':
        include('window/window.php');
        break;
    default:
        include('home.php');
        break;
}
?>