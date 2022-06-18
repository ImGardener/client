import { Fragment, useState } from "react";
import SearchForm from "../component/Search/SearchForm";
import SearchList from "../component/Search/SearchList";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const searchHandler = (searchData) => {
    setSearchResult(searchData);
  };
  return (
    <Fragment>
      <SearchForm onSearch={searchHandler} />
      <SearchList plants={searchResult} />
    </Fragment>
  );
};
export default Search;
