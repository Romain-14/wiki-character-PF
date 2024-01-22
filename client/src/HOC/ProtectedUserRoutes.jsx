import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// HOC qui permet de vérifier si l'utilisateur est connecté et si il a les droits pour accéder à la page
// un HOC est composant qui retourne un composant, le composant est passé en paramètre de la fonction
function RequireAuth(Component) {
    const navigate = useNavigate();

    return function ProtectedUserRoutes(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            async function updateAuth() {
                const response = await fetch(
                    "/api/v1/authentification/check-token",
                    {
                        credentials: "include",
                    }
                );

                const authJson = await response.json();

                // si le token est valide et que l'utilisateur est a un role d'utilisateur on retourne le composant
                if (response.ok && authJson.user.role === "user") {
                    return setIsAuthenticated(true);
                }

                return navigate("/");
            }
            updateAuth();
        }, []);

        if (isAuthenticated) return <Component {...props} />;
    };
}

export default RequireAuth;
