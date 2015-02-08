Ext.define('GpsTracker.view.DeviceForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.newDeviceForm',
     requires: [
        'Ext.device.Device',
        'Ext.field.Hidden',
        'GpsTracker.store.Vehicles',
        'Ext.field.Number'
     ],
    config: {

        items: [{
            xtype: 'fieldset',
            // title: 'New Route',
            instructions: "Create New Device",
            itemId: 'deviceForm',
            items: [{
                name: 'mobile_no',
                xtype: 'numberfield',
                label: 'Mobile Number',
                //labelWidth: '40%',
                itemId: 'newDeviceMobile'
            },{
                // name: 'vehicle',
                // xtype: 'textfield',
                // label: 'Vehicle',
                // //labelWidth: '40%',

                itemId: 'newDeviceVehicle',
                xtype: 'selectfield',
                label: 'vehicles:',
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
        },{
                    xtype: 'hiddenfield',
                    itemId: 'newDeviceImei',
                    name: 'imei_no'            
        },{
            xtype: 'button',
            itemId: 'createDeviceButton',
            text: 'Create Device',
            action: 'createdevice',
            ui: 'decline',
            margin: 20,
            padding: 8
        }]
    },
    initialize: function() {
       var vehicleStore = Ext.getStore('vehicleStore');
       vehicleStore.getProxy().setExtraParams({
        user: LoginHelper.getUser().id
       });
       
       vehicleStore.load();

       // var me =this;
       // var jsonObj = LoginHelper.getVehicles().vehicles ,
       //      options = [{text: 'Select', value: ''}],
       //      i,
       //      selectField;
       
       //  for (i=0; i < jsonObj.length; i++ ) {
       //    options.push({text: jsonObj[i].registration_no, value: jsonObj[i].id})
       //  }
       //  selectField = me.down('#newDeviceVehicle');
       //  selectField.setOptions(options);
        this.down("#newDeviceImei").setValue(Ext.device.Device.uuid);

    }
    
});
