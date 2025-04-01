import UsersOverview from "./UsersOverview";
import IconButtons from "./IconButtons";
import TrainingPrograms from "./TrainingPrograms";
import TrainingInsights from "./TrainingInsights";
import TrainingDeadlines from "./TrainingDeadlines";

export default function AdminDashboard() {
  return (
    <>
      <UsersOverview />
      <IconButtons />
      <TrainingPrograms />
      <TrainingInsights />
      <TrainingDeadlines />
    </>
  );
}
