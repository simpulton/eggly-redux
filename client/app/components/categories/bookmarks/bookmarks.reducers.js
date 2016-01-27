import {clone, reject} from 'lodash';

let bookmarks = (state = [], {type, payload}) => {
  switch (type) {
    case 'GET_BOOKMARKS':
      return payload;
    case 'CREATE_BOOKMARK':
      return [ ...state, payload ];
    case 'EDIT_BOOKMARK':
      return state.map(bookmark => {
        return bookmark.id === payload.id ? clone(payload) : bookmark;
      });
    case 'DELETE_BOOKMARK':
      return reject(state, (b) => {
        return b.id == payload.id;
      });
    default:
      return state;
  }
}


const initialBookmark = { id: null, title: '', url: '', category: null };

let bookmark = (state = clone(initialBookmark), {type, payload}) => {
  switch (type) {
    case 'GET_SELECTED_BOOKMARK':
      return payload || state;
    case 'RESET_SELECTED_BOOKMARK':
      return initialBookmark;
    default:
      return state;
  }
}

export default { bookmarks, bookmark };
