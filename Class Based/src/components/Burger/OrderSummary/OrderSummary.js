import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = props => {
    const ingredientsSummary = () => {
        const ingredients = Object.keys(props.ingredients)
        return ingredients.map((igKey) => 
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}/>{igKey}: {props.ingredients[igKey]}
            </li>
        )
    }

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary()}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger'clicked={props.cancelingPurchase}>Cancel</Button>
            <Button btnType='Success' clicked={props.continuingPurchase}>Continue</Button>
        </Aux>
    )
}
export default orderSummary