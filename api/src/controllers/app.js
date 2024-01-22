import Query from "../model/Query.js";
import charactersWithCategories from "../utils/charactersWithCategories.js";

const getAllArticles = async (req, res) => {
    try {
        const queryArticle = "SELECT articles.id AS id_article, characters.id AS id ,title, content, publication_date, users_id, main_title, src, alt, username FROM articles JOIN characters ON articles.characters_id = characters.id JOIN users ON articles.users_id = users.id JOIN pictures ON articles.characters_id = pictures.characters_id ORDER BY publication_date desc";
        const articles = await Query.run(queryArticle);
        const queryAllCategories =
            "SELECT characters.id AS characterId, label FROM categories JOIN characters_categories ON categories.id = characters_categories.categories_id JOIN characters ON characters.id = characters_categories.characters_id";
        const allCategories = await Query.run(queryAllCategories);
        
        const datas = charactersWithCategories(articles, allCategories);
        res.json(datas);

    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const query =
            "SELECT id, label FROM categories";
        const allCategories = await Query.run(query);
        
        res.json(allCategories);

    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const getAllCharacters = async (req, res) => {
    try {
        const queryCharactersInfo =
            "SELECT characters.*, src, alt FROM characters JOIN pictures ON characters.id = pictures.characters_id";
        const charactersInfo = await Query.run(queryCharactersInfo);

        const queryAllCategories =
            "SELECT characters.id as characterId, label FROM categories JOIN characters_categories ON categories.id = characters_categories.categories_id JOIN characters ON characters.id = characters_categories.characters_id";
        const allCategories = await Query.run(queryAllCategories);

        res.json(charactersWithCategories(charactersInfo, allCategories));
    } catch (error) {
        console.log(error);
    }
};

export { getAllArticles, getAllCategories, getAllCharacters };