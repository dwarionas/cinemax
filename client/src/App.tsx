import React from 'react';
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import './styles/app.scss'

import NavAside from "./components/NavAside";
import AuthModal from "./components/auth/AuthModal";

const App: React.FC = () => {
    const { isAuthModalActive } = useSelector((state: RootState) => state.auth);

    return (
        <div className={'app'} >
            <NavAside/>

            <main className={'app__content'}>
                <Outlet/>
                {isAuthModalActive ? <AuthModal/> : null}
            </main>
        </div>
    );
};

export default App;