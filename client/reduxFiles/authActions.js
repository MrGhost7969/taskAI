export const setEmail = (emailInput) => {
    return {
        type: 'SET_EMAIL',
        payload: emailInput,
    };
};

export const setPassword = (passwordInput) => {
    return {
        type: 'USER_LOGIN_SUCCESS',
        payload: passwordInput,
    }
}