import React from 'react';

import Infobar from '../Infobar';
import ItemsContainer from '../ItemsContainer';

const GameContainer = () => {
    return (
        <div className="game-container">
            <Infobar />
            <ItemsContainer />
        </div>
    );
}

export default GameContainer;