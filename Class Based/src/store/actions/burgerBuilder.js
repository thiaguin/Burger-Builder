import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    }
}

const initIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.INIT_INGREDIENTS_SUCCESS,
        ingredientsFetched: ingredients,
    }
}

const initIngredientsFail = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS_FAIL,
    }
}

export const initIngredients = () => {
    return (dispatch) => {
        axios
            .get('/ingredients.json')
            .then((response) => {
                dispatch(initIngredientsSuccess(response.data))
            })
            .catch((error) => {
                dispatch(initIngredientsFail())
            })
    }
}
