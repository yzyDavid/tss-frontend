import GlobalState from '../models/globalState';
import {sessionStorageKey} from '../configs/localStorage';

const saveSession = (state: GlobalState): GlobalState => {
    const {uid, token, userName} = state;
    const values = JSON.stringify({uid, token, userName});
    localStorage.setItem(sessionStorageKey, values);
    return state;
};

const loadSession = (state: GlobalState): GlobalState => {
    const values = JSON.parse(localStorage.getItem(sessionStorageKey) || '{}');
    return {...state, ...values};
};

const getAuthTokenFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(sessionStorageKey) || '{token: ""}').token;
};

export {saveSession, loadSession, getAuthTokenFromLocalStorage};
