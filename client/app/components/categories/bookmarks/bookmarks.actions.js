const ALL = 'ALL';
const GET_BOOKMARKS = 'GET_BOOKMARKS';
const DELETE_BOOKMARK = 'DELETE_BOOKMARK';
const URLS = {
  FETCH: 'data/bookmarks.json'
};

export default function BookmarksModel($http, $q) {
  'ngInject';

  function extract(result) {
    return result.data;
  }

  function cacheBookmarks(result) {
    this.bookmarks = this.extract(result);
    return this.bookmarks;
  }

  function findBookmark(bookmarkId) {
    return _.find(this.bookmarks, (bookmark) => {
      return bookmark.id === parseInt(bookmarkId, 10);
    })
  }

  function fetchRemoteBookmarks() {
    return $http.get(URLS.FETCH);
  }

  function getBookmarks() {
    return (dispatch, getState) => {
      let bookmarks = getState().bookmarks;

      if (bookmarks.length) {
        dispatch({ type: GET_BOOKMARKS, payload: bookmarks });
      } else {
        fetchRemoteBookmarks()
          .then((response) => {
            dispatch({ type: GET_BOOKMARKS, payload: extract(response) });
          });
      }
    }
  };

  function getBookmarkById(bookmarkId) {
    let deferred = this.$q.defer(),
        service = this;

    if (service.bookmarks) {
      deferred.resolve(service.findBookmark(bookmarkId))
    } else {
      service.getBookmarks().then(() => {
        deferred.resolve(service.findBookmark(bookmarkId))
      })
    }
    return deferred.promise;
  };

  function createBookmark(bookmark) {
    bookmark.id = this.bookmarks.length;
    this.bookmarks.push(bookmark);
  };

  function updateBookmark(bookmark) {
    let index = _.findIndex(this.bookmarks, (b) => {
      return b.id == bookmark.id
    });

    this.bookmarks[index] = bookmark;
  };

  function deleteBookmark(bookmark) {
    return {
      type: DELETE_BOOKMARK,
      payload: bookmark
    }
  };

  return { getBookmarks, deleteBookmark };

}
