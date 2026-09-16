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

const displayProducts = async (category) => {
  const products = await getProductsByCategory(category);
  const result = products.products.map((product) => {
    return `
      <div class="product-card">
        <h3>${product.title}</h3>
        <span>${product.price}</span>
        <span>${product.rating}</span>
        <span>${product.thumbnail}</span>
      </div>
    `;
  });
  document.getElementById("products").innerHTML = result.join("");
}

// Call displayProducts when a category is clicked
document.getElementById("hero").addEventListener("click", (e) => {
  if (e.target.classList.contains("category-card")) {
    const category = e.target.getAttribute("data-category");
    displayProducts(category);
  }
});