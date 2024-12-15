import { fetchCampaign } from "@/app/lib/campaign";
//import { fetchGoalsByCampaign } from "@/app/lib/goal"; // Fetch goals for the campaign
import Link from "next/link"; // Import the Link component from Next.js

export default async function CampaignsDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch campaign and goals data
  const campaign = await fetchCampaign(id);
  const goals = campaign?.goals || [];
  //const goals = await fetchGoalsByCampaign(id);

  if (!campaign) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        <p>Campaign not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto lg:flex lg:space-x-6">
        {/* Main Campaign Details */}
        <div className="bg-white shadow rounded-lg p-6 flex-1 mb-6 lg:mb-2 lg:w-3/4">
          <Link
            href={`/campaigns/${id}/edit`}
            className="absolute top-6 right-4 text-green-700 hover:text-green-700 text-sm font-semibold"
          >
            Edit
          </Link>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {campaign.name}
          </h1>

          <section className="mb-8">
            <p className="text-md text-gray-800 mb-2">
              <strong>Description</strong>
            </p>
            <div
              className="text-gray-800 text-sm"
              dangerouslySetInnerHTML={{ __html: campaign.description }}
            />
          </section>

          <section className="mb-8">
            <p className="text-md text-gray-800 mb-2">
              <strong>Status</strong>
            </p>
            <div
              className="text-gray-800 text-sm"
              dangerouslySetInnerHTML={{ __html: campaign.status }}
            />
          </section>

          <section className="mb-8">
            <p className="text-md text-gray-800 mb-2">
              <strong>How You Can Help</strong>
            </p>
            <div
              className="text-gray-800 text-sm"
              dangerouslySetInnerHTML={{
                __html: campaign.contribution,
              }}
            />
          </section>
        </div>

        {/* Goals Panel */}
        <aside className="bg-white shadow rounded-lg p-6 flex-1 w-1/4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Goals</h2>
          {goals.length > 0 ? (
            <ul className="space-y-4">
              {goals.map((goal) => (
                <li
                  key={goal.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="text-gray-700">{goal.name}</span>
                  <Link
                    href={`/goals/${goal.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              No goals yet.{" "}
              <Link
                href={`/campaigns/${id}/goal`}
                className="text-blue-600 hover:underline"
              >
                Add one now.
              </Link>
            </p>
          )}
          <div className="mt-6">
            <Link
              href={`/campaigns/${id}/goal`}
              className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Goal
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
