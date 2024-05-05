import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addTofavorite,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

import {
  addfavoriteFromLocalStorage,
  removefavoriteFromLocalStorage,
  getFavoriteProductsFormLocalStorage,
} from "../../utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoriteProductsFormLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const tooglefavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removefavoriteFromLocalStorage(product);
    } else {
      dispatch(addTofavorite(product));
      addfavoriteFromLocalStorage(product);
    }
  };
  return (
    <div
      onClick={tooglefavorite}
      className="absolute top-2 right-5 cursor-pointer"
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500 " />
      ) : (
        <FaRegHeart className="text-black" />
      )}
    </div>
  );
};

export default HeartIcon;
