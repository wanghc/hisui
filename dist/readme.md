[hisui]: https://wanghc.github.io/hisui/hisui-0.1.0.rar "下载最新的HISUI库"
点击[hisui]下载最新的HISUI库
## 2018-5-3 ##
1. 修改DataGrid关于autoSizeColumn属性处理问题，隐藏列不再重计算列宽,提升速度。

## 2018-4-28 ##
1. 灰色页签选中页签边框问题 tabs类 overflow: visible;

## 2018-4-25 ##
1. treegrid 在load或reload时清掉（移除的被选中元素）在checkedRows中的记录   

## 2018-4-20 ##
1. 增加r-label实施label右对齐且padding-right:10px
1. textbox与vaildatebox及子组件获得焦点时，增加背景效果 

## 2018-4-19
1. 之前，为实现filebox组件，放开了linkbuttton的事件阻止，导致原本用href="#" 的会有跳转行为  改为判断是否是filebox的button 是则不阻止，否则阻止

## 2018-4-18
1. treegrid  "parentId":""   当做根节点

## 2018-4-13
1. 实现filebox组件 依赖linkbutton
1. datagrid 行编辑器editor text和validatebox类型样式调整

## 2018-3-20
1. draggable droppable 组件代码 改为使用1.5的 原1.3.6的,在treegrid使用拖拽单双击很慢
1. 在用gulp-uglify压缩js时，增加参数 ie8:true  否则ie8下会报错

## 2018-3-26
1. 修复：treegrid 在结合treegrid-dnd.js 拖拽会报错   1.3.6还没有setEmptyMsg

## 2018-3-26
1. combogrid 增加lazy属性，当lazy为true，且值为空时 不去请求数据，当第一次点击下拉按钮时调用keyHandler.query

## 2018-3-19
1. 增加tabs li的height定义，在win10系统中IE11下访问tabs的宽度变高

## 2018-3-15
1. 增加$HUI.combo
1. tabs 当isBrandTabs为true时,鼠标放到第一页签时不改变样式，默认选中第二个页签

## 2018-3-8
1. 修复switchbox的 isActive getValue 方法

## 2018-3-1
1. linkbutton  hover颜色调整 增加hover-dark 宽度调整30px+文字+文字左右padding：15px   大图图标样式
1. searchbox  按钮样式
1. spinner  按钮样式
1. datebox datetimebox 按钮样式
1. combo 下拉按钮样式
1. datetimebox中timespinner  宽高
1. panel样式调整 圆角 关闭按钮 
1. tabs 蓝色灰色 一系列样式调整修复  边框 hover样式 关闭按钮呢
1. accordion 样式的调整 展开关闭按钮样式
1. combo linkbutton searchbox 等 的禁用样式调整 
1. datagrid toolbar中按钮显示样式  行编辑器支持datetimebox
1. menubutton 增加menubutton-blue  menubutton-toolbar
1. tree 行高  增加accordiontree样式

## 2018-1-30
1. 为hisui-datagrid增加showPageList,showRefresh,displayMsg三个属性,控件翻页条显示
1. 修复hisui-linkbutton增加width属性后，图标偏移问题

## 2018-1-17
1. 修改了hisui-checkbox在大屏下显示不了勾选框问题

## 2018-1-11
1. 修复了hisui-treegrid，仅在js内初始化hisui-treegrid时，点击勾选框报错bug

## 2018-1-10
1. linkbutton---增加img配置项，可直接配置图标 

## 2018-1-8
1. hisui内增加$.hisui.xxx方法
1. hisui-treegrid增加checkbox功能，勾选事件，选中与取消选中方法

## 2017-12-29
1. hisui-window增加isTopZindex配置项，可以让window在ocx或dll控件之上弹出

## 2017-12-26
1. hisui-checkbo默认不选中

## 2017-12-25
1. hisui-numberbox的高度调整
1. hisui-timespinner样式调整

## 2017-12-21
1. 修复了checkbox与radio的getValue方法取值报错的bug。