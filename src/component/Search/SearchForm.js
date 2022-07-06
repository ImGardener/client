import React, { useCallback, useEffect, useState } from "react";
import classes from "./SearchForm.module.css";
import SelectBox from "../UI/SelectBox/SelectBox";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getCategoryList, getInsttList } from "../../utils/search-apis";
import useModal from "../../hooks/use-modal";
const SearchForm = (props) => {
  const [insttList, setInsttList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [instt, setInstt] = useState("");
  const [category, setCategory] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const { openModal } = useModal();
  useEffect(() => {
    Promise.all([getInsttList(), getCategoryList()])
      .then(([reponse1, reponse2]) => {
        setInsttList(reponse1);
        setCategoryList(reponse2);
      })
      .catch((e) => {
        return openModal(e.message);
      });
  }, []);

  const insttChangeHandler = useCallback((event) => {
    setInstt(event.target.value);
  }, []);

  const categoryChangeHandler = useCallback((event) => {
    setCategory(event.target.value);
  }, []);
  const searchWordChangeHandler = (event) => {
    setSearchWord(event.target.value);
  };
  const submitSearchFormHandler = async (e) => {
    e.preventDefault();

    if (searchWord.trim() === "") {
      return openModal("검색어를 입력하세요.");
    }
    const config = {
      insttName: instt,
      category,
      svcCodeNm: searchWord.trim(),
    };
    props.onSubmit(config);
  };

  return (
    <>
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
    </>
  );
};
export default React.memo(SearchForm);
