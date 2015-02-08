Ext.define('GpsTracker.model.LoginCredential', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'login',
            type: 'string'
        }, {
            name: 'password',
            type: 'password'
        }

        ],
        validations: [{
            type: 'presence',
            field: 'login',
            message: "Email or Username is required"
        }, {
            type: 'length',
            field: 'login',
            min: 3,
            max: 50,
            message: "Email or Username should be between 3 and 50 characters "
        },
         {
            type: 'presence',
            field: 'password',
            message: "Password is required"
        }]
    }
});