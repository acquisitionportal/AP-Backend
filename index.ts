import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
require("dotenv").config();

import { UserSchema } from "./User";

const app = express();
app.use(bodyParser.json());
const PORT: number = 5000;

const dbUrl: string | undefined = process.env.MONGO_URL;
console.log("DB URL: ", dbUrl);
dbUrl &&
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err: Error) => {
      console.log(err);
    });

const User = mongoose.model("User", UserSchema);

app.post("/registerUser", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.send("new user created"))
    .catch((err: Error) => res.send(err));
});

app.listen(PORT, () => {
  console.log(`App service running on port ${PORT}`);
});
