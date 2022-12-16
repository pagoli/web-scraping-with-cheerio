const PORT = 5000;
import axios from "axios";
import * as cheerio from "cheerio";
import express from "express";
import fs from "fs/promises";

const app = express();

//? Defining the URLs:
// const url1 = `https://en.wikipedia.org/wiki/List_of_most_expensive_artworks_by_living_artists`
// const url2 = `https://en.wikipedia.org/wiki/List_of_most_expensive_paintings`
const baseURL = `https://en.wikipedia.org`;
const paintingsAll = `/wiki/List_of_most_expensive_paintings`;
const paintingsLiving = `/wiki/List_of_most_expensive_artworks_by_living_artists`;
const sculpturesLink = `/wiki/List_of_most_expensive_sculptures`;

let regex_px = /\b([1-9]|[1-9][0-9]|1[01][0-9]|15[0-9])px\b/gm;

const readData = () => {
  let path = "./infoLinks.json";
  // fs.readFile(file, { encoding: "utf8" });
  fs.readFile(path, { encoding: "utf8" })
    .then((data) => {
      let object = JSON.parse(data);
      console.log("OBJECT => ", object);
      return object;
    })
    .catch((error) => {
      console.log("ERROR => ", error);
    });
};

const getInfoOfEachPainting = async (data) => {
  const getURL = data.map((painting) => {
    console.log("PAINTING OBJ => ", painting);
    // const { data } = await axios({
    //   method: "GET",
    //   url: baseURL + paintingsAll,
    // });
    // const $ = await cheerio.load(data);
    // const paintingsInfo = [];

    // $("table > tbody > tr", data).each(function (row) {
    //   if (row != 0) {
    //     const title = $(this)
    //       .find(`tr > td:nth-child(3)`)
    //       .text()
    //       .replace("\n", "")
    //       .split("[")[0];

    //     const titleLink = $(this)
    //       .find(`tr > td:nth-child(3) > i > a`)
    //       .attr("href");

    //     const paintingInfoURL = baseURL + titleLink;

    //     paintingsInfo.push({
    //       title,
    //       titleLink,
    //       paintingInfoURL,
    //     });
    //   }
    //   return paintingsInfo;
    // })

    // ##########################

    // console.log("PAINTINGSINFO => ", paintingsInfo);
    // fs.writeFile(
    //   "infoLinks.json",
    //   JSON.stringify(paintingsInfo, null, 2),
    //   (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log("Data written to file successfully!");
    //   }
    // )
  });
};

try {
  let data = await readData();
  console.log("Data received");
} catch (err) {
  console.log("Failed to copy", err);
}

// const copy = async function (source, target) {
//   const data = await fs.readFile(source, { encoding: "utf8" });
//   await fs.writeFile(target, data, { encoding: "utf8" });
// };

const getPaintingInfo = async (results) => {
  console.log("ANY DATA?2 ", results);
  const { data } = await axios({
    method: "GET",
    url: results.paintingInfoURL,
  });
  const $ = await cheerio.load(data);
  if (!paintingInfoURL.includes("undefined")) {
    const paintingInfoText = [];
    $(".").each(function (item) {
      if (item != 0) {
        const information = $(this).find(`.mw-parser.output p`).text();
        paintingInfoText.push(information);
        // console.log("INFO1 => ", information);
      }
    });
  }
};

//! Does not work - don't get results
// async function getTheData() {
//   const results = await getAllPaintingsData();
//   console.log("RESULTS => ", results);
//   const info = await getPaintingInfo(results);
//   console.log("INFOOOO => ", info);
//   console.log("###################### END ################################");
// }
// getTheData();

// getAllPaintingsData()
//   .then((results) => getPaintingInfo(results))
//   .then(() => console.log("DONE"));

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}.`));
