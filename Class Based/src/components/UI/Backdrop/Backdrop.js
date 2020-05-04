import React from 'react'
import './Backdrop.css'

const classes = 'Backdrop'

const backdrop = props => {
    return props.show ? <div className={classes} onClick={props.close}/> : null 
}

export default backdrop
