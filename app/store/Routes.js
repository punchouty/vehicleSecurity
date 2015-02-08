Ext.define('GpsTracker.store.Routes', {
    extend: 'Ext.data.Store',
    xtype: 'routeStore',
    requires: [
        'GpsTracker.util.Config'
    ],
    config: {
        model: 'GpsTracker.model.Route',
        storeId: 'routeStore',
        autoLoad: false,
        proxy: {
            type: 'ajax',
            url: GpsTracker.util.Config.url.GPSTRACKER_ROUTES,
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },            
            withCredentials: true,
            useDefaultXhrHeader: false,
            // extraParams: {
            //         id: LoginHelper.getUser().id
            // },
            reader: {
                type: "json",
                rootProperty: "routes",
                totalProperty: 'total',
                successProperty: 'success'
            }
        },
        listeners: {
            beforeload: function() {
                console.log('Before load');
            },
            load: function() {
                console.log('loaded');
            }
        }
    }
});