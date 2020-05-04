import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchasable = (ingredients) => {
        const sum = Object.values(ingredients).reduce((sum, el) => (sum += el), 0)
        return sum > 0
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.onAuthRedirect('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render() {
        const disableInfo = {}
        let orderSummary = null
        let burger = this.props.error ? (
            <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p>
        ) : (
            <Spinner />
        )

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        if (this.props.ingredients) {
            for (const ingredient of Object.keys(this.props.ingredients)) {
                disableInfo[ingredient] = this.props.ingredients[ingredient] <= 0
            }
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        addIngredients={this.props.onIngredientsAdded}
                        removeIngredients={this.props.onIngredientsRemoved}
                        disabled={disableInfo}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        purchasable={this.updatePurchasable(this.props.ingredients)}
                    />
                </Aux>
            )

            orderSummary = (
                <OrderSummary
                    price={this.props.price}
                    cancelingPurchase={this.purchaseCancelHandler}
                    continuingPurchase={this.purchaseContinueHandler}
                    ingredients={this.props.ingredients}
                />
            )
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closing={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
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
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onAuthRedirect: (path) => dispatch(actions.authRedirectPath(path)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
