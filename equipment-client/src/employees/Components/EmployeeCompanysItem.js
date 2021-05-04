import React, { useContext, useEffect } from 'react'

import { AuthContext } from "../../shared/context/auth-context"
import { useHttpClient } from "../../shared/hooks/http-hook"



const EmployeeCompanysItem = () => {

    const auth = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()




    return (
        <div>

        </div>
    )
}

export default EmployeeCompanysItem
