import React from 'react';

import '../../styles/home.scss';
import NavHome from "./NavHome";
import HomeContent from "./HomeContent";

const Home: React.FC = () => {
    return (
        <div className={'home'}>
            <NavHome/>

            <HomeContent/>
        </div>
    );
};

export default Home;

// <iframe src='https://ashdi.vip/serial/274' width='700px' height='400px' style={{border: 0}} />