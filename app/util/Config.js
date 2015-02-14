
Ext.define('GpsTracker.util.Config', {
    singleton: true,
    alternateClassName: ['Config'],

    config: {
        env: 'prod',
        app: {
            messageText: 'My message text.'
        },
        services: {
            timeout: 5000
        },
        url: {},
        roles: ['superuser', 'admin', 'user'],
        timePeriod: 0.5,          //mins      
        stopIntervalID: {},
        trackIntervalID: {}
    },
    constructor: function() {
        if (this.config.env == null) {
            this.config.url.GPSTRACKER_LOGIN = '/test-data/login_success.json';
            this.config.url.GPSTRACKER_LOGOUT = '/test-data/logout.json';
            this.config.url.GPSTRACKER_SIGNUP = '/test-data/registeration_success.json';
            this.config.url.GPSTRACKER_CHANGEPASSWORD = '/test-data/change_password.json';
            this.config.url.GPSTRACKER_EDIT = '/test-data/accept_request.json';
            this.config.url.GPSTRACKER_FORGOTPASSWORD = '/test-data/accept_request.json';
            this.config.url.GPSTRACKER_USERVEHICLES = '/test-data/user_vehicles.json';  
            this.config.url.GPSTRACKER_CREATEDEVICE = '/test-data/device_success.json';
            this.config.url.GPSTRACKER_CREATEROUTE = '/test-data/route_success.json';
            this.config.url.GPSTRACKER_CREATESTOP = '/test-data/stop_success.json';
            this.config.url.GPSTRACKER_ROUTES = '/test-data/user_routes.json';
            this.config.url.GPSTRACKER_VEHICLES = '/test-data/user_vehicles.json';
            this.config.url.GPSTRACKER_CREATETRACK = '/test-data/track_success.json';
        } else if (this.config.env == 'dev') {
            this.config.url.GPSTRACKER_LOGIN = 'http://localhost:3000/users/sign_in.json';
            this.config.url.GPSTRACKER_LOGOUT = 'http://localhost:3000/users/sign_out.json';
            // this.config.url.GPSTRACKER_SIGNUP = 'http://localhost:8080/app/msignup';
            // this.config.url.GPSTRACKER_CHANGEPASSWORD = 'http://localhost:8080/app/mpassword';
            // this.config.url.GPSTRACKER_EDIT = 'http://localhost:8080/app/meditprofile';
            this.config.url.GPSTRACKER_FORGOTPASSWORD = 'http://localhost:3000/users/password.json';  
            this.config.url.GPSTRACKER_ROUTES = 'http://localhost:3000/routes/user_routes.json';
            this.config.url.GPSTRACKER_VEHICLES = 'http://localhost:3000/vehicles/user_vehicles.json';          
            this.config.url.GPSTRACKER_CREATEDEVICE = 'http://localhost:3000/devices.json';
            this.config.url.GPSTRACKER_CREATEROUTE = 'http://localhost:3000/routes.json';
            this.config.url.GPSTRACKER_CREATESTOP = 'http://localhost:3000/stops/create_route_stops.json';
            this.config.url.GPSTRACKER_CREATETRACK = 'http://localhost:3000/tracks/updatelocation.json';
        }else if (this.config.env == 'prod') {
            this.config.url.GPSTRACKER_LOGIN = 'https://shielded-everglades-2675.herokuapp.com/users/sign_in.json';
            this.config.url.GPSTRACKER_LOGOUT = 'https://shielded-everglades-2675.herokuapp.com/users/sign_out.json';
            // this.config.url.GPSTRACKER_SIGNUP = 'http://localhost:8080/app/msignup';
            // this.config.url.GPSTRACKER_CHANGEPASSWORD = 'http://localhost:8080/app/mpassword';
            // this.config.url.GPSTRACKER_EDIT = 'http://localhost:8080/app/meditprofile';
            this.config.url.GPSTRACKER_FORGOTPASSWORD = 'https://shielded-everglades-2675.herokuapp.com/users/password.json';  
            this.config.url.GPSTRACKER_ROUTES = 'https://shielded-everglades-2675.herokuapp.com/routes/user_routes.json';
            this.config.url.GPSTRACKER_VEHICLES = 'https://shielded-everglades-2675.herokuapp.com/vehicles/user_vehicles.json';          
            this.config.url.GPSTRACKER_CREATEDEVICE = 'https://shielded-everglades-2675.herokuapp.com/devices.json';
            this.config.url.GPSTRACKER_CREATEROUTE = 'https://shielded-everglades-2675.herokuapp.com/routes.json';
            this.config.url.GPSTRACKER_CREATESTOP = 'https://shielded-everglades-2675.herokuapp.com/stops/create_route_stops.json';
            this.config.url.GPSTRACKER_CREATETRACK = 'https://shielded-everglades-2675.herokuapp.com/tracks/updatelocation.json';
        } 
        else {
            this.config.url.GPSTRACKER_LOGIN = '/test-data/login_success.json';
            this.config.url.GPSTRACKER_LOGOUT = '/test-data/logout.json';
            this.config.url.GPSTRACKER_SIGNUP = '/test-data/registeration_success.json';
            this.config.url.GPSTRACKER_CHANGEPASSWORD = '/test-data/change_password.json';
            this.config.url.GPSTRACKER_EDIT = '/test-data/accept_request.json';
            this.config.url.GPSTRACKER_FORGOTPASSWORD = '/test-data/accept_request.json';
            this.config.url.GPSTRACKER_USERVEHICLES = '/test-data/user_vehicles.json'; 
            this.config.url.GPSTRACKER_CREATEDEVICE = '/test-data/device_success.json';
            this.config.url.GPSTRACKER_CREATEROUTE = '/test-data/route_success.json'; 
            this.config.url.GPSTRACKER_CREATESTOP = '/test-data/stop_success.json'; 
            this.config.url.GPSTRACKER_ROUTES = '/test-data/user_routes.json';   
            this.config.url.GPSTRACKER_VEHICLES = '/test-data/user_vehicles.json'; 
            this.config.url.GPSTRACKER_CREATETRACK = '/test-data/track_success.json';      
        }
        // var geocoder = new google.maps.Geocoder();  
        // var me=this;
        // var currentlat,
        // currentlong,
        // currentplace;
        // if(navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(function(position) {
        //       currentlat=position.coords.latitude;
        //       currentlong=position.coords.longitude;
        //       codeLatLng(currentlat, currentlong);
        //     });
        //  }
        //  else {
        //     Ext.Msg.alert("Geolocation is not supported by this browser.");
        //   }

        //   var codeLatLng=function(lat, lng) {
        //       var latlng = new google.maps.LatLng(lat, lng);
        //         geocoder.geocode({'latLng': latlng}, function(results, status) {
        //           if (status == google.maps.GeocoderStatus.OK) {
        //           console.log(results);
        //             if (results[1]) {
        //              //formatted address
        //              currentplace=results[0].formatted_address; 
        //              me.config.currentLocation.CURRENT_LAT=currentlat; 
        //              me.config.currentLocation.CURRENT_LONG=currentlong;
        //              me.config.currentLocation.CURRENT_PLACE=currentplace;    
        //             } else {
        //               console.log("No results found");
        //             }
        //           } else {
        //             console.log("Geocoder failed due to: " + status);
        //           }
        //         });
        //       };
        return this.config;
    }
});