const initialState = {
    email: ''
}

const emailAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        // Define cases for actions that may update the email state
        case 'SET_EMAIL':
          return {
            ...state,
            email: action.payload, // Update the email property with the payload
        };
        // Add more cases for other actions as needed
        default:
          return state;
      }
}
export default emailAuthReducer;