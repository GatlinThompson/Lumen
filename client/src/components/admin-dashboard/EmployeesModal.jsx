import { useContext, useEffect, useState } from "react";
import Input from "../form-components/Input";
import EmployeeCard from "../basic-components/EmployeeCard";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import styles from "../../styles/manager-training-widgets.module.scss";

export default function EmployeesModal(props) {
  const [searchValue, setSearchValue] = useState("");
  const { setIsModalOpen } = useContext(AppContext);
  const [employees, setEmployees] = useState([]);
  const [orginalEmployees, setOrginalEmployees] = useState([]);
  useEffect(() => {
    setEmployees(props.employees);
    setOrginalEmployees(props.employees);
  }, [props.employees]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    console.log(e.target.value);

    if (e.target.value.trim() === "") {
      setEmployees(orginalEmployees);
      return;
    }

    const filterSearch = orginalEmployees.filter((employee) => {
      if (
        employee.first_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        employee.last_name.toLowerCase().includes(e.target.value.toLowerCase())
      )
        return employee;
    });

    setEmployees(filterSearch);
  };

  return (
    <>
      <h2 className="fs-4 mx-3 mt-0 mb-3">My Employees</h2>
      <Input
        type="search"
        placeholder="Employee Quick Search"
        name="search_input"
        onChange={handleSearch}
        value={searchValue}
        extraClasses="px-3 mb-0"
      />
      <div className={styles.employee_modal}>
        {employees.length > 0 ? (
          employees.map((employee, index) => {
            return (
              <Link
                to={`/user/${employee._id}`}
                key={index}
                onClick={() => setIsModalOpen(false)}
              >
                <EmployeeCard employee={employee} />
              </Link>
            );
          })
        ) : (
          <p>No Employees</p>
        )}
      </div>
    </>
  );
}
