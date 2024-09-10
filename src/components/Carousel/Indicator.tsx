import { useContext } from "react";
import { CarouselContext } from ".";

interface IndiatorProps {
  // visibleImage: number;
  // setVisibleImage: (imgIndex: number) => void;
  // totalImage: number;
}

function Indicator({}: // setVisibleImage,
// totalImage,
// visibleImage,
IndiatorProps) {
  const { changeVisibleImageTo, totalImages, visibleImage } =
    useContext(CarouselContext);

  return (
    <div className="absolute bottom-0 left-0 right-0 text-center mb-3 space-x-2">
      {Array(totalImages)
        .fill("")
        .map((_, idx) => (
          <button
            key={idx}
            className={`${
              idx === visibleImage ? "bg-blue-500" : "bg-white"
            } py-[2px] px-4 rounded-full shadow`}
            onClick={() => changeVisibleImageTo(idx)}
          ></button>
        ))}
    </div>
  );
}

export default Indicator;
