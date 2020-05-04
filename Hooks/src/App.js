import React, { useEffect, Suspense, useCallback } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Auth from './containers/Auth/Auth'
import Spinner from './components/UI/Spinner/Spinner'

import * as actions from './store/actions/index'

const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders')
})

const Checkout = React.lazy(() => {
    return import('./containers/Checkout/Checkout')
})
const Logout = React.lazy(() => {
    return import('./containers/Auth/Logout/Logout')
})

const App = (props) => {
    const dispatch = useDispatch()
    const onAuthCheck = useCallback(() => dispatch(actions.authCheck()), [dispatch])

    useEffect(() => {
        onAuthCheck()
    }, [onAuthCheck])

    let routes = (
        <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/' component={BurgerBuilder} />
            <Redirect to='/' />
        </Switch>
    )

    if (props.isAuth) {
        routes = (
            <Switch>
                <Route path='/orders' component={(props) => <Orders {...props} />} />
                <Route path='/checkout' render={(props) => <Checkout {...props} />} />
                <Route path='/auth' component={Auth} />
                <Route path='/logout' render={(props) => <Logout {...props} />} />
                <Route path='/' component={BurgerBuilder} />
            </Switch>
        )
    }
    return (
        <div>
            <Layout>
                <Suspense fallback={<Spinner />}>{routes}</Suspense>
            </Layout>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: !!state.auth.token,
    }
}

export default withRouter(connect(mapStateToProps)(App))
