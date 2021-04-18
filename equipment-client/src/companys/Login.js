import React, { useContext } from 'react'


import { useForm } from 'react-hook-form'


import { Link } from "react-router-dom"


import { AuthContext } from "../../shared/context/auth-context"
import { useHttpClient } from "../../shared/hooks/http-hook"
import ErrorModal from '../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner'
import Input from "../shared/components/FormElements/Input"
import Button from '../shared/components/FormElements/Button'



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
                    <Input
                        name="username"
                        valRef={register}
                        label="username"
                        element="input"
                    />
                    <Input
                        name="password"
                        valRef={register}
                        label="password"
                        element="input"
                        type="password"
                    />
                    did you mean to signup
                    <Button> login </Button>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Login
