import React from 'react';
import { Outlet } from "react-router";

import './styles/app.scss'
import NavAside from "./components/NavAside";

const App: React.FC = () => {
    return (
        <div className={'app'}>
            <NavAside/>

            <main className={'app__content'}>
                <Outlet/>
            </main>
        </div>
    );
};

export default App;