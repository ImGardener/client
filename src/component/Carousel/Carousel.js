import { Fragment, useState } from "react";

import classes from "./Carousel.module.css";
import plant from "../../assets/sample_plants.jpg";

import Sliders from "./Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
const TOTAL_SLIDER = 3;
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

  const imgs = [plant, plant, plant];
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
          className={classes["slider__btn--left"]}
          onClick={previousSlide}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        </button>
        <button className={classes["slider__btn--right"]} onClick={nextSlide}>
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </button>
      </div>
    </Fragment>
  );
};
export default Carousel;
