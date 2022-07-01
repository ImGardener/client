import React, { useCallback } from "react";
import classes from "./FlowerOfDay.module.css";
import { useEffect } from "react";
import { getTodayFlower } from "../../utils/flower-apis";
import { useState } from "react";
import LoadingSpinner from "../UI/Spinner/LoadingSpinner";
import useHttp from "../../hoc/use-https";
import default_img from "../../assets/default-flower.webp";
import default_img_png from "../../assets/default-flower.png";

const FlowerOfDay = () => {
  const { requestHandler, error, status, data } = useHttp();
  const [flowerInfo, setFlowerInfo] = useState({
    name: "거베라",
    img: "",
  });
  const getFlowerOfDay = useCallback(async () => {
    await requestHandler(getTodayFlower);
  }, [requestHandler]);

  useEffect(() => {
    getFlowerOfDay();
  }, [getFlowerOfDay]);
  useEffect(() => {
    if (status === "SUCCESS" && data) {
      setFlowerInfo(data);
    } else if (error) {
      setFlowerInfo({
        name: "데이지",
        img: default_img,
      });
    }
  }, [status, error, data]);

  if (status === "PENDING") return <LoadingSpinner />;
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
        onError={(e) => {
          console.log("err");
          e.target.src = default_img_png;
          e.target.onerror = null;
        }}
        alt="오늘의 꽃"
      />
    </div>
  );
};
export default React.memo(FlowerOfDay);
