/* his-mediway-iris 部署版 jquery.tabs.js 无障碍标签冒烟测试（jsdom 真实渲染） */
const fs = require('fs');
const { JSDOM } = require('jsdom');

const ROOT = 'D:/his-mediway-iris/';
const html = `<!DOCTYPE html><html><body>
  <div id="tt" style="width:500px;height:200px"></div>
  <div id="tt2" style="width:500px;height:200px"></div>
</body></html>`;

const dom = new JSDOM(html, { runScripts: 'outside-only', pretendToBeVisual: true, url: 'http://localhost/' });
const { window } = dom;
function load(file) { window.eval(fs.readFileSync(ROOT + file, 'utf8')); }

// 模拟真实页面加载顺序：jQuery -> hisui -> 语言包 -> framework 覆盖版 tabs
load('frontend/base/scripts_lib/hisui-0.1.0/dist/js/jquery-1.11.3.min.js');
load('frontend/base/scripts_lib/hisui-0.1.0/dist/js/jquery.hisui.js');
load('frontend/base/scripts_lib/hisui-0.1.0/dist/js/locale/hisui-lang-zh_CN.js');
load('frontend/base/scripts/framework/easyui-1.3.6/jquery.tabs.js');

const $ = window.jQuery || window.$;
const out = [];
let fail = 0;
function check(name, actual, expect) {
    const ok = String(actual) === String(expect);
    if (!ok) fail++;
    out.push(`${ok ? '[PASS]' : '[FAIL]'} ${name}: "${actual}"${ok ? '' : ` (期望 "${expect}")`}`);
}

try {
    // 1. 普通模式：两个可关闭页签
    $('#tt').tabs({ overflowMenu: false });
    $('#tt').tabs('add', { title: '业务消息列表', closable: true, content: '内容一' });
    $('#tt').tabs('add', { title: '患者信息', closable: true, content: '内容二' });
    $('#tt').tabs('add', { title: '不可关闭页签', closable: false, content: '内容三' });

    var closes = $('#tt').find('ul.tabs li a.tabs-close');
    check('页签1 关闭标签 = 标题+关闭', closes.eq(0).attr('aria-label'), '业务消息列表关闭');
    check('页签2 关闭标签 = 标题+关闭', closes.eq(1).attr('aria-label'), '患者信息关闭');
    check('关闭按钮 role', closes.eq(0).attr('role'), 'button');
    check('不可关闭页签无关闭按钮', $('#tt').find('ul.tabs li').eq(2).find('a.tabs-close').length, 0);

    // 2. 改标题后关闭按钮标签应同步刷新
    var tab0 = $('#tt').tabs('getTab', 0);
    $('#tt').tabs('update', { tab: tab0, options: { title: '业务消息列表(新)' } });
    check('改标题后关闭标签刷新', $('#tt').find('ul.tabs li a.tabs-close').eq(0).attr('aria-label'), '业务消息列表(新)关闭');

    // 3. 左右滚动箭头
    check('左滚动箭头标签', $('#tt').find('div.tabs-scroller-left').attr('aria-label'), '向左滚动');
    check('右滚动箭头标签', $('#tt').find('div.tabs-scroller-right').attr('aria-label'), '向右滚动');
    check('左滚动箭头 role', $('#tt').find('div.tabs-scroller-left').attr('role'), 'button');

    // 4. 溢出菜单模式：下拉按钮
    $('#tt2').tabs({ overflowMenu: true });
    $('#tt2').tabs('add', { title: '溢出页签', closable: true, content: 'x' });
    check('溢出菜单按钮标签', $('#tt2').find('a.tabs-overflow-btn-icon').attr('aria-label'), '更多页签');
    check('溢出菜单按钮 role', $('#tt2').find('a.tabs-overflow-btn-icon').attr('role'), 'button');

    // 5. 溢出菜单里的关闭按钮（需 li 被 display:none，jsdom 下手动隐藏后刷新菜单）
    // 溢出菜单内容在按钮点击时才重建，这里模拟点击
    $('#tt2').find('ul.tabs li').hide();
    try { $('#tt2').find('a.tabs-overflow-btn-icon').trigger('click'); } catch (e) { out.push('[WARN] 触发溢出菜单点击异常: ' + e); }
    var menuClose = $('div.tabs-overflow-menu .tabs-overflow-menu-close');
    check('溢出菜单关闭按钮标签', menuClose.length ? menuClose.eq(0).attr('aria-label') : '(未生成)', '溢出页签关闭');

    // 6. 全量扫描：页面内不应出现 undefined / null 拼进的标签
    var bad = [];
    $('[aria-label]').each(function () {
        var v = $(this).attr('aria-label') || '';
        if (v.indexOf('undefined') >= 0 || v.indexOf('null') >= 0) { bad.push(v); }
    });
    check('无 undefined/null 污染标签', bad.length, 0);
} catch (e) {
    out.push('[ERROR] ' + (e && e.stack || e));
    fail++;
}

console.log(out.join('\n'));
console.log('\n合计 ' + out.length + ' 项，失败 ' + fail + ' 项');
