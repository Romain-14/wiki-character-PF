import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateCategory() {
    const { id }   = useParams();
    const navigate = useNavigate();
    
    const [category, setCategory] = useState("");

    useEffect(() => {
        async function getCategory() {
            try {
                const response = await fetch(`/api/v1/admin/category/${id}`);
                if (response.ok) {
                    const category = await response.json();
                    setCategory(category.label);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getCategory();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/admin/category/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ label: category }),
            });
            if (response.ok) {
                navigate("/admin/donnees/categories");
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (!category) return <p>Chargement des données ...</p>;

    return (
        <form onSubmit={handleSubmit}>
            
            <legend>Modifier la catégorie</legend>
            <div>
                <label htmlFor="label">Label</label>
                <input
                    type="text"
                    name="label"
                    id="label"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <button type="submit">Modifier</button>
        </form>
    );
}

export default UpdateCategory;
