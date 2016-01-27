import {find, findIndex} from 'lodash';

const URLS = {
  FETCH: 'data/bookmarks.json'
};

let BookmarksModel = ($http, $q, $state) => {
  'ngInject';

  let extract = (result) => {
    return result.data;
  }

  let getBookmarks = () => {
    return (dispatch, getState) => {
      let bookmarks = getState().bookmarks;

      if (bookmarks.length) {
        return $q.when(bookmarks)
          .then(() => dispatch({ type: 'GET_BOOKMARKS', payload: bookmarks }));
      } else {
        return $http.get(URLS.FETCH)
          .then(extract)
          .then(data => dispatch({ type: 'GET_BOOKMARKS', payload: data }));
      }
    }
  };

  let findBookmark = (bookmarks, bookmarkId) => {
    return find(bookmarks, (bookmark) => {
      return bookmark.id === parseInt(bookmarkId, 10);
    });
  }

  let getBookmarkById = (bookmarkId) => {
    return (dispatch, getState) => {
      let bookmarks;

      dispatch(getBookmarks()).then(() => {
        bookmarks = getState().bookmarks;
        dispatch({ type: 'GET_SELECTED_BOOKMARK', payload: findBookmark(bookmarks, bookmarkId) });
      });
    }
  };

  let saveBookmark = (bookmark, category) => {
    return (dispatch, getState) => {
      let bookmarks = getState().bookmarks,
          hasId = !!bookmark.id;

      if (!hasId) bookmark.id = bookmarks.length;
      if (!bookmark.category) bookmark.category = category;

      return hasId
        ? dispatch({ type: 'EDIT_BOOKMARK', payload: bookmark })
        : dispatch({ type: 'CREATE_BOOKMARK', payload: bookmark });
    }
  }

  let resetSelectedBookmark = () => {
    return { type: 'RESET_SELECTED_BOOKMARK' }
  }

  let deleteBookmark = bookmark => {
    return { type: 'DELETE_BOOKMARK', payload: bookmark }
  };

  let cancel = () => {
    returnToBookmarks();

    return resetSelectedBookmark();
  }

  let returnToBookmarks = () => {
    $state.go('eggly.categories.bookmarks');

    return resetSelectedBookmark();
  }

  return { getBookmarks, deleteBookmark, getBookmarkById, saveBookmark, resetSelectedBookmark, returnToBookmarks, cancel };
}

export default BookmarksModel;
