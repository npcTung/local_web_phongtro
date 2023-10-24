import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as userControllers from "../controller/user";

const router = express.Router();

router.use(verifyToken);
router.get("/get-current", userControllers.getCurrent);
router.put("/", userControllers.updateUser);

export default router;
