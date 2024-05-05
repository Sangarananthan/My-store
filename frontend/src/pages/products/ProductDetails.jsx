import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Messages from "../../components/Messages";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaClock,
  FaHome,
  FaShoppingBag,
  FaStar,
  FaStore,
} from "react-icons/fa";
import Product from "./Product";
import HeartIcon from "./HeartIcon";
import moment from "moment";
import Ratings from "./Ratings";
import Producttabs from "./Producttabs";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [qty, setqty] = useState(1);
  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState(0);
  const {
    data: product,
    isLoading,
    isFetching,
    error,
  } = useGetProductDetailsQuery({
    productId,
  });
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: LoadingProdingReview }] =
    useCreateReviewMutation({ productId });
  return (
    <>
      <div className="flex ml-[5rem]">
        <Link
          to={"/"}
          className="bg-black font-bold rounded-full py-2 px-4  text-white"
        >
          Go back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Messages variant={"error"}>
          {error?.data?.message || error.message}
        </Messages>
      ) : (
        <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
          <div>
            <img
              src={product.image}
              alt=""
              className="w-full xl:w-[30rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]"
            />
            <HeartIcon product={product} />
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="text-2xl font-bold max-w-[40rem]">{product.name}</h2>
            <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0] max-w-[40rem]">
              {product.description}
            </p>
            <p className="text-5xl font-semibold mb-6">₹{product.price}</p>
            <hr />
            <div className="flex items-center justify-between w-[30rem] mt-2">
              <div className="one">
                <h1 className="flex items-center mb-6">
                  <FaStore className="text-black mr-2"></FaStore>
                  Brand: {product.brand}
                </h1>
                <h1 className="flex items-center mb-6 text-center">
                  <FaClock className="text-black mr-2"></FaClock>
                  Added: {moment(product.createdAt).fromNow()}
                </h1>
                <h1 className="flex items-center mb-6">
                  <FaStar className="text-black mr-2"></FaStar>
                  Reviews: {product.numReviews}
                </h1>
              </div>
              <div className="two ml-2">
                <h1 className="flex items-center mb-6">
                  <FaStar className="text-black mr-2"></FaStar>
                  Ratings: {product.rating}
                </h1>{" "}
                <h1 className="flex items-center mb-6">
                  <FaShoppingBag className="text-black mr-2"></FaShoppingBag>
                  Quantity: {product.quantity}
                </h1>{" "}
                <h1 className="flex items-center mb-6">
                  <FaBox className="text-black mr-2"></FaBox>
                  InStock: {product.countInStock}
                </h1>
              </div>
            </div>
            <div className="flex justify-between flex-wrap">
              <Ratings
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              {product.countInStock > 0 && (
                <div>
                  <select
                    value={qty}
                    onChange={(e) => setqty(e.target.value)}
                    className="p-2 w-[6rem] rounded-lg text-black"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="btn-container">
              <button
                // onClick={addToCarthandler}
                disabled={product.countInStock === 0}
                className="bg-pink-500 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
              >
                Add To Cart
              </button>
            </div>
          </div>
          <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
            <Producttabs />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
