import { combineReducers } from 'redux'
import * as actionTypes from "../actions/types";

const initialState = {
    currentUser:null,
    isLoading:true
}

const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payLoad.currentUser,
        isLoading: false,
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isLoading:false
      }


    default:
      return state;
  }
};

const initialChannelState = {
  channel: null
}

const channel_reducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payLoad.currentChannel
      };
    default:
      return state;
  }
};

const rootReducier =  combineReducers({
    user:user_reducer,
    channel: channel_reducer
});

export default rootReducier;