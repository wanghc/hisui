(function ($) {
    function _init(target) {
        var status = $.data(target, "combogridmult");
        var opts = status.options;
        opts.originRequired = opts.required;
        var grid = status.grid;
        $(target).addClass("combogridmult-f").combo(opts);
        $(target).next().addClass("combogridmult");
        $(target).next().children('span').addClass('textbox-addon textbox-addon-right')
        if (opts.multiple){
            $(target).next().find('.combo-text').width(40);
        }
        var _905 = $(target).combo("panel");
        if (!grid) {
            grid = $("<table></table>").appendTo(_905);
            status.grid = grid;
        }
        grid.datagrid($.extend({}, opts, {
            border: false, fit: true, singleSelect: !opts.multiple,
            onLoadSuccess: function (data) {
                selectRecordByIdValues(target);
            },onClickRow:function(index,row){
                if (!opts.multiple){
                    _setValuesJson(target,[row]);
                    $(target).combo('hidePanel');
                    selectRecordByIdValues(target);
                }
            }, onSelect: function (index, row) {
                if (opts.multiple){
                    _addValueJson(target,row);
                    selectRecordByIdValues(target);
                }                
                opts.onSelect.call(this, index, row);
            }, onUnselect: function (index, row) {
                if (opts.multiple){
                    _removeValueJson(target,row[opts.idField],false);
                    selectRecordByIdValues(target);
                }                
                opts.onUnselect.call(this, index, row);
            }
        }));
        $.data(target, "combogrid").grid = grid;
    };
    function selectRecordByIdValues(target){
        $(target).combogridmult("panel").find('tr.datagrid-row').removeClass('datagrid-row-selected');
        var idValues = _getValue(target);
        var status = $.data(target,'combogridmult');
        var grid = status.grid;
        var opts = status.options;
        var data = grid.datagrid('getData');
        for (var i = 0; i < idValues.length; i++) {
            var vid = idValues[i];
            var index  = $.hisui.indexOfArray(data.rows,opts.idField,vid);
            // var row = $.hisui.getArrayItem(data.rows,opts.idField,vid);
            if (index>-1){
                // grid.datagrid("selectRecord", row);
                $(target).combogridmult("panel").find('tr[datagrid-row-index="'+index+'"]').addClass('datagrid-row-selected');
            }
        }
    }
    /**
     * 
     * @param {jqueryObject} jq 
     * @param {Array} valuesJson  [{id:1,text:'lisi'},{id:2,text:'zhangsan'}]
     */
    function _setValuesJson(jq,valuesJson){
        var status = $.data(jq, "combogridmult");
        var opts = status.options;
        $(jq).next().find(".combogridmult-label").remove();
        $(jq).next().find(".combo-text").val('');
        $(jq).next().find("combo-value").remove();
        for (var i = 0; i < valuesJson.length; i++) {
            var item = valuesJson[i];
            // var vid = item[opts.idField];
            // var text = item.text;
            _addValueJson(jq,item);
            // grid.datagrid("selectRecord", _912);
        }
    }
    /**
     * 
     * @param {jqueryObject} jq 
     * @param {object} valueObj {id:1,text:"lisi"}
     */
    function _addValueJson(jq,valueObj){
        var opts = $(jq).combogridmult('options');
        var vid = valueObj[opts.idField];
        if (!vid) return ;
        var cont = $(jq).next();
        var existLabel = cont.find("[data-value=\""+vid+"\"].combogridmult-label");
        if (existLabel.length>0) return ;
        var opts = $(jq).combogridmult('options'); //$.data(jq[0],"combogridmult").options;
        var input = cont.find(".combo-text");
        var txt = valueObj[opts.textField],txt2=txt;
        var st = "";
        if (opts.multiple){
            if (opts.itemWordSize && txt.length>opts.itemWordSize){
                txt2 = txt.substr(0,opts.itemWordSize)+"...";
            };
        }else{
            st = 'style="display:none;"'
        }
        var _11 = $('<span class="combogridmult-label" title="'+txt+'" data-value="'+vid+'" '+st+'></span>').insertBefore(input).html(txt2);
        if (opts.multiple){
            $("<a href=\"javascript:;\" class=\"combogridmult-remove\"></a>").appendTo(_11).click(function(){
                var vid = $(this).parent().data("value");
                _removeValueJson(jq,vid,true);
            });
            $(jq).combobox("setText","");
            if (opts.originRequired){
                if($(input).validatebox('options').required) $(input).validatebox('options').required = false;
                $(input).validatebox('validate');
                // $(jq).next().find('.combo-text').removeClass("validatebox-invalid");
                // $(jq).next().removeClass("combo-invalid");
            }
        }else{
            $(jq).combobox("setText",txt);
        }
    }
    function _removeValueJson(jq,vid,unselectRow){
        var opts = $(jq).combogridmult('options');
        $(jq).next().find(".combogridmult-label").each(function(){
            var _id = $(this).data("value");
            if(_id == vid){
                $(this).remove();
                if (!opts.multiple){
                    $(jq).combobox("setText","");
                }
            }
        });
        if (opts.originRequired && $(jq).next().find(".combogridmult-label").length==0){
            var input = $(jq).next().find(".combo-text");
            $(input).validatebox("options").required = true;       
            $(input).validatebox('validate');         
            // if ($(jq).next().find(".combogridmult-label").length==0) opts.required = true;
        }
        if(vid && unselectRow){
            var status = $.data(jq, "combogridmult");
            var data = status.grid.datagrid('getData');
            if (data && data.rows){
                var index = $.hisui.indexOfArray(data.rows, opts.idField ,vid);
                if (index>-1){
                    status.grid.datagrid("unselectRow",index);
                }                
            }
        }
    }
    /**
     * @param {jqueryObject} target 
     */
    function _getValue(target){
        var values = [];        
        $(target).next().find(".combogridmult-label").each(function(){
            var _id = $(this).data("value");
            values.push(_id);
        });
        return values;
    }
    function _getText(target){
        var texts = [];
        $(target).next().find(".combogridmult-label").each(function(){
            var txt = $(this).prop("title")||$(this).text();
            texts.push(txt);
        });
        return texts.join(',');
    };
    function nav(_90d, dir) {
        var _90e = $.data(_90d, "combogridmult");
        var opts = _90e.options;
        var grid = _90e.grid;
        var _90f = grid.datagrid("getRows").length;
        if (!_90f) {
            return;
        }
        var tr = opts.finder.getTr(grid[0], null, "highlight");
        if (!tr.length) {
            tr = opts.finder.getTr(grid[0], null, "selected");
        }
        var _910;
        if (!tr.length) {
            _910 = (dir == "next" ? 0 : _90f - 1);
        } else {
            var _910 = parseInt(tr.attr("datagrid-row-index"));
            _910 += (dir == "next" ? 1 : -1);
            if (_910 < 0) {
                _910 = _90f - 1;
            }
            if (_910 >= _90f) {
                _910 = 0;
            }
        }
        grid.datagrid("highlightRow", _910);

    };
    function doEnter(target) {
        var t = $(target);        
        var panel = t.combogridmult("panel");
        if (!panel.is(':visible')) return ; /*2020-07-27 面板隐藏时，回车选行或取消选行无效*/
        var status = $.data(target, "combogridmult");
        var opts = status.options;
        var grid = status.grid;
        var item = panel.find("tr.datagrid-row-over");
        if (item.length) {
            // var row =  grid.datagrid('options').finder.getRow(target, item);
            var index = item.attr("datagrid-row-index");
            var row = grid.datagrid('getData').rows[parseInt(index)];
            var value = row[opts.idField];
            opts.doEnterFlag = 1; //表示选中值
            if (opts.multiple) {
                if (item.hasClass("datagrid-row-selected")) {
                    // t.combogridmult("unselect", value);
                    grid.datagrid('options').onUnselect.call(grid, index, row);
                } else {
                    // t.combogridmult("select", value);
                    grid.datagrid('options').onSelect.call(grid, index, row);
                }
            } else {
                // t.combogridmult("select", value);
                grid.datagrid('options').onClickRow.call(grid, index, row);
            }
        }
        if (!opts.multiple) {
            t.combogridmult("hidePanel");
        }
    };
    $.fn.combogridmult = function (_921, _922) {
        if (typeof _921 == "string") {
            var _923 = $.fn.combogridmult.methods[_921];
            if (_923) {
                return _923(this, _922);
            } else {
                return this.combo(_921, _922);
            }
        }
        _921 = _921 || {};
        return this.each(function () {
            var _924 = $.data(this, "combogridmult");
            $.data(this, "combogrid",{grid:null});
            if (_924) {
                $.extend(_924.options, _921);
            } else {
                _924 = $.data(this, "combogridmult", { options: $.extend({}, $.fn.combogridmult.defaults, $.fn.combogridmult.parseOptions(this), _921) });
            }
            _init(this);
        });
    };
    $.fn.combogridmult.methods = {
        options: function (jq) {
            var _925 = jq.combo("options");
            return $.extend($.data(jq[0], "combogridmult").options, { originalValue: _925.originalValue, disabled: _925.disabled, readonly: _925.readonly });
        }, grid: function (jq) {
            return $.data(jq[0], "combogridmult").grid;
        }, setValuesJson: function (jq, valuesJson) {
            return jq.each(function () {
                _setValuesJson(this, valuesJson);
            });
        }, getValue:function(jq){
            var opts = $(jq).combogridmult('options');
            return _getValue(jq).join(opts.separator);
        
        // },
        // setValues:function(jq,values){
        //     var opt = $.data(jq[0], "combogridmult").options;
        //     var valuesJson = [];
        //     for(var i=0;i<values.length;i++){
        //         valuesJson.push({id:values[i],text:values[i]});
        //     }
        //     _setValuesJson(jq,valuesJson);
        },getValues:function(jq){
            return _getValue(jq);
        },getText:function(jq){
            return _getText(jq);
        },clear: function (jq) {
            return jq.each(function () {
                $(this).combogridmult("setValuesJson", []);
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).combogridmult("options");
                $(this).combogridmult("setValuesJson", opts.originalValueJson); // [{id:1,text:'lisi'},{id:2,text:'zhangsam'}]
            });
        }
    };
    $.fn.combogridmult.parseOptions = function (target) {
        var t = $(target);
        return $.extend({}, $.fn.combo.parseOptions(target), $.fn.datagrid.parseOptions(target), $.parser.parseOptions(target, ["idField", "textField", "mode"]));
    };
    $.fn.combogridmult.defaults = $.extend({}, $.fn.combo.defaults, $.fn.datagrid.defaults, {
        lazy:true,delay:400,queryOnFirstArrowDown:true,mode:'remote',fitColumns: true, pagination: true, 
        columns: [[
            {field:'id',title:'id',width:60},
            {field:'text',title:'描述',width:220},
            {field:'code',title:'代码',width:150}
        ]],panelWidth: 450,panelHeight:280,itemWordSize:null,method: 'post',
        separator:',',originalValue:'',loadMsg: 'loading', idField: 'id', textField: 'text',multiple:false, keyHandler: {
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
                var _t = this;
                var state = $.data(this, "combogridmult");
                var opts = state.options;
                var myCombo = $(this).next();
                var currentVal = myCombo.find('.combo-text').val();
                if (currentVal=='' && !opts.multiple){  // 删除输入框内容时，清除值
                    $(_t).combogridmult('clear');
                }
                setTimeout(function (){
                    // 增加延迟查询功能
                    if (state.timer) {
                        // console.log('请求太快，移除列队'+state.timer);
                        clearTimeout(state.timer);
                    }
                    state.timer = setTimeout(function () {                        
                        var currentVal = myCombo.find('.combo-text').val();
                        if (opts.mode == "remote") {
                            state.grid.datagrid("load", $.extend({}, opts.queryParams, { q: currentVal }));
                        }
                    }, opts.delay);
                    // console.log('把请求放入列队'+state.timer);
                },0);
                
                
            }
        }
    });
    $.extend($.fn.datagrid.defaults.editors, {
        combogridmult: {
            init: function (_696, opt) {
                var target = $('<input type="text">').appendTo(_696);
                target.combogridmult(opt);
                return target;
            }, destroy: function (target) {
                $(target).combo("destroy");
            }, getValue: function (target) {
                var opts = $(target).combogridmult("options");
                return $(target).combogridmult("getValues").join(opts.separator);
            }, setValue: function (target, val) {
                var opts = $(target).combogridmult("options");
                if (!!val){
                    if (typeof val == "string"){
                        $(target).combogridmult("setValues", val.split(opts.separator));
                    }else{
                        $(target).combogridmult("setValues", val);
                    }
                }
            }, setValueText:function(target,idValues,txts){
                if (!!idValues){
                    var opts = $(target).combogridmult("options");
                    if (typeof idValues == "string"){ idValues = idValues.split(opts.separator);}
                    if (typeof txts == "string"){ txts = txts.split(opts.separator);}
                    var list = [];
                    for(var i=0;i<idValues.length;i++){
                        var myitem = {};
                        myitem[opts.idField] = idValues[i];
                        myitem[opts.textField] = txts[i];
                        list.push(myitem);
                    }
                    $(target).combogridmult("setValuesJson",list);
                }
            }, resize: function (target, _69e) {
                $(target).combo("resize", _69e);
                var opts = $(target).combogridmult("options");
                if (opts.multiple){                
                    $(target).next().find('.combo-text').height(30);
                    $(target).next().find('.combo-text').width(_69e); // 30->列宽
                }
            }
        }
    })
})(jQuery);