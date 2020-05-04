import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    cancelHandler = () => {
        this.props.history.goBack()
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        const contactData = (props) => (
            <ContactData ingredients={this.props.ingredients} price={this.props.price} {...props} />
        )

        let checkout = <Redirect to='/' />

        if (Object.keys(this.props.ingredients).length && !this.props.purchased) {
            checkout = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        cancelling={this.cancelHandler}
                        continuing={this.continueHandler}
                    />
                    <Route
                        path={this.props.match.url + '/contact-data'}
                        render={(props) => contactData(props)}
                    />
                </div>
            )
        }

        return checkout
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        purchased: state.order.purchased,
    }
}

export default connect(mapStateToProps)(Checkout)
