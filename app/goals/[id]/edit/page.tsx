//edit goal
// goals/[id]/edit/page.tsx
//
import {fetchGoal} from "@/app/lib/goal";
import {fetchCampaigns} from "@/app/lib/campaign";

import EditGoalForm from "@/components/goals/edit-goal-form";

export default async function editGoalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  // Fetch goal data
  const goal = await fetchGoal(id);
  const campaigns = await fetchCampaigns();

  return (
    <EditGoalForm goal={goal} campaigns={campaigns} />
  )
}
