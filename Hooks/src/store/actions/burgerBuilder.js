import * as actionTypes from './actionTypes'

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

export const initIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.INIT_INGREDIENTS_SUCCESS,
        ingredientsFetched: ingredients,
    }
}

export const initIngredientsFail = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS_FAIL,
    }
}

export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
    }
}
