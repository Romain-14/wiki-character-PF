
const fetchCategories = async () => {
    const response = await fetch("/api/v1/app/category");    
    return await response.json();
    // OU en une seule ligne
    // return await (await fetch(BASE_URL + "/category")).json();    
}

export { fetchCategories };