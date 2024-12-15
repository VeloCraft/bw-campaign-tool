import AddGoalForm from '@/components/goals/add-goal-form';

export default async function AddGoalPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const {id} = await params;
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Goal</h1>
        <div className="bg-white shadow rounded-lg p-4">
          <AddGoalForm campaignId = {id} />
        </div>
      </div>
    </div>
  );
}
