const ErrorModal = ({ message, onClose }) => {
  return (
    <div
      id="errorBox"
      className="fixed inset-0 z-50 w-full overflow-y-auto bg-opacity-50 bg-black "
    >
      <div className="flex h-full items-end justify-center p-4 text-center items-center sm:p-0">
        <div className="w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h4 classNameName="text-lg font-bold mb-4" id="modal-title">
                  Error
                </h4>
                <div className="mt-2">
                  <p id="modal-msg">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 flex sm:justify-end justify-center sm:px-6">
            <button id="modal-btn" onClick={onClose}>
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
