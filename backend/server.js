// task: nodejs voncen fileum info pahum

import express from "express";
import cors from "cors";
import RegValidator from "./utils/RegValidation.js";
import LogValidator from "./utils/LogValidation.js";

const app = express();
const port = 3001;

let users = [];
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.post("/registration", (req, res) => {
  let errors = RegValidator.validate(req.body);
  if (
    errors.fNameError ||
    errors.emailError ||
    errors.passError ||
    errors.confirmPassError
  ) {
    res.json({ errors, ok: false });
    return;
  }
  users.push(req.body);
  res.json({ data: req.body, ok: true });
});

app.post("/login", (req, res) => {
  let errors = LogValidator.validate(req.body);
  let possibleUser = users.find((user) => {
    if (user.uName === req.body.uName && user.pass === req.body.pass) {
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
      username: possibleUser.uName,
      email: possibleUser.email,
      id: possibleUser.id,
    },
    ok: true,
  });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
