import * as actionTypes from './types';

export const setUser = user=>{
    return {
        type: actionTypes.SET_USER,
        payLoad: {
            currentUser: user
        }
    }
}

export const clearUser = user=>{
    return {
        type: actionTypes.CLEAR_USER,
    }
}

export const setCurrentChannel = channel=>{
    return {
        type: actionTypes.SET_CURRENT_CHANNEL,
        payLoad: {
            currentChannel: channel
        }
    }
}


export const setPrivateChannel = isPrivatechannel =>{
    return {
        type: actionTypes.SET_PRIVATE_CHANNEL, 
        payLoad: {
            isPrivatechannel: isPrivatechannel
        }
    }
}