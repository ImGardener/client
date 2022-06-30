import { Fragment, useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { searchThunk, getMoreSearchThunk } from "../../store/modules/plants";
import { resetPlants } from "../../store/actions/plants";
import LoadingSpinner from "../UI/Spinner/LoadingSpinner";
import SearchForm from "./SearchForm";
import PlantList from "../Plants/PlantList";
import useIntersectionObserver from "../../hoc/useIntersectionObserver";
import Modal from "../UI/Modal/Modal";
const SearchList = () => {
  const [modal, setModal] = useState(null);
  const currentPage = useRef(1);
  const currentParams = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const searchWord = location.state?.searchWord;
  const { plants, loading, totalCount, error } = useSelector((state) => ({
    ...state.plants,
  }));

  // first Load
  const submitFormHandler = useCallback(
    async (config) => {
      currentParams.current = config;
      currentPage.current = 1;
      dispatch(searchThunk({ ...currentParams.current, pageNo: 1 }));
    },
    [dispatch]
  );

  // incomming by searchMenu
  useEffect(() => {
    if (searchWord) {
      submitFormHandler({ svcCodeNm: searchWord });
    }
    return () => {
      dispatch(resetPlants());
    };
  }, [searchWord, dispatch, submitFormHandler, history]);

  // more Load
  const loadMoreData = useCallback(async () => {
    if (currentPage.current * 10 > totalCount) return;

    currentPage.current++;
    dispatch(
      getMoreSearchThunk({
        ...currentParams.current,
        pageNo: currentPage.current,
      })
    );
  }, [dispatch, totalCount]);

  // intersect callback
  const intersectionHandler = useCallback(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (!loading) await loadMoreData();
    },
    [loading, loadMoreData]
  );

  const { serRef } = useIntersectionObserver({ intersectionHandler });
  let content = <PlantList plants={plants} />;

  if (currentPage.current === 1 && loading) content = <LoadingSpinner />;
  if (error) return <PlantList error={error} />;
  return (
    <Fragment>
      <SearchForm onSubmit={submitFormHandler} />
      {content}
      {!loading && plants && plants.length > 0 && <div ref={serRef} />}
      {loading && currentPage.current > 1 && <LoadingSpinner />}
      {modal && (
        <Modal
          {...modal}
          onClose={
            modal?.callback ||
            (() => {
              setModal(null);
            })
          }
        />
      )}
    </Fragment>
  );
};
export default SearchList;
