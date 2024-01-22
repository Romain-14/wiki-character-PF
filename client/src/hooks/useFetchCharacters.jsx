import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../store/slices/character";

function useFetchCharacters() {
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector((state) => state.character);

    useEffect(() => {
        if(list.length) return;
        dispatch(fetchCharacters());
    }, [dispatch, list.length]);
    
    if (loading) {
        return <p>Chargement...</p>;
    }
    if (error) {
        return <p>Une erreur est survenue</p>;
    }

}

export default useFetchCharacters;
