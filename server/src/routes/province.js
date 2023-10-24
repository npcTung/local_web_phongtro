import express from "express";
import * as controllers from "../controller/province";

const routes = express.Router();

routes.get("/all", controllers.getProvinces);

export default routes;
