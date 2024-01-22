import { useState, useEffect } from 'react';

export default function usePagination(initialMin, initialMax, nbrElementToDisplay) {
    const [min, setMin] = useState(initialMin);
    const [max, setMax] = useState(initialMax);
    const [paginationClicked, setPaginationClicked] = useState(false);

    useEffect(() => {
        if (paginationClicked) {
            window.scrollTo({ top: 120, left: 0, behavior: "smooth" });
            setPaginationClicked(false);
        }
    }, [paginationClicked]);

    const handlePageChange = (direction) => {
        const offset = direction * nbrElementToDisplay;
        setMin(min + offset);
        setMax(max + offset);
        setPaginationClicked(true);
    };

    return { min, max, handlePageChange };
}