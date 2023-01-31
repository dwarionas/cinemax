import React from 'react'
import '../../styles/auth.scss'
import { useAppDispatch } from "../../redux/store";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { useLazyQuery } from '@apollo/client';
import getAllUsers from '../../graphql/queries/auth/GetAllUsers.graphql';
import { setAuthModalActive, setIsLogged } from "../../redux/slices/authSlice";

import Login from './Login';
import Registration from './Registration';

const AuthModal: React.FC = ({ }) => {
    const dispatch = useAppDispatch();

    const [isRightPanelActive, setIsRightPanelActive] = React.useState(false);

    const [fetchAllUsers, allUsersData] = useLazyQuery(getAllUsers);

    const logout = () => {
        if (window.localStorage.getItem('isLogged') && window.localStorage.getItem('token')) {
            window.localStorage.removeItem('isLogged');
            window.localStorage.removeItem('token');
            dispatch(setIsLogged(false));
        } else {
            console.log('not auth')
        }
    }

    return (
        <div className={'auth'} onClick={() => dispatch(setAuthModalActive(false))}>
            <div className={'auth__content'} onClick={e => e.stopPropagation()}>
                <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
                    <Login />
                    <Registration />

                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id="signIn" onClick={() => setIsRightPanelActive(false)}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id="signUp" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthModal;