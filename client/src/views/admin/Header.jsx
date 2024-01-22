import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../store/slices/user";
import { toggleMenu } from "../../store/slices/menu";
import { fetchCharacters } from "../../store/slices/character";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { list }   = useSelector((state) => state.character);
    const { isOpen } = useSelector((state) => state.menu);

    useEffect(() => {
        if (!list.length) {
            dispatch(fetchCharacters());
        }
    }, []);

    function handleToggleMenu() {
        dispatch(toggleMenu());
    }

    async function handleLogout() {
        const res = await fetch("/api/v1/authentification/logout", {
            credentials: "include",
        });

        if (res.ok) {
            dispatch(logout());
            dispatch(toggleMenu());
            navigate("/");
        }
    }

    return (
        <header>
            <div>
                <h1>
                    <Link to={"/"} title="Vers la page d'accueil">
                        wiki-character
                    </Link>
                </h1>
                <button
                    className="cta-menu"
                    onClick={handleToggleMenu}
                    title="Accéder au menu de navigation"
                    aria-label="Accéder au menu de navigation"
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
            {isOpen && (
                <nav>
                    <NavLink to={"/admin"}>Accueil</NavLink>
                    <NavLink to={"donnees"}>Données</NavLink>

                    <button
                        onClick={handleLogout}
                        className="cta-logout"
                        title="se déconnecter"
                        aria-label="se déconnecter"
                    >
                        Déconnexion
                    </button>
                </nav>
            )}
        </header>
    );
}

export default Header;
