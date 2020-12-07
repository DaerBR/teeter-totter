import React, {Component} from 'react';
import { connect } from 'react-redux';
import { moveLeft, moveRight } from '../../store/actions';

import './style.css';

class Item extends Component {
    constructor(props) {
        super (props);
        if (this.props.type === 'fly') {
            this.itemRef = React.createRef();
        }
    }

    componentDidMount() {
        if (this.props.type === 'fly') {
            this.itemRef.current.addEventListener('keydown', this.keyDownHandler);
            this.itemRef.current.focus();
        }
    }


    keyDownHandler = (e) => {
            switch (e.keyCode) {
                case 37:
                    this.props.offset > 0 && this.props.moveLeft()
                    break;
                case 39:
                    this.props.offset > 5 && this.props.moveLeft()
                    this.props.moveRight()
                    break;
                default:
                    return true
            }

    }
    render() {
        const { weight, className, offset, bottom } = this.props;
        const bottomUnit = this.props.type === 'fly' ? '%' : 'px'
        const styles = {
            width: weight * 8,
            height: weight * 8,
            bottom: bottom + bottomUnit,
            left: offset * 65
        };
        return (
            <div ref={this.itemRef} tabIndex="0" className={className} style={styles}>
                {weight}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        flyingItem: state.game.flyingItem,
    }
}

export default connect(mapStateToProps,{ moveRight, moveLeft })(Item);