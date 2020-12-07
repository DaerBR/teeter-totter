import React, {Component} from 'react';
import { connect } from 'react-redux';

import Item from '../Item';
import './style.css';

class Platform extends Component {
    render() {
        let weightClass = '';

        if (this.props.weightLeft > this.props.weightRight) {
            weightClass = 'lean-left';
        } else if (this.props.weightLeft < this.props.weightRight) {
            weightClass = 'lean-right';
        }

        return (
            <div className={`platform-body ${weightClass}`}>
                <div className="leftSide">
                    {
                        this.props.leftItems.map((item, index) => {
                            return <Item type="left" className={`item item-${item.form} color-${item.color}`} key={index} weight={item.weight} bottom="10" offset={item.offset}/>
                        })
                    }
                </div>
                <div className="rightSide">
                    {
                        this.props.rightItems.map((item, index) => {
                            return <Item type="right" className={`item item-${item.form} color-${item.color}`} key={index} weight={item.weight} bottom="10" offset={item.offset}/>
                        })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rightItems: state.gameState.rightItems,
        leftItems: state.gameState.leftItems,
        weightLeft: state.gameState.weightLeft,
        weightRight: state.gameState.weightRight
    }
}
export default connect(mapStateToProps)(Platform);