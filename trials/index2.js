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

//? Defining the method for collecting the data:
const getAllPaintingsData = async () => {
  const { data } = await axios({
    method: "GET",
    url: baseURL + paintingsAll,
  });
  const $ = await cheerio.load(data);
  const paintingsInfo = [];

  $("table > tbody > tr", data).each(function (row) {
    if (row != 0) {
      const title = $(this)
        .find(`tr > td:nth-child(3)`)
        .text()
        .replace("\n", "")
        .split("[")[0];

      const titleLink = $(this)
        .find(`tr > td:nth-child(3) > i > a`)
        .attr("href");

      const paintingInfoURL = baseURL + titleLink;

      paintingsInfo.push({
        title,
        titleLink,
        paintingInfoURL,
      });
    }
    return paintingsInfo;
  });
};

// try {
//   await getAllPaintingsData();

// }

//  getAllPaintingsData().then(function (result) {
//   console.log(result);
// });
// console.log("RESULTS ? =>", paintingsResult);

const getPaintingInfo = async () => {
  let results = await getAllPaintingsData();
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
        console.log("INFOS => ", information);
      }
    });
  }
};

getPaintingInfo();
// getLivingPaintingsData();
// getSculpturesData();

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}.`));
