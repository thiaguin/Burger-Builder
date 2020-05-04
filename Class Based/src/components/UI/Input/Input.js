import React from 'react'
import './Input.css'

const input = (props) => {
    let input
    let classes = ['InputElement']
    if (props.invalid && props.shouldValidate && props.touched) {
        classes.push('Invalid')
    }

    switch (props.elementType) {
        case 'textarea':
            input = (
                <textarea
                    className={classes.join(' ')}
                    {...props.config}
                    onChange={props.changed}
                    value={props.value}
                />
            )
            break
        case 'select':
            const options = props.config.options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.displayName}
                </option>
            ))

            const optionDefault = (
                <option
                    key='defaultValue'
                    value=''
                    disabled
                    defaultValue
                    hidden
                ></option>
            )
            input = (
                <select
                    className={classes.join(' ')}
                    onChange={props.changed}
                    value={props.value}
                >
                    {[optionDefault, ...options]}
                </select>
            )
            break
        default:
            input = (
                <input
                    className={classes.join(' ')}
                    {...props.config}
                    onChange={props.changed}
                    value={props.value}
                />
            )
    }

    return (
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {input}
        </div>
    )
}

export default input
