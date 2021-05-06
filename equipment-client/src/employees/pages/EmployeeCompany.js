import React from 'react'

import { useHttpClient } from "../../shared/hooks/http-hook"
import { AuthContext } from "../../shared/context/auth-context"
import { useParams } from 'react-router-dom'

const EmployeeCompany = () => {

    const companyId = useParams().companyId


    return (
        <div>
            <div>
                company
            </div>
            <div>
                equipmentlist
            </div>
            <div>
                equipment in use
            </div>
        </div>
    )
}

export default EmployeeCompany
