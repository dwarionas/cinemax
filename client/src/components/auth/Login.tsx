import React from 'react'
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { setUser, setIsLogged } from "../../redux/slices/authSlice";
import { useLazyQuery } from '@apollo/client';
import checkUser from '../../graphql/queries/auth/CheckUser.graphql';
import login from '../../graphql/queries/auth/Login.graphql';

const Login: React.FC = ({ }) => {
    const dispatch = useAppDispatch();
    const { isLogged, user } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [fetchUser] = useLazyQuery(checkUser);
    const [fetchLoginData] = useLazyQuery(login);

    React.useEffect(() => {
        if (window.localStorage.getItem('isLogged') && window.localStorage.getItem('token')) {
            dispatch(setIsLogged(true));
            fetchUser({
                variables: { id: window.localStorage.getItem('token') }
            }).then(({ data }) => {
                if (data.checkUser.idError) {
                    console.log('auth error')
                } else {
                    dispatch(setUser(data.checkUser))
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
        }).then(({ data }) => {
            if (data.login.emailError) {
                console.log('User doesn`t exist')
            } else if (data.login.passwordError) {
                console.log('Invalid password')
            } else {
                console.log('Success')
                dispatch(setIsLogged(true));
                window.localStorage.setItem('isLogged', 'true')
                window.localStorage.setItem('token', data.login.id)
                dispatch(setUser(data.login))
            }

            setPassword('');
            setEmail('');
        })
    }

    return (
        <div className="form-container sign-in-container">
            <form action="#">
                <h1>Sign in</h1>
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
                <button onClick={(e) => loginUser(e)}>Sign In</button>
            </form>
        </div>
    )
}

export default Login