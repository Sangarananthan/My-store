import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Favorites = () => {
  const favoriteitems = useSelector(selectFavoriteProduct);
  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        FAVORITE PRODUCT
      </h1>
      <div>
        {favoriteitems.length > 0 ? (
          <div>
            {favoriteitems.map((product) => (
              <Product product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-row mt-[2rem] ml-[3rem]">
            <p className="mr-[2rem]">Add items to Favorite</p>
            <div>
              <Link
                to={"/"}
                className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem] text-white"
              >
                EXPLORE
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
