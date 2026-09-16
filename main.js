//get categories list from API
const getCategoriesList = async () => {
  const categoriesList = await axios.get("https://dummyjson.com/products/category-list");
  return categoriesList.data;
};

//display categories list in the hero section of categories.html page
const displayCategories = async () => {
  const categories = await getCategoriesList();
  const result = categories.map((category) => {
    return `
      <li class="category-list">
        <a href="./products.html?category=${encodeURIComponent(category)}" class="category-card">${category}</a>
      </li>
    `;
  }); 
  const hero = document.getElementById("hero");
  if (hero) hero.innerHTML = result.join("");
 }


 //get products by category from API
const getProductsByCategory = async (category) => {
  const products = await axios.get(`https://dummyjson.com/products/category/${category}`);
  return products.data;
}

//display products by category in the products.html page
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
  const productsContainer = document.getElementById("products");
  if (productsContainer) productsContainer.innerHTML = result.join("");
}

const hero = document.getElementById("hero");
if (hero) {
  displayCategories();
}

const productsContainer = document.getElementById("products");
if (productsContainer) {
  const category = new URLSearchParams(window.location.search).get("category");
  if (category) displayProducts(category);
}