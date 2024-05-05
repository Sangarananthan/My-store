import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "./api/productApiSlice";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Messages from "../components/Messages";
import Product from "../pages/products/Product";
const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="ml-[5rem]">
      <>HOME</>
      {!keyword ? <Header></Header> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Messages variant={"error"}>
          {isError?.data.message || isError.error}
        </Messages>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>
            <Link
              to={"/shop"}
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem] text-white"
            >
              Shop
            </Link>
          </div>
          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product}></Product>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
