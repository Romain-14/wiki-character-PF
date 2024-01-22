import express from "express";

import adminAuth from "../middlewares/adminAuth.js";
import app_routes from "./app.routes.js";
import auth_routes from "./auth.routes.js";
import admin_routes from "./admin.routes.js";

const router = express.Router();

// http://localhost:9000/api/v1
router.use("/app", app_routes);
router.use("/authentification", auth_routes);

// pour les routes admin, on protège l'accès avec un middleware pour vérifier le token, et si celui contient une donnée de role "admin"
router.use("/admin", adminAuth, admin_routes);


export default router;