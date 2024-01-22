import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Card from "./Components/Card";
import useCloseMenuOnMount from "../../../hooks/useCloseMenuOnMount";

function Detail() {
    useCloseMenuOnMount();
    const { id } = useParams();
    const { list } = useSelector((state) => state.character);
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        if (!character) {
            setCharacter(list.find((character) => character.id === Number(id)));
        }
    }, [list]);

    return (
        <main id="detail">
            <Link
                to="/liste-des-personnages"
                title="Retourner à la liste des personnages"
                className="back-link"
            >
                <FontAwesomeIcon icon={faArrowLeft} /> Retour à la liste
            </Link>
            
            {character && <Card character={character} />}
        </main>
    );
}

export default Detail;
