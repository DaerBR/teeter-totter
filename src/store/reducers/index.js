import { combineReducers } from "redux";
import { gameReudcer } from "./gameReducers";

export default combineReducers({
    game: gameReudcer
})