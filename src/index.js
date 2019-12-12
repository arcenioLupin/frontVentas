import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import * as serviceWorker from "./serviceWorker";
import "core-js/fn/string/starts-with";
import "./stylesheets/dev/styles.css";
import Header from "./components/Header";
import Login from './pages/Login';
import UnAuthorized from "./pages/Error/Unauthorized";
import Principal from './pages/Principal';
import Prueba from './pages/Prueba';
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div className="sidnew">
        <Header />
        <Switch>        
          <Route {...Principal.route} exact />
          <Route {...Prueba.route} exact />
          <Route path='/login' component={Login} />
          <Route path="/401" component={UnAuthorized} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
