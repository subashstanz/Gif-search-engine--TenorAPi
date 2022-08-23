import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { generatePath, useNavigate } from "react-router-dom";
import { trendingSearchI } from "./trendingSearch";

type ImageSliderI = {
  slides: trendingSearchI[];
  loading: boolean;
};

const ImageSlider = (props: ImageSliderI) => {
  const { slides, loading } = props;
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  const onSelectImage = (value: string) => {
    navigate(generatePath("/search/:title", { title: value }));
  };

  return (
    <section className="flex w-full">
      <div className="flex items-center cursor-pointer">
        <FaArrowAltCircleLeft className="" onClick={prevSlide} />
      </div>

      {slides?.map((slide: any, index: number) => {
        return (
          <div className={"flex"} key={index}>
            {index === current && (
              <div className="flex">
                {slide.map((image: { url: string; title: string }) => {
                  return (
                    <div>
                      {loading ? (
                        <div className="w-[12.875rem] h-[5.625rem] bg-gray-100 rounded-tr rounded-tl animate-pulse"></div>
                      ) : (
                        <img
                          src={image.url}
                          alt={image.title}
                          className="object-cover cursor-pointer w-[12.875rem] h-[5.625rem] m-2 rounded-md"
                          onClick={() => onSelectImage(image.title)}
                        />
                      )}
                      <span className="font-semibold">{image.title}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      <div className="flex items-center cursor-pointer">
        <FaArrowAltCircleRight
          className="cursor-pointer "
          onClick={nextSlide}
        />
      </div>
    </section>
  );
};

export default React.memo(ImageSlider);
