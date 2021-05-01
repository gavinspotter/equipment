import React, { useContext } from 'react'

import { AuthContext } from "../../shared/context/auth-context"

const EmployeeHome = () => {


    const auth = useContext(AuthContext)


    return (
        <div>
            <button onClick={auth.logout}>employee logout</button>
        </div>
    )
}

export default EmployeeHome
