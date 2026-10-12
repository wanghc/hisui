/* 验证 lib/ 下原生 EasyUI tabs 的关闭按钮已带 aria-label（含动态 add 场景）
   用法: node easyui-tabs-a11y.js <lib版本目录>   例如 lib/easyui-1.3.6 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = 'D:/workspace_iis/hisui-0.1.0/';
const verDir = process.argv[2] || 'lib/easyui-1.3.6';
// easyui 的 panel 只在 plugins 下，统一用 plugins 目录（结构最完整）
const sub = 'plugins';
const deps = ['parser', 'draggable', 'resizable', 'panel', 'tabs'];
function fileFor(name) {
    if (sub === 'src') {
        if (name === 'parser') return 'src/jquery.parser.js';
        if (name === 'easyloader') return 'src/easyloader.js';
        return `src/jquery.${name}.js`;
    }
    return name === 'parser' ? null : `plugins/jquery.${name}.js`;
}

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="t1" style="width:600px;height:200px"></div></body></html>',
    { runScripts: 'outside-only', pretendToBeVisual: true, url: 'http://localhost/' });
const { window } = dom;
function load(rel) {
    const p = path.join(ROOT, rel);
    if (!fs.existsSync(p)) return false;
    window.eval(fs.readFileSync(p, 'utf8'));
    return true;
}

const base = path.join(ROOT, verDir, sub);
let loaded = 0;
function tryLoad(name) {
    const rel = sub === 'src'
        ? path.join(verDir, name === 'parser' ? 'src/jquery.parser.js' : (name === 'panel' ? 'src/jquery.panel.js' : `src/jquery.${name}.js`))
        : path.join(verDir, `plugins/jquery.${name}.js`);
    if (load(rel.replace(/\\/g, '/'))) { loaded++; return true; }
    return false;
}

const out = [];
const $0 = (function () { return window.jQuery || window.$; });
try {
    load('dist/js/jquery-1.11.3.min.js');
    const $ = $0();
    // 部分旧版 easyui 依赖 $.browser（jQuery 1.9+ 已移除）
    if (!$ .browser) { $ .browser = { msie: false, version: 0 }; }

    ['parser', 'draggable', 'resizable', 'panel', 'tabs'].forEach(tryLoad);
    if (!$.fn || !$.fn.tabs) throw new Error('tabs 插件未加载成功（加载了 ' + loaded + ' 个依赖）');

    function check(name, actual, expect) {
        const ok = String(actual) === String(expect);
        out.push(`${ok ? '[PASS]' : '[FAIL]'} ${name}: "${actual}"${ok ? '' : ` (期望 "${expect}")`}`);
    }

    // 模拟语言包对 tabs 默认值的覆盖
    $.extend($.fn.tabs.defaults, { closeText: '关闭' });

    // 场景1：页面初始已有的页签（与截图一致：容器内已有 div）
    const $t = $('#t1');
    $t.append('<div title="病历文书" closable="true">A</div>');
    $t.append('<div title="诊断录入" closable="true">B</div>');
    $t.tabs({ closable: true });
    check('初始页签1 关闭', $t.find('li').eq(0).find('a.tabs-close').attr('aria-label'), '病历文书关闭');
    check('初始页签2 关闭', $t.find('li').eq(1).find('a.tabs-close').attr('aria-label'), '诊断录入关闭');

    // 场景2：动态 add（截图场景，最关键的验证点）
    $t.tabs('add', { title: '医嘱处理', closable: true, content: 'C' });
    const last = $t.find('li').last();
    check('动态add页签 关闭', last.find('a.tabs-close').attr('aria-label'), '医嘱处理关闭');
    check('动态add页签 role', last.find('a.tabs-close').attr('role'), 'button');

    // 场景3：update 改标题后标签是否刷新
    if ($.fn.tabs.methods && $.fn.tabs.methods.getTab) {
        $t.tabs('update', { tab: $t.tabs('getTab', 2), options: { title: '医嘱处理（新）' } });
        check('update改标题 关闭', $t.find('li').last().find('a.tabs-close').attr('aria-label'), '医嘱处理（新）关闭');
    } else {
        out.push('[SKIP] update 改标题（该版本无 getTab 方法）');
    }
} catch (e) {
    out.push('[ERROR] ' + e.message);
}

console.log(`目标: ${verDir} (${sub})  依赖加载: ${loaded}`);
console.log(out.join('\n'));
const fail = out.filter(l => l.startsWith('[FAIL]') || l.startsWith('[ERROR]')).length;
console.log(`\n结果: ${out.length - fail} 通过, ${fail} 失败`);
process.exit(fail ? 1 : 0);
