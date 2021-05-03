import React, { useContext } from 'react'


import { useForm } from 'react-hook-form'


import { Link } from "react-router-dom"


import { AuthContext } from "../shared/context/auth-context"
import { useHttpClient } from "../shared/hooks/http-hook"
import ErrorModal from '../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner'
import Input from "../shared/components/FormElements/Input"
import Button from '../shared/components/FormElements/Button'


const CompanySignup = (props) => {


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
        <div className={props.companySignupCard}>
            <ErrorModal error={error} onClear={clearError} />
            <div className={props.companyText}>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2> Company Signup </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    username<br />
                    <input
                        {...register("username")}

                    /><br />
                    password<br />

                    <input
                        {...register("password")}
                        type="password"
                    />
                </form>
            </div>
        </div>
    )
}

export default CompanySignup

