const Modal = ({ isOpen, onClose, title = "modal", children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-full max-w-3xl mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-2xl outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
            <h3 className="text-3xl font-semibold">{title}</h3>

            <button className="mt-4  btn-secondary" onClick={onClose}>
              X
            </button>
          </div>
          <div className="relative p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
