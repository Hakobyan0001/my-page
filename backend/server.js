import express from "express";
import cors from "cors";
import RegValidator from "./utils/RegValidation.js";
import LogValidator from "./utils/LogValidation.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let data;
try {
  data = fs.readFileSync(
    path.join(__dirname, "..", "backend", "data.json"),
    "utf-8"
  );
  if (!data) {
    console.error("data.json is empty.");
  }
} catch (err) {
  console.error("Error reading data.json:", err);
}
let usersData = JSON.parse(data);

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.post("/registration", (req, res) => {
  let errors = RegValidator.validate(req.body);
  if (
    errors.uNameError ||
    errors.emailError ||
    errors.passwordError ||
    errors.confirmPasswordError
  ) {
    res.json({ errors, ok: false });
    return;
  }

  if (!Array.isArray(usersData)) {
    usersData = [];
  }
  usersData.push({
    id: uuidv4(),
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  const jsonString = JSON.stringify(usersData);
  fs.writeFileSync("data.json", jsonString, "utf-8", (err) => {
    if (err) throw err;
    console.log("Data added to file");
  });

  res.json({ data: req.body, ok: true });
});

app.post("/login", (req, res) => {
  let errors = LogValidator.validate(req.body);
  let possibleUser = usersData.find((user) => {
    if (
      user.userName === req.body.userName &&
      user.password === req.body.password
    ) {
      return true;
    }
    return false;
  });

  if (!possibleUser) {
    res.json({ errors, ok: false });
    return;
  }
  res.json({
    data: {
      userName: possibleUser.userName,
      email: possibleUser.email,
      id: possibleUser.id,
    },
    ok: true,
  });
});

app.get("/usersData", (req, res) => {
  res.json(usersData);
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
