import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
}

const purchaseInit = (state) => {
    return {
        ...state,
        purchased: false,
    }
}

const purchaseBurgerStart = (state) => {
    return {
        ...state,
        loading: true,
    }
}

const purchaseBurgerSuccess = (state, action) => {
    return {
        ...state,
        orders: [...state.orders, { ...action.orderData, id: action.orderId }],
        loading: false,
        purchased: true,
    }
}

const purchaseBurgerFail = (state) => {
    return {
        ...state,
        loading: false,
    }
}

const fetchedOrdersStart = (state) => {
    return {
        ...state,
        loading: true,
    }
}

const fetchedOrdersSuccess = (state, action) => {
    const orders = []
    const data = action.fetchedOrders

    for (const key in data) {
        orders.push({ ...data[key], id: key })
    }

    return {
        ...state,
        loading: false,
        orders: orders,
    }
}

const fetchedOrdersFail = (state) => {
    return {
        ...state,
        loading: false,
    }
}

const defaultState = (state) => {
    return {
        ...state,
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state)
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state)
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state)
        case actionTypes.FETCH_ORDERS_START:
            return fetchedOrdersStart(state)
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchedOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchedOrdersFail(state)
        default:
            return defaultState(state)
    }
}

export default reducer
