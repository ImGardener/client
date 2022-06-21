import { Fragment } from "react";
import SearchForm from "../component/Search/SearchForm";
import SearchList from "../component/Search/SearchList";

const Search = () => {
  return (
    <Fragment>
      <SearchForm />
      <SearchList />
    </Fragment>
  );
};
export default Search;
