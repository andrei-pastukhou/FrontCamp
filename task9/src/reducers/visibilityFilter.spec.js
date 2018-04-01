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

describe('visibilityFilter reduxer with snapshots ', () => {
    it('should handle initial state', () => {
        const action = {}
        expect(reducer(undefined, action)).toMatchSnapshot();
    });
    it('should handle FILTER_POST', () => {
        const action = {
            type: 'FILTER_POST',
            author: 'testAuthor'
        }
        expect(reducer(initialState, action)).toMatchSnapshot();
    });
});
