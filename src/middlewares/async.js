export default function({ dispatch }) {
  return next => action => {
    // if action does not have a payload or a payload doesn't have a .then property
    // we don't care, send it on
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // Make sure the action's promise resolves
    action.payload.then(function(response) {
      // create a new action with the old type, but
      // replace the promise with the response data
      const newAction = { ...action, payload: response };
      dispatch(newAction);
    });
  };
}
