import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorities = useSelector((state) => state.favorites);
  const favoriteCount = favorities.length;
  return (
    <div className="absolute top-11 left-3">
      {favoriteCount ? (
        <div className="rounded-full bg-pink-600 text-white w-[17px] h-[17px] flex items-center justify-center border-2 border-black">
          <p className="text-[10px] font-semibold">{favoriteCount}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FavoritesCount;
