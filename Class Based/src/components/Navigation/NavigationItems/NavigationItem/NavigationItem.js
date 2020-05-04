import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavigationItem.css'

const classes = 'NavigationItem'

const navigationItem = props => {
    return (
        <li className={classes}>
            <NavLink 
                to={props.link} 
                exact 
                activeClassName='active'>
                    {props.children}
            </NavLink>
        </li>
    )
}

export default navigationItem