Ext.define('GpsTracker.controller.SettingsController', {
    extend: 'Ext.app.Controller',
   
    requires: [
        'GpsTracker.view.AdminNavigationView',
        'Ext.device.Device',
        'Ext.Toast',
        'Ext.device.Device',
        'Ext.util.Geolocation'
    ],
    config: {
        refs: {
            adminNavigationView: 'adminNavigationView',
            mainNavigationView: 'mainNavigationView',
            routeForm: "newRouteForm",
            deviceForm: "newDeviceForm",
            routeButton: 'adminNavigationView #newRouteButton',
            deviceButton: 'adminNavigationView #newDeviceButton',
            createRouteBtn: "newRouteForm #createRouteButton",
            createDeviceBtn: "newDeviceForm #createDeviceButton",
            routePanel: "routePanel",
            startStopRecordingButton: "routePanel #startStopRecordingBtn",
            mainTrackForm: 'mainTrackForm',
            routeTrackBtn: 'mainTrackForm #startStopTracking'
        },

        control: {
            // "mainTabs #infoNavigationView": {
            //     back: 'goBack'
            // },
            // "infoNavigationView #settingsMenuButton": {
            //     tap: 'showMenu'
            // },
            routeButton: {
                tap: 'onRouteButtonTap'
            },
            deviceButton: {
                tap: 'onDeviceButtonTap'
            },
            createRouteBtn: {
                tap: 'onCreateRouteButtonTap'
            },
            createDeviceBtn: {
                tap: 'onCreateDeviceButtonTap'
            },
            startStopRecordingButton: {
                tap: 'onStartStopRecordingButtonTap'
            },            
            routeTrackBtn: {
                tap: 'onRouteTrackBtnTap'
            }, 
            adminNavigationView:{
                back: 'backButtonHandler'
            }
        }
    },
    onRouteButtonTap: function(button, e, eOpts) {
     var adminNavigationView = this.getAdminNavigationView();
     adminNavigationView.push({
            itemId: "routeForm",
            xtype: "newRouteForm",
            title: "New Route"
        });
    }, 
    onDeviceButtonTap: function(button, e, eOpts) {
        var adminNavigationView = this.getAdminNavigationView();
         adminNavigationView.push({
                itemId: "deviceForm",
                xtype: "newDeviceForm",
                title: "New Device"
            });
        // alert([
        //     'Device name: ' + Ext.device.DeviroutePanelce.name,
        //     'Device platform: ' + Ext.device.Device.platform,
        //     'Device UUID: ' + Ext.device.Device.uuid
        // ].join('\n'));
    },
    onCreateRouteButtonTap: function(button, e, eOpts) {
        var route = Ext.create("GpsTracker.model.Route", {});
        var form = button.up('formpanel'), // Login form
            values = form.getValues(), // Form values
            me = this,  
        routeForm = this.getRouteForm();
        routeForm.updateRecord(route);
        console.log(values.name + " : " + values.vehicle_id);

      var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Route success during launch : ' + response.responseText);
            if (data.success) {  
                Ext.Viewport.unmask(); 
               // Ext.Msg.alert("Route Success", data.message); 
               var adminNavigationView = me.getAdminNavigationView();
               var routePanel = Ext.create('GpsTracker.view.RoutePanel', {
                    title: 'Route Recording'
                  });
               var routeLabel = routePanel.down("#routeLabel").setHtml('<h1>'+values.name+'</h1>');
               routePanel.setRouteId(data.route.id);
               
               adminNavigationView.push(routePanel);                                     
                       
            } else {
                Ext.toast(data.message, 3000);
                //Ext.Msg.alert("Route Failure", data.message);
                Ext.Viewport.unmask();
            }
        };

        // Failure
        var failureCallback = function(response, ops) {
            Ext.toast(respose.message, 3000);
            //Ext.Msg.alert("Route Failure", response.message);
            Ext.Viewport.unmask();

        };

        var validationObj = route.validate();
        if (!validationObj.isValid()) {
            var errorString = this.handleRouteValidation(validationObj);
            Ext.toast(errorString, 3000);
            //Ext.Msg.alert("Oops", errorString);
        } else {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Saving...'
            });

        Ext.Ajax.request({
            url: GpsTracker.util.Config.url.GPSTRACKER_CREATEROUTE,
            method: 'post',
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
               route: values
            }),
            success: successCallback,
            failure: failureCallback
        });
      }
    }, handleRouteValidation: function(validationObj) {
        var errorstring = "";
        var emailErrors = validationObj.getByField('name');
        if (emailErrors != null && emailErrors.length > 0) {
            for (var i = 0; i < emailErrors.length; i++) {
                errorstring += emailErrors[i].getMessage() + "<br />";
            }

            var field = Ext.ComponentQuery.query('adminNavigationView #routeForm #newRouteName');
            field[0].addCls('error');
        }
        var startTimeErrors = validationObj.getByField('start_time');
        if (startTimeErrors != null && startTimeErrors.length > 0) {
            for (var i = 0; i < startTimeErrors.length; i++) {
                errorstring += startTimeErrors[i].getMessage() + "<br />";
            }
            var field = Ext.ComponentQuery.query('adminNavigationView #routeForm #newRouteTime');
            field[0].addCls('error');
        }
        var vehicleErrors = validationObj.getByField('vehicle_id');
        if (vehicleErrors != null && vehicleErrors.length > 0) {
            for (var i = 0; i < vehicleErrors.length; i++) {
                errorstring += vehicleErrors[i].getMessage() + "<br />";
            }
            var field = Ext.ComponentQuery.query('adminNavigationView #routeForm #newRouteVehicle');
            field[0].addCls('error');
        }
        return errorstring;
    },

    resetRouteErrorFields: function() {
        Ext.ComponentQuery.query('adminNavigationView #routeForm #newRouteName')[0].removeCls('error');
        Ext.ComponentQuery.query('adminNavigationView #routeForm #newRouteTime')[0].removeCls('error');
        Ext.ComponentQuery.query('adminNavigationView #routeForm #newRouteVehicle')[0].removeCls('error');
    },
    onCreateDeviceButtonTap: function(button, e, eOpts) {
        var device = Ext.create("GpsTracker.model.Device", {});
        var form = button.up('formpanel'), // Login form
            values = form.getValues(), // Form values
             
        deviceForm = this.getDeviceForm();
        deviceForm.updateRecord(device);
        console.log(values.mobile_no + " : " + values.imei_no);

     var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Device success during launch : ' + response.responseText);
            if (data.success) {  
                Ext.Viewport.unmask();                 
                // var routePanel = me.getRoutePanel;
                Ext.toast(data.message, 3000);  
            } else {
                Ext.Viewport.unmask();
                Ext.toast(data.message, 3000); 
            }
        };

        // Failure
        var failureCallback = function(response, ops) {
            Ext.toast("Device Failure", 3000);
            Ext.Viewport.unmask();

        };

        var validationObj = device.validate();
        if (!validationObj.isValid()) {
            var errorString = this.handleDeviceValidation(validationObj);
            Ext.toast(errorString, 3000);
            //Ext.Msg.alert("Oops", errorString);
        } else {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Saving...'
            });

        Ext.Ajax.request({
            url: GpsTracker.util.Config.url.GPSTRACKER_CREATEDEVICE,
            method: 'post',
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                device: values
            }),
            success: successCallback,
            failure: failureCallback
        });
       }
    }, handleDeviceValidation: function(validationObj) {
        var errorstring = "";
        var mobileErrors = validationObj.getByField('mobile_no');
        if (mobileErrors != null && mobileErrors.length > 0) {
            for (var i = 0; i < mobileErrors.length; i++) {
                errorstring += mobileErrors[i].getMessage() + "<br />";
            }

            var field = Ext.ComponentQuery.query('adminNavigationView #deviceForm #newDeviceMobile');
            field[0].addCls('error');
        }
        var imeiErrors = validationObj.getByField('imei_no');
        if (imeiErrors != null && imeiErrors.length > 0) {
            for (var i = 0; i < imeiErrors.length; i++) {
                errorstring += imeiErrors[i].getMessage() + "<br />";
            }
            var field = Ext.ComponentQuery.query('adminNavigationView #deviceForm #newDeviceImei');
            field[0].addCls('error');
        }
        var vehicleErrors = validationObj.getByField('vehicle_id');
        if (vehicleErrors != null && vehicleErrors.length > 0) {
            for (var i = 0; i < vehicleErrors.length; i++) {
                errorstring += vehicleErrors[i].getMessage() + "<br />";
            }
            var field = Ext.ComponentQuery.query('adminNavigationView #deviceForm #newDeviceVehicle');
            field[0].addCls('error');
        }
        return errorstring;
    },

    resetDeviceErrorFields: function() {
        Ext.ComponentQuery.query('adminNavigationView #deviceForm #newDeviceMobile')[0].removeCls('error');
        Ext.ComponentQuery.query('adminNavigationView #deviceForm #newDeviceImei')[0].removeCls('error');
        Ext.ComponentQuery.query('adminNavigationView #deviceForm #newDeviceVehicle')[0].removeCls('error');
    },
    onStartStopRecordingButtonTap: function(button, e, eOpts) {
        var timePeriod = GpsTracker.util.Config.timePeriod; 
        var time = (parseInt(timePeriod) * 60 * 1000);  
        var currentDate = new Date();
        var format = 'Y-m-d H:i:s';
        var me =this;
        var geo = GpsTracker.util.Config.stopIntervalID; 
       if(button.pressed){
            button.setText("Start Recording"); 
            button.pressed = false; 
            // clearInterval(GpsTracker.util.Config.intervalID.stopIntervalID);   
            console.log(geo);     
            geo.setAutoUpdate(false);
       }else{
        button.setText("Stop Recording"); 
        button.pressed = true;
         geo = Ext.create('Ext.util.Geolocation', {
                autoUpdate: true, 
                frequency: time,
                allowHighAccuracy : true,
                listeners: {
                    locationupdate: function(geo) {   
                        stop = {};
                        stop.route_id= button.up().getRouteId(); 
                        stop.latitude = geo.getLatitude();
                        stop.longitude = geo.getLongitude();
                        stop.gpstime = Ext.Date.format(currentDate,format);  
                            me.createStops(stop);                   
                    },
                    locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
                        if(bTimeout){
                            Ext.toast('Timeout occurred.',3000);
                        } else {
                            Ext.toast('Error occurred.', 3000);
                        }
                    }
                }
             }); 
            setTimeout(function(){
              GpsTracker.util.Config.stopIntervalID = geo;
            }, 200);
          console.log("time is  "+ time);
          // geo.updateLocation();
          // GpsTracker.util.Config.intervalID.stopIntervalID = setInterval(function(){ 
          //   geo.updateLocation();
          // }, parseInt(time));        
           
       }
    },createStops: function(stop) {        
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Stop success during launch : ' + response.responseText);
            if (data.success) {  
                Ext.Viewport.unmask();                 
                // var routePanel = me.getRoutePanel;
                Ext.toast(data.message, 3000);  
            } else {
                Ext.Viewport.unmask();
                Ext.toast(data.message, 3000); 
            }
        };

        // Failure
        var failureCallback = function(response, ops) {
            Ext.toast(response.message, 3000);
            //Ext.Msg.alert("Device Failure", response.message);
            Ext.Viewport.unmask();

        };
      
        Ext.Ajax.request({
            url: GpsTracker.util.Config.url.GPSTRACKER_CREATESTOP,
            method: 'post',
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                stop: stop
            }),
            success: successCallback,
            failure: failureCallback
        });

    },
   backButtonHandler: function(button){
   //  var routePanel =this.getRoutePanel();
   //  if(routePanel) {
   //   var recordingBtn = routePanel.down("#startStopRecordingBtn");
   //   if(recordingBtn.pressed){        
   //          clearInterval(GpsTracker.util.Config.intervalID.stopIntervalID);              
   //   }
   // }

   var isEmpty = function(obj){
    return (Object.getOwnPropertyNames(obj).length === 0);
   };

   if(!isEmpty(GpsTracker.util.Config.stopIntervalID)){
        GpsTracker.util.Config.stopIntervalID.setAutoUpdate(false);
   }
   if (!isEmpty(GpsTracker.util.Config.trackIntervalID)){
        GpsTracker.util.Config.stopIntervalID.setAutoUpdate(false); 
   }


},guid: function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
      }
      // return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
               s4() + '-' + s4() + s4() + s4();
      // };
    },
onRouteTrackBtnTap: function(button, e, eOpts) {
    var form = button.up('formpanel'), // Login form
            values = form.getValues();
    var timePeriod = GpsTracker.util.Config.timePeriod; 
        var time = (parseInt(timePeriod) * 60 * 1000);  
        var me =this;
        var geo = GpsTracker.util.Config.trackIntervalID; 
        var uuid = me.guid();
        var currentDate = new Date();
        var format = 'Y-m-d H:i:s';

        

        // var uuid = guid();
        console.log("----------"+uuid)

       if(button.pressed){
            button.setText("Start"); 
            button.pressed = false; 
            // clearInterval(GpsTracker.util.Config.intervalID.trackIntervalID);
            console.log(geo);     
            geo.setAutoUpdate(false);             
       }else{
        button.setText("Stop"); 
        button.pressed = true;
         geo = Ext.create('Ext.util.Geolocation', {
                autoUpdate: true, 
                frequency: time,
                allowHighAccuracy : true,
                listeners: {
                    locationupdate: function(geo) { 
                    console.log(geo);  
                        track = {};
                        track.latitude = geo.getLatitude();
                        track.longitude = geo.getLongitude();
                        track.sessionid = uuid;  
                        track.gpstime = Ext.Date.format(currentDate,format);
                        track.route_id = values.route_id;
                        track.accuracy = geo.getAccuracy();
                        track.speed = geo.getSpeed();
                        track.device = Ext.device.Device.uuid;
                        track.extrainfo = geo.getHeading();
                        console.log("========"+JSON.stringify(track));
                            me.createTracks(track);                   
                    },
                    locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
                        if(bTimeout){
                            Ext.toast('Timeout occurred.', 3000);
                        } else {
                            Ext.toast('Error occurred.', 3000);
                        }
                    }
                }
             }); 
           setTimeout(function(){
             GpsTracker.util.Config.trackIntervalID = geo;
           }, 200);
          // geo.updateLocation();
          // GpsTracker.util.Config.intervalID.trackIntervalID = setInterval(function(){ 
          //   geo.updateLocation();
          // }, parseInt(time));        
           
       }
    },createTracks: function(track) {        
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Track success during launch : ' + response.responseText);
            if (data.success) {  
                Ext.Viewport.unmask();                 
                // var routePanel = me.getRoutePanel;
                Ext.toast(data.message, 3000);  
            } else {
                Ext.Viewport.unmask();
                Ext.toast(data.message, 3000); 
            }
        };

        // Failure
        var failureCallback = function(response, ops) {
            Ext.toast("Track Failure", 3000); 
            Ext.Viewport.unmask();

        };
      
        Ext.Ajax.request({
            url: GpsTracker.util.Config.url.GPSTRACKER_CREATETRACK,
            method: 'post',
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                track: track
            }),
            success: successCallback,
            failure: failureCallback
        });

    }



});