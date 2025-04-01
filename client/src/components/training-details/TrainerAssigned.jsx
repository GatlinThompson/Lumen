import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/manager-training-widgets.module.scss";
import Input from "../form-components/Input";
import { useEffect, useState } from "react";
import EmployeeCard from "../basic-components/EmployeeCard";
import { apiFetch } from "../../hooks/APIFetch";
import StatusCircle from "../basic-components/StatusCircle";

export default function TrainerAssigned({ program, sessions, children }) {
  const [employees, setEmployees] = useState([]);
  const [orginalEmployees, setOrginalEmployees] = useState([]);

  const getAssignedEmployees = async () => {
    const sessionData = { sessions: sessions };
    const { result, error } = await apiFetch(
      `/api/traing-programs/${program}/trainer/assigned`,
      "POST",
      sessionData
    );

    if (!error) {
      console.log(result.users);
      setEmployees(result.users);
      setOrginalEmployees(result.users);
    }
  };

  useEffect(() => {
    if (program && sessions) {
      getAssignedEmployees();
    }
  }, [program, sessions]);

  const handleSearch = (e) => {
    // if search bar has nothing in it.
    if (e.target.value.trim() === "") {
      setEmployees(orginalEmployees);
      return;
    }
    const filterSearch = orginalEmployees.filter((employee, index) => {
      //check if first name or last name has value
      if (
        employee.enrolled_employee.first_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        employee.enrolled_employee.last_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
        return employee;
    });
    setEmployees(filterSearch);
  };
  return (
    <CardContainer
      extraClasses={`${styles.employees_container} ${styles.trainer}`}
    >
      <div>
        <h3>Enrolled Employees</h3>
        <div className={styles.search_container}>
          <Input
            type="search"
            placeholder={"Employee Quick Search "}
            name={"search_input"}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className={`${styles.employee_list_container} ${styles.trainer}`}>
        {employees.length > 0 ? (
          employees.map((employee, index) => {
            return (
              <EmployeeCard key={index} employee={employee.enrolled_employee}>
                <StatusCircle status={employee.training_completed} />
              </EmployeeCard>
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
