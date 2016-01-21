export function categories(state = [], action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'GET_CATEGORIES':
      return action.payload;
    default:
      return state;
  }
}

export function category(state = {}, action) {
  switch (action.type) {
    case 'SET_CURRENT_CATEGORY':
      return action.payload || {name: undefined};
    default:
      return state;
  }
}
