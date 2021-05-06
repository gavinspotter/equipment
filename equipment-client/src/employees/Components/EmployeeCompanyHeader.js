import React, { useContext, useEffect, useState } from 'react'

import { useHttpClient } from "../../shared/hooks/http-hook"
import { AuthContext } from "../../shared/context/auth-context"
import { parseZone } from 'moment'

const EmployeeCompanyHeader = (props) => {


    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const [loadedCompany, setLoadedCompany] = useState()

    const [loadedEmployees, setLoadedEmployees] = useState();


    let stuff

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


        fetchCompany()


    }, [sendRequest, auth.token, props.companyid])



    return (
        <div>
            <h2> </h2>
            <div> </div>
        </div>
    )
}

export default EmployeeCompanyHeader
