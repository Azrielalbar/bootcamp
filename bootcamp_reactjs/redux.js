const redux = require('redux');

//1.create a basic reducer
const rootReducer = (currentState = 0, action) => {
    return currentState;
}

//2.create a store
const store = redux.createStore(rootReducer);
console.log(store.getState());

