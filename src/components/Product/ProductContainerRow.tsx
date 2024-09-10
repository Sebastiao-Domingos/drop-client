import Slider, { Settings, CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProductContainerRowProps {
  children: React.ReactNode;
  settings?: Settings;
}

function ArrowPrevButton({ onClick }: CustomArrowProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden w-11 h-11 bg-primary/30 hover:bg-primary/60 transition-all rounded-full shadow z-10`}
    >
      <i className={"ri-arrow-left-s-line text-white"}></i>
    </button>
  );
}

function ArrowNextButton({ onClick }: CustomArrowProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden w-11 h-11 bg-primary/30 hover:bg-primary/60 transition-all rounded-full shadow z-10`}
    >
      <i className={"ri-arrow-right-s-line text-white"}></i>
    </button>
  );
}

function ProductContainerRow({
  children,
  settings = {},
}: ProductContainerRowProps) {
  const defaultSettings: Settings = {
    arrows: true,
    infinite: false,
    dots: true,
    slidesToShow: 7,
    slidesToScroll: 5,
    centerMode: false,
    prevArrow: <ArrowPrevButton />,
    nextArrow: <ArrowNextButton />,

    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1720,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1540,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 828,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="w-full relative">
      <Slider {...defaultSettings} {...settings}>
        {children}
      </Slider>
    </div>
  );
}

export default ProductContainerRow;
