import React, { useContext, useEffect } from 'react'

import { AuthContext } from "../../shared/context/auth-context"
import { useHttpClient } from "../../shared/hooks/http-hook"



const EmployeeCompanysItem = (props) => {




    return (
        <div>
            {props.company}
        </div>
    )
}

export default EmployeeCompanysItem
