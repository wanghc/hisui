(function ($) {
	/**
	 * 上下移动选择
	 * @param {*} target 
	 * @param {*} dir 
	 */
    function nav(target, dir) {
        var status = $.data(target, "lookup");
        var opts = status.options;
        var grid = status.grid;
        if (!grid) return ;
        var rowsTotal = grid.datagrid("getRows").length;
        if (!rowsTotal) { return;}
        var tr = opts.finder.getTr(grid[0], null, "highlight");
        if (!tr.length) {
            tr = opts.finder.getTr(grid[0], null, "selected");
        }
        var rowIndex;
        if (!tr.length) {
            rowIndex = (dir == "next" ? 0 : rowsTotal - 1);
        } else {
            var rowIndex = parseInt(tr.attr("datagrid-row-index"));
            rowIndex += (dir == "next" ? 1 : -1);
            if (rowIndex < 0) {
                rowIndex = rowsTotal - 1;
            }
            if (rowIndex >= rowsTotal) {
                rowIndex = 0;
            }
        }
        grid.datagrid("highlightRow", rowIndex);
        if (opts.selectOnNavigation) {   //selectOnNavigation 上下移动是否选择行 
            status.remainText = false;
            grid.datagrid("selectRow", rowIndex);
        }
    };
    /**
     * 翻页
     */
    function page(target,dir){
        var state = $.data(target, "lookup");
        var opts = state.options;
        var grid = state.grid;
        dir=(dir=="prev"?"prev":"next");
        var btn=grid.datagrid('getPager').find('.l-btn-icon.pagination-'+dir)
        if (btn.parents('.l-btn-disabled').length==0){
            btn.click();
            //grid.datagrid("highlightRow", 0);   //cryze  加上样式应在loadSuccess
        }
    }
    function _911(_912, _913, _914) {
        var _915 = $.data(_912, "lookup");
        var opts = _915.options;
        var grid = _915.grid;
        //var rows = grid.datagrid("getRows");
        var ss = [];
        //var _916 = $(_912).combo("getValues");
		//var _917 = $(_912).combo("options");
		var _917=opts;
        var _918 = _917.onChange;
        _917.onChange = function () {
        };
        grid.datagrid("clearSelections");
        for (var i = 0; i < _913.length; i++) {
            // 如果输入的是数字,且此时idField是表中整型ID时,getRowIndex会返回索引值,实际不需要选中
            // 如医嘱录入界面的频次,用法,用量等
            // 不是数字时才去通过idField查询
            // 在当前放大镜列表中去过滤idField没意义
            /*var _919 = grid.datagrid("getRowIndex", _913[i]);
            if (_919 >= 0) {
                grid.datagrid("selectRow", _919);
                ss.push(rows[_919][opts.textField]);
            } else {*/
                ss.push(_913[i]);
            //}
        }
        //$(_912).combo("setValues", _916);
        _917.onChange = _918;
        //$(_912).combo("setValues", _913);
        if (!_914) {
            var s = ss.join(opts.separator);
            if ($(_912).lookup("getText") != s) {
                $(_912).lookup("setText", s);
            }
        }
	};
	/**
	 * query 
	 */
    function doQuery(target, q, e) {
        var _91c = $.data(target, "lookup");
        var opts = _91c.options;
        var grid = _91c.grid;
        if (opts.isCombo && opts.enableNumberEvent){
            var key = e.keyCode;
            if (key<=57 && key >=49){ // 1=49
                //  第二个入参0表示第一行
                grid.datagrid("selectRow", key-49);
                return false;
            }else if (key<=105 && key>=97) {  // 小键盘1=97
                grid.datagrid("selectRow", key-97);
                return false;
            }
        }
        _91c.remainText = true;
        if (opts.multiple && !q) {
            _911(target, [], true);
        } else {
            _911(target, [q], true);
        }
        if (opts.mode == "remote") {
            grid.datagrid('loadData',{rows:[],total:0});  //重新从后台查数据前，清空数据
            grid.datagrid("clearSelections");
            grid.datagrid("load", $.extend({}, opts.queryParams, { q: q }));
        } else {
            if (!q) {
                return;
            }
            grid.datagrid("clearSelections").datagrid("highlightRow", -1);
            var rows = grid.datagrid("getRows");
            var qq = opts.multiple ? q.split(opts.separator) : [q];
            $.map(qq, function (q) {
                q = $.trim(q);
                if (q) {
                    $.map(rows, function (row, i) {
                        if (q == row[opts.textField]) {
                            grid.datagrid("selectRow", i);
                        } else {
                            if (opts.filter.call(target, q, row)) {
                                grid.datagrid("highlightRow", i);
                            }
                        }
                    });
                }
            });
        }
    };
    function isSelfGrid(state){
        var isShow = false;
        try{
            if (state.grid && state.grid.datagrid('options').lookup) isShow = true;
        }catch(e){}
        return isShow;
    }
	/**
	 * 回车事件
	 */
    function doEnter(target,e) {
        var state = $.data(target, "lookup");
        var opts = state.options;
        var grid = state.grid;
        var panel = $(target).comboq("panel"); //state.panel;
        if (isSelfGrid(state)&& panel.is(":visible")){  // 选中行
            var previousValue = grid.datagrid('options').queryParams.q;
            if (previousValue==$(target).lookup('getText')){
                // 查询值与输入框内值一样时，回车才是要选中值
                var tr = opts.finder.getTr(grid[0], null, "highlight");
                if (tr.length) {
                    var highlightRowIndex = parseInt(tr.attr("datagrid-row-index"));
                    grid.datagrid("selectRow", highlightRowIndex);
                    return;
                }
            }
            doQuery(target, $(target).lookup("getText"),e)           
        }else{
            $(target).comboq("showPanel");
        }
        return ;
    };
    function renderRowSummary(target,html){
        var cont = $($.hisui.globalContainerSelector);
        if (cont.is(":visible")){
            cont.find('.lookup-rowSummary').remove();
            var rowSummaryHeight = $('<div class="lookup-rowSummary">'+html+'</div>').appendTo(cont)._outerHeight();
            cont._outerHeight(cont.children('.datagrid')._outerHeight()+rowSummaryHeight);
            $.hisui.fixPanelTLWH();
        }
        return;
    }
    function initGrid (target){
        var state = $.data(target, "lookup");
        var opts = state.options;
        if (!isSelfGrid(state)){
            var grid = $(target).comboq('createPanelBody');
            if (!opts.columns && typeof opts.columnsLoader=="function") opts.columns=opts.columnsLoader(target);
            grid.datagrid($.extend({}, opts, {
                title:opts.gridTitle||"",
                rownumbers:true,lazy:true,
                border: false, fit: true, singleSelect: (!opts.multiple), 
                onLoadSuccess: function (data) {
                    if (state.panel.is(':visible')){
                        if (opts.forceFocus) {$(target).focus();}
                        grid.datagrid("highlightRow", 0);
                    }
                    opts.onLoadSuccess.apply(target, arguments);
                }, onSelect: function(index,rows){
                    var fn = opts.onChange;
                    opts.onChange = function () {};
                    if (rows){
                        $(target).comboq("setText",rows[opts.textField]);
                        $(target).comboq("setValue",rows[opts.idField]);
                    }
                    opts.onChange = fn ;
                    if (false !== opts.onSelect.call(this, index, rows)){  //返回false不隐藏
                        $(target).comboq("hidePanel");
                    }
                },
                onHighlightRow:function(index,row){
                    if ('function'==typeof opts.selectRowRender){
                        var html = opts.selectRowRender.call(this,row);
                        if (typeof html!='string') html='';
                        renderRowSummary(target,html);
                    }
                },
                clickDelay:200  // datagrid 的点击支持防抖 
                ,lookup:$(target) // 反向绑定 可以根据grid 获取到当前lookup元素
            }));
            //grid.datagrid('loadData',{total:0,rows:[]});  //这样会导致 使用本地数据data不生效  原本为解决显示共10行的问题已在datagrid初始化分页条解决 此处注释掉即可 cryze 2020-06-12
            state.grid = grid;
        }
        if (opts.minQueryLen<0){ opts.minQueryLen=0;}
        var q = $(target).lookup('getText');
        //if (q.length>=opts.minQueryLen){ //回车或点击图标强制查询
            state.grid.datagrid("load", $.extend({}, opts.queryParams, { q: q }));
        //}    
    }
    function init(target){
        var state = $.data(target, 'lookup');
		var opts = state.options;
		var _t = $(target);
        _t.addClass('lookup');
        _t.comboq($.extend({}, opts, {
            onShowPanel : function(){
                state.panel = $(target).comboq('panel');
               initGrid(target);
                opts.onShowPanel.call(target);
            }
        }));

    }
    $.fn.lookup = function (options, param) {
        if (typeof options == "string") {
            var method = $.fn.lookup.methods[options];
            if (method) {
                return method(this, param);
            } else {
				return $(this).comboq(options, param);
                
            }
        }
        options = options || {};
        options.originalValue = options.value;
        return this.each(function () {
            var state = $.data(this, "lookup");
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, "lookup", { options: $.extend({}, $.fn.lookup.defaults, $.fn.lookup.parseOptions(this), options) });
                init(this);
            }
        });
	};

    $.fn.lookup.methods = {
        options: function (jq) {
            return $.data(jq[0], "lookup").options;
        }, grid: function (jq) {   //此方法虽存在，但是获取的grid未必对应此lookup 因为所有的lookup都使用一个grid
            return $.data(jq[0], "lookup").grid;
        }, clear: function (jq) {
            return jq.each(function () {
                var state=$.data(this, 'lookup');
                if (state){
                    if (isSelfGrid(state))  $(this).lookup("grid").datagrid("clearSelections");  //表格只有当表格为当前lookup的表格才需要清除 cryze 2020-06-12
                    $(this).lookup("setText","");
                    $(this).lookup("setValue","");
                }
                /*
                var g = $(this).lookup("grid");
                if (g){
                    g.datagrid("clearSelections");
                    $(this).lookup("setText","");
                    $(this).lookup("setValue","");
                }*/
            });
        }
    };
    $.fn.lookup.parseOptions = function (target) {
        return $.extend({}, $.fn.comboq.parseOptions(target),$.fn.datagrid.parseOptions(target), $.parser.parseOptions(target, ["idField", "textField", "mode",{isCombo:"boolean",minQueryLen:'number'}]));
    };
    $.fn.lookup.defaults = $.extend({}, $.fn.comboq.defaults, $.fn.datagrid.defaults, {
        forceFocus:true, /*是否强制光标到放大镜输入框*/
        fixRowNumber:true,
        loadMsg: null, idField: null, textField: null, mode: "local", keyHandler: {
            up: function (e) {
                nav(this, "prev");
                e.preventDefault();
            }, down: function (e) {
                nav(this, "next");
                e.preventDefault();
            }, left: function (e) {
            }, right: function (e) {
            }, enter: function (e) {
                doEnter(this,e);
            }, query: function (q, e) {
                doQuery(this, q, e );
            },pageUp: function(e){
                page(this,"prev");
                e.preventDefault();
            },pageDown: function(e){
                page(this,"next");
                e.preventDefault();
            }
        }, filter: function (q, row) {
            var opts = $(this).lookup("options");
            return row[opts.textField].toLowerCase().indexOf(q.toLowerCase()) == 0;
        }, onShowPanel: function () {
        }, onHidePanel: function () {
        }, onChange: function (_899, _89a) {  //以前combo有，现在没有 考虑..
        },
        panelWidth: 350, panelHeight: 200, panelAlign: "left", selectOnNavigation: false, separator: ",",
        isCombo:false,minQueryLen:0,
        queryOnSameQueryString: true, //当查询条件相同时，在回车和点击按钮是否查询
        enableNumberEvent:false, /*是否启用数字选行功能，当按数字n键时选中第n行记录*/
        onBeforeShowPanel:function(){
        },selectRowRender:null // 应为function， 高亮一行数据时 显示提示内容html，修改成null不进入render方法
        
    });
})(jQuery);