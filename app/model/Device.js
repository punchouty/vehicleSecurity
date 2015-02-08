
Ext.define('GpsTracker.model.Device', {
    extend: 'Ext.data.Model',

    config: {
        fields: [{
            name: 'mobile_no',
            type: 'string'
        },{
            name: 'imei_no',
            type: 'string'
        }, {
            name: 'vehicle_id',
            type: 'integer'
        } 

        ],
        validations: [{
            type: 'presence',
            field: 'imei_no',
            message: "IMEI Number is required"
        }, {
            type: 'length',
            field: 'imei_no',
            min: 3,
            max: 50,
            message: "IMEI Number should be between 3 and 50 characters "
        },{
            type: 'presence',
            field: 'vehicle_id',
            message: "Vehicle is required"
        }, {
            type: 'presence',
            field: 'mobile_no',
            message: "Mobile is required"
        }, {
            type: 'format',
            field: 'mobile_no',
            matcher: /^[7-9][0-9]{9}$/
        }]
    }
});