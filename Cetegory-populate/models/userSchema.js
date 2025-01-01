const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    username:String,
    phone:String,
    email:String,
    password:String,
    description:String,
    role:String
},{
    timestamps:true,
});

const user = mongoose.model('UserTbl', userSchema);


module.exports = user;
