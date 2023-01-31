import React from 'react'
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { setUser, setIsLogged } from "../../redux/slices/authSlice";
import { useMutation } from '@apollo/client';
import { setAuthModalActive } from '../../redux/slices/authSlice';
import createUser from '../../graphql/mutations/auth/Registration.graphql';

const Registration: React.FC = ({ }) => {
    const dispatch = useAppDispatch();
    const { isLogged, user } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [emailError, setEmailError] = React.useState<boolean>(false);
    const [passwordError, setPasswordError] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>('');

    const [register] = useMutation(createUser);

    const addUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        register({
            variables: {
                input: {
                    email,
                    password
                }
            }
        }).then(({ data }) => {
            if (data.createUser.emailError) {
                setEmailError(true)
                setMessage('User already exist, choose other email')
                setTimeout(() => setEmailError(false), 1_000)
            } else {
                console.log('Success')
                dispatch(setIsLogged(true));
                window.localStorage.setItem('isLogged', 'true')
                window.localStorage.setItem('token', data.createUser.id)
                dispatch(setUser(data.createUser))
                dispatch(setAuthModalActive(false))
            }


            setPassword('');
            setEmail('');
        })
    }

    return (
        <div className="form-container sign-up-container">
            <form className='auth__form'>
                <h1 className={'auth__label'}>Create Account</h1>
                <input
                    className={emailError ? "input__error" : undefined}
                    onChange={e => setEmail(e.target.value)}
                    value={emailError ? message : email}
                    type="text"
                    placeholder='email'
                />
                <input
                    className={'auth__content-item-input'}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder='password'
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder='password'
                />
                <button onClick={(e) => addUser(e)}>Sign Up</button>
            </form>
        </div>
    )
}

export default Registration