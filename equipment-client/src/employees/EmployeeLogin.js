import React, { useContext } from 'react'

import { useForm } from "react-hook-form"
import Button from '../shared/components/FormElements/Button'
import ErrorModal from '../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner'

import { AuthContext } from "../shared/context/auth-context"
import { useHttpClient } from "../shared/hooks/http-hook"


const Login = (props) => {

    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const { register, handleSubmit } = useForm()

    const onSubmit = async (data) => {

        try {
            const responseData = await sendRequest(
                'http://localhost:5000/api/user/login',
                "POST",
                JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
                {
                    "Content-Type": "application/json"
                }
            )
            auth.login(responseData.userId, responseData.token)
        } catch (err) {

        }
    }

    return (
        <div className="">
            <div className="">

                <ErrorModal error={error} onClear={clearError} />
                <div>
                    {isLoading && <LoadingSpinner asOverlay />}
                    <h2> Company Login </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("email")}

                        />
                        <br />
                        <input
                            {...register("password")}
                            type="password"
                        /><br />
                        <Button> login </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
