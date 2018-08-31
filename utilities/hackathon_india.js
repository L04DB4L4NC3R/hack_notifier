const request = require("request");
const cheerio = require("cheerio");


module.exports = ()=>{
    return new Promise((resolve,reject)=>{
        request({
            method:"GET",
            url:"https://www.hackathon.com/country/india",
            rejectUnauthorized:false,
        },(err,resp,body)=>{
            if(err) reject(err);
            //ht-eb-card
            let $ = cheerio.load(body),data=[];
            resolve(scrape($,data));
        });
    });
}



let scrape=($,data)=>{
    let title,description,location,date='';

    $(".ht-idt-card").each((index,item)=>{
        title=$(item).find(".ht-idt-card__title").text();
        description=$(item).find(".ht-idt-card__description").text();
        location=$(item).find(".ht-idt-card__location").text();
        
        date = `${$(item).find(".date--start .date__day").text()} ${$(item).find(".date--start .date__month").text()} - `
        date += `${$(item).find(".date--end .date__day").text()} ${$(item).find(".date--start .date__month").text()}`
        
        data.push({
            title,
            description,
            location,
            date
        });
    });


    
    //community events
    $(".ht-eb-card").each((index,item)=>{

        title=$(item).find(".ht-eb-card__title").text();
        location=$(item).find(".ht-eb-card__location__place").text();
        description=$(item).find(".ht-eb-card__description").text();
        date = `${$(item).find(".date--start .date__day").text()} ${$(item).find(".date--start .date__month").text()} - `
        date += `${$(item).find(".date--end .date__day").text()} ${$(item).find(".date--start .date__month").text()}`

        data.push({
            title,
            description,
            location,
            date
        });
    });

    return data;
}
