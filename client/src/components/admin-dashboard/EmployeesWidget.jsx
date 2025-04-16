import { useState } from "react";
import CardContainer from "../basic-components/CardContainer";
import styles from "../../styles/training-widgets.module.scss";
import Input from "../form-components/Input";
import Button from "../basic-components/Button";

export default function EmployeesWidget({
  ogrinalSpecificUsers,
  setSpecificUsers,
}) {
  const [searchValue, setSearchValue] = useState("");

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

  return (
    <div className={styles.training_widgets}>
      <CardContainer extraClasses="d-flex flex-column gap-3">
        <h2 className="fs-4 mx-3 mt-3 mb-0">My Employees</h2>
        <Input
          type="search"
          placeholder="Search all"
          name="search_input"
          onChange={handleSearch}
          value={searchValue}
          extraClasses="px-3 mb-0"
        />
        <Button
          variant="black"
          extraClasses="mx-auto"
          onClick={() => {
            navigate(`/`);
          }}
        >
          View All Employees
        </Button>
      </CardContainer>
    </div>
  );
}
