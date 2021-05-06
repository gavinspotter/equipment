import React from 'react'

import { useHttpClient } from "../../shared/hooks/http-hook"
import { AuthContext } from "../../shared/context/auth-context"
import { useParams } from 'react-router-dom'
import EmployeeCompanyHeader from '../Components/EmployeeCompanyHeader'
import EmployeeCompanyEquipment from '../Components/EmployeeCompanyEquipment'
import EmployeeCompanyOutEquipment from '../Components/EmployeeCompanyOutEquipment'

const EmployeeCompany = () => {

    const companyId = useParams().companyId



    return (
        <div>
            <EmployeeCompanyHeader companyid={companyId} />
            <EmployeeCompanyEquipment companyid={companyId} />
            <EmployeeCompanyOutEquipment />
        </div>
    )
}

export default EmployeeCompany
