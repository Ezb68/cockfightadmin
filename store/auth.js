import React from 'react';
import { createStore } from 'react-hooks-global-state';

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment': return { ...state, count: state.count + 1 };
        case 'decrement': return { ...state, count: state.count - 1 };
        default: return state;
    }
};
const initialState = { count: 0 };
const { dispatch, useStoreState } = createStore(reducer, initialState);

//https://www.npmjs.com/package/react-hooks-global-state
