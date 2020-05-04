import { useState, useEffect } from 'react'

export default (axios) => {
    const { request, response } = axios.interceptors
    const [error, setError] = useState(null)

    const reqInterceptor = axios.interceptors.request.use((req) => {
        setError(null)
        return req
    })

    const resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (err) => {
            setError({ message: err.response.data.error || err.response.data })
        }
    )

    useEffect(() => {
        return () => {
            request.eject(reqInterceptor)
        }
    }, [request, reqInterceptor])

    useEffect(() => {
        return () => {
            response.eject(resInterceptor)
        }
    }, [response, resInterceptor])

    const closeErrorHandler = () => {
        setError(null)
    }

    return [error, closeErrorHandler]
}
