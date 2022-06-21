import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./SearchForm.module.css";
import SelectBox from "../UI/SelectBox/SelectBox";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getCategoryList, getInsttList } from "../../utils/search-apis";
import { searchThunk } from "../../store/modules/search";

const SearchForm = () => {
  const [insttList, setInsttList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [instt, setInstt] = useState("");
  const [category, setCategory] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    Promise.all([getInsttList(), getCategoryList()])
      .then(([reponse1, reponse2]) => {
        setInsttList(reponse1);
        setCategoryList(reponse2);
      })
      .catch((e) => {
        // 오류처리하기
        alert(e);
      });
  }, []);

  useEffect(() => {
    if (location.state?.searchWord) {
      searchPlants(location.state?.searchWord);
    }
  }, [location.state]);

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

    await searchPlants(searchWord);
  };
  const searchPlants = async (word) => {
    const config = {
      insttName: instt,
      category,
      svcCodeNm: word,
    };
    dispatch(searchThunk(config));
  };

  return (
    <div className={classes["search-form__container"]}>
      <form
        className={classes["search__form"]}
        onSubmit={submitSearchFormHandler}
      >
        <Input
          input={{
            type: "text",
            name: "search",
            placeholder: "품종명",
          }}
          onChange={searchWordChangeHandler}
          inputClassName={classes["search__search"]}
          icon={faSearch}
        />

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
        <Button className={classes["search__controls"]}>Search</Button>
      </form>
    </div>
  );
};
export default SearchForm;
