import reducer from './visibilityFilter'
const initialState = ''

describe('visibilityFilter reducer', () => {
    it('should handle initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(initialState)
    });
    it('should handle FILTER_POST', () => {
        expect(
            reducer(initialState, {
                    type: 'FILTER_POST',
                    author: 'testAuthor'
                })
        ).toEqual('testAuthor')
    });
});
