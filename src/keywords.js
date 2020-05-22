(function($){
	/**
	 * @param {Document} target
	 * @param {String} labedid id1-id2-id3
	 * @returns 返回id对应的json
	*/
	function getLabelItem(target, labelid){
		var opts = $.data(target, 'keywords').options;
		var items = opts.items;
		var labelidArr = labelid.split("-");
		if (labelidArr.length==1){
			return items[labelidArr[0]];
		}
		if(labelidArr.length==2){
			return items[labelidArr[0]].items[labelidArr[1]];
		}
		if (labelidArr.length==3){
			return items[labelidArr[0]].items[labelidArr[1]].items[labelidArr[2]];
		}
	}
	function createKeywords(target){
		var t = $(target).empty();
		var opts = $.data(target, 'keywords').options;
		if(opts.labelCls!='blue') t.addClass("keywords-label"+opts.labelCls);
		var html = '';
		$.each(opts.items,function(indc,chp){
			if(chp.type=="chapter"){
				html +='<div class="kw-chapter">';
				if(chp.text!="") html += '<a></a>'+$.hisui.getTrans(chp.text); //章节为空时,不显示前台蓝条 //add trans
				html +='</div><div class="kw-line"></div>';
				$.each(chp.items,function(inds,sec){
					if(sec.type=='section'){
						html +='<div class="kw-section"><div class="kw-section-header">'+$.hisui.getTrans(sec.text)+'</div>'; //add trans
						if (sec.items){
							html += '<ul class="kw-section-list keywords">';
						}
						$.each(sec.items, function(indl,lbl){
							var s = lbl.selected?'class="selected"':'';
							html += '<li id="'+(lbl.id||lbl.text)+'" rowid="'+indc+'-'+inds+'-'+indl+'" '+s+'><a>'+$.hisui.getTrans(lbl.text)+'</a></li>'; //add trans
						});
						if (sec.items){
							html +='</ul>'
						}
						html += '</div>' //kw-section end
					}else{ //默认label
						if (inds==0) {html += '<ul class="kw-section-list keywords">';}
						var s = sec.selected?'class="selected"':'';
						html += '<li id="'+(sec.id||sec.text)+'" rowid="'+indc+'-'+inds+'" '+s+'><a>'+$.hisui.getTrans(sec.text)+'</a></li>'; //add trans
						if (inds==(chp.items.length-1)) html +='</ul>';
					}
				});
			}else if(chp.type=="section"){
				html +='<div class="kw-section"><div class="kw-section-header">'+$.hisui.getTrans(chp.text)+'</div>'; //add trans
				if (chp.items){
					html += '<ul class="kw-section-list keywords">';
				}
				$.each(chp.items, function(indl,lbl){
					var s = lbl.selected?'class="selected"':'';
					html += '<li id="'+(lbl.id||lbl.text)+'" rowid="'+indc+'-'+indl+'" '+s+'><a>'+$.hisui.getTrans(lbl.text)+'</a></li>' //add trans
				});
				if (chp.items){
					html +='</ul>'
				}
				html += '</div>' //kw-section end
			}else{
				if (indc==0) {html += '<ul class="kw-section-list keywords">';}
				var s = chp.selected?'class="selected"':'';
				html += '<li id="'+(chp.id||chp.text)+'" rowid="'+indc+'" '+s+'><a>'+$.hisui.getTrans(chp.text)+'</a></li>'; //add trans
				if (indc==(opts.items.length-1)) html +='</ul>';
			}
		});
		t.append(html);
        t.off('click').on('click','ul.kw-section-list>li',function(e,value){
			var id = $(this).attr('id');
			selectById(target,id);
			return false;
        });
	}
	
	$.fn.keywords = function(options, param){
		if (typeof options == 'string'){
			return $.fn.keywords.methods[options](this, param);
		}
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'keywords');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'keywords', {
					options: $.extend({}, $.fn.keywords.defaults, $.fn.keywords.parseOptions(this), options)
				});
			}
			createKeywords(this);
		});
	};
	function selectById(t,id){
		var target = $(t);
		var opts = $.data(t, 'keywords').options;
		if(opts.singleSelect){
			target.find('li.selected').removeClass('selected');
		}
		var _t = target.find('li#'+id);
		_t.toggleClass('selected');
		var item = getLabelItem(t, _t.attr("rowid"));
		opts.onClick.call(this, item);
		if (!opts.singleSelect){ //单选不进入select与unselect事件
			if(_t.hasClass('selected')){
				opts.onSelect.call(this,item);
			}else{
				opts.onUnselect.call(this,item);
			}
		}
	}
	function clearSelected(target){
		console.log(target);
		$(target).find('li.selected').removeClass('selected');
	}
	function getAllSelected(target){
		var rs=[];
		$(target).find('li.selected').each(function(){
			rs.push(getLabelItem(target, $(this).attr("rowid")));
		});
		return rs;
	}
	$.fn.keywords.methods = {
		options: function(jq){
			if (jq.length>0) return $.data(jq[0], 'keywords').options;
		},
		getSelected:function(jq){
			if (jq.length>0) return getAllSelected(jq[0]);
		},
		select:function(jq,id){
			if (jq.length>0) return selectById(jq[0],id);
		},
		switchById:function(jq,id){
			if (jq.length>0) return selectById(jq[0],id);
		},
		clearAllSelected:function(jq,id){
			jq.each(function(ind,item){
				clearSelected(item);
			});
		}
    };
    
	$.fn.keywords.parseOptions = function(target){
		var t = $(target);
		return $.extend({}, $.parser.parseOptions(target, 
			['id','iconCls','iconAlign','group','size',{plain:'boolean',toggle:'boolean',selected:'boolean'}]
		), {
			disabled: (t.attr('disabled') ? true : undefined)
		});
	};
	
	$.fn.keywords.defaults = {
		singleSelect:false,
        labelCls:'blue', //red
		onClick:function(value){},
		onUnselect:function(value){},
		onSelect:function(value){}
	};
})(jQuery);
