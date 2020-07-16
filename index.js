const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require("fs");

const json2csv = require("json2csv").Parser;

const header = {
    accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9"
                
};

const url = "https://www.dawateislami.net/bookslibrary/";

async () => {
    await axios(url, {
        headers: header,
    })
        .then(async (response) => {
            const html = response.data;

         
            const statsTable = $("#book-thumbnail>li");

            const eachbook = [];
            statsTable.each(function () {
                const link = $(this).attr("href");
                eachbook.push({
                    link
                });
            });



            for (var i = 0; i < eachbook.length; i++) {
                await axios(eachbook[i].link, {
                    headers: headers,
                })
                    .then((response) => {
                        const html = response.data;
                        const $ = cheerio.load(html);
                        const MobileData = $(
                            "#book-thumbnail>li"
                        );
        
        
                        const j2cp = new json2csv();
                        const csv = j2cp.parse(MobileData);
                        fs.writeFileSync("./image.csv", csv, "utf-8");
        

                    }
                    
                    )();
            }
        });
}