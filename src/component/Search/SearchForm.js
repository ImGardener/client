import classes from "./SearchForm.module.css";
import SelectBox from "../UI/SelectBox/SelectBox";
import Button from "../UI/Button/Button";
import SearchInput from "../UI/Input/SearchInput";
import {
  getCategoryList,
  getInsttList,
  getVarietyList,
} from "../../utils/search-apis";
import useHttp from "../../hoc/use-https";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../store/modules/status";

const SearchForm = (props) => {
  const { requestHandler, error, status } = useHttp();
  const [insttList, setInsttList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [instt, setInstt] = useState("");
  const [category, setCategory] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([
      requestHandler(getInsttList),
      requestHandler(getCategoryList),
    ]).then(([reponse1, reponse2]) => {
      setInsttList(reponse1);
      setCategoryList(reponse2);
    });
  }, [requestHandler]);

  const insttChangeHandler = (event) => {
    setInstt(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
  };
  const searchWordChangeHandler = (event) => {
    setSearchWord(event.target.value);
  };
  const submitSearchFormHandler = async (e) => {
    e.preventDefault();
    if (searchWord.trim() === "") return alert("검색어를 입력하세요!");
    dispatch(changeStatus("PENDING"));

    const config = {
      insttName: instt,
      category,
      svcCodeNm: searchWord,
    };

    const result = await requestHandler(getVarietyList, config);

    dispatch(changeStatus(status, error || null));

    props.onSearch(result);
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
          onChange={searchWordChangeHandler}
        />
        {/* <div className={classes["filter__container"]}> */}
        <SelectBox
          className={classes["filter"]}
          options={insttList}
          onChange={insttChangeHandler}
          placeholder="기관"
        />
        <SelectBox
          className={classes["filter"]}
          options={categoryList}
          onChange={categoryChangeHandler}
          placeholder="카테고리"
        />
        {/* </div> */}
        <Button className={classes["search__controls"]}>Search</Button>
      </form>
    </div>
  );
};
export default SearchForm;
