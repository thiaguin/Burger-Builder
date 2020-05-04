import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { validateForm } from '../../util/util'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Aux'
import * as actions from '../../store/actions/index'
import './Auth.css'

class Auth extends Component {
    state = {
        controls: {
            name: {
                elementType: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Username',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                config: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 15,
                },
                valid: false,
                touched: false,
            },
        },
        validForm: false,
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.redirectPath !== '/') {
            this.props.onAuthRedirect()
        }
    }

    inputChangeHandler = (event, inputElement) => {
        const rules = this.state.controls[inputElement].validation
        const updatedControls = {
            ...this.state.controls,
            [inputElement]: {
                ...this.state.controls[inputElement],
                value: event.target.value,
                valid: validateForm(event.target.value, rules),
                touched: true,
            },
        }

        const otherElement = inputElement === 'name' ? 'password' : 'name'
        const validOtherElement = this.state.controls[otherElement].valid
        const validThisElement = updatedControls[inputElement].valid

        this.setState({
            controls: updatedControls,
            validForm: validThisElement && validOtherElement,
        })
    }

    signinHandler = () => {
        const username = this.state.controls.name.value
        const password = this.state.controls.password.value
        this.props.onAuthSubmit(username, password, true)
    }

    signupHandler = () => {
        const username = this.state.controls.name.value
        const password = this.state.controls.password.value
        this.props.onAuthSubmit(username, password, false)
    }

    render() {
        const inputs = []

        for (const key in this.state.controls) {
            const input = (
                <Input
                    key={key}
                    elementType={this.state.controls[key].elementType}
                    config={this.state.controls[key].config}
                    value={this.state.controls[key].value}
                    invalid={!this.state.controls[key].valid}
                    shouldValidate={this.state.controls[key].validation}
                    touched={this.state.controls[key].touched}
                    changed={(event) => this.inputChangeHandler(event, key)}
                />
            )
            inputs.push(input)
        }

        let form = (
            <div className='Auth'>
                <form onSubmit={this.submitHandler}>{inputs.length > 0 ? inputs : null}</form>
                <Button
                    btnType='Normal'
                    disabled={!this.state.validForm}
                    clicked={this.signupHandler}
                >
                    Sign Up
                </Button>
                <Button
                    btnType='Success'
                    disabled={!this.state.validForm}
                    clicked={this.signinHandler}
                >
                    Sign In
                </Button>
            </div>
        )

        if (this.props.loading) {
            form = <Spinner />
        }

        let error = null

        if (this.props.error) {
            error = <p style={{ textAlign: 'center' }}>{this.props.error}</p>
        }

        let isAuthenticated = null

        if (this.props.isAuthenticated) {
            isAuthenticated = <Redirect to={this.props.redirectPath} />
        }

        return (
            <Aux>
                {isAuthenticated}
                {form}
                {error}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token,
        buildingBurger: state.burgerBuilder.building,
        redirectPath: state.auth.redirectPath,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthSubmit: (username, password, isSignIn) =>
            dispatch(actions.auth(username, password, isSignIn)),
        onAuthRedirect: () => dispatch(actions.authRedirectPath('/')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
