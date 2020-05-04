import React, { Component } from 'react'
import Aux from '../../../hoc/Aux'
import Backdrop from '../Backdrop/Backdrop'
import './Modal.css'

const classes = 'Modal'

class Modal extends Component { 
    shouldComponentUpdate (nextProps) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children   
    }
    
    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} close={this.props.closing}/>
                <div  
                    className={classes}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal