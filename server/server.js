import express from "express";
require("dotenv").config();
import cors from "cors";
import initRoutes from "./src/routes";
import connecyDatabase from "./src/config/connectDatabase";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

initRoutes(app);
connecyDatabase();

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`Sever is running on port ${listener.address().port}`);
});
