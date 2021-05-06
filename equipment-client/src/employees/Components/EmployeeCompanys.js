import React, { useContext, useEffect, useState } from 'react'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'

import { AuthContext } from "../../shared/context/auth-context"
import { useHttpClient } from "../../shared/hooks/http-hook"
import EmployeeCompanysList from './EmployeeCompanysList'
import "../../css/style.css"

const EmployeeCompanys = () => {


    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const [loadedCompanys, setLoadedCompanys] = useState()


    useEffect(() => {
        const fetchCompanys = async () => {
            try {

                const responseData = await sendRequest(
                    `http://localhost:5000/api/user/getUserCompanys`,
                    "GET",
                    null,
                    {

                        Authorization: 'Bearer ' + auth.token
                    }
                )

                setLoadedCompanys(responseData.listOfCompanys)

                // responseData1.foundCompanys.forEach( async (z) => {
                //     try {
                //         const responseData2 = await sendRequest(
                //             `http://localhost:5000/api/user/getEmployeeCompanys/${z}`,
                //             "GET",
                //             null,
                //             {

                //                Authorization: 'Bearer ' + auth.token
                //             }
                //            )
                //     } catch (err) {

                //     }
                // })
            } catch (err) {

            }
        }

        fetchCompanys()
    }, [sendRequest, auth.token])

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div className="employeeHomeHeader">
                <h1 > These are the companys you work for!</h1>
                {!isLoading && loadedCompanys && <EmployeeCompanysList companys={loadedCompanys} />}
            </div>
        </React.Fragment>


    )
}

export default EmployeeCompanys
