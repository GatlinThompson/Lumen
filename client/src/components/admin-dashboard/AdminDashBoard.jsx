import UsersOverview from "./UsersOverview";
import IconButtons from "./IconButtons";
import TrainingPrograms from "./TrainingPrograms";
import TrainingInsights from "./TrainingInsights";
import TrainingDeadlines from "./TrainingDeadlines";

export default function AdminDashboard() {
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6 col-xl-4 mt-4">
          <div>
            <UsersOverview />
          </div>
          <div>
            <IconButtons />
          </div>
          <div>
            <TrainingInsights />
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-4 mt-4">
          <div>
            <TrainingPrograms />
          </div>
          <div>
            <TrainingDeadlines />
          </div>
        </div>
      </div>
    </>
  );
}
