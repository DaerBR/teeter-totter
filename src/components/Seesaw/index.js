import React, {Component} from 'react';

import Platform from '../Platform';
import './style.css';

class Seesaw extends Component {
    render() {
        return (
            <div className="seesaw-wrapper">
                <Platform />
                <div className="base" />
            </div>
        );
    }
}

export default Seesaw;