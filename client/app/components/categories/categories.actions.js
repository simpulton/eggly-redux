import {find} from 'lodash';

const URLS = {
  FETCH: 'data/categories.json'
};

const CategoriesModel = ($http, $q, $ngRedux) => {
  'ngInject';

  const extract = result => result.data;

  const getCategories = () => {
    return (dispatch, getState) => {
      const { categories } = getState();

      if (categories.length) {
        return $q.when(categories)
          .then(() => dispatch({ type: 'GET_CATEGORIES', payload: categories }));
      } else {
        return $http.get(URLS.FETCH)
          .then(extract)
          .then(data => dispatch({ type: 'GET_CATEGORIES', payload: data }));
      }
    };
  };

  const findCategory = (categories, categoryName) => {
    return find(categories, c => c.name == categoryName);
  };

  const setCurrentCategory = (categoryName) => {
    const { categories } = $ngRedux.getState();
    return { type: 'SET_CURRENT_CATEGORY', payload: findCategory(categories, categoryName) };
  };

  return { getCategories, setCurrentCategory };
};

export default CategoriesModel;
