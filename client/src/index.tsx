import React from 'react';
import ReactDOM from "react-dom/client";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { PersistGate } from 'redux-persist/integration/react'

import './styles/index.css'

import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";

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
            <PersistGate persistor={persistor} loading={null} >
                <RouterProvider router={router} />
            </PersistGate>
        </ApolloProvider>
    </Provider>
);