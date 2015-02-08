
Ext.define('GpsTracker.view.AdminNavigationView', {
    extend: 'GpsTracker.view.SuperNavigationView',
    alias: 'widget.adminNavigationView',

    requires: [
        'Ext.Panel',
        'Ext.Button',
        'Ext.Label'
    ],

    config: {
        items: [{
            title: 'Welcome',
            xtype: 'panel',
            itemId: 'adminPanel',
            layout: 'vbox',
            //align: 'center',
            //pack: 'center',
            // style: "background: url('/resources/images/123.jpg') no-repeat center ",
            items: [{
                xtype: 'container',
                html: '<div class="plan plan-center"><div class="plan-name-silver"><h2>Gps Tracker</h2><span class="sub-plan"></span></div><ul><li class="plan-feature"></li></ul></div>',
                itemId: 'adminLabel',
                flex: 2

            }, {
                xtype: 'panel',
                itemId: 'adminButtonPanel',
                flex: 1,
                items: [{
                    xtype: 'button',
                    itemId: 'newRouteButton',
                    ui: 'action',
                    margin: 10,
                    //padding: 4,
                    text: 'New Route'
                },  {
                    xtype: 'button',
                    itemId: 'newDeviceButton',
                    margin: 10,
                    //padding: 4,
                    text: 'New Device',
                    ui: 'decline'
                }]
            }]
        }]
    }

});