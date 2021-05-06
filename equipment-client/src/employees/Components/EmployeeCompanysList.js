import React from 'react'
import EmployeeCompanysItem from './EmployeeCompanysItem'

const EmployeeCompanysList = (props) => {
    return (
        <div>
            {
                props.companys.map((data) =>
                    <EmployeeCompanysItem
                        key={data._id}
                        company={data.username}
                        _id={data._id}

                    />
                )
            }
        </div>
    )
}

export default EmployeeCompanysList
