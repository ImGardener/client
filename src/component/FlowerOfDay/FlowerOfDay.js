import classes from "./FlowerOfDay.module.css";
import { useEffect } from "react";
import { getTodayFlower } from "../../utils/flower-apis";
import { useState } from "react";

const FlowerOfDay = (props) => {
  const [flowerInfo, setFlowerInfo] = useState({
    name: "거베라",
    img: "",
  });

  useEffect(() => {
    getFlowerOfDay();
  }, []);

  const getFlowerOfDay = async () => {
    try {
      const result = await getTodayFlower();
      setFlowerInfo(result);
    } catch (error) {
      setFlowerInfo({
        name: "거베라",
        img: "http://www.nongsaro.go.kr/portal/imgView.do?ep=a5gb/CMEYLclIUPoWw9/DTnomi9S/YDfHD2ofIDhNOqPWPXCk6r5f9/5EwSYQ8lvB@14eQKulp3yt2AmBvaAPM3fCBe83GYJtr@G9Xgc/x4!",
      });
    }
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
