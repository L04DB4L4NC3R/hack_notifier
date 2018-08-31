const cron = require("node-cron");
const hackSchema = require("../schema").hackModel;
const devpost = require("../utilities/devpost");
const hackathon_india = require("../utilities/hackathon_india");

let data = [];
    
let info = Promise.all([devpost(),hackathon_india()])
.then(async (values)=>{
    data = data.concat(values[0]);
    data = data.concat(values[1]);
    return data;
})
.catch(console.log)


let scheduler = ()=>{
    return new Promise((resolve,reject)=>{
        cron.schedule("0 0 0 * * *",()=>{
            info
            .then((d)=>{
                hackSchema.remove({})
                .then(()=>{
                    hackSchema.create(d)
                    .then(resolve)
                    .catch(reject);
                }).catch(reject)
            }).catch(reject);
        });
    });
}


module.exports = scheduler;