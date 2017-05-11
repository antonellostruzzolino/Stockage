(function(factory) {

    window.Stockage = {
        Local: new factory(localStorage),
        Session: new factory(sessionStorage),
        Cookie: new factory(),
        version: '0.2'
    };

}) (function(container) {

    var isStorageAvaiable = (function (container) {

        if (container !== null) {
            var check = 'Stockage';            
            try {
                container.setItem(check, check);
                container.removeItem(check);
                return true;
            } catch (e) {
                console.log('Local Storage is not supported!');
                return false;
            }
        }
        return false;

    }) (container);

    if (isStorageAvaiable) {

        return {

            get: function(key) {
                return JSON.parse(container.getItem(key));
            },

            set: function(key, value) {
                container.setItem(key, JSON.stringify(value));
            },

            has: function(key) {
                var result = this.get(key);
                return (result !== null || typeof result !== 'undefined') ? true : false;
            },

            list: function() {
                var list = {};
                for (var i in container) {
                    var item = this.get(i);
                    if (item) {
                        list[i] = item;
                    }
                }
                return list;
            },

            remove: function(key) {
                container.removeItem(key)
            },

            clear: function() {
                container.clear()
            }
        }
        
    } else if (container !== null) {

        return {

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
    }

    return {};
});