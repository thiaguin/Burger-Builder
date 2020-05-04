import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    price: 4,
    error: false,
    building: false,
}

const INGREDIENTS_PRICE = {
    salad: 1,
    cheese: 1,
    bacon: 1.5,
    meat: 2,
}

const addIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        price: state.price + INGREDIENTS_PRICE[action.ingredientName],
        building: true,
    }
}

const removeIngredient = (state, action) => {
    const qntIngredient = state.ingredients[action.ingredientName]
    const priceUpdated = state.price - INGREDIENTS_PRICE[action.ingredientName]
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: qntIngredient > 0 ? qntIngredient - 1 : 0,
        },
        price: qntIngredient > 0 ? priceUpdated : state.price,
        building: priceUpdated === initialState.price ? false : true,
    }
}

const initIngredientsSuccess = (state, action) => {
    return {
        ...state,
        ingredients: {
            salad: action.ingredientsFetched.salad,
            cheese: action.ingredientsFetched.cheese,
            bacon: action.ingredientsFetched.bacon,
            meat: action.ingredientsFetched.meat,
        },
        price: 4,
        building: false,
    }
}

const initIngredientsFail = (state) => {
    return {
        ...state,
        error: true,
        ingredients: null,
    }
}

const defaultState = (state) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
        },
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action)
        case actionTypes.INIT_INGREDIENTS_SUCCESS:
            return initIngredientsSuccess(state, action)
        case actionTypes.INIT_INGREDIENTS_FAIL:
            return initIngredientsFail(state)
        default:
            return defaultState(state)
    }
}

export default reducer
