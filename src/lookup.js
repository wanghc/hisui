/**
 * HISUI
 * lookup - HISUI
 * 
 * Dependencies:
 *   datagrid
 * 
 * $("arcim").lookup({
                    lookupPage:"lookup.html",
                    ClassName:'web.DHCTest',
                    QueryName:'Find',
                    listProperties:[function(){return $('arcim').val();},""],
                });
 * 
 */
(function($){
    var GLOBAL_LOOKUP_GRID_ID= 'jquery_lookup_grid';
	function scrollTo(target, value){
		var opts = $.data(target, 'combobox').options;
		var panel = $(target).combo('panel');
		var item = opts.finder.getEl(target, value);
		if (item.length){
			if (item.position().top <= 0){
				var h = panel.scrollTop() + item.position().top;
				panel.scrollTop(h);
			} else if (item.position().top + item.outerHeight() > panel.height()){
				var h = panel.scrollTop() + item.position().top + item.outerHeight() - panel.height();
				panel.scrollTop(h);
			}
		}
	}
	
	function nav(target, dir){
		var opts = $.data(target, 'combobox').options;
		var panel = $(target).combobox('panel');
		var item = panel.children('div.combobox-item-hover');
		if (!item.length){
			item = panel.children('div.combobox-item-selected');
		}
		item.removeClass('combobox-item-hover');
		var firstSelector = 'div.combobox-item:visible:not(.combobox-item-disabled):first';
		var lastSelector = 'div.combobox-item:visible:not(.combobox-item-disabled):last';
		if (!item.length){
			item = panel.children(dir=='next' ? firstSelector : lastSelector);
//			item = panel.children('div.combobox-item:visible:' + (dir=='next'?'first':'last'));
		} else {
			if (dir == 'next'){
				item = item.nextAll(firstSelector);
//				item = item.nextAll('div.combobox-item:visible:first');
				if (!item.length){
					item = panel.children(firstSelector);
//					item = panel.children('div.combobox-item:visible:first');
				}
			} else {
				item = item.prevAll(firstSelector);
//				item = item.prevAll('div.combobox-item:visible:first');
				if (!item.length){
					item = panel.children(lastSelector);
//					item = panel.children('div.combobox-item:visible:last');
				}
			}
		}
		if (item.length){
			item.addClass('combobox-item-hover');
			var row = opts.finder.getRow(target, item);
			if (row){
				scrollTo(target, row[opts.valueField]);
				if (opts.selectOnNavigation){
					select(target, row[opts.valueField]);
				}
			}
		}
	}
	
	/**
	 * select the specified value
	 */
	function select(target, value){
		var opts = $.data(target, 'combobox').options;
		var values = $(target).combo('getValues');
		if ($.inArray(value+'', values) == -1){
			if (opts.multiple){
				values.push(value);
			} else {
				values = [value];
			}
			setValues(target, values);
			opts.onSelect.call(target, opts.finder.getRow(target, value));
		}
	}
	
	/**
	 * unselect the specified value
	 */
	function unselect(target, value){
		var opts = $.data(target, 'combobox').options;
		var values = $(target).combo('getValues');
		var index = $.inArray(value+'', values);
		if (index >= 0){
			values.splice(index, 1);
			setValues(target, values);
			opts.onUnselect.call(target, opts.finder.getRow(target, value));
		}
	}
	
	/**
	 * set values
	 */
	function setValues(target, values, remainText){
		var opts = $.data(target, 'combobox').options;
		var panel = $(target).combo('panel');
		
		panel.find('div.combobox-item-selected').removeClass('combobox-item-selected');
		var vv = [], ss = [];
		for(var i=0; i<values.length; i++){
			var v = values[i];
			var s = v;
			opts.finder.getEl(target, v).addClass('combobox-item-selected');
			var row = opts.finder.getRow(target, v);
			if (row){
				s = row[opts.textField];
			}
			vv.push(v);
			ss.push(s);
		}
		
		$(target).combo('setValues', vv);
		if (!remainText){
			$(target).combo('setText', ss.join(opts.separator));
		}
	}
	
	/**
	 * load data, the old list items will be removed.
	 */
	function loadData(target, data, remainText){
		var state = $.data(target, 'lookup');
		var opts = state.options;
		state.data = opts.loadFilter.call(target, data);
		data = state.data;
		initGrid(target);
		var selected = $(target).lookup('getSelectedRow');  //$.data(target,"lookup")
        var dd = [];
		for(var i=0; i<data.length; i++){
			var row = data[i];
			var v = row[opts.valueField]+'';
			var s = row[opts.textField];
			var g = row[opts.groupField];
			
			if (g){
				if (group != g){
					group = g;
					state.groups.push(g);
					dd.push('<div id="' + (state.groupIdPrefix+'_'+(state.groups.length-1)) + '" class="combobox-group">');
					dd.push(opts.groupFormatter ? opts.groupFormatter.call(target, g) : g);
					dd.push('</div>');
				}
			} else {
				group = undefined;
			}
			var cls = 'combobox-item' + (row.disabled ? ' combobox-item-disabled' : '') + (g ? ' combobox-gitem' : '');
			dd.push('<div id="' + (state.itemIdPrefix+'_'+i) + '" class="' + cls + '">');
			dd.push(opts.formatter ? opts.formatter.call(target, row) : s);
			dd.push('</div>');
			if (row['selected'] && $.inArray(v, selected) == -1){
				selected.push(v);
			}
		}
		$(target).combo('panel').html(dd.join(''));
		opts.onLoadSuccess.call(target, data);
	}
	
	/**
	 * request remote data if the url property is setted.
	 */
	function request(target, url, param, remainText){
		var opts = $.data(target, 'lookup').options;
		if (url){
			opts.url = url;
		}
//		if (!opts.url) return;
		param = param || {};
		
		if (opts.onBeforeLoad.call(target, param) == false) return;

		opts.loader.call(target, param, function(data){
			loadData(target, data, remainText);
		}, function(){
			opts.onLoadError.apply(this, arguments);
		});
	}
	
	/**
	 * do the query action
	 */
	function doQuery(target, q){
		var state = $.data(target, 'lookup');
		var opts = state.options;
		if (opts.mode == 'remote'){
			request(target, null, {q:q}, true);
		} else {
			var panel = $(target).combo('panel');
			panel.find('div.combobox-item-selected,div.combobox-item-hover').removeClass('combobox-item-selected combobox-item-hover');
			panel.find('div.combobox-item,div.combobox-group').hide();
			var data = state.data;
			var vv = [];
			var qq = opts.multiple ? q.split(opts.separator) : [q];
			$.map(qq, function(q){
				q = $.trim(q);
				var group = undefined;
				for(var i=0; i<data.length; i++){
					var row = data[i];
					if (opts.filter.call(target, q, row)){
						var v = row[opts.valueField];
						var s = row[opts.textField];
						var g = row[opts.groupField];
						var item = opts.finder.getEl(target, v).show();
						if (s.toLowerCase() == q.toLowerCase()){
							vv.push(v);
							item.addClass('combobox-item-selected');
						}
						if (opts.groupField && group != g){
							$('#'+state.groupIdPrefix+'_'+$.inArray(g, state.groups)).show();
							group = g;
						}
					}
				}
			});
			setValues(target, vv, true);
		}
	}
	
	function doEnter(target){
		
		var t = $(target);
		var opts = t.lookup('options');
        var grid = $("#"+GLOBAL_LOOKUP_GRID_ID);
        if (grid){
            initGrid(target);
        }
        return ;
		var panel = t.lookup('panel');
		var item = panel.children('div.combobox-item-hover');
		if (item.length){
			var row = opts.finder.getRow(target, item);
			var value = row[opts.valueField];
			if (opts.multiple){
				if (item.hasClass('combobox-item-selected')){
					t.combobox('unselect', value);
				} else {
					t.combobox('select', value);
				}
			} else {
				t.combobox('select', value);
			}
		}
		var vv = [];
		$.map(t.combobox('getValues'), function(v){
			if (getRowIndex(target, v) >= 0){
				vv.push(v);
			}
		});
		t.combobox('setValues', vv);
		if (!opts.multiple){
			t.combobox('hidePanel');
		}
    }
    /**输入框事件处理 */
	function eventCreate(target){
        var _20 = $.data(target, "lookup");
		var _21 = _20.options;
		var _23 = _20.lookup;
		var _24 = _23.find(".lookup-text");
        var _25 = _23.find(".lookup-arrow");
        if (!_21.disabled && !_21.readonly) {
			_24.bind("click", function (e) {
				if (!_21.editable) {
					//_26.call(this);
				} else {
					var p = $(this).closest("div.lookup-panel");
					$("div.lookup-panel:visible").not(_22).not(p).panel("close");
				}
			}).bind("keydown.lookup paste.lookup drop.lookup", function (e) {
				switch (e.keyCode) {
				case 38:
					_21.keyHandler.up.call(target, e);
					break;
				case 40:
					_21.keyHandler.down.call(target, e);
					break;
				case 37:
					_21.keyHandler.left.call(target, e);
					break;
				case 39:
					_21.keyHandler.right.call(target, e);
					break;
				case 13:
					e.preventDefault();
					_21.keyHandler.enter.call(target, e);
					return false;
				case 9:
				case 27:
					_27(_1f); //esc??
					break;
				default:
					if (_21.editable) {
                        debugger;
						if (_20.timer) {
							clearTimeout(_20.timer);
						}
						_20.timer = setTimeout(function () {
								var q = _24.val();
								if (_20.previousValue != q) {
									_20.previousValue = q;
									$(_1f).lookup("showPanel");
									_21.keyHandler.query.call(_1f, _24.val(), e);
									$(_1f).lookup("validate");
								}
							}, _21.delay);
					}
				}
			});
			_25.bind("click.combo", function () {
				_26.call(this);
			}).bind("mouseenter.combo", function () {
				$(this).addClass("combo-arrow-hover");
			}).bind("mouseleave.combo", function () {
				$(this).removeClass("combo-arrow-hover");
			});
		}
    }
    function initGrid(target){
        var state = $.data(target,'lookup');
        var opt = state.options;
        if (!opt.columns && opt.QueryName){
            var cminfo = $.cm({
                dataType:"text",
                ClassName:"ext.websys.QueryBroker",
                MethodName:"ReadRSNew2",
                arg1:opt.ClassName,
                arg2:opt.QueryName
            },false);
            eval("var columns = ["+cminfo+"]");
            opt.columns = columns;
		}
        $("#"+GLOBAL_LOOKUP_GRID_ID).datagrid({
			height:opt.height,
			mode:opt.mode,
            //onDblClickHeader:function(e,field){e.preventDefault();var flag = $.cm({ClassName:"web.SSGroup",MethodName:"GetAllowWebColumnManager",Id:session['LOGON.GROUPID']},false);if(flag==1) websys_lu('../csp/websys.component.customiselayout.csp?ID='+54369,false);return false;},
            rownumbers:opt.rowNumber,
            pagination:true,
			pageSize:opt.pageSize,
			showPageList:false,
			//pageList:[opt.pageSize],
            striped:true,
            singleSelect:true,
            queryParams:{},
            url:opt.url,
			columns:opt.columns,
            onClickRow:function(rowIndex,rowData){
                selectRow("1^26^345^");
			},
			onBeforeLoad:function(param){
				var op ={};
				var qp = opt.queryParams;
				for(var i in qp ){
					if (typeof qp[i] === "object"){
						op[i]=$("#"+qp[i]["id"]).val(); /**code:{id:'arcim'} */
					}
					if (typeof qp[i] === "string") {
						op[i]=qp[i];	 /**desc:"arg1" */
					}
				}
				param = $.extend(param,op);
				return true;
			}
			
        });
    };
	/**
	 * create the component
	 */
	function create(target){
        $(target).addClass("lookup-text").attr("autocomplete","off"); //.hide();
        $(target).wrap("<span class=\"lookup\"></span>");
        $("<span><span class=\"lookup-arrow\"></span></span>").insertAfter(target);
        //var _d = $("<span class=\"combo\">" + "<input type=\"text\" class=\"combo-text\" autocomplete=\"off\">" + "<span><span class=\"combo-arrow\"></span></span>" + "<input type=\"hidden\" class=\"combo-value\">" + "</span>").insertAfter(target);
        var _d = $(target).parent();
        var _e = $("#"+GLOBAL_LOOKUP_GRID_ID);
        if (_e.length==0){
            _e = $("<div id=\""+GLOBAL_LOOKUP_GRID_ID+"\" class=\"lookup-panel\"></div>").appendTo("body");
        }
        /*_e.datagrid({

			doSize : false,
			closed : true,
			cls : "lookup-p",
			style : {
				position : "absolute",
				zIndex : 10
			},
			onOpen : function () {
				
			},
			onBeforeClose : function () {
				
			},
			onClose : function () {

			}
		});*/
		return {
			lookup : _d
		};      	
	}
	
	$.fn.lookup = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.lookup.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.lookup(options, param);
			}
		}
		
		options = options || {};
		return this.each(function(){
            //只初始化输入框的样式
            var state = $.data(this, 'lookup');
            if (state){
				$.extend(state.options, options);
				create(this);
			} else {
                state = $.data(this, 'lookup', {
                    options: $.extend({}, $.fn.lookup.defaults, $.fn.lookup.parseOptions(this), options)
                });
                var o = create(this);
                //$.data(this, 'lookup').lookup=o.lookup;
                state.lookup = o.lookup;
                eventCreate(this);
			}
		});
	};
	$.fn.lookup.methods = {
		options: function(jq){
			return $.data(jq[0], 'lookup').options;
		},
		clear: function(jq){
			return jq.each(function(){
                $.data(this, 'lookup') = null;
                $(this).lookup('clear');
			});
        },
        getText:function(jq){
            return jq.eq(0).val();
        },
        //把选中的行数据json绑到jquery对象上
        getSelectedRow:function(jq){
            return $.data(jq, 'lookup').selectedRow ;
            //return jq.data("selectedRowData");
        }
	};
	
	$.fn.lookup.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.fn.combo.parseOptions(target), $.parser.parseOptions(target,[
			'mode','method','url',"height"
		]));
	};
	
    $.fn.lookup.defaults = $.extend({},{
		url:$URL,
        height:300,
        rowNumber:true,
        pageSize:15,
        columns:undefined,/*优先级高于queryname*/
        ClassName:undefined,
        QueryName:undefined,        
		mode: 'local',	// or 'remote'
		method: 'post',
        data: null,
        delay:200,
		keyHandler: {
			up: function(e){nav(this,'prev');e.preventDefault()},
			down: function(e){nav(this,'next');e.preventDefault()},
			left: function(e){},
			right: function(e){},
			enter: function(e){ doEnter(this)},
			query: function(q,e){doQuery(this, q)}
		},
		filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].toLowerCase().indexOf(q.toLowerCase()) == 0;
		},
		formatter: function(row){
			var opts = $(this).combobox('options');
			return row[opts.textField];
		},
		loader: function(param, success, error){
			var opts = $(this).lookup('options');
			if (!opts.url) return false;
			$.ajax({
				type: opts.method,
				url: opts.url,
				data: param,
				dataType: 'json',
				success: function(data){
					success(data);
				},
				error: function(){
					error.apply(this, arguments);
				}
			});
		},
		loadFilter: function(data){
			return data;
		},
		finder:{
			getEl:function(target, value){
				var index = getRowIndex(target, value);
				var id = $.data(target, 'combobox').itemIdPrefix + '_' + index;
				return $('#'+id);
			},
			getRow:function(target, p){
				var state = $.data(target, 'combobox');
				var index = (p instanceof jQuery) ? p.attr('id').substr(state.itemIdPrefix.length+1) : getRowIndex(target, p);
				return state.data[parseInt(index)];
			}
		},
		
		onBeforeLoad: function(param){},
		onLoadSuccess: function(){},
		onLoadError: function(){},
		onSelect: function(record){},
		onUnselect: function(record){}
	});
})(jQuery);
