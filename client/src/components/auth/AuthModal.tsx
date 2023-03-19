import React from 'react'
// import '../../styles/auth.scss'
import { useAppDispatch } from "../../redux/store";

import { useLazyQuery } from '@apollo/client';
import getAllUsers from '../../graphql/queries/auth/GetAllUsers.graphql';
import { setAuthModalActive, setIsLogged } from "../../redux/slices/authSlice";

import Login from './Login';
import Registration from './Registration';

const AuthModal: React.FC = ({ }) => {
    const dispatch = useAppDispatch();

    const [isRightPanelActive, setIsRightPanelActive] = React.useState(false);

    const [fetchAllUsers, allUsersData] = useLazyQuery(getAllUsers);

    return (
        <div className={'auth'} onClick={() => dispatch(setAuthModalActive(false))}>
            <div className={'auth__content'} onClick={e => e.stopPropagation()}>
                <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
                    <Login />
                    <Registration />

                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className={'auth__label'}>Welcome Back!</h1>
                                <p className='p'>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id="signIn" onClick={() => setIsRightPanelActive(false)}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className={'auth__label'}>Hello, Friend!</h1>
                                <p className='p'>Enter your personal details and start journey with us</p>
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