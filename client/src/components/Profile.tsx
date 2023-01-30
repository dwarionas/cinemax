import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

const Profile: React.FC = () => {
    const { isLogged, user } = useSelector((state: RootState) => state.auth);

    return (
        <div>
            {isLogged ? <>
                <div style={{color: 'white'}}>Auth: {isLogged ? user.email : 'Not auth'}  </div>
                <div style={{color: 'white'}}>isLogged: {String(isLogged)}</div>
            </> : <>Please, auth</>}
        </div>
    );
};

export default Profile;