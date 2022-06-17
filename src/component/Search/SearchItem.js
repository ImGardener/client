import classes from "./SearchItem.module.css";
import plant from "../../assets/sample_plants.jpg";
const Search = () => {
  return (
    <li className={classes["plant"]}>
      <img className={classes["image"]} src={plant} alt="식물이미지" />
      <div className={classes["plant__desc"]}>
        <h3>양배추</h3>
        <p>
          조생종, 남부평야지 조기재배용, 내도복성, 내수발아성 ㅇ
          도열병․흰잎마름병(K1-K3)․줄무늬잎마름병 강 ㅇ 도정특성(백미완전미율,
          완전미도정수율) 우수 ㅇ 용도 : 밥쌀용
        </p>
        <ul className={classes["plant__properties"]}>
          <li className={classes["plant__property"]}>#정화식물</li>
        </ul>
      </div>
    </li>
  );
};
export default Search;
