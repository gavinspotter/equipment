import React from 'react'
import EmployeeCompanyHeaderItem from './EmployeeCompanyHeaderItem'

const EmployeeCompanyHeaderList = (props) => {
    return (
        <div>
            {props.employees.map((data) =>
                <EmployeeCompanyHeaderItem
                    key={data._id}
                    name={data.name}
                    email={data.email}
                />


            )}
        </div>
    )
}

export default EmployeeCompanyHeaderList
