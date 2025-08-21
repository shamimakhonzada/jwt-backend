import { Router } from "express";
import { me, list } from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = Router();

router.get("/me", authenticate, ...me);
router.get("/", authenticate, authorize("ADMIN"), ...list);

export default router;
