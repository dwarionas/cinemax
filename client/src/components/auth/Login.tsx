import React from 'react'
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { setAuthModalActive, setUser, setIsLogged } from "../../redux/slices/authSlice";
import { useLazyQuery } from '@apollo/client';
import login from '../../graphql/queries/auth/Login.graphql';

const Login: React.FC = ({ }) => {
    const dispatch = useAppDispatch();

    const { isLogged, user } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [emailError, setEmailError] = React.useState<boolean>(false);
    const [passwordError, setPasswordError] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>('');

    const [fetchLoginData] = useLazyQuery(login);

    const loginUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        fetchLoginData({
            variables: {
                email,
                password
            }
        }).then(({ data }) => {
            if (data.login.emailError) {
                setEmailError(true);
                setMessage('User doesn`t exist');
                setTimeout(() => setEmailError(false), 1_000);
            } else if (data.login.passwordError) {
                setPasswordError(true);
                setMessage('Invalid password');
                setTimeout(() => setPasswordError(false), 1_000);
            } else {
                dispatch(setIsLogged(true));
                window.localStorage.setItem('isLogged', 'true');
                window.localStorage.setItem('token', data.login.id);
                dispatch(setUser(data.login));
                console.log(data.login)
                dispatch(setAuthModalActive(false));
            }

            setPassword('');
            setEmail('');
        })
    }

    return (
        <div className="form-container sign-in-container">
            <form className='auth__form'>
                <h1 className={'auth__label'}>Sign in</h1>
                <input
                    className={emailError ? "input__error" : undefined}
                    onChange={e => setEmail(e.target.value)}
                    value={emailError ? message : email}
                    type="text"
                    placeholder='email'
                />
                <input
                    className={passwordError ? "input__error" : undefined}
                    onChange={e => setPassword(e.target.value)}
                    value={passwordError ? message : password}
                    type={passwordError ? "text" : "password"}
                    placeholder='password'
                />
                <button onClick={(e) => loginUser(e)}>Sign In</button>
            </form>
        </div>
    )
}

export default Login