require("dotenv").config();
const express = require("express");
const devpost = require("./utilities/devpost");
const hackathon_india = require("./utilities/hackathon_india");
const app = express();


// mongoDB init
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true});
mongoose.connection
.once("open",()=>console.log("COnnected to DB"))
.on("err",()=>console.log("Connection to DB lost"));

/**
 * @api {get} GET upcoming hackathons
 * @apiName GET upcoming hackathons
 * 
 */
app.get("/",(req,res,next)=>{
    let data = [];
    
    Promise.all([devpost(),hackathon_india()])
    .then(values=>{
        data = data.concat(values[0]);
        data = data.concat(values[1]);
        res.json({data});
    })
    .catch(next)

});





app.listen(process.env.PORT || 3000,()=>console.log("listening.."));