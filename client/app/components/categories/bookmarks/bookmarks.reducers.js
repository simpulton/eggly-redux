export function bookmarks(state = [], action) {
  switch (action.type) {
    case 'GET_BOOKMARKS':
      return action.payload;
    case 'DELETE_BOOKMARK':
      return _.reject(state, (b) => {
        return b.id == action.payload.id;
      });
    default:
      return state;
  }
}
