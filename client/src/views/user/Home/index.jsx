import { useSelector } from "react-redux";

import Card from "./HomeCard";
import useCloseMenuOnMount from "../../../hooks/useCloseMenuOnMount";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../Components/Pagination";
import useFetchArticles from "../../../hooks/useFetchArticles";

function Home() {
    useFetchArticles();
    useCloseMenuOnMount();
    const { list } = useSelector((state) => state.article);

    const nbrElementToDisplay = 5;
    const { min, max, handlePageChange } = usePagination( 0, 5, nbrElementToDisplay);

    const paginationProps = {
        nbrElementToDisplay,
        datas: list,
        min,
        max,
        handlePageChange,
    };

    return (
        <main id="home">
            <div>
                {list.map((article, index) => {
                    return (
                        index >= min &&
                        index < max && (
                            <Card key={article.id_article} article={article} />
                        )
                    );
                })}

                <Pagination {...paginationProps} />
            </div>
        </main>
    );
}

export default Home;
