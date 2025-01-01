const { default: mongoose } = require("mongoose");


require('dotenv').config();

const url = process.env.DB_URL;
module.exports.db = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}
