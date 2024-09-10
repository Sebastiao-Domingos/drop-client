"use client";

import React, { HTMLAttributes, useState } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Item from "./Item";
import Indicator from "./Indicator";
import NextPreviousButtons from "./NextPreviousButtons";
import { twMerge } from "tailwind-merge";

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  autoplay?: boolean;
}

const CarouselContext = React.createContext({
  nextSlide: () => {},

  previousSlide: () => {},

  totalImages: 0,

  visibleImage: 0,

  changeVisibleImageTo: (index: number) => {},
});

function Carousel({
  children,
  className = "",
  autoplay = true,
  ...others
}: CarouselProps) {
  const [visibleImage, setVisibleImage] = useState(0);
  const [sliderStarted, setSliderStarted] = useState(false);
  const [isAutoplay] = useState(autoplay);
  let timeout: ReturnType<typeof setTimeout>;

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      breakpoints: {
        "": {},
      },
    },

    [
      // add plugins here
      (slider) => {
        let mouseOver = false;
        function clearNextTimeout() {
          if (!isAutoplay) return;
          clearTimeout(timeout);
        }
        function nextTimeout() {
          if (!isAutoplay) return;

          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 4000);
        }
        slider.on("created", () => {
          setSliderStarted(true);
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
        slider.on("slideChanged", (slider) => {
          setVisibleImage(slider.track.details.rel);
        });
      },
    ]
  );

  return (
    <CarouselContext.Provider
      value={{
        changeVisibleImageTo: (index) => {
          clearTimeout(timeout);

          instanceRef.current?.moveToIdx(index);
          setVisibleImage(index);
        },
        nextSlide: () => instanceRef.current?.next(),
        visibleImage,
        previousSlide: () => instanceRef.current?.prev(),
        totalImages: !sliderStarted
          ? 0
          : instanceRef.current?.track.details.slidesLength!,
      }}
    >
      <div
        ref={sliderRef}
        className={twMerge("keen-slider", className)}
        {...others}
      >
        {/* Certifique-se de remover estes items e passá-los onde for necessário o slide */}
        {/* <Item
          src="https://www.castroelectronica.pt/Imgs/articles/article_81856/Regresso-as-Aulas-23-slider_desktop.jpg"
          alt="teste"
        />
        <Item
          src="https://www.castroelectronica.pt/Imgs/articles/article_81083/08-23_Youin_slide_desktop3611x900.png"
          alt="teste"
        />
        <Item
          src="https://www.castroelectronica.pt/Imgs/articles/article_80234/Instalacao-LG-slider-desktop.jpg"
          alt="teste"
        /> */}
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export { Item, Indicator, NextPreviousButtons, CarouselContext };
export default Carousel;
