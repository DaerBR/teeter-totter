import React from 'react';

import Platform from '../Platform';
import './style.css';

const Seesaw = () => {
    return (
        <div className="seesaw-wrapper">
            <Platform />
            <div className="base" />
        </div>
    );
}

export default Seesaw;