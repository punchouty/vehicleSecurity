
Ext.define('GpsTracker.model.Route', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        {
            name: 'id',
            type: 'integer' 
        },{
            name: 'name',
            type: 'string'
        },{
            name: 'start_time',
            type: 'string'
        }, {
            name: 'vehicle_id',
            type: 'integer'
        } 

        ],
        validations: [{
            type: 'presence',
            field: 'name',
            message: "Name is required"
        }, {
            type: 'length',
            field: 'name',
            min: 3,
            max: 50,
            message: "Name should be between 3 and 50 characters "
        },
        // {
        //     type: 'presence',
        //     field: 'start_time',
        //     message: "Start Time is required"
        // },
        {
            type: 'presence',
            field: 'vehicle_id',
            message: "Vehicle is required"
        }]
    }
});