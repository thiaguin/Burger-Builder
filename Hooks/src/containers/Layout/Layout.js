import React, { useState } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import './Layout.css'

let classes = 'Content'

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const closeSideDrawerHandler = () => {
        setShowSideDrawer(false)
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer((previousShowSideDrawer) => !previousShowSideDrawer)
    }
    return (
        <Aux>
            <Toolbar isAuth={props.isAuthenticate} clicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={props.isAuthenticate}
                open={showSideDrawer}
                closing={closeSideDrawerHandler}
            />
            <main className={classes}>{props.children}</main>
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticate: !!state.auth.token,
    }
}

export default connect(mapStateToProps)(Layout)
