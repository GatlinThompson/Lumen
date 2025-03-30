import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/manager-training-widgets.module.scss";
import Input from "../form-components/Input";
import { useEffect, useState } from "react";
import EmployeeCard from "../basic-components/EmployeeCard";
import { apiFetch } from "../../hooks/APIFetch";

export default function ManagerEmployees({ programID, children }) {
  const [employees, setEmployees] = useState([]);
  const [orginalEmployees, setOrginalEmployees] = useState([]);

  useEffect(() => {
    const getAssignedEmployee = async () => {
      const { result, error } = await apiFetch(
        `/api/training-program/${programID}/employees/assigned`,
        "GET"
      );

      if (!error) {
        setOrginalEmployees(result.employees);
        setEmployees(result.employees);
      }
    };

    if (programID) {
      getAssignedEmployee();
    }
  }, [programID]);

  const handleSearch = (e) => {
    // if search bar has nothing in it.
    if (e.target.value.trim() === "") {
      setEmployees(orginalEmployees);
      return;
    }
    const filterSearch = orginalEmployees.filter((employee, index) => {
      //check if first name or last name has value
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
    <CardContainer extraClasses={styles.employees_container}>
      <div>
        <h3>Assigned Employees</h3>
        <div className={styles.search_container}>
          <Input
            type="search"
            placeholder={"Search assigned employees "}
            name={"search_input"}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className={styles.employee_list_container}>
        {employees.length > 0 ? (
          employees.map((employee, index) => {
            return (
              <EmployeeCard key={index} employee={employee}></EmployeeCard>
            );
          })
        ) : (
          <p>No Employees Assigned</p>
        )}
      </div>

      <div>{children}</div>
    </CardContainer>
  );
}
