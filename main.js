const getCategoriesList = async () => {
  const categoriesList = await axios.get("https://dummyjson.com/products/category-list");
  return categoriesList.data;
};

console.log(getCategoriesList());
