const mongoose = require("mongoose");

let hackSchema = new mongoose.Schema({
    title:String,
    location:String,
    date:String,
    description:String,
    prize:{
        type:String,
        default:null
    },
    source:String,
    link:String
});

module.exports.hackModel = mongoose.model("hackathon",hackSchema);