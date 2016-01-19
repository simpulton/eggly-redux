import _ from  'lodash';

class BookmarksModel {
  constructor($http, $q) {
    'ngInject';

    this.$http = $http;
    this.$q = $q;

    this.URLS = {
      FETCH: 'data/bookmarks.json'
    }
  }

  extract(result) {
    return result.data;
  }

  cacheBookmarks(result) {
    this.bookmarks = this.extract(result);
    return this.bookmarks;
  }

  findBookmark(bookmarkId) {
    return _.find(this.bookmarks, function(bookmark) {
      return bookmark.id === parseInt(bookmarkId, 10);
    })
  }

  getBookmarks() {
    return (this.bookmarks) ? this.$q.when(this.bookmarks) : this.$http.get(this.URLS.FETCH).then(this.cacheBookmarks.bind(this));
  };

  getBookmarkById(bookmarkId) {
    var deferred = $q.defer();
    if (this.bookmarks) {
      deferred.resolve(findBookmark(bookmarkId))
    } else {
      this.getBookmarks().then(function() {
        deferred.resolve(findBookmark(bookmarkId))
      })
    }
    return deferred.promise;
  };

  createBookmark(bookmark) {
    bookmark.id = this.bookmarks.length;
    this.bookmarks.push(bookmark);
  };

  updateBookmark(bookmark) {
    var index = _.findIndex(bookmarks, function(b) {
      return b.id == bookmark.id
    });

    bookmarks[index] = bookmark;
  };

  deleteBookmark(bookmark) {
    _.remove(bookmarks, function(b) {
      return b.id == bookmark.id;
    });
  };
}

export default BookmarksModel;
