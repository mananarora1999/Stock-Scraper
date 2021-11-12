let mainpageurl = "https://www.moneycontrol.com"; // URL of the Moneycontrol.com
// npm i request 
// data request-> request
let request = require("request");
// npm i cheerio 
// data extract-> cheerio
let cheerio = require("cheerio");

let topgainertoploser = require("./topgainertoploser");  
let onlybuyer = require("./onlybuyer");  
let onlyseller = require("./onlyseller");  
let mostactiveBSE = require("./mostactiveBSE");  
let mostactiveNSE = require("./mostactiveNSE");  
let highlowBSE = require("./highlowBSE");  
let highlowNSE = require("./highlowNSE");
let priceshocker = require("./priceshocker");
let volumeshocker = require("./volumeshocker");

console.log();
console.log();
console.log("WELCOME TO STOCK SCREENER");
console.log("DATA FETCHING GOING ON PLEASE WAIT");
console.log();

for (let i=1; i<=10; i++) 
{
    task(i);
}
   
function task(i) 
{
    if(i<10)
    setTimeout(function() { process.stdout.write("."); }, 100 * i);
    else
    setTimeout(function() {  console.log("."); console.log(); }, 100 * i);
}

request(mainpageurl, maincb); // request on the website for data

function maincb(error, response, mainpagehtml) 
{
    
    if (error) 
    {
        console.log(error); // Print error (if one occurred)
    }

    else if (response.statusCode == 404) 
    {
        console.log("Page Not Found") // if page returns error code 404 not found
    }

    else 
    { 
        marketstatsurlExtracter(mainpagehtml); // if no errors pass HTML content of the page to function
    }  
}

function marketstatsurlExtracter(mainpagehtml)
{
    // search tool to search HTML elements
    let searchTool = cheerio.load(mainpagehtml);

    // css selector passed to searchTool that will return element representation 
    let urlArr = searchTool(".market_listmenu li");
    // console.log(linksArr.length);
    let marketstatsurl = searchTool(urlArr[3]).find("a").attr("href");
    // console.log(marketstatsurl);
    request(marketstatsurl,marketstatsurlcb);

}

function marketstatsurlcb(error, response, marketstatspagehtml) 
{
    
    if (error) 
    {
        console.log(error); // Print error (if one occurred)
    }

    else if (response.statusCode == 404) 
    {
        console.log("Page Not Found") // if page returns error code 404 not found
    }

    else 
    { 
        statsurlExtracter(marketstatspagehtml); // if no errors pass HTML content of the page to function
    }  
}

function statsurlExtracter(marketstatspagehtml)
{
    // search tool to search HTML elements
    let searchTool = cheerio.load(marketstatspagehtml);

    // css selector passed to searchTool that will return element representation 
    let segArr = searchTool("div.PB20.brdb div.btn2.MT5.MB15");
    // console.log(segArr.length);

    for (let i = 0; i <= 3; i++) // topgainertoploser
    {
        let topgainertoploserURL = searchTool(segArr[i]).find("a").attr("href");

        if(topgainertoploserURL.charAt(0)!="h")
        {
            topgainertoploserURL = "https://www.moneycontrol.com" + topgainertoploserURL;
        }

        // console.log(topgainertoploserURL);

        request(topgainertoploserURL, topgainertoplosercb);    
    }


    for (let i = 5; i <= 7; i+=2) // onlybuyeronlyseller
    {                            
        let onlybuyeronlysellerurl = searchTool(segArr[i]).find("a").attr("href");

        if(onlybuyeronlysellerurl.charAt(0)!="h")
        {
            onlybuyeronlysellerURLNSE = "https://www.moneycontrol.com" + onlybuyeronlysellerurl;
            onlybuyeronlysellerURLBSE = onlybuyeronlysellerURLNSE.replace("NSE", "BSE");
        }
        else
        {
            onlybuyeronlysellerURLNSE = onlybuyeronlysellerurl;
            onlybuyeronlysellerURLBSE = onlybuyeronlysellerURLNSE.replace("NSE", "BSE");
        }

        if(i==5)
        {
            // console.log(onlybuyeronlysellerURLNSE);
            // console.log(onlybuyeronlysellerURLBSE);

            request(onlybuyeronlysellerURLNSE, onlybuyercb);    
            request(onlybuyeronlysellerURLBSE, onlybuyercb);
        }

        else if(i==7)
        {
            // console.log(onlybuyeronlysellerURLNSE);
            // console.log(onlybuyeronlysellerURLBSE);

            request(onlybuyeronlysellerURLNSE, onlysellercb);    
            request(onlybuyeronlysellerURLBSE, onlysellercb); 
        }    
    } 

    for (let i = 8; i <= 9; i++) // mostactive
    {
        let mostactiveURL = searchTool(segArr[i]).find("a").attr("href");

        if(mostactiveURL.charAt(0)!="h")
        {
            mostactiveURL = "https://www.moneycontrol.com" + mostactiveURL;
        }

        // console.log(mostactiveURL);

        if(i==8)
        {
        request(mostactiveURL, mostactiveBSEcb);
        }
        else if(i==9)
        {
        request(mostactiveURL, mostactiveNSEcb);
        }
    }

    for (let i = 10; i <= 13; i++) // highlow
    {
        let highlowURL = searchTool(segArr[i]).find("a").attr("href");

        if(highlowURL.charAt(0)!="h")
        {
            highlowURL = "https://www.moneycontrol.com" + highlowURL;
        }

        // console.log(highlowURL);

        if(i%2==0)
        {
          request(highlowURL, highlowBSEcb);
        }
        else if(i%2!=0)
        {
          request(highlowURL, highlowNSEcb);
        }    
    }

    for (let i = 14; i <= 15; i++) // priceshocker
    {
        let priceshockerURL = searchTool(segArr[i]).find("a").attr("href");

        if(priceshockerURL.charAt(0)!="h")
        {
            priceshockerURL = "https://www.moneycontrol.com" + priceshockerURL;
        }

        // console.log(priceshockerURL);

        request(priceshockerURL, priceshockercb);
    }

    for (let i = 16; i <= 17; i++) // volumeshocker
    {
        let volumeshockerURL = searchTool(segArr[i]).find("a").attr("href");

        if(volumeshockerURL.charAt(0)!="h")
        {
            volumeshockerURL = "https://www.moneycontrol.com" + volumeshockerURL;
        }

        // console.log(volumeshockerURL);

        request(volumeshockerURL, volumeshockercb);
    }
    
}

function topgainertoplosercb(error, response, html) 
{
    
    if (error) 
    {
        console.log(error); 
    }

    else if (response.statusCode == 404) 
    {
        console.log("Page Not Found")
    }

    else 
    {
        topgainertoploser.dataExtracter(html);
    }  
}

function onlybuyercb(error, response, html) 
{
    
    if (error) 
    {
        console.log(error); 
    }

    else if (response.statusCode == 404) 
    {
        console.log("Page Not Found")
    }

    else 
    {
        onlybuyer.dataExtracter(html);
    } 
}

function onlysellercb(error, response, html) 
{
    
    if (error) 
    {
        console.log(error); 
    }

    else if (response.statusCode == 404) 
    {
        console.log("Page Not Found")
    }

    else 
    {
        onlyseller.dataExtracter(html);
    } 
}

function mostactiveBSEcb(error, response, html) 
{
    
    if (error) 
    {
        console.log(error); 
    }

    else if (response.statusCode == 404) 
    {
        console.log("Page Not Found")
    }

    else 
    {
        mostactiveBSE.dataExtracter(html);
    }  
}

function mostactiveNSEcb(error, response, html) 
{
    
    if (error) 
    {
        console.log(error); 
    }

    else if (response.statusCode == 404) 
    {
        console.log("Page Not Found")
    }

    else 
    {
        mostactiveNSE.dataExtracter(html);
    }  
}

function highlowBSEcb(error, response, html) 
{
    
    if (error) 
    {
        console.log(error); 
    }

    else if (response.statusCode == 404) 
    {
        console.log("Page Not Found")
    }

    else 
    {
        highlowBSE.dataExtracter(html);
    }  
}

function highlowNSEcb(error, response, html) 
{
    
    if (error) 
    {
        console.log(error); 
    }

    else if (response.statusCode == 404) 
    {
        console.log("Page Not Found")
    }

    else 
    {
        highlowNSE.dataExtracter(html);
    }  
}

function priceshockercb(error, response, html) 
{
    
    if (error) 
    {
        console.log(error); 
    }

    else if (response.statusCode == 404) 
    {
        console.log("Page Not Found")
    }

    else 
    {
        priceshocker.dataExtracter(html);
    }  
}

function volumeshockercb(error, response, html) 
{
    
    if (error) 
    {
        console.log(error); 
    }

    else if (response.statusCode == 404) 
    {
        console.log("Page Not Found")
    }

    else 
    {
        volumeshocker.dataExtracter(html);
    }  
}
