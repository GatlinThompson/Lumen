import Trainers from ".../assets/images/TrainersIcon";

export default function Sidebar() {
  return (
    <>
      <div className="components">
        <ul>
          <li></li>
          <li>All Trainings</li>
          <li>Create Training</li>
          <li>Managers</li>
          <li>
            <img src={Trainers} alt="" />
            <a href="trainers">Trainers</a>
          </li>
          <li>Employees</li>
          <li>User Creation</li>
          <li>Notifications</li>
        </ul>
      </div>
    </>
  );
}
