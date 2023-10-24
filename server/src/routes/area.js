import express from "express";
import * as controllers from "../controller/area";

const routes = express.Router();

routes.get("/all", controllers.getAreas);

export default routes;
