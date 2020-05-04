import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import './BuildControls.css'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]
const BuildControls = (props) => {
    const classes = 'BuildControls'
    const buttonClasses = 'OrderButton'
    const enable = !props.isAuth || props.purchasable

    return (
        <div className={classes}>
            <p>
                Price: <strong>{props.price.toFixed(2)}</strong>
            </p>
            {controls.map((element, index) => (
                <BuildControl
                    key={index}
                    label={element.label}
                    added={() => {
                        props.addIngredients(element.type)
                    }}
                    removed={() => {
                        props.removeIngredients(element.type)
                    }}
                    disabled={props.disabled[element.type]}
                />
            ))}
            <button disabled={!enable} className={buttonClasses} onClick={props.ordered}>
                {props.isAuth ? 'Order' : 'Please, login to continue.'}
            </button>
        </div>
    )
}

export default BuildControls
