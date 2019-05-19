(function ($) {
    var _89b = 0;
    function _89c(_89d, _89e) {
        var _89f = $.data(_89d, "combobox");
        var opts = _89f.options;
        var data = _89f.data;
        for (var i = 0; i < data.length; i++) {
            if (data[i][opts.valueField] == _89e) {
                return i;
            }
        }
        return -1;
    };
    function _8a0(_8a1, _8a2) {
        var opts = $.data(_8a1, "combobox").options;
        var _8a3 = $(_8a1).combo("panel");
        var item = opts.finder.getEl(_8a1, _8a2);
        if (item.length) {
            if (item.position().top <= 0) {
                var h = _8a3.scrollTop() + item.position().top;
                _8a3.scrollTop(h);
            } else {
                if (item.position().top + item.outerHeight() > _8a3.height()) {
                    var h = _8a3.scrollTop() + item.position().top + item.outerHeight() - _8a3.height();
                    _8a3.scrollTop(h);
                }
            }
        }
    };
    function nav(_8a4, dir) {
        var opts = $.data(_8a4, "combobox").options;
        var _8a5 = $(_8a4).combobox("panel");
        var item = _8a5.children("div.combobox-item-hover");
        if (!item.length) {
            item = _8a5.children("div.combobox-item-selected");
        }
        item.removeClass("combobox-item-hover");
        var _8a6 = "div.combobox-item:visible:not(.combobox-item-disabled):first";
        var _8a7 = "div.combobox-item:visible:not(.combobox-item-disabled):last";
        if (!item.length) {
            item = _8a5.children(dir == "next" ? _8a6 : _8a7);
        } else {
            if (dir == "next") {
                item = item.nextAll(_8a6);
                if (!item.length) {
                    item = _8a5.children(_8a6);
                }
            } else {
                item = item.prevAll(_8a6);
                if (!item.length) {
                    item = _8a5.children(_8a7);
                }
            }
        }
        if (item.length) {
            item.addClass("combobox-item-hover");
            var row = opts.finder.getRow(_8a4, item);
            if (row) {
                _8a0(_8a4, row[opts.valueField]);
                if (opts.selectOnNavigation) {
                    _8a8(_8a4, row[opts.valueField]);
                }
            }
        }
    };
    /**
     *
     *select-row
     * @param {HTMLDocument} _8a9
     * @param {String} _8aa 希望选中的值
     */
    function _8a8(_8a9, _8aa) {
        var opts = $.data(_8a9, "combobox").options;
        var _8ab = $(_8a9).combo("getValues");
        if ($.inArray(_8aa + "", _8ab) == -1) {
            if (opts.multiple) {
                _8ab.push(_8aa);
            } else {
                _8ab = [_8aa];
            }
            _8ac(_8a9, _8ab);
            opts.onSelect.call(_8a9, opts.finder.getRow(_8a9, _8aa));
        }else{
            // else内全是新加 neer 20190322
            // 输入ohio,但列表中只有Ohio时,此时value有值,但显示为小写ohio了
            // 当前点击的行值===当前combobox的值,但text不对
            if (opts.multiple){
                
            }else{
                if (_8aa){
                    var row = opts.finder.getRow(_8a9, _8aa);
                    if (row) { 
                        var s = row[opts.textField];
                        $(_8a9).combo("setText",s);
                    }
                }
            }
        }
    };
    function _8ad(_8ae, _8af) {
        var opts = $.data(_8ae, "combobox").options;
        var _8b0 = $(_8ae).combo("getValues");
        var _8b1 = $.inArray(_8af + "", _8b0);
        if (_8b1 >= 0) {
            _8b0.splice(_8b1, 1);
            _8ac(_8ae, _8b0);
            opts.onUnselect.call(_8ae, opts.finder.getRow(_8ae, _8af));
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
    function _8ac(_8b2, _8b3, _8b4) {
        var opts = $.data(_8b2, "combobox").options;
        var _8b5 = $(_8b2).combo("panel");
        _8b5.find("div.combobox-item-selected").removeClass("combobox-item-selected");
        var vv = [], ss = [];
        for (var i = 0; i < _8b3.length; i++) {
            var v = _8b3[i];
            var s = v;
            opts.finder.getEl(_8b2, v).addClass("combobox-item-selected");
            var row = opts.finder.getRow(_8b2, v);
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
        $(_8b2).combo("setValues", vv);
        if (!_8b4) {
            $(_8b2).combo("setText", ss.join(opts.separator));
        }
        if(opts.rowStyle && opts.rowStyle=='checkbox'){ 
            //wanghc 2018-10-17 rowStyle=checkbox 选中数据行时,判断是不是应该选中全选勾
            var tmpLen = $.data(_8b2, "combobox").data.length;
            if (vv.length==tmpLen){
                _8b5.parent().children("._hisui_combobox-selectall").addClass("checked");
            }else{
                _8b5.parent().children("._hisui_combobox-selectall").removeClass("checked");
            }
        }
    };
    function _8b6(_8b7, data, _8b8) {
        var _8b9 = $.data(_8b7, "combobox");
        var opts = _8b9.options;
        _8b9.data = opts.loadFilter.call(_8b7, data);
        _8b9.groups = [];
        data = _8b9.data;
        var _8ba = $(_8b7).combobox("getValues");
        var dd = [];
        var _8bb = undefined;
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var v = row[opts.valueField] + "";
            var s = row[opts.textField];
            var g = row[opts.groupField];
            if (g) {
                if (_8bb != g) {
                    _8bb = g;
                    _8b9.groups.push(g);
                    dd.push("<div id=\"" + (_8b9.groupIdPrefix + "_" + (_8b9.groups.length - 1)) + "\" class=\"combobox-group\">");
                    dd.push(opts.groupFormatter ? opts.groupFormatter.call(_8b7, g) : g);
                    dd.push("</div>");
                }
            } else {
                _8bb = undefined;
            }
            var cls = "combobox-item" + (row.disabled ? " combobox-item-disabled" : "") + (g ? " combobox-gitem" : "");
            dd.push("<div id=\"" + (_8b9.itemIdPrefix + "_" + i) + "\" class=\"" + cls + "\">");
            dd.push(opts.formatter ? opts.formatter.call(_8b7, row) : s);
            dd.push("</div>");
            if (row["selected"] && $.inArray(v, _8ba) == -1) {
                _8ba.push(v);
            }
        }
        $(_8b7).combo("panel").html(dd.join(""));
        if (opts.multiple) {
            _8ac(_8b7, _8ba, _8b8);
            // wanghc 2018-10-17 checkbox all select
            if (opts.rowStyle && opts.rowStyle=='checkbox'){
                
                var myPanelJObj = $(_8b7).combo("panel");
                myPanelJObj.closest('.combo-p').children('._hisui_combobox-selectall').remove();
                var myPanelWidth = myPanelJObj.width() - 5; //5是padding-left
                var myallselJObj = $('<div style="width:'+myPanelWidth+'px" class="_hisui_combobox-selectall"><span class="combobox-checkbox"></span>全选/取消全选</div>')
                .bind('click',function(e){
                    var _t = $(this);
                    if (_t.hasClass('checked')){
                        _t.removeClass('checked');
                        $(_8b7).combobox("setValues",[]);
                    }else{
                        var tmpArr = [];
                        _t.addClass('checked');
                        $.map(data,function(v){
                            tmpArr.push(v[opts.valueField]);
                        });
                        $(_8b7).combobox("setValues",tmpArr);
                    }
                    if (opts.onAllSelectClick){
                        opts.onAllSelectClick.call(_8b7,e);
                    } 
                });
                if (opts.allSelectButtonPosition=='bottom'){
                    //myallselJObj.appendTo($(_8b7).combo("panel"));
                    myallselJObj.insertAfter(myPanelJObj);
                    myallselJObj.parent().addClass('bbtm');
                }else{
                    //myallselJObj.prependTo($(_8b7).combo("panel"));
                    myallselJObj.insertBefore(myPanelJObj);
                    myallselJObj.parent().addClass('btop');
                }
            }
        } else {
            _8ac(_8b7, _8ba.length ? [_8ba[_8ba.length - 1]] : [], _8b8);
        }
        opts.onLoadSuccess.call(_8b7, data);
    };
    function _8bc(_8bd, url, _8be, _8bf) {
        var opts = $.data(_8bd, "combobox").options;
        if (url) {
            opts.url = url;
        }
        _8be = _8be || {};
        if (opts.onBeforeLoad.call(_8bd, _8be) == false) {
            return;
        }
        opts.loader.call(_8bd, _8be, function (data) {
            _8b6(_8bd, data, _8bf);
        }, function () {
            opts.onLoadError.apply(this, arguments);
        });
    };
    function _8c0(_8c1, q) {
        var _8c2 = $.data(_8c1, "combobox");
        var opts = _8c2.options;
        if (opts.multiple && !q) {
            _8ac(_8c1, [], true);
        } else {
            _8ac(_8c1, [q], true);
        }
        if (opts.mode == "remote") {
            _8bc(_8c1, null, { q: q }, true);
        } else {
            var _8c3 = $(_8c1).combo("panel");
            _8c3.find("div.combobox-item-selected,div.combobox-item-hover").removeClass("combobox-item-selected combobox-item-hover");
            _8c3.find("div.combobox-item,div.combobox-group").hide();
            var data = _8c2.data;
            var vv = [];
            var qq = opts.multiple ? q.split(opts.separator) : [q];
            $.map(qq, function (q) {
                q = $.trim(q);
                var _8c4 = undefined;
                for (var i = 0; i < data.length; i++) {
                    var row = data[i];
                    if (opts.filter.call(_8c1, q, row)) {
                        var v = row[opts.valueField];
                        var s = row[opts.textField];
                        var g = row[opts.groupField];
                        var item = opts.finder.getEl(_8c1, v).show();
                        if (s.toLowerCase() == q.toLowerCase()) {
                            vv.push(v);
                            item.addClass("combobox-item-selected");
                            // wanghc 2018-11-7 输入骨科不能进入onSelect事件，输入骨后选骨科可以进入onSelect问题
                            opts.onSelect.call(_8c1, opts.finder.getRow(_8c1, v));
                        }
                        if (opts.groupField && _8c4 != g) {
                            $("#" + _8c2.groupIdPrefix + "_" + $.inArray(g, _8c2.groups)).show();
                            _8c4 = g;
                        }
                    }
                }
            });
            _8ac(_8c1, vv, true);
        }
    };
    function _8c5(_8c6) {
        var t = $(_8c6);
        var opts = t.combobox("options");
        var _8c7 = t.combobox("panel");
        var item = _8c7.children("div.combobox-item-hover");
        if (item.length) {
            var row = opts.finder.getRow(_8c6, item);
            var _8c8 = row[opts.valueField];
            if (opts.multiple) {
                if (item.hasClass("combobox-item-selected")) {
                    t.combobox("unselect", _8c8);
                } else {
                    t.combobox("select", _8c8);
                }
            } else {
                t.combobox("select", _8c8);
            }
        }
        var vv = [];
        $.map(t.combobox("getValues"), function (v) {
            if (_89c(_8c6, v) >= 0) {
                vv.push(v);
            }
        });
        /*当配匹值为空且enterNullValueClear为flase时不清空输入框。add wanghc 2018-5-22*/
        if(vv.length==0 && !opts.enterNullValueClear){
        }else{
            t.combobox("setValues", vv);
        }
        if (!opts.multiple) {
            t.combobox("hidePanel");
        }
    };
    function _8c9(_8ca) {
        var _8cb = $.data(_8ca, "combobox");
        var opts = _8cb.options;
        _89b++;
        _8cb.itemIdPrefix = "_hisui_combobox_i" + _89b;
        _8cb.groupIdPrefix = "_hisui_combobox_g" + _89b;
        $(_8ca).addClass("combobox-f");
        $(_8ca).combo($.extend({}, opts, {
            onShowPanel: function () {
                $(_8ca).combo("panel").find("div.combobox-item,div.combobox-group").show();
                _8a0(_8ca, $(_8ca).combobox("getValue"));
                opts.onShowPanel.call(_8ca);
            }
        }));
        $(_8ca).combo("panel").unbind().bind("mouseover", function (e) {
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
            var row = opts.finder.getRow(_8ca, item);
            if (!row) {
                return;
            }
            var _8cc = row[opts.valueField];
            if (opts.multiple) {
                if (item.hasClass("combobox-item-selected")) {
                    _8ad(_8ca, _8cc);
                } else {
                    _8a8(_8ca, _8cc);
                }
            } else {
                // 增加allowNull配置,if是增加的 20190218-neer 
                if (opts.allowNull && item.hasClass("combobox-item-selected")){
                    _8ad(_8ca, _8cc);
                }else{
                    _8a8(_8ca, _8cc);
                    $(_8ca).combo("hidePanel");
                }
            }
            e.stopPropagation();
        });
    };
    $.fn.combobox = function (_8cd, _8ce) {
        if (typeof _8cd == "string") {
            var _8cf = $.fn.combobox.methods[_8cd];
            if (_8cf) {
                return _8cf(this, _8ce);
            } else {
                return this.combo(_8cd, _8ce);
            }
        }
        _8cd = _8cd || {};
        return this.each(function () {
            var _8d0 = $.data(this, "combobox");
            if (_8d0) {
                $.extend(_8d0.options, _8cd);
                _8c9(this);
            } else {
                _8d0 = $.data(this, "combobox", { options: $.extend({}, $.fn.combobox.defaults, $.fn.combobox.parseOptions(this), _8cd), data: [] });
                _8c9(this);
                var data = $.fn.combobox.parseData(this);
                if (data.length) {
                    _8b6(this, data);
                }
            }
            if (_8d0.options.data) {
                _8b6(this, _8d0.options.data);
            }
            _8bc(this);
            if (_8d0.options.blurValidValue){
                _8d0.options.forceValidValue = true; //这时强制设置值检查
                var _t = this;
                $(_t).combo('textbox').bind("blur.combo-text", function (e) {
                    if ($(_t).combo('panel').find(".combobox-item-hover").length==0){ //click---combo-p
                        var val = $(_t).combobox("getValue");
                        if (val==undefined || val=="" || val==null){
                            $(e.target).val("");
                            _8c0(_t, "");
                        }
                        var isContain = 0;
                        var _d = $(_t).combobox('getData');
                        var opts = $(_t).combobox('options');
                        for (var i=0;i<_d.length;i++){
                            if (_d[i][opts.valueField]==val){
                                isContain = 1;
                            }
                        }
                        if (0==isContain){
                            $(e.target).val("");
                            _8c0(_t, "");
                        }
                    }
                });
            }
        });
    };
    $.fn.combobox.methods = {
        options: function (jq) {
            var _8d1 = jq.combo("options");
            return $.extend($.data(jq[0], "combobox").options, { originalValue: _8d1.originalValue, disabled: _8d1.disabled, readonly: _8d1.readonly });
        }, getData: function (jq) {
            return $.data(jq[0], "combobox").data;
        }, setValues: function (jq, _8d2) {
            return jq.each(function () {
                _8ac(this, _8d2);
            });
        }, setValue: function (jq, _8d3) {
            return jq.each(function () {
                _8ac(this, [_8d3]);
            });
        }, clear: function (jq) {
            return jq.each(function () {
                $(this).combo("clear");
                var _8d4 = $(this).combo("panel");
                _8d4.find("div.combobox-item-selected").removeClass("combobox-item-selected");
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
                _8b6(this, data);
            });
        }, reload: function (jq, url) {
            return jq.each(function () {
                _8bc(this, url);
            });
        }, select: function (jq, _8d5) {
            return jq.each(function () {
                _8a8(this, _8d5);
            });
        }, unselect: function (jq, _8d6) {
            return jq.each(function () {
                _8ad(this, _8d6);
            });
        }
    };
    $.fn.combobox.parseOptions = function (_8d7) {
        var t = $(_8d7);
        return $.extend({}, $.fn.combo.parseOptions(_8d7), $.parser.parseOptions(_8d7, ["valueField", "textField", "groupField", "mode", "method", "url"]));
    };
    $.fn.combobox.parseData = function (_8d8) {
        var data = [];
        var opts = $(_8d8).combobox("options");
        $(_8d8).children().each(function () {
            if (this.tagName.toLowerCase() == "optgroup") {
                var _8d9 = $(this).attr("label");
                $(this).children().each(function () {
                    _8da(this, _8d9);
                });
            } else {
                _8da(this);
            }
        });
        return data;
        function _8da(el, _8db) {
            var t = $(el);
            var row = {};
            row[opts.valueField] = t.attr("value") != undefined ? t.attr("value") : t.text();
            row[opts.textField] = t.text();
            row["selected"] = t.is(":selected");
            row["disabled"] = t.is(":disabled");
            if (_8db) {
                opts.groupField = opts.groupField || "group";
                row[opts.groupField] = _8db;
            }
            data.push(row);
        };
    };
    $.fn.combobox.defaults = $.extend({}, $.fn.combo.defaults, {
        forceValidValue:false,allowNull:false,
        allSelectButtonPosition:'top',rowStyle:'',valueField: "value", textField: "text", groupField: null, groupFormatter: function (_8dc) {
            return _8dc;
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
                _8c5(this);
            }, query: function (q, e) {
                _8c0(this, q);
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
        }, loader: function (_8dd, _8de, _8df) {
            var opts = $(this).combobox("options");
            if (!opts.url) {
                return false;
            }
            $.ajax({
                type: opts.method, url: opts.url, data: _8dd, dataType: "json", success: function (data) {
                    _8de(data);
                }, error: function () {
                    _8df.apply(this, arguments);
                }
            });
        }, loadFilter: function (data) {
            return data;
        }, finder: {
            getEl: function (_8e0, _8e1) {
                var _8e2 = _89c(_8e0, _8e1);
                var id = $.data(_8e0, "combobox").itemIdPrefix + "_" + _8e2;
                return $("#" + id);
            }, getRow: function (_8e3, p) {
                var _8e4 = $.data(_8e3, "combobox");
                var _8e5 = (p instanceof jQuery) ? p.attr("id").substr(_8e4.itemIdPrefix.length + 1) : _89c(_8e3, p);
                return _8e4.data[parseInt(_8e5)];
            }
        }, onBeforeLoad: function (_8e6) {
        }, onLoadSuccess: function () {
        }, onLoadError: function () {
        }, onSelect: function (_8e7) {
        }, onUnselect: function (_8e8) {
        }
    });
})(jQuery);