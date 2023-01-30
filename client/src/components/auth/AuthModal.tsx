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

const AuthModal: React.FC = ({}) => {
    const dispatch = useAppDispatch();

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
                <Tabs>
                    <TabList className={'auth__content-tablist'}>
                        <Tab 
                            className={'auth__content-tablist-tab'} 
                            disabledClassName={'auth__content-tablist-tab-disabled'} 
                            selectedClassName={'auth__content-tablist-tab-selected'}>
                            <span>Login</span>
                        </Tab>
                        <Tab 
                            className={'auth__content-tablist-tab'} 
                            disabledClassName={'auth__content-tablist-tab-disabled'} 
                            selectedClassName={'auth__content-tablist-tab-selected'}>
                            <span>Registration</span>
                        </Tab>
                    </TabList>

                    <TabPanel 
                        className={'auth__content-tabpanel'} 
                        selectedClassName={'auth__content-tabpanel-selected'}>
                        <Login/>
                    </TabPanel>
                    <TabPanel 
                        className={'auth__content-tabpanel'} 
                        selectedClassName={'auth__content-tabpanel-selected'}>
                        <Registration/>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}

export default AuthModal;