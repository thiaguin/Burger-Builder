import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToogle from '../SideDrawer/DrawerToglle/DrawerToggle'
import './Toolbar.css'

const toolbar = (props) => {
    const classes = 'Toolbar'
    return (
        <header className={classes}>
            <DrawerToogle clicked={props.clicked} />
            <div className='LogoToolbar'>
                <Logo />
            </div>
            <nav className='DesktopOnly'>
                <NavigationItems isAuth={props.isAuth} />
            </nav>
        </header>
    )
}

export default toolbar
