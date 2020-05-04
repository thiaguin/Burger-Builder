import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from '../../axios-orders'

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('/ingredients.json')
        yield put(actions.initIngredientsSuccess(response.data))
    } catch (error) {
        yield put(actions.initIngredientsFail())
    }
}
