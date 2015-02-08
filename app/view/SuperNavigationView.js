Ext.define('GpsTracker.view.SuperNavigationView', {
    extend: 'Ext.navigation.View',
    alias: 'widget.superNavView',

    config: {
        autoDestroy: false,        
        navigationBar: {
            items: [
                {
                    xtype: 'button',
                    text: 'Logout',
                    align: 'right',
                    itemId: 'logoutBtn'
                   //  handler: function() {                        
                   //       var routePanelBtn = Ext.ComponentQuery.query("routePanel #startStopRecordingBtn");
                   //      // mainPanel.animateActiveItem(0,{type: 'flip' });
                   //      console.dir(routePanelBtn);
                   //       clearInterval(GpsTracker.util.Config.intervalID.stopIntervalID);
                   // }
                }
            ],
            docked: 'top'
        }
    }

});