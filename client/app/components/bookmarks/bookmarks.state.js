import { find, findIndex, reject, uniqueId } from 'lodash';

const URLS = {
  FETCH: 'data/bookmarks.json'
};

const BookmarksActions = ($http, $q, $ngRedux) => {
  'ngInject';

  const extract = result => result.data;

  const getBookmarks = () => {
    return (dispatch, getState) => {
      const { bookmarks } = getState();

      if (bookmarks.length) {
        return $q.when(bookmarks)
          .then(() => dispatch({ type: 'SET_BOOKMARKS', payload: bookmarks }));
      } else {
        return $http.get(URLS.FETCH)
          .then(extract)
          .then(data => dispatch({ type: 'SET_BOOKMARKS', payload: data }));
      }
    };
  };

  const findBookmark = (bookmarks, bookmarkId) => {
    return find(bookmarks, bookmark => bookmark.id == parseInt(bookmarkId, 10));
  };

  const getBookmarkById = (bookmarkId) => {
    const { bookmarks, bookmark, category } = $ngRedux.getState(),
      payload = bookmarkId ?
        findBookmark(bookmarks, bookmarkId)
        : Object.assign({}, bookmark, { category: category.name });

    return { type: 'SET_SELECTED_BOOKMARK', payload };
  };

  const saveBookmark = (bookmark) => {
    const { bookmarks } = $ngRedux.getState(),
      hasId = !!bookmark.id;

    if (!hasId) bookmark.id = uniqueId('100'); // Simulating backend

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

const bookmarks = (state = [], { type, payload }) => {
  switch (type) {
    case 'SET_BOOKMARKS':
      return payload;
    case 'CREATE_BOOKMARK':
      return [ ...state, payload ];
    case 'EDIT_BOOKMARK':
      return state.map(bookmark => bookmark.id === payload.id ? payload : bookmark);
    case 'DELETE_BOOKMARK':
      return reject(state, b => b.id == payload.id);
    default:
      return state;
  }
};

const initialBookmark = { id: null, title: '', url: '', category: null };

const bookmark = (state = initialBookmark, { type, payload }) => {
  switch (type) {
    case 'SET_SELECTED_BOOKMARK':
      return payload || state;
    case 'RESET_SELECTED_BOOKMARK':
      return initialBookmark;
    default:
      return state;
  }
};

export { bookmarks, bookmark, BookmarksActions };
