import React, { useContext, useEffect } from 'react'

import { useHttpClient } from "../../shared/hooks/http-hook"
import { AuthContext } from "../../shared/context/auth-context"

const EmployeeCompanyHeader = (props) => {


    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()


    useEffect(() => {
        const fetchCompany = async () => {
            try {

            } catch (err) {

            }
        }
    }, [])


    return (
        <div>

        </div>
    )
}

export default EmployeeCompanyHeader
