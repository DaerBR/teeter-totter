import { combineReducers } from "redux";
import { gameReudcer } from "./gameReducers";

export default combineReducers({
    gameState: gameReudcer
})