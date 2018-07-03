/**
 * HISUI
 * lookup - HISUI
 * 
 * Dependencies:
 *   datagrid
 */
(function ($) {
    $.parser.plugins.push('lookup');

	var GLOBAL_LOOKUP_GRID_ID="hisui_lookup_grid";
	var GLOBAL_LOOKUP_PANEL_ID="hisui_lookup_panel";
	var GLOBAL_LOOKUP_LAST_TARGET;
	var GLOBAL_LOOKUP_CURRENT_TARGET;
    function create(target) {
        var state = $.data(target, "lookup");
		var opts = state.options;
        $(target).addClass("lookup-text").attr("autocomplete","off"); //.hide();
        $(target).wrap("<span class=\"lookup\"></span>");
		$("<span><span class=\"lookup-arrow\"></span></span>").insertAfter(target);
		state.lookup=$(target).parent('.lookup');
		state.panel=$('#'+GLOBAL_LOOKUP_PANEL_ID);
		state.grid=$('#'+GLOBAL_LOOKUP_GRID_ID);
	};
	function initLookupPanel(){
		if ($('#'+GLOBAL_LOOKUP_PANEL_ID).length>0) return;
        var _848 = $("<div id='"+GLOBAL_LOOKUP_PANEL_ID+"' class=\"lookup-panel\"></div>").appendTo("body");
        _848.panel({
            doSize: false, closed: true, cls: "lookup-p", style: { position: "absolute", zIndex: 10 }, onOpen: function () {
                var p = $(this).panel("panel");
                if ($.fn.menu) {
                    p.css("z-index", $.fn.menu.defaults.zIndex++);
                } else {
                    if ($.fn.window) {
                        p.css("z-index", $.fn.window.defaults.zIndex++);
                    }
                }
				$(this).panel("resize");
				lookupPanelOnOpen();
            }, onBeforeClose: function () {
                _854(this);
            }, onClose: function () {
                var _849 = $.data(GLOBAL_LOOKUP_CURRENT_TARGET, "lookup");
                if (GLOBAL_LOOKUP_CURRENT_TARGET) {
                    _849.options.onHidePanel.call(GLOBAL_LOOKUP_CURRENT_TARGET);
                }
            }
		});
		if ($('#'+GLOBAL_LOOKUP_GRID_ID).length>0) return;
		var grid = $("<table id='"+GLOBAL_LOOKUP_GRID_ID+"'></table>").appendTo(_848);
	}
	function lookupPanelOnOpen(){
		var lastTarget=GLOBAL_LOOKUP_LAST_TARGET;
		var target=GLOBAL_LOOKUP_CURRENT_TARGET;
		if ($(lastTarget).is($(target)) ) return true;

        var state = $.data(target, "lookup");
		var opts = state.options;
		var grid = state.grid;
        if (!opts.columns && typeof opts.columnsLoader=="function") opts.columns=opts.columnsLoader();
        try {
            grid.datagrid('options').onLoadSuccess=function(){};
            grid.datagrid('loadData',{total:0,rows:[]});
            grid.datagrid('clearSelections').datagrid('highlightRow',0);
        }catch (e){
        }
		grid.datagrid($.extend({}, opts, {
            border: false, fit: true, singleSelect: (!opts.multiple), onLoadSuccess: function (data) {
				/*
                var _906 = $(target).lookup("getValues");
                var _907 = opts.onSelect;
                opts.onSelect = function () {
                };
                _911(target, _906, state.remainText);
                opts.onSelect = _907; */
                opts.onLoadSuccess.apply(target, arguments);
            }, onClickRow: _908, onSelect: function (_909, row) {
                var t=this;
                setTimeout(function(){
                    _90a();  //直接调用 _90a 内部getSelections实际还无法获取到
                    opts.onSelect.call(t, _909, row);
                },0)

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
            },lazy:true
        }));
        state.previousValue=undefined;
		
		
        function _908(_90c, row) {
            state.remainText = false;
            //触发顺序 点击行 选中行 触发grid的onSelect 设置text 调用lookup配置项onSelect 触发grid onClickRow走到这儿 设置text 触发lookup的onClickRow
            //_90a();  //cryze 2018-7-3 用户自己写的处理放在了onSelect 所以在这儿不再调用_90a设置值
            if (!opts.multiple) {
                $(target).lookup("hidePanel");
            }
            opts.onClickRow.call(this, _90c, row);
        };
        function _90a() {
            var rows = grid.datagrid("getSelections");
            var vv = [], ss = [];
            for (var i = 0; i < rows.length; i++) {
                //vv.push(rows[i][opts.idField]);
                ss.push(rows[i][opts.textField]);
			}
			/*
            if (!opts.multiple) {
                $(target).lookup("setValues", (vv.length ? vv : [""]));
            } else {
                $(target).lookup("setValues", vv);
            }*/
            if (!state.remainText) {
                $(target).lookup("setText", ss.join(opts.separator));
            }
        };
	}
	function doResize(target, t_width) {
        var state = $.data(target, "lookup");
        var opts = state.options;
        var _842 = state.lookup;
        var _843 = state.panel;
        if (t_width) {
            opts.width = t_width;
        }
        if (isNaN(opts.width)) {
            var c = $(target).clone();
            c.css("visibility", "hidden");
            c.appendTo("body");
            opts.width = c.outerWidth();
            c.remove();
        }
        var _844 = _842.find("input.lookup-text");
        var _845 = _842.find(".lookup-arrow");
        var _846 = opts.hasDownArrow ? _845._outerWidth() : 0;
        _842._outerWidth(opts.width)._outerHeight(opts.height);
        _844._outerWidth(_842.width() - _846);
        _844.css({ height: _842.height() + "px", lineHeight: _842.height() + "px" });
        _845._outerHeight(_842.height());
    	_843.panel("resize", { width: (opts.panelWidth ? opts.panelWidth : _842.outerWidth()), height: opts.panelHeight });

    };

	function _854(_855) {  //这个在easyui的combogrid 应该是考虑嵌套combo的
		return;  //lookup 先不考虑嵌套的
        $(_855).find(".combo-f").each(function () {
            var p = $(this).combo("panel");
            if (p.is(":visible")) {
                p.panel("close");
            }
        });
    };
	function eventCreate(target) {
        var _858 = $.data(target, "lookup");
        var opts = _858.options;
        var _859 = _858.panel;
        var _85a = _858.lookup;
        var _85b = _85a.find(".lookup-text");
        var _85c = _85a.find(".lookup-arrow");
        $(document).unbind(".lookup").bind("mousedown.lookup", function (e) {
            var p = $(e.target).closest("span.lookup,div.lookup-p");
            if (p.length) {
				_854(p);
				//考虑一种情况 现在显示的是A，点击B输入框 应关闭A
				if (p.find('.lookup-text').length>0 && !p.find('.lookup-text').is($(GLOBAL_LOOKUP_CURRENT_TARGET)) ) $("body>div.lookup-p>div.lookup-panel:visible").panel("close");
                return;
			}
            $("body>div.lookup-p>div.lookup-panel:visible").panel("close");
        });
        _85b.unbind(".lookup");
        _85c.unbind(".lookup");
        if (!opts.disabled && !opts.readonly) {
            _85b.bind("click.lookup", function (e) {
                if (!opts.editable) {
                    _85d.call(this);
                } else {
                    var p = $(this).closest("div.lookup-panel");
                    $("div.lookup-panel:visible").not(_859).not(p).panel("close");
                }
            }).bind("keydown.lookup paste.lookup drop.lookup", function (e) {
                switch (e.keyCode) {
                    case 33:
                        opts.keyHandler.pageUp.call(target, e);
                        break;
                    case 34:
                        opts.keyHandler.pageDown.call(target, e);
                        break;
                    case 38:
                        opts.keyHandler.up.call(target, e);
                        break;
                    case 40:
                        opts.keyHandler.down.call(target, e);
                        break;
                    case 37:
                        opts.keyHandler.left.call(target, e);
                        break;
                    case 39:
                        opts.keyHandler.right.call(target, e);
                        break;
                    case 13:
                        e.preventDefault();
                        opts.keyHandler.enter.call(target, e);
                        return false;
                    case 9:
                    case 27:
                        hidePanel(target);
                        break;
                    default:
                        //输入字符查询走的是这儿   要判断长度 所以要用setTimeout(fn,0)
                        setTimeout(
                            function (){
                                if (!opts.isCombo) return;
                                if (opts.minQueryLen>0 && _85b.val().length<opts.minQueryLen) return;
                                if (opts.editable) {
                                    if (_858.timer) {
                                        clearTimeout(_858.timer);
                                    }
                                    _858.timer = setTimeout(function () {
                                        var q = _85b.val();
                                        if (_858.previousValue != q) {
                                            _858.previousValue = q;
                                            if (opts.onBeforeShowPanel.call(target)===false) return;  //cryze 2018-6-14
                                            $(target).lookup("showPanel");
                                            opts.keyHandler.query.call(target, _85b.val(), e);
                                            $(target).lookup("validate");
                                        }
                                    }, opts.delay);
                                }
                            },0);
                }
            });
            _85c.bind("click.lookup", function () {
                _85d.call(this);
            }).bind("mouseenter.lookup", function () {
                $(this).addClass("lookup-arrow-hover");
            }).bind("mouseleave.lookup", function () {
                $(this).removeClass("lookup-arrow-hover");
            });
        }

        function _85d() {    
            if (_859.is(":visible")) {
                hidePanel(target);
            } else {
                var p = $(this).closest("div.lookup-panel");
                $("div.lookup-panel:visible").not(_859).not(p).panel("close");
                
                if (opts.onBeforeShowPanel.call(target)===false) return;  //cryze 2018-6-14
				$(target).lookup("showPanel");
				//下拉走查询
				var q = _85b.val();
				if (opts.queryOnSameQueryString ||_858.previousValue != q) {
					_858.previousValue = q;
					opts.keyHandler.query.call(target, _85b.val());
				}
				$(target).lookup("validate");
            }
            _85b.focus();
        };
	};
	/**
	 * 下拉面板显示
	 */
    function showPanel(_860) {
        var _861 = $.data(_860, "lookup");
        var opts = _861.options;
        //if(opts.onBeforeShowPanel.call(_860)===false) return; // 不能单纯地在这儿阻止,有些是和showPanel完全在一起的动作，不打开panel,那些动作也不要
		GLOBAL_LOOKUP_LAST_TARGET=GLOBAL_LOOKUP_CURRENT_TARGET;
		GLOBAL_LOOKUP_CURRENT_TARGET=_860;
        var _862 = _861.lookup;
		var _863 = _861.panel;
		var panelOpts=_863.panel('options');
		panelOpts.lookupTarget=_860;
        _863.panel("move", { left: _864(), top: _865() });
        if (_863.panel("options").closed) {
            _863.panel("open");
            opts.onShowPanel.call(_860);
        }
        (function () {
            if (panelOpts.lookupTarget == _860 && _863.is(":visible")) {
                _863.panel("move", { left: _864(), top: _865() });
                setTimeout(arguments.callee, 200);
            }
        })();
        function _864() {
            var left = _862.offset().left;
            if (opts.panelAlign == "right") {
                left += _862._outerWidth() - _863._outerWidth();
            }
            if (left + _863._outerWidth() > $(window)._outerWidth() + $(document).scrollLeft()) {
                left = $(window)._outerWidth() + $(document).scrollLeft() - _863._outerWidth();
            }
            if (left < 0) {
                left = 0;
            }
            return left;
        };
        function _865() {
            var top = _862.offset().top + _862._outerHeight();
            if (top + _863._outerHeight() > $(window)._outerHeight() + $(document).scrollTop()) {
                top = _862.offset().top - _863._outerHeight();
            }
            if (top < $(document).scrollTop()) {
                top = _862.offset().top + _862._outerHeight();
            }
            return top;
        };
	};
	/**
	 * 下拉面板隐藏
	 */
    function hidePanel(_866) {
        var _867 = $.data(_866, "lookup").panel;
        _867.panel("close");
	};
	/**
	 * 上下移动选择
	 * @param {*} _90d 
	 * @param {*} dir 
	 */
    function nav(_90d, dir) {
        var _90e = $.data(_90d, "lookup");
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
        if (opts.selectOnNavigation) {   //selectOnNavigation 上下移动是否选择行 
            _90e.remainText = false;
            grid.datagrid("selectRow", _910);
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
            grid.datagrid("highlightRow", 0);
        }
    }
    function _911(_912, _913, _914) {
        var _915 = $.data(_912, "lookup");
        var opts = _915.options;
        var grid = _915.grid;
        var rows = grid.datagrid("getRows");
        var ss = [];
        //var _916 = $(_912).combo("getValues");
		//var _917 = $(_912).combo("options");
		var _917=opts;
        var _918 = _917.onChange;
        _917.onChange = function () {
        };
        grid.datagrid("clearSelections");
        for (var i = 0; i < _913.length; i++) {
            var _919 = grid.datagrid("getRowIndex", _913[i]);
            if (_919 >= 0) {
                grid.datagrid("selectRow", _919);
                ss.push(rows[_919][opts.textField]);
            } else {
                ss.push(_913[i]);
            }
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
    function _91a(_91b, q) {
        var _91c = $.data(_91b, "lookup");
        var opts = _91c.options;
        var grid = _91c.grid;
        _91c.remainText = true;
        if (opts.multiple && !q) {
            _911(_91b, [], true);
        } else {
            _911(_91b, [q], true);
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
	/**
	 * 回车事件
	 */
    function _91d(target) {
        var state = $.data(target, "lookup");
        var opts = state.options;
		var grid = state.grid;
		var panel =state.panel;
		if(panel.is(':visible') && $(target).is($(GLOBAL_LOOKUP_CURRENT_TARGET))){
			var tr = opts.finder.getTr(grid[0], null, "highlight");
			state.remainText = false;
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
			//$(target).lookup("setValues", vv);
			if (!opts.multiple) {
				$(target).lookup("hidePanel");
			}
		}else{
			if (panel.is(':visible')) {
				$(target).lookup("hidePanel");
				
            }
            if (opts.onBeforeShowPanel.call(target)===false) return;  //cryze 2018-6-14
			$(target).lookup("showPanel");
            var q = $(target).val();
			if (opts.queryOnSameQueryString ||state.previousValue != q) {
				state.previousValue = q;
				opts.keyHandler.query.call(target, q);
			}
			$(target).lookup("validate");
		}	

	};
	/**
	 *  初始化validatebox
	 */
	function initValidatebox(_869) {
        var opts = $.data(_869, "lookup").options;
        $(_869).validatebox($.extend({}, opts, { deltaX: (opts.hasDownArrow ? opts.deltaX : (opts.deltaX > 0 ? 1 : -1)) }));
	};
	function setText(_87a, text) {
        var _87b = $.data(_87a, "lookup");
        var _87c = _87b.lookup.find("input.lookup-text");
        if (_87c.val() != text) {
            _87c.val(text);
            $(_87a).lookup("validate");
            _87b.previousValue = text;
        }
    };
    /**
     * 切换disabled状态 修改样式
     */
    function toggleDisabled(target, disabled) {
        var _86d = $.data(target, "lookup");
        var opts = _86d.options;
        var _86e = _86d.lookup;
        if (disabled) {
            opts.disabled = true;
            $(target).attr("disabled", true);
            _86e.find(".lookup-value").attr("disabled", true);
            _86e.find(".lookup-text").attr("disabled", true);
            _86e.addClass('disabled');
        } else {
            opts.disabled = false;
            $(target).removeAttr("disabled");
            _86e.find(".lookup-value").removeAttr("disabled");
            _86e.find(".lookup-text").removeAttr("disabled");
            _86e.removeClass('disabled');
        }
    };
    function toggleReadonly(target, mode) {
        var _870 = $.data(target, "lookup");
        var opts = _870.options;
        opts.readonly = mode == undefined ? true : mode;
        var _871 = opts.readonly ? true : (!opts.editable);
        _870.lookup.find(".lookup-text").attr("readonly", _871).css("cursor", _871 ? "pointer" : "");
    };
    /**
     * 初始化 readonly 和 disabled
     */
    function initState(target) {
        var _84c = $.data(target, "lookup");
        var opts = _84c.options;
        var _84d = _84c.lookup;
        if (opts.hasDownArrow) {
            _84d.find(".lookup-arrow").show();
        } else {
            _84d.find(".lookup-arrow").hide();
        }
        toggleDisabled(target, opts.disabled);
        toggleReadonly(target, opts.readonly);
    };
    $.fn.lookup = function (_921, _922) {
        if (typeof _921 == "string") {
            var _923 = $.fn.lookup.methods[_921];
            if (_923) {
                return _923(this, _922);
            } else {
				//return this.combo(_921, _922);
				return this.each(function () {
                    $(this).validatebox(_921, _922);
                });
            }
        }
        _921 = _921 || {};
        return this.each(function () {
            var _924 = $.data(this, "lookup");
            if (_924) {
                $.extend(_924.options, _921);
                initLookupPanel();
            } else {
                _924 = $.data(this, "lookup", { options: $.extend({}, $.fn.lookup.defaults, $.fn.lookup.parseOptions(this), _921) });
                initLookupPanel();
                create(this);
            }
			//initLookupPanel();
            //create(this);
            initState(this);
			doResize(this);
			eventCreate(this);
			initValidatebox(this);

        });
	};

    $.fn.lookup.methods = {
        options: function (jq) {
            return $.data(jq[0], "lookup").options;
        }, grid: function (jq) {   //此方法虽存在，但是获取的grid未必对应此lookup 因为所有的lookup都使用一个grid
            return $.data(jq[0], "lookup").grid;
        }, panel:function(jq){   //此方法虽存在，但是获取的panel未必对应此lookup 因为所有的lookup都使用一个panel
            return $.data(jq[0], "lookup").panel;
        },setText: function (jq, text) {
            return jq.each(function () {
                setText(this, text);
            });
        }, getText:function(jq){
            return jq.eq(0).val();
        },clear: function (jq) {
            return jq.each(function () {
                $(this).lookup("grid").datagrid("clearSelections");
                $(this).val('');
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).lookup("options");
                $(this).lookup("setText", opts.originalValue);
            });
        } ,resize: function (jq,width) {
            return jq.each(function () {
                doResize(this,width);
            });
        }, showPanel: function (jq) {
            return jq.each(function () {
                var opts=$.data(this,"lookup").options;
                if (opts.onBeforeShowPanel.call(this)===false) return;  //cryze 2018-6-14
                showPanel(this);
            });
        }, hidePanel: function (jq) {
            return jq.each(function () {
                hidePanel(this);
            });
        }, disable: function (jq) {
            return jq.each(function () {
                toggleDisabled(this, true);
                eventCreate(this);
            });
        }, enable: function (jq) {
            return jq.each(function () {
                toggleDisabled(this, false);
                eventCreate(this);
            });
        }, readonly: function (jq, mode) {
            return jq.each(function () {
                toggleReadonly(this, mode);
                eventCreate(this);
            });
        }, isValid: function (jq) {
            return jq.eq(0).validatebox("isValid");
        }
    };
    $.fn.lookup.parseOptions = function (_928) {
		var t = $(_928);
        var temp= $.extend({}, $.fn.validatebox.parseOptions(_928), $.parser.parseOptions(_928, ["width", "height", "separator", "panelAlign", { panelWidth: "number", editable: "boolean", hasDownArrow: "boolean", delay: "number", selectOnNavigation: "boolean" }]), { panelHeight: (t.attr("panelHeight") == "auto" ? "auto" : parseInt(t.attr("panelHeight")) || undefined), multiple: (t.attr("multiple") ? true : undefined), disabled: (t.attr("disabled") ? true : undefined), readonly: (t.attr("readonly") ? true : undefined), value: (t.val() || undefined) });
        temp.originalValue=temp.value;
        return $.extend({}, temp, $.fn.datagrid.parseOptions(_928), $.parser.parseOptions(_928, ["idField", "textField", "mode",{isCombo:"boolean",minQueryLen:'number'}]));
    };
    $.fn.lookup.defaults = $.extend({}, $.fn.combo.defaults, $.fn.datagrid.defaults, {
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
                _91d(this);
            }, query: function (q, e) {
                _91a(this, q);
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
		},width: "auto", height: 30, panelWidth: null, panelHeight: 200, panelAlign: "left", multiple: false, selectOnNavigation: false, separator: ",", editable: true, disabled: false, readonly: false, hasDownArrow: true, value: "", delay: 200, deltaX: 19
		, onShowPanel: function () {
        }, onHidePanel: function () {
        }, onChange: function (_899, _89a) {  //以前combo有，现在没有 考虑..
        },
        isCombo:false,
        minQueryLen:0,
        queryOnSameQueryString: true //当查询条件相同时，在回车和点击按钮是否查询
        ,onBeforeShowPanel:function(){

        }
    });
})(jQuery);
