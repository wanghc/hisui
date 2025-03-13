
// node ./ns/genapi.js 来生成api下的所有页面
// 
// 上传lite目录到服务器上
//  lite > scp -P 22 -r ./ root@hisui.cn:/usr/share/nginx/wordpress/lite/
// 上传lightblue目录到服务器上
//  lightblue > scp -P 22 -r ./ root@hisui.cn:/usr/share/nginx/wordpress/lightblue/
const fs = require("fs");
var path = require("path")
var root = path.join(__dirname)
const ejs2html = require("./ejs2html");
const readline = require('readline');
const ejs = require("ejs");
// 通过api目录生成lite样式下的combobox
// npm run gen [lightblue|lite] [combobox|all]
const hisuiTitleHtml = `
<script type="text/javascript" src="../../dist/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="../jquery-tag-demo.js"></script>
<script type="text/javascript" src="../../dist/js/jquery.hisui.min.js"></script>
<script type="text/javascript" src="../../dist/js/locale/hisui-lang-zh_CN.js"></script>	
<link rel="stylesheet" type="text/css" href="../demo.css">
`
const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
/**
 * 
 * @param {String} path view/api
 * @param {Object} opt {srcRootPath:"views/lightblue",destRootPath:"lightblue"}
 */

function myReadDir(path,opt){
	fs.readdir(path,function(err,menu){	
		if(!menu) return;
		menu.forEach(function(ele){	
			fs.stat(path+"/"+ele,function(err,info){
				if(info.isDirectory()){
					myReadDir(path+"/"+ele,opt);
				}else{
					// console.log("file: "+path+'/'+ele);
                    ejs2html.handler(path+'/'+ele,opt);
				}	
			})
		})			
	})
};
interface.question('生成什么版本的示例[1:lite，2:lightblue，3:pure，空]:', answer => {
    if (answer=='3'){
        myReadDir("views/pure",{srcRootPath:"views/pure",destRootPath:"pure"});
        myReadDir("views/lightblue",{srcRootPath:"views/lightblue",destRootPath:"pure"});
        myReadDir("views/lite",{srcRootPath:"views/lite",destRootPath:"pure"});        
        myReadDir("views/api",{srcRootPath:"views/api",destRootPath:"pure"});
    }else if (answer=='2'){
        myReadDir("views/lightblue",{srcRootPath:"views/lightblue",destRootPath:"lightblue"});
        myReadDir("views/lite",{srcRootPath:"views/lite",destRootPath:"lightblue"});
        myReadDir("views/api",{srcRootPath:"views/api",destRootPath:"lightblue"});
    }else if (answer=='1'){
        myReadDir("views/lite",{srcRootPath:"views/lite",destRootPath:"lite"});
        myReadDir("views/api",{srcRootPath:"views/api",destRootPath:"lite"});
    }else{
        myReadDir("views/api",{srcRootPath:"views/api",destRootPath:"api"});
    }
    interface.close();
});


const args = process.argv;
// console.log(args);
const HISUI_VERSION_NAME ="--hisui-version-name";
const HISUI_DEMO_FILE_NAME ="--hisui-demo-file-name";
let hisuiVersionNameIndex = args.findIndex(arg => arg===HISUI_VERSION_NAME);
const hisuiVersionName = hisuiVersionNameIndex>-1&&args[hisuiVersionNameIndex+1];

let hisuiDemoFileNameIndex = args.findIndex(arg => arg===HISUI_DEMO_FILE_NAME);
const hisuiDemoFileName = hisuiDemoFileNameIndex>-1&&args[hisuiDemoFileNameIndex+1];
return ;


fs.readFile("./src-demo/api/accordion/accordion.html",{encoding:"utf-8"},(err,data)=>{
    if (err){
        console.log(err);
    }else{
        data.replace(/<hui-title>(.*)<\/hui-title>/g,function(part){
            let arr = [];
            arr.push('<title>'+part+'</title>');
            arr.push(`<link rel="stylesheet" type="text/css" href="../../dist/css/hisui.${answer}.min.css"></link>`);
            arr.push(hisuiTitleHtml);
            return arr.join('\n');
        });
        console.log(data);
    }
    
})
fs.writeFile('', html, error => {
    if (error) {
        console.log(error);
    }
});