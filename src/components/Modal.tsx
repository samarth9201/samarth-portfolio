import { useTheme } from "@/context/ThemeContext";
import React, { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  const { colors } = useTheme();

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="rounded-lg shadow-lg p-6 relative overflow-auto"
        style={{
          backgroundColor: colors.nav_background,
          color: colors.text,
          maxHeight: "90vh",
          display: "inline-block",
          maxWidth: "90vw",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
