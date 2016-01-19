class CategoriesController {
  constructor(CategoriesModel) {
    'ngInject';

    let categoriesListCtrl = this;

    CategoriesModel.getCategories()
      .then(function(result) {
        categoriesListCtrl.categories = result;
      });
  }
}

export default CategoriesController;
