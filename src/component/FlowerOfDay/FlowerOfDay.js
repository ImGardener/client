import classes from "./FlowerOfDay.module.css";
import { useEffect } from "react";
import { getTodayFlower } from "../../utils/flower-apis";
import { useState } from "react";
import { DATAGO_KEY } from "../../utils/key-store";

const FlowerOfDay = (props) => {
  const [flowerInfo, setFlowerInfo] = useState({
    name: "장미",
    img: "",
  });

  useEffect(() => {
    getFlowerOfDay();
  }, []);

  const getFlowerOfDay = async () => {
    const result = await getTodayFlower();
    setFlowerInfo(result);
  };
  return (
    <div className={classes["flower-of-day"]}>
      <div className={classes["flower"]}>
        <p className={classes["flower__rec"]}>
          오늘은 <br />
          <span className={classes["flower__name"]}>{flowerInfo?.name}</span>
          (이)가
          <br />
          잘어울리는 날이예요!
        </p>
        <p className={classes["flower__content"]}>{flowerInfo?.content}</p>
      </div>
      <img
        className={classes["flower__img"]}
        src={flowerInfo.img}
        alt="오늘의 꽃"
      />
    </div>
  );
};
export default FlowerOfDay;
