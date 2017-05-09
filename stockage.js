(function(factory) {

    window.Stockage = {
        Local: new factory(localStorage),
        Session: new factory(sessionStorage),
        version: '0.2'
    };

}) (function(container) {

    var check = 'Stockage';

    try {
        container.setItem(check, check);
        container.removeItem(check);
    } catch (e) {
        console.log('Local Storage is not supported!');
        return {};
    }

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
});