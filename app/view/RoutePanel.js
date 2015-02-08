Ext.define('GpsTracker.view.RoutePanel', {
    extend: 'Ext.Panel',
    alias: 'widget.routePanel',

    requires: [
        'Ext.Label'
    ],

    config: {
        routeId: null,        
        items: [{
            xtype: 'label',
            centered: true,
            //html: 'Frequently Asked Question',
            itemId: 'routeLabel',
            flex: 2
        },
        {
            xtype: 'button',
            itemId: 'startStopRecordingBtn',
            ui: 'action',
            margin: 10,
            flex: 3,
            enableToggle: true,
            pressed: false,
            text: 'Start Recording',
            margin: 20,
            padding: 8
        }]
    }

});