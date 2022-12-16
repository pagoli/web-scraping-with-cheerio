# Web Scraper tool with NodeJs / Cheerio

##### Disclaimer: This project was built by me for learning purposes and open for modifications in the future.

## Setup

#### `npm install`

All needed packages will be installed.

#### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm start`

Runs the app once to scrape the data from the website.

<br />

#### Packages used

Express: backend framework for nodeJs (used to listen to the path and port)
=> when visiting a certain path/url, express executes some code and listens out to the port.

Cheerio: picks out HTML elements on a webpage, parsing markup, provides api for traversing and manipulating the resulting data structure
=> similar to jQuery.parse

Axios: Promise-based HTTP client for browser and node.js
=> sends HTTP request to endpoint to perform CRUD operations (POST/PUT/DELETE)
