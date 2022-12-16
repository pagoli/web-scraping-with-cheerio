const PORT = 5000;
import axios from "axios";
import * as cheerio from "cheerio";
import express from "express";
import fs from "fs/promises";

const app = express();

// const readData = () => {
//   let path = "./infoLinks.json";
//   // fs.readFile(file, { encoding: "utf8" });
//   fs.readFile(path, { encoding: "utf8" })
//     .then((data) => {
//       let object = JSON.parse(data);
//       // console.log("OBJECT => ", object);
//       return object;
//     })
//     .catch((error) => {
//       console.log("ERROR => ", error);
//     });
// };

// const allEvents = await events.toArray();
//   let eventsAsString = JSON.parse(JSON.stringify(allEvents))

const getInfoLinks = async (data) => {
  // console.log("DATA in Func", data);
  const result = JSON.parse(data);
  return result; // array of Objects with title, titleLink, paintingInfoURL
};

const infoLinksArray = async (infoLink) => {
  const allInfo = infoLink.map((painting) => {
    const testFunc = async (painting) => {
      console.log("PAINTINGGGG => ", painting);
      const { data } = await axios({
        method: "GET",
        url: painting.paintingInfoURL,
      });
      const paintingInfoText = [];
      const $ = await cheerio.load(data);
      console.log("cherio data", data);
      if (!paintingInfoURL.includes("undefined")) {
        $(".").each(function (item) {
          if (item != 0) {
            const information = $(this).find(`.mw-parser.output p`).text();
            // paintingInfoText.push(information);
            console.log("INFO1 => ", information);
          }
        });
      }
    };
    // return paintingInfoText;
  });
};

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
// });

const asyncFunc = async () => {
  const unresolvedPromises = arr.map(calc);
  const results = await Promise.all(unresolvedPromises);
  document.write(results);
};

async function getTheData() {
  try {
    // let data = await readData();
    const data = await fs.readFile("./infoLinks.json", { encoding: "utf8" });
    console.log("Data received");
    const infoLinks = await getInfoLinks(data);
    const dataToWrite = await Promise.all(infoLinks);
    const dataBlaBla = await infoLinksArray(infoLinks);
    console.log("Results received", dataBlaBla);
  } catch (err) {
    console.log("Failed to copy", err);
  }
}
getTheData();

app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}.`));
