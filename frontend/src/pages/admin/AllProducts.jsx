import { Link } from "react-router-dom";
import moment from "moment";
import Admin_Menu from "./Admin_Menu";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import { FaRupeeSign } from "react-icons/fa";
const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error Loading Products</div>;
  }
  return (
    <div className="container mx-[9rem]">
      <div className="flex md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12">
            All products({products.length})
          </div>
          <div className="flex flex-wrap justify-center items-center">
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className=" overflow-hidden bg-slate-200 rounded-lg m-2 p-2 flex flex-row"
              >
                <div className="flex flex-col justify-between">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[10rem] object-cover rounded-lg h-[10rem]"
                  />
                  <Link
                    to={`/admin/product/update/${product._id}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center bg-pink-600 text-white rounded-lg hover:bg-pink-500 focus:ring-2 focus:outline:none focus:ring-pink-300 dark:bg-pink-600 dark:hover-bg-pink-700 dark:focus:ring-pink-800 my-2"
                  >
                    <p className="text-center">Update product</p>
                  </Link>
                </div>
                <div className="flex p-4 flex-col justify-around">
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="font-semibold w-[20rem] mb-1 h-[4.8rem] overflow-hidden">
                      {product && product.name}
                    </h5>
                    <div className="flex flex-col items-center w-[8rem]">
                      <p className="text-gray-400 mx-4 text-sm font-semibold">
                        {moment(product.createAt).format("MMM Do YYYY")}
                      </p>
                      <div className="flex items-center bg-white px-3 py-1 rounded-lg my-2 justify-around">
                        <FaRupeeSign />
                        {product?.price}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm xl-w-[35rem] md:w-[20rem] sm-w-[10rem] mb-4 h-[5rem] overflow-hidden">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:w-1/4 p-3 mt-2">
          <Admin_Menu />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
