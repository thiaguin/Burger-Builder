import { takeEvery, all } from 'redux-saga/effects'
import { initIngredientsSaga } from './burgerBuilder'
import { fetchOrdersSaga, purchaseBurgerSaga } from './order'
import { authSaga, authCheckSaga, logoutSaga, authLogoutAsyncSaga } from './auth'
import * as actionTypes from '../actions/actionTypes'

export function* watchBurgerBuilder() {
    yield all([takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)])
}

export function* watchOrders() {
    yield all([
        takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga),
        takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
    ])
}

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_LOGOUT_ASYNC, authLogoutAsyncSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authSaga),
        takeEvery(actionTypes.AUTH_CHECK, authCheckSaga),
    ])
}
