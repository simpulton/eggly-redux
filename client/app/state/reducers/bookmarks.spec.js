import {bookmarks, bookmark} from './bookmarks.reducers';

describe('Bookmarks', () => {
  describe('`bookmarks` reducer', () => {
    let initialState = [
      {id: 0, title: 'AngularJS' },
      {id: 1, title: 'Egghead.io' }
    ];

    it('unkown action should return state', () => {
      let result = bookmarks(initialState, { type: 'random', payload: {} });
      expect(result).toBe(initialState);
    });

    it('should return empty array for state by default', () => {
      let result = bookmarks(undefined, { type: 'random', payload: {} });
      expect(result).toEqual([]);
    });

    it('`GET_BOOKMARKS` should return the payload', () => {
      let result = bookmarks(undefined, {
        type: 'GET_BOOKMARKS',
        payload: initialState
      });

      expect(result).toEqual(initialState);
    });

    it('`CREATE_BOOKMARK` should return state with added object', () => {
      let newBookmark = { id: 2, title: 'A List Apart' },
          nextState = [ ...initialState, newBookmark ],
          result = bookmarks(initialState, {
            type: 'CREATE_BOOKMARK',
            payload: newBookmark
          });

      expect(result).toEqual(nextState);
    });

    it('`EDIT_BOOKMARK` should return state with replaced object', () => {
      let updatedBookmark = { id: 0, title: 'AngularJS updated' },
        result = bookmarks(initialState, {
          type: 'EDIT_BOOKMARK',
          payload: updatedBookmark
        });

      expect(result[0].title).toBe(updatedBookmark.title);
    });

    it('`DELETE_BOOKMARK` should return state without object', () => {
      let deletedBookmark = { id: 0, title: 'AngularJS' },
        result = bookmarks(initialState, {
          type: 'DELETE_BOOKMARK',
          payload: deletedBookmark
        });

      expect(result).not.toContain(deletedBookmark);
    });
  });

  describe('`bookmark` reducer', () => {
    let initialState = { id: 0, title: 'AngularJS' },
        initializedBookmark = { id: null, title: '', url: '', category: null };

    it('unkown action should return state', () => {
      let result = bookmark(initialState, { type: 'random', payload: {} });
      expect(result).toBe(initialState);
    });

    it('should return initialized object for state by default', () => {
      let result = bookmark(undefined, { type: 'random', payload: {} });

      expect(result).toEqual(initializedBookmark);
    });

    it('`GET_SELECTED_BOOKMARK` returns the payload if defined', () => {
      let selectedBookmark = {id: 1, title: 'Egghead.io' },
          result = bookmark(initialState, {
            type: 'GET_SELECTED_BOOKMARK',
            payload: selectedBookmark
          }),
          fallbackResult = bookmark(initialState, {
            type: 'GET_SELECTED_BOOKMARK',
            payload: undefined
          });

      expect(result).toEqual(selectedBookmark);
      expect(fallbackResult).toEqual(initialState);
    });

    it('`RESET_SELECTED_BOOKMARK` returns initialized object', () => {
      let result = bookmark(initialState, { type: 'RESET_SELECTED_BOOKMARK' });

      expect(result).toEqual(initializedBookmark);
    });
  });
});
