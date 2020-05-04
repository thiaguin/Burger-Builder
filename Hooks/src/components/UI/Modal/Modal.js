import React from 'react'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'
import './Modal.css'

const classes = 'Modal'

const Modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} close={props.closing} />
            <div
                className={classes}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                }}
            >
                {props.children}
            </div>
        </Aux>
    )
}

const checkMemo = (previousProps, nextProps) => {
    return nextProps.show === previousProps.show || nextProps.children === previousProps.children
}

export default React.memo(Modal, checkMemo)
