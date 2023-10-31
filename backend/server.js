import express from "express";
import cors from "cors";
import RegValidator from "./utils/RegValidation.js";
import LogValidator from "./utils/LogValidation.js";
import { v4 as uuidv4 } from "uuid";
import AddValidator from "./utils/AddValidation.js";
import FbStorage from "./service/fbStorage.js";
import UserStorage from "./service/userStorage.js";

const app = express();
const port = 3001;

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
  const usersData = UserStorage.getAllData();

  usersData.push({
    id: uuidv4(),
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  UserStorage.setUserData(usersData);

  res.json({ data: req.body, ok: true });
});

app.post("/login", (req, res) => {
  let errors = LogValidator.validate(req.body);
  const usersData = UserStorage.getUserData();

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
  let error = AddValidator.validate(req.body.footballer);
  if (error) {
    res.json(error);
    return;
  }
  const footballersData = FbStorage.getAllData();
  const footballerId = uuidv4();
  footballersData.push({
    ownerId: req.body.ownerId,
    footballerId: footballerId,
    fullName: req.body.footballer.fullName,
  });
  FbStorage.set(footballersData);

  res.json({ data: footballerId });
});

app.delete("/footballersData/:id", (req, res) => {
  FbStorage.delete(req.params.id);
  res.json({ message: "Footballer deleted successfully" });
});

app.get("/usersData", (req, res) => {
  res.json(usersData);
});

app.get("/footballersData", (req, res) => {
  let footballersData = [];
  const ownerId = req.headers.authorization;
  if (ownerId) {
    footballersData = FbStorage.getDatabyId(ownerId);
    res.json(footballersData);
    return;
  }
  footballersData = FbStorage.getAllData();
  res.json(footballersData);
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
