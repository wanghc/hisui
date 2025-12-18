<?php
require_once 'config.php';

if (!function_exists('renderHisuiResources')) {
    /**
     * 渲染 Hisui 资源（防止重复输出）
     *
     * @param string $version 版本，如 'pure'
     * @return string HTML 资源字符串
     */
    function renderHisuiResources($version = '',$title = 'HISUI') {
        static $alreadyRendered = false; // 防止多次调用重复输出

        if ($alreadyRendered) {
            return ''; // 已经输出过，不再重复
        }
        $alreadyRendered = true;
        // 再次验证版本（防御性编程）
        if (!in_array($version, HISUI_VERSIONS)) {
            $version = 'pure';
        }
        // 转义版本名，防止 XSS 或路径注入
        $version = htmlspecialchars($version, ENT_QUOTES, 'UTF-8');
        $theme = htmlspecialchars($GLOBALS['CURRENT_HISUI_THEME'], ENT_QUOTES, 'UTF-8');
        $title = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
        $html = '';
        $html .= '<link rel="shortcut icon" href="../favicon.ico"/>' . "\n";
	    $html .= '<link rel="bookmark" href="../favicon.ico"/>' . "\n";
        $html .= '<meta charset="UTF-8">' . "\n" ;
        $html .= '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />' . "\n" ;
        $html .= '<title>' . $title . '</title>' . "\n";
        $html .= '<script type="text/javascript">' . "\n";
        $html .= 'var HISUIStyleCode = ' . json_encode($version) . ',HISUITheme='. json_encode($theme) . ';';
        $html .= '</script>' . "\n";
        // CSS
        $html .= '<link rel="stylesheet" type="text/css" href="' . HISUI_CSS_PATH . 'hisui.' . ($version!="" ? $version."." : "") . 'min.css">' . "\n";
        $html .= '<script type="text/javascript" src="' . HISUI_JS_PATH . 'jquery-1.11.3.min.js"></script>' . "\n";
        $html .= '<script type="text/javascript" src="../jquery-tag-demo.js"></script>' . "\n";
        $html .= '<script type="text/javascript" src="' . HISUI_JS_PATH . 'jquery.hisui.min.js"></script>' . "\n";
        $html .= '<script type="text/javascript" src="' . HISUI_JS_PATH . 'locale/hisui-lang-zh_CN.js"></script>' . "\n";
        $html .= '<script type="text/javascript" src="../mock-min.js"></script>' . "\n";
        $html .= '<link rel="stylesheet" type="text/css" href="../demo.css">' . "\n";
        if (isset($GLOBALS['CURRENT_PAGE_BGCOLOR']) && $GLOBALS['CURRENT_PAGE_BGCOLOR']!=""){
            $html .= '<style>' . "\n";
            $html .= 'body{background-color: ' . $GLOBALS['CURRENT_PAGE_BGCOLOR'] . ';}' . "\n";
            $html .= '</style>' . "\n";
        }
        return $html;
    }
}
?>