import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler'
import * as actions from '../../store/actions/index'

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    render() {
        let orders = <Spinner />
        const isAuth = !!this.props.token

        if (!this.props.loading && isAuth) {
            orders = this.props.orders.map((order) => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
            })
        }

        return <div>{orders}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
