const createStore = (reducer) => {
  let state = {};
  let listeners = [];
  // Return current state
  const getState = () => {
    return state
  };
  //Dispatch the action. Action should change state. After it call listeners.
  const dispatch = (action) => {
    if(typeof action === 'function'){
      action(dispatch,getState);
      return;
    }
    let key = Object.keys(reducer);
    key.forEach((reducerName) => {
      state[reducerName] = reducer[reducerName](state[reducerName], action);
    });
    listeners.forEach(listener => listener());
  };

  // Function to do correlation between function and changing state of store.
  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  };

  // First dispatch with empty object (like empty action) for init store. (All reducer will return initial state)
  dispatch ({});
  return {getState, dispatch, subscribe};
};

export {createStore}
