import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Redux Store Creator Details Starts From Here;
import { createStore } from "redux";
import { Provider } from "react-redux";
import { RootReducer } from "./redux-reducer/reducer-action.js";

import CentralRoot from "./root-file.js";

const store = createStore(RootReducer);

ReactDOM.render(
  <Provider store={store}>
    <CentralRoot />
  </Provider>,
  document.getElementById('root')
);
