import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import "./Navigation.css";
const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropDownOpen, setdropDown] = useState(false);
  const [showSidebar, setshowSidebar] = useState(false);

  const toggleDropdown = () => {
    setdropDown(!dropDownOpen);
  };
  const toggleSidebar = () => {
    setshowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setshowSidebar(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLoginMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black  w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={20} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>
        </Link>{" "}
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={20} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
        </Link>{" "}
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={20} />
          <span className="hidden nav-item-name mt-[3rem]">CART</span>
        </Link>{" "}
        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2 mt-[3rem]" size={20} />
          <span className="hidden nav-item-name mt-[3rem]">FAVORITE</span>
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.userInfo}</span>
          ) : (
            <></>
          )}
        </button>
      </div>
      <ul>
        <li>
          <Link
            to="/login"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineLogin className="mr-2 mt-[3rem]" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">LOGIN</span>
          </Link>
          <Link
            to="/register"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={20} />
            <span className="hidden nav-item-name mt-[3rem]">REGISTER</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
