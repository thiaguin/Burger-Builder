import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const Checkout = (props) => {
    const cancelHandler = () => {
        props.history.goBack()
    }

    const continueHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    const contactData = (props) => (
        <ContactData ingredients={props.ingredients} price={props.price} {...props} />
    )

    let checkout = <Redirect to='/' />

    if (Object.keys(props.ingredients).length && !props.purchased) {
        checkout = (
            <div>
                <CheckoutSummary
                    ingredients={props.ingredients}
                    cancelling={cancelHandler}
                    continuing={continueHandler}
                />
                <Route
                    path={props.match.url + '/contact-data'}
                    render={(props) => contactData(props)}
                />
            </div>
        )
    }

    return checkout
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        purchased: state.order.purchased,
    }
}

export default connect(mapStateToProps)(Checkout)
