Reddit New Scraper This app allows users to view Reddit News articles as it scrpapes the website and saves it. You can comment on the story and view the story with a URL. Each article displayed includes a headline which is also a link to the source article. The app uses Node/Express for the server and routing, MongoDB/Mongoose for the database and models, Handlebars for the layout views, Bootstrap for the layout, & Cheerio/Request for scraping the data from Reddit.com.

The deployed Heroku app - https://scraper32828.herokuapp.com/

When you launch the CLI app, this webpage is availabe on localhost:3000


You hit the "scrape articles" button on top, and the app will run. 
AFter the scrape is done, return to the localhost:3000 and the articles will be saved and displayed. 
![Image of required files](./images/1.png)

When you click the headline, a popup box will display on the right. The link to the story as well as a textbox for a note is generated. You can eave a note and save it, or just go read the story. 
![Image of required files](./images/2.png)