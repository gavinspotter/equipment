import React from 'react'
import EmployeeCompanysItem from './EmployeeCompanysItem'

const EmployeeCompanysList = (props) => {
    return (
        <div>
            {
                props.companys.map((data) =>
                    <EmployeeCompanysItem
                        key={data}
                        company={data}
                    />
                )
            }
        </div>
    )
}

export default EmployeeCompanysList
