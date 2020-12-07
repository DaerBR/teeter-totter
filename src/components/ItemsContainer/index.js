import React, {Component} from 'react';
import { createItem, updateGameStats, clearFlyingItem, gravity } from '../../store/actions';
import { connect } from 'react-redux';

import Seesaw from '../Seesaw';
import Item from '../Item';
import './style.css';

class ItemsContainer extends Component {
    componentDidUpdate() {
        if (this.props.isGameOn && !this.props.isGameOver) {
            this.gameCycle();
        }
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
            if (flyingItem.bottom === 0) {
                if (rightItems.length !== leftItems.length) {
                    const newLeft = this.props.flyingItem;
                    newLeft.bottom = 0;
                    this.props.createItem(newLeft,'left');
                    this.props.updateGameStats(leftItems, rightItems, weightLeft, weightRight);
                }
                this.props.clearFlyingItem();
            } else {

                setTimeout(() => {
                    !this.props.isPaused && this.props.flyingItem && this.props.gravity();
                }, 1000);
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
        return (
            <div className="items-container">
                {(this.props.isGameOver && <div className="game-over-message">Alas, the game is over!</div>)}
                {(this.props.isPaused && <div className="game-paused-message">Game paused...</div>)}
                <div className="leftSide">
                    { this.props.flyingItem &&
                            <Item type="fly"
                                  className={`item item-${this.props.flyingItem.form} color-${this.props.flyingItem.color}`}
                                  weight={this.props.flyingItem.weight}
                                  bottom={this.props.flyingItem.bottom}
                                  offset={this.props.flyingItem.offset}/>
                    }
                </div>
                <Seesaw/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        weightLeft: state.game.weightLeft,
        weightRight: state.game.weightRight,
        leftItems: state.game.leftItems,
        rightItems: state.game.rightItems,
        flyingItem: state.game.flyingItem,
        bending: state.game.bending,
        isGameOn: state.game.isGameOn,
        isGameOver: state.game.isGameOver,
        isPaused: state.game.isPaused,
        dropInProgress: state.game.dropInProgress
    }
}

export default connect(mapStateToProps, {createItem, updateGameStats, clearFlyingItem, gravity})(ItemsContainer);