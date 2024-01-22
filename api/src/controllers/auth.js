import Query from "../model/Query.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const query = "SELECT * FROM users WHERE username = ?";
        const user = await Query.runWithParams(query, [username]);

        if (!user.length) {
            const SALT = Number(process.env.B_SALT);
            const hash = await bcrypt.hash(password, SALT);
            const query =
                "INSERT INTO users (username, password, created_at, role_id) VALUES (?, ?, NOW(), 2)";
            const user = await Query.runWithParams(query, [username, hash]);

            if (user.insertId) {
                res.status(201).json({ message: "Compte créé" });
                return;
            }
        }
        res.status(409).json({
            message: "Compte non créé, veuillez réessayer",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur, veuillez réessayer" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const query = "SELECT * FROM users WHERE username = ?";
        const [user] = await Query.runWithParams(query, [username]);
        if (
            !user ||
            !(await bcrypt.compare(password, user.password))
        ) {
            return res.status(409).json({ message: "Identifiants incorrects" });
        }
        // attribution d'un role en chaîne de caractères pour le token
        const role = user.role_id === 1 ? "admin" : "user";
        // signature du token 
        const TOKEN = jwt.sign(
            { id: user.id, username, role }, // payload
            process.env.SECRET_TOKEN, // signature de vérification
            { expiresIn: "1h" }
        );
        res.cookie("TK_AUTH", TOKEN, { httpOnly: true, maxAge: 3600000}); 
        res.json({ message: "Connexion réussie", username : user.username, role });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur serveur, veuillez réessayer" });
    }
};

const logout = (req, res) => {
    res.clearCookie("TK_AUTH");
    res.json({ message: "Déconnexion réussie" });
};

const checkToken = (req, res) => {
        res.json({ user: req.user });
 
};

export { register, login, logout, checkToken };
