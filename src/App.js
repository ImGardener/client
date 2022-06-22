import "./App.css";
import { Switch, Route } from "react-router-dom";
import Search from "./pages/Search";
import Layout from "./component/UI/Layout/Layout";

import Main from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { autoLoginThunk } from "./store/modules/auth";
import MyPlantList from "./component/Plants/MyPlantList";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLoginThunk());
  }, [dispatch]);
  return (
    <div className="App">
      <Layout>
        <ErrorBoundary>
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
            <Route path="/myPlants" exact>
              <MyPlantList />
            </Route>
          </Switch>
        </ErrorBoundary>
      </Layout>
    </div>
  );
}

export default App;
