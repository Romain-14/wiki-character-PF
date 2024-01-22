import PropTypes from "prop-types";

function HandleListOptions({ categories, list, newList, setNewList }) {

    function handleFilter(e) {
        if (e.target.value === "all") return setNewList(list);
        setNewList(
            list.filter((character) =>
                character.categories.includes(e.target.value)
            )
        );
    }

    function handleSort(e) {
        if (e.target.value === "default") return;
        setNewList(
            [...newList].sort((a, b) =>
                e.target.value === "asc"
                    ? a.main_title.localeCompare(b.main_title)
                    : b.main_title.localeCompare(a.main_title)
            )
        );
    }

    return (
        <div>
            <select name="filter" id="filter" onChange={handleFilter}>
                <option value="all">Tous</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.label}>
                        {category.label}
                    </option>
                ))}
            </select>
            
            <select name="sort" id="sort" onChange={handleSort}>
                <option value="default">Trier</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>
        </div>
    );
}

HandleListOptions.propTypes = {
    categories: PropTypes.array.isRequired,
    list: PropTypes.array.isRequired,
    newList: PropTypes.array.isRequired,
    setNewList: PropTypes.func.isRequired,
};

export default HandleListOptions;
