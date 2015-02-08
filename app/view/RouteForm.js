Ext.define('GpsTracker.view.RouteForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.newRouteForm',
    requires: [
         'Ext.form.FieldSet',
         'Ext.ux.field.TimePicker',
         'GpsTracker.store.Vehicles'
    ],
    config: {

        items: [{
            xtype: 'fieldset',
            // title: 'New Route',
            instructions: "Create New Route",
            itemId: "routeForm",
            items: [{
                name: 'name',
                xtype: 'textfield',
                label: 'Route Name*',
                //labelWidth: '40%',
                itemId: 'newRouteName'
            },{
                    name: 'start_time',
                    xtype: 'timepickerfield',
                    label: 'Time*',
                    minuteIncrement: '15',
                    itemId: 'newRouteTime'
             }, {
                // name: 'vehicle',
                // xtype: 'textfield',
                // label: 'Vehicle',
                // //labelWidth: '40%',

                itemId: 'newRouteVehicle',
                xtype: 'selectfield',
                label: 'vehicles*',
                name: 'vehicle_id',
                store: 'vehicleStore',
                displayField: 'registration_no',
                valueField: 'id'
                // options
                // listeners: {
                //     change: function (select, newValue, oldValue) {
                //         if (oldValue) {
                //             var debug = Ext.String.format('<p><b>newValue:</b> {0}</p><p><b>oldValue:</b> {1}</p>',
                //                             Ext.JSON.encode(newValue.data),
                //                             Ext.JSON.encode(oldValue.data));
                //             Ext.Msg.alert('selectfield change dispatched:', debug);
                //         } else {
                //             alert('oldValue is undefined');
                //         }
                //     } // change
                // }   
            }]
        }, {
            xtype: 'button',
            itemId: 'createRouteButton',
            text: 'Create Route',
            action: 'createroute',
            ui: 'decline',
            margin: 20,
            padding: 8
        }]
    },initialize: function() {
       var vehicleStore = Ext.getStore('vehicleStore');
       vehicleStore.getProxy().setExtraParams({
        user: LoginHelper.getUser().id
       });
       
       vehicleStore.load();
       // console.log('initialize listCategory view');
       // var me =this;
       // var jsonObj = LoginHelper.getVehicles().vehicles ,
       //      options = [{text: 'Select', value: ''}],
       //      i,
       //      selectField;
       
       //  for (i=0; i < jsonObj.length; i++ ) {
       //    options.push({text: jsonObj[i].registration_no, value: jsonObj[i].id})
       //  }
       //  selectField = me.down('#newRouteVehicle');
       //  selectField.setOptions(options);
    }
});
