import React, {Component} from 'react';
import {connect} from 'react-redux';
import {startGame, pauseGame, resetGame} from '../../store/actions';

import './style.css';

class Infobar extends Component {
    handleStart() {
        if (this.props.isGameOver) {
            this.props.resetGame();
        }
        this.props.startGame();
    }
    render() {
        const bending = Math.abs(this.props.bending);
        const { isGameOn, pauseGame, isPaused, resetGame, weightLeft, weightRight } = this.props;
        return (
            <div className="infobar">
                {!isGameOn  && <button onClick={() => this.handleStart()}>Start</button>}
                {isGameOn  && <button onClick={pauseGame}>{!isPaused ? 'Pause' : 'Continue'}</button>}
                <button onClick={resetGame}>Reset</button>
                <div className="info-block">Weight Left: {weightLeft}</div>
                <div className="info-block">Weight Right: {weightRight}</div>
                <div className={`info-block ${bending >= 28 ? 'critical' : ''}`}>Bending: {bending}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        weightLeft: state.gameState.weightLeft,
        weightRight: state.gameState.weightRight,
        bending: state.gameState.bending,
        isGameOn: state.gameState.isGameOn,
        isGameOver: state.gameState.isGameOver,
        isPaused: state.gameState.isPaused
    }
}

export default connect(mapStateToProps, {startGame, pauseGame, resetGame})(Infobar);