import { NavLink, Outlet } from "react-router-dom";

import useCloseMenuOnMount from "../../hooks/useCloseMenuOnMount";

function Datas() {
    useCloseMenuOnMount();
    
    return (
        <main id="datas">
            <h1>Données</h1>

            <nav aria-label="Navigation secondaire">
                <NavLink to="/admin/donnees/utilisateurs">Utilisateurs</NavLink>
                <NavLink to="/admin/donnees/articles">Articles</NavLink>
                <NavLink to="/admin/donnees/personnages">Personnages</NavLink>
                <NavLink to="/admin/donnees/categories">Catégories</NavLink>
            </nav>
            <Outlet />
        </main>
    );
}

export default Datas;
