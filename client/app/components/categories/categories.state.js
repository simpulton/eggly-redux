//-------------------------------------------------------------------
// Constants
//-------------------------------------------------------------------
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CURRENT_CATEGORY = 'GET_CURRENT_CATEGORY';

//-------------------------------------------------------------------
// Actions
//-------------------------------------------------------------------
const URLS = {
  FETCH: 'data/categories.json'
};

export const CategoriesActions = ($http, $q) => {
  'ngInject';

  const extract = result => result.data;

  const getCategories = () => {
    return (dispatch, getState) => {
      const { categories } = getState();

      if(categories.length) {
        return $q.when(categories)
          .then(() => dispatch({ type: GET_CATEGORIES, payload: categories }));
      } else {
        return $http.get(URLS.FETCH)
          .then(extract)
          .then(data => dispatch({ type: GET_CATEGORIES, payload: data }));
      }
    }
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
export const categories = (state = [], {type, payload}) => {
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