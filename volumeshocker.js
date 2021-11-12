let request = require("request");
let fs = require("fs");
let path = require("path");
let cheerio = require("cheerio");
let xlsx = require("xlsx");

function volumeshockerdataExtracter(html)
{
    
    let searchTool = cheerio.load(html);

    let folderName = "VOLUME SHOCKERS";
    let statType = searchTool(".clearfix.wbg.MB10 > .eenlft").text().trim();

    let stockdetailsArr = searchTool("div.bsr_table.bsr_table930.MT20.hist_tbl>table>tbody>tr");
    
    for (let i = 0; i < stockdetailsArr.length ; i++) 
    {
        let stockdetailsNewArr = searchTool(stockdetailsArr[i]).find("td");
        let name=searchTool(searchTool(stockdetailsNewArr[0]).find(".gld13.disin>a")).text().trim();
        let group=searchTool(stockdetailsNewArr[1]).text().trim();
        let sector =searchTool(stockdetailsNewArr[2]).text().trim();
        let lastprice=searchTool(stockdetailsNewArr[3]).text().trim();
        let perchange=searchTool(stockdetailsNewArr[4]).text().trim();
        let avgvol=searchTool(stockdetailsNewArr[5]).text().trim();
        let volchange=searchTool(stockdetailsNewArr[6]).text().trim();

        // console.log((i+1)+"--->"+name+"  "+group+"  "+sector+"  "+lastprice+"  "+perchange+"  "+avgvol+"  "+volchange);
        processStock(folderName, statType, name, group, sector, lastprice, perchange, avgvol, volchange);
    }

    console.log(statType + " scrapped!! PLEASE CHECK FOLDER");

}

function processStock(folderName, statType, Name, Group, Sector, LastPrice, PerChange, AvgVol, VolChange)
    {
        // stats folder -> if does not exist then create one   
        let date = dateMaker();
        let mainfolderPath = path.join("C:\\Users\\arora\\Desktop\\STP","MARKET STATS");
        if (fs.existsSync(mainfolderPath) == false) 
        {
            fs.mkdirSync(mainfolderPath);
        }
        let datefolderPath = path.join(mainfolderPath,date);
        if (fs.existsSync(datefolderPath) == false) 
        {
            fs.mkdirSync(datefolderPath);
        }
        let subfolderPath = path.join(datefolderPath,folderName);
        if (fs.existsSync(subfolderPath) == false) 
        {
            fs.mkdirSync(subfolderPath);
        }
        
    
        let stockobj = 
        {
            Name, Group, Sector, LastPrice, PerChange, AvgVol, VolChange
        }
    
        let filePath = path.join(subfolderPath, statType + ".xlsx");
       
        let content = excelReader(filePath, statType); // read data from xlsx file if present
    
        content.push(stockobj);
    
        excelWriter(filePath, content, statType); // write data to xlsx file
    }

    function excelReader(filePath, statType) 
    {
        if (fs.existsSync(filePath) == false) 
        {
            return [];
        } 
        else 
        {
            let wb = xlsx.readFile(filePath);
            let excelData = wb.Sheets[statType];
            let ans = xlsx.utils.sheet_to_json(excelData);
            return ans;
        }
    }

    function excelWriter(filePath, content, statType) 
    {
        let newWB = xlsx.utils.book_new();
       
        let newWS = xlsx.utils.json_to_sheet(content);
       
        xlsx.utils.book_append_sheet(newWB, newWS, statType);
       
        xlsx.writeFile(newWB, filePath);
    }

    function dateMaker()
{
   date = new Date;
   let d = date.getDate();
   let nummonth = date.getMonth()+1;
   if(nummonth==1)
   month="January";
   else if(nummonth==2)
   month="February";
   else if(nummonth==3)
   month="March";
   else if(nummonth==4)
   month="April";
   else if(nummonth==5)
   month="May";
   else if(nummonth==6)
   month="June";
   else if(nummonth==7)
   month="July";
   else if(nummonth==8)
   month="August";
   else if(nummonth==9)
   month="September";
   else if(nummonth==10)
   month="October";
   else if(nummonth==11)
   month="November";
   else if(nummonth==12)
   month="December";
   let year = date.getFullYear();
   let fulldate=d+"-"+month+"-"+year;
   return fulldate;
}

module.exports= // object that will be exported
{
    dataExtracter:volumeshockerdataExtracter
}