const URLS = {
  FETCH: 'data/bookmarks.json'
};

let BookmarksModel = ($http, $q, $state) => {
  'ngInject';

  let extract = (result) => {
    return result.data;
  }

  let fetchRemoteBookmarks = () => {
    return $http.get(URLS.FETCH);
  }

  let getBookmarks = () => {
    return (dispatch, getState) => {
      let bookmarks = getState().bookmarks;

      if (bookmarks.length) {
        dispatch({ type: 'GET_BOOKMARKS', payload: bookmarks });
      } else {
        fetchRemoteBookmarks()
          .then((response) => {
            dispatch({ type: 'GET_BOOKMARKS', payload: extract(response) });
          });
      }
    }
  };

  let findBookmark = (bookmarks, bookmarkId) => {
    return _.find(bookmarks, (bookmark) => {
      return bookmark.id === parseInt(bookmarkId, 10);
    });
  }

  let getBookmarkById = (bookmarkId) => {
    return (dispatch, getState) => {
      let bookmarks = getState().bookmarks;

      if (bookmarks.length) {
        dispatch({ type: 'FIND_BOOKMARK', payload: findBookmark(bookmarks, bookmarkId) });
      } else {
        fetchRemoteBookmarks()
          .then((response) => {
            dispatch({ type: 'FIND_BOOKMARK', payload: findBookmark(extract(response), bookmarkId) });
          });
      }
    }
  };

  let saveBookmark = (bookmark, bookmarkId, category) => {
    return (dispatch, getState) => {
      let bookmarks = getState().bookmarks;
      bookmark.id = bookmarks.length;

      if (!bookmark.category) bookmark.category = category;

      return bookmarkId
        ? dispatch({ type: 'EDIT_BOOKMARK', payload: bookmark })
        : dispatch({ type: 'CREATE_BOOKMARK', payload: bookmark });
    }
  }

  let resetEditedBookmark = () => {
    return {
      type: 'RESET_EDITED_BOOKMARK'
    }
  }

  let createBookmark = (bookmark) => {
    return (dispatch, getState) => {
      console.log(getState());
    }
  };

  let updateBookmark = (bookmark) => {
    let index = _.findIndex(this.bookmarks, (b) => {
      return b.id == bookmark.id
    });

    this.bookmarks[index] = bookmark;
  };

  let deleteBookmark = (bookmark) => {
    return {
      type: 'DELETE_BOOKMARK',
      payload: bookmark
    }
  };

  let cancel = () => {
    returnToBookmarks();

    return resetEditedBookmark();
  }

  let returnToBookmarks = () => {
    $state.go('eggly.categories.bookmarks');

    return { type: null };
  }

  return { getBookmarks, deleteBookmark, getBookmarkById, saveBookmark, resetEditedBookmark, returnToBookmarks, cancel };
}

export default BookmarksModel;
