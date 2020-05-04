import React, { useState, useEffect, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import { validateForm } from '../../util/util'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import Aux from '../../hoc/Aux'
import * as actions from '../../store/actions/index'
import './Auth.css'

const Auth = (props) => {
    const controlsObj = {
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
    }

    const dispatch = useDispatch()

    const [controls, setControls] = useState(controlsObj)
    const [validForm, setValidForm] = useState(false)

    const buildingBurger = useSelector((state) => state.burgerBuilder.building)
    const redirectPath = useSelector((state) => state.auth.redirectPath)
    const onAuthRedirect = useCallback(() => dispatch(actions.authRedirectPath('/')), [dispatch])

    useEffect(() => {
        if (!buildingBurger && redirectPath !== '/') {
            onAuthRedirect()
        }
    }, [buildingBurger, redirectPath, onAuthRedirect])

    const inputChangeHandler = (event, inputElement) => {
        const rules = controls[inputElement].validation
        const updatedControls = {
            ...controls,
            [inputElement]: {
                ...controls[inputElement],
                value: event.target.value,
                valid: validateForm(event.target.value, rules),
                touched: true,
            },
        }

        const otherElement = inputElement === 'name' ? 'password' : 'name'
        const validOtherElement = controls[otherElement].valid
        const validThisElement = updatedControls[inputElement].valid

        setControls(updatedControls)
        setValidForm(validThisElement && validOtherElement)
    }

    const signinHandler = () => {
        const username = controls.name.value
        const password = controls.password.value
        props.onAuthSubmit(username, password, true)
    }

    const signupHandler = () => {
        const username = controls.name.value
        const password = controls.password.value
        props.onAuthSubmit(username, password, false)
    }

    const inputs = []

    for (const key in controls) {
        const input = (
            <Input
                key={key}
                elementType={controls[key].elementType}
                config={controls[key].config}
                value={controls[key].value}
                invalid={!controls[key].valid}
                shouldValidate={controls[key].validation}
                touched={controls[key].touched}
                changed={(event) => inputChangeHandler(event, key)}
            />
        )
        inputs.push(input)
    }

    let form = (
        <div className='Auth'>
            <form>{inputs.length > 0 ? inputs : null}</form>
            <Button btnType='Normal' disabled={!validForm} clicked={signupHandler}>
                Sign Up
            </Button>
            <Button btnType='Success' disabled={!validForm} clicked={signinHandler}>
                Sign In
            </Button>
        </div>
    )

    if (props.loading) {
        form = <Spinner />
    }

    let error = null

    if (props.error) {
        error = <p style={{ textAlign: 'center' }}>{props.error}</p>
    }

    let isAuthenticated = null

    if (props.isAuthenticated) {
        isAuthenticated = <Redirect to={redirectPath} />
    }

    return (
        <Aux>
            {isAuthenticated}
            {form}
            {error}
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthSubmit: (username, password, isSignIn) =>
            dispatch(actions.auth(username, password, isSignIn)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
