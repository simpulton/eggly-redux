import {find} from 'lodash';

const URLS = {
  FETCH: 'data/categories.json'
};

let CategoriesModel = ($http, $q, $ngRedux) => {
  'ngInject';

  let extract = (result) => {
    return result.data;
  };

  let getCategories = () => {
    return (dispatch, getState) => {
      let { categories } = getState();

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

  let findCategory = (categories, categoryName) => {
    return find(categories, (c) => {
      return c.name == categoryName;
    });
  };

  let setCurrentCategory = (categoryName) => {
    let { categories } = $ngRedux.getState();
    return { type: 'SET_CURRENT_CATEGORY', payload: findCategory(categories, categoryName) };
  };

  return { getCategories, setCurrentCategory };
};

export default CategoriesModel;
