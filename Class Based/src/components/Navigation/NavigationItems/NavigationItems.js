import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css'

const classes = 'NavigationItems'

const navigationItems = (props) => {
    return (
        <ul className={classes}>
            <NavigationItem link='/' exact>
                Burger Builder
            </NavigationItem>
            {props.isAuth ? <NavigationItem link='/orders'>Orders</NavigationItem> : null}
            {props.isAuth ? (
                <NavigationItem link='/logout'>Logout</NavigationItem>
            ) : (
                <NavigationItem link='/auth'>Authenticate</NavigationItem>
            )}
        </ul>
    )
}
export default navigationItems
