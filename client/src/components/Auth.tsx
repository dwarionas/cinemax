import React from 'react'
import { useMutation, useLazyQuery } from '@apollo/client';

import createUser from '../mutations/user.graphql';
import login from '../queries/auth/login.graphql';

import checkUser from '../queries/auth/user.graphql';
import getAllUsers from '../queries/auth/users.graphql';
import { IUser } from '../types';

const Auth: React.FC = () => {
    const [currentAccout, setCurrentAccout] = React.useState<IUser>({
        email: "",
        password: "",
        id: "",
        role: ""
    });
    const [isLogged, setIsLogged] = React.useState(false);
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [fetchUser, userData] = useLazyQuery(checkUser);
    const [fetchAllUsers, allUsersData] = useLazyQuery(getAllUsers);
    const [fetchLoginData, loginData] = useLazyQuery(login);
    const [register, registerData] = useMutation(createUser);

    React.useEffect(() => {
        if (window.localStorage.getItem('isLogged') && window.localStorage.getItem('token')) {
            setIsLogged(true);
            fetchUser({
                variables: {id: window.localStorage.getItem('token')}
            }).then(({data}) => {
                if (data.checkUser.idError) {
                    console.log('Login error')
                } else {
                    setCurrentAccout(data.checkUser)
                }
            })
        }
    }, []);

    const loginUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        fetchLoginData({
            variables: {
                email,
                password
            }
        }).then(({data}) =>{
            if (data.login.emailError) {
                console.log('User doesn`t exist')
            } else if (data.login.passwordError) {
                console.log('Invalid password')
            } else {
                console.log('Success')
                setIsLogged(true);
                window.localStorage.setItem('isLogged', 'true')
                window.localStorage.setItem('token', data.login.id)
                setCurrentAccout(data.login)
            }
            
            setPassword('');
            setEmail('');
        })
    }

    const addUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        register({
            variables: {
                input: {
                    email,
                    password
                }
            }
        }).then(({data}) => {
            if (data.createUser.emailError) {
                console.log('User already exist, choose other email')
            } else {
                console.log('Success')
                setIsLogged(true);
                window.localStorage.setItem('isLogged', 'true')
                window.localStorage.setItem('token', data.createUser.id)
                setCurrentAccout(data.createUser)
            }


            setPassword('');
            setEmail('');
        })
    }

    const logout = () => {
        if (window.localStorage.getItem('isLogged') && window.localStorage.getItem('token')) {
            window.localStorage.removeItem('isLogged');
            window.localStorage.removeItem('token');
            setIsLogged(false);
        } else {
            console.log('not auth')
        }
    }

    return (
        <div>
            <input 
                onChange={e => setEmail(e.target.value)} 
                value={email} 
                type="text" 
                placeholder='email' 
            />
            <input 
                onChange={e => setPassword(e.target.value)} 
                value={password} 
                type="password" 
                placeholder='password' 
            />

            <button onClick={(e) => loginUser(e)}>Login</button>
            <button onClick={(e) => addUser(e)}>Register</button>
            <button onClick={() => logout()}>Logout</button>

            <div style={{color: 'white'}}>Auth: {isLogged ? currentAccout.email : 'Not auth'}  </div>
            <div style={{color: 'white'}}>isLogged: {String(isLogged)}</div>
        </div>
    )
}

export default Auth;