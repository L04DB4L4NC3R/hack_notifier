const request = require("request");
const cheerio = require("cheerio");


let X = ()=>{
    return new Promise((resolve,reject)=>{
        request.get("https://www.hackerearth.com/challenges/hackathon/",(err,resp,body)=>{
            if(err)
                reject(err);
            else{
                let $ = cheerio.load(body);
                resolve("RAN")
            }
        });
    });
}


X()
.then(console.log)
.catch(console.log)