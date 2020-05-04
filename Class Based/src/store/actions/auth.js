import * as actionTypes from './actionTypes'
import axios from 'axios'

const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

const authSuccess = (data) => {
    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
    localStorage.setItem('token', data.idToken)
    localStorage.setItem('expirationDate', expirationDate)
    localStorage.setItem('userId', data.localId)

    return {
        type: actionTypes.AUTH_SUCCESS,
        token: data.idToken,
        userId: data.localId,
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')

    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

const authLogoutAsync = (expiresTime) => {
    return (dispatch) => {
        setTimeout(() => dispatch(authLogout()), expiresTime * 1000)
    }
}

export const auth = (username, password, isSignIn) => {
    const authData = {
        email: username,
        password: password,
        returnSecureToken: true,
    }
    const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_APP_KEY}`
    const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_APP_KEY}`

    const url = isSignIn ? signInUrl : signUpUrl

    return (dispatch) => {
        dispatch(authStart())
        axios
            .post(url, authData)
            .then((response) => {
                dispatch(authSuccess(response.data))
                dispatch(authLogoutAsync(response.data.expiresIn))
            })
            .catch((error) => {
                dispatch(authFail(error.response.data.error.message))
            })
    }
}

export const authRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path,
    }
}

export const authCheck = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token')

        if (token) {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            const dateNow = new Date()
            if (expirationDate > dateNow) {
                const expiresIn = (expirationDate.getTime() - dateNow.getTime()) / 1000
                const data = {
                    localId: localStorage.getItem('userId'),
                    idToken: token,
                    expiresIn: expiresIn,
                }
                dispatch(authSuccess(data))
                dispatch(authLogoutAsync(expiresIn))
            } else {
                dispatch(authLogout())
            }
        } else {
            dispatch(authLogout())
        }
    }
}
