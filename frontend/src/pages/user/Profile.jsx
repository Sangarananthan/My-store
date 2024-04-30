import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
const Profile = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const [password, setpassword] = useState("");
  const [confrimpassword, setconfrimpassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updatedProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setusername(userInfo.username);
    setemail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confrimpassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updatedProfile({
          _id: userInfo._id,
          username,
          email,
          password,
          oldPassword,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Updated Successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[5rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="w-[40rem]">
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Update profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full text-black border  bg-slate-200"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-sm w-full text-black border  bg-slate-200"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-pink-500 text-white font-semibold px-4  py-2 rounded mb-4"
            >
              {loadingUpdateProfile ? "Upadating.." : "Update"}
            </button>
            <hr />
            <h2 className="text-3lg font-semibold mb-4 mt-4 text-black">
              Change Password
            </h2>
            <div className="mb-4">
              <label className="block text-black mb-2">Current password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className="form-input p-4 rounded-sm w-full text-black border  bg-slate-200"
                value={oldPassword}
                onChange={(e) => setoldPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">New password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="form-input p-4 rounded-sm w-full text-black border  bg-slate-200"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">Confirm password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                className="form-input p-4 rounded-sm w-full text-black border bg-slate-200"
                value={confrimpassword}
                onChange={(e) => setconfrimpassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white font-semibold px-4  py-2 rounded"
              >
                {loadingUpdateProfile ? "Upadating.." : "Change"}
              </button>
              <Link
                to="users/orders"
                className="bg-pink-500 text-white font-semibold px-4  py-2 rounded"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
        {loadingUpdateProfile && <Loader></Loader>}
      </div>
    </div>
  );
};

export default Profile;
