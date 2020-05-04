import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import './Layout.css'

let classes = 'Content'

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState({
            showSideDrawer: !this.state.showSideDrawer,
        })
    }
    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticate}
                    clicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticate}
                    open={this.state.showSideDrawer}
                    closing={this.closeSideDrawerHandler}
                />
                <main className={classes}>{this.props.children}</main>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticate: !!state.auth.token,
    }
}

export default connect(mapStateToProps)(Layout)
