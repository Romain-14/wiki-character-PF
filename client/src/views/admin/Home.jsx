import { useEffect, useState } from "react";

import useCloseMenuOnMount from "../../hooks/useCloseMenuOnMount";

function Home() {
	useCloseMenuOnMount();
	const [stats, setStats] = useState(null);

    useEffect(() => {
        document.title = "Panneau d'administration";
        async function fetchStats() {
            try {
                const response = await fetch("/api/v1/admin/stats");
                if (response.ok) {
                    const {stats} = await response.json();
					setStats(stats)
                } else
                    console.log(
                        "Erreur lors de la récupération des statistiques"
                    );
            } catch (error) {
                console.log(error);
            }
        }
        fetchStats();
    }, []);

    return (
        <>
            <main id="admin">
                <h1>panneau d&apos;administration soon</h1>
				{
					stats ? (
						<>
							<p>Nombre de personnages : {stats.nombre_de_personnages}</p>
							<p>Nombre de catégories : {stats.nombre_de_catégories}</p>
							<p>Nombre d&apos;articles : {stats.nombre_d_articles}</p>
							<p>Nombre d&apos;utilisateurs : {stats.nombre_d_utilisateurs}</p>
						</>
					) : (
						<p>Chargement des statistiques...</p>
					)
				}
            </main>
        </>
    );
}

export default Home;
