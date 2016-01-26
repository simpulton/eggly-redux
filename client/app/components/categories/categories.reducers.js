let categories = (state = [], {type, payload}) => {
  switch (type) {
    case 'ADD':
      return [...state, payload];
    case 'GET_CATEGORIES':
      return payload;
    default:
      return state;
  }
}

let category = (state = {}, {type, payload}) => {
  switch (type) {
    case 'SET_CURRENT_CATEGORY':
      return payload || { name: undefined };
    default:
      return state;
  }
}

export default {categories, category};
