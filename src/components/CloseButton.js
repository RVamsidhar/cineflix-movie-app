import React from "react";
import closeIcon from "../assets/close.svg";

export const CloseButton = ({ setIsModelPopupOpen }) => {
  return (
    <button
      className="p-2 hover:cursor-pointer hover:rounded-full hover:bg-gray-500/50"
      onClick={() => {
        setIsModelPopupOpen(false);
        document.body.style.overflow = "unset";
      }}
    >
      <img src={closeIcon} alt="Close Button" width="30" height="30" />
    </button>
  );
};
