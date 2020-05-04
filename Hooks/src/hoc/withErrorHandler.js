import React from 'react'
import Aux from './Aux'
import Modal from '../components/UI/Modal/Modal'
import useErrorHandler from '../hooks/httpErrorHandler'

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, cleanError] = useErrorHandler(axios)

        return (
            <Aux>
                <Modal show={error} closing={cleanError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    }
}

export default withErrorHandler
