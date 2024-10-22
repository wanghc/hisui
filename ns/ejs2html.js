const fs = require("fs");
const ejs = require("ejs");
/*
把某个ejs或html文件生成到对应目录下
@param filename 文件路径 views下文件路径
@param opt {srcRootPath:"views/api",destRootPath:"lite"}
*/

module.exports.handler = function (filename,opt){
    if ('undefined'==typeof opt) {
        console.log("缺少{srcRootPath:,destRootPath:}属性");
        return ;
    }
    if (filename.indexOf(opt.srcRootPath)==-1){
        console.log(`${filename}文件不在${opt.srcRootPath}目录下,参数错误`);
        return ;
    }
    let srcRootPathIndex = filename.indexOf(opt.srcRootPath) + opt.srcRootPath.length;
    let destFilename = opt.destRootPath + filename.slice(srcRootPathIndex) //  api/xx/xxx.ejs
    //console.log("源文件"+filename+",目录文件"+destFilename);
    let parentDir = destFilename.slice(0,destFilename.lastIndexOf('/'));
    if (filename.lastIndexOf('.ejs')>-1){
        var parentItemDir = opt.destRootPath; //destFilename.slice(srcRootPathIndex,filename.indexOf('/',srcRootPathIndex))
        if (parentItemDir=='lite'){
            opt.jsSuffix='.lite',opt.themeCode="lite";
        }else if (parentItemDir=='lightblue'){
            opt.jsSuffix='.lightblue',opt.themeCode="lightblue";
        }else if (parentItemDir=='pure'){
            opt.jsSuffix='.pure',opt.themeCode="pure";
        }else{
            opt.jsSuffix="",opt.themeCode="blue";
        }
        ejs.renderFile(filename,opt,function(err,str){
            if (err){
                console.error(err);
            }else{
                let htmlFileName = destFilename.slice(0,destFilename.lastIndexOf('.'))+".html" 
                if (!fs.existsSync(parentDir)){
                    fs.mkdirSync(parentDir);
                }
                //console.log(`生成${htmlFileName}`);
                // 存在对应版本的views.ejs文件时，不生成其它版本的html,减少异步写文件冲突
                if (fs.existsSync(`${htmlFileName}`)){
                    //console.log(`${htmlFileName}存在，不生成`);
                    // html存在不生成
                    return ;
                }else{
                    console.log(`生成views/${htmlFileName}`);
                    fs.writeFile(htmlFileName,str,'utf-8',function(fserr){
                        if (fserr){
                            console.error(fserr);
                        }else{
                            console.log('成功生成：'+htmlFileName);
                        }
                    });
                }
                // if (fs.existsSync('views/'+destFilename)){
                //     console.log('views/'+destFilename+" 存在，"+(filename+'='+destFilename));
                //     if (filename==('views/'+destFilename)){
                //         fs.writeFile(htmlFileName,str,'utf-8',function(fserr){
                //             if (fserr){
                //                 console.error(fserr);
                //             }else{
                //                 console.log('成功生成：'+htmlFileName);
                //             }
                //         });
                //     }
                // }else{
                //     fs.writeFile(htmlFileName,str,'utf-8',function(fserr){
                //         if (fserr){
                //             console.error(fserr);
                //         }else{
                //             console.log('成功生成：'+htmlFileName);
                //         }
                //     });
                // }
            }
        })
    }else{
        if (!fs.existsSync(parentDir)){
            fs.mkdirSync(parentDir);
        }
        fs.copyFile(filename,destFilename,function(){
            //console.log('复制'+destFilename);
        });
    }
}