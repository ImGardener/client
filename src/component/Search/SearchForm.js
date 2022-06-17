import classes from "./SearchForm.module.css";
import SelectBox from "../UI/SelectBox/SelectBox";
import Button from "../UI/Button/Button";
import SearchInput from "../UI/Input/SearchInput";
import { getInsttList } from "../../utils/plant-apis";
import useHttp from "../../hoc/use-https";
import { useState } from "react";
const OPTIONS = [
  { value: "apple", name: "사과" },
  { value: "banana", name: "바나나" },
  { value: "orange", name: "오렌지" },
];

const SearchForm = () => {
  const { requestHandler, error, status } = useHttp();
  const [insttList, setInsttList] = useState([]);
  const submitSearchFormHandler = async (e) => {
    e.preventDefault();
    let response = await requestHandler(getInsttList);
    const itemList = [];
    for (let item of response.items.item) {
      itemList.push({
        value: item.codeNm,
        name: item.codeNm,
        id: Math.random().toString(),
      });
    }
    setInsttList(itemList);
  };
  return (
    <div className={classes["search-form__container"]}>
      <form
        className={classes["search__form"]}
        onSubmit={submitSearchFormHandler}
      >
        <SearchInput
          className={classes["search__search"]}
          placeholder="품종명을 입력해주세요"
        />
        {/* <div className={classes["filter__container"]}> */}
        <SelectBox className={classes["filter"]} options={insttList} />
        <SelectBox className={classes["filter"]} options={OPTIONS} />
        <SelectBox className={classes["filter"]} options={OPTIONS} />
        {/* </div> */}
        <Button className={classes["search__controls"]}>Search</Button>
      </form>
    </div>
  );
};
export default SearchForm;
