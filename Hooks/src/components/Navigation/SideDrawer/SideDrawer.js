import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'
import './SideDrawer.css'

const sideDrawer = (props) => {
    let classes = ['SideDrawer', 'Close']

    if (props.open) {
        classes = ['SideDrawer', 'Open']
    }
    return (
        <Aux>
            <Backdrop show={props.open} close={props.closing} />
            <div className={classes.join(' ')} onClick={props.closing}>
                <div className='LogoSideDrawer'>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer
