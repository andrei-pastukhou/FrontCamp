import reducer from './register'
const initialState = {
    message: '',
    pending: false,
}

describe('register reducer', () => {
    it('should handle initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(initialState)
    });
    it('should handle REGISTER', () => {
        expect(
            reducer(initialState, {
                    type: 'REGISTER',
                })
        ).toEqual({
            message: '',
            pending: true,
        })
    });
    it('should handle REGISTER_SUCCSESS', () => {
        expect(
            reducer(initialState, {
                type: 'REGISTER_SUCCSESS',
                message: 'test message'
            })
        ).toEqual( {
            pending: false,
            message: 'test message'
        })
    });
    it('should handle REGISTER_ERROR', () => {
        expect(
            reducer(initialState, {
                type: 'REGISTER_ERROR',
                message: 'test error message'
            })
        ).toEqual( {
            pending: false,
            message: 'test error message'
        })
    });
});
