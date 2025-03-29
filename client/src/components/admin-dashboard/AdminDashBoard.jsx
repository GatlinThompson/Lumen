import UsersOverview from "./UsersOverview";
import IconButtons from "./IconButtons";
import TrainingPrograms from "./TrainingPrograms";
import TrainingInsights from "./TrainingInsights";

export default function AdminDashboard() {
  return (
    <>
      <UsersOverview />
      <IconButtons />
      <TrainingPrograms />
      <TrainingInsights />
    </>
  );
}
