// Add product from local storage
export const addfavoriteFromLocalStorage = (product) => {
  const favorites = getFavoriteProductsFormLocalStorage();
  if (!favorites.some((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

// remove product from local storage
export const removefavoriteFromLocalStorage = (product) => {
  const favorites = getFavoriteProductsFormLocalStorage();
  const updatedfavorites = favorites.filter((p) => p._id !== product._id);
  localStorage.setItem("favorites", JSON.stringify(updatedfavorites));
};

// retrieve products from local storage
export const getFavoriteProductsFormLocalStorage = () => {
  const favoritesJSON = localStorage.getItem("favorites");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};
