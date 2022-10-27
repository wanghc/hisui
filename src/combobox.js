(function ($) {
    var COMBOBOX_SERNO = 0;
    function getRowIndex(target, value) {
        var state = $.data(target, "combobox");
        var opts = state.options;
        var data = state.data;
        for (var i = 0; i < data.length; i++) {
            if (data[i][opts.valueField] == value) {
                return i;
            }
        }
        return -1;
    };
    function scrollTo(target, value) {
        var opts = $.data(target, "combobox").options;
        var panel = $(target).combo("panel");
        var item = opts.finder.getEl(target, value);
        if (item.length) {
            if (item.position().top <= 0) {
                var h = panel.scrollTop() + item.position().top;
                panel.scrollTop(h);
            } else {
                if (item.position().top + item.outerHeight() > panel.height()) {
                    var h = panel.scrollTop() + item.position().top + item.outerHeight() - panel.height();
                    panel.scrollTop(h);
                }
            }
        }
    };
    function nav(target, dir) {
        var opts = $.data(target, "combobox").options;
        var panel = $(target).combobox("panel");
        var item = panel.children("div.combobox-item-hover");
        if (!item.length) {
            item = panel.children("div.combobox-item-selected");
        }
        item.removeClass("combobox-item-hover");
        var firstSelector = "div.combobox-item:visible:not(.combobox-item-disabled):first";
        var lastSelector = "div.combobox-item:visible:not(.combobox-item-disabled):last";
        if (!item.length) {
            item = panel.children(dir == "next" ? firstSelector : lastSelector);
        } else {
            if (dir == "next") {
                item = item.nextAll(firstSelector);
                if (!item.length) {
                    item = panel.children(firstSelector);
                }
            } else {
                item = item.prevAll(firstSelector);
                if (!item.length) {
                    item = panel.children(lastSelector);
                }
            }
        }
        if (item.length) {
            item.addClass("combobox-item-hover");
            var row = opts.finder.getRow(target, item);
            if (row) {
                scrollTo(target, row[opts.valueField]);
                if (opts.selectOnNavigation) {
                    select(target, row[opts.valueField]);
                }
            }
        }
    };
    /**
     *
     *select-row
     * @param {HTMLDocument} target
     * @param {String} value 希望选中的值
     */
    function select(target, value) {
        var opts = $.data(target, "combobox").options;
        var values = $(target).combo("getValues");
        if ($.inArray(value + "", values) == -1) {
            if (opts.multiple) {
                values.push(value);
            } else {
                values = [value];
            }
            setValues(target, values);
            opts.onSelect.call(target, opts.finder.getRow(target, value));
        }else{
            // else内全是新加 neer 20190322
            // 输入ohio,但列表中只有Ohio时,此时value有值,但显示为小写ohio了
            // 当前点击的行值===当前combobox的值,但text不对
            if (opts.multiple){
                
            }else{
                if (value){
                    var row = opts.finder.getRow(target, value);
                    if (row) { 
                        var s = row[opts.textField];
                        if(s!==$(target).combo("getText")){
                            $(target).combo("setText",s);
                        } 
                    }
                }
            }
        }
    };
    function unselect(target, value) {
        var opts = $.data(target, "combobox").options;
        var values = $(target).combo("getValues");
        var index = $.inArray(value + "", values);
        if (index >= 0) {
            values.splice(index, 1);
            setValues(target, values);
            opts.onUnselect.call(target, opts.finder.getRow(target, value));
        }
    };
    /** 
     * neer
     * 20190322
     * setValue方法
     * arg1
     * arg2 选中值
     * arg3 表示是否重置text(显示内容)
    */
    function setValues(target, values, remainText) {
        var opts = $.data(target, "combobox").options;
        var panel = $(target).combo("panel");
        panel.find("div.combobox-item-selected").removeClass("combobox-item-selected");
        var vv = [], ss = [],vvn=[];
        for (var i = 0; i < values.length; i++) {
            var v = values[i];
            var s = v;
            if (v!="" && v!=undefined && v!=null) {
                //多选时,如果setValue("")后会导致vv值变成[""],此时为选中一行,协同需求号:1194563
                // break后，vv的length与老逻辑中length不同, 导致编辑表格中有Combobox时,初始化时触发onChange获取getEditor方法出错。bill-jf-zyw
                if (opts.finder.getEl(target, v).length>0){
                    vvn.push(v);
                }
            }
            opts.finder.getEl(target, v).addClass("combobox-item-selected");
            var row = opts.finder.getRow(target, v);
            if (row) { 
                s = row[opts.textField];
            }else{
                //2019-1-26.neer 测试发现 remote时,输入查询条件查询不出结果时,getValue()返回的是查询条件即为getText()的值
                // row为undefined时,清空值
                //if (opts.forceValidValue) {v = "";}
            }
            vv.push(v);
            ss.push(s);
        }
        $(target).combo("setValues", vv);
        if (!remainText) {
            $(target).combo("setText", ss.join(opts.separator));
        }
        if(opts.rowStyle && opts.rowStyle=='checkbox'){ 
            //wanghc 2018-10-17 rowStyle=checkbox 选中数据行时,判断是不是应该选中全选勾
            var tmpLen = $.data(target, "combobox").data.length;
            if (vvn.length==tmpLen){
                panel.parent().children("._hisui_combobox-selectall").addClass("checked");
            }else{
                panel.parent().children("._hisui_combobox-selectall").removeClass("checked");
            }
        }
    };
    function loadData(target, data, remainText) {
        var state = $.data(target, "combobox");
        var opts = state.options;
        state.data = opts.loadFilter.call(target, data);
        state.groups = [];
        data = state.data;
        var selected = $(target).combobox("getValues");
        var dd = [];
        var group = undefined;
        var maxLengthTextFiled = "01234567890123456789",textMaxLength=0;
        function fucCheckLength(strTemp) {
            if ("undefined" == typeof strTemp) { return 1}
            var i,sum;
            sum=0;
            for(i=0;i<strTemp.length;i++)
            {
                if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255))
                sum=sum+1;
                else
                sum=sum+2;
            }
            return sum;
        }
        strFontWidth = function(str,font) {
            var f = font || '14px Microsoft Yahei',
            o = $('<div>' + str + '</div>')
                .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
                .appendTo($('body')),
            w = o.width();
            o.remove();
            return w;
        }
        var myItemStyle="";
        /*
        2021-01-26 `combobox`某行数据超长后，鼠标悬浮时背景色不完整问题修复 :sparkles:
        下拉框内容超过面板时应该折行
        不要指定宽度
        for(var i = 0; i < data.length; i++){
            var row = data[i];
            var s = row[opts.textField];
            //超过10个字时宽度才可能超过panel
            if (fucCheckLength(maxLengthTextFiled)<fucCheckLength(s)) {
                maxLengthTextFiled = s;
                textMaxLength = strFontWidth(maxLengthTextFiled);
            }
        }
        
        if (textMaxLength > $(target).combo("textbox").width()) {
            myItemStyle = 'style="width:'+(parseInt(textMaxLength)+1)+'px;"';
        }*/
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var v = row[opts.valueField] + "";
            var s = row[opts.textField];
            var g = row[opts.groupField];
            if (g) {
                if (group != g) {
                    group = g;
                    state.groups.push(g);
                    dd.push("<div id=\"" + (state.groupIdPrefix + "_" + (state.groups.length - 1)) + "\" class=\"combobox-group\">");
                    dd.push(opts.groupFormatter ? opts.groupFormatter.call(target, g) : g);
                    dd.push("</div>");
                }
            } else {
                group = undefined;
            }
            var cls = "combobox-item" + (row.disabled ? " combobox-item-disabled" : "") + (g ? " combobox-gitem" : "");
            dd.push("<div id=\"" + (state.itemIdPrefix + "_" + i) + "\" "+myItemStyle+" class=\"" + cls + "\">");
            dd.push(opts.formatter ? opts.formatter.call(target, row) : s);
            dd.push("</div>");
            if (row["selected"] && $.inArray(v, selected) == -1) {
                selected.push(v);
            }
        }
        $(target).combo("panel").html(dd.join(""));
        if (opts.multiple) {
            setValues(target, selected, remainText);
            // wanghc 2018-10-17 checkbox all select
            if (opts.rowStyle && opts.rowStyle=='checkbox'){
                
                var myPanelJObj = $(target).combo("panel");
                myPanelJObj.closest('.combo-p').children('._hisui_combobox-selectall').remove();
                var myPanelWidth = myPanelJObj.width() - 5; //5是padding-left
                var myallselJObj = $('<div style="width:'+myPanelWidth+'px" class="_hisui_combobox-selectall"><span class="combobox-checkbox"></span>'+opts.selectAllBtnDesc+'</div>')
                .bind('mouseenter',function(e){
                    $(e.target).closest("div._hisui_combobox-selectall").addClass("combobox-selectall-hover");
                    e.stopPropagation();
                }).bind('mouseleave',function(e){
                    $(e.target).closest("div._hisui_combobox-selectall").removeClass("combobox-selectall-hover");
                    e.stopPropagation();
                }).bind('click',function(e){
                    var _t = $(this);
                    if (_t.hasClass('checked')){
                        _t.removeClass('checked');
                        $(target).combobox("setValues",[]);
                    }else{
                        var tmpArr = [];
                        _t.addClass('checked');
                        //全选为当前 可见的
                        var panel = $(target).combo('panel');
                        panel.find('div.combobox-item').filter(":visible").each(function(){
                            var item = $(this);
                            if (!item.length || item.hasClass("combobox-item-disabled")) {
                                return;
                            }
                            var row = opts.finder.getRow(target, item);
                            if (!row) {
                                return;
                            }
                            var value = row[opts.valueField];
                            tmpArr.push(value);
                        });
                        // $.map(data,function(v){
                        //     tmpArr.push(v[opts.valueField]);
                        // });
                        $(target).combobox("setValues",tmpArr);
                    }
                    if (opts.onAllSelectClick){
                        opts.onAllSelectClick.call(target,e);
                    } 
                });
                if (opts.allSelectButtonPosition=='bottom'){
                    //myallselJObj.appendTo($(target).combo("panel"));
                    myallselJObj.insertAfter(myPanelJObj);
                    myallselJObj.parent().addClass('bbtm');
                }else{
                    //myallselJObj.prependTo($(target).combo("panel"));
                    myallselJObj.insertBefore(myPanelJObj);
                    myallselJObj.parent().addClass('btop');
                }
            }
        } else {
            setValues(target, selected.length ? [selected[selected.length - 1]] : [], remainText);
        }
        opts.onLoadSuccess.call(target, data);
    };
    function request(target, url, param, remainText) {
        var opts = $.data(target, "combobox").options;
        if (url) {
            opts.url = url;
        }
        param = param || {};
        if (opts.onBeforeLoad.call(target, param) == false) {
            return;
        }
        opts.loader.call(target, param, function (data) {
            loadData(target, data, remainText);
        }, function () {
            opts.onLoadError.apply(this, arguments);
        });
    };
    function doQuery(target, q) {
        var state = $.data(target, "combobox");
        var opts = state.options;
        if (opts.multiple && !q) {
            setValues(target, [], true);
        } else {
            setValues(target, [q], true);
        }
        if (opts.mode == "remote") {
            request(target, null, { q: q }, true);
        } else {
            var panel = $(target).combo("panel");
            panel.find("div.combobox-item-selected,div.combobox-item-hover").removeClass("combobox-item-selected combobox-item-hover");
            panel.find("div.combobox-item,div.combobox-group").hide();
            var data = state.data;
            var vv = [];
            var qq = opts.multiple ? q.split(opts.separator) : [q];
            $.map(qq, function (q) {
                q = $.trim(q);
                var group = undefined;
                for (var i = 0; i < data.length; i++) {
                    var row = data[i];
                    if (opts.filter.call(target, q, row)) {
                        var v = row[opts.valueField];
                        var s = row[opts.textField];
                        var g = row[opts.groupField];
                        var item = opts.finder.getEl(target, v).show();
                        if (s.toLowerCase() == q.toLowerCase()) {
                            vv.push(v);
                            item.addClass("combobox-item-selected");
                            //opts.onSelect.call(target, opts.finder.getRow(target, v));
                        }
                        if (opts.groupField && group != g) {
                            $("#" + state.groupIdPrefix + "_" + $.inArray(g, state.groups)).show();
                            group = g;
                        }
                    }
                }
            });
            setValues(target, vv, true);
            // wanghc 2018-11-7 输入骨科不能进入onSelect事件，输入骨后选骨科可以进入onSelect问题
            if(vv.length>0) { opts.onSelect.call(target, opts.finder.getRow(target, vv[vv.length-1]));}
        }
    };
    function doEnter(target) {
        var t = $(target);
        var opts = t.combobox("options");
        var panel = t.combobox("panel");
        if (!panel.is(':visible')) return ; /*2020-07-27 面板隐藏时，回车选行或取消选行无效*/
        var item = panel.children("div.combobox-item-hover");
        if (item.length) {
            var row = opts.finder.getRow(target, item);
            var value = row[opts.valueField];
            opts.doEnterFlag = 1; //表示选中值
            if (opts.multiple) {
                if (item.hasClass("combobox-item-selected")) {
                    t.combobox("unselect", value);
                } else {
                    t.combobox("select", value);
                }
            } else {
                t.combobox("select", value);
            }
        }
        var vv = [];
        $.map(t.combobox("getValues"), function (v) {
            if (getRowIndex(target, v) >= 0) {
                vv.push(v);
            }
        });
        /*当配匹值为空且enterNullValueClear为flase时不清空输入框。add wanghc 2018-5-22*/
        if ((vv.length == 0 && !opts.enterNullValueClear) || (opts.multiple && !opts.enterNullValueClear)) {
            
        }else{
            t.combobox("setValues", vv);
        }
        if (!opts.multiple) {
            t.combobox("hidePanel");
        }
    };
    /*验证不成功时,清除下拉框的值*/
    function clearInvalidValue(target) {
        $(target).combobox("textbox").val("");
        var comboStatus = $.data(target, "combo");
        comboStatus.previousValue = "";
        doQuery(target, "");
    }
    /** 默认的面板隐藏事件方法，验证值是否正确 */
    var onHidePanelDefaultHandler = function (target) {
        var eventEl = null;
        if (window.event) {
            eventEl = window.event.target || window.event.srcElement || null;
        }
        if (eventEl && (eventEl.className||"").indexOf("combobox-item") > -1) { // 如果是手动选行，不去校验值。会诊表格中下拉框使用了setValue(text)赋值
            return;
        }
        var opts = $(target).combobox('options');
        if (opts.doEnterFlag == 1) {/*回车选中行*/ opts.doEnterFlag == 0; return;}
        var val = $(target).combobox("getValue");
        if (val == undefined || val == "" || val == null) {
            clearInvalidValue(target);
        } else {
            
            var isContain = 0;
            var _d = $(target).combobox('getData');
            for (var i = 0; i < _d.length; i++) {
                if (_d[i][opts.valueField] == val) {
                    isContain = 1;
                }
            }
            if (0 == isContain) {
                clearInvalidValue(target);
            }
        }
    };
    function create(target) {
        var state = $.data(target, "combobox");
        var opts = state.options;
        COMBOBOX_SERNO++;
        state.itemIdPrefix = "_hisui_combobox_i" + COMBOBOX_SERNO;
        state.groupIdPrefix = "_hisui_combobox_g" + COMBOBOX_SERNO;
        $(target).addClass("combobox-f");
        var onHidePanelHandler = opts.onHidePanel;
        if (opts && opts.blurValidValue){
            opts.forceValidValue = true; //这时强制设置值检查
            if (opts.onHidePanel) {
                var _oldOnHidePanel = opts.onHidePanel;
            }
            onHidePanelHandler = function () {
                var _myt = this;
                if ("function"==typeof _oldOnHidePanel) _oldOnHidePanel.call(_myt);
                onHidePanelDefaultHandler(_myt);
            }
        }
        $(target).combo($.extend({}, opts, {
            onShowPanel: function () {
                $(target).combo("panel").find("div.combobox-item,div.combobox-group").show();
                scrollTo(target, $(target).combobox("getValue"));
                opts.onShowPanel.call(target);
            },
            onHidePanel:onHidePanelHandler
        }));
        $(target).combo("panel").unbind().bind("mouseover", function (e) {
            $(this).children("div.combobox-item-hover").removeClass("combobox-item-hover");
            var item = $(e.target).closest("div.combobox-item");
            if (!item.hasClass("combobox-item-disabled")) {
                item.addClass("combobox-item-hover");
            }
            e.stopPropagation();
        }).bind("mouseout", function (e) {
            $(e.target).closest("div.combobox-item").removeClass("combobox-item-hover");
            e.stopPropagation();
        }).bind("click", function (e) {
            var item = $(e.target).closest("div.combobox-item");
            if (!item.length || item.hasClass("combobox-item-disabled")) {
                return;
            }
            var row = opts.finder.getRow(target, item);
            if (!row) {
                return;
            }
            var value = row[opts.valueField];
            if (opts.multiple) {
                if (item.hasClass("combobox-item-selected")) {
                    unselect(target, value);
                } else {
                    select(target, value);
                }
            } else {
                // 增加allowNull配置,if是增加的 20190218-neer 
                if (opts.allowNull && item.hasClass("combobox-item-selected")){
                    unselect(target, value);
                }else{
                    select(target, value);
                }
                // 2020-08-19 无论是选中与取消选中 都隐藏
                $(target).combo("hidePanel");
            }
            e.stopPropagation();
        });
    };
    $.fn.combobox = function (options, param) {
        if (typeof options == "string") {
            var method = $.fn.combobox.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.combo(options, param);
            }
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "combobox");
            if (state) {
                $.extend(state.options, options);
                create(this);
            } else {
                state = $.data(this, "combobox", { options: $.extend({}, $.fn.combobox.defaults, $.fn.combobox.parseOptions(this), options), data: [] });
                create(this);
                var data = $.fn.combobox.parseData(this);
                if (data.length) {
                    loadData(this, data);
                }
            }
            if (state.options.data) {
                loadData(this, state.options.data);
            }
            request(this);
        });
    };
    $.fn.combobox.methods = {
        options: function (jq) {
            var copts = jq.combo("options");
            return $.extend($.data(jq[0], "combobox").options, { originalValue: copts.originalValue, disabled: copts.disabled, readonly: copts.readonly });
        }, getData: function (jq) {
            return $.data(jq[0], "combobox").data;
        }, setValues: function (jq, values) {
            return jq.each(function () {
                setValues(this, values);
            });
        }, setValue: function (jq, value) {
            return jq.each(function () {
                setValues(this, [value]);
            });
        }, clear: function (jq) {
            return jq.each(function () {
                $(this).combo("clear");
                var panel = $(this).combo("panel");
                panel.find("div.combobox-item-selected").removeClass("combobox-item-selected");
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).combobox("options");
                if (opts.multiple) {
                    $(this).combobox("setValues", opts.originalValue);
                } else {
                    $(this).combobox("setValue", opts.originalValue);
                }
            });
        }, loadData: function (jq, data) {
            return jq.each(function () {
                loadData(this, data);
            });
        }, reload: function (jq, url) {
            return jq.each(function () {
                request(this, url);
            });
        }, select: function (jq, value) {
            return jq.each(function () {
                select(this, value);
            });
        }, unselect: function (jq, value) {
            return jq.each(function () {
                unselect(this, value);
            });
        }
    };
    $.fn.combobox.parseOptions = function (target) {
        var t = $(target);
        return $.extend({}, $.fn.combo.parseOptions(target), $.parser.parseOptions(target, ["valueField", "textField", "groupField", "mode", "method", "url"]));
    };
    $.fn.combobox.parseData = function (target) {
        var data = [];
        var opts = $(target).combobox("options");
        $(target).children().each(function () {
            if (this.tagName.toLowerCase() == "optgroup") {
                var group = $(this).attr("label");
                $(this).children().each(function () {
                    _parseItem(this, group);
                });
            } else {
                _parseItem(this);
            }
        });
        return data;
        function _parseItem(el, group) {
            var t = $(el);
            var row = {};
            row[opts.valueField] = t.attr("value") != undefined ? t.attr("value") : t.text();
            row[opts.textField] = t.text();
            row["selected"] = t.is(":selected");
            row["disabled"] = t.is(":disabled");
            if (group) {
                opts.groupField = opts.groupField || "group";
                row[opts.groupField] = group;
            }
            data.push(row);
        };
    };
    $.fn.combobox.defaults = $.extend({}, $.fn.combo.defaults, {
        forceValidValue:false,allowNull:false,selectAllBtnDesc:'select/unselect',
        allSelectButtonPosition:'top',rowStyle:'',valueField: "value", textField: "text", groupField: null, groupFormatter: function (group) {
            return group;
        }, mode: "local", method: "post", url: null, data: null, keyHandler: {
            up: function (e) {
                nav(this, "prev");
                e.preventDefault();
            }, down: function (e) {
                nav(this, "next");
                e.preventDefault();
            }, left: function (e) {
            }, right: function (e) {
            }, enter: function (e) {
                doEnter(this);
            }, query: function (q, e) {
                doQuery(this, q);
            }
        }, filter: function (q, row) {
            var opts = $(this).combobox("options");
            return row[opts.textField].toLowerCase().indexOf(q.toLowerCase()) == 0;
        }, formatter: function (row) {
            var opts = $(this).combobox("options");
            if (opts.rowStyle && opts.rowStyle=='checkbox'){
                return "<span class='combobox-checkbox'></span>"+row[opts.textField];
            }else{
                return row[opts.textField];
            }
        }, loader: function (param, success, error) {
            var opts = $(this).combobox("options");
            if (!opts.url) {
                return false;
            }
            $.ajax({
                type: opts.method, url: opts.url, data: param, dataType: "json", success: function (data) {
                    success(data);
                }, error: function () {
                    error.apply(this, arguments);
                }
            });
        }, loadFilter: function (data) {
            return data;
        }, finder: {
            getEl: function (target, value) {
                var index = getRowIndex(target, value);
                var id = $.data(target, "combobox").itemIdPrefix + "_" + index;
                return $("#" + id);
            }, getRow: function (target, p) {
                var state = $.data(target, "combobox");
                var index = (p instanceof jQuery) ? p.attr("id").substr(state.itemIdPrefix.length + 1) : getRowIndex(target, p);
                return state.data[parseInt(index)];
            }
        }, onBeforeLoad: function (param) {
        }, onLoadSuccess: function () {
        }, onLoadError: function () {
        }, onSelect: function (record) {
        }, onUnselect: function (record) {
        }
    });
})(jQuery);