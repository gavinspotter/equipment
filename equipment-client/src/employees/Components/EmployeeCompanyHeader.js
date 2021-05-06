import React, { useContext, useEffect, useState } from 'react'

import { useHttpClient } from "../../shared/hooks/http-hook"
import { AuthContext } from "../../shared/context/auth-context"

const EmployeeCompanyHeader = (props) => {


    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const [loadedCompany, setLoadedCompany] = useState()

    const [loadedEmployees, setLoadedEmployees] = useState();




    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/user/getUserCompany/${props.companyid}`,
                    "GET",
                    null,
                    {

                        Authorization: 'Bearer ' + auth.token
                    }
                )

                setLoadedCompany(responseData.getCompnany.username)
            } catch (err) {

            }
        }

    }, [])


    return (
        <div>
            <h2> {loadedCompany}</h2>
            <div> {loadedEmployees}</div>
        </div>
    )
}

export default EmployeeCompanyHeader
