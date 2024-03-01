(function ($) {
    function _8e9(_8ea) {
        var _8eb = $.data(_8ea, "combotree");
        var opts = _8eb.options;
        var tree = _8eb.tree;
        $(_8ea).addClass("combotree-f");
        $(_8ea).combo(opts);
        var _8ec = $(_8ea).combo("panel");
        if (!tree) {
            tree = $("<ul></ul>").appendTo(_8ec);
            $.data(_8ea, "combotree").tree = tree;
        }
        tree.tree($.extend({}, opts, {
            checkbox: opts.multiple, onLoadSuccess: function (node, data) {
                var _8ed = $(_8ea).combotree("getValues");
                if (opts.multiple) {
                    var _8ee = tree.tree("getChecked");
                    for (var i = 0; i < _8ee.length; i++) {
                        var id = _8ee[i].id;
                        (function () {
                            for (var i = 0; i < _8ed.length; i++) {
                                if (id == _8ed[i]) {
                                    return;
                                }
                            }
                            _8ed.push(id);
                        })();
                    }
                }
                var _8ef = $(this).tree("options");
                var _8f0 = _8ef.onCheck;
                var _8f1 = _8ef.onSelect;
                _8ef.onCheck = _8ef.onSelect = function () {
                };
                $(_8ea).combotree("setValues", _8ed);
                _8ef.onCheck = _8f0;
                _8ef.onSelect = _8f1;
                opts.onLoadSuccess.call(this, node, data);
            }, onClick: function (node) {
                if (opts.multiple) {
                    $(this).tree(node.checked ? "uncheck" : "check", node.target);
                } else {
                    $(_8ea).combo("hidePanel");
                }
                _8f3(_8ea);
                opts.onClick.call(this, node);
            }, onCheck: function (node, _8f2) {
                _8f3(_8ea);
                opts.onCheck.call(this, node, _8f2);
            }
        }));
    };
    function _8f3(_8f4) {
        var _8f5 = $.data(_8f4, "combotree");
        var opts = _8f5.options;
        var tree = _8f5.tree;
        var vv = [], ss = [];
        if (opts.multiple) {
            var _8f6 = tree.tree("getChecked");
            for (var i = 0; i < _8f6.length; i++) {
                vv.push(_8f6[i].id);
                ss.push(_8f6[i].text);
            }
        } else {
            var node = tree.tree("getSelected");
            if (node) {
                vv.push(node.id);
                ss.push(node.text);
            }
        }
        $(_8f4).combo("setValues", vv).combo("setText", ss.join(opts.separator));
    };
    function _8f7(_8f8, _8f9) {
        var opts = $.data(_8f8, "combotree").options;
        var tree = $.data(_8f8, "combotree").tree;
        tree.find("span.tree-checkbox").addClass("tree-checkbox0").removeClass("tree-checkbox1 tree-checkbox2");
        var vv = [], ss = [];
        for (var i = 0; i < _8f9.length; i++) {
            var v = _8f9[i];
            var s = v;
            var node = tree.tree("find", v);
            if (node) {
                s = node.text;
                tree.tree("check", node.target);
                tree.tree("select", node.target);
            }
            vv.push(v);
            ss.push(s);
        }
        $(_8f8).combo("setValues", vv).combo("setText", ss.join(opts.separator));
    };
    function _doFilter(target, q) {
        var state = $.data(target, "combotree");
        var opts = state.options;
        var tree = state.tree;
        state.remainText = true;
        tree.tree("doFilter", opts.multiple ? q.split(opts.separator) : q);
    }
	function _enter(target){
        var state=$.data(target,"combotree");
        state.remainText=false;
        $(target).combotree("setValues",$(target).combotree("getValues"));
        $(target).combotree("hidePanel");
	};
    $.fn.combotree = function (_8fa, _8fb) {
        if (typeof _8fa == "string") {
            var _8fc = $.fn.combotree.methods[_8fa];
            if (_8fc) {
                return _8fc(this, _8fb);
            } else {
                return this.combo(_8fa, _8fb);
            }
        }
        _8fa = _8fa || {};
        return this.each(function () {
            var _8fd = $.data(this, "combotree");
            if (_8fd) {
                $.extend(_8fd.options, _8fa);
            } else {
                $.data(this, "combotree", { options: $.extend({}, $.fn.combotree.defaults, $.fn.combotree.parseOptions(this), _8fa) });
            }
            _8e9(this);
        });
    };
    $.fn.combotree.methods = {
        options: function (jq) {
            var _8fe = jq.combo("options");
            return $.extend($.data(jq[0], "combotree").options, { originalValue: _8fe.originalValue, disabled: _8fe.disabled, readonly: _8fe.readonly });
        }, tree: function (jq) {
            return $.data(jq[0], "combotree").tree;
        }, loadData: function (jq, data) {
            return jq.each(function () {
                var opts = $.data(this, "combotree").options;
                opts.data = data;
                var tree = $.data(this, "combotree").tree;
                tree.tree("loadData", data);
            });
        }, reload: function (jq, url) {
            return jq.each(function () {
                var opts = $.data(this, "combotree").options;
                var tree = $.data(this, "combotree").tree;
                if (url) {
                    opts.url = url;
                }
                tree.tree({ url: opts.url });
            });
        }, setValues: function (jq, _8ff) {
            return jq.each(function () {
                _8f7(this, _8ff);
            });
        }, setValue: function (jq, _900) {
            return jq.each(function () {
                _8f7(this, [_900]);
            });
        }, clear: function (jq) {
            return jq.each(function () {
                var tree = $.data(this, "combotree").tree;
                tree.find("div.tree-node-selected").removeClass("tree-node-selected");
                var cc = tree.tree("getChecked");
                for (var i = 0; i < cc.length; i++) {
                    tree.tree("uncheck", cc[i].target);
                }
                $(this).combo("clear");
            });
        }, reset: function (jq) {
            return jq.each(function () {
                var opts = $(this).combotree("options");
                if (opts.multiple) {
                    $(this).combotree("setValues", opts.originalValue);
                } else {
                    $(this).combotree("setValue", opts.originalValue);
                }
            });
        }
    };
    $.fn.combotree.parseOptions = function (_901) {
        return $.extend({}, $.fn.combo.parseOptions(_901), $.fn.tree.parseOptions(_901));
    };
    $.fn.combotree.defaults = $.extend({}, $.fn.combo.defaults, $.fn.tree.defaults, { 
        editable: false,
        textField: null,
        unselectedValues: [],
        mappingRows: [],
        keyHandler:{
            up: function(e) {},
            down: function(e) {},
            left: function(e) {},
            right: function(e) {},
            enter: function(e) {
                _enter(this);
            },
            query: function(q, e) {
                _doFilter(this, q);
            }
        }
    });
})(jQuery);