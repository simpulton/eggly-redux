class BookmarksController {
  constructor(CategoriesModel, BookmarksModel, $stateParams) {
    'ngInject';
    let bookmarksListCtrl = this;

    CategoriesModel.setCurrentCategory($stateParams.category);

    BookmarksModel.getBookmarks()
      .then(function(bookmarks) {
        bookmarksListCtrl.bookmarks = bookmarks;
      });

    bookmarksListCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory.bind(CategoriesModel);
    bookmarksListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName.bind(CategoriesModel);
    bookmarksListCtrl.deleteBookmark = BookmarksModel.deleteBookmark.bind(CategoriesModel);
  }
}

export default BookmarksController;
