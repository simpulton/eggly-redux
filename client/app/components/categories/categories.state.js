import { find } from 'lodash';

const URLS = {
  FETCH: 'data/categories.json'
};

const CategoriesActions = ($http, $q, $ngRedux) => {
  'ngInject';

  const extract = result => result.data;

  const getCategories = () => {
    return (dispatch, getState) => {
      const { categories } = getState();

      if (categories.length) {
        return $q.when(categories)
          .then(() => dispatch({ type: 'SET_CATEGORIES', payload: categories }));
      } else {
        return $http.get(URLS.FETCH)
          .then(extract)
          .then(data => dispatch({ type: 'SET_CATEGORIES', payload: data }));
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

const categories = (state = [], { type, payload }) => {
  switch (type) {
    case 'SET_CATEGORIES':
      return payload;
    default:
      return state;
  }
};

const category = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SET_CURRENT_CATEGORY':
      return payload || { name: undefined };
    default:
      return state;
  }
};

export { categories, category, CategoriesActions };
