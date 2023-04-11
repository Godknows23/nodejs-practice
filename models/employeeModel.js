const mongoose = require('mongoose')
const employeeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,"Please enter Employee name" ]
        },

        surname: {
            type: String,
            required: false,
            

        },

        phone: {
            type: String,
            required: false,
            
        },

        email: {
            type: String,
            required: false,
        
        },
        nationalId: {
            type: String,
            required: false,
        
        },
        department: {
            type: String,
            required: false,
        
        },
        date_of_birth: {
            type: String,
            required: false,
        
        },
     

    },
    {
        timestamps: true
    }
)

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;