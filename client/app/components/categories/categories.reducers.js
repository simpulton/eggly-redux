const categories = (state = [], {type, payload}) => {
  switch (type) {
    case 'GET_CATEGORIES':
      return payload;
    default:
      return state;
  }
};

const category = (state = {}, {type, payload}) => {
  switch (type) {
    case 'SET_CURRENT_CATEGORY':
      return payload || { name: undefined };
    default:
      return state;
  }
};

export {categories, category};
