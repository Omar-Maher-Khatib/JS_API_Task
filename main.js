const getCategoriesList = async () => {
  const categoriesList = await axios.get("https://dummyjson.com/products/category-list");
  return categoriesList.data;
};

const displayCategories = async () => {
  const categories = await getCategoriesList();
  const result = categories.map((category) => {
    return `
      <li class="category-list">
        <a href="#" class="category-card" data-category="${category}">${category}</a>
      </li>
    `;
  }); 
  document.getElementById("hero").innerHTML = result.join("");
 }

 displayCategories();

const getProductsByCategory = async (category) => {
  const products = await axios.get(`https://dummyjson.com/products/category/${category}`);
  return products.data;
}
