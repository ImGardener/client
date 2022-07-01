import React, { Suspense, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Layout from "./component/UI/Layout/Layout";
import Main from "./pages/Main";
import { loginSuccess } from "./store/modules/auth";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary";
import { getAuth } from "firebase/auth";
import LoadingSpinner from "./component/UI/Spinner/LoadingSpinner";
const Join = React.lazy(() => import("./pages/Join"));
const Login = React.lazy(() => import("./pages/Login"));
const Search = React.lazy(() => import("./pages/Search"));
const MyCollections = React.lazy(() => import("./pages/MyCollections"));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // page refresh시 auth 정보 가져오기
    getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        // 비동기로 token 정보를 가져와서 로그인
        const token = await user.getIdToken();
        dispatch(loginSuccess(token));
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      <Layout>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Switch>
              <Route path="/" exact>
                <Main />
              </Route>
              <Route path="/search" exact>
                <Search />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/join" exact>
                <Join />
              </Route>
              <Route path="/mycollection" exact>
                <MyCollections />
              </Route>
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </div>
  );
}

export default App;
