import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { fetchCategories } from "../../../services/api";

function Categories() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchAndSetCategories() {
            try {
                const res = await fetchCategories();
                setCategories(res);
            } catch (error) {
                console.log(error);
            }
        }

        fetchAndSetCategories();
    }, []);

    async function handleDelete(e, id) {
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/admin/category/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                navigate("/admin/donnees/categories");
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (!categories.length) return <p>Chargement des catégories...</p>;

    return (
        <section>
            <h2>Catégories</h2>

            <h3>Liste</h3>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Label</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.label}</td>
                            <td>
                                <Link
                                    to={`/admin/donnees/categories/modifier/${category.id}`}
                                >
                                    Modifier
                                </Link>
                            </td>
                            <td>
                                <button
                                    onClick={(e) =>
                                        handleDelete(e, category.id)
                                    }
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link to="/admin/donnees/categories/ajouter">
                Ajouter une catégorie
            </Link>
        </section>
    );
}

export default Categories;
