import FlowerOfDay from "../component/FlowerOfDay/FlowerOfDay";
import Carousel from "../component/Carousel/Carousel";
import { Fragment } from "react";
const Main = () => {
  return (
    <Fragment>
      <Carousel />
      <FlowerOfDay />
      <div className="bar-image" />
    </Fragment>
  );
};
export default Main;
