
Ext.define('GpsTracker.util.LoginHelper', {
    singleton: true,
    alternateClassName: ['LoginHelper'],
    requires: [
        'GpsTracker.util.Config',
        'GpsTracker.util.Common'
    ],
    config: {
        getUser: function() {
            if (Common.supportsHtml5Storage()) {
                var userString = localStorage.gpstrackerUser;
                if (userString) {
                    var user = JSON.parse(userString);
                    console.log('user loaded from local storage : ' + userString);
                    return user;
                } else {
                    console.log("No user in local storage");
                    null;
                }
            } else {
                console.error("Local storage not supported");
                return null;
            }
        },
        setUser: function(user) {
            if (Common.supportsHtml5Storage()) {
                var userString = JSON.stringify(user);
                localStorage.gpstrackerUser = userString;
                console.log('user saved into local storage : ' + userString);
            } else {
                console.error("Local storage not supported");
                return null;
            }
        },
        removeUser: function() {
            localStorage.removeItem('gpstrackerUser');
        },
        // ,
        //  getVehicles: function() {
        //         if (Common.supportsHtml5Storage()) {
        //             var vehicleString = sessionStorage.gpsVehicles;
        //             if (vehicleString) {
        //                 var journey = JSON.parse(vehicleString);
        //                 console.log('journey loaded from session storage : ' + vehicleString);
        //                 return journey;
        //             } else {
        //                 console.log("No journey in session storage");
        //                 null;
        //             }
        //         } else {
        //             console.error("Session storage not supported");
        //             return null;
        //         }
        //     },
        // setVehicles: function(vehicles) {
        //         if (Common.supportsHtml5Storage()) {
        //             var vehicleString = JSON.stringify(vehicles);
        //             sessionStorage.gpsVehicles = vehicleString;
        //             console.log('vehicles saved into session storage : ' + vehicleString);
        //         } else {
        //             console.error("Session storage not supported");
        //             return null;
        //         }
        //     },
        //     removeVehicles: function() {
        //         sessionStorage.removeItem('gpsVehicles');
        // },
        login: function(user) {
            Ext.Ajax.request({
                url: GpsTracker.util.Config.url.GpsTracker_LOGIN,
                //jsonData : {email : user.email, password : user.password},
                success: function(response, opts) {
                    var data = Ext.decode(response.responseText);
                    console.log('success : ' + response.responseText);
                    if (data.success) {
                        LoginHelper.setUser(data.users[0]);
                        Ext.Viewport.unmask();
                        //Ext.Viewport.removeAll(true, true);
                        //Ext.Viewport.add(Ext.create('RacloopApp.view.Main'));
                    } else {
                        Ext.Viewport.unmask();
                        Ext.Msg.alert(data.message);
                    }
                },
                failure: function(response, opts) {
                    Ext.Viewport.unmask();
                    Ext.Msg.alert('Network Error');
                }
            });
        }
    },
    constructor: function() {
        return this.config;
    }
});