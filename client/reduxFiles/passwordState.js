const initialState = {
    isAuthenticated: false,
};

const passwordAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_SUCCESS':
          return {
            ...state,
            isAuthenticated: true,
          };
        case 'USER_LOGOUT':
          return {
            ...state,
            isAuthenticated: false,
          };
        // Other cases for different actions
        default:
          return state;
      }
}

export default passwordAuthReducer