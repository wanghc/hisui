//jquery.cookie.js
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var pluses = /\+/g;
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }
    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var config = $.cookie = function (key, value, options) {
        // Write
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }
            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }
        // Read
        var result = key ? undefined : {};
        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }
            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }
        return result;
    };
    config.defaults = {};
    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }
        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };
}));
//newtip.js
;(function($){
    var config = {}
    config.defaults = {
        newVersion:1,
        newType:'newtipversion',/*版本用于cookie名*/
        right:12,
        insertBody:true,/*默认【新】元素插入到body中，不破坏目标对象结构，否则插入当前jquery对象后面*/
        text:'新'
    };
    $.fn.newtip = function(opt){
        opt = $.extend({}, config.defaults, opt);
        var cookieVersion = $.cookie(opt.newType);
        var _newTipClsName = 'x-newtip';
        if (cookieVersion!=opt.newVersion){
            return this.each(function(){
                var _t = $(this);
                var width = _t.width();
                var newtipcount = $('.'+_newTipClsName).length;
                if (opt.insertBody){
                    var coords = _t.offset();
                    //font-size: 10px;position:absolute;color:red;z-index:1000;
                    var newtipobj = $('<div class="'+_newTipClsName+'" data-ind="'+newtipcount+'">'+opt.text+'</div>').appendTo("body")
                        .offset({top:coords.top,left:coords.left+width-opt.right});
                }else{
                    var newtipobj = $('<span class="'+_newTipClsName+'" data-ind="'+newtipcount+'">'+opt.text+'</span>').appendTo(_t)
                        .position({left:width-opt.right}); //.offset({top:coords.top,left:coords.left+width-opt.right});
                }
                _t.data("newtip-ind",newtipcount);
                //this.data("options",opt);
                _t.one('click',function(){
                    var _t_ = $(this);
                    //var opt = _t.data("options");
                    $('.'+_newTipClsName+'[data-ind="'+_t_.data("newtip-ind")+'"]').remove();
                    if ("undefined"==typeof opt.expires){
                        $.cookie(opt.newType,opt.newVersion);
                    }else{
                        $.cookie(opt.newType,opt.newVersion,{expires:opt.expires});
                    }
                });
            });
        }
        return this;
    }
})(jQuery);