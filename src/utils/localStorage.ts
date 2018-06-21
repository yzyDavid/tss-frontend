// import GlobalState from '../types/globalState';
import {sessionStorageKey} from '../configs/localStorage';

interface GlobalState {
    uid: string,
    token: string,
    type: string
}

const saveSession = (state: GlobalState): null => {
    const {uid, token, type} = state;
    const values = JSON.stringify({uid, token, type});
    localStorage.setItem(sessionStorageKey, values);
    return null;
};

const loadSession = (state: GlobalState): GlobalState => {
    const values = JSON.parse(localStorage.getItem(sessionStorageKey) || '{}');
    return {...state, ...values};
};

const getAuthTokenFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(sessionStorageKey) || '{"token": ""}').token;
};

const getType = () => {
    return JSON.parse(localStorage.getItem(sessionStorageKey) || '{"type": ""}').type;
};

const getUid = () => {
    return JSON.parse(localStorage.getItem(sessionStorageKey) || '{"uid": ""}').uid;
};

const logOut = () => {
    localStorage.clear();
};

export {saveSession, loadSession, getAuthTokenFromLocalStorage, getType, logOut, getUid};
