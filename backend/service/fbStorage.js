import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FbStorage {
  static getDatabyId(ownerId) {
    let fbListData = [];
    try {
      fbListData = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "..", "footballersList.json"),
          "utf-8"
        )
      );
    } catch (err) {
      console.error("Error reading footballersList.json:", err);
    }
    fbListData = fbListData.filter(
      (footballers) => footballers.ownerId === ownerId
    );
    return fbListData;
  }

  static getAllData() {
    let fbListData = [];
    try {
      fbListData = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "..", "footballersList.json"),
          "utf-8"
        )
      );
    } catch (err) {
      console.error("Error reading footballersList.json:", err);
    }
    return fbListData;
  }

  static set(footballers) {
    const jsonString = JSON.stringify(footballers);
    fs.writeFileSync("footballersList.json", jsonString, "utf-8", (err) => {
      if (err) throw err;
      console.log("Data added to file");
    });
  }

  static delete(id) {
    let fbListData = this.getAllData();
    fbListData = fbListData.filter(
      (footballer) => footballer.footballerId !== id
    );

    const jsonString = JSON.stringify(fbListData);
    fs.writeFileSync("footballersList.json", jsonString, "utf-8", (err) => {
      if (err) throw err;
      console.log("Data added to file");
    });
  }
}

export default FbStorage;
