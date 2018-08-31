const cron = require("node-cron");
const hackSchema = require("../schema");
const devpost = require("../utilities/devpost");
const hackathon_india = require("../utilities/hackathon_india");

let data = [];
    
Promise.all([devpost(),hackathon_india()])
.then(values=>{
    data = data.concat(values[0]);
    data = data.concat(values[1]);
    console.log(...data)
})
.catch(console.log)

cron.schedule("* * * * * *",()=>{
    console.log("running");
});