import React from 'react'
import { useMutation, useLazyQuery } from '@apollo/client';
import createUser from '../mutations/user.graphql';
import getAllUsers from '../queries/auth/users.graphql';

const Auth: React.FC = () => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [refetchAll, data] = useLazyQuery(getAllUsers);
    const [newUser] = useMutation(createUser);

    React.useEffect(() => {
        refetchAll();
        console.log(data)
    }, []);

    const addUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        newUser({
            variables: {
                input: {
                    email,
                    password
                }
            }
        }).then(({data}) => {
            console.log(data);
            setPassword('');
            setEmail('');

            
        })
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

            <button>Login</button>
            <button onClick={(e) => addUser(e)}>Register</button>
        </div>
    )
}

export default Auth;