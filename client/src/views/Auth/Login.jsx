import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../store/slices/user";
import useCloseMenuOnMount from "../../hooks/useCloseMenuOnMount";

function Login() {
    useCloseMenuOnMount();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [msg, setMsg] = useState("");

    useEffect(() => {
        usernameRef.current.focus();
    }, [msg]);

    const submitHandler = async (e) => {
        try {
            e.preventDefault();
            const username = usernameRef.current.value;
            const password = passwordRef.current.value;
            const datas    = { username, password };
            const response = await fetch(
                "/api/v1/authentification/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(datas),
                }
            );
            if (response.ok) {
                const user = await response.json();
                dispatch(login(user.username));
                if(user.role === "admin") window.location.href = "/admin";
                navigate("/");
            } else setMsg("Erreur de connexion");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={submitHandler}>
                <legend>Connexion</legend>
                <label htmlFor="username">Nom d&apos;utilisateur :</label>
                <input
                    ref={usernameRef}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Votre nom d'utilisateur"
                />

                <label htmlFor="password">Mot de passe :</label>
                <input
                    ref={passwordRef}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Votre nom d'utilisateur"
                />

                <button type="submit">Valider</button>
                <Link to={"/authentification/inscription"}>
                    Créer le compte
                </Link>
            </form>
            {msg && <p>{msg}</p>}
        </>
    );
}

export default Login;
