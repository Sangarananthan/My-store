import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
const Smallproduct = ({ product }) => {
  return (
    <div className="w-[20rem] m-[2rem] p-3 bg-gray-200 ">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-[200px] rounded" // Added margin bottom to create space between image and h2
        />
        <HeartIcon product={product}></HeartIcon>
        <div className="p-2">
          {" "}
          {/* Adjusted padding */}
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center h-[20px] overflow-hidden w-[200px]">
              <div className="self-baseline">{product.name}</div>
              <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                {product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Smallproduct;
