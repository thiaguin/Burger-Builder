import React from 'react'
import './BuildControl.css'

const BuildControl = props => {
    let classes = 'BuildControl'
    return (
        <div className={classes}>
            <div className='Label'> {props.label} </div>
            <button className={`${classes} Less`} onClick={props.removed} disabled={props.disabled}> Less </button>
            <button className={`${classes} More`} onClick={props.added}> More </button>
        </div>
    )
}

export default BuildControl