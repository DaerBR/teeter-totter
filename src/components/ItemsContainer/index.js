import React, {Component} from 'react';
import { createItem, updateGameStats, clearFlyingItem, gravity } from '../../store/actions';
import { connect } from 'react-redux';

import Seesaw from '../Seesaw';
import Item from '../Item';
import './style.css';

class ItemsContainer extends Component {
    state = { timeOut: null }

    componentDidUpdate() {
        if (this.props.isGameOn && !this.props.isGameOver) {
            this.gameCycle();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !(this.state.timeOut && (nextState.timeOut !== this.state.timeOut));
    }
    gameCycle() {
        const { leftItems, rightItems, weightLeft, weightRight, flyingItem } = this.props;

        if ((rightItems.length === leftItems.length) && !flyingItem) {
            this.props.createItem(this.generateRandomItemStats(), 'right');
            this.props.updateGameStats(leftItems, rightItems, weightLeft, weightRight);
        }

        if (rightItems.length > leftItems.length && !flyingItem) {
            const newStats = this.generateRandomItemStats();
            this.props.createItem(newStats, 'fly');
        }

        if (flyingItem) {
            let dropTimeout;
            if (flyingItem.bottom === 0) {
                if (rightItems.length !== leftItems.length) {
                    const newLeft = this.props.flyingItem;
                    newLeft.bottom = 0;
                    this.props.createItem(newLeft,'left');
                    this.props.updateGameStats(leftItems, rightItems, weightLeft, weightRight);
                }
                this.props.clearFlyingItem();
            } else {
                this.state.timeOut && clearTimeout(this.state.timeOut);
                dropTimeout = setTimeout(() => {
                    !this.props.isPaused && this.props.flyingItem && this.props.gravity();
                }, 1000);
                this.setState({timeOut: dropTimeout});
            }

        }
    }

    generateRandomItemStats() {
        const itemForms = ['square', 'triangle', 'circle'];
        const itemColors = ['orange', 'blue', 'green']

        const weight = Math.floor(Math.random() * 10) + 1;
        const form = itemForms[Math.floor(Math.random() * itemForms.length)];
        const color = itemColors[Math.floor(Math.random() * itemColors.length)];
        const size = weight * 5;
        const offset = Math.floor(Math.random() * 5) + 1;
        const bottom = 100;

        return {
            weight, form, color, size, offset, bottom
        }
    }


    render() {
        const { isGameOver, isPaused, flyingItem } = this.props;
        return (
            <div className="items-container">
                {(isGameOver && <div className="game-over-message">Alas, the game is over!</div>)}
                {(isPaused && <div className="game-paused-message">Game paused...</div>)}
                <div className="leftSide">
                    { flyingItem &&
                    <Item type="fly"
                          className={`item item-${flyingItem.form} color-${flyingItem.color}`}
                          weight={flyingItem.weight}
                          bottom={flyingItem.bottom}
                          offset={flyingItem.offset}/>
                    }
                </div>
                <Seesaw/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        weightLeft: state.gameState.weightLeft,
        weightRight: state.gameState.weightRight,
        leftItems: state.gameState.leftItems,
        rightItems: state.gameState.rightItems,
        flyingItem: state.gameState.flyingItem,
        bending: state.gameState.bending,
        isGameOn: state.gameState.isGameOn,
        isGameOver: state.gameState.isGameOver,
        isPaused: state.gameState.isPaused,
        dropInProgress: state.gameState.dropInProgress
    }
}

export default connect(mapStateToProps, {createItem, updateGameStats, clearFlyingItem, gravity})(ItemsContainer);