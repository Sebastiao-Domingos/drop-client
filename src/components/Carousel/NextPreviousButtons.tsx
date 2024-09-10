import { useContext } from "react";
import { CarouselContext } from ".";

interface NextPreviousButtonsProps {
  // previousImage: () => void;
  // nextImage: () => void;
}

function NextPreviousButtons({}: // previousImage,
// nextImage,
NextPreviousButtonsProps) {
  const { previousSlide, nextSlide } = useContext(CarouselContext);

  return (
    <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
      <div className="flex justify-between items-center px-2">
        <button
          onClick={previousSlide}
          className="bg-white/30 py-1 px-4 rounded-full shadow"
        >
          <i className="ri-arrow-drop-left-line"></i>
        </button>

        <button
          onClick={nextSlide}
          className="bg-white/30 py-1 px-4 rounded-full shadow"
        >
          <i className="ri-arrow-drop-right-line"></i>
        </button>
      </div>
    </div>
  );
}

export default NextPreviousButtons;
