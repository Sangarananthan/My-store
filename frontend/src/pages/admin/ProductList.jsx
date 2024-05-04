import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useListCategoryQuery } from "../../redux/api/categorySlice";
import { toast } from "react-toastify";
import Admin_Menu from "./Admin_Menu";

const ProductList = () => {
  const [image, setimage] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [quantity, setquantity] = useState("");
  const [brand, setbrand] = useState("");
  const [countInStock, setcountInStock] = useState(0);
  const [imageUrl, setimageUrl] = useState("");
  const navigate = useNavigate();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useListCategoryQuery();

  const uploadFilehandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log(res);
      toast.success(res.message);
      setimage(res.image);
      setimageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", countInStock);
      const { data } = await createProduct(productData);
      console.log(data);
      if (data.error) {
        toast.error("Product create failed");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex fle-col md:flex-row">
        <Admin_Menu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product Image"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}
          <div className="mb-3">
            <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload image"}{" "}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFilehandler}
                className={image ? "hidden" : "text-black rounded bg-gray-200"}
              ></input>
            </label>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  className="p-3 mb-3 w-[30rem] border rounded-lg"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                ></input>
              </div>{" "}
              <div className="two ml-10">
                <label htmlFor="name block">Price</label>
                <br />
                <input
                  type="number"
                  className="p-3 mb-3 w-[30rem] border rounded-lg"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                ></input>
              </div>{" "}
              <div className="two">
                <label htmlFor="name block">Quantity</label>
                <br />
                <input
                  type="number"
                  className="p-3 mb-3 w-[30rem] border rounded-lg"
                  value={quantity}
                  onChange={(e) => setquantity(e.target.value)}
                ></input>
              </div>
              <div className="two ml-10">
                <label htmlFor="name block">Brand</label>
                <br />
                <input
                  type="text"
                  className="p-3 mb-3 w-[30rem] border rounded-lg"
                  value={brand}
                  onChange={(e) => setbrand(e.target.value)}
                ></input>
              </div>
            </div>

            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 border rounded-lg w-[95%]"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count In Stock</label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={countInStock}
                  onChange={(e) => setcountInStock(e.target.value)}
                ></input>
              </div>
              <div>
                <label>Category</label>
                <br />
                <select
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  onChange={(e) => setcategory(e.target.value)}
                >
                  <option value="" disabled defaultValue>
                    Choose Category
                  </option>
                  {categories &&
                    categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-2 px-4 bg-pink-500 rounded-lg text-white font-bold"
            >
              Submit{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
