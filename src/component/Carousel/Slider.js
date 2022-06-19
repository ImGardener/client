import classes from "./Carousel.module.css";
import { Fragment } from "react";
const Sliders = (props) => {
  const slider = props.imgs.map((plant, i) => (
    <img
      key={i}
      className={classes["plant__image"]}
      src={plant}
      alt="식물이미지"
    />
  ));
  return <Fragment>{slider}</Fragment>;
};
export default Sliders;
