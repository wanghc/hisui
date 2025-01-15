(function ($) {
    function _902(_903) {
        var _904 = $.data(_903, "combogrid");
        var opts = _904.options;
        var grid = _904.grid;
        $(_903).addClass("combogrid-f").combo(opts);
        var _905 = $(_903).combo("panel");
        if (!grid) {
            grid = $("<table></table>").appendTo(_905);
            _904.grid = grid;
        }
        if(opts.lazy && $(_903).combo("getValue")=="") $(_903).combo('options').queryOnFirstArrowDown=true;  //cryze 
        grid.datagrid($.extend({}, opts, {
            border: false, fit: true, singleSelect: (!opts.multiple), onLoadSuccess: function (data) {
                var _906 = $(_903).combo("getValues");
                var _907 = opts.onSelect;
                opts.onSelect = function () {
                };
                _setValues(_903, _906, _904.remainText);
                opts.onSelect = _907;
                opts.onLoadSuccess.apply(_903, arguments);
            }, onClickRow: _908, onSelect: function (_909, row) {
                _90a();
                opts.onSelect.call(this, _909, row);
            }, onUnselect: function (_90b, row) {
                _90a();
                opts.onUnselect.call(this, _90b, row);
            }, onSelectAll: function (rows) {
                _90a();
                opts.onSelectAll.call(this, rows);
            }, onUnselectAll: function (rows) {
                if (opts.multiple) {
                    _90a();
                }
                opts.onUnselectAll.call(this, rows);
            },lazy:(opts.lazy && $(_903).combo("getValue")=="")   //cryze 要让datagrid不要load数据  初始化时没load数据，那么第一次点击下拉按钮 应该load数据 事件绑定应该是在combo上的
        }));
        function _908(_90c, row) {
            _904.remainText = false;
            _90a();
            if (!opts.multiple) {
                $(_903).combo("hidePanel");
            }
            opts.onClickRow.call(this, _90c, row);
        };
        function _90a() {
            var rows = grid.datagrid("getSelections");
            var vv = [], ss = [];
            for (var i = 0; i < rows.length; i++) {
                vv.push(rows[i][opts.idField]);
                ss.push(rows[i][opts.textField]);
            }
            if (!opts.multiple) {
                $(_903).combo("setValues", (vv.length ? vv : [""]));
            } else {
                $(_903).combo("setValues", vv);
            }
            if (!_904.remainText) {
                $(_903).combo("setText", ss.join(opts.separator));
            }
        };
    };
    function nav(_90d, dir) {
        var _90e = $.data(_90d, "combogrid");
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
        if (opts.selectOnNavigation) {
            _90e.remainText = false;
            grid.datagrid("selectRow", _910);
        }
    };
    function _setValues(_912, _913, _914) {
        var _915 = $.data(_912, "combogrid");
        var opts = _915.options;
        var grid = _915.grid;
        var rows = grid.datagrid("getRows");
        var ss = [];
        var _916 = $(_912).combo("getValues");
        var _917 = $(_912).combo("options");
        var _918 = _917.onChange;
        _917.onChange = function () {
        };
        //if (_913=="") _913=[]; // wanghc setValues("")---error
        if (_913==="") _913=[]; // cryze [""]=="" 返回值是true 2019-06-13
        var vv = $.map(_913, function (_b62) {  //cryze 2018-7-24
            return String(_b62);
        });
        var _b64 = $.grep(grid.datagrid("getSelections"), function (row, _b65) {  //cryze 2018-7-24  先选中，然后翻页，显示成输入框显示成value的问题
            return $.inArray(String(row[opts.idField]), vv) >= 0;
        });
        grid.datagrid("clearSelections");
        grid.data("datagrid").selectedRows = _b64;  //cryze 2018-7-24
        for (var i = 0; i < _913.length; i++) {
            var _919 = grid.datagrid("getRowIndex", _913[i]);
            if (_919 >= 0) {
                grid.datagrid("selectRow", _919);
                ss.push(rows[_919][opts.textField]);
            } else if(_b67(_913[i], _b64)){   //cryze 2018-7-24 
                ss.push(_b67(_913[i], _b64));
            }else {
                ss.push(_913[i]);
            }
        }
        $(_912).combo("setValues", _916);
        _917.onChange = _918;
        $(_912).combo("setValues", _913);
        if (!_914) {
            var s = ss.join(opts.separator);
            if ($(_912).combo("getText") != s) {
                $(_912).combo("setText", s);
            }
        }
        function _b67(_b68, a) {  //cryze 2018-7-24
            var item = $.hisui.getArrayItem(a, opts.idField, _b68);
            return item ? item[opts.textField] : undefined;
        };
    };
    function _91a(_91b, q) {
        var _91c = $.data(_91b, "combogrid");
        var opts = _91c.options;
        var grid = _91c.grid;
        _91c.remainText = true;
        if (opts.multiple && !q) {
            _setValues(_91b, [], true);
        } else {
            _setValues(_91b, [q], true);
        }
        if (opts.mode == "remote") {
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
                            if (opts.filter.call(_91b, q, row)) {
                                grid.datagrid("highlightRow", i);
                            }
                        }
                    });
                }
            });
        }
    };
    function _91d(_91e) {
        var _91f = $.data(_91e, "combogrid");
        var opts = _91f.options;
        var grid = _91f.grid;
        var panel = $(_91e).combogrid("panel");
        if (!panel.is(':visible')) return ; /*2020-07-27 面板隐藏时，回车选行或取消选行无效*/
        var tr = opts.finder.getTr(grid[0], null, "highlight");
        _91f.remainText = false;
        if (tr.length) {
            var _920 = parseInt(tr.attr("datagrid-row-index"));
            if (opts.multiple) {
                if (tr.hasClass("datagrid-row-selected")) {
                    grid.datagrid("unselectRow", _920);
                } else {
                    grid.datagrid("selectRow", _920);
                }
            } else {
                grid.datagrid("selectRow", _920);
            }
        }
        var vv = [];
        $.map(grid.datagrid("getSelections"), function (row) {
            vv.push(row[opts.idField]);
        });
        /*当配匹值为空且enterNullValueClear为flase时不清空输入框。add wanghc 2018-5-22*/
        if(vv.length==0 && !opts.enterNullValueClear){
        }
        else if(vv.length==1 && opts.enterSelectRow){/*当enterSelectRow为true时不执行setValues方法，避免回车选中数据时多触发一次onSelect事件。add yp 2019-10-15*/
        }
        else{
            $(_91e).combogrid("setValues", vv);
        }
        if (!opts.multiple) {
            $(_91e).combogrid("hidePanel");
        }
    };
    $.fn.combogrid = function (_921, _922) {
        if (typeof _921 == "string") {
            var _923 = $.fn.combogrid.methods[_921];
            if (_923) {
                return _923(this, _922);
            } else {
                return this.combo(_921, _922);
            }
        }
        _921 = _921 || {};
        return this.each(function () {
            var _924 = $.data(this, "combogrid");
            if (_924) {
                $.extend(_924.options, _921);
            } else {
                _924 = $.data(this, "combogrid", { options: $.extend({}, $.fn.combogrid.defaults, $.fn.combogrid.parseOptions(this), _921) });
            }
            _902(this);
            if (_924.options.blurValidValue){
                var _t = this;
                $(_t).combo('textbox').bind("blur.combo-text", function (e) {
                    var val = $(_t).combogrid("grid").datagrid("getSelected");
                    if (val==undefined || val=="" || val==null){
                        $(e.target).val("");
                        _91a(_t, "");
                    }
                });
            }
        });
    };
    $.fn.combogrid.methods = {
        options: function (jq) {
            var _925 = jq.combo("options");
            return $.extend($.data(jq[0], "combogrid").options, { originalValue: _925.originalValue, disabled: _925.disabled, readonly: _925.readonly });
        }, grid: function (jq) {
            return $.data(jq[0], "combogrid").grid;
        }, setValues: function (jq, values) {
            return jq.each(function () {
                _setValues(this, values);
            });
        }, setValue: function (jq, value) {
            return jq.each(function () {
                _setValues(this, [value]);
            });
        }, clear: function (jq) {
            return jq.each(function () {
                $(this).combogrid("grid").datagrid("clearSelections");
                $(this).combo("clear");
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).combogrid("options");
                if (opts.multiple) {
                    $(this).combogrid("setValues", opts.originalValue);
                } else {
                    $(this).combogrid("setValue", opts.originalValue);
                }
            });
        }
    };
    $.fn.combogrid.parseOptions = function (_928) {
        var t = $(_928);
        return $.extend({}, $.fn.combo.parseOptions(_928), $.fn.datagrid.parseOptions(_928), $.parser.parseOptions(_928, ["idField", "textField", "mode"]));
    };
    $.fn.combogrid.defaults = $.extend({}, $.fn.combo.defaults, $.fn.datagrid.defaults, {
         /*enterSelectRow判断 是否通过回车选中下拉框的数据。by yp */
         enterSelectRow: false, loadMsg: null, idField: null, textField: null, mode: "local", keyHandler: {
            up: function (e) {
                nav(this, "prev");
                e.preventDefault();
            }, down: function (e) {
                nav(this, "next");
                e.preventDefault();
            }, left: function (e) {
            }, right: function (e) {
            }, enter: function (e) {
                /*当通过回车键选中下拉框的数据时，修改enterSelectRow属性。add yp 2019-10-15*/
                $.data(this, "combogrid").options.enterSelectRow = true;
                _91d(this);
                $.data(this, "combogrid").options.enterSelectRow = false;
            }, query: function (q, e) {
                _91a(this, q);
            }
        }, filter: function (q, row) {
            var opts = $(this).combogrid("options");
            return row[opts.textField].toLowerCase().indexOf(q.toLowerCase()) == 0;
        },lazy:false   //cryze 2018-3-22
    });
})(jQuery);

/*mutiselect.js文件中下拉单选的部分脚本*/
//下拉单选
(function ($) {
    function getRadioId(comboboxId, val) {
        return comboboxId + "_" + val;
    }
    function getRadioname(comboboxId) {
        return comboboxId + "_name";
    }
    var methods = {
        init: function (options) {
            var defaults = {
                //required: false,
                //editable: false,
                onChange: function () { },
                //multiple: false
                //   , valueField: "id"
                //  , textField: "text"

            }
            var endOptions = $.extend(defaults, options);
            this.each(function () {
                var _this = $(this);
                var id = _this.attr("id");
				
				
				endOptions.formatter=function (row) {
					var opts;
					var val = row[endOptions.valueField];
					var text = row[endOptions.textField];
					var RadioId = getRadioId(id, val);
					var Radioname = getRadioname(id);
					if (row.selected == true) {
						opts = "<input style='height:13px' type='radio' checked='checked' id='" + RadioId + "' name='" + Radioname + "' value='" + val + "'>" + text;
					} else {
						opts = "<input style='height:13px' type='radio' id='" + RadioId + "' name='" + Radioname + "' value='" + val + "'>" + text;
					}
					return opts;
				}
				endOptions.oldonSelect = endOptions.onSelect;
				endOptions.onSelect=function (rec) {
					if (rec) {
						var val = rec[endOptions.valueField];
						var RadioId = getRadioId(id, val);
						$("#" + RadioId).prop('checked', true);

						if (endOptions.oldonSelect) {
							endOptions.oldonSelect(rec);
						}
					}
				}
				endOptions.oldonUnselect = endOptions.onUnselect;
				endOptions.onUnselect=function (rec) {
					var val = rec[endOptions.valueField];
					var RadioId = getRadioId(id, val);
					$("#" + RadioId).prop('checked', false);

					if (endOptions.oldonUnselect) {
						endOptions.oldonUnselect(rec);
					}
				}
				
                $(_this).combobox(endOptions);
            });
        },
        enable: function (isenable) {
            var _this = $(this);
            if (isenable) {
                $(_this).combobox("enable");
            }
            else {
                $(_this).combobox("disable");
            }
        },
        disable: function (isenable) {
            var _this = $(this);
            if (isenable) {
                $(_this).combobox("disable");
            }
            else {
                $(_this).combobox("enable");
            }
        },
        setValue: function (vals) {
            var _this = $(this);
            var id = _this.attr("id");
            $(_this).combobox("setValue", vals);
            var RadioId = getRadioId(id, vals);
            $("#" + RadioId).prop('checked', true);
            var itemselect = null;
            var valueField = $(_this).combobox('options').valueField;
            for (var i = 0; i < datas.length; i++) {
                if (datas[i][valueField] == vals[0]) {
                    itemselect = datas[i];
                    break;
                }
            }
            if (itemselect != null)
                $(_this).combobox('options').onSelect.call($('#' + id)[0], itemselect);

        },
        setValues: function (vals) {
            var _this = $(this);
            var id = _this.attr("id");//单选只能选择一个，
            if (vals.length > 0) {
                var tempval = vals[0];
                $(_this).combobox("setValue", tempval);
                var RadioId = getRadioId(id, tempval);
                $("#" + RadioId).prop('checked', true);
                var datas = $(_this).combobox("getData");
                var itemselect = null;
                var valueField = $(_this).combobox('options').valueField;
                for (var i = 0; i < datas.length; i++) {
                    if (datas[i][valueField] == vals[0]) {
                        itemselect = datas[i];
                        break;
                    }
                }
                if (itemselect != null)
                    $(_this).combobox('options').onSelect.call($('#' + id)[0], itemselect);
            }
             
        },
        loadData: function (data) {
            var _this = $(this);
            $(_this).combobox("loadData", data);
        },
        options: function () {
            var _this = $(this);
            return $(_this).combobox("options");
        },
        getValue: function () {
            var _this = $(this);
            var re = $(_this).combobox("getValue");
            return re == undefined ? "" : re;
        },
        getValues: function () {
            var _this = $(this);
            var re = $(_this).combobox("getValues");
            return re == undefined ? [] : re;
        },
        getData: function () {
            var _this = $(this);
            var re = $(_this).combobox("getData");
            return re == undefined ? [] : re;
        },
        // BOS No 2500978 yzc
        clear: function () {
            var _this = $(this);
            var opts = $(_this).combobox("options");
            var data = $(_this).combobox("getData");
            if(!!data){
              var id = _this.attr("id");
              for (var p = 0; p < data.length; p++) {
                var v = data[p];
                var tempval = v[opts.valueField];
                var RadioId = getRadioId(id, tempval);
                $("#" + RadioId).prop("checked", false);               
              }
            }
            $(this).combobox("clear");
        }
    };

    $.fn.DropDropRadio = function (method) {
        // 方法调用
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + 'does not exist on mutiselect.js');
        }
    };
})(jQuery);