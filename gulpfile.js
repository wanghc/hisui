// Less configuration
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    //babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    notify=require('gulp-notify');   //提示
    //foal = require('gulp-foal');    //传参
var orgCmpArr = ['parser','draggable','droppable','resizable','linkbutton','pagination','tree','progressbar','tooltip','panel','window','dialog','messager',
'accordion','tabs','layout','menu','menubutton','splitbutton','searchbox','validatebox','form','numberbox','calendar',
'spinner','numberspinner','timespinner','datagrid','propertygrid','treegrid','combo','combobox','combotree','combogrid',
'datebox','datetimebox','slider'];

//var jsArrOld = ['lib/json2.js','src/jquery.hisui.min.js','lib/bootstrap-switch-1.8.0/static/js/bootstrap-switch.js','lib/icheck-1.x/icheck.js','lib/popover1.2.17/jquery.webui-popover.min.js','src/switchbox.js','src/checkbox.js','src/radio.js','src/filebox.js','src/popover.js','src/lookup.js','src/keywords.js','src/triggerbox.js','src/chinesespell.js','src/hisui.js'];
var slfCmpArr = ['lib/bootstrap-switch-1.8.0/static/js/bootstrap-switch.js','lib/icheck-1.x/icheck.js','lib/popover1.2.17/jquery.webui-popover.min.js','src/switchbox.js','src/checkbox.js','src/radio.js','src/filebox.js','src/popover.js','src/lookup.js','src/keywords.js','src/triggerbox.js','src/chinesespell.js','src/hisui.js'];
var jsArr    = ['lib/json2.js'].concat(orgCmpArr.map(function(i){return 'src/'+i+'.js';})).concat(slfCmpArr);
var lessArr = ["easyui","icon","panel","accordion","window","dialog","textbox","combo","combobox","layout","tabs","linkbutton","datagrid","propertygrid","pagination","calendar","datebox","combogrid","numberbox","spinner","progressbar","searchbox","numberspinner","timespinner","calendar","datebox","numberbox","spinner","progressbar","searchbox","slider","menu","menubutton","splitbutton","messager","tree","validatebox","tooltip","checkbox","switchbox","filebox","popover","lookup","keywords","triggerbox"];
//var ;
gulp.task('js-min',function(){
    var arr = jsArr;
    return gulp.src(arr)
    .pipe(concat('jquery.hisui.min.js'))
    //.pipe(babel())
    .pipe(uglify({
        ie8: true
    }))
        //{mangle: false,   //类型：Boolean 默认：true 是否修改变量名
        //compress: false, //类型：Boolean 默认：true 是否完全压缩
        //preserveComments: 'all' //all-保留所有注释,license保存/*@license
        //}                  //压缩js
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({message:'gen jquery.hisui.min.js success!'}));        //提示成功
});

gulp.task('js',function(){
    var arr = jsArr;
    return gulp.src(arr)
    .pipe(concat('jquery.hisui.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({message:'gen jquery.hisui.js success!'}));        //提示成功
});

gulp.task('css-min', function() {
    var lessPath = "less/";
    //var arr = ["variables","draggable","droppable","resizable","pagination","tooltip","linkbutton","menu","menubutton","splitbutton","progressbar","tree","combobox","combotree","combogrid","numberbox","validatebox","searchbox","numberspinner","timespinner","calendar","datebox","datetimebox","slider","layout","panel","datagrid","propertygrid","treegrid","tabs","accordion","window","dialog"];
    var arr = lessArr;
    arr.forEach(function(value,index){
        arr[index]=lessPath+value+".less"
    })
    return gulp.src(arr)
    .pipe(concat('hisui.min.less'))     //合并所有less文件到hisui.min.less
    .pipe(gulp.dest("less"))            //保存到less目录
    .pipe(less())                       //less编译
    .pipe(minifycss())                  //压缩css
    .pipe(rename('hisui.min.css'))      //命名
    .pipe(gulp.dest("dist/css"))             //存到css目录
    .pipe(notify({message:'gen min css success!'}));        //提示成功
});
gulp.task('css', function() {
    var lessPath = "less/";
    //var arr = ["variables","draggable","droppable","resizable","pagination","tooltip","linkbutton","menu","menubutton","splitbutton","progressbar","tree","combobox","combotree","combogrid","numberbox","validatebox","searchbox","numberspinner","timespinner","calendar","datebox","datetimebox","slider","layout","panel","datagrid","propertygrid","treegrid","tabs","accordion","window","dialog"];
    var arr = lessArr;
    arr.forEach(function(value,index){
        arr[index]=lessPath+value+".less"
    })
    return gulp.src(arr)
    .pipe(concat('hisui.min.less'))     //合并所有less文件到hisui.min.less
    .pipe(gulp.dest("less"))            //保存到less目录
    .pipe(less())                       //less编译
    //.pipe(minifycss())                  //压缩css
    .pipe(rename('hisui.css'))      //命名
    .pipe(gulp.dest("dist/css"))             //存到css目录
    .pipe(notify({message:'gen css success!'}));        //提示成功

});
// 把重写css的抽出来
gulp.task('css2', function() {
    var lessPath = "less/";
    // icon,easyui,..
    var arr = lessArr;
    arr.forEach(function(value,index){
        arr[index]=lessPath+value+".less"
    })
    //gulp.src("lib/easyui-1.3.6/themes/default/easyui.css").pipe(gulp.dest("dist/css"));
   return  gulp.src(arr)
    .pipe(concat('hisui.tmp.less'))     //合并所有less文件到hisui.min.less
    .pipe(gulp.dest("less"))            //保存到less目录
    .pipe(less())                       //less编译
    //.pipe(minifycss())                //压缩css
    .pipe(rename('hisui.css'))          //命名
    .pipe(gulp.dest("dist/css")) ;      //存到css目录   
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
    console.log("auto------");
    // 监听文件修改，当文件被修改则执行 less 任务
    //gulp.watch('less/**.less', ['less'])
});
//dist -> default
gulp.task('default',['js','css'],function(){
    //-----压缩css且保存成min.css
    //不放回调中,css与css-min只能运行一个
    gulp.src("dist/css/hisui.css")
    .pipe(minifycss())                  //压缩css
    .pipe(rename('hisui.min.css'))      //命名
    .pipe(gulp.dest("dist/css"))             //存到css目录
    .pipe(notify({message:'gen min css success!'}));        //提示成功

    //----压缩js且保存成min.js
    gulp.src("dist/js/jquery.hisui.js")
    .pipe(uglify({
        ie8:true
    }))
    .pipe(rename('jquery.hisui.min.js'))
    .pipe(gulp.dest("dist/js"))
    .pipe(notify({message:'gen min js success!'}));        //提示成功
});

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动css ,js ,css-min,js-min任务
gulp.task('ddd', ['css','js','css-min','js-min'], function() {
    //gulp.watch('*.less', ['less']);
})