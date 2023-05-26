import React from 'react';
import { createStore } from 'react-hooks-global-state';

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_INFO_USER': return { ...state };
        default: return state;
    }
};
const initialState = { };
const { dispatch, useStoreState } = createStore(reducer, initialState);

//https://www.npmjs.com/package/react-hooks-global-state
