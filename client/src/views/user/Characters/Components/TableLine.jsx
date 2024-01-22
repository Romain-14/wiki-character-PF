import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function TableLine({ character }) {
    return (
        <tr key={character.id}>
            <td>{character.main_title}</td>
            <td>
                {character.categories.join(" / ")}
            </td>
            <td>
                <Link to={`${character.id}`}>Voir plus</Link>
            </td>
        </tr>
    );
}

TableLine.propTypes = {
    character: PropTypes.object.isRequired,
};

export default TableLine;
