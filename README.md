# Stock-Scraper

Year 2020 saw a sharp decline in Stock Markets due to COVID-19 Pandemic, but it also turned out to be a great opportunity for new comers to
participate, hence more than a million new comers entered the markets and its effect was that market regained it’s pre COVID LEVELS in less than a
year and set new highs. Many new comers want to extract data of stock price actions in an easy excel workbook like format so that they can predict
future calls, hence this will help them to do so.

The application basic job is to scrap information like TOP GAINERS, TOP LOSERS, MOST ACTIVE STOCKS BY PRICE AND VOLUME,52 WEEK
HIGH/LOW and other such information from website called "moneycontrol.com" and copy it to excel workbook for easy understanding for new
comers in STOCK MARKETS.

The application presented here serves all the basic requirements for a basic Stock Screener application with some additional features like historic
access.

Application Flow
• When the user first visits the application, he is required to run the script in the NODEJS environment from the Integrated Terminal.
• As the user runs the script a welcome message will be flashed and user will be asked to wait as request will be sent to “moneycontrol.com” and it returns HTML response based on the CSS selector passed, however this will remain abstract from the user view.
• The application will load the HTML using cheerio and extract “Market Stats” URL and further send request to “Market Stats” section of “moneycontrol.com” however this will remain abstract from the user view.
• The application will load the HTML using cheerio and extract various segments such as TOP GAINERS, TOP LOSERS URL’s etc. sections of “moneycontrol.com” and further send request to these segments however this will remain abstract from the user view.
• All the segments will have different tables and different types of data hence it will be scraped accordingly using correct CSS Selectors that will be passed to search tool after loading final HTML response using cheerio.
• After data is scraped, we will first check if a folder for that trading day is already present or not, if not present we will create it and then all the subfolders for each segment and two Excel Workbooks for each exchange for a particular segment of stocks will be created.
• The data scraped will then be pushed as an object to a Excel Workbook with the help of xlsx package of NPM.
• As soon as the data is stored in the workbook and process for a particular segment is completed, a message will be flashed to user to check the folder of that segment.

Field of Project:
Web Scraping - Web scraping (or data scraping) is a technique used to collect content and data from the internet. This data is usually saved in a local file so that it can be manipulated and analyzed as needed.
