const URLS = {
  FETCH: 'data/categories.json'
};

export default function CategoriesModel($http, $q) {
  'ngInject';

  let extract = (result) => {
    return result.data;
  }

  let fetchRemoteCategories = () => {
    return $http.get(URLS.FETCH);
  }

  let getCategories = () => {
    return (dispatch, getState) => {
      let categories = getState().categories;

      if (categories.length) {
        dispatch({ type: 'GET_CATEGORIES', payload: categories });
      } else {
        fetchRemoteCategories(dispatch, 'GET_CATEGORIES')
          .then((response) => {
            dispatch({ type: 'GET_CATEGORIES', payload: extract(response) });
          });
      }
    }
  };

  let setCurrentCategory = (categoryName) => {
    return (dispatch, getState) => {
      let categories = getState.categories;

      if (categories) {
        dispatch({ type: 'SET_CURRENT_CATEGORY', payload: findCategory(categories, categoryName) });
      } else {
        fetchRemoteCategories()
          .then((response) => {
            dispatch({ type: 'SET_CURRENT_CATEGORY', payload: findCategory(extract(response), categoryName) });
          });
      }
    }
  };

  let findCategory = (categories, categoryName) => {
    return _.find(categories, (c) => {
      return c.name == categoryName;
    });
  }

  return { getCategories, setCurrentCategory };
}
