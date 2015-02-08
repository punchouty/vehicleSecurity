Ext.define('GpsTracker.view.MainTrackForm', {
    extend: 'Ext.form.Panel',
    xtype: 'mainTrackForm',

    requires: ['GpsTracker.store.Routes'],
     config: {
        items: [{
          xtype: 'titlebar', 
          title: 'Track',
          itemId:'trackForm',
          items:[{
            xtype:'button',
            text: 'Logout',
            align: 'right',
            itemId: 'logoutButton'
            // handler: function(){
            //     alert('button clicked!');
            // }
          }]  
        },{
            xtype: 'fieldset',           
            items: [{  
                xtype: 'selectfield',
                label: 'Routes*',
                name: 'route_id',
                store: 'routeStore',
                displayField: 'name',
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
            itemId: 'startStopTracking',
            enableToggle: true,
            pressed: false,
            text: 'Start',
            ui: 'action',
            margin: 20,
            padding: 8
        }

        ]
    },initialize: function() {
       console.log('initialize  view   '+LoginHelper.getUser().id);
       var routeStore = Ext.getStore('routeStore');
       routeStore.getProxy().setExtraParams({
        user: LoginHelper.getUser().id
       })
     
       routeStore.load();
     //  console.log(routeStore.getData());
        //  for (i=0; i < jsonObj.length; i++ ) {
        //   options.push({text: jsonObj[i].registration_no, value: jsonObj[i].id})
        // }
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
