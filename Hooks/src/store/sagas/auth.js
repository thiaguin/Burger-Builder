import { put, delay } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from 'axios'

export function* logoutSaga(action) {
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('expirationDate')
    yield localStorage.removeItem('userId')

    yield put(actions.authLogoutSucceed())
}

export function* authLogoutAsyncSaga(action) {
    yield delay(action.expiresTime * 1000)
    yield put(actions.authLogout())
}

export function* authSaga(action) {
    const authData = {
        email: action.username,
        password: action.password,
        returnSecureToken: true,
    }
    const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_APP_KEY}`
    const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_APP_KEY}`

    const url = action.isSignIn ? signInUrl : signUpUrl

    try {
        yield put(actions.authStart())
        const response = yield axios.post(url, authData)

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)

        yield localStorage.setItem('token', response.data.idToken)
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', response.data.localId)

        yield put(actions.authSuccess(response.data))
        yield put(actions.authLogoutAsync(response.data.expiresIn))
    } catch (error) {
        yield put(actions.authFail(error.response.data.error.message))
    }
}

export function* authCheckSaga(action) {
    const token = yield localStorage.getItem('token')

    if (token) {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
        const dateNow = yield new Date()

        if (expirationDate > dateNow) {
            const expiresIn = yield (expirationDate.getTime() - dateNow.getTime()) / 1000
            const data = {
                localId: localStorage.getItem('userId'),
                idToken: token,
                expiresIn: expiresIn,
            }

            yield put(actions.authSuccess(data))
            yield put(actions.authLogoutAsync(expiresIn))
        } else {
            yield put(actions.authLogout())
        }
    } else {
        yield put(actions.authLogout())
    }
}
