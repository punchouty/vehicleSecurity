Ext.define('GpsTracker.util.Common', {
    singleton: true,
    alternateClassName: ['Common'],

    config: {
        supportsHtml5Storage: function() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        }
    },
    constructor: function() {
        return this.config;
    }
});