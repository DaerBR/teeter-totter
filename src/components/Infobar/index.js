import React, {Component} from 'react';
import {connect} from 'react-redux';
import {startGame, pauseGame, resetGame} from '../../store/actions';

import './style.css';

class Infobar extends Component {

    render() {
        return (
            <div className="infobar">
                {!this.props.isGameOn  && <button onClick={() => this.props.startGame()}>Start</button>}
                {this.props.isGameOn  && <button onClick={this.props.pauseGame}>{!this.props.isPaused ? 'Pause' : 'Continue'}</button>}
                <button onClick={this.props.resetGame}>Reset</button>
                <div className="info-block">Weight Left: {this.props.weightLeft}</div>
                <div className="info-block">Weight Right: {this.props.weightRight}</div>
                <div className="info-block">Bending:  {this.props.bending}</div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        weightLeft: state.game.weightLeft,
        weightRight: state.game.weightRight,
        bending: state.game.bending,
        isGameOn: state.game.isGameOn,
        isGameOver: state.game.isGameOver,
        isPaused: state.game.isPaused
    }
}

export default connect(mapStateToProps, {startGame, pauseGame, resetGame})(Infobar);