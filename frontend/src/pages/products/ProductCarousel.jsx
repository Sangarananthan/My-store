import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Messages from "../../components/Messages";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1, // Corrected property name
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 xl:block  lg:block md:block">
      {isLoading ? null : error ? (
        <Messages variant="danger">
          {error?.data?.message || error.error}
        </Messages>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-[40rem] rounded-lg object-cover h-[40rem]"
                />
                <div className="flex justify-between w-[20rem]">
                  <div className="one">
                    <h2>{name.substring(0, 50)}..</h2>
                    <p className="font-bold">${price}</p>
                    <br />
                    <p className="w-[25rem]">
                      {description.substring(0, 170)}...
                    </p>
                  </div>
                  <div className="flex justify-between w-[20rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaStore className="text-black"></FaStore>
                        Brand:{brand}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaClock className="text-black"></FaClock>
                        Added:{moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaStar className="text-black"></FaStar>
                        Reviews:{numReviews}
                      </h1>
                    </div>
                    <div className="two">
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaStar></FaStar>
                        Ratings:{Math.round(rating)}
                      </h1>{" "}
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaShoppingCart></FaShoppingCart>
                        Quantity:{quantity}
                      </h1>{" "}
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaBox></FaBox>
                        In Stock:{countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
