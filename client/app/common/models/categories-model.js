class CategoriesModel {
  constructor($http, $q, $rootScope) {
    'ngInject';

    this.$http = $http;
    this.$q = $q; 

    this.URLS = {
      FETCH: 'data/categories.json'
    };
  }

  extract(result) {
    return result.data;
  }

  cacheCategories(result) {
    this.categories = this.extract(result);
    return this.categories;
  }

  getCategories() {
    return (this.categories) ? this.$q.when(this.categories) : this.$http.get(this.URLS.FETCH).then(this.cacheCategories.bind(this));
  };

  setCurrentCategory(category) {
    let service = this;
    return service.getCategoryByName(category).then(function(category) {
      service.currentCategory = category;
    });
  };

  getCurrentCategory() {
    return this.currentCategory;
  };

  getCurrentCategoryName() {
    return this.currentCategory ? this.currentCategory.name : '';
  };

  getCategoryByName(categoryName) {
    var deferred = this.$q.defer(),
        service = this;

    function findCategory() {
      return _.find(service.categories, function(c) {
        return c.name == categoryName;
      });
    }

    if (this.categories) {
      deferred.resolve(findCategory());
    } else {
      this.getCategories()
        .then(() => {
          deferred.resolve(findCategory());
        });
    }

    return deferred.promise;
  };

}

export default CategoriesModel;
