import React, { useContext } from 'react'


import { useForm } from 'react-hook-form'


import { Link } from "react-router-dom"


import { AuthContext } from "../../shared/context/auth-context"
import { useHttpClient } from "../../shared/hooks/http-hook"
import ErrorModal from '../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner'



const Login = () => {


    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const { register, handleSubmit } = useForm()

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2> Company Login </h2>
                <form>

                </form>
            </div>
        </React.Fragment>
    )
}

export default Login
