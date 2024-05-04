import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useListCategoryQuery,
  useRemoveCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/api/categorySlice";
import CategoryForm from "./CategoryForm";
import Modal from "../../components/Modal";
import Admin_Menu from "./Admin_Menu";
const CategoryList = () => {
  const { data: categories } = useListCategoryQuery();
  const [name, setname] = useState("");
  const [selectedCategory, setselectedCategory] = useState("");
  const [updateName, setupdateName] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useRemoveCategoryMutation();

  useEffect(() => {}, [categories]);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name required");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setname("");
        toast.success(`${result.name} is created`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed");
    }
  };
  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    try {
      const result = await deleteCategory({
        categoryId: selectedCategory._id,
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Deleted succesfully`);
        setselectedCategory("");
        setmodalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating Deletion failed");
    }
  };
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updateName) {
      toast.error("Category name required");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updateName },
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is created`);
        setselectedCategory("");
        setupdateName("");
        setmodalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating Updating failed");
    }
  };
  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <Admin_Menu />
      <div className="md:w-3/4 p-3">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setname}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500
           hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 
           focus:ring-opacity-50"
                onClick={() => {
                  {
                    setmodalVisible(true),
                      setselectedCategory(category),
                      setupdateName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} isClose={() => setmodalVisible(false)}>
          <CategoryForm
            value={updateName}
            setValue={(value) => setupdateName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          ></CategoryForm>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
