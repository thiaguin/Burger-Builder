import * as actionTypes from '../actions/actionTypes'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirectPath: '/',
}

const authStart = (state) => {
    return {
        ...state,
        loading: true,
    }
}

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        userId: action.userId,
        loading: false,
    }
}

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false,
    }
}

const authLogout = (state) => {
    return {
        ...state,
        error: null,
        token: null,
        userId: null,
        loading: false,
    }
}

const authRedirectPath = (state, action) => {
    return {
        ...state,
        redirectPath: action.path,
    }
}

const defaultCase = (state) => {
    return {
        ...state,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAIL:
            return authFail(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state)
        case actionTypes.AUTH_REDIRECT_PATH:
            return authRedirectPath(state, action)
        default:
            return defaultCase(state)
    }
}

export default reducer
