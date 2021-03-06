import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from '../../axios-orders'

export function* purchaseBurgerSaga(action) {
    try {
        yield put(actions.purchaseBurgerStart())
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData)
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData))
    } catch (error) {
        yield put(actions.purchaseBurgerFail())
    }
}

export function* fetchOrdersSaga(action) {
    try {
        yield put(actions.fetchOrdersStart())
        const queryParams =
            '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"'
        const response = yield axios.get('/orders.json' + queryParams)
        yield put(actions.fetchOrdersSuccess(response.data))
    } catch (error) {
        yield put(actions.fetchOrdersFail())
    }
}
