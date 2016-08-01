import {categories, category} from './categories.state';

describe('Categories', () => {
  describe('`categories` reducer', () => {
    const initialState = [
      {id: 0, name: 'Development'},
      {id: 1, name: 'Design'}
    ];

    it('unkown action should return state', () => {
      const result = categories(initialState, { type: 'random', payload: {} });
      expect(result).toBe(initialState);
    });

    it('should return empty array for state by default', () => {
      const result = categories(undefined, { type: 'random', payload: {} });
      expect(result).toEqual([]);
    });

    it('`GET_CATEGORIES` returns the payload', () => {
      const result = categories(undefined, {
        type: 'GET_CATEGORIES',
        payload: initialState
      });

      expect(result).toEqual(initialState);
    });
  });

  describe('`category` reducer', () => {
    const initialState = { id: 0, name: 'Development' };

    it('unkown action should return state', () => {
      const result = category(initialState, { type: 'random', payload: {} });
      expect(result).toBe(initialState);
    });

    it('should return empty object for state by default', () => {
      const result = category(undefined, { type: 'random', payload: {} });
      expect(result).toEqual({});
    });

    it('`SET_CURRENT_CATEGORY` returns the payload if defined', () => {
      const newCategory = { id: 1, name: 'Design' },
          result = category(initialState, {
            type: 'SET_CURRENT_CATEGORY',
            payload: newCategory
          }),
          emptyResult = category(initialState, {
            type: 'SET_CURRENT_CATEGORY',
            payload: undefined
          });

      expect(result).toEqual(newCategory);
      expect(emptyResult.name).toBeUndefined();
    });
  });
});
