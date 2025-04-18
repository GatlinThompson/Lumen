import { useContext, useEffect, useState } from "react";
import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/training-widgets.module.scss";
import Input from "../form-components/Input";
import Button from "../basic-components/Button";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { apiFetch } from "../../hooks/APIFetch";
import EmployeesModal from "./EmployeesModal";

export default function EmployeesWidget({
  ogrinalSpecificUsers,
  setSpecificUsers,
}) {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { setIsModalOpen, setModalData } = useContext(AppContext);
  const [employees, setEmployees] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      setSpecificUsers(ogrinalSpecificUsers);
      return;
    }

    const filterSearch = ogrinalSpecificUsers.filter(
      (user) =>
        user.first_name.toLowerCase().includes(value.toLowerCase()) ||
        user.last_name.toLowerCase().includes(value.toLowerCase()) ||
        user.department.name.toLowerCase().includes(value.toLowerCase())
    );

    setSpecificUsers(filterSearch);
  };

  const getEmployees = async () => {
    const { result, error } = await apiFetch("/api/dashboard/employees", "GET");

    console.log(result);
    if (!error) {
      setEmployees(result.employees);
    } else {
      navigate("/errorapi");
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setModalData(<EmployeesModal employees={employees} />);
  };

  return (
    <div className={styles.training_widgets}>
      <CardContainer extraClasses="d-flex flex-column gap-3 mb-2">
        <h2 className="fs-4 mx-3 mt-3 mb-2 mb-0">My Employees</h2>
        <Input
          type="search"
          placeholder="Employee Quick Search"
          name="search_input"
          //onChange={handleSearch}
          //value={searchValue}
          extraClasses="px-3 mb-0"
          onClick={openModal}
        />
        <Button
          variant="black"
          extraClasses="mx-auto mt-2 mb-4"
          onClick={() => {
            navigate(`/users/employees`);
          }}
        >
          View All Employees
        </Button>
      </CardContainer>
    </div>
  );
}
