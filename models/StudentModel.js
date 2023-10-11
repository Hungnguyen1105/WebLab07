var mongoose = require('mongoose')
var StudentSchema = mongoose.Schema(
    {
        name : {
            type: String,
            require:[true, 'name can not be empty']
        },
        dob: Date,
        gpa: {
            type: Number,
            min: [0, 'gpa can not be '],
            max: 10
        },
        gender: {
            type:String,
            enum:['Male', 'Female']
        },
        image: String
    }
)
var StudentModel = mongoose.model('student' , StudentSchema, 'student');
module.exports = StudentModel;