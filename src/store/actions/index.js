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
} from './types';

export const startGame = () => {
    return {
        type: START_GAME
    }
}

export const pauseGame = () => {
    return {
        type: PAUSE_GAME
    }
}
export const resetGame = () => {
    return {
        type: RESET_GAME
    }
}
// I still have much doubts about this one
export const getModifiedSideWeight = (items, side) => {
    let modifiedWeight = 0;

    items.forEach((item) => {
        if (side === 'right') {
            modifiedWeight += (item.weight * (item.offset - 5));
        } else {
            modifiedWeight +=  (item.weight * (5 - item.offset));
        }
    });
    return modifiedWeight;
}

export const updateGameStats = (leftItems, rightItems, weightLeft, weightRight) => {
    let modifiedWeightLeft = getModifiedSideWeight(leftItems, 'left');
    let modifiedWeightRight = getModifiedSideWeight(rightItems, 'right');

    let bending = (modifiedWeightLeft - modifiedWeightRight) * 180 / 100;

    if (Math.abs(bending) > 30) {
        bending = 30 * (Math.abs(bending) / bending);
    }
    if ((Math.abs(weightRight - weightLeft) > 10)) {
        console.log('Overweight');
        return {
            type: IS_GAME_OVER,
            payload: true
        }
        // Same here - the bending model is far from good
    } else if ((rightItems.length === leftItems.length) && Math.abs(bending) === 30 && (Math.abs(weightRight) > 25)) {
        console.log('Bended too much - ', bending);
        return {
            type: IS_GAME_OVER,
            payload: true
        }
    } else {
        return {
            type: UPDATE_GAME_STATS,
            payload: {
                bending: bending
            }
        }
    }

}

export const createItem = (stats, side) => {
    return {
        type: CREATE_ITEM,
        payload: {
            stats: stats,
            destination: side
        }
    }
}

export const clearFlyingItem = () => {
    return {
        type: CLEAR_FLYING_ITEMS,
    }
}
export const gravity = () => {
    return {
        type: GRAVITY
    }
}
export const moveLeft = () => {
    return {
        type: MOVE_LEFT
    }
}
export const moveRight = () => {
    return {
        type: MOVE_RIGHT
    }
}