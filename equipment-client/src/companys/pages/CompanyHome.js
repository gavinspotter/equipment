import React, { useContext } from 'react'

import { AuthContext } from "../../shared/context/auth-context"

const CompanyHome = () => {



    const auth = useContext(AuthContext)

    return (
        <div>
            <button onClick={auth.companyLogout}>logout</button>
        </div>
    )
}

export default CompanyHome
