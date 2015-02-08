
Ext.define('GpsTracker.model.Vehicle', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
        {
            name: 'id',
            type: 'integer' 
        },{
            name: 'registration_no',
            type: 'string'
        },{
            name: 'capacity',
            type: 'integer'
        }, {
            name: 'vehicle_type',
            type: 'string'
        }, {
            name: 'school_id',
            type: 'integer'
        } 

        ]
        // ,
        // validations: [{
        //     type: 'presence',
        //     field: 'name',
        //     message: "Name is required"
        // }, {
        //     type: 'length',
        //     field: 'name',
        //     min: 3,
        //     max: 50,
        //     message: "Name should be between 3 and 50 characters "
        // },
        // // {
        // //     type: 'presence',
        // //     field: 'start_time',
        // //     message: "Start Time is required"
        // // },
        // {
        //     type: 'presence',
        //     field: 'vehicle_id',
        //     message: "Vehicle is required"
        // }]
    }
});