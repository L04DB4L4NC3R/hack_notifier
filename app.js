require("dotenv").config();
const express = require("express");
const devpost = require("./utilities/devpost");
const hackathon_india = require("./utilities/hackathon_india");
const app = express();
const cronjob = require("./jobs/cronjob");
const hackSchema = require("./schema").hackModel;

// mongoDB init
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true});
mongoose.connection
.once("open",()=>console.log("Connected to DB"))
.on("err",()=>console.log("Connection to DB lost"));

/**
 * @api {get} GET upcoming hackathons
 * @apiName GET upcoming hackathons
 * 
 */
app.get("/",(req,res,next)=>{
    let data = [];
    hackSchema.find({})
    .then(data=>res.json(data))
    .catch(next);
});


cronjob()
.then(()=>{
    console.log("CRONJOB ran");
})
.catch(()=>{
    console.log("Error in cronjob");
});





app.listen(process.env.PORT || 3000,()=>console.log("listening.."));