let categories = (state = [], {type, payload}) => {
  switch (type) {
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

export {categories, category};
