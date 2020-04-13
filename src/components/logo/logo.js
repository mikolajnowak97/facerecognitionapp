import React from 'react';
import Tilt from 'react-tilt';
import logo from './artificial-intelligence.png';
import './logo.css'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 45 }} style={{ height: 150, width: 150 }}>
                <div className="Tilt-inner pa3" ><img alt='logo' width="128" height="128" src={logo}/></div>
            </Tilt>
        </div>
    )
};
export default Logo;