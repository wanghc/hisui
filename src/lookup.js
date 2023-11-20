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
        var panel = $(target).comboq("panel"); //state.panel;
        if (opts.isCombo && opts.enableNumberEvent){
            var key = e.keyCode;
            if (isSelfGrid(_91c)&& panel.is(":visible")){  //只有显示状态下才是选行,否则为查询
                var curtotals = grid.datagrid('getRows');
                if (curtotals && curtotals.length>0){
                    var selRowNo = -1;
                    if (key<=57 && key >=49){ // 1=49 中文输入法下key=229 ime-mode:disabled
                        selRowNo = key-49;                        
                    }else if (key<=105 && key>=97) {  // 小键盘1=97
                        selRowNo = key-97;
                    }
                    if (selRowNo>-1 && curtotals.length>selRowNo){ 
                        //  第二个入参0表示第一行
                        grid.datagrid("selectRow", selRowNo);
                        return false;
                    }
                }
            }
        }
        _91c.remainText = true;
        if (opts.multiple && !q) {
            _911(target, [], true);
        } else {
            _911(target, [q], true);
        }
        if (opts.mode == "remote") {
            // [3770017] lookup回车会调用onLoadSuccess2次，其中第一次是空数据问题。暂时注释下面一行
            //grid.datagrid('loadData',{rows:[],total:0});  //重新从后台查数据前，清空数据
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
        } else {
            // 医嘱录入--规格放大镜没隐藏时，光标跳到频次再回车时,应该先隐藏上一个规格放大镜
            $(target).comboq("hidePanel");
            $(target).comboq("showPanel");
        }
        return ;
    };
    /**
     * 设置弹出面板与列表高度
     * @param {JQueryObject} cont 
     * @param {JQueryObject} grd 
     * @param {Number} contHeight 
     * @param {Number} grdHeight 
     */
    function resizeGridAndCont(cont, grd, contHeight, grdHeight) {
        if (!!contHeight) {
            cont._outerHeight(contHeight);
        } else {
            contHeight = cont._outerHeight();
        }
        if (!grdHeight) {
            grdHeight = contHeight;
        }
        var grdWidth = cont._outerWidth();
        grd.datagrid('resize', {height:grdHeight,width:grdWidth});
    }
    /**
     * 计算上下空白区域计算出显示层高度
     * @param {Document} target            放大镜输入框元素
     * @param {JQueryObject} grd               表格对象
     * @param {Number} rowSummaryHeight  最后一行与翻页条留白高度
     * @returns 
     */
    function getFixContHeight(target, grd, rowSummaryHeight) {
        var t = $(target);
        var state = $.data(target, "lookup");
        var opts = state.options;
        var cont = $($.hisui.globalContainerSelector);
        if (!cont.is(":visible")) return;
        var panelHeight = cont._outerHeight();
        if (opts.panelHeightFix) {
            var ch = document.documentElement.clientHeight; /*可见高度*/
            var _tOffset = t.offset();
            var topBlankHeight = _tOffset.top - document.documentElement.scrollTop;
            var downBlankHeight = ch - topBlankHeight - t._outerHeight();
            if ( topBlankHeight > downBlankHeight) { //上面空间大于下面
                panelHeight = topBlankHeight;
            } else {
                panelHeight = downBlankHeight;
            }
            if (grd.datagrid('getPanel').find('.datagrid-view2 .datagrid-btable').eq(0).length>0) {
                var rowTotalHeight = grd.datagrid('getPanel').find('.datagrid-view2 .datagrid-btable').eq(0)[0].scrollHeight + rowSummaryHeight;
                // 面板不用太高, 只要能显示全列表中所有数据即可
                // 74=header+pagingbar ，补上后面减的18
                // 
                // pagingbar出现换行 + 30
                var paddingPanelHeight = 36 + 18; // datagrid-header的高度
                var v2body = grd.datagrid('getPanel').find('.datagrid-view2 .datagrid-body');
                if (v2body.length > 0 && v2body[0].scrollWidth != v2body[0].clientWidth) {
                    paddingPanelHeight += 18;  // 出现横向滚动条+16 
                }
                var myPager = grd.datagrid('getPanel').find('.datagrid-pager');
                if (myPager.length>0) {
                    paddingPanelHeight += myPager._outerHeight();
                }
                if (panelHeight > (rowTotalHeight +paddingPanelHeight)) { panelHeight = rowTotalHeight + paddingPanelHeight }
            }
            if (panelHeight > opts.panelMaxHeight) { panelHeight = opts.panelMaxHeight; }
            if (panelHeight < opts.panelMinHeight) { panelHeight = opts.panelMinHeight; }
            panelHeight = panelHeight - 18; //与边留18空隙
        }
        return panelHeight;
    }
    function renderRowSummary(target,html,grd){
        var cont = $($.hisui.globalContainerSelector);
        if (cont.is(":visible")){
            var state = $.data(target, "lookup");
            var opts = state.options;
            if (opts.rowSummaryHeight>0 && cont.find('.lookup-rowSummary').length > 0) { // cont.find('.lookup-rowSummary').remove();
                cont.find('.lookup-rowSummary').children().remove();
                $(html).appendTo($('.lookup-rowSummary'));
            } else {
                cont.find('.lookup-rowSummary').remove();
                var myRowSummaryObj = $('<div class="lookup-rowSummary">' + html + '</div>').appendTo(cont);
                if (opts.rowSummaryHeight == 0) opts.rowSummaryHeight = myRowSummaryObj._outerHeight();                
                $('.lookup-rowSummary').css('height', opts.rowSummaryHeight).css('overflow','auto');
            }
            //var rowSummaryHeight = $('<div class="lookup-rowSummary">' + html + '</div>').prependTo(cont)._outerHeight();
            var fixHeight = getFixContHeight(target, grd, opts.rowSummaryHeight);
            var grdHeight = fixHeight - opts.rowSummaryHeight;
            resizeGridAndCont(cont,grd,fixHeight,grdHeight);
            //cont._outerHeight(cont.children('.datagrid')._outerHeight()+rowSummaryHeight);
            $.hisui.fixPanelTLWH();
        }
        return;
    }
    function initGrid (target){
        var state = $.data(target, "lookup");
        var opts = state.options;
        if ('function' == typeof opts.selectRowRender) {
            opts.fit = false; // grid的高度要实时变化 
            opts.panelHeightFix = true;
        } else { opts.fit = true; }
        if (!isSelfGrid(state)){
            var grid = $(target).comboq('createPanelBody');
            if (!opts.columns && typeof opts.columnsLoader=="function") opts.columns=opts.columnsLoader(target); 
            // datagird中btoolbar属性是'#myid'时，第一次初始化后,body中#myid-div就没了，随着datagrid关闭,#myid-div就没有了
            // 第二次datagrid中就没有btoolbar条件了 [4068557]
            if ('undefined' == typeof $LOOKUPBTOOLBAR) $LOOKUPBTOOLBAR = {};
            if ('string'==typeof opts.btoolbar &&  opts.btoolbar!="" && 'undefined' == typeof $LOOKUPBTOOLBAR[opts.btoolbar]) {
                $LOOKUPBTOOLBAR[opts.btoolbar] = $(opts.btoolbar)[0].outerHTML;  // 缓存html, 再次初始化datagrid-btoolbar时需要使用
            }
            if ($(opts.btoolbar).length==0 && $LOOKUPBTOOLBAR[opts.btoolbar]!="") {
                opts.btoolbar = $LOOKUPBTOOLBAR[opts.btoolbar];
            }
            grid.datagrid($.extend({}, opts, {
                title:opts.gridTitle||"",
                width:400,height:300,
                rownumbers:true,lazy:true,
                border: false, singleSelect: (!opts.multiple), 
                onBeforeLoad: function (param) {
                    var cont = $($.hisui.globalContainerSelector);
                    resizeGridAndCont(cont, grid);
                    opts.onBeforeLoad.apply(target, arguments);
                },
                onLoadSuccess: function (data) {
                    if (state.panel.is(':visible')){
                        if (opts.forceFocus) {$(target).focus();}
                        var fixHeight = getFixContHeight(target, grid, 0);
                        resizeGridAndCont($($.hisui.globalContainerSelector), grid, fixHeight, fixHeight);
                        // HISUI lookup插件当加载数据成功后高亮第一行时，需触发selectRowRender 事件 
                        // 需求号：2723790 调整顺序
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
                onHighlightRow: function (index, row) {
                    if ('function'==typeof opts.selectRowRender){
                        var html = opts.selectRowRender.call(this,row);
                        if (typeof html!='string') html='';
                        renderRowSummary(target,html,grid);
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
        panelHeightFix: false, /*通过界面的可见高度来自适应放大镜的高度*/
        panelMaxHeight:500,
        panelMinHeight:160,
        singleRequest:true,
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
        }, selectRowRender: null, // 应为function， 高亮一行数据时 显示提示内容html，修改成null不进入render方法
        rowSummaryHeight:0
    });
})(jQuery);