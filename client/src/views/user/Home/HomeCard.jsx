import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function HomeCard({ article }) {
    const date = new Date(article.publication_date);
    const dateTime = date.toISOString();
    const dayDate = date.toLocaleDateString();

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;

    return (
        <>
            <article>
                <h2>
                    <Link
                       to={`article/${article.id_article}`}
                        title={`Vers l'article complet sur ${article.title}`}
                    >
                        {article.title}
                    </Link>
                </h2>
                <p>
                    <span>{article.main_title}</span>
                    <span>
                        Le{" "}
                        <time dateTime={dateTime}>
                            {dayDate} à {time}
                        </time>
                    </span>
                </p>
                <Link
                    to={`article/${article.id_article}`}
                    title={`Vers l'article complet sur ${article.title}`}
                >
                    <img
                        src={`http://localhost:9000/img/${article.src}`}
                        alt={article.alt}
                    />
                </Link>
                <p>{article.content.substring(0, 100)}...</p>
            </article>
            <hr />
        </>
    );
}

HomeCard.propTypes = {
    article: PropTypes.shape({
        id_article: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        main_title: PropTypes.string.isRequired,
        publication_date: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    }),
};

export default HomeCard;
