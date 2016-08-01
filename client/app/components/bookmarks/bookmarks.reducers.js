import {clone, reject} from 'lodash';

const bookmarks = (state = [], {type, payload}) => {
  switch (type) {
    case 'GET_BOOKMARKS':
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

const bookmark = (state = initialBookmark, {type, payload}) => {
  switch (type) {
    case 'GET_SELECTED_BOOKMARK':
      return payload || state;
    case 'RESET_SELECTED_BOOKMARK':
      return initialBookmark;
    default:
      return state;
  }
};

export { bookmarks, bookmark };
