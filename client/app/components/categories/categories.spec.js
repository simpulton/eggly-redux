import {categories, category} from './categories.reducers';

describe('Categories', () => {
  describe('`categories` reducer', () => {
    let initialState = [
      {id: 0, name: 'Development'},
      {id: 1, name: 'Design'}
    ];

    it('unkown action should return state', () => {
      let result = categories(initialState, { type: 'random', payload: {} });
      expect(result).toBe(initialState);
    });

    it('should return empty array for state by default', () => {
      let result = categories(undefined, { type: 'random', payload: {} });
      expect(result).toEqual([]);
    });

    it('`GET_CATEGORIES` returns the payload', () => {
      let result = categories(undefined, {
        type: 'GET_CATEGORIES',
        payload: initialState
      });

      expect(result).toEqual(initialState);
    });
  });

  describe('`category` reducer', () => {
    let initialState = { id: 0, name: 'Development' };

    it('unkown action should return state', () => {
      let result = category(initialState, { type: 'random', payload: {} });
      expect(result).toBe(initialState);
    });

    it('should return empty object for state by default', () => {
      let result = category(undefined, { type: 'random', payload: {} });
      expect(result).toEqual({});
    });

    it('`SET_CURRENT_CATEGORY` returns the payload if defined', () => {
      let newCategory = { id: 1, name: 'Design' },
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
