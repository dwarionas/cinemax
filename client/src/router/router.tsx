import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Home from '../components/home/Home';
import Profile from '../components/profile/Profile';
import Search from "../components/search/Search";
import Single from '../components/single/Single';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <>Error</>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'search',
                element: <Search />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: '/:type/:id',
                element: <Single />
            }
        ],
    },
]);

export default router;
