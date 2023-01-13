import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './styles/index.scss'

import {RouterProvider} from "react-router-dom";
import router from "./router/router";
import {Provider} from "react-redux";
import store from "./redux/store";

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<Provider store={store}>
            <ApolloProvider client={client}>
                <RouterProvider router={router}/>
            </ApolloProvider>
        </Provider>
);