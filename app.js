/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'GpsTracker',

    requires: [
        'Ext.MessageBox',
        'GpsTracker.util.Config',
        'GpsTracker.util.Common',
        'GpsTracker.util.LoginHelper'
    ],

     views: [
        'SuperNavigationView',
        'AdminNavigationView',
        'MainNavigationView',
        'LoginForm',
        'MainTrackForm',       
        'ForgotPasswordForm',
        'RouteForm',
        'DeviceForm',
        'RoutePanel'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },
    controllers: [
        'AccountController',
        'SettingsController'
    ],  
     models: [
        'LoginCredential',
        'ForgotPassword',
        'Device',
        'Route',
        'Vehicle'
    ],   
    stores: [
      'Routes',
      'Vehicles'
    ],

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        this.cleanup();
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        // Ext.create('GpsTracker.view.MainNavigationView', {
        //     fullscreen: true
        // });
        Ext.Viewport.add(Ext.create('GpsTracker.view.MainNavigationView'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    cleanup: function() {
        //Message box issue
        //Based upon http://www.sencha.com/forum/showthread.php?284450
        Ext.Component.prototype.animateFn = // or Ext.override( Ext.Component, { animateFn:
            function(animation, component, newState, oldState, options, controller) {
                var me = this;
                if (animation && (!newState || (newState && this.isPainted()))) {


                    this.activeAnimation = new Ext.fx.Animation(animation);
                    this.activeAnimation.setElement(component.element);


                    if (!Ext.isEmpty(newState)) {
                        var onEndInvoked = false;
                        var onEnd = function() {
                            if (!onEndInvoked) {
                                onEndInvoked = true;
                                me.activeAnimation = null;
                                controller.resume();
                            }
                        };


                        this.activeAnimation.setOnEnd(onEnd);
                        window.setTimeout(onEnd, 50 + (this.activeAnimation.getDuration() || 500));


                        controller.pause();
                    }


                    Ext.Animator.run(me.activeAnimation);
                }
            };
    }
});
