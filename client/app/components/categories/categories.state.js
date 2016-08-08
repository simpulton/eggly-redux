//-------------------------------------------------------------------
// Constants
//-------------------------------------------------------------------
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CURRENT_CATEGORY = 'GET_CURRENT_CATEGORY';

//-------------------------------------------------------------------
// Actions
//-------------------------------------------------------------------
export const CategoriesActions = () => {
  const getCategories = categories => {
    return { type: GET_CATEGORIES, payload: categories };
  };

  const selectCategory = category => {
    return { type: GET_CURRENT_CATEGORY, payload: category };
  };

  return {
    getCategories,
    selectCategory
  };
};

//-------------------------------------------------------------------
// Reducers
//-------------------------------------------------------------------
export const initialCategories = [
  {"id": 0, "name": "Development"},
  {"id": 1, "name": "Design"},
  {"id": 2, "name": "Exercise"},
  {"id": 3, "name": "Humor"}
];

export const categories = (state = initialCategories, {type, payload}) => {
  switch (type) {
    case GET_CATEGORIES:
      return payload || state;
    default:
      return state;
  }
};

export const category = (state = {}, {type, payload}) => {
  switch (type) {
    case GET_CURRENT_CATEGORY:
      return payload || { name: undefined };
    default:
      return state;
  }
};