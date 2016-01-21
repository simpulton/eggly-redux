const ALL = 'ALL';
const GET_BOOKMARKS = 'GET_BOOKMARKS';
const FIND_BOOKMARK = 'FIND_BOOKMARK';
const CREATE_BOOKMARK = 'CREATE_BOOKMARK';
const EDIT_BOOKMARK = 'EDIT_BOOKMARK';
const DELETE_BOOKMARK = 'DELETE_BOOKMARK';
const SET_BOOKMARK_ID = 'SET_BOOKMARK_ID';
const RESET_EDITED_BOOKMARK = 'RESET_EDITED_BOOKMARK';
const URLS = {
  FETCH: 'data/bookmarks.json'
};

let BookmarksModel = ($http, $q, $state) => {
  'ngInject';

  function extract(result) {
    return result.data;
  }

  function cacheBookmarks(result) {
    this.bookmarks = this.extract(result);
    return this.bookmarks;
  }

  function fetchRemoteBookmarks() {
    return $http.get(URLS.FETCH);
  }

  function getBookmarks() {
    return (dispatch, getState) => {
      let bookmarks = getState().bookmarks;

      if (bookmarks.length) {
        dispatch({ type: GET_BOOKMARKS, payload: bookmarks });
      } else {
        fetchRemoteBookmarks()
          .then((response) => {
            dispatch({ type: GET_BOOKMARKS, payload: extract(response) });
          });
      }
    }
  };

  function findBookmark(bookmarks, bookmarkId) {
    return _.find(bookmarks, (bookmark) => {
      return bookmark.id === parseInt(bookmarkId, 10);
    });
  }

  function getBookmarkById(bookmarkId) {
    return (dispatch, getState) => {
      let bookmarks = getState().bookmarks;

      if (bookmarks.length) {
        dispatch({ type: FIND_BOOKMARK, payload: findBookmark(bookmarks, bookmarkId) });
      } else {
        fetchRemoteBookmarks()
          .then((response) => {
            dispatch({ type: FIND_BOOKMARK, payload: findBookmark(extract(response), bookmarkId) });
          });
      }
    }
  };

  function saveBookmark(bookmark, bookmarkId, category) {
    return (dispatch, getState) => {
      let bookmarks = getState().bookmarks;
      bookmark.id = bookmarks.length;

      if (!bookmark.category) bookmark.category = category;

      return bookmarkId
        ? dispatch({ type: EDIT_BOOKMARK, payload: bookmark })
        : dispatch({ type: CREATE_BOOKMARK, payload: bookmark });
    }
  }

  function resetEditedBookmark() {
    return {
      type: RESET_EDITED_BOOKMARK
    }
  }

  function createBookmark(bookmark) {
    return (dispatch, getState) => {
      console.log(getState());
    }
  };

  function updateBookmark(bookmark) {
    let index = _.findIndex(this.bookmarks, (b) => {
      return b.id == bookmark.id
    });

    this.bookmarks[index] = bookmark;
  };

  function deleteBookmark(bookmark) {
    return {
      type: DELETE_BOOKMARK,
      payload: bookmark
    }
  };

  function cancel() {
    console.log('cancelling');
    returnToBookmarks();

    return resetEditedBookmark();
  }

  function returnToBookmarks() {
    $state.go('eggly.categories.bookmarks');

    return { type: null };
  }

  return { getBookmarks, deleteBookmark, getBookmarkById, saveBookmark, resetEditedBookmark, returnToBookmarks, cancel };
}

export default BookmarksModel;
