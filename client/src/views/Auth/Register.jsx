import { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import useCloseMenuOnMount from "../../hooks/useCloseMenuOnMount";

function Register() {
    const API_URL =
        "/api/v1/authentification/register";
    useCloseMenuOnMount();
    const usernameRef = useRef();
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const inputChangeHandler = (e) =>
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });

    async function submitHandler(e) {
        e.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
            });
            
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                if (response.status >= 200 && response.status < 300) {
                    navigate("/authentification/connexion");
                } else {
                    const resJson = await response.json();
                    throw new Error(resJson.message);
                }
            } else {
                throw new Error("Erreur du serveur.");
            }
        } catch (error) {
            if (error.message === "Failed to fetch") {
                setError("Impossible de se connecter au serveur");
            } else {
                setError(error.message);
            }
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <legend>Création de compte</legend>
                <label htmlFor="username">Nom d&apos;utilisateur :</label>
                <input
                    ref={usernameRef}
                    type="text"
                    name="username"
                    id="username"
                    onChange={inputChangeHandler}
                />

                <label htmlFor="password">Mot de passe :</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={inputChangeHandler}
                />

                <button type="submit">Créer le compte</button>

                {error && <p>{error}</p>}
            </form>
        </>
    );
}

export default Register;
