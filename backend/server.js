import express from "express";
import cors from "cors";
import Validator from "./utils/validation.js";

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
  let errors = Validator.validate(req.body);
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
  let errors = Validator.validate(req.body);
  if (req.body.uName !== users.uName || req.body.pass !== users.pass) {
    res.json({ errors, ok: false });
    return;
  }
  res.json({ data: req.body, ok: true });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
