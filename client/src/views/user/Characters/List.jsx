import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import useCloseMenuOnMount from "../../../hooks/useCloseMenuOnMount";
import HandleListOptions from "./Components/HandleListOptions";

import { fetchCategories } from "../../../services/api";

import TableLine from "./Components/TableLine";
import useFetchCharacters from "../../../hooks/useFetchCharacters";

function CharactersList() {
    useFetchCharacters();
    useCloseMenuOnMount();

    const { list } = useSelector((state) => state.character);
    const [newList, setNewList] = useState(list);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setNewList(list);
    }, [list]);

    useEffect(() => {
        async function getCategories() {
            try {
                const response = await fetchCategories();
                if (response) setCategories(response);
            } catch (error) {
                console.error('Un problème est survenue, veuillez rafraîchir la page', error);
            }
        }
        getCategories();
    }, []);

    return (
        <main id="list">
            <HandleListOptions
                categories={categories}
                list={list}
                newList={newList}
                setNewList={setNewList}
            />
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Catégories</th>
                        <th>Plus d&apos;infos</th>
                    </tr>
                </thead>
                <tbody>
                    {newList.map((character) => (
                        <TableLine key={character.id} character={character} />
                    ))}
                </tbody>
            </table>
        </main>
    );
}

export default CharactersList;
