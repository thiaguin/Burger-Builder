import React from 'react'
import BurgerLogo from '../../assets/images/burger-logo.png'
import './Logo.css'

const logo = props => {
    const classes = 'Logo'

    return (
        <div className={classes}>
            <img src={BurgerLogo} alt='MyBurger'/>
        </div>
    )
}

export default logo