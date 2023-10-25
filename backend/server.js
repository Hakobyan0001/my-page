import express from "express";
import cors from "cors";
import RegValidator from "./utils/RegValidation.js";
import LogValidator from "./utils/LogValidation.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import AddValidator from "./utils/AddValidation.js";

const app = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let data;
let footballersListData;
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

try {
  footballersListData = fs.readFileSync(
    path.join(__dirname, "..", "backend", "footballersList.json"),
    "utf-8"
  );
  if (!footballersListData) {
    console.error("footballersList.json is empty.");
  }
} catch (err) {
  console.error("Error reading footballersList.json:", err);
}

let usersData = JSON.parse(data);
let footballersData = JSON.parse(footballersListData);
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

app.post("/", (req, res) => {
  console.log(req.body);
  let error = AddValidator.validate(req.body.footballer);
  if (error) {
    res.json(error);
    return;
  }
  if (!Array.isArray(footballersData)) {
    footballersData = [];
  }
  footballersData.push({
    ownerId: req.body.ownerId,
    footballerId: uuidv4(),
    fullName: req.body.footballer.fullName,
  });

  const jsonString = JSON.stringify(footballersData);
  fs.writeFileSync("footballersList.json", jsonString, "utf-8", (err) => {
    if (err) throw err;
    console.log("Data added to file");
  });

  res.json({ data: req.body });
});

app.delete("/footballersData/:id", (req, res) => {
  const footballerId = req.params.id;
  const index = footballersData.findIndex(
    (footballer) => footballer.footballerId === footballerId
  );

  if (index === -1) {
    return res.status(404).json({ error: "Footballer not found" });
  }

  footballersData.splice(index, 1);

  res.json({ message: "Footballer deleted successfully" });
});

app.get("/usersData", (req, res) => {
  res.json(usersData);
});

app.get("/footballersData", (req, res) => {
  res.json(footballersData);
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
