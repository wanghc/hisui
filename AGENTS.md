# 项目：HISUI（IE8 兼容）

## 浏览器兼容红线
- 目标浏览器：IE8，JS 只能用 ECMAScript 3 语法
- 禁止使用：let/const、箭头函数、模板字符串、classList、addEventListener、
  querySelector、Object.keys、Array.prototype.forEach/map/filter、JSON 对象（需引入 json2.js）
- 事件绑定统一用 attachEvent/detachEvent，或经 jQuery封装
- pure,ihos,vben风格只用兼容Chrome109，不用兼容IE浏览器
