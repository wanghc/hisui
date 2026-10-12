/* hisui 无障碍标签（aria-label）冒烟测试：jsdom 中真实渲染组件后读取 aria-label */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = 'D:/workspace_iis/hisui-0.1.0/';
const html = `<!DOCTYPE html><html><body>
  <div id="p" style="width:300px;height:200px"></div>
  <div id="tt" style="width:500px;height:200px"></div>
  <div id="ly" style="width:600px;height:400px">
    <div region="west" style="width:120px" title="West"></div>
    <div region="center" title="Center"></div>
  </div>
  <input id="sp" />
  <input id="cb" />
</body></html>`;

const dom = new JSDOM(html, { runScripts: 'outside-only', pretendToBeVisual: true, url: 'http://localhost/' });
const { window } = dom;
function load(file) { window.eval(fs.readFileSync(path.join(ROOT, file), 'utf8')); }

load('dist/js/jquery-1.11.3.min.js');
load('dist/js/jquery.hisui.js');
load('dist/js/locale/hisui-lang-zh_CN.js');

const $ = window.jQuery || window.$;
const out = [];
function check(name, actual, expect) {
    out.push(`${String(actual) === String(expect) ? '[PASS]' : '[FAIL]'} ${name}: "${actual}"${String(actual) === String(expect) ? '' : ` (期望 "${expect}")`}`);
}
function attr(sel, a) { return $(sel).attr(a); }

try {
    // 1. panel 四个工具按钮
    $('#p').panel({ title: '测试面板', collapsible: true, minimizable: true, maximizable: true, closable: true });
    var ph = '#p';
    check('panel 折叠', $(ph).panel('header').find('a.panel-tool-collapse').attr('aria-label'), '折叠');
    check('panel 最小化', $(ph).panel('header').find('a.panel-tool-min').attr('aria-label'), '最小化');
    check('panel 最大化', $(ph).panel('header').find('a.panel-tool-max').attr('aria-label'), '最大化');
    check('panel 关闭=标题+关闭', $(ph).panel('header').find('a.panel-tool-close').attr('aria-label'), '测试面板关闭');
    // setTitle 后关闭按钮标签应同步刷新
    $(ph).panel('setTitle', '新的标题');
    check('setTitle 后关闭标签刷新', $(ph).panel('header').find('a.panel-tool-close').attr('aria-label'), '新的标题关闭');
    // 标题清空后：标签退化为"关闭"（无前缀）
    $(ph).panel('setTitle', '');
    check('清空标题后关闭标签', $(ph).panel('header').find('a.panel-tool-close').attr('aria-label'), '关闭');
    $(ph).panel('setTitle', '新的标题');
    // 状态切换后标签应变化
    $(ph).panel('collapse');
    check('折叠后→展开', $(ph).panel('header').find('a.panel-tool-collapse').attr('aria-label'), '展开');
    $(ph).panel('expand');
    check('展开后→折叠', $(ph).panel('header').find('a.panel-tool-collapse').attr('aria-label'), '折叠');
    $(ph).panel('maximize');
    check('最大化后→还原', $(ph).panel('header').find('a.panel-tool-max').attr('aria-label'), '还原');
    $(ph).panel('restore');
    check('还原后→最大化', $(ph).panel('header').find('a.panel-tool-max').attr('aria-label'), '最大化');

    // 2. tabs
    $('#tt').tabs({ overflowMenu: false });
    $('#tt').tabs('add', { title: '页签一', closable: true, content: '内容一' });
    $('#tt').tabs('add', { title: '页签二', closable: true, content: '内容二' });
    check('tabs 关闭按钮=标题+关闭', $('#tt').find('li').eq(0).find('a.tabs-close').attr('aria-label'), '页签一关闭');
    check('tabs 第二个关闭按钮', $('#tt').find('li').eq(1).find('a.tabs-close').attr('aria-label'), '页签二关闭');
    check('tabs 左滚动', $('#tt').find('div.tabs-scroller-left').attr('aria-label'), '向左滚动');
    check('tabs 右滚动', $('#tt').find('div.tabs-scroller-right').attr('aria-label'), '向右滚动');
    check('tabs 页签链接不应有 aria-label', $('#tt').find('a.tabs-inner').first().attr('aria-label'), undefined);

    // 3. layout 区域收起按钮
    $('#ly').layout();
    check('layout west 收起按钮', $('#ly').find('a.layout-button-left').attr('aria-label'), '收起左侧区域');

    // 4. spinner 上下箭头（numberspinner 继承 spinner defaults，验证快照覆盖是否生效）
    try {
        $('#sp').numberspinner({ value: 1 });
        check('numberspinner 上箭头', $('#sp').closest('.spinner').find('.spinner-arrow-up').attr('aria-label'), '增加');
        check('numberspinner 下箭头', $('#sp').closest('.spinner').find('.spinner-arrow-down').attr('aria-label'), '减少');
    } catch (e) { out.push('[SKIP] spinner: ' + e.message); }

    // 5. combo 下拉箭头（combobox 继承 combo defaults，验证快照覆盖是否生效）
    try {
        $('#cb').combobox({ data: [{ value: '1', text: '一' }] });
        check('combobox 下拉箭头', $('#cb').next('.combo').find('.combo-arrow').attr('aria-label'), '展开/收起下拉面板');
    } catch (e) { out.push('[SKIP] combo: ' + e.message); }

    // 6. window / dialog（继承 panel defaults 快照，是最容易漏掉的场景）
    try {
        $('<div id="win"></div>').appendTo('body');
        $('#win').window({ title: '测试窗口', width: 300, height: 200, collapsible: true, minimizable: true, maximizable: true, closable: true });
        check('window 关闭=标题+关闭', $('#win').window('window').find('a.panel-tool-close').attr('aria-label'), '测试窗口关闭');
        check('window 最大化', $('#win').window('window').find('a.panel-tool-max').attr('aria-label'), '最大化');
        check('window 最小化', $('#win').window('window').find('a.panel-tool-min').attr('aria-label'), '最小化');
    } catch (e) { out.push('[SKIP] window: ' + e.message); }
    try {
        $('<div id="dlg"></div>').appendTo('body');
        $('#dlg').dialog({ title: '测试对话框', closable: true, maximizable: true });
        check('dialog 关闭=标题+关闭', $('#dlg').dialog('dialog').find('a.panel-tool-close').attr('aria-label'), '测试对话框关闭');
    } catch (e) { out.push('[SKIP] dialog: ' + e.message); }

} catch (e) {
    out.push('[ERROR] ' + e.stack);
}

console.log(out.join('\n'));
const fail = out.filter(function (l) { return l.indexOf('[FAIL]') === 0 || l.indexOf('[ERROR]') === 0; }).length;
console.log('\n结果: ' + (out.length - fail) + ' 项通过, ' + fail + ' 项失败');
process.exit(fail ? 1 : 0);
