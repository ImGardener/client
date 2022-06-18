import "./App.css";
import { Switch, Route } from "react-router-dom";
import Search from "./pages/Search";
import Layout from "./component/UI/Layout/Layout";

import { Provider } from "react-redux";
import store from "./store/index";
import Main from "./pages/Main";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route path="/">
              <Main />
            </Route>
            <Route path="/serach">
              <Search></Search>
            </Route>
          </Switch>
        </Layout>
      </Provider>
    </div>
  );
}

export default App;
