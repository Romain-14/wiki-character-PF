import { Router } from "express";

import { login, register, logout, checkToken } from "../controllers/auth.js";
import auth from "../middlewares/auth.js";

const router = Router();    


router.post("/login", login);
router.post("/register", register);

router.get("/logout", logout);

router.get("/check-token", auth, checkToken);

export default router;