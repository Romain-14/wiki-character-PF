import express from "express";
import { getStats, getCategory, addCategory, updateCategory, deleteCategory } from "../controllers/admin/index.js";

const router = express.Router();

router.get("/stats", getStats);

router.post("/category/add", addCategory);
router.get("/category/:id", getCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

// router.post() //ajouter un article
// router.delete() // supprimer un article
// router.update() // modifier un article


export default router;
