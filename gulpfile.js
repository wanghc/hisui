// Less configuration
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    //babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify');   //提示
    //chinese2unicode = require('gulp-chinese2unicode')
    replace = require('gulp-string-replace')
    //foal = require('gulp-foal');    //传参
    //livereload-半自动,connect-全自动
var orgCmpArr = ['parser','draggable','droppable','resizable','linkbutton','pagination','tree','progressbar','tooltip','panel','window','dialog','messager',
'accordion','tabs','layout','menu','menubutton','splitbutton','searchbox','validatebox','form','numberbox','calendar',
'spinner','numberspinner','timespinner','datagrid','propertygrid','treegrid','combo','combobox','combotree','combogrid',
'datebox','datetimebox','slider'];

//var jsArrOld = ['lib/json2.js','src/jquery.hisui.min.js','lib/bootstrap-switch-1.8.0/static/js/bootstrap-switch.js','lib/icheck-1.x/icheck.js','lib/popover1.2.17/jquery.webui-popover.min.js','src/switchbox.js','src/checkbox.js','src/radio.js','src/filebox.js','src/popover.js','src/lookup.js','src/keywords.js','src/triggerbox.js','src/chinesespell.js','src/hisui.js'];
var slfCmpArr = ['lib/bootstrap-switch-1.8.0/static/js/bootstrap-switch.js','lib/popover1.2.17/jquery.webui-popover.min.js','src/switchbox.js','src/checkbox.js','src/radio.js','src/filebox.js','src/popover.js','src/comboq.js','src/lookup.js','src/keywords.js','src/triggerbox.js','src/chinesespell.js','src/dateboxq.js','src/datetimeboxq.js','src/hstep.js','src/vstep.js','src/timeboxq.js','src/imedisabled.js','src/menutree.js','src/inputclearbtn.js','src/hisui.js'];
var jsArr    = ['lib/json2.js'].concat(orgCmpArr.map(function(i){return 'src/'+i+'.js';})).concat(slfCmpArr);
var lessArr = ["easyui","icon","panel","accordion","window","dialog","textbox","combo","combobox","layout","tabs","linkbutton","datagrid","propertygrid","pagination","calendar","datebox","combogrid","numberbox","spinner","progressbar","searchbox","numberspinner","timespinner","calendar","datebox","numberbox","spinner","progressbar","searchbox","slider","menu","menubutton","splitbutton","messager","tree","validatebox","tooltip","checkbox","switchbox","filebox","popover","comboq","lookup","keywords","triggerbox","dateboxq","datetimeboxq",'hstep','vstep','timeboxq','input.hover','menutree','inputclearbtn'];
//开发测试时在dist生成未压缩js 调试   
gulp.task('js-dev',function(){
    var arr = jsArr;
    return gulp.src(arr)
    .pipe(concat('jquery.hisui.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({message:'gen jquery.hisui.js success!'}));        //提示成功
});
// 在命令行输入gulp less 启动此任务,一个less文件生成一个css
gulp.task('css-s', function() {
    //1.找到less文件
    gulp.src('less/*.less')
    //2.编译为css
        .pipe(less())
    //3.另存文件
        .pipe(gulp.dest("dist/css/easyui"))
        /*.pipe(gulp.dest(function(f) {
            return f.base;
        }))*/
});
// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 less 任务
    //gulp.watch('less/**.less', ['less'])
});
gulp.task('zh-CH',function(){
    return gulp.src('src/hisui-lang-zh_CN.js')
    //.pipe(chinese2unicode())
    .pipe(replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ１２３４５６７８９０｀！＠＃＄％＾＆＊（）＿＋｜＼｛｝［］＂＇。《》／？：；￥｛｝，！、])/g, function (s) {
        return '\\u' + s.charCodeAt(0).toString(16);
    }))
    .pipe(gulp.dest('dist/js/locale'));
});
gulp.task('min-js',function(){
    var arr = jsArr;
    var prefix = "jquery.hisui" ;
    return gulp.src(arr)
    .pipe(concat(prefix+'.src.js'))
    .pipe(gulp.dest('src'))
    //{mangle: false,   //类型：Boolean 默认：true 是否修改变量名
    //preserveComments: 'all' //all-保留所有注释,license保存/*@license
    //compress: false, //类型：Boolean 默认：true 是否完全压缩
    //混淆变量名,但不混淆结构
    //.pipe(chinese2unicode())    
    .pipe(uglify({compress:false,output:{beautify:true},ie8:true}))
    .pipe(rename(prefix+'.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify({compress:false,output:{beautify:false},ie8:true}))   //压缩大小 //compress=true完全混淆
    .pipe(rename(prefix + '.min.js'))
    .pipe(replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ１２３４５６７８９０｀！＠＃＄％＾＆＊（）＿＋｜＼｛｝［］＂＇。《》／？：；￥｛｝，！、])/g, function (s) {
            return '\\u' + s.charCodeAt(0).toString(16);
        }))    
    .pipe(gulp.dest('dist/js'));
});
// 20201104 min-css前生成lite样式css
gulp.task('min-css',['min-css-lite2def'],function(){
    var lessPath = "less/";
    var arr = lessArr;
    arr.forEach(function(value,index){
        arr[index]=lessPath+value+".less"
    })
    return gulp.src(arr)
    .pipe(concat('hisui.min.less'))     //合并所有less文件到hisui.min.less
    .pipe(gulp.dest("less"))            //保存到less目录
    .pipe(less())                       //less编译
    .pipe(rename('hisui.css'))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())                  //压缩css
    .pipe(rename('hisui.min.css'))      //命名
    .pipe(gulp.dest("dist/css"));
})


gulp.task('min-css-lite2def',function(){
    var lessPath = "less/lite/";
    var arr =[].concat(lessArr,['beautyscroll']) ;
    arr.forEach(function(value,index){
        arr[index]=lessPath+value+".less";
    })
    return gulp.src(arr)
    .pipe(concat('hisui.min.less'))     //合并所有less文件到hisui.min.less
    .pipe(gulp.dest("less/lite"))            //保存到less目录
    .pipe(less())                       //less编译
    .pipe(rename('hisui.lite.css'))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())                  //压缩css
    .pipe(rename('hisui.lite.min.css'))      //命名
    .pipe(gulp.dest("dist/css"));
})


// gulp.task('lite2def',['min-js','min-css-lite2def']);


//dist -> default
// dist目录下的js全修改成min, 不留源代码
gulp.task('default',['min-js','min-css','zh-CH']);