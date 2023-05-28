const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    todo: [{
        description : {
            type : String ,
            required : true
        },
        completed : {
            type : Boolean,
            default : false
        }
    }]
})

const Admin = mongoose.model('admin', adminSchema);
const User = mongoose.model('user', userSchema);

module.exports = { Admin, User }