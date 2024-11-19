// actions.js
export const setAuthToken = (token) => ({
    type: 'SET_AUTH_TOKEN',
    payload: token,
  });
  
  // Example reducer for auth state
  const initialState = {
    authToken: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTH_TOKEN':
        return {
          ...state,
          authToken: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  