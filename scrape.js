const request = require("request");
const cheerio = require("cheerio");

request.get("https://devpost.com/hackathons",(err,resp,body)=>{
    if(err)
        console.log("ERROR")
    else{
        let $ = cheerio.load(body),year = new Date().getFullYear();
        let titles=$(".title").text(),locations=$(".challenge-location").text(),desc=$(".challenge-description").text();
        let prizes = $("span[class=value]").text(), dates=$(".date-range").text();

        let data = [];

        locations = clarifyArray(locations.split("\n"));
        titles = clarifyArray(titles.split("\n"));
        desc = clarifyArray(desc.split("\n"));
        dates = clarifyArray(dates.split(year));
        prizes=clarifyArray(prizes.split('$'));

        let n = prizes.length;

        for(let i=0;i<n;i++){

            data.push({
                title:titles[i],
                location:locations[i],
                prize:'$'+prizes[i],
                date:dates[i]+` ${year}`,
                description:desc[i]
            });
        }

        console.log(data)
    }
});





let clarifyArray = (array)=>{
    let newarray = [],j="";
    for(let i of array){
        if(i!=='' && i!== '\n'){
            j = i.trim();
            if(j.length)
                newarray.push(j);
        }     
    }
    return newarray;
}