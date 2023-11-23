import express from "express";
import cors from "cors";
import RegValidator from "./utils/RegValidation.js";
import LogValidator from "./utils/LogValidation.js";
import AddValidator from "./utils/AddValidation.js";
import FbStorage from "./service/fbStorage.js";
import UserStorage from "./service/userStorage.js";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3001;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "football_team",
  password: "Hakobyan1",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.post("/registration", async (req, res) => {
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
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  UserStorage.setUserData(db, userData);
  res.json({ ok: true });
});

app.post("/login", async (req, res) => {
  const errors = LogValidator.validate(req.body);

  try {
    const usersData = await UserStorage.getUserData(db);
    let possibleUser = usersData.find((user) => {
      if (
        user.username === req.body.username &&
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
        username: possibleUser.username,
        email: possibleUser.email,
        id: possibleUser.id,
      },
      ok: true,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.json({ errors: "Internal server error", ok: false });
  }
});

app.post("/", async (req, res) => {
  try {
    let error = AddValidator.validate(req.body.footballer);
    if (error) {
      res.json({ error });
      return;
    }
    const ownerId = req.headers.authorization;
    let footballerData = [];
    footballerData.push({
      owner_id: ownerId,
      fullName: req.body.footballer.fullName,
    });
    await FbStorage.set(db, footballerData);
    const footballerId = await FbStorage.getDatabyId(db);
    res.json({ data: footballerId });
  } catch (err) {
    console.error("Error adding footballer:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/usersData", (req, res) => {
  res.json(usersData);
});

app.delete("/footballersData/:id", (req, res) => {
  FbStorage.delete(db, req.params.id);
  res.json({ message: "Footballer deleted successfully" });
});

app.put("/footballersData/:id", (req, res) => {
  const footballerId = req.params.id;
  console.log(req.params);

  const updatedData = req.body.fullName;
  FbStorage.update(db, footballerId, updatedData);
  res.json({ message: "Footballer data updated successfully" });
});

app.get("/footballersData", async (req, res) => {
  let footballersData = [];
  const ownerId = req.headers.authorization;
  try {
    if (ownerId) {
      footballersData = await FbStorage.getDatabyId(db, ownerId);
    } else {
      footballersData = await FbStorage.getAllData(db);
    }

    res.json(footballersData);
  } catch (error) {
    console.error("Error fetching footballers data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
