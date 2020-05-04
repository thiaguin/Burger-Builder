import React, { Component } from 'react'
import { connect } from 'react-redux'
import { validateForm } from '../../../util/util'
import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../../hoc/withErrorHandler'
import axios from '../../../axios-orders'
import * as actions from '../../../store/actions/index'
import './ContactData.css'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your Email',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            postalCode: {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Postal Code',
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 8,
                    minLength: 8,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            delivery: {
                elementType: 'select',
                config: {
                    options: [
                        { value: 'fastest', displayName: 'Fastest' },
                        { value: 'cheapset', displayName: 'Cheapest' },
                    ],
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
        },
        loading: false,
        validFormData: false,
    }

    orderHandler = (event) => {
        event.preventDefault()
        const formData = {}
        for (const key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId,
        }

        this.props.onBurgerPurchase(order, this.props.token)
    }

    inputChangeHandler = (event, inputElement) => {
        const updatedOrderForm = { ...this.state.orderForm }
        const rules = updatedOrderForm[inputElement].validation
        const { value } = event.target
        let validForm = true

        updatedOrderForm[inputElement].value = value
        updatedOrderForm[inputElement].valid = validateForm(value, rules)
        updatedOrderForm[inputElement].touched = true

        for (const key in updatedOrderForm) {
            const value = updatedOrderForm[key]
            validForm = validForm && value.valid
        }

        this.setState({ orderForm: updatedOrderForm, validFormData: validForm })
    }

    render() {
        const inputs = []

        for (const key in this.state.orderForm) {
            const input = (
                <Input
                    key={key}
                    elementType={this.state.orderForm[key].elementType}
                    config={this.state.orderForm[key].config}
                    value={this.state.orderForm[key].value}
                    invalid={!this.state.orderForm[key].valid}
                    shouldValidate={this.state.orderForm[key].validation}
                    touched={this.state.orderForm[key].touched}
                    changed={(event) => this.inputChangeHandler(event, key)}
                />
            )
            inputs.push(input)
        }

        let form = (
            <form>
                {inputs.length > 0 ? inputs : null}
                <Button
                    btnType='Success'
                    disabled={!this.state.validFormData}
                    clicked={this.orderHandler}
                >
                    Order
                </Button>
            </form>
        )

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className='ContactData'>
                <h4>Please enter with your datas!</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBurgerPurchase: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
