const express = require("express");
const devpost = require("./devpost");
const hackathon_india = require("./hackathon_india");
const app = express();

app.get("/",(req,res,next)=>{
    let data = [];
    devpost()
    .then((d)=>{
        data=data.concat(d);

    })
    .catch(console.log);

    hackathon_india()
    .then((d)=>{
        data = data.concat(d);
        res.json({data})

    })
    .catch(console.log);

});





app.listen(process.env.PORT || 3000,()=>console.log("listening.."));