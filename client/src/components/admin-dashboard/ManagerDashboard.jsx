import TrainingInsights from "./TrainingInsights";
import TrainingDeadlines from "./TrainingDeadlines";
import UserDetailsAssignedTrainings from "../trainings/UserDetailsAssignedTrainings";
import Calendar from "./calendar/Calendar";
import EmployeesWidget from "./EmployeesWidget";

export default function ManagerDashboard() {
  return (
    <>
      <div className="mt-4">
        <UserDetailsAssignedTrainings />
      </div>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-5 mt-4">
          <div>
            <TrainingInsights />
          </div>
          <div className="mt-4">
            <EmployeesWidget />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-5 mt-4">
          <div>
            <Calendar />
          </div>
          <div className="mt-4">
            <TrainingDeadlines />
          </div>
        </div>
      </div>
    </>
  );
}
