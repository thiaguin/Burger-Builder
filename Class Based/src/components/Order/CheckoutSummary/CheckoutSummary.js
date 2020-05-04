import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div className='CheckoutSummary'>
            <h1>Hope this taste well!</h1>
            <Burger style={{width: '100%', margin: 'auto'}}ingredients={props.ingredients}/>
            <Button btnType='Danger' clicked={props.cancelling}>Cancel</Button>
            <Button btnType='Success' clicked={props.continuing}>Continue</Button>
        </div>
    )

}

export default checkoutSummary