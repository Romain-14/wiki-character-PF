export default (datas, categories) => {
    const categoriesByCharacterId = categories.reduce(
        (acc, { characterId, label }) => {
            if (!acc[characterId]) {
                acc[characterId] = [];
            }
            acc[characterId].push(label);
            return acc;
        },
        {}
    );

    for (const data of datas) {
        data.categories = categoriesByCharacterId[data.id] || [];
    }
    
    return datas;
};
