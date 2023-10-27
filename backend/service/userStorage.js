import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserStorage {
  static getUserData() {
    let userData = [];
    try {
      userData = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "..", "backend", "data.json"),
          "utf-8"
        )
      );
    } catch (err) {
      console.error("Error reading data.json:", err);
    }
    return userData;
  }

  static setUserData(usersData) {
    const jsonString = JSON.stringify(usersData);
    fs.writeFileSync("data.json", jsonString, "utf-8", (err) => {
      if (err) throw err;
      console.log("Data added to file");
    });
  }

  static delete(userData) {
    let userslist = this.getAllData();
    userslist = userslist.filter((user) => user !== userData);

    const jsonString = JSON.stringify(userslist);
    fs.writeFileSync("footballersList.json", jsonString, "utf-8", (err) => {
      if (err) throw err;
      console.log("Data added to file");
    });
  }
}

export default UserStorage;
