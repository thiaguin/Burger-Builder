import React, { useState, useEffect, useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler'
import * as actions from '../../store/actions/index'

const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false)
    const dispatch = useDispatch()
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch])

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const updatePurchasable = (ingredients) => {
        const sum = Object.values(ingredients).reduce((sum, el) => (sum += el), 0)
        return sum > 0
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true)
        } else {
            props.onAuthRedirect('/checkout')
            props.history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase()
        props.history.push('/checkout')
    }

    const disableInfo = {}
    let orderSummary = null
    let burger = props.error ? (
        <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p>
    ) : (
        <Spinner />
    )

    if (props.ingredients) {
        for (const ingredient of Object.keys(props.ingredients)) {
            disableInfo[ingredient] = props.ingredients[ingredient] <= 0
        }
        burger = (
            <Aux>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    addIngredients={props.onIngredientsAdded}
                    removeIngredients={props.onIngredientsRemoved}
                    disabled={disableInfo}
                    price={props.price}
                    ordered={purchaseHandler}
                    isAuth={props.isAuthenticated}
                    purchasable={updatePurchasable(props.ingredients)}
                />
            </Aux>
        )

        orderSummary = (
            <OrderSummary
                price={props.price}
                cancelingPurchase={purchaseCancelHandler}
                continuingPurchase={purchaseContinueHandler}
                ingredients={props.ingredients}
            />
        )
    }

    return (
        <Aux>
            <Modal show={purchasing} closing={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        purchasable: state.burgerBuilder.purchasable,
        error: state.burgerBuilder.error,
        isAuthenticated: !!state.auth.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientsAdded: (name) => dispatch(actions.addIngredient(name)),
        onIngredientsRemoved: (name) => dispatch(actions.removeIngredient(name)),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onAuthRedirect: (path) => dispatch(actions.authRedirectPath(path)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
