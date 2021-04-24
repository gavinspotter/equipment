import React, { useContext } from 'react'

import { useForm } from "react-hook-form"

import { AuthContext } from "../shared/context/auth-context"
import { useHttpClient } from "../shared/hooks/http-hook"


const Login = () => {

    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const { register, handleSubmit } = useForm()


    return (
        <div>

        </div>
    )
}

export default Login
