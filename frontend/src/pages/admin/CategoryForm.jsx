const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="py-2 px-4 border rounded-lg w-full"
          placeholder="Category Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <div className="flex justify-between">
          <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg ">
            {" "}
            {buttonText}
          </button>
          {handleDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg "
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
