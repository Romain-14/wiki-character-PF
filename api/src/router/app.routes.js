import express from "express";
import { getAllArticles, getAllCategories, getAllCharacters } from "../controllers/app.js";

const router = express.Router();

router.get("/article", getAllArticles);
router.get("/category", getAllCategories);
router.get("/character", getAllCharacters); // with picture and categories

export default router;
