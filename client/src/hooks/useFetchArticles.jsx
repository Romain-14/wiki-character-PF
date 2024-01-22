import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../store/slices/article";

function useFetchArticles() {
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector((state) => state.article);

    useEffect(() => {
        if (list.length) return;
        dispatch(fetchArticles());
    }, [dispatch, list]);

    if (loading) {
        return <p>Chargement...</p>;
    }
    if (error) {
        return <p>Une erreur est survenue</p>;
    }
}

export default useFetchArticles;
