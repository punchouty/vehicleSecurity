Ext.define('GpsTracker.controller.AccountController', {
    extend: 'Ext.app.Controller',

    requires: [        
        'GpsTracker.view.MainNavigationView',
        'GpsTracker.view.LoginForm',
        'GpsTracker.view.ForgotPasswordForm',
        'GpsTracker.util.Config',
        'Ext.Toast'
    ],

    config: {
        refs: {
            mainNavigationView: 'mainNavigationView',
            loginPanel: 'mainNavigationView #loginPanel',
            loginForm: 'mainNavigationView #loginForm',
            forgotPassword: '#ForgotPasswordForm',
            forgotButton: 'button[action=forgotpassword]',
            logoutButton:  'superNavView #logoutBtn',
            trackLogoutButton: 'mainTrackForm #logoutButton'
        },

        control: {
            "mainNavigationView #showLoginButton": {
                tap: 'showLogin'
            },
            "mainNavigationView #showForgotPasswordButton": {
                tap: 'showForgotPassword'
            },

            "loginForm #loginButton": {
                tap: 'login'
            },         
            
            forgotButton: {
                tap: 'forgotPassword'
            },
            logoutButton: {
                tap: 'logout'
            },
            trackLogoutButton: {
                tap: 'logout'
            }
        }
    },

    showLogin: function(button, e, eOpts) {
        //var loginForm = Ext.create('widget.loginform'),	// Login form
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to login
        mainNavigationView.push({
            itemId: 'loginForm',
            xtype: "loginForm",
            title: "Sign In"
        });

    },
    

    showForgotPassword: function(button, e, eOpts) {
        // var ForgotPasswordForm = Ext.create('Racloop.view.ForgotPasswordForm'),    // Login form
        var mainNavigationView = this.getMainNavigationView(); // Main view

        // Navigate to login
        mainNavigationView.push({
            itemId: 'ForgotPasswordForm',
            xtype: "forgotPasswordForm",
            title: "Forgot Password"
        });
    },

    login: function(button, e, eOpts) {
        this.resetErrorFields();
        var me=this;
        var user = Ext.create("GpsTracker.model.LoginCredential", {});
        var form = button.up('formpanel'), // Login form
            values = form.getValues(), // Form values
            mainNavigationView = this.getMainNavigationView(), // Main view
            loginPanel = this.getLoginPanel(), // Login and register buttons
            loginForm = this.getLoginForm();
        loginForm.updateRecord(user);
        console.log(values.login + " : " + values.password);
        // Success
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('login success during launch : ' + response.responseText);
            if (data.success) {
                data.data.password=values.password;
                var current_user = data.data;
                var tabMain;
                // me.setCurrentLoc();
                LoginHelper.setUser(current_user);
                mainNavigationView.pop();
                loginPanel.hide();
                if(current_user.role === GpsTracker.util.Config.roles[0] || current_user.role === GpsTracker.util.Config.roles[1]){
                    tabMain= Ext.Viewport.add(Ext.create('GpsTracker.view.AdminNavigationView'));
                } else {
                    tabMain= Ext.Viewport.add(Ext.create('GpsTracker.view.MainTrackForm'));
                }
                tabMain.show();               
                // me.setCurrentLoc();
                // Ext.getStore('journeyStore').load();
                Ext.Viewport.unmask();
            } else {
                // Ext.toast(data.message, 3000);  
                Ext.Msg.alert("Login Failure", data.message);
                Ext.Viewport.unmask();
            }
        };
        // Failure
        var failureCallback = function(response, ops) {
             // Ext.toast(data.message, 3000);
            Ext.Msg.alert("Login Failure", response.message);
            Ext.Viewport.unmask();

        };


        var validationObj = user.validate();
        if (!validationObj.isValid()) {
            var errorString = this.handleValidation(validationObj);
             // Ext.toast(errorString, 3000);
            Ext.Msg.alert("Oops", errorString);
        } else {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Logging in...'
            });
            Ext.Ajax.request({
                url: GpsTracker.util.Config.url.GPSTRACKER_LOGIN,
                method: 'post',
                withCredentials: true,
                useDefaultXhrHeader: false,
                headers: {                    
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    user: {
                            login: values.login,
                            password: values.password,
                            rememberMe: true
                        }
                    }),
                success: successCallback,
                failure: failureCallback
            });
        }


    },

    handleValidation: function(validationObj) {
        var errorstring = "";
        var emailErrors = validationObj.getByField('login');
        if (emailErrors != null && emailErrors.length > 0) {
            for (var i = 0; i < emailErrors.length; i++) {
                errorstring += emailErrors[i].getMessage() + "<br />";
            }

            var field = Ext.ComponentQuery.query('mainNavigationView #loginForm #loginScreenEmail');
            field[0].addCls('error');
        }
        var passwordErrors = validationObj.getByField('password');
        if (passwordErrors != null && passwordErrors.length > 0) {
            for (var i = 0; i < passwordErrors.length; i++) {
                errorstring += passwordErrors[i].getMessage() + "<br />";
            }
            var field = Ext.ComponentQuery.query('mainNavigationView #loginForm #loginScreenPassword');
            field[0].addCls('error');
        }
        return errorstring;
    },

    resetErrorFields: function() {
        Ext.ComponentQuery.query('mainNavigationView #loginForm #loginScreenEmail')[0].removeCls('error');
        Ext.ComponentQuery.query('mainNavigationView #loginForm #loginScreenPassword')[0].removeCls('error');
    },
   

    logout: function(button, e, eOpts) {
        mainNavigationView = this.getMainNavigationView();
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('Logout success during launch : ' + response.responseText);
            if (data.success) {  
                LoginHelper.removeUser();
                var isEmpty = function(obj){
                    return (Object.getOwnPropertyNames(obj).length === 0);
                };

                if(!isEmpty(GpsTracker.util.Config.stopIntervalID)){
                    GpsTracker.util.Config.stopIntervalID.setAutoUpdate(false);
                }
                if (!isEmpty(GpsTracker.util.Config.trackIntervalID)){
                    GpsTracker.util.Config.stopIntervalID.setAutoUpdate(false); 
                }                        
                Ext.Viewport.unmask();
                Ext.Viewport.removeAll(true, true);
                Ext.Viewport.add(Ext.create('GpsTracker.view.MainNavigationView'));

            } else {
                // Ext.toast(data.message, 3000);
                Ext.Msg.alert("Logout Failure", data.message);
                Ext.Viewport.unmask();
            }
        };

        // Failure
        var failureCallback = function(response, ops) {
            Ext.toast(response.message, 3000);
            //Ext.Msg.alert("Logout Failure", response.message);
            Ext.Viewport.unmask();

        };

        Ext.Ajax.request({
            url: GpsTracker.util.Config.url.GPSTRACKER_LOGOUT,
            method: 'delete',
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                'Content-Type': 'application/json'
            },
            // params: Ext.JSON.encode({
            //     "action": "logout"
            // }),
            success: successCallback,
            failure: failureCallback
        });

    },
    forgotPassword: function(button, e, eOpts) {
        console.log("OK");
        this.resetErrorForgetPasswordFields();
        var user = Ext.create("GpsTracker.model.ForgotPassword", {});
        var form = button.up('formpanel'), // Login form
            values = form.getValues(), // Form values
            ForgotForm = this.getForgotPassword();
        ForgotForm.updateRecord(user);
        console.log(ForgotForm);
        // Success
        var successCallback = function(response, ops) {
            var data = Ext.decode(response.responseText);
            console.log('ForgotPassword success during launch : ' + response.responseText);
            if (data.success) {
                LoginHelper.removeUser();
                Ext.Viewport.removeAll(true);
                mainNavigationView = Ext.create('GpsTracker.view.MainNavigationView');
                // Ext.toast(data.message, 3000);
                 // Main view
                Ext.Msg.alert(data.message);
                // Navigate to login
                mainNavigationView.push({
                    itemId: 'loginForm',
                    xtype: "loginForm",
                    title: "Login"
                });
                Ext.Viewport.add(mainNavigationView);
                Ext.Viewport.unmask();
            } else {
                Ext.toast(data.message, 3000);
                //Ext.Msg.alert("Email Send Failure", data.message);
                Ext.Viewport.unmask();
            }
        };
        // Failure
        var failureCallback = function(response, ops) {
            Ext.toast(response.message, 3000);
            //Ext.Msg.alert("Email Send Failure", response.message);
            Ext.Viewport.unmask();

        };

        console.log(user);
        var validationObj = user.validate();
        console.log(validationObj);
        if (!validationObj.isValid()) {
            var errorString = this.handleForgotPasswordValidation(validationObj);           
            console.log(errorString);
            // Ext.toast(errorString, 3000);
            Ext.Msg.alert("Oops", errorString);
        } else {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Please Wait...'
            });
            Ext.Ajax.request({
                url: GpsTracker.util.Config.url.GPSTRACKER_FORGOTPASSWORD,
                withCredentials: true,
                useDefaultXhrHeader: false,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                   user:{ email: values.email}
                }),
                success: successCallback,
                failure: failureCallback
            });
        }


    },

    handleForgotPasswordValidation: function(validationObj) {
        var errorstring = "";
        var emailErrors = validationObj.getByField('email');
        if (emailErrors != null && emailErrors.length > 0) {
            for (var i = 0; i < emailErrors.length; i++) {
                errorstring += emailErrors[i].getMessage() + "<br />";
            }
            var field = Ext.ComponentQuery.query('#ForgotPasswordForm  #ForgotScreenPassword');
            field[0].addCls('error');
        }
        return errorstring;
    },

    resetErrorForgetPasswordFields: function() {

        Ext.ComponentQuery.query('#ForgotPasswordForm  #ForgotScreenPassword')[0].removeCls('error');

    },
    // getUserVehicles: function(user){
    //     var successCallback = function(response, ops) {        
    //             var data = Ext.decode(response.responseText);
    //             console.log('Vehicles Loaded : ' + response.responseText);
    //             if (data.success) {
    //                 console.log(data);
    //                 LoginHelper.setVehicles(data);
    //                 Ext.Viewport.unmask();
    //             } else {
    //                 Ext.Viewport.unmask();
    //                 Ext.toast(data.message, 3000);
    //                 //Ext.Msg.alert(data.message);
    //             }
    //         };
    //         var failureCallback = function(response, ops) {
    //             Ext.Viewport.unmask();
    //             Ext.toast(response.code, 3000);
    //             //Ext.Msg.alert("Network Error", response.code);

    //         };

    //         Ext.Ajax.request({
    //             url: GpsTracker.util.Config.url.GPSTRACKER_USERVEHICLES,
    //             method: 'get',
    //             // headers: {
    //             //     'Content-Type': 'application/json'
    //             // },
    //             // withCredentials: true,
    //             // useDefaultXhrHeader: false,
    //             // params: Ext.JSON.encode({
    //             //     email: user.email,
    //             //     password: user.password,
    //             //     rememberMe: true
    //             // }),
    //             success: successCallback,
    //             failure: failureCallback
    //         });

    // },
    launch: function(app) {
        var me=this;
        var user = LoginHelper.getUser();
        if (user) {
            Ext.Viewport.mask({
                xtype: 'loadmask',
                indicator: true,
                message: 'Logging in...'
            });
            var mainNavigationView = this.getMainNavigationView(); // Main view
            var loginPanel = this.getLoginPanel();

              
                // mainNavigationView.pop();
                // loginPanel.hide();
                // if(user.role === "admin" || user.role === "superuser"){
                //     tabMain= Ext.Viewport.add(Ext.create('GpsTracker.view.AdminNavigationView'));
                // } else {
                //     tabMain= Ext.Viewport.add(Ext.create('GpsTracker.view.MainTrackForm'));
                // }
                // tabMain.show(); 
                //  Ext.Viewport.unmask();
            
            var successCallback = function(response, ops) {
                console.log(response);
                var data = Ext.decode(response.responseText);
                console.log('login success during launch : ' + response.responseText);
                if (data.success) {
                    var current_user = data.data;
                    var tabMain;                 
                  
                  //  LoginHelper.setUser(current_user);
                    mainNavigationView.pop();
                    loginPanel.hide();
                    if(current_user.role === "admin" || current_user.role === "superuser"){
                        tabMain= Ext.Viewport.add(Ext.create('GpsTracker.view.AdminNavigationView'));
                    } else {
                        tabMain= Ext.Viewport.add(Ext.create('GpsTracker.view.MainTrackForm'));
                    }
                    tabMain.show();                   
                   // me.setCurrentLoc();
                    Ext.Viewport.unmask();
                } else {
                     // Ext.toast("Oops "+data.message, 3000);  
                    Ext.Msg.alert("Login Failure", data.message);
                    Ext.Viewport.unmask();
                }
            };
            var failureCallback = function(response, ops) {
                Ext.toast("Network Error"+ response.code, 2000);
                Ext.Viewport.unmask();     
            };

            Ext.Ajax.request({
                url: GpsTracker.util.Config.url.GPSTRACKER_LOGIN,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
                useDefaultXhrHeader: false,
                params: Ext.JSON.encode({
                    user: {
                            login: user.username,
                            password: user.password,
                            rememberMe: true
                        }                    
                }),
                success: successCallback,
                failure: failureCallback
            });

        }


     if (Ext.os.is('Android')) {
         document.addEventListener("backbutton", Ext.bind(onBackKeyDown, this), false); // add back button listener

         function onBackKeyDown(eve) {
             eve.preventDefault();
             Ext.Msg.confirm("Exit", "Are you sure you?", function(answer) {
                 if (answer == 'yes') {
                     navigator.app.exitApp();
                 } else {
                     //do nothing
                 }
             });
         }
     }
        
    }
});