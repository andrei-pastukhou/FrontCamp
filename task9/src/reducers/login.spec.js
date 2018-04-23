import login from './login'

describe('login reducer', () => {
    it('should handle initial state', () => {
        expect(
        login(undefined, {})
        ).toEqual(
            {
                isLogin: false,
                token: '',
                message: '',
                pending: false,
                username: '',
            }
        )
    });
    it('should handle LOGIN', () => {
        expect(
        login([], {
            type: 'LOGIN',
        })
        ).toEqual(
            {
                isLogin: false,
                pending: true,
            }
        )
    });
    it('should handle LOGIN_SUCCSESS', () => {
        expect(
        login([], {
            type: 'LOGIN_SUCCSESS',
            token: 'test_token',
            username: 'test_username'
        })
        ).toEqual(
            {
                isLogin: true,
                pending: false,
                token: 'test_token',
                message: '',
                username: 'test_username'
            }
        )
    });
    it('should handle LOGIN_ERROR', () => {
        expect(
        login([], {
            type: 'LOGIN_ERROR',
            message: 'test error login',

        })
        ).toEqual(
            {
                isLogin: false,
                pending: false,
                token: '',
                message: 'test error login',
                username: ''
            }
        )
    });
    it('should handle LOGOUT', () => {
        expect(
        login([], {
            type: 'LOGOUT',
            message: 'test error login',

        })
        ).toEqual(
            {
                isLogin: false,
                pending: false,
                token: '',
                message: '',
                username: ''
            }
        )
    });
});

describe('login reduxer with snapshots ', () => {
    it('+++ reducer with shapshot', () => {
      expect(login(undefined, { type: 'default' })).toMatchSnapshot();
    });
  
    it('+++ reducer with shapshot', () => {
      const action = {
        type: 'LOGIN',
      };
      expect(login(undefined, action)).toMatchSnapshot();
    });
   
    it('should handle LOGIN_SUCCSESS', () => {
        const action = {
            type: 'LOGIN_SUCCSESS',
            token: 'test_token',
            username: 'test_username'
        }
        expect(login(undefined, action)).toMatchSnapshot();
    });
    it('should handle LOGIN_ERROR', () => {
        const action = {
            type: 'LOGIN_ERROR',
            message: 'test error login',
        }
        expect(login(undefined, action)).toMatchSnapshot();
    });
    it('should handle LOGOUT', () => {
        const action =  {
            type: 'LOGOUT',
            message: 'test error login',
        }
        expect(login(undefined, action)).toMatchSnapshot();
    });
  });