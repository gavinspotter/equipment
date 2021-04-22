import React, { useContext } from 'react'


import { useForm } from 'react-hook-form'


import { Link } from "react-router-dom"


import { AuthContext } from "../shared/context/auth-context"
import { useHttpClient } from "../shared/hooks/http-hook"
import ErrorModal from '../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner'
import Input from "../shared/components/FormElements/Input"
import Button from '../shared/components/FormElements/Button'


const CompanySignup = () => {


    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const { register, handleSubmit } = useForm()


    const onSubmit = async (data) => {
        console.log(data)
        try {
            const responseData = await sendRequest(
                `http://localhost:5000/api/company/signup`,
                "POST",
                JSON.stringify({
                    username: data.username,
                    password: data.password
                }),
                {
                    "Content-Type": "application/json"
                }
            )
            auth.companyLogin(responseData.companyId, responseData.companyToken)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <ErrorModal error={error} onClear={clearError} />
            <div>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2> Company Login </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("username")}

                    />
                    <br />
                    <input
                        {...register("password")}
                        type="password"
                    />
                    did you mean to login
                    <Button> signup </Button>
                </form>
            </div>
        </div>
    )
}

export default CompanySignup

