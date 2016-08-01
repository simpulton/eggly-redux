import {find, findIndex, uniqueId} from 'lodash';

const URLS = {
  FETCH: 'data/bookmarks.json'
};

const BookmarksModel = ($http, $q, $ngRedux) => {
  'ngInject';

  const extract = result => result.data;

  const getBookmarks = () => {
    return (dispatch, getState) => {
      const { bookmarks } = getState();

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

  const findBookmark = (bookmarks, bookmarkId) => {
    return find(bookmarks, bookmark => bookmark.id === parseInt(bookmarkId, 10));
  };

  const getBookmarkById = (bookmarkId) => {
    const { bookmarks, bookmark, category } = $ngRedux.getState(),
        payload = bookmarkId ?
          findBookmark(bookmarks, bookmarkId)
          : Object.assign({}, bookmark, {category: category.name});

    return { type: 'GET_SELECTED_BOOKMARK', payload};
  };

  const saveBookmark = (bookmark) => {
    const { bookmarks } = $ngRedux.getState(),
        hasId = !!bookmark.id;

    if (!hasId) bookmark.id = uniqueId(); // Simulating backend

    return hasId ?
        { type: 'EDIT_BOOKMARK', payload: bookmark }
        : { type: 'CREATE_BOOKMARK', payload: bookmark };
  };

  const resetSelectedBookmark = () => {
    return { type: 'RESET_SELECTED_BOOKMARK' };
  };

  const deleteBookmark = bookmark => {
    return { type: 'DELETE_BOOKMARK', payload: bookmark };
  };

  const cancel = () => {
    return resetSelectedBookmark();
  };

  return { getBookmarks, deleteBookmark, getBookmarkById, saveBookmark, resetSelectedBookmark, cancel };
};

export default BookmarksModel;
