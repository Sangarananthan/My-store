import { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Messages from "../../components/Messages";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/userApiSlice";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateuser] = useUpdateUserMutation();
  const [editableUserid, seteditableUserid] = useState(null);
  const [editableusername, seteditableusername] = useState("");
  const [editableUseremail, seteditableUseremail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  // DELETE USERS
  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(userId);
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  // UPDATE DETAILS
  const updatehandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await updateuser({
          userId: id,
          username: editableusername,
          email: editableUseremail,
        });
        seteditableUserid(null);
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  // EDIT INFO
  const toggleEdit = (userId, username, useremail) => {
    seteditableUserid(userId);
    seteditableusername(username);
    seteditableUseremail(useremail);
  };

  // JSX
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-7 text-center ">USERS</h1>
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Messages variant={"danger"}>
          {error?.data?.message || error.message}
        </Messages>
      ) : (
        <div className="flex flex-col md:flex-row">
          <table className="w-full md:w-4/5 mx-auto border">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border bg-slate-100">ID</th>
                <th className="px-4 py-2 text-left border bg-slate-100">
                  NAME
                </th>
                <th className="px-4 py-2 text-left border bg-slate-100">
                  EMAIL
                </th>
                <th className="px-4 py-2 text-left border bg-slate-100">
                  ADMIN
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 border">{user._id}</td>
                  <td className="px-4 py-2 border ">
                    {editableUserid === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableusername}
                          onChange={(e) => seteditableusername(e.target.value)}
                          className="w-full rounded-lg p-2 border"
                        ></input>
                        <button
                          onClick={() => updatehandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        {user.username}
                        {""}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]"></FaEdit>
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editableUserid === user._id ? (
                      <div className="flex items-center ">
                        <input
                          type="text"
                          value={editableUseremail}
                          onChange={(e) => seteditableUseremail(e.target.value)}
                          className="w-full rounded-lg p-2 border"
                        ></input>
                        <button
                          onClick={() => updatehandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        {user.email} {""}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-[1rem]"></FaEdit>
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-between">
                      {user.isAdmin ? (
                        <FaCheck className="text-green-600"></FaCheck>
                      ) : (
                        <FaTimes className="text-red-600"></FaTimes>
                      )}
                      {!user.isAdmin && (
                        <div className="flex">
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold rounded py-2 px-4"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
