import PropTypes from "prop-types";

function Card({ character }) {
    return (
        <article>
            <h2>Présentation de {character.main_title}</h2>
            <p>{character.sub_title}</p>
            <p>{character.description}</p>
            <img
                src={import.meta.env.VITE_API_URL + "/img/" + character.src}
                alt={character.alt}
            />
            <ul>
                {character.categories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
        </article>
    );
}
Card.propTypes = {
    character: PropTypes.shape({
        main_title: PropTypes.string.isRequired,
        sub_title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default Card;
