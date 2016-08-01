import {find, findIndex} from 'lodash';

const URLS = {
  FETCH: 'data/bookmarks.json'
};

let BookmarksModel = ($http, $q, $ngRedux) => {
  'ngInject';

  let extract = result => result.data;

  let getBookmarks = () => {
    return (dispatch, getState) => {
      let { bookmarks } = getState();

      if (bookmarks.length) {
        return $q.when(bookmarks)
          .then(() => dispatch({ type: 'GET_BOOKMARKS', payload: bookmarks }));
      } else {
        return $http.get(URLS.FETCH)
          .then(extract)
          .then(data => dispatch({ type: 'GET_BOOKMARKS', payload: data }));
      }
    };
  };

  let findBookmark = (bookmarks, bookmarkId) => {
    return find(bookmarks, bookmark => bookmark.id === parseInt(bookmarkId, 10));
  };

  let getBookmarkById = (bookmarkId) => {
    let { bookmarks, bookmark, category } = $ngRedux.getState(),
        payload = bookmarkId ?
          findBookmark(bookmarks, bookmarkId)
          : Object.assign({}, bookmark, {category: category.name});

    return { type: 'GET_SELECTED_BOOKMARK', payload};
  };

  let saveBookmark = (bookmark) => {
    let { bookmarks } = $ngRedux.getState(),
        hasId = !!bookmark.id;

    if (!hasId) bookmark.id = bookmarks.length;

    return hasId ?
        { type: 'EDIT_BOOKMARK', payload: bookmark }
        : { type: 'CREATE_BOOKMARK', payload: bookmark };
  };

  let resetSelectedBookmark = () => {
    return { type: 'RESET_SELECTED_BOOKMARK' };
  };

  let deleteBookmark = bookmark => {
    return { type: 'DELETE_BOOKMARK', payload: bookmark };
  };

  let cancel = () => {
    returnToBookmarks();

    return resetSelectedBookmark();
  };

  return { getBookmarks, deleteBookmark, getBookmarkById, saveBookmark, resetSelectedBookmark, cancel };
};

export default BookmarksModel;
