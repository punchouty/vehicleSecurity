
Ext.define('GpsTracker.view.MainNavigationView', {
    extend: 'Ext.navigation.View',
    alias: 'widget.mainNavigationView',

    requires: [
        'Ext.Panel',
        'Ext.Button',
        'Ext.Label'
    ],

    config: {
        items: [{
            title: 'Welcome',
            xtype: 'panel',
            itemId: 'homePanel',
            layout: 'vbox',
            id: 'homePanel',
            //align: 'center',
            //pack: 'center',
            // style: "background: url('/resources/images/123.jpg') no-repeat center ",
            items: [{
                xtype: 'container',
                html: '<div class="plan plan-center"><div class="plan-name-silver"><h2>Gps Tracker</h2><span class="sub-plan"></span></div><ul><li class="plan-feature"></li></ul></div>',
                itemId: 'homeLabel',
                flex: 2

            }, {
                xtype: 'panel',
                itemId: 'loginPanel',
                flex: 1,
                items: [{
                    xtype: 'button',
                    itemId: 'showLoginButton',
                    ui: 'action',
                    margin: 10,
                    //padding: 4,
                    text: 'Sign In'
                },  {
                    xtype: 'button',
                    itemId: 'showForgotPasswordButton',
                    margin: 10,
                    //padding: 4,
                    text: 'Forgot Password',
                    ui: 'decline'
                }]
            }]
        }]
    }

});