//-------------------------------------------------------------------
// Constants
//-------------------------------------------------------------------
export const GET_BOOKMARKS = 'GET_BOOKMARKS';
export const GET_SELECTED_BOOKMARK = 'GET_SELECTED_BOOKMARK';
export const RESET_SELECTED_BOOKMARK = 'RESET_SELECTED_BOOKMARK';

//-------------------------------------------------------------------
// Actions
//-------------------------------------------------------------------
export const BookmarksActions = ($ngRedux) => {
  'ngInject';

  const getBookmarks = bookmarks => {
    return { type: GET_BOOKMARKS, payload: bookmarks };
  };

  const selectBookmark = (bookmark = initialBookmark) => {
    const { category } = $ngRedux.getState(),
      payload = bookmark.id ? bookmark : Object.assign({}, bookmark, { category: category.name });

    return { type: GET_SELECTED_BOOKMARK, payload };
  };

  const resetSelectedBookmark = () => {
    return { type: RESET_SELECTED_BOOKMARK }
  };

  return {
    getBookmarks,
    selectBookmark,
    resetSelectedBookmark
  }
};

//-------------------------------------------------------------------
// Reducers
//-------------------------------------------------------------------
const initialBookmarks = [
  {"id":1, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
  {"id":2, "title": "Egghead.io", "url": "http://egghead.io", "category": "Development" },
  {"id":3, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
  {"id":4, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
  {"id":6, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
  {"id":7, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
  {"id":8, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
  {"id":9, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
  {"id":10, "title": "ViralViralVideos", "url": "http://viralviralvideos.com", "category": "Humor" }
];

export const bookmarks = (state = initialBookmarks, {type, payload}) => {
  switch (type) {
    case GET_BOOKMARKS:
      return payload || state;
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