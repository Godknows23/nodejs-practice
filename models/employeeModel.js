const mongoose = require('mongoose')
const employeeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,"Please enter Employee name" ]
        },

        surname: {
            type: String,
            required: true,
            

        },

        phone: {
            type: String,
            required: true,
            
        },

        email: {
            type: String,
            required: true,
        
        },
        nationalId: {
            type: String,
            required: true,
        
        },
        department: {
            type: String,
            required: true,
        
        },
        dob: {
            type: String,
            required: true,
        
        },
     

    },
    {
        timestamps: true
    }
)

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;