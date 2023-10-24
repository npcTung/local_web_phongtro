import express from "express";
import * as controllers from "../controller/price";

const routes = express.Router();

routes.get("/all", controllers.getPrives);

export default routes;
