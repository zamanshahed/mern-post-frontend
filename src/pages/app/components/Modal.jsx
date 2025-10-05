import React, { useCallback, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import useGeneralStore from "../../../store/generalStore";

/**
 * Reusable Modal Component
 * * @param {object} props
 * @param {boolean} props.showModal - State to control modal visibility.
 * @param {function} props.setShowModal - Function to close the modal.
 * @param {React.ReactNode} props.children - Content to be displayed inside the modal body.
 * @param {string} props.title - Title for the modal header.
 * @returns {JSX.Element | null}
 */
const Modal = ({
  showModal,
  setShowModal,
  children,
  confirmBtnTitle = "Confirm",
  confirmBtnOnClick = () => {},
  title = "Modal Title",
  hideFooter = false,
}) => {
  const { isLoading } = useGeneralStore();
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  // Effect to handle body scroll locking when modal is open
  useEffect(() => {
    if (showModal) {
      // Prevent body scrolling
      document.body.style.overflow = "hidden";

      // Add event listener for Escape key to close the modal
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          closeModal();
        }
      };
      window.addEventListener("keydown", handleEscape);

      return () => {
        // Cleanup: restore body scroll and remove event listener
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEscape);
      };
    }

    // Ensure scroll is restored when component unmounts or state changes
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showModal, closeModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur">
      <div
        className="fixed inset-0 bg-gray-900 transition-all duration-500 ease-in-out"
        style={{ opacity: showModal ? 0.7 : 0 }}
        onClick={closeModal}
      />

      <div
        className={`
                    bg-white rounded-xl shadow-2xl relative w-full
                    max-w-lg mx-auto transform transition-all duration-300 ease-in-out
                    ${showModal ? "scale-100 opacity-100" : "scale-90 opacity-0"}
                `}
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h3 id="modal-title" className="text-xl font-bold truncate">
            {title}
          </h3>
          <button
            onClick={closeModal}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close modal"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto max-h-[70vh]">{children}</div>

        {/* Footer (Optional) */}
        {!hideFooter && (
          <div className="p-4 flex justify-end gap-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                confirmBtnOnClick();
              }}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Loading..." : confirmBtnTitle}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
