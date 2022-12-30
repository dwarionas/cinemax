import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Home from '../components/home/Home';
import Profile from "../components/Profile";
import Settings from "../components/Settings";
import Recent from "../components/Recent";
import Search from "../components/Search";

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
                path: 'profile',
                element: <Profile/>,
            },
            {
                path: 'settings',
                element: <Settings/>
            },
            {
                path: 'recent',
                element: <Recent/>
            },
            {
                path: 'search',
                element: <Search/>
            },
            {
                path: 'logout',
                element: <>Logged Out</>
            }
        ],
    },
]);

export default router;
