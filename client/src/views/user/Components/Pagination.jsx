import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Pagination({handlePageChange, min, max, nbrElementToDisplay, datas}) {
    
    return (
        <div className="pagination-ctn">
            {
                <button
                    onClick={() => handlePageChange(-1)}
                    disabled={min <= 0}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            }

            <p>{min / nbrElementToDisplay + 1}</p>
            {
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={max > datas.length}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            }
        </div>
    );
}

Pagination.propTypes = {
    handlePageChange: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    nbrElementToDisplay: PropTypes.number.isRequired,
    datas: PropTypes.array.isRequired,
};

export default Pagination;
