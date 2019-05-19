(function ($) {     //cryze from 1.5
    function _68(_69) {
        $(_69).addClass("droppable");
        $(_69).bind("_dragenter", function (e, _6a) {
            $.data(_69, "droppable").options.onDragEnter.apply(_69, [e, _6a]);
        });
        $(_69).bind("_dragleave", function (e, _6b) {
            $.data(_69, "droppable").options.onDragLeave.apply(_69, [e, _6b]);
        });
        $(_69).bind("_dragover", function (e, _6c) {
            $.data(_69, "droppable").options.onDragOver.apply(_69, [e, _6c]);
        });
        $(_69).bind("_drop", function (e, _6d) {
            $.data(_69, "droppable").options.onDrop.apply(_69, [e, _6d]);
        });
    };
    $.fn.droppable = function (_6e, _6f) {
        if (typeof _6e == "string") {
            return $.fn.droppable.methods[_6e](this, _6f);
        }
        _6e = _6e || {};
        return this.each(function () {
            var _70 = $.data(this, "droppable");
            if (_70) {
                $.extend(_70.options, _6e);
            } else {
                _68(this);
                $.data(this, "droppable", {
                    options: $.extend({}, $.fn.droppable.defaults, $.fn.droppable.parseOptions(this), _6e)
                });
            }
        });
    };
    $.fn.droppable.methods = {
        options: function (jq) {
            return $.data(jq[0], "droppable").options;
        },
        enable: function (jq) {
            return jq.each(function () {
                $(this).droppable({
                    disabled: false
                });
            });
        },
        disable: function (jq) {
            return jq.each(function () {
                $(this).droppable({
                    disabled: true
                });
            });
        }
    };
    $.fn.droppable.parseOptions = function (_71) {
        var t = $(_71);
        return $.extend({}, $.parser.parseOptions(_71, ["accept"]), {
            disabled: (t.attr("disabled") ? true : undefined)
        });
    };
    $.fn.droppable.defaults = {
        accept: null,
        disabled: false,
        onDragEnter: function (e, _72) {},
        onDragOver: function (e, _73) {},
        onDragLeave: function (e, _74) {},
        onDrop: function (e, _75) {}
    };
})(jQuery);