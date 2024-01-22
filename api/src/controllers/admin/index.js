import Query from "../../model/Query.js";

const getStats = async (req, res) => {
    try {
        const queryStats = `
        SELECT 
            (SELECT COUNT(*) FROM users) AS nombre_d_utilisateurs,
            (SELECT COUNT(*) FROM characters) AS nombre_de_personnages,
            (SELECT COUNT(*) FROM articles) AS nombre_d_articles,
            (SELECT COUNT(*) FROM categories) AS nombre_de_catégories
    `;

        const [stats] = await Query.run(queryStats);

        res.json({ stats });
    } catch (error) {
        console.log(error);
    }
};

// CATEGORIES
const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            SELECT *
            FROM categories
            WHERE id = ?
        `;
        const [category] = await Query.runWithParams(query, [id]);
        res.json(category);
    } catch (error) {
        console.log(error);
    }
};


const addCategory = async (req, res) => {
    try {
        const { label } = req.body;
        const query = `
            INSERT INTO categories (label)
            VALUES (?)
        `;
        const result = await Query.runWithParams(query, [label]);
        res.json({ id: result.insertId, label });
    } catch (error) {
        console.log(error);
    }
};

const updateCategory = async (req, res) => {
    try {
        const { label } = req.body;
        const { id } = req.params;
        const query = `
            UPDATE categories
            SET label = ?
            WHERE id = ?
        `;
        await Query.runWithParams(query, [label, id]);
        res.json({ id, label });
    } catch (error) {
        console.log(error);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            DELETE FROM categories
            WHERE id = ?
        `;
        await Query.runWithParams(query, [id]);
        res.json({ id });
    } catch (error) {
        console.log(error);
    }
};

export { getStats, getCategory, addCategory, updateCategory, deleteCategory };
