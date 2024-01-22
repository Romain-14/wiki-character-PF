import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { logout } from "../../store/slices/user";
import { toggleMenu } from "../../store/slices/menu";
import { fetchCharacters } from "../../store/slices/character";

function Header() {
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.character);
    const { isLogged } = useSelector((state) => state.user);
    const { isOpen } = useSelector((state) => state.menu);

    const [msg, setMsg] = useState("");
    const [search, setSearch] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const ref = useRef(null);

    const navigate = useNavigate();

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
            method: "GET",
            credentials: "include",
        });

        if (res.ok) {
            dispatch(logout());
            dispatch(toggleMenu());
            navigate("/");
        }
    }

    function searchCharacter(e) {
        if (e.target.value.length > 0) {
            setIsSearching(true);
        } else setIsSearching(false);
        const search = list.filter((character) => {
            return character.main_title
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
        });
        if (!search.length) {
            setMsg("Aucun résultat");
            setSearch([]);
            return;
        }

        setSearch([...search]);
        setMsg("");
    }

    function handleSearchClick() {
        setIsSearching(false);
        ref.current.value = "";
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
                    <NavLink to={"/"}>Accueil</NavLink>
                    <NavLink to={"liste-des-personnages"}>Personnages</NavLink>
                    {isLogged ? (
                        <>
                            <NavLink to={"utilisateur/compte"}>Compte</NavLink>
                            <button
                                onClick={handleLogout}
                                className="cta-logout"
                                title="se déconnecter"
                                aria-label="se déconnecter"
                            >
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <NavLink to={"authentification/connexion"}>
                            Connexion
                        </NavLink>
                    )}
                </nav>
            )}
            <div>
                <input
                    ref={ref}
                    type="search"
                    onChange={searchCharacter}
                    placeholder="Chercher un personnage"
                />
                {!isSearching && <FontAwesomeIcon icon={faMagnifyingGlass} />}

                <div className="searchList">
                    <ul>
                        {msg && <li className="msg-search-list">{msg}</li>}
                        {isSearching &&
                            search &&
                            search.map((character) => (
                                <li
                                    key={character.id}
                                    onClick={handleSearchClick}
                                >
                                    <Link
                                        to={
                                            "/liste-des-personnages/" +
                                            character.id
                                        }
                                    >
                                        {character.main_title}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
