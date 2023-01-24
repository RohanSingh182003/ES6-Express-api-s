import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    middleName : String,
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : 'user'
    },
    department : String
}, {timestamps: true})

const User = mongoose.model('User',UserSchema)

export default User;