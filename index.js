const PORT = 5000;
import axios from "axios";
import * as cheerio from "cheerio";
import express from "express";
import fs from "fs";

const app = express();

//? Defining the URLs:
// const url1 = `https://en.wikipedia.org/wiki/List_of_most_expensive_artworks_by_living_artists`
// const url2 = `https://en.wikipedia.org/wiki/List_of_most_expensive_paintings`

//? I want to scrape data from the english wikipedia page:
const baseURL = `https://en.wikipedia.org`;

//? The Wikipedia-pages I took the data from:
const paintingsAll = `/wiki/List_of_most_expensive_paintings`;
const paintingsLiving = `/wiki/List_of_most_expensive_artworks_by_living_artists`;
const sculpturesLink = `/wiki/List_of_most_expensive_sculptures`;

//? Defining the method for collecting the data:
const getAllPaintingsData = async (baseURL, paintingsAll) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: baseURL + paintingsAll,
    });
    const $ = await cheerio.load(data);
    // console.log("DATA =>", data);
    const paintings = [];

    $("table > tbody > tr", data).each(function (row) {
      if (row != 0) {
        const position = row;

        const title = $(this)
          .find(`tr > td:nth-child(3)`)
          .text()
          .replace("\n", "")
          .split("[")[0];

        const titleLink = $(this)
          .find(`tr > td:nth-child(3) > i > a`)
          .attr("href");

        const paintingInfoURL = baseURL + titleLink;

        const artist = $(this)
          .find(`tr > td:nth-child(5)`)
          .text()
          .replace("\n", "")
          .split("[")[0];
        const imageURLThumb =
          "https:" +
          $(this).find(`tr > td:nth-child(4)`).find("a > img").attr("src");
        const imageURLSmall = imageURLThumb.replace("95px", "326px");
        const imageURLMedium = imageURLThumb.replace("95px", "489px");
        const price_inflation_adjusted = $(this)
          .find(`tr > th`)
          .text()
          .replace("\n", "")
          .split("[")[0];

        const price_sold = $(this)
          .find(`tr > td:nth-child(2)`)
          .text()
          .replace("\n", "")
          .split("[")[0];

        const year = $(this)
          .find(`tr > td:nth-child(6)`)
          .text()
          .replace("\n", "")
          .split("[")[0];

        const date_of_sale = $(this)
          .find(`tr > td:nth-child(7)`)
          .text()
          .replace("\n", "")
          .split("[")[0];

        const seller = $(this)
          .find(`tr > td:nth-child(9)`)
          .text()
          .replace("\n", "")
          .split("[")[0];

        const buyer = $(this)
          .find(`tr > td:nth-child(10)`)
          .text()
          .replace("\n", "")
          .split("[")[0];

        const auction_house = $(this)
          .find(`tr > td:nth-child(11)`)
          .text()
          .replace("\n", "")
          .split("[")[0];

        paintings.push({
          position,
          title,
          titleLink,
          paintingInfoURL,
          artist,
          imageURLThumb,
          imageURLSmall,
          imageURLMedium,
          price_inflation_adjusted,
          price_sold,
          year,
          date_of_sale,
          seller,
          buyer,
          auction_house,
        });
      }
    });

    // Create a 'paintingsAllTime.json' file in the root directory with the scraped paintings
    fs.writeFile(
      "allPaintings_data.json",
      JSON.stringify(paintings, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Data written to file successfully!");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

getAllPaintingsData(baseURL, paintingsAll);

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}.`));
