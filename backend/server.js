import express from "express";
import cors from "cors";

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
  users.push(req.body);
  res.json(req.body);
});
app.post("/login", (req, res) => {
  users.push(req.body);
  res.json({ message: "User data received successfully" });
});
app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
