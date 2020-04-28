[HISUI]: https://hisui.cn/tool/gen/hisui/download "下载最新的HISUI库"
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
或
```html
<HISUI debugger=1/>
```
### 按钮对应代码
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
点击[HISUI]下载最新的HISUI库

# 更新日志 #
## 2020-04-28 ##
* `progress`只触发一次window打开，处理病历编辑器覆盖问题


## 2020-04-27 ##
* `datebox`中按钮加onclick属性，兼容血透调用病历界面，解决弹出空白界面问题
* `comboq`记录当前元素的state , 解决在医嘱录入界面放大镜隐藏时找不到state问题，和模态窗口有关

## 2020-04-26 ##
* 解决当iframe框架的宽度不断缩短时，`popover`的内容会换行的问题
* 加上对`popover`中对fixPopoverWidth函数的说明
* 解决`popover`中fixPopoverWidth函数的一个bug
* 不对<xx/>标签翻译
* 对validatebox系的placeholder翻译键采集

## 2020-04-25 ##
* 解决`radio`重复初始化导致翻译无效

## 2020-04-22 ##
* 国际化支持
* `popover`自动改变zIndex
* `keywords`方法增加jq对象存在与否判断
* 增加英文翻译

## 2020-04-20 ##
* 整理lang文件翻译

## 2020-04-17 ##
* `lookupq`看不到周六问题
* 把一个16*16的图标移到16*16的图标应在的位置

## 2020-04-16 ##
* 在json.html中增加对ext.util.JsonObject.cls中Put方法的说明

## 2020-04-14 ##
* 解决`combobox`下拉多选框影响其它输入框按回删键问题

## 2020-04-11 ##
* `panel`,`window`只有IE下isTopZindex才插入iframe
* 解决`popover`与`window`覆盖问题
* 统一处理IE下回退键问题

## 2020-04-08 ##
* 增加10个大图标
* 有1个大图标无法提交，改了名字后重新提交

## 2020-04-07 ##
* `lookup`回车或点击按钮强制检索

## 2020-04-03 ##
* `lookup`有`selectRowRender`配置时才监听`onHighlightRow`
* panel-card的标题覆盖列表问题

## 2020-03-31 ##
* Chrome下覆盖病历不再绑定ID

## 2020-03-27 ##
* 处理覆盖问题，逻辑加固，跨域问题处理

## 2020-03-26 ##
* 对于Chrome下NPAPI插件的覆盖问题处理移置`panel`

## 2020-03-25 ##
* 在IE下处理isTopZindex不能隐藏NPAPI插件
* `panel`的card类型的覆盖问题调整

## 2020-03-23 ##
* 修复`window`.isTopZindex不能覆盖NPAPI插件问题

## 2020-03-12 ##
* 去除百分比支持,影响panel及popover取宽高

## 2020-03-11 ##
* `comboq`系组件弹出位置适应修改 
* `datagrid`对>号处理逻辑修复
* parser宽高时要通过入参判断,不能解析所有宽高属性

## 2020-03-08 ##
* `combobox`获得值方法修改,逻辑保持以前一致,解决datagrid编辑内包含combobox时，onChange事件触发问题
* `tabs`表头在360浏览器下tab有横向滚动问题

## 2020-02-26 ##
* `datebox`验证dtformat=DMY格式

## 2020-02-19 ##
* `datagrid`支持lookup编辑

## 2020-02-18 ##
* `lookup`的`minQueryLen`属性非0时，在放大镜内回车弹出的翻页条上显示共10行问题

## 2020-02-17 ##
* `lookup`在textbox修饰下长度与原保持一致 
* `checkbox`生成的代码有undefined类问题
* 修复`datebox`对required不生效问题

## 2020-02-14 ##
* 弹出层z-index设置
* `lookup`有限支持`jobj.lookup('panel').panel("resize")`方法
* `comboq`禁用autocomplete功能
* `lookup`支持按数字选行, 默认增加行号

## 2020-2-13 ##
* `dateboxq`重写,继承自`comboq`
* `numberbox`如果定义validType为字符串时报错修复
* 修复`triggerbox`鼠标`hover`与`focus`状态下，图标背景色问题

## 2020-2-12 ##
* `combobox`组件setValue("")时，导致vv数组值为[""]问题,协同需求号:1194563
* 增加`comboq`组件
* 重写`lookup`组件，继承于`comboq`

## 2020-2-11 ##
* `popover`增加setContent方法，以及解决为一个已经绑定了popover的元素再次绑定一个新的popover时内容没有改变的bug

## 2020-1-21 ##
* `numberbox`增加min与max检测值且提示功能
* `panel`的width支持百分比

## 2020-1-20 ##
* `checkbox`增加width处理,className处理

## 2020-01-19 ##
* `validatebox`增加idcard,mobilephone二种校验类型

## 2020-01-14 ##
* `popover`的`title`与`websys.css`中h3冲突处理

## 2020-01-13 ##
* 修复`datagrid`，点击`checkbox`在事件`onBeforeCheck`与`onBeforeUncheck`事件返回了`false`，但是显示上的勾选状态变了的bug

## 2020-01-07 ##
* 增加`select.textbox`样式定义，使与`input.textbox`得到的`combobox`一样宽
* `dateboxq`输入框增加`comboq`样式,为了统一q系列宽度
* `dateboxq`与`datetimeboxq`在IE8下图标位置显示处理

## 2019-12-30 ##
* `panel`的visible查找修改
* 为`dateboxq`增加disable与enable方法
* 解决`datagrid-scrollview`插件多次初始化导致不能触发onLoadSuccess事件问题

## 2019-12-26 ##
* `messager`中的`prompt`框中输入框加10px的左内间距
* `timespinner`中的面板标题部分图标改为icon-paper，输入框加2px圆角值
* `panel`中灰色系面板中的大面板标题部分文字字号大小设为16px

## 2019-12-25 ##
* `dateboxq`,`datetimeboxq`位置自动适应

## 2019-12-23
* `layout`的面板`header`的上下paddding改为4px 使整体高度为36px(含边框)
* `menubutton`的`menubutton-blue`的箭头图标改为白色
* `triggerbox`与`filebox`的图标支持透明背景的样式 
* `panel`的默认背景色改为`#509de1`,与边框颜色一致
* `lookup`,`triggerbox`,`filebox`,`spinner`,`searchbox`都加上2px的圆角
* `datetimebox`功能实现

## 2019-12-21 
* `tabs`配置项`border:false`时，页签头外部边框还存在问题
* `switchbox`开关关闭时左侧有绿色线问题
* `radio`在`disabled`状态下禁用点击
* `combobox`点击全局按钮,只选中当前可见元素
* `datagrid`数据中只包含<或只包含>时才转义，formatter不转义

## 2019-12-20 ##
* `datagrid`中数据json中有<与>进行转义

## 2019-12-17 ##
* 为`dateboxq`增加calendar方法，minDate,maxDate配置项
* `datebox`在配置minDate与maxDate时提示问题

## 2019-12-12 ##
* 解决`tree`选中大节点时背景色变黄问题. 
* 增加`layoutq`新组件,新五方布局
* 增加`dateboxq`新组件
* `datebox`增加allParse配置项
* `panel`中jquery关于visible选择器改成原生


## 2019-11-29 ##
* `lookup`在展开面板时，把当前元素jq对象绑定到grid的`options.lookup`上，可通过`grid.datagrid('options').lookup`获取到当前`lookup`的jq对象

## 2019-11-27 ##
* 增加5个白色图标

## 2019-11-26 ##
* `datebox`增加`minDate`,`maxDate`属性

## 2019-11-25 ##
* `radio`增加`required`选项.默认false为可取消选中


## 2019-11-18 ##
* 解决消息框`messager`的提示内容为英文且过长时，超出消息框的提示内容没有显示的bug

## 2019-11-10 ##
* `layout`的东南西北四区域中包含layout时，不能自适应问题

## 2019-11-05 ##
* 为`checkbox`与`radio`增加boxPosition属性

## 2019-11-01 ##
* 增加32个小图标

## 2019-10-31 ##
* 修改对当`tree`的一行元素的文字长度超过了父元素的宽度时，该行被选中后超出的文字没有底色的bug的解决方法
* 为`checkbox`增加ifChecked,ifUnchecked,ifToggled三个事件，兼容老版接口-有某些产品组使用
* 为`tabs`增加tabs-gray-btm样式

## 2019-10-29 ##
* 修改`tree`的一行描述过长时，选中该行后文字底色显示不全的bug

## 2019-10-28 ##
* 修改`datagrid`、`filebox`、`searchbox`、`triggerbox`的边框颜色为新版配色

## 2019-10-24 ##
* messager不再支持$g

## 2019-10-23 ##
* 增加5个大图标

## 2019-10-22 ##
* 解决选中`combobox`某行后再取消选中时，获取的值是undefined的bug
* 解决`popover`的cache属性是false时，重建了popover后内容没有重建的bug

## 2019-10-21 ##
* 修复能把`panel`,`window`,`dialog`拖动到小于(0,0)的位置

## 2019-10-19 ##
* 修改gulp生成,先生成调试js,再生成min.js
* 优化`datagrid`加载速度. IE11下200行20列1-2秒加载

## 2019-10-15 ##
* 解压缩jquery.hisui.js

## 2019-10-15 ##
* 解决`combogrid`使用回车键选中下拉框数据时，会触发两次onSelect事件的bug

## 2019-10-14 ##
* 默认隐藏js和html代码

## 2019-10-10 ##
* 增加12个小图标

## 2019-09-24 ##
* 解决`datagrid`编辑行时，偶尔出现空白行的bug

## 2019-09-24 ##
* textarea,input,`validatebox`线框与宽度修改 

## 2019-09-23 ##
* 优化`combo`速度导致`combogrid`点击下拉箭头不能出来数据

## 2019-09-16 ##
* `combo`组件在init时不调用panel的resize方法，优化速度20ms
* api界面显示prettyprint速度优化

## 2019-09-10 ##
* 增加工具方法`$.hisui.debounce`,实现防抖
* datagrid增加配置项`clickDelay`,用于解决`lookup`快速多次点击行，会触发panel下面元素的点击

## 2019-09-04 ##
* 增加5个大图标

## 2019-09-02 ##
* `validatebox`支持disabled属性及setDisabled方法

## 2019-08-30 ##
* `datagrid`支持onColumnsLoad事件

## 2019-08-29 ##
* `datagrid`支持className与queryName名来生成columns，以便支持自定义列属性

## 2019-08-28 ##
* `checkbox`与`radio` 在初始化之后通过$(selector).plugName({checked:true})方式修改值会导致组件不能使用
* `radio`允许使用$(selector).radio('setValue',false),使其变成不勾选状态
* `checkbox`与`radio` 允许自己使用`<label for='id'>text</label>`方式去去控制勾选状态
* `lookup`双击行时，会选中弹出层后面元素。
* 增加27个图标

## 2019-08-21 ##
* `checkbox`在disabled时也可以setValue
* 合并源代码，增加可读性

## 2019-08-19 ##
* `menu`与`menubutton`支持`isTopZindex`属性
* `lookup`边框色修改
* `checkbox`事件onChecked与onUnchecked入参值问题
* `messager`组件下的方法原生支持$g翻译

## 2019-08-11 ##
* `checkbox`与`radio`重写,支持IE6+

## 2019-08-10 ##
* `linkbutton`增加红黄绿三种按钮
* `combox`下拉边框色修改
* `spinner`边框色修改

## 2019-07-17 ##
* `lookup`修复panelWidth不生效的问题
* `lookup`默认panelWidth改为350而不是和输入框对齐

## 2019-07-12 ##
* `combobox`进行全匹配查询后，进入onSelect后，些时组件value存的是text问题修改。如骨科

## 2019-07-11 ##
* `combo`,`combobox`,`datebox`,`spinner`,`lookup`,`searchbox`等输入框样式轻淡化

## 2019-07-05 ##
* `datebox`增加validParams属性
* `timebox`增加对时间识别,如15回车转成15:00

## 2019-06-21 ##
* `datebox`与`datetimebox`bug修改,光标离开输入框时默认上了日期问题,`datetimebox`不能修改time问题

## 2019-06-06 ##
* 修复`combogrid` $(selector).combogrid('setValue','').combogrid('getValue')得到的是undefined而不是空字符串

## 2019-06-06 ##
* `datebox`的doBlur算法修改

## 2019-06-05 ##
* `datebox`转成可见源代码
* `datebox`回车与焦点离开时,检查日期格式有效格式为:20190101,2019-01-01,2019-1-1
* `datebox`对t-n与t+n算法重实现

## 2019-06-03 ##
* 增加小图标`icon-paper_ques`,`icon-injector_water`,`icon-alert_pen`,`icon-board_alert`,`icon-paper_key`,`icon-doctor_green_pen`,`icon-paper_group`
* 增加小图标`icon-minus`,`icon-alarm`

## 2019-05-27 ##
* `timespinner`数字转换时间算法修改
* `spinner`开放keyHandler-up,down,enter事件实现
* `timespinner`的up,down,enter按键的实现

## 2019-05-24 ##
* `loopup`增加`selectRowRender`支持
* `datagrid`增加`onHighlightRow`事件

## 2019-05-20 ##
* 增加小图标样式`icon-skip-no` 

## 2019-05-19 ##
* 修改`window`与`dialog`的标题边框色
* 拆分js文件,修改功能更方便
* 修改`datagrid`在编辑结束后getChecked方法获取值不正确的问题

## 2019-05-16 ##
* 重复加载js后,`keywords`组件点击事件重复绑定
* `keywords`的事件onSelect,onUnselect问题
* `keywords`点击第一层元素时,拿到的id不正确

## 2019-05-10 ##
* `datagrid`增加btoolbar配置

## 2019-04-18 
* `numberbox`在监听keyup事件内取值时，拿到的是上一次输入框的值

## 2019-04-17
* 修复`checkbox`通过$(selector).radio('setValue',true)设置值会报错问题(不推荐此种错误用法，2019-04-04更新导致)

## 2019-04-15
* 修复`checkbox`和`radio`多次调用初始化方法时，通过$.data(ele,name,data)缓存的数据丢失，进而依赖此数据的方法会报错如`options`方法

## 2019-04-09
* `spinner`类组件左边距调整

## 2019-04-04
* 修复`datagrid`列设置为`align:'right'`时列头与内容不对齐问题
* 增加`icon-pat-info`小图标
* 修复`checkbox`和`radio` 当实际值和样式不一致时 调用check,uncheck,toggle,setValue没效果的问题
* `checkbox`和`radio` 增加clear和reset方法
* `form`的clear与reset方法 支持对`checkbox`和`radio`操作了

## 2019-03-26
* 修复多次调用`spinner`初始化方法会导致元素不断变短问题

## 2019-03-22 ##
* 修复`combobox`中输入qd后,鼠标选择查询出的第一个Qd行,仍显示为qd

## 2019-03-13 ##
* `datagrid-scrollview`修复远程数据时选中一行，滚动后选中行错乱问题

## 2019-02-18 ##
* `combobox`增加allowNull配置

## 2019-02-01 ##
* `accordion`为gray样式时最后一个面板显示差一个px问题

## 2019-01-26 ##
* `combobox`增加`forceValidValue`配置项

## 2019-01-21 ##
* 修复`combobox`调用loadData后会出现多个全选按钮bug

## 2019-01-21 ##
* 为`combobox`增加`allSelectButtonPosition`配置项 
* 为`combobox`增加`onAllSelectClick`事件

## 2019-01-18 ##
* 修复cm定义showTip配置项后,第一次鼠标划过时不显示提示问题

## 2019-01-17 ##
* 修复`combobox`配置`blurValidValue`属性后,查询再选不中行问题

## 2019-01-08 ##
* `combobox`,`combogrid`的`blurValidValue`配置项启作用后,空字符作条件查询一次

## 2019-01-04 ##
* `lookup`组件的title属性不再显示到Grid的标题

## 2019-01-03 ##
* 增加`triggerbox`用于定义按钮图标的触发组件
* 增加`timespinner`必填提示为英文问题
* 固定`spinner`与`triggerbox`组件的宽度

## 2018-12-27 ##
* `$.messager.alert`增加success支持
* `combo`定制图标

## 2018-12-26 ##
* `combobox`与`combogird`增加`blurValidValue`配置项

## 2018-12-20 ##
* 处理`datagrid`列较多且数据为空时,不显示滚动条问题

## 2018-12-10 ##
* `combobox`定义成`rowStyle`:`'checkbox'`时样式问题

## 2018-12-06 ##
* `validatebox`增加v-align:middle与`linkbutton`与`lookup`横向对齐 

## 2018-12-05 ##
* `message.popover`定义style:{width:500}后,关闭按钮显示问题

## 2018-11-29 ##
* `datagrid`的columns中field增加showTip与tipWidth属性

## 2018-11-22 ##
* .textbox的宽度设计成148px
* combogrid的高度设置为30px,解决combogird与combobox的高度不一致问题 
* 增加icon

## 2018-11-20 ##
* textarea.textbox的width固定153px,对齐input

## 2018-11-18 ##
* `datagrid`是否显示数据修改后左上角红色三角型(`showChangedStyle`)

## 2018-11-14 ##
* 解决IE8下工具栏按钮宽度显示成整行问题

## 2018-11-07 ##
* 下拉框当输入骨科时不触发onSelect事件,输入骨后再选择骨科会触发onSelect事件问题


## 2018-10-29 ##
* `layout`的fit属性,对于父是body的margin:10px的特殊处理。
* `panel`如果放在layout中，关闭按钮的hover样式不是红色，修正为红色

## 2018-10-24 ##
* `panel`的头样式修改
* `dialog`的按钮间隔修改
* 在body中使用`layout`时,padding显示问题

## 2018-10-22 ##
* `alert`,`confirm`,`prompt`弹出提示多行显示对齐
* `messager.popover`显示被mark覆盖问题

## 2018-10-18 ##
* IE下输入框中placeholder显示样式修改
* `validatebox`,`combo`及子组件支持`placeholder`属性

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