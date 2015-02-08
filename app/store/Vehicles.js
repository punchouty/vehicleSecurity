Ext.define('GpsTracker.store.Vehicles', {
    extend: 'Ext.data.Store',
    xtype: 'vehicleStore',
    requires: [
        'GpsTracker.util.Config'
    ],
    config: {
        model: 'GpsTracker.model.Vehicle',
        storeId: 'vehicleStore',
        autoLoad: false,
        proxy: {
            type: 'ajax',
            url: GpsTracker.util.Config.url.GPSTRACKER_VEHICLES,
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
                rootProperty: "vehicles",
                totalProperty: 'total',
                successProperty: 'success'
            }
        },
        listeners: {
            beforeload: function() {
                console.log('Before load');
            },
            load: function() {
                console.log(this.getData());
            }
        }
    }
});