const ALL = 'ALL';
const GET_CATEGORIES = 'GET_CATEGORIES';
const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
const URLS = {
  FETCH: 'data/categories.json'
};

export default function CategoriesModel($http, $q) {
  'ngInject';

  function extract(result) {
    return result.data;
  }

  function cacheCategories(result) {
    this.categories = this.extract(result);
    return this.categories;
  }

  function fetchRemoteCategories() {
    return $http.get(URLS.FETCH);
  }

  function getCategories() {
    return (dispatch, getState) => {
      let categories = getState().categories;

      if (categories.length) {
        dispatch({
          type: GET_CATEGORIES,
          payload: categories
        });
      } else {
        fetchRemoteCategories(dispatch, GET_CATEGORIES)
          .then((response) => {
            dispatch({
              type: GET_CATEGORIES,
              payload: extract(response)
            });
          });
      }
    }
  };

  function setCurrentCategory(categoryName) {
    return (dispatch, getState) => {
      let categories = getState.categories;

      if (categories) {
        dispatch({
          type: SET_CURRENT_CATEGORY,
          payload: findCategory(categories, categoryName)
        });
      } else {
        fetchRemoteCategories()
          .then((response) => {
            dispatch({
              type: SET_CURRENT_CATEGORY,
              payload: findCategory(extract(response), categoryName)
            });
          });
      }
    }
  };

  function getCurrentCategory() {
    return this.currentCategory;
  };

  function getCurrentCategoryName() {
    return this.currentCategory ? this.currentCategory.name : '';
  };

  function findCategory(categories, categoryName) {
    return _.find(categories, (c) => {
      return c.name == categoryName;
    });
  }

  return { getCategories, setCurrentCategory, getCurrentCategoryName };

}
