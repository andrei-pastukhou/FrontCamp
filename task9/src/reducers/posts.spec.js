import posts from './posts'

describe('posts reducer', () => {
    it('should handle initial state', () => {
        expect(
            posts(undefined, {})
        ).toEqual([])
    });
    it('should handle ADD_POST_PENDING', () => {
        expect(
            posts([], {
                type: 'ADD_POST_PENDING',
            })
        ).toEqual([])
    });
    it('should handle FETCH_POST_SUCCESS', () => {
        expect(
            posts([], {
                type: 'FETCH_POST_SUCCESS',
                posts: ['testpost1', 'testpost2']
            })
        ).toEqual(['testpost1', 'testpost2'])
    });
});

describe('post reduxer with snapshots ', () => {
    it('should handle initial state', () => {
        const action = {}
        expect(posts(undefined, action)).toMatchSnapshot();
    });
    it('should handle ADD_POST_PENDING', () => {
        const action = {
            type: 'ADD_POST_PENDING',
        }
        expect(posts(undefined, action)).toMatchSnapshot();
    });
    it('should handle FETCH_POST_SUCCESS', () => {
        const action = {
            type: 'FETCH_POST_SUCCESS',
            posts: ['testpost1', 'testpost2']
        }
        expect(posts(undefined, action)).toMatchSnapshot();
    });
});