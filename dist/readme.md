[HISUI]: https://wanghc.github.io/hisui/hisui-0.1.0.rar "下载最新的HISUI库"
# 介绍
`HISUI`是一款前端组件类库。
提供`linkbutton`,`linkmenu`,`combo`,`datagrid`,`treegrid`,`popover`,`window`,`lookup`,`panel`,`layout`,`accordion`,`tab`等组件功能。
##### 点击[HISUI]下载最新的HISUI库
# 使用
### 在`HTML`界面引用`HISUI`
```html
<link rel="stylesheet" type="text/css" href="hisui/dist/css/hisui.css">
<script type="text/javascript" src="hisui/dist/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="hisui/dist/js/jquery.hisui.js"></script>
```
### 在`CSP`界面中引用`HISUI`
```html
<HISUI/>
```
### 代码
```html
<a class="hisui-linkbutton" data-options="iconCls:'icon-search'">查询</a>
```
或已有html代码`<a id="btn">查询</a>`,可在js代码中写入
```javascript
var sbtn = $HUI.linkbutton("#btn",{iconCls:'icon-search'});
sbtn.disable(); //禁用查询按钮
/*或 
$("#btn").linkbutton({iconCls:'icon-search'});
$("#btn").linkbutton("disable");
*/
```
点击[hisui]下载最新的HISUI库

# 更新日志 #
## 2018-10-17 ##
* `combobox`组件增加`rowStyle`配置项,可配置成`checkbox`
* `alert`、`confirm`、`prompt`左右键切换选中按钮
* `datetimebox`显示值时不显示时间bug修改
* IE下`combo`自动弹出bug修改

## 2018-10-11 ##
* 去掉 `tree`组件第一个根节点线条向上的虚线

## 2018-10-09 ##
* `datagrid`组件增加`setColumnTitle`方法
* `alert`、`confirm`、`prompt`的【确实】按钮支持空格键,【取消】按钮支持Esc键

## 2018-10-08 ##
* `combo`及子组件在firebox下中文即时查询bug修复

## 2018-09-29 ##
* `keywords`组件中`chapter`的`text`为''时显示问题
* `keywords`只用`section`显示
* `big`类型的`linkbutton`高度修改, `a`默认颜色修改

## 2018-09-27 ##
* 为`textarea`增加`.textbox`样式类,保证默认宽度
* 为`accordion`增加`.accordion-gray`样式类

## 2018-09-25 ##
* `datebox`支持t表示今天的快捷输入

## 2018-09-19 ##
* `combox`的setValues('')兼容

## 2018-09-17 ##
* `layout` 区域面板展开为蓝色，折叠后显示也为蓝色
* `layout` 折叠展开按钮样式修正，蓝色为白色按钮，灰色为黑色按钮
* `layout` 区域面板增加选项showCollapsedTitle，为true时，在折叠状态时显示标题


## 2018-09-17 ##
* `menu`样式修改,`padding`与`height`修改,`menu-no-icon`提供.
* `panel`样式对没有header的gray样式支持,bodyCls:'panel-header-gray'

## 2018-09-13 ##
* `datagrid`配置项`url`未配置时,一定不去远程加载数据。

## 2018-09-05 ##
* `tree`增加配置项`autoNodeHeight`,以实现formatter返回的html高度不定时，线条能正确显示

## 2018-08-31 ##
* 去除`alert`,`confirm`,`prompt`的红叉按钮

## 2018-08-27 ##
* `combobox`增加配置项defaultFilter,配置默认的filter的过滤规则

## 2018-08-23 ##
* `tabs`上增加按钮,`keywords`增加`clearAllSelected`方法

## 2018-08-22 ##
* 为`datagrid`的列号宽度是否自适应增加配置

## 2018-08-20 ##
* `datagrid`的悬浮样式与选中样式修改

## 2018-08-09 ##
* 修复`checkbox`和`radio` 组件在`onChecked`、`onUnchecked`和`onCheckChange` 调用`getValue`方法是改变状态前的值

## 2018-08-09 ##
* 增加图标

## 2018-08-03 ##
* 增加图标

## 2018-08-01 ##
* 修复： 蓝色`tabs`，标题在左侧时只能显示第一个 

## 2018-08-01 ##
* `lookup` 在load成功后，光标移动到输入框，且为第一行加上高亮颜色，上下键移动时的样式
* 修复：`lookup` 在重新初始化没效果的问题

## 2018-07-27 ##
* 修复scrollview插件勾选行Bug
* 增加灰色手风琴 

## 2018-07-24 ##
* 修复`combogrid` 在已经选择数据后，翻页，输入框变成原来的value值，而不是text值

## 2018-07-20 ##
* tabs增加tabs-keywords样式

## 2018-07-19 ##
* 增加列表操作图标`icon`
* 增加关键字列表`keywords`

## 2018-07-13 ##
* 增加部分`icon`

## 2018-07-06 ##
* 修改表格选中行样式
* 增加'门','急','住'图标

## 2018-07-04 ##
* 公共`ajax`方法支持后台返回值为对象，至前台则转成JSON
* 公共`ajax`方法支持`js`中数组传入

## 2018-07-03 ##
* 修复 `lookup` 组件在 `onSelect` 设置组件显示值 会被textField指定的冲掉的问题

## 2018-6-30 ##
* 输入框类组件增加placeholder属性，`combo`,`combobox`,`datebox`等

## 2018-06-28 ##
* 替换若干小图片
* `popover`组件样式修改
* `tabs`左右滚动箭头样式等修改
* `panel`增加`panel-header-white`样式,修改标题样式
* `switchbox`增加`gray`样式
* `treegrid`的勾选框样式修改
* `dialog`的`buttons`对应的样式与按钮位置修改

## 2018-06-27 ##
* `$.messager.popover`隐藏后自动销毁

## 2018-06-21 ##
* 可编辑`datagrid`,当数据被修改后,单元格增加红色三角标志

## 2018-06-21 ##
* 修改`$.messager.popover`样式
* 当前界面有CS版控件时,弹出hisui组件被遮盖问题--修改`panel`、`window`、`messager`的alert,confirm,prompt方法

## 2018-06-20 ##
* 增加`$.messager.popover`功能
* 增加小图标

## 2018-06-19 ##
* `dialog`组件增加`isTopZindex`属性，解决控件盖住窗口问题

## 2018-06-14 ##
* `lookup`组件，增加`onBeforeShowPanel`事件，`return fasle;`可阻止下拉面板展开

## 2018-06-04 ##
* 增加`icon-w-import`与`icon-w-export`小图标

## 2018-05-31 ##
* `datagrid`支持`icheckbox`,`switchbox`,`linkbutton`类编辑
* `popover`的标题背景色修改成`f0f0f0`
* `icon`中增加新的白色图标,蓝色按钮中使用白色图标以达到更佳效果

## 2018-05-25 ##
* `linkbutton`组件 增加属性`stopAllEventOnDisabled` 解决按钮禁用后，还是会触发jQuery绑定的点击事件问题

## 2018-05-23 ##
* `switchbox`组件的setValue方法增加入参`skipOnChange`
* `datagrid`组件增加`onBeforeSelect`,`onBeforeUnselect`,`onBeforeCheck`,`onBeforeUncheck`事件

## 2018-05-22 ##
* `combo`,`combobox`,`combogrid`增加`enterNullValueClear`配置项

## 2018-05-19 ##
* 增加数据列表滚动插件`datagrid-scrollview.js`例子编写

## 2018-05-17 ##
* `layout`布局组件增加点击展开配置项`clickExpand:true`

## 2018-05-16 ##
* 修改数据列表的翻页条及按钮在IE11兼容模式下显示问题

## 2018-5-10 ##
* 增加`lookup`组件功能

## 2018-5-4 ##
* 增加`popover`组件功能

## 2018-5-3 ##
* 修改DataGrid关于autoSizeColumn属性处理问题，隐藏列不再重计算列宽,提升速度。

## 2018-4-28 ##
* 灰色页签选中页签边框问题 tabs类 overflow: visible;

## 2018-4-25 ##
* treegrid 在load或reload时清掉（移除的被选中元素）在checkedRows中的记录   

## 2018-4-20 ##
* 增加r-label实施label右对齐且padding-right:10px
* textbox与vaildatebox及子组件获得焦点时，增加背景效果 

## 2018-4-19
* 之前，为实现filebox组件，放开了linkbuttton的事件阻止，导致原本用href="#" 的会有跳转行为  改为判断是否是filebox的button 是则不阻止，否则阻止

## 2018-4-18
* treegrid  "parentId":""   当做根节点

## 2018-4-13
* 实现filebox组件 依赖linkbutton
* datagrid 行编辑器editor text和validatebox类型样式调整

## 2018-3-20
* draggable droppable 组件代码 改为使用1.5的 原1.3.6的,在treegrid使用拖拽单双击很慢
* 在用gulp-uglify压缩js时，增加参数 ie8:true  否则ie8下会报错

## 2018-3-26
* 修复：treegrid 在结合treegrid-dnd.js 拖拽会报错   1.3.6还没有setEmptyMsg

## 2018-3-26
* combogrid 增加lazy属性，当lazy为true，且值为空时 不去请求数据，当第一次点击下拉按钮时调用keyHandler.query

## 2018-3-19
* 增加tabs li的height定义，在win10系统中IE11下访问tabs的宽度变高

## 2018-3-15
* 增加$HUI.combo
* tabs 当isBrandTabs为true时,鼠标放到第一页签时不改变样式，默认选中第二个页签

## 2018-3-8
* 修复switchbox的 isActive getValue 方法

## 2018-3-1
* linkbutton  hover颜色调整 增加hover-dark 宽度调整30px+文字+文字左右padding：15px   大图图标样式
* searchbox  按钮样式
* spinner  按钮样式
* datebox datetimebox 按钮样式
* combo 下拉按钮样式
* datetimebox中timespinner  宽高
* panel样式调整 圆角 关闭按钮 
* tabs 蓝色灰色 一系列样式调整修复  边框 hover样式 关闭按钮呢
* accordion 样式的调整 展开关闭按钮样式
* combo linkbutton searchbox 等 的禁用样式调整 
* datagrid toolbar中按钮显示样式  行编辑器支持datetimebox
* menubutton 增加menubutton-blue  menubutton-toolbar
* tree 行高  增加accordiontree样式

## 2018-1-30
* 为hisui-datagrid增加showPageList,showRefresh,displayMsg三个属性,控件翻页条显示
* 修复hisui-linkbutton增加width属性后，图标偏移问题

## 2018-1-17
* 修改了hisui-checkbox在大屏下显示不了勾选框问题

## 2018-1-11
* 修复了hisui-treegrid，仅在js内初始化hisui-treegrid时，点击勾选框报错bug

## 2018-1-10
* linkbutton---增加img配置项，可直接配置图标 

## 2018-1-8
* hisui内增加$.hisui.xxx方法
* hisui-treegrid增加checkbox功能，勾选事件，选中与取消选中方法

## 2017-12-29
* hisui-window增加isTopZindex配置项，可以让window在ocx或dll控件之上弹出

## 2017-12-26
* hisui-checkbo默认不选中

## 2017-12-25
* hisui-numberbox的高度调整
* hisui-timespinner样式调整

## 2017-12-21
* 修复了checkbox与radio的getValue方法取值报错的bug。