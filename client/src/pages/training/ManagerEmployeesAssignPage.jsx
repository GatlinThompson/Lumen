import { useState, useEffect } from "react";
import BackButton from "../../components/basic-components/BackButton";
import PageHeader from "../../components/basic-components/PageHeader";
import styles from "../../styles/trainings-page.module.scss";
import { apiFetch } from "../../hooks/APIFetch";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/form-components/Input";
import EmployeeCard from "../../components/basic-components/EmployeeCard";
import Button from "../../components/basic-components/Button";

export default function ManagerEmployeesAssignPage() {
  const [loaded, setLoaded] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [orginalEmployees, setOrginalEmployees] = useState([]);
  const { p_id } = useParams();
  const navigate = useNavigate();

  const getAssignedEmployee = async () => {
    const { result, error } = await apiFetch(
      `/api/training-program/${p_id}/employees/assigned`,
      "GET"
    );

    if (!error) {
      setOrginalEmployees(result.employees);
      setEmployees(result.employees);
      setTimeout(() => {
        setLoaded(true);
      }, 100);
    } else {
      navigate("/errorapi");
    }
  };

  useEffect(() => {
    if (p_id) {
      getAssignedEmployee();
    }
  }, [p_id]);

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

  //unasign employee
  const unassignEmployee = async (employee) => {
    const { result, error } = await apiFetch(
      `/api/training-program/${p_id}/employees/unassign/${employee}`,
      "DELETE"
    );

    if (!error) {
      getAssignedEmployee();
    }
  };

  return (
    <div className={`${loaded ? "loaded loading" : "loading"} max-1080`}>
      <BackButton />
      <div className={styles.title_container}>
        <PageHeader title={"Assigned Employees"} />
        <div className={styles.search_container}>
          <Input
            type="search"
            placeholder={"Search assigned employees"}
            name={"search_input"}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className={`${styles.training_container}`}>
        {employees.length > 0 ? (
          employees.map((employee, index) => {
            return (
              <EmployeeCard key={index} employee={employee}>
                <Button
                  variant="remove"
                  onClick={() => {
                    unassignEmployee(employee._id);
                  }}
                >
                  Unassign
                </Button>
              </EmployeeCard>
            );
          })
        ) : (
          <p className={styles.no_trainings}>No Employees Assigned</p>
        )}
      </div>
    </div>
  );
}
