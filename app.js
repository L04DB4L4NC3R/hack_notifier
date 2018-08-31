const express = require("express");
const devpost = require("./utilities/devpost");
const hackathon_india = require("./utilities/hackathon_india");
const app = express();

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