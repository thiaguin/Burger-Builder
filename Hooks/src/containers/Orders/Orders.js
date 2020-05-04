import React, { useEffect, useCallback } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler'
import * as actions from '../../store/actions/index'

const Orders = (props) => {
    const token = useSelector((state) => state.auth.token)
    const userId = useSelector((state) => state.auth.userId)
    const dispatch = useDispatch()

    const onFetchOrders = useCallback(
        (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        [dispatch]
    )

    useEffect(() => {
        onFetchOrders(token, userId)
    }, [token, userId, onFetchOrders])

    let orders = <Spinner />
    const isAuth = !!token

    if (!props.loading && isAuth) {
        orders = props.orders.map((order) => {
            return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        })
    }

    return <div>{orders}</div>
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
    }
}

export default connect(mapStateToProps)(withErrorHandler(Orders, axios))
