import React from "react";
import { MoviePopupCard } from "./MoviePopupCard";

export const ModelOverlay = ({ movie, setIsModelPopupOpen }) => {
  const closeModalPopup = () => {
    setIsModelPopupOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div
      className="fixed left-0 top-0 h-full w-full bg-black bg-opacity-70"
      onClick={closeModalPopup}
    >
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex h-[50vh] min-h-max w-[50vw] min-w-[750px] rounded-xl border-[1px] border-[#808080]/40 bg-black shadow-lg">
          <MoviePopupCard
            movie={movie}
            setIsModelPopupOpen={setIsModelPopupOpen}
          />
        </div>
      </div>
    </div>
  );
};
