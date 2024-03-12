const fs = require("fs");
const md5 = require("md5");
const ejs2html = require("./ejs2html");
let md5Previous = null;
let fsWait = false;
let watchDir = './views/';
fs.watch(watchDir,{recursive:true,encoding:'utf-8'}, (event, filename) => {
    // filename = api\datagrid\datagrid.edit.html
    if (fsWait) return;
    fsWait = setTimeout(() => {fsWait = false;}, 100);
    // 修改文件后缀时,跳出代码
    if (!fs.existsSync(`${watchDir}${filename}`)){return ;}
    const md5Current = md5(fs.readFileSync(`${watchDir}${filename}`));
    if (md5Current === md5Previous) return;
    if (filename.lastIndexOf("hisui-header.ejs")>-1) return;
    ejs2html.handler(watchDir + filename);
    md5Previous = md5Current;
    console.log(`${watchDir}${filename}文件修改`);
});