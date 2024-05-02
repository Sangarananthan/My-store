const Modal = ({ isOpen, isClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute top-[40%] right-[50%] bg-white p-4 rounded-lg z-10 text-right">
            <button
              className="font-semibold text-black hover:bg-red-600 focus-outline-none mr-2 px-2 rounded-lg hover:text-red-50 items-center"
              onClick={isClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
