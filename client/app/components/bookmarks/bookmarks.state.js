import { reject, uniqueId } from "lodash";

//-------------------------------------------------------------------
// Constants
//-------------------------------------------------------------------
export const GET_BOOKMARKS = 'GET_BOOKMARKS';
export const CREATE_BOOKMARK = 'CREATE_BOOKMARK';
export const UPDATE_BOOKMARK = 'UPDATE_BOOKMARK';
export const DELETE_BOOKMARK = 'DELETE_BOOKMARK';
export const GET_SELECTED_BOOKMARK = 'GET_SELECTED_BOOKMARK';
export const RESET_SELECTED_BOOKMARK = 'RESET_SELECTED_BOOKMARK';

//-------------------------------------------------------------------
// Actions
//-------------------------------------------------------------------
const URLS = {
  FETCH: 'data/bookmarks.json'
};

export const BookmarksActions = ($ngRedux, $http, $q) => {
  'ngInject';

  const extract = result => result.data;

  const getBookmarks = () => {
    return(dispatch, getState) => {
      const { bookmarks } = getState();

      if(bookmarks.length) {
        return $q.when(bookmarks)
          .then(() => dispatch({ type: GET_BOOKMARKS, payload: bookmarks }));
      } else {
        return $http.get(URLS.FETCH)
          .then(extract)
          .then((data) => dispatch({ type: GET_BOOKMARKS, payload: data }));
      }
    }
  };

  const selectBookmark = (bookmark = initialBookmark) => {
    const { category } = $ngRedux.getState(),
      payload = bookmark.id ? bookmark : Object.assign({}, bookmark, { category: category.name });

    return { type: GET_SELECTED_BOOKMARK, payload };
  };

  const saveBookmark = bookmark => {
    const hasId = !!bookmark.id,
      type = hasId ? UPDATE_BOOKMARK : CREATE_BOOKMARK;

    if(!hasId) bookmark.id = uniqueId(100); // simulating backend

    return { type, payload: bookmark };
  };

  const deleteBookmark = bookmark => {
    return { type: DELETE_BOOKMARK, payload: bookmark };
  };

  const resetSelectedBookmark = () => {
    return { type: RESET_SELECTED_BOOKMARK }
  };

  return {
    getBookmarks,
    selectBookmark,
    saveBookmark,
    deleteBookmark,
    resetSelectedBookmark
  }
};

//-------------------------------------------------------------------
// Reducers
//-------------------------------------------------------------------
export const bookmarks = (state = [], {type, payload}) => {
  switch (type) {
    case GET_BOOKMARKS:
      return payload || state;
    case CREATE_BOOKMARK:
      return [...state, payload];
    case UPDATE_BOOKMARK:
      return state.map(bookmark => bookmark.id === payload.id ? payload : bookmark);
    case DELETE_BOOKMARK:
      return reject(state, bookmark => bookmark.id === payload.id);
    default:
      return state;
  }
};

const initialBookmark = { id: null, name: '', url: '', category: null };

export const bookmark = (state = initialBookmark, {type, payload}) => {
  switch (type) {
    case GET_SELECTED_BOOKMARK:
      return payload || state;
    case RESET_SELECTED_BOOKMARK:
      return initialBookmark;
    default:
      return state;
  }
};