import React, {Component} from 'react';

import Infobar from '../Infobar';
import ItemsContainer from '../ItemsContainer';

class GameContainer extends Component {
    render() {
        return (
            <div className="game-container">
                <Infobar />
                <ItemsContainer />
            </div>
        );
    }
}

export default GameContainer;