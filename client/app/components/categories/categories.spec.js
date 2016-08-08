import { categories, category } from './categories.state';

describe('Categories', () => {
  describe('categories reducer', () => {
    const initialState = [
      { id: 0, name: 'Development' },
      { id: 1, name: 'Design' }
    ];

    it('should return state with an unknown action', () => {
      const result = categories(initialState, { type: 'random', payload: {} });
      expect(result).toBe(initialState);
    });

    it('should return an empty array for state by default', () => {
      const result = categories(undefined, { type: 'random', payload: {} });
      expect(result).toEqual([]);
    });

    it('should return correct payload on SET_CATEGORIES action', () => {
      const result = categories(undefined, { type: 'GET_CATEGORIES', payload: initialState });
      expect(result).toBe(initialState);
    });
  });

  describe('category reducer', () => {
    const initialState = { id: 0, name: 'Development' };

    it('should return state with an unknown action', () => {
      const result = category(initialState, { type: 'random', payload: {} });
      expect(result).toBe(initialState);
    });

    it('should return empty object for state by default', () => {
      const result = category(undefined, { type: 'random', payload: {} });
      expect(result).toEqual({});
    });

    it('should return correct payload on SET_CURRENT_CATEGORY action', () => {
      const newCategory = { id: 1, name: 'Design' },
        result = category(initialState, {
          type: 'GET_CURRENT_CATEGORY',
          payload: newCategory
        }),
        emptyResult = category(initialState, {
          type: 'GET_CURRENT_CATEGORY',
          payload: undefined
        });

      expect(result).toBe(newCategory);
      expect(emptyResult.name).toBeUndefined();
    });
  });
});