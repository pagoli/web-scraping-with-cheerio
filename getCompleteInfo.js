const PORT = 5000;
import * as cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs/promises";
import express from "express";

const app = express();

// read Data of each painting:
const readData = async () => {
  let path = "./paintingsAllTime.json";
  const objectData = await fs
    .readFile(path, { encoding: "utf8" })
    .then((data) => {
      let object = JSON.parse(data); // json to object
      // console.log("OBJECT => ", object);
      return object;
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("ERROR => ", error);
    });
  // console.log("objectData", objectData);
  return objectData;
};

// get Information to each Painting with link of readData()
async function getInfo(painting) {
  const items = [];
  for (const object of painting) {
    try {
      if (
        object.painting_info_url.split(".").includes("orgundefined") === true
      ) {
        items.push({
          position: object.position,
          title: object.title,
          title_link: object.title_link,
          painting_info_url: object.painting_info_url,
          artist: object.artist,
          image_url_thumb: object.image_url_thumb,
          image_url_small: object.image_url_small,
          image_url_medium: object.image_url_medium,
          price_inflation_adjusted: object.price_inflation,
          price_sold: object.price_sold,
          year: object.year,
          date_of_sale: object.date_of_sale,
          seller: object.seller,
          buyer: object.buyer,
          auction_house: object.auction_house,
        });
      } else {
        // Fetch data from URL and store the response into a const
        const response = await fetch(object.painting_info_url);
        // Convert the response into text
        const body = await response.text();
        // Load body data
        const $ = cheerio.load(body);

        // Selecting the information for
        $("body").map(function (el) {
          // Regex for clean text data to delete references (square brackets)
          let regex_sq = /\[(.*?)\]/gm;

          // if (el != 0) {
          const short_description = $(this).find(`.shortdescription`).text()
            ? $(this).find(`.shortdescription`).text()
            : "no short description";
          const painting_info = $(this).find("p").text().replace(regex_sq, "")
            ? $(this).find("p").text().replace(regex_sq, "")
            : "no description";

          items.push({
            position: object.position,
            title: object.title,
            title_link: object.title_link,
            painting_info_url: object.painting_info_url,
            artist: object.artist,
            image_url_thumb: object.image_url_thumb,
            image_url_small: object.image_url_small,
            image_url_medium: object.image_url_medium,
            price_inflation_adjusted: object.price_inflation,
            price_sold: object.price_sold,
            year: object.year,
            date_of_sale: object.date_of_sale,
            seller: object.seller,
            buyer: object.buyer,
            auction_house: object.auction_house,
            short_description,
            painting_info,
          });
          // console.log("ITEMS ===> ", items);
        });
      }
      fs.writeFile(
        "paintingsInformationComplete.json",
        JSON.stringify(items, null, 2),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Data written to file successfully!");
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}

// Run async function:
async function getTheData() {
  const results = await readData();
  // console.log("RESULTS => ", results);
  const info = await getInfo(results);
  console.log("###################### END ################################");
}
getTheData();

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}.`));
