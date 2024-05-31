var cdssjson = {"rows":[{"TID":"1","TSrvCode":"mediway","TSrvDesc":"医为CDSS服务","TSrvURL":"https://119.255.194.81:1443/imedical","TSrvVersion":"2.0","TSrvParam":"","TSrvStDate":"","TSrvActive":"1","TSrvHospId":"2","TSrvSourceList":";https://119.255.194.81:1443/imedical/web/scripts/bdp/CDSSClient/sdk/sdk.js|1;","TSrvInit":"1"},{"TID":"2","TSrvCode":"mayson","TSrvDesc":"惠每CDSS服务","TSrvURL":"http://192.168.0.99/cdss/jssdk","TSrvVersion":"1.1","TSrvParam":"v=4.0&ak=","TSrvStDate":"","TSrvActive":"0","TSrvHospId":"10","TSrvSourceList":";../scripts_lib/cdss-sdk.js|1;","TSrvInit":""},{"TID":"3","TSrvCode":"synyi","TSrvDesc":"森亿CDSS服务","TSrvURL":"http://10.1.111.174:25230","TSrvVersion":"1.1","TSrvParam":"","TSrvStDate":"","TSrvActive":"0","TSrvHospId":"","TSrvSourceList":";../scripts_lib/synyi/cdss-sdk.js|1;","TSrvInit":""},{"TID":"4","TSrvCode":"baidu","TSrvDesc":"百度CDSS服务","TSrvURL":"http://10.240.242.19","TSrvVersion":"1.1","TSrvParam":"ak=w2QrKP1eMxCzVpe8eJcX7Mov5pxWZiVq&sk=V8qBBR9Qm0nK2TjBO9S5sM7mbW6u15Bi","TSrvStDate":"","TSrvActive":"0","TSrvHospId":"","TSrvSourceList":";http://10.240.242.19/cdss/imr/sdk/static/index.js|1;http://10.240.242.19/cdss/imr/sdk/static/index.css|1;http://10.240.242.19/cdss/standard/sdk/static/index.css|0;http://10.240.242.19/cdss/standard/sdk/static/index.js|0;","TSrvInit":""},{"TID":"5","TSrvCode":"cnki","TSrvDesc":"同方知网CDSS服务","TSrvURL":"http://cdssapi.znxxjs.com:8038/Entrance/Entrance.aspx","TSrvVersion":"2.1","TSrvParam":"dr=1&key=&act=PMMD&type=0","TSrvStDate":"","TSrvActive":"0","TSrvHospId":"","TSrvSourceList":";http://192.168.205.88/cdssh5/js/FrameMessenger.js|1;http://192.168.205.88/js/FrameMessenger.js|0;","TSrvInit":""},{"TID":"6","TSrvCode":"zhyx","TSrvDesc":"深圳智慧医学","TSrvURL":"","TSrvVersion":"1.0","TSrvParam":"wspath=ws://127.0.0.1:9449","TSrvStDate":"","TSrvActive":"0","TSrvHospId":"","TSrvSourceList":"","TSrvInit":""},{"TID":"7","TSrvCode":"mediwaysds","TSrvDesc":"医为单病种服务","TSrvURL":"http://10.100.7.42:8089","TSrvVersion":"1.0","TSrvParam":"","TSrvStDate":"","TSrvActive":"1","TSrvHospId":"","TSrvSourceList":";http://10.100.7.42:8089/mediway/sds/sdstool.js|1;","TSrvInit":"1"},{"TID":"8","TSrvCode":"weining","TSrvDesc":"卫宁","TSrvURL":"","TSrvVersion":"1.0","TSrvParam":"","TSrvStDate":"","TSrvActive":"0","TSrvHospId":"","TSrvSourceList":";../scripts_lib/cdss/winsdk-1.0.28.min.js|1;","TSrvInit":"1"}],"total":8,"curPage":1}

function parseQueryString(str){
    
    var o = {};
    if (str) {
        var arr = str.split("&");
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i].split("=")[0];
            var val = arr[i].split("=")[1] || '';
            if (key == "") continue;
            o[key] = val;
        }
    }
    //page rows q 处理
    o.page=o.page||"";
    o.page=o.page>0?parseInt(o.page):1;

    o.rows=o.rows||"";
    o.rows=o.rows>0?parseInt(o.rows):9999;
    
    o.q=o.q||"";  //空格会转成+号
    o.q=decodeURI(o.q);
    return o;
}
function getData(options,data){
    var t=parseQueryString(options.body);
    var page=t.page,rows=t.rows,q=t.q.replace(/\++/g,'').toLowerCase();
    var obj={rows:[],total:0};
    var filterAll=data.filter(function(o){
        return q==""
        || (o.Description||"").replace(/\s+/g,"").toLowerCase().indexOf(q)>-1 
        || (o.Code||"").replace(/\s+/g,"").toLowerCase().indexOf(q)>-1 ;
    })
    for (var i=(page-1)*rows;i<page*rows&&i<filterAll.length;i++){
        obj.rows.push(filterAll[i]);
    }
    obj.total=filterAll.length; 
    return obj;
}
Mock.mock( "getcdss", function( options ){
    console.log("getcdss请求开始了",options);
    return cdssjson;
    var obj=getData(options,cdssjson);
    console.log("getcdss请求结束了，结果",obj);
    return obj;
})