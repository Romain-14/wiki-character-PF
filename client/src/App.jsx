import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/slices/user";
import UserRoutes from "./Router/user.routes";
import AdminRoutes from "./Router/Admin.routes";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // au départ un état est définit sur visiteur, implique que l'utilisateur n'est pas connecté
    const [userType, setUserType] = useState("visitor");

    useEffect(() => {
        async function persistAuth() {
            // on vérifie si le token est valide
            // il y a une route sur le back avec une fonction middleware permettant de vérifier si le token est valide, s'il est présent ou non valide
            const checkToken = await fetch(
                "/api/v1/authentification/check-token",
                {
                    credentials: "include", // on inclue les cookies dans la requête
                }
            );

            const auth = await checkToken.json();
            
            // si le token n'est pas valide ou n'est pas présent on arrête la fonction
            if (checkToken.error) return; 
            // si le token est valide
            if (checkToken.ok) {
                // on mets à jour la state de l'utilisateur dans le store
                dispatch(login(auth.user));
                // mise à jour de l'état de l'utilisateur
                setUserType(auth.user.role);
                // si c'est un admin on le redirige vers la page admin
                if (auth.user.role === "admin") {
                    navigate("/admin");
                }
            }
        }

        persistAuth();
    }, [userType]);

    // si l'état est sur visiteur OU un utilisateur (données récupéré de son token grace au useEffect au-dessus), on retourne le routeur de l'utilisateur
    if (userType === "visitor" || userType === "user") return <UserRoutes />;
    // si l'état est sur admin, on retourne le routeur de l'admin
    if (userType === "admin") return <AdminRoutes />;
}

export default App;
