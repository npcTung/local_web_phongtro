import express from "express";
import * as controllers from "../controller/category";

const routes = express.Router();

routes.get("/all", controllers.getCategories);

export default routes;
