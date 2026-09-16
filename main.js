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

/////////////////////////////////////////////////////////////////////////////

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
      <a href="./products_details.html?id=${product.id}" class="product-card">
        <img src="${product.thumbnail}" alt="${product.title}" />
        <div class="product-info">
          <h3>${product.title}</h3>
          <div class="product-details">
            <span>Price: $${product.price}</span>
            <span>Rating: ${product.rating}</span>
          </div>
        </div>
      </a>
    `;
  });
  const productsContainer = document.getElementById("products");
  if (productsContainer) productsContainer.innerHTML = result.join("");
}

const productsContainer = document.getElementById("products");
if (productsContainer) {
  const category = new URLSearchParams(window.location.search).get("category");
  if (category) displayProducts(category);
}

if (document.getElementById("hero")) {
  displayCategories();
}

/////////////////////////////////////////////////////////////////////////////////

//get product details by product id from API
const getProductDetails = async (productId) => {
  const product = await axios.get(`https://dummyjson.com/products/${productId}`);
  return product.data;
}

//display product details in the products_details.html page
const productDetailsContainer = document.getElementById("product-details");
if (productDetailsContainer) {
  const productId = new URLSearchParams(window.location.search).get("id");
  if (productId) {
    getProductDetails(productId).then((product) => {
      const reviews = product.reviews.slice(0, 2).map((review) => `
        <article class="review">
          <strong>${review.reviewerName}</strong>
          <span>Rating: ${review.rating}/5</span>
          <p>${review.comment}</p>
        </article>
      `).join("");

      productDetailsContainer.innerHTML = `
        <div class="products-details">
          <img src="${product.thumbnail}" alt="${product.title}" />
          <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <span>Stock: ${product.stock}</span>
            <div class="reviews">
              <h4>Reviews</h4>
              ${reviews}
            </div>
          </div>
        </div>
      `;
    });
  }
}
