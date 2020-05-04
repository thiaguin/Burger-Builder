import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: data.idToken,
        userId: data.localId,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT,
    }
}

export const authLogoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const authLogoutAsync = (expiresTime) => {
    return {
        type: actionTypes.AUTH_LOGOUT_ASYNC,
        expiresTime: expiresTime,
    }
}

export const auth = (username, password, isSignIn) => {
    return {
        type: actionTypes.AUTH_USER,
        username: username,
        password: password,
        isSignIn: isSignIn,
    }
}

export const authRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path,
    }
}

export const authCheck = () => {
    return {
        type: actionTypes.AUTH_CHECK,
    }
}
