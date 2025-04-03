import TrainingInsights from "./TrainingInsights";
import TrainingDeadlines from "./TrainingDeadlines";
import UserDetailsAssignedTrainings from "../trainings/UserDetailsAssignedTrainings";

export default function ManagerDashboard() {
  return (
    <>
      <div className="row">
        <div className="mt-4">
          <UserDetailsAssignedTrainings />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-5 mt-4">
          <div>
            <TrainingInsights />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-5 mt-4">
          <div>
            <TrainingDeadlines />
          </div>
        </div>
      </div>
    </>
  );
}