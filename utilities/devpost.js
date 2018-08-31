const request = require("request");
const cheerio = require("cheerio");


module.exports = ()=>{
    return new Promise((resolve,reject)=>{

        request.get("https://devpost.com/hackathons",(err,resp,body)=>{
        if(err)
            reject(err);
        else{
            let $ = cheerio.load(body),year = new Date().getFullYear();
            let location,date,prize,title,description,data=[],link;
            $(".clearfix").each((index,item)=>{
                title=$(item).find(".title").text().trim();
                location=$(item).find(".challenge-location").text().trim();
                description=$(item).find(".challenge-description").text().trim();
                prize=$(item).find("span[class=value]").text().trim();
                date=$(item).find(".date-range").text().trim();
                link=$(item).attr("href");
                if(date==='')
                    date=$(item).find("time").text();

                if(title!==''&&location!==''&&description!==''&&prize!==''&&date!==''){
                    data.push({
                        title,
                        location,
                        description,
                        prize,
                        date,
                        source:"https://devpost.com/hackathons",
                        link
                    });
                }
            });
            resolve(data);
        }
    });

    })
}