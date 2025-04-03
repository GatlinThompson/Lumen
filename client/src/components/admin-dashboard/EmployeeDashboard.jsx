import UsersOverview from "./UsersOverview";
import IconButtons from "./IconButtons";
import TrainingPrograms from "./TrainingPrograms";
import TrainingInsights from "./TrainingInsights";
import TrainingDeadlines from "./TrainingDeadlines";

export default function EmployeeDashboard() {
  return (
    <>
      <div className="row">
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