import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/index.routes.js";

const app = express();
const PORT = process.env.PORT || process.env.LOCAL_PORT;

// pour recevoir les cookies envoyer par le front via les fetch, créera un objet req.cookies
app.use(cookieParser());

app.use(
    cors({
        // origin -> permets la communication entre en 2 entités avec deux domaines (origines) différents
        // method -> permets de définir les méthodes autorisées
        // credentials -> permets de définir si les cookies sont autorisés
        origin: "http://localhost:3000", // à remplacer par une var d'env -> process.env.CLIENT_URL, 
        methods: ["GET", "POST", "DELETE", "PATCH"], 
        credentials: true, 
    })
);

app.use(
    "/img",
    express.static(path.join(process.cwd(), "public/assets/images"))
);
// pour recevoir les données en JSON reçu depuis le front via les fetch
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
    res.json({ msg: "api is running" });
});

app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
);
