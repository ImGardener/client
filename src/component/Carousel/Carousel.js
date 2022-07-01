import { Fragment, useState } from "react";

import classes from "./Carousel.module.css";
import carousel1 from "../../assets/carousel1.webp";
import carousel2 from "../../assets/carousel2.webp";

import Sliders from "./Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
const TOTAL_SLIDER = 2;
const Carousel = () => {
  const [currentSlider, setCurrentSlider] = useState(0);

  const nextSlide = () => {
    if (currentSlider + 1 >= TOTAL_SLIDER) {
      setCurrentSlider(0);
    } else {
      setCurrentSlider(currentSlider + 1);
    }
  };
  const previousSlide = () => {
    if (currentSlider === 0) {
      setCurrentSlider(TOTAL_SLIDER - 1);
    } else {
      setCurrentSlider(currentSlider - 1);
    }
  };

  const imgs = [carousel1, carousel2];
  return (
    <Fragment>
      <div className={classes["carousel"]}>
        <div
          className={classes["slider__container"]}
          style={{ transform: `translateX(-${currentSlider}00%)` }}
        >
          <Sliders imgs={imgs} />
        </div>
        <button
          aria-label="carousel-left-btn"
          className={classes["slider__btn--left"]}
          onClick={previousSlide}
        >
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <button
          aria-label="carousel-right-btn"
          className={classes["slider__btn--right"]}
          onClick={nextSlide}
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
    </Fragment>
  );
};
export default Carousel;
