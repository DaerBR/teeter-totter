import {
    START_GAME,
    PAUSE_GAME,
    RESET_GAME,
    IS_GAME_OVER,
    UPDATE_GAME_STATS,
    CREATE_ITEM,
    CLEAR_FLYING_ITEMS,
    GRAVITY,
    MOVE_LEFT,
    MOVE_RIGHT
} from '../actions/types';

const initialState = {
    isPaused: false,
    isGameOver: false,
    isGameOn: false,
    weightLeft: 0,
    weightRight: 0,
    weightDifference: 0,
    bending: 0,
    leftItems: [],
    rightItems: [],
    flyingItem: null
}

export const gameReudcer = (state = initialState, action) => {
    switch (action.type) {
        case START_GAME: {
            return {
                ...state,
                isGameOn: true,
            };
        }
        case PAUSE_GAME: {
            return {
                ...state,
                isPaused: !state.isPaused,
            };
        }
        case RESET_GAME: {
            return {
                ...initialState
            };
        }
        case IS_GAME_OVER: {
            return {
                ...state,
                isGameOver: action.payload,
                isGameOn: !action.payload
            }
        }
        case CREATE_ITEM: {
            switch (action.payload.destination) {
                case 'right': {
                    return {
                        ...state,
                        rightItems: [...state.rightItems, action.payload.stats],
                        weightRight: state.weightRight + action.payload.stats.weight
                    }
                }
                case 'left': {
                    return {
                        ...state,
                        leftItems: [...state.leftItems, action.payload.stats],
                        weightLeft: state.weightLeft + action.payload.stats.weight
                    }
                }
                case 'fly': {
                    console.log('New fly is ', action.payload.stats)
                    return {
                        ...state,
                        flyingItem: action.payload.stats
                    }
                }
                default: {
                    return state
                }
            }
        }
        case UPDATE_GAME_STATS: {
            return {
                ...state,
                bending: action.payload.bending
            }
        }
        case CLEAR_FLYING_ITEMS: {
            return {
                ...state,
                flyingItem: null
            }
        }
        case GRAVITY: {
            return {
                ...state,
                flyingItem: {
                    ...state.flyingItem,
                    bottom: state.flyingItem.bottom - 10

                }
            }
        }
        case MOVE_LEFT: {
            return {
                ...state,
                flyingItem: {
                    ...state.flyingItem,
                    offset: state.flyingItem.offset - 1
                }
            }
        }
        case MOVE_RIGHT: {
            return {
                ...state,
                flyingItem: {
                    ...state.flyingItem,
                    offset: state.flyingItem.offset + 1
                }
            }
        }
        default:
            return state;
    }
};
