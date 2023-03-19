import React from 'react';
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "./redux/store";
import { useLazyQuery } from '@apollo/client';
// import './styles/app.scss'

import checkUser from './graphql/queries/auth/CheckUser.graphql';
import { setUser, setIsLogged } from "./redux/slices/authSlice";

import NavAside from "./components/NavAside";
import AuthModal from "./components/auth/AuthModal";

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const { isAuthModalActive } = useSelector((state: RootState) => state.auth);

    const [fetchUser] = useLazyQuery(checkUser);

    React.useEffect(() => {
        if (window.localStorage.getItem('isLogged') && window.localStorage.getItem('token')) {
            dispatch(setIsLogged(true));
            fetchUser({
                variables: { id: window.localStorage.getItem('token') }
            }).then(({ data }) => {
                if (data.checkUser.idError) {
                    console.log('auth error')
                } else {
                    dispatch(setUser(data.checkUser));
                }
            })
            // console.log('user checked')
        }
    }, []);

    return (
        <div className={'app'} >
            <NavAside />

            <main className={'app__content'}>
                <Outlet />
                {isAuthModalActive ? <AuthModal /> : null}
            </main>
        </div>
    );
};

export default App;