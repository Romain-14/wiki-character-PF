import { useEffect, useState } from "react";

function RequireAuth(Component) {
    return function ProtectedAdminRoutes(props) {
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
                if (response.ok || authJson.user.role === "admin") {
                    setIsAuthenticated(true);
                }
            }

            updateAuth();
        }, []);

        if (isAuthenticated) return <Component {...props} />;
    };
}

export default RequireAuth;
