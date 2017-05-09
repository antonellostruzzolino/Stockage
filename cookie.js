(function(factory) {

    window.Cookie = new factory();

}) (function() {

    return {

        version: '0.1',

        get: function(key) {
            return this.list()[key] || null;
        },

        set: function(key, value, options) {
            document.cookie = 
                key + '=' + JSON.stringify(value) +
                (options.expires ? '; expires=' + options.expires : '') +
                (options.path    ? '; path=' + options.path : '') +
                (options.domain  ? '; domain=' + options.domain : '') +
                (options.secure  ? '; secure' : '')
        },

        has: function(key) {
            return this.get(key) ? true : false;
        },

        list: function() {            
            var list = {};
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            for (var i = 0; i < cookies.length; i++) {
                item = cookies[i].split('=');
                list[item[0]] = JSON.parse(item[1]);
            }
            return list;
        },

        remove: function(key) {
            this.set(key, '', { expires: 'Thu, 01 Jan 1970 00:00:00 GMT'});
        },

        clear: function() {            
           var cookies = document.cookie ? document.cookie.split('; ') : [];
            for (var i = 0; i < cookies.length; i++) {
                this.remove(cookies[i].split('=')[0]);
            }
        }
    }
});
