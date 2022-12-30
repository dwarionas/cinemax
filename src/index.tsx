import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.scss'

import {RouterProvider} from "react-router-dom";
import router from "./router/router";
import {Provider} from "react-redux";
import store from "./redux/store";



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);