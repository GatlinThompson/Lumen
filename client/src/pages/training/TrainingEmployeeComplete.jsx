import { useContext, useEffect, useState } from "react";
import BackButton from "../../components/basic-components/BackButton";
import PageHeader from "../../components/basic-components/PageHeader";
import Input from "../../components/form-components/Input";
import styles from "../../styles/assign-employee.module.scss";
import { apiFetch } from "../../hooks/APIFetch";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeCard from "../../components/basic-components/EmployeeCard";
import { useFormik } from "formik";
import Button from "../../components/basic-components/Button";
import { AppContext } from "../../App";
import Checkbox from "../../components/form-components/Checkbox";

export default function TrainerEmployeeComplete() {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [orginalEmployees, setOrginalEmployee] = useState([]);
  const { p_id } = useParams();
  const { user, setNewAssignedEmployees } = useContext(AppContext);
  let initialValues = {
    completed_employees: [],
  };

  useEffect(() => {
    //redirect if
    if (!user || user.role != "trainer" || !p_id) {
      navigate("/dashboard");
    }

    const getEmployees = async () => {
      const { result, error } = await apiFetch(
        `/api/training-program/${p_id}/employees/uncomplete`,
        "GET"
      );

      if (!error) {
        setEmployees(result.employees);
        setOrginalEmployee(result.employees);
        setLoaded(true);
      }
    };

    getEmployees();
  }, [p_id]);

  //search employees
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

  const onSubmit = async (values) => {
    //get the ids of the filtered employee
    const filteredID = employees.map((employee) => {
      return employee._id;
    });

    //compare formik values to filtered to get final employee id to post
    const finalValues = values.completed_employees.filter((employee) => {
      return filteredID.includes(employee);
    });

    const data = {
      completed_employees: finalValues,
    };

    //simple empty validation
    if (data.completed_employees.length <= 0) {
      return;
    }

    //api call
    const { result, error } = await apiFetch(
      `/api/training-program/${p_id}/employees/complete`,
      "POST",
      data
    );

    if (!error) {
      //create newly assinged employees array
      const completedEmployees = orginalEmployees.filter((employee) => {
        return finalValues.includes(employee._id);
      });

      //set app array
      setNewAssignedEmployees(completedEmployees);
      //naviagate to success page
      navigate(`/trainings/${p_id}/complete/success`);
    } else {
      console.log(result);
    }
  };

  //handle checkbox change
  const handleChange = (employeeID) => {
    //check if id is in formik values
    if (formik.values.completed_employees.includes(employeeID)) {
      formik.setFieldValue(
        "completed_employees",
        formik.values.completed_employees.filter((id) => id !== employeeID)
      );
    } else {
      //add to array
      formik.setFieldValue("completed_employees", [
        ...formik.values.completed_employees,
        employeeID,
      ]);
    }
  };

  let formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div className={`${loaded ? "loaded loading" : "loading"} max-1080`}>
      <BackButton />
      <div className={styles.search_container}>
        <PageHeader title={"Complete employee training"} />
        {employees.length > 0 && (
          <Input
            type="search"
            placeholder={"Search all employees"}
            name={"search_input"}
            onChange={handleSearch}
          />
        )}
      </div>

      {/*Employees Form*/}
      {employees.length > 0 ? (
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.employees_container}>
            {employees &&
              employees.map((employee, index) => {
                return (
                  <EmployeeCard key={index} employee={employee}>
                    <Checkbox
                      name="completed_employees"
                      value={employee._id}
                      checked={formik.values.completed_employees.includes(
                        employee._id
                      )}
                      onChange={() => handleChange(employee._id)}
                    />
                  </EmployeeCard>
                );
              })}
          </div>
          <div className={styles.form_btn}>
            <Button type="submit" variant="yellow">
              Complete Employees
            </Button>
          </div>
        </form>
      ) : null}
      {employees.length <= 0 && (
        <div className={styles.no_employees}>
          <p>No employees to complete training</p>
        </div>
      )}
    </div>
  );
}
