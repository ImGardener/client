import { Fragment } from "react";
import SearchForm from "../component/Search/SearchForm";
import SearchList from "../component/Search/SearchList";

const SEARCH = [
  {
    name: "apple",
    description: "test~~~~~",
    kind: "some",
    other: "some",
    id: 5,
  },
  {
    name: "apple",
    description: "test~~~~~",
    kind: "some",
    other: "some",
    id: 11,
  },
  {
    name: "apple",
    description: "test~~~~~",
    kind: "some",
    other: "some",
    id: 43,
  },
];
const Search = () => {
  return (
    <Fragment>
      <SearchForm />
      <SearchList plants={[]} />
    </Fragment>
  );
};
export default Search;
