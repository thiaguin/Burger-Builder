import React from 'react'
import './Button.css'

const button = (props) => {
    const classes = ['Button', props.btnType].join(' ')

    return (
        <button
            className={classes}
            disabled={props.disabled}
            onClick={props.clicked}
        >
            {props.children}
        </button>
    )
}

export default button
