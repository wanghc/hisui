# 项目长期记忆

## hisui 前端组件库

- **项目路径**: `d:\workspace_iis\hisui-0.1.0`
- **性质**: 基于 jQuery + EasyUI 二次开发的前端 UI 组件库
- **构建工具**: Gulp（Less编译、JS压缩、CSS压缩）
- **源码目录**: `src/`（69个JS组件文件），`less/`（264个LESS样式文件）
- **输出目录**: `dist/`
- **文档目录**: `api/`（HTML格式的API文档）
- **组件列表**: datagrid、dialog、tree、form、combo系列、layout、tabs、datebox、pagination 等30+个组件
- **多主题**: lightblue、lite、pure 三套主题/版本

## 工作约定

- **临时分析文件统一放在 `.workbuddy/tmp/` 下**，不落地到项目根目录，避免污染 git 工作区。分析完成后主动清理。

## 构建与国际化（重要）

- **构建命令**：gulp 3.9.1 必须用 Node 11 跑（Node 22 会挂），且要清掉 NODE_OPTIONS：
  `NODE_OPTIONS= "C:/Program Files/nodejs/node.exe" node_modules/gulp/bin/gulp.js min-js zh_CN zh_TC bod`
  ⚠️ 2026-10 起系统 Node 已升到 v14（不再是 v11），gulp 会报 `primordials is not defined`。
  此时 CSS 改用 node 脚本复刻 `min-css-<theme>`（项目自带 less 2.7.3 + clean-css 3.4.28）；
  复刻要点：① gulp.src 对重复路径**去重**（lessArr 中 calendar/datebox 等重复，不去重会多出重复 CSS 段）
  ② 主题目录缺失的 less 文件（combogrid/numberspinner/timespinner/input.hover）静默跳过
  ③ clean-css 会把 `url(../css/images/x.png)` 重写为 `url(images/x.png)`。产物 LF、无 BOM、min 无结尾换行。
- `src/jquery.hisui.src.js`、`dist/js/jquery.hisui.js`、`dist/js/jquery.hisui.min.js` 都是 gulp concat **生成物**，改组件只改 `src/<组件>.js`，不要手改生成物。
- 语言包 `src/hisui-lang-{zh_CN,zh_TC,bod}.js` → `dist/js/locale/`（gulp 会把中文/藏文转成 \uXXXX）。

## 图标维护约定（汉字图标 / 炫彩图标）

- 汉字图标（16*16）是多风格兼容的：**同一 class 名**在 lite/lightblue/pure/vben 渲染为 CSS 汉字 `:before`，
  在默认风格渲染为 `dist/css/icons/<name>.png` 背景。
- 新增一个汉字图标需改（参照需求 5817354「增加优字图标」）：
  `less/{lite,lightblue,pure,vben}/icon.less`（共享基础样式选择器列表 + `.icon-priority` 后追加定义）、
  `less/icon.less` 的 `@dlist`（追加 `类名,png名` 对，炫彩风格生效）、
  `dist/css/icons/*.png`、`lite/icon/icon.html` 与 `api/icon/icon.html` 的 `chinCharicons` 数组、
  `dist/readme.md` 更新日志。lightblue/pure 的 demo 页历史不同步，可不动。
- `dist/css/*.css` 全部 gitignore，提交只含 less 源码 + png + readme，dist CSS 由部署端重编。

## 无障碍标签（aria-label）改造约定 [a11y]

- 图标按钮的无障碍文案统一走 **组件 defaults + 语言包覆盖**，命名：`collapseText/expandText/minimizeText/maximizeText/restoreText/closeText`（panel）、`scrollLeftText/scrollRightText/overflowBtnText`（tabs）、`arrowText/clearText`（combo）、`spinUpText/spinDownText`（spinner）、`searchText`、`clearText`（inputclearbtn）、`collapse*Text/expand*Text`（layout 按方向 8 个）。
- **关闭按钮标签 =【标题 + 关闭】**（如"业务消息列表关闭"），否则一屏多个 x 按钮读起来无法分辨归属。panel 由 `_refreshCloseA11yLabel()` 生成，setTitle 时同步刷新，标题为空退化为"关闭"；tabs 用 `opts.title + closeText`。
- **坑：派生组件的 defaults 是父组件加载时的快照**（window/dialog/datagrid ← panel；combobox/combogrid/datebox ← combo；numberspinner ← spinner）。语言包在组件加载之后执行，只改父组件 defaults 会导致派生组件仍是英文，**必须按族逐个覆盖**（现已在三个语言包末尾用 forEach 按族 $.extend）。
- panel 折叠↔展开、最大化↔还原 是同一个按钮切 class，状态切换处要同步改 aria-label。
- tabs 的 `a.tabs-inner` 是页签链接本身，**不能加 aria-label**（可访问名称应由-tabs-title 文本提供）；关闭按钮是 `a.tabs-close`。
- 自定义 tools（panel.tools）支持传 `text` 作为 aria-label。

## 组件加载与 lib/ 目录（排查经验）

- 页面可能**不加载 hisui 构建产物，而是加载 `lib/` 下的原生 EasyUI**（含 1.3.2 / 1.3.6 / 1.4.5 三套，各有 `plugins/`、`src/`、`jquery.easyui.min.js`）。判断依据：hisui 的 tabs.js 会给所有 `li` 加 `hisui-` 前缀，截图里 `<li class="tabs-selected">` 无该前缀即说明走的是原生 EasyUI。
- **`lib/` 在 `.gitignore` 中**，改动不进版本库、无法 git 还原（只能按 mtime 定位后手工回退）。**结论：不要再给 lib/ 打补丁**，需求回到 src/ 或部署端覆盖文件实现。
- **改 lib 下 EasyUI 前务必确认变量名**：`plugins/*.js` 与 `jquery.easyui.min.js` 是混淆代码，同名逻辑的变量名不同（如 tabs 的 options 变量在 plugins 版是 `_47`/`_55`/`_3d`，在 min 包是 `opts`）。用错会导致 `xxx is not defined` 运行时错误。

## 部署端覆盖件（his-mediway-iris）

- 仓库 `D:\his-mediway-iris` 中 `frontend/base/scripts/framework/` 与 `base/imedical/web/scripts/framework/` 是**同名的两份副本**（如 `easyui-1.3.6/jquery.tabs.js`），改动前逐字节相同，被各自目录的 csp 引用 → **改一处必须同步另一处**。
- 这类覆盖件在 `<HISUI>` 标签**之后**加载，会整体替换 `$.fn.<组件>` **及其 defaults**，导致 hisui 语言包注入的文案键丢失 → 覆盖件自己的 defaults 必须自带中文文案（不能依赖语言包）。
- 页签标题在页面上是 `$.hisui.getTrans(title)` 的结果，拼 aria-label 时也应走一次 getTrans（`getTrans` 对非字符串/含 HTML 的 key 原样返回，可安全调用）。
