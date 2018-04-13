2017-12-21
  修复了checkbox与radio的getValue方法取值报错的bug。
2017-12-25
  hisui-numberbox的高度调整
  hisui-timespinner样式调整
2017-12-26
  hisui-checkbo默认不选中
2017-12-29
  hisui-window增加isTopZindex配置项，可以让window在ocx或dll控件之上弹出
2018-1-8
  hisui内增加$.hisui.xxx方法
  hisui-treegrid增加checkbox功能，勾选事件，选中与取消选中方法
2018-1-10
  linkbutton---增加img配置项，可直接配置图标 
2018-1-11
  修复了hisui-treegrid，仅在js内初始化hisui-treegrid时，点击勾选框报错bug
2018-1-17
  修改了hisui-checkbox在大屏下显示不了勾选框问题
2018-1-30
  为hisui-datagrid增加showPageList,showRefresh,displayMsg三个属性,控件翻页条显示
  修复hisui-linkbutton增加width属性后，图标偏移问题
2018-3-1
  linkbutton  hover颜色调整 增加hover-dark 宽度调整30px+文字+文字左右padding：15px   大图图标样式
  searchbox  按钮样式
  spinner  按钮样式
  datebox datetimebox 按钮样式
  combo 下拉按钮样式
  datetimebox中timespinner  宽高
  panel样式调整 圆角 关闭按钮 
  tabs 蓝色灰色 一系列样式调整修复  边框 hover样式 关闭按钮呢
  accordion 样式的调整 展开关闭按钮样式
  combo linkbutton searchbox 等 的禁用样式调整 
  datagrid toolbar中按钮显示样式  行编辑器支持datetimebox
  menubutton 增加menubutton-blue  menubutton-toolbar
  tree 行高  增加accordiontree样式
2018-3-8
  修复switchbox的 isActive getValue 方法
2018-3-15
  增加$HUI.combo
  tabs 当isBrandTabs为true时,鼠标放到第一页签时不改变样式，默认选中第二个页签
2018-3-19
  增加tabs li的height定义，在win10系统中IE11下访问tabs的宽度变高
2018-3-26
  combogrid 增加lazy属性，当lazy为true，且值为空时 不去请求数据，当第一次点击下拉按钮时调用keyHandler.query
2018-3-26
  修复：treegrid 在结合treegrid-dnd.js 拖拽会报错   1.3.6还没有setEmptyMsg 
2018-3-20
  draggable droppable 组件代码 改为使用1.5的 原1.3.6的,在treegrid使用拖拽单双击很慢
  在用gulp-uglify压缩js时，增加参数 ie8:true  否则ie8下会报错
2018-4-13
  实现filebox组件 依赖linkbutton
  datagrid 行编辑器editor text和validatebox类型样式调整