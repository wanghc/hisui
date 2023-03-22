[HISUI]: http://hisui.cn "下载最新的HISUI库"
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
<HISUI debugger=1 version="lite" css="myself.css"/>
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

## 2023-03-22
- 增加`menutree`组件

## 2023-03-20
- `comboq`系列组件当面板showPanel返回false时，不进行查询

## 2023-03-17
- `filebox`组件方法`files`支持IE9 [3355921]

## 2023-03-13
- 极简tabs样式选中底色修改

## 2023-03-09
- zh_CN翻译中的中文句号转成unicode

## 2023-02-28
- 炫彩`linkbutton`plain:true时,图标与间距不够问题 [3172360] :lipstick:

## 2023-02-23
- `treegrid`兼容hos格式的JSON数据 [2958194] :sparkles:
```js
// 老的JSON格式
{rows:[{},{}],curPage:1,total:1}
// 增加兼容的JSON格式,多了一层data
{code:200,data:{rows:[],curPage:1,total:1}}
```
- 炫彩风格下hstep节点与节点文字居中对齐 :lipstick:


## 2023-02-17
- 修改checkbox与radio兼容IE9后，在其它浏览器下的报错处理
- `timespinner`增加时分秒步调配置项 [3277150]

## 2023-02-16
- 极简版`tab`实现左右显示页签 [3135923] :sparkles:
- 增加二个图标 [3264739] :lipstick:
- 增加tabs-system样式 [3135923] :lipstick:
- 修改`accordion`的标题样式 [2940154] :lipstick:

## 2023-02-15
- 炫彩版与极简版`datagrid`的页码输入框在选中时增加对应背景 [3241509] [3241479] :lipstick:
- 更新极简版tree_icons.png图片[3156120] :lipstick:
- 炫彩版`tabs-gray-btm`增加色值为ccc的下边框 [3173471] [3195938] :lipstick:
- 极简`vstep`不同状态节点的文字颜色修改 [2941768] :lipstick:

## 2023-02-14
- `layout`东西二个方位收起后,显示的标题没有支持国际化问题 [3202370] :bug:
- `datagrid`双击弹出的列定义界面增加MWToken :bug:
- icon图标close的483修改成480

## 2023-02-09
- 增加图标 [3251140]
- `checkbox`与`radio`在IE9下显示异常问题修复 [3249696] [3249706] :bug:

## 2023-02-08
- `datagrid`的`getChecked`方法获得跨页勾中的数据，但`uncheckAll`只处理当前页数据,增加isAllPage入参 [3243197] :bug:
- 增加图标 [3238413],[3251541]

## 2023-02-03
- 极简下的`tabs`的brand页签不让显示图标 :lipstick:

## 2023-01-30
- 极简大按钮高度保持与炫彩大按钮一样 [3225360] :lipstick:

## 2023-01-18
- 带图标的极简版手风琴标题左侧间距修改(以前只是不显示图标,未处理间距) [3118440] :lipstick:

## 2023-01-16
- 水平步骤图节点选中样式修改 [2777618] :sparkles:
- 纵向步骤图节点选中样式修改 [2777624] :sparkles:
- 水平步骤图滑动到下一节点时,下面字体向上偏移3px问题修改 :sparkles:

## 2023-01-15
- 手风琴展开状态底部边框遮盖问题 [2777670] :sparkles:

## 2023-01-12
- `lookup`配置项panelWidth小于400，panelHeightFix为true时，会出现纵向滚动条问题修复 [2942812] :sparkles:

## 2023-01-08
- 炫彩-色图就增加`icon-w-camera`小图标 [3188653]
- 炫彩-极简增加7个黑色线条小图标 [3180400]

## 2023-01-07
- 炫彩版增加icon-sound图标 [3181195]
- 炫彩-极简增加点红评与绿评小图标 [3162854]

## 2023-01-05
- 极简模式下,`datagrid`组件左竖线去除,解决表格列宽多1px问题

## 2023-01-03
- 极简模式下，医为浏览器中的大图标中的图标没有居中 [3169718] :bug:

## 2022-12-23
- 增加消息状态相关图标

## 2022-12-19
- `switchbox`字数不对称时显示异常 [3149355] :bug:

## 2022-12-15
- `tabs`的页签总长度从5000修改到50000 [3146468] :bug:

## 2022-12-12
- 修改极简风格下tabs选中样式 [3135923] :lipstick:

## 2022-12-14  
- 修复自适应面板会出现滚动条问题

## 2022-12-09
- 存在多个相关id的病历编辑器时,会覆盖弹出div问题(扩展myid) :bug:
- 其它色系按钮的禁用样式改成和普通蓝色按钮的禁用样式一致，即不同色系的按钮禁用样式一致。
- 用于`dialog`内容区的`panel-body`去除圆角样式，以修复用在dialog中的模态框遮罩左上角和右上角有白色显示。

## 2022-12-07
- 解决与富文本编辑器的冲突(在文本编辑器内使用backspace按键不能删除问题处理) [3034765]
- 开启document.designMode功能后,使用backspace键不能删除问题处理 [3133203]

## 2022-12-06
- HISUI极简版tree在定义节点iconCls后依然会显示默认图标,导致图标重叠 [3127716]

## 2022-12-05
- 增加布局46分区大图标 [3083134]
- 增加布局82,28分区大图标 [3122106]

## 2022-12-02
- 极简filebox小图标不显示
- 炫彩layout布局样式修改 
- 炫彩`tabs-gray-btm`在指定tabheight后,关闭按钮可以自动居中 
- 极简`accordion`的图标居中 [2941765] :lipstick:

## 2022-11-30
- 极简版`icon`增加icon-ca图标 [3007754]
- 极简与炫彩都增加11个图标 [3082967]
- 快速组件高度修改成28px [2942041]
- 极简风格下编辑框四周留1px间距 [2942041]
- 极简表格部分面板标题与表头之间间距应为2px [2988534] :lipstick:
- 极简布局-水平步骤-不同状态样式修改 [2941767] :lipstick:

## 2022-11-29
- `datagrid`编辑格式样式修改 [2942041] :lipstick:
- `datagrid`线条色修改 [2942042] :lipstick:
- scrollbar样式修改 [2942055] :lipstick:
- 极简下dateboxq的图标修改 [2942052] :lipstick:
- 极简版卡消费图标修改
- 增加6个炫彩图标 [3007459]
- 增加6个极简图标 [3007459]

## 2022-11-28
- `panel`收起与展开增加样式类, 实现收起时下边框直角变成圆角需求。[2941760] :lipstick:
- `panel`右上角工具图标hover底色修改 [2941759] :lipstick:
- `tab`左右滚动图标样式修改 [2941763] :lipstick:
- `tab`关闭页签按钮hover无需背景色 [2941761] :lipstick:

## 2022-11-25
- 炫彩`tab`修改左右选中样式 2940150 :lipstick:
- `tab`样式修改选中颜色 2940148,2940152 :lipstick: 

## 2022-11-24
- `combo`多选时,输入框增加背景色 [2980036] :lipstick:
- `keywords`元素左对齐(不留5px间隙),hover带边框 [2937948] [2937965] :lipstick:
- `pagination`上按钮间距增大 :lipstick:

## 2022-11-23
- 炫彩`comboq`面板色值修改
- `popover`提示图标修改,极简与炫彩显示不同
- `dialog`第一个按钮marginleft为0
- `messager`prompt输入框圆角5px修改成2px


## 2022-11-21
- popover箭头颜色修改 [2939739] :lipstick:

## 2022-11-18
- `popover`图标与高度修改 [2943309] :lipstick:
- `pagination`图标样式修改 [2942295] :lipstick:
- 极简表格中图标位置与选中时颜色修改 [2942326] :lipstick:
- 极简表格及树-表格-行操作选中样式有误，与hover样式保持一致 [2942059] :lipstick:
- 表格body与footer最后一行不显示下划线 [2942049] :lipstick:
- `dialog`第一个按钮margin-left值为0,示例修改 [2940796] :lipstick:
- 炫彩表格body与footer最后一行不显示下划线 [2942040] :lipstick:
- panel右上角图标修改,间距修改 [2942053] :lipstick:
- 极简表格树线条树选中灰色背景断开及图标与文字之间的间距问题 [2942057] :lipstick:
- 炫彩树线条图透明及文字间距修改 [2942043] :lipstick:

## 2022-11-17
- `messager`弹出的窗口中按钮居中,第一个按钮marginleft为0 [2943124] :lipstick:
- `messager`示例按钮背景色修改, 输入框边框修改 [2943214] :lipstick:

## 2022-11-11
- `keywords`子元素最左边不留间距 [2937948] :lipstick:
- `dateboxq`面板高度增加2px,与datebox效果保持一致 :lipstick:

## 2022-11-10
- `splitbutton`鼠标悬浮时样式修改 :lipstick:

## 2022-11-09
- `datagrid`的`columnsUrl`配置项得到的列定义覆盖columns中属性 [3057692] :sparkles:
- `datagrid`的`defaultColumns`支持`[{},{}]`与`[[{},{}]]`二种结构
- 菜单组件hover颜色修改成#e5e5e5 [2855502] :lipstick:
- 极简风格下`layout`的分割线背景色修改成透明 [2916939] :lipstick:

## 2022-11-04
- `datetimebox`onBlur事件中，当输入框值为空时不再进行格式化，而是进行值清空，用于解决当框为空点击面板的"关闭"或者删光输入框的值还是会重新变成当前时间问题

## 2022-11-01
- `datagrid`增加列定义配置路径`columnsUrl`配置项,修改列定义路径界面`editColumnsPage`配置项,修改列定义权力路径`editColumnsGrantUrl`配置项
- `datagrid`增加事件`onInitBefore(options)`,便于在表格生成前修改上下文
- 隐藏列头不翻译 [3017058]

## 2022-10-31
- `filebox`极简风格下支持显示按钮图标。支持showicon样式 [2911548]
- `tabs`的tabHeight高度从27修改成36 [2746037]

## 2022-10-30
- 为解决不存在icon类不显示图标问题，icon-xx样式指定字体 [2911539]
- icon-xx增加居中样式,解决在列表上显示图标问题 [2911539]
- 解决非`datagrid-toolbar`下的无背景(plain:true)按钮的图标显示间距异常 [2911539]

## 2022-10-27
- 在IE8下选中`combobox`某行时js报错处理 协和

## 2022-10-25
- 极简风格下`panel`的card风格面板修改成默认面板样式 [2913345]

## 2022-10-24
- 修改极简风格下`splitbutton`与`menubutton`的箭头与文字间距 [2855502]
- 修改极简风格下`menubutton`行高修改 [2855848]
- 修改极简风格下`combo`的小箭头在下拉面板显示时,也需要变色 [2891835]

## 2022-10-21
- `treegrid`有数据显示,然后再查询出零条数据时,翻页条上总行数显示错误。

## 2022-10-11
- 滚动加载js更新 [2753726]

## 2022-10-10
- textbox样式类边框某情况下为蓝色 [2763454]
- 输入组件禁用样式调整 [2863292]
- 放大镜禁用样式修改 [2940539]
- 示例修改及`table-splitline`线条重复问题 [2890820]
- `dateboxq`,`datetimeboxq`在linux服务器下默认不显示图标问题 [2940817]

## 2022-10-08
- 极简5个图标修改

## 2022-10-01
- 炫彩增加1个白色图标,3个花色图标,12个big图标 [2944582] [2946239]
- 极简增加1个白色图标,2个花色图标,12个big图标 [2944469]
- 修改popover提示图

## 2022-09-30
- 因为加了[type=text]选择器后导致各输入组件长度不一样问题处理

## 2022-09-25
- `lookup`样式修改 [2914060] [2914190]
- `comboq`面板弹出时覆盖输入框1px
- `comboq`面板弹出时给输入框active样式,以便实现样式效果

## 2022-09-23
- `splitbutton`,`menu`展开时样式,线条,箭头修改 [2937860] [2937859]
- 极简`validatebox`验证错误时样式调整 [2937953]
- `linkbutton`高度修改成28px
- `checkbox`小图标位置调整 [2937962]
- `combo`系下拉面板增加上方与下方区别,及样式修改 [2937960]
- `searchbox`小图标hover样式修改 [2937954]
- `combo`系下拉面板展开后,增加combo-q-active样式 [2937959]
- `checkbox`样式修改 [2937963]
- `keywords`样式修改 [2937948] [2937965]
- 默认背景色调整 [2850626]
- 翻页条上disable按钮不要背景色 [2863284]

## 2022-09-22
- comboq系组件增加comboq-arrow-hover样式
- 修改各种输入框组件样式
- 极简版`linkbutton`高度调整为28px [2937957]
- 输入框内阴影去除,无法达到统一表现
- 验证错误的输入框placeholder字体颜色修改 [2937861]
- `checkbox`文字与勾选框间距调整 [2937943]

## 2022-09-19
- `switchbox`炫彩版文字去掉投影,修改字体 [2937866]
- `switchbox`极简版文字去掉投影,修改字体 [2937961]

## 2022-09-13
- `splitbutton`在plain:false下字体，背景，hover效果修改 [2899260]

## 2022-09-09
- `linkbutton`的大图标选中背景色修改 [2850808]

## 2022-09-07
- 调用`DropDropRadio`组件的clear方法报错问题处理 :bug: [2843010]

## 2022-08-31
- `datagrid`鼠标滚轮在固定列内容区域无法滚动表格问题处理 [2902579] :sparkles:
- `numberbox`的forcePrecisionZoer配置项对非有效0去除 :sparkles:
## 2022-08-18
- `datagrid`增加`defaultsColumns`配置, 提供默认列定义 :sparkles:

## 2022-08-17
- `datagrid`增加`showFilterToolbar`配置项，显示过滤工具条 [2778466] :sparkles:

## 2022-08-16
- 修改按钮样式（边距与选中色）
- `window`当标题移动到深色上时，边角出会出现一丝白边，将window背景色改为透明。
- `splitbutton`无图标时,左边距修改。让按钮显示更紧凑 [2834529]
- 无背景按钮focus效果优化，白字修改成黑字

## 2022-08-12
- 修改`triggerbox`在disable状态下边框颜色 [2777705]
- 增加`icon-tabel-col`图标 [2786493]
- 增加`icon-big-ca-green`图标 [2843404]
- 【极简HISUI】自定义表格工具栏中下拉表格行操作样式问题 [2812214]
- 【极简HISUI】修改表格操作行的两个高度 [2812190]
- 不同色系按钮禁用样式修改 [2802825]
- `triggerbox`禁用时，按钮hover时显示成禁手

## 2022-08-10
- `datebox`点击今天按钮时不触发onSelect事件问题 [2533036]
- `panel`的card类型title宽度计算优化 [2668172]
## 2022-08-09
- 强制使用按钮的disabled背景色 [2821159]

## 2022-08-01
- 修改背景色为#f5f5f5 [2834994]

## 2022-07-19
- vstep,hstep在IE8浏览器下激活节点背景色变蓝问题修改 [2797053]

## 2022-07-18
- `tabs`内区域不要圆角,导致内部iframe也带圆角 [2790963]
- 修改几个对齐字体图标颜色为黑色 [2786493]
- 两个版本表头筛选图标替换 [2779164]
- `tree`在lite风格下父节点图标显示异常问题处理 [2791549]
- `tree`在lite风格下无线条父树节点前无对应图标 [2791392]
- `linkbutton`按钮增加selected样式处理
- `datagrid`优化editbegin方法的速度 :sparkles: [2801083] by wqy

## 2022-07-17
- `panel`无title时，lite风格上边框增加边框 [2773693]
- 图标缺少icon-star-light-yellow [2777168]
- lite风格下所有禁用示例加入鼠标小手禁用样式 [2777705]
- lite风格页签关闭按钮与前面文字前间距为8px [2777513]
- lite风格下icon-qua-pro-dis,icon-qua-pro-blue二图标修正 [2777799]
- HISUI两个版本`tree`选中行时背景颜色断开问题处理 [2779159]
- 二个版本都增加`icon-sure-readed`,`icon-read-details`二个图标 [2786156]

## 2022-07-15
- `datebox`的maxDate设置为今天，但不能通过点击今天按钮选中日期 :bug: 需求号：[2734045]
- `window`面板标题左侧间距应为10px 需求号：[2767193]
- `layout`区域间分割线背景色修改成FFF 需求号：[2767193]
- `window`的body的边框宽度修改成0, 兼容炫彩版, 1个像素可能造成文字折行 [2791752]

## 2022-07-06
- `datagrid`的列定义中增加`showTipFormatter`函数接口, 自定义提示内容 :sparkles:  需求号：[2491977]

## 2022-06-30
- 列表可排序列的列头显示小图标 :sparkles: 需求号：[2750459]
- lite版滚动条样式修改 :lipstick:
- lite版按钮样式修改,hover色, disabel色，内间距 :lipstick:

## 2022-06-29
- `列表`-`下拉框`-`放大镜`的pageList内数字显示顺序不对问题处理 :sparkles: 需求号[2728500]
- `lookup`当加载数据成功后高亮第一行时需触发selectRowRender事件 需求号：[2723790]

## 2022-06-22
- 拉近datagrid-toolbar上的图标与文字的距离

## 2022-06-20
- `panel`的头部内边距从4px修改成3px，保持与炫彩版一致, 不然有些界面会多出多余的滚动条 :sparkles:

## 2022-06-14
- `lookup`在多个输入框中来回闪烁问题 :bug: 需求号[2538239]

## 2022-06-13
-  `timespinner`增加`setSpinStart`方法指定微调位置

## 2022-06-09
- `linkbutton`lite版风格中无描述按钮长度显示不正确处理

## 2022-05-26
- `lookup`第一次展示且数据为空时，列表宽度很窄问题处理。重现:医嘱录入空输入框中回车

## 2022-05-24
- `lookup`增加自适应高度功能 :sparkles: 需求号[2447863]

## 2022-05-22
- `numberbox`增加`forcePrecisionZoer`配置,可配置成不强制补0
- 增加11个小图标

## 2022-05-20
- 单选控件`DropDropRadio`增加clear :sparkles: 需求号[2500978]

## 2022-04-22
- 双击列头弹出列定义界面修改成window.open,防止与combo下拉相互覆盖 :bug: 需求号[2607164]

## 2022-04-16
- lite版本按钮、面板默认不显示图标
- 组件图标修改成使用字体实现
- 修改api示例

## 2022-04-10
- 修改HISUI-Lite版风格,组件图标默认为灰色 :lipstick:

## 2022-04-08
- 修改HISUI-Lite版风格 :sparkles:
- 去除`checkbox`与`radio`的图标左边距(6px) :sparkles:
- `accordion`上下圆角实现 :lipstick:


## 2022-04-04
- 优化`datetimebox`双击选中日数时,会选中空格问题，且光标离开时自动计算成有效日期时间 :bug:

## 2022-03-30
- 极简与蓝色版都增加12个对齐功能图标

## 2022-03-02
- `datetimebox`的按钮颜色优化 :sparkles:

## 2022-02-23
- 提供三选确认窗口功能`confirm3` :sparkles:

## 2022-02-21
- 解决`menubutton`在firefox下不能选中问题 :bug:

## 2022-02-15
- `datagird`多层列头宽算法重写
- 增加二个icon-pause-red,icon-alarm-key图标样式

## 2022-02-10
- `datagrid`多层列头,父列头文本内容长过子列头总宽度,会导致列头与内容错位问题处理 2011212 :bug:
```考虑多表格,多ID```

## 2022-01-27
- `datagrid`多层列头,父列头文本内容长过子列头总宽度,会导致列头与内容错位问题处理 2011212 :bug:

## 2022-01-26
- datagird增加loadBeforeClearSelect配置项 :sparkles:
- datagrid列上定义成showTip后，刷新数据前应销毁tooltip :bug:

## 2022-01-25
- 界面上存在combobox与textarea时，当下拉面板显示时，点击到textarea时，textarea滚动异常问题 :bug:
- 新版本Chrome.92上`datagrid-groupview`存在选中一行后，自动跳转滚条问题 2144042 :bug: 

## 2022-01-24
- `keywords`单选时也触发onSelect事件 :sparkles:

## 2022-01-20
- 列表一页显示多少行增加100与200选项 :sparkles:

## 2022-01-20
- hisui中包含中文转成unicode编写 :sparkles:

## 2022-01-16
- 字体图标实现淡版 :sparkles:
- `timespinner`回车事件优化 :sparkles:

## 2022-01-12
- `messager.prompt`在输入框中按左右箭头导致光标切换到按钮上 [2162656] :sparkles:
- IE下重设`confirm`按钮描述，confirm窗口弹出后，让焦点*不*在按钮上，此时回车导致报错问题处理 :bug:

## 2022-01-10
- `tooltip`提示层位置left小于0时优化显示效果 :sparkles:

## 2022-01-05
- 修改`imedisabled`功能,增加中间件处理输入法

## 2021-12-31
- 增加`imedisabled`插件。点击时输入框时,输入法切换成英文 :sparkles:
- 增加切换成英文输入法示例

## 2021-12-14
- 增加2个图标,'icon-w-scan-code','icon-big-paper-box'
- `popover`提示超5秒时,提供x号显示

## 2021-12-04
- 增加2个ca图标及8个消毒供应室图标

## 2021-11-10
- `datagrid`增加`singleRequest`配置项
- `lookup`增加singleRequest:true,默认只保留最后一次请求 :sparkles:

## 2021-11-08
- `datagrid`支持code|message或code|msg判断提示

## 2021-11-03
- `datagrid`支持多种数据格式
```js
{
  code:200,   //不为200时,会提示message信息
  message:"success",
  data:{
    total:100,
    rows:[{...},{...}]
  }
}
```
- `datagrid`只保留最后一次请求 :bug:
- -  某界面放大镜输入aspl查询，as查询需要3秒，aspl查询1秒，则会先出来aspl结果，过2秒后显示as的结果，导致放大镜结果与查询条件不符

## 2021-09-26
- `datagrid`在护理病历界面只显示一列问题 :bug:
- - 升级HISUI为最新时，护理病历还是旧版本，记录单显示问题,做了兼容性处理。
## 2021-09-23
- 为`checkbox:true`的`datagrid`增加Shift连选功能

## 2021-09-22
- 增加`icon-w-skip-no`跳号样式 需求号:2150849
- 修改`icon-stamp-cancel`图片
## 2021-09-08
- `timespinner`增加双击全选功能 :sparkles:

## 2021-09-03
- 解决多个NP插件同时出现在同一window下且其中一个id包含另一个id时，显示错误问题 :bug:
```js
if ($.data(trgt, "changeIdStr").NPAPIIdStr.indexOf(','+changeId+',') < 0) {     //多次open只加一次
  frm.setAttribute('data-hideTimes', parseInt(frm.getAttribute('data-hideTimes')) + 1);
  $.data(trgt, "changeIdStr").NPAPIIdStr += ','+changeId+',';
}
```

## 2021-08-10
- `timeboxq`回车事件不冒泡处理 :bug:
```js
switch (e.keyCode) {
  //...
  case 13:
    e.preventDefault();
    opts.keyHandler.enter.call(_t, e);
    //return false ; 修改成 break;
    break;
}
```

## 2021-08-09
- `keywords`的getSelected在jq.length==0时返回[],兼容老版. 需求号：2091806
- - 河南信阳中心,发现“护士批量补录医嘱”界面存在问题，左侧患者列表界面无法正常加载
```js
getSelected:function(jq){
	if (jq.length > 0) return getAllSelected(jq[0]);
	/*兼容老版, 护士补录界面,没有危重,病危keywords,但使用了。增加返回值*/
	return [];
},
```

- combobox的`enterNullValueClear`配置在多选时不生效问题. 需求号:1521235
- - 护理ycz发现下拉多选在editable:ture,enterNullValueClear:false情况下,选中某些项后,继续编辑文本框,新增一些额外的字符,回车时,新增的额外字符丢失。
```js
/// 增加多选判断
if ((vv.length == 0 && !opts.enterNullValueClear) || (opts.multiple && !opts.enterNullValueClear)){
}
```

- `tree`只有一个根节点时,会多出向上虚线 :bug:  需求号：1948502
```css
  .tree-root-one {
    .tree-expanded{
      background: url('@{images-path}/tree_lines.png') no-repeat -49px center;
    }
    .tree-collapsed {
      background: url('@{images-path}/tree_lines.png') no-repeat -33px center;
    }
  }
```
- 增加核验`icon-verify`图标

## 2021-08-06
- 医为浏览器处理病历编辑器覆盖问题逻辑优化
- - 港大[科室模板维护]界面弹出$.messager.prompt窗口被病历覆盖问题。编辑吅与界面都在同一iframe中，老的隐藏编辑器父iframe方式不生效，修改成把窗口显示时编辑器宽高修改成0,窗口消失时编辑器宽高恢复
```js
// 增加方法
switchObjectSize(options,win,toHide,trgt,hisuiCmpName)
// 设置宽高
frm.style.width = "0px";
frm.style.height = "0px";
```

## 2021-08-05
- `timeboxq`的onChange优化.需求号：2096090 :bug:
- - 护理ycz发现在中途修改timeboxq框的值离开或回车后，不触发onChange事件
```js
// 记录修改
.bind("change.timeboxq", function (e) {
	opts.valueDirty = 1;
})
// 判断修改
if ((oldVal != value) ||(opts.valueDirty)){
	opts.onChange.call(target,value,oldVal);
}
```

## 2021-08-02
- `checkbox`在checked及disable变化时,触发ifChanged事件，兼容老版icheck组件
- - 抗菌药物申请单界面【是否越级】勾选后仍然不能填写【越级原因】问题修改
```js
/// click.checkbox
t.trigger("ifChanged");
/// setDisable
$(target).trigger("ifChanged");
```
## 2021-07-27
- `datagrid`在loadData时，发现pageNumber小于1时，重校正值
- - 治疗执行记录列表界面查询不出记录问题
```js
// 老版_5ae.total默认为pageNumber*pageSize(如：10),后修改bug修改成0。如果第一次Load空数据时,loadData({total:0,rows:[]})不去校正值,opts.pageNumber值一错再错
// 见bug/datagrid.2.html
// 增加opts.pageNumber<1条件
if (_5ae.total != data.total || opts.pageNumber<1) 
```
- `celltextarea`在IE下最底一行数据，编辑时导致vi2有scrollTop，返原body的scrollTop,可解决vi2的scrollTop
## 2021-07-13
- `combobox`的blurValidValue属性配置成true时，回车选中行，点击行不验证值.:bug: ​需求号:2042875
```js
/// 会诊申请表格中选中科室下拉框行记录时，使用setText赋值,校验值的话会导致选不中。
/// 逻辑修改成：如果是点击行或回车选中行时不去校验value, 否则老项目没办法兼容,其实现这是一个错误写法。
if (event && event.target.className.indexOf("combobox-item") > -1) {
    return;
}
```

## 2021-07-05
- `combobox`的blurValidValue属性配置成true时,点击下拉层的滚动条会清空列表行记录问题. :bug: 需求号:1800688

## 2021-06-18
- 增加`required-label`样式，修改示例界面
- textarea为验证必填框且校验失败时,图片位置显示右下角
- 修改datagrid相关示例,表头上增加2px空距
## 2021-05-27
- 增加`icon-date`,`icon-no-dot`图标

## 2021-05-14
- `combobox`下拉框内容超长时自动换行

## 2021-05-14
- `celltextarea`配置options后,最大高度没受限问题 :bug:

## 2021-05-12 
- `celltextarea`编辑单元格回车高度增加,但不能超出`datagrid`的表头或底部:sparkles:
- `celltextarea`编辑单元格显示位置优化, 根据空间自动显示到上方或下方:sparkles:
- `celltextarea`编辑单元格增加maxHeight配置:sparkles:

## 2021-04-21
- `timeboxq`支持自定validType,与回车事件:sparkles:
- `timeboxq`必填提示翻译 :sparkles:

## 2021-04-19
- `娩`字默认首拼为`M` :sparkles:

## 2021-04-15
* 编辑表格增加自动聚焦配置项`autoFocus` :lipstick:

## 2021-04-14
* 返回正确顺序的列字段,考虑冻结列-ycz :bug:
* 弹出提示窗口`messager`回车不能触发<确定>按钮问题 :bug:

## 2021-03-11
* 修改透明按钮/菜单按钮聚焦时样式修改:lipstick:

## 2021-03-07
* 在IE11下最后一行`celltextarea`编辑框内一直加车闪烁问题修复 :bug:

## 2021-03-03
* `linkbutton`鼠标悬浮及聚焦时样式修改 :sparkles:
* 输入框聚集时样式修改 :lipstick:

## 2021-02-26
* `hstep`done样式修改:sparkles:
* `hstep`点击空白地报错处理 :bug:
* 编写`vstep`纵向导航组件 :sparkles:

## 2021-02-05
* `checkbox`与`radio`支持动态设置/取消必选 :sparkles:

## 2021-02-02
* 当form中包含`hisui-checkbox`时,调用`form('reset')`报错处理 :bug:
## 2021-01-28
* `dateboxq`配置format后,月/日小于10时前面补0 :bug:
* `messager.prompt`界面输入框样式修改 :lipstick:

## 2021-01-27
* `dateboxq`取支持标签`format`属性定义 :bug:

## 2021-01-26
* `combobox`某行数据超长后，鼠标悬浮时背景色不完整问题修复 :sparkles:

## 2021-01-18
* 合并护理修改判断:bug:

## 2020-01-12
* 解决`datagrid`多次调用datagrid({})方法导致翻页条显示页码错误问题 :bug:

## 2020-01-06
* `datagrid-body`定义还原成默认 :bug:

## 2020-01-05
* `tooltip`支持tipWidth宽度配置 :sparkles:
* `datagrid`列定义增加`tipPosition`,`tipTrackMouse` :sparkles:

## 2020-12-31
* `dateboxq`支持format属性配置日期格式

## 2020-12-30
* 解决`lookup`数字查询与数字选行功能冲突问题

## 2020-12-28
* 增加药品类图标

## 2020-12-21
* 单元格编辑celltextarea类型，编辑时不影响原行高度 :bug:
* 单元格选行时，选中checkbox列。checkbox列不允许点击
* 编辑单元格getChecked与getSelected方法实现
* 编辑单元格singleSelect时可以多选Checkbox

## 2020-12-17 
* 医为浏览器下`timespinner`组件按钮调整小时问题:bug:

## 2020-12-16
* 修改IE下gridcelledit导致gridscroll一行记录时一直重绘问题 :bug:

## 2020-12-15
* 单元格编辑增加celltextarea类型多了div标签

## 2020-12-10
* 修改gridcelledit导致gridscroll一行记录时一直重绘问题 :bug:

## 2020-12-04
* 解决searchbox输入值后再次点击会清空问题 :bug:

## 2020-12-03
* 增加图标icon-eye-deepgrade
* 单元格编辑增加celltextarea类型 :sparkles:

## 2020-11-26 ##
* 表格及列增加lineHeight属性 :sparkles:

## 2020-11-25 ##
* 修改验证框提示小于->小于或等于,大于->大于或等于
* 表格fontSize功能导致列头对不齐问题修复 :bug:

## 2020-11-24 ##
* 单元格编辑时下拉单选，同时支持鼠标和键盘选中后，跳到下一个单元格 :bug:

## 2020-11-12 ##
* 修改新版左右tab样式
* fa图标在表格工具栏及面板title中使用兼容

## 2020-11-03 ##
* 新版样式

## 2020-11-03 ##
* 增加font-awesome字体支持
* 开始新样式0.4.0
* 解决`datagrid`中tip左边看不全问题
* 增加big-book-arrow-ok图标
* 新起api4目录
* 新图标说明界面提交

## 2020-10-15 ##
* `timeboxq`增加`resize`方法
* 9:30格式认为是合法时间,离开时再转换成09:30
* `datagrid`增加`timeboxq`编辑类型

## 2020-10-14 ##
* 增加`timeboxq`组件

## 2020-10-13 ##
* 表格或列设置字体大小不影响表头字体 

## 2020-09-29 ##
* 修改`textarea`警告图片显示位置处理
* IE下textarea的placeholder样式处理

## 2020-09-23 ##
* 编辑单元格需求修改 

## 2020-09-16 ##
* `messager`组件自动确认在医为浏览器下报错问题

## 2020-09-15 ##
* 护士站修改DropDropRadio功能
* 输入框Enter及Change事件同时触发时,`messager`组件自动确认问题

## 2020-09-07 ##
* 表格增加获当前修改行方法
* 表格增加编辑动作定义配置
* 解决日期为空值时，点击today无反应问题
* 编辑表格修改后变化数据才记录,等号修改成不等号
* `lookup`对idField匹配功能去除

## 2020-09-01 ##
* `datagrid`判断编辑对象是否变化，支持对象

## 2020-08-31 ##
* 下拉框`combobox`全选/取消全选在IE11不再换行，及翻译处理

## 2020-08-24
* 表格与列支持`fontSize`属性
* 增加表头文字是否折行`titleNoWrap`属性

## 2020-08-19
* `combobox`在allowNull为true时，取消选中也隐藏面板
* `datagrid`的列中增加wordBreak配置项

## 2020-08-03 ##
* `datagrid`的title自动换行
* `radio`与`checkbox`默认不显示必填提示
* `radio`与`checkbox`鼠标移入提示

## 2020-07-31 ##
* `checkbox`和`radio`如果options中包含name而元素属性没有name,则将元素属性name置为opts.name

## 2020-07-27 ##
* `combobox`与`combogrid`在面板隐藏时，回车选行与取消选行无效
* `comboq`类组件Enter事件冒泡给外层
* `radio`,`checkbox`的isValid方法返回值应为Boolean
* 解决`radio`,`checkbox`的required提示偶尔为空

## 2020-07-26 ##
* `radio`增加required必选一项,且把以前的required修改成requiredSel属性
* `checkbox`增加required必选一项属性

## 2020-07-20 ##
* `combo`系回车事件冒泡给外层
* `datebox`框中有值时才去setValue, 解决2020-02-17处理required问题产生的Bug

## 2020-07-16 ##
* `datagrid`数据为空时，使用checkrow勾选行时不报错

## 2020-07-15 ##
* 编辑表格中`textarea`类型支持`required`属性
* 编辑表格中`dateboxq`不能自适应宽度问题

## 2020-07-13 ##
* 解决`menu`点击弹出`window`时，isTopZindex属性无效问题 
* `combo`系组件与`lookup`支持Down按键展开面板

## 2020-07-09 ##
* `popover`的title高度样式还原，不固定15px

## 2020-07-08 ##
* `timespinner`支持输入9转成09:00

## 2020-07-03 ##
* 增加横向步骤`hstep`组件

## 2020-07-01 ##
* 增加一个【转】字图标

## 2020-06-29 ##
* `menu`在Chrome系浏览器中`isTopZindex`实现
* `datagrid`的`columns`中对象的`showTip`属性对空值不生成tip

## 2020-06-24 ##
* `lookup`默认行号列自适应

## 2020-06-22 ##
* `lookup`增加`forceFocus`,解决toolbar输入查询问题
* `lookup`修改`selectRowRender`默认为null, 解决选行时闪烁问题

## 2020-06-19 ## 
* 解决`scrollview`插件能显示下也出现纵向滚动条问题

## 2020-06-18 ##
* 增加一个大图标

## 2020-06-16 ##
* 解决`datetimeboxq`面板高度异常问题
* 解决系统配置中配置日期格式不同导致`datebox`验证提示问题. `dtformat=""`时走组件自身验证

## 2020-06-12 ##
* `combobox`的`defaultFilter`的`3,4`改为考虑多音字，即和`5,6`相同
* `lookup`当调用不是最后操作的lookup的`clear`方法时会报错问题
* `lookup`本地数据不生效问题

## 2020-06-11 ##
* 增加一个文字图标

## 2020-06-09 ##
* 解决`datagrid`事件`onUnselect`异常触发问题

## 2020-06-04 ##
* 增加3个28*28大图标
* `tabs`切换页签空白问题

## 2020-05-26 ##
* `combobox` 的`defaultFilter`增加`5,6`支持多音字
* `combobox` 增加`spellField`用于指定简拼字段，用于`defaultFilter`为`3,4,5,6`时的简拼过滤

## 2020-05-25 ##
* `isTopZindex` win.frames[index]可能是undefined

## 2020-05-22 ##
* `datagrid` 分页条初始total改为0 在datagrid为lazy或者其它情况一开始没加载数据时显示不正确
* `keywords` 翻译信息采集

## 2020-05-21 ##
* `isTopZindex`兼容360企业浏览器 
* `datebox`中的日历框第一次打开时点击标题中的年月后，日期框会自动关闭的问题

## 2020-05-14 ##
* `datagrid`列头高度可定义
* 合并护理的单选下拉
* 在tab中panel无边框时，切换页签空白问题

## 2020-05-12 ##
* `datagrid` 选中行样式大于鼠标悬浮样式

## 2020-05-11 ##
* 将样式中的textbox类指定给type=text的input元素使用

## 2020-05-08 ##
* 处理多次`window({k:v})`时病历插件显示空白问题
* 将输入框中小箭头和小图标的opacity属性由0.7改为1

## 2020-05-07 ##
* 在表单中新增一个输入框样式集合菜单
* 将`filebox`的输入框的圆角值都改成2px

## 2020-05-06 ##
* `datebox`与`dateboxq`默认最小日期1841-01-01

## 2020-04-30 ##
* `dateboxq`必填提示修改成中文
* 翻译方法加报错保护
* `comboq`系的zindex动态增加
* `datagrid`增加timespinner编辑类型

## 2020-04-28 ##
* `progress`只触发一次window打开，处理病历编辑器覆盖问题.

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