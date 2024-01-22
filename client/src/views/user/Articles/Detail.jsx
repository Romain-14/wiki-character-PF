import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import useFetchArticles from "../../../hooks/useFetchArticles";
import useFetchCharacters from "../../../hooks/useFetchCharacters";

function ArticleDetail() {
    useFetchArticles();
    useFetchCharacters();
    
    const { id } = useParams();
    const { list: listArticles }   = useSelector((state) => state.article);
    const { list: listCharacters } = useSelector((state) => state.character);
    
    const article = listArticles.find(
        (article) => article.id_article === parseInt(id)
    );

    let character = {};
    if(article) {
        character = listCharacters.find(
            (character) => character.id === article.id
        );
    }

    if (article && character) {
        return (
            <main id="detail">
                <Link
                to="/"
                title="Retourner à la liste des articles"
                className="back-link"
            >
                <FontAwesomeIcon icon={faArrowLeft} /> Retour aux articles
            </Link>
                    {article && (
                        <article>
                            <h2>{article.title}</h2>

                            <img
                                src={`http://localhost:9000/img/${article.src}`}
                                alt={article.name}
                            />
                            <p>{article.content}</p>

                            <p>Voici l&apos;histoire de {article.main_title}</p>
                            <p>{character.description}</p>
                            <p>Catégories :</p>
                            <ul>
                                {article.categories.map((category, index) => {
                                    return <li key={index}>{category}</li>;
                                })}
                            </ul>
                        </article>
                    )}
            </main>
        );
    }
}

export default ArticleDetail;
