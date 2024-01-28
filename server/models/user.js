const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true,
        min : 4,
        max:10
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        min : 8
    },
    isAvatarSet : {
        type: Boolean,
        default : false
    },
    avatarImage : {
        type : String,
        default : ""
    },
})


module.exports = mongoose.model("User" , userSchema);