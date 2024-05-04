import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductbyIDQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useListCategoryQuery } from "../../redux/api/categorySlice";
import { toast } from "react-toastify";
import Admin_Menu from "./Admin_Menu";
const ProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductbyIDQuery(params.id);
  const [image, setimage] = useState(productData?.image || "");
  const [name, setname] = useState(productData?.name || "");
  const [description, setdescription] = useState(
    productData?.description || ""
  );
  const [quantity, setquantity] = useState(productData?.quantity || "");
  const [price, setprice] = useState(productData?.price || "");
  const [category, setcategory] = useState(productData?.category || "");
  const [brand, setbrand] = useState(productData?.brand || "");
  const [countInStock, setcountInStock] = useState(
    productData?.countInStock || 0
  );
  const navigate = useNavigate();
  const { data: categories = [] } = useListCategoryQuery();
  const [uploadProductimage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  useEffect(() => {
    if (productData && productData._id) {
      setname(productData.name);
      setdescription(productData.description);
      setimage(productData.image);
      setprice(productData.price);
      setcategory(productData.category);
      setbrand(productData.brand);
      setquantity(productData.quantity);
      setcountInStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFilehandler = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("image", e.target.files[0]);
    try {
      const res = await uploadProductimage(formdata).unwrap();
      toast.success(`${res.message}`);
      setimage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", countInStock);
      const { data } = await updateProduct({ productId: params.id, formData });
      console.log(data);
      if (data.error) {
        toast.error("Product update failed");
      } else {
        toast.success(`${data.name} is updated`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  const handleDelete = async () => {
    try {
      const { data } = await deleteProduct({ productId: params.id });
      toast.success(`${data.name}` + " Deleted Succesfully");
      navigate("/admin/allproductslist");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex xl:mx-20 sm:mx-[0] w-[90%] p-10 flex-col justify-start h-[100vh]">
      <div className="h-12 font-bold text-xl">UPDATE PRODUCT</div>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <Admin_Menu />
        <div className="flex flex-row justify-center">
          <div className="md:w-3/4 ">
            {image && (
              <div className="text-center">
                <img
                  src={image}
                  alt="product Image"
                  className="block mx-auto max-h-[500px] max-w-[300px]"
                />
              </div>
            )}
            <div>
              <label className="text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {image ? image.name : "Upload image"}{" "}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFilehandler}
                  className={
                    !image ? "hidden" : "text-black rounded bg-gray-200"
                  }
                ></input>
              </label>
            </div>
            <div className="flex flex-row justify-around m-2">
              <button
                onClick={handleSubmit}
                className="py-2 px-10 bg-green-500 rounded-lg text-white font-bold"
              >
                Update{" "}
              </button>
              <button
                onClick={handleDelete}
                className="py-2 px-10 bg-red-500 rounded-lg text-white font-bold"
              >
                Delete{" "}
              </button>
            </div>
          </div>
          <div className="p-3">
            <div className="flex flex-row w-full justify-between">
              <div>
                <div className="one m-2">
                  <label htmlFor="name">Name</label>
                  <br />
                  <input
                    type="text"
                    className="p-3 mb-3 w-[30rem] border rounded-lg"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  ></input>
                </div>{" "}
                <div className="two m-2">
                  <label htmlFor="name block">Price</label>
                  <br />
                  <input
                    type="number"
                    className="p-3 mb-3 w-[30rem] border rounded-lg"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                  ></input>
                </div>{" "}
                <div className="three m-2">
                  <label htmlFor="name block">Quantity</label>
                  <br />
                  <input
                    type="number"
                    className="p-3 mb-3 w-[30rem] border rounded-lg"
                    value={quantity}
                    onChange={(e) => setquantity(e.target.value)}
                  ></input>
                </div>
                <div className="two m-2">
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
              <div className="mx-2">
                <label htmlFor="" className="my-5">
                  Description
                </label>
                <textarea
                  type="text"
                  className="p-2 mb-3 border rounded-lg w-[500px] h-[90%]"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-around">
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
                  aria-placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  onChange={(e) => setcategory(e.target.value)}
                >
                  {categories &&
                    categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
