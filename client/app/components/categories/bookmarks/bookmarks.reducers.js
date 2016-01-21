import _ from 'lodash';

function bookmarks(state = [], action) {
  switch (action.type) {
    case 'GET_BOOKMARKS':
      return action.payload;
    case 'CREATE_BOOKMARK':
      return [ ...state, action.payload ];
    case 'EDIT_BOOKMARK':
      let index = _.indexOf(state, action.payload);
      return [
        ...state.slice(0, index),
        action.payload,
        ...state.slice(index + 1)
      ];
    case 'DELETE_BOOKMARK':
      return _.reject(state, (b) => {
        return b.id == action.payload.id;
      });
    default:
      return state;
  }
}


const initialBookmark = {
  id: null,
  title: '',
  url: '',
  category: null
};
function bookmark(state = _.clone(initialBookmark), action) {
  switch (action.type) {
    case 'FIND_BOOKMARK':
      return action.payload || state;
    case 'RESET_EDITED_BOOKMARK':
      return initialBookmark;
    default:
      return state;
  }
}

export default { bookmarks, bookmark };
