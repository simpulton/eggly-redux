import { bookmarks, bookmark } from './bookmarks.state';

describe('Bookmarks', () => {
  describe('bookmarks reducer', () => {
    const initialState = [
      { id: 0, title: 'AngularJS' },
      { id: 1, title: 'Egghead.io' }
    ];

    it('should return state with an unknown action', () => {
      const result = bookmarks(initialState, { type: 'random', payload: {} });
      expect(result).toBe(initialState);
    });

    it('should return empty array for state by default', () => {
      const result = bookmarks(undefined, { type: 'random', payload: {} });
      expect(result).toEqual([]);
    });

    it('should return correct payload on GET_BOOKMARKS action', () => {
      const result = bookmarks(undefined, {
        type: 'GET_BOOKMARKS',
        payload: initialState
      });

      expect(result).toBe(initialState);
    });

    it('should return state with added bookmark on CREATE_BOOKMARK action', () => {
      const newBookmark = { id: 2, title: 'A List Apart' },
        nextState = [ ...initialState, newBookmark ],
        result = bookmarks(initialState, {
          type: 'CREATE_BOOKMARK',
          payload: newBookmark
        });

      expect(result).toEqual(nextState);
    });

    it('should return state with updated object on EDIT_BOOKMARK action', () => {
      const updatedBookmark = { id: 0, title: 'AngularJS Updated' },
        result = bookmarks(initialState, {
          type: 'UPDATE_BOOKMARK',
          payload: updatedBookmark
        });

      expect(result[0].title).toBe(updatedBookmark.title);
    });

    it('should return state without object on DELETE_BOOKMARK action', () => {
      const deletedBookmark = { id: 0, title: 'AngularJS' },
        result = bookmarks(initialState, {
          type: 'DELETE_BOOKMARK',
          payload: deletedBookmark
        });

      expect(result).not.toContain(deletedBookmark);
    });
  });

  describe('bookmark reducer', () => {
    const initialState = { id: 0, title: 'AngularJS' },
      initializedBookmark = { id: null, name: '', url: '', category: null };

    it('should return state with an unknown action', () => {
      const result = bookmark(initialState, { type: 'random', payload: {} });
      expect(result).toEqual(initialState);
    });

    it('should return initialized bookmark for state by default', () => {
      const result = bookmark(undefined, { type: 'random', payload: {} });

      expect(result).toEqual(initializedBookmark);
    });

    it('should return the correct payload for GET_SELECTED_BOOKMARK action', () => {
      const selectedBookmark = { id: 1, title: 'Egghead.io' },
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

    it('should return initialized bookmark for RESET_SELECTED_BOOKMARK action', () => {
      const result = bookmark(initialState, { type: 'RESET_SELECTED_BOOKMARK' });

      expect(result).toEqual(initializedBookmark);
    });
  });
});