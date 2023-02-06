import React from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Aside: React.FC = () => {
    const { isLogged, user } = useSelector((state: RootState) => state.auth);

    return (
        <aside className={'app__aside'}>
            <section className={'aside'}>
                {isLogged ? <>
                    <div>Auth: {isLogged ? user.email : 'Not auth'}  </div>
                    <div>isLogged: {String(isLogged)}</div>
                </> : <>Please, auth</>}
            </section>
        </aside>
    )
}

export default Aside