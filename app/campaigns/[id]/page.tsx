import { fetchCampaign } from "@/app/lib/action";
import Link from "next/link"; // Import the Link component from Next.js

export default async function CampaignsDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  // Fetch campaign data
  const campaign = await fetchCampaign(id);

  if (!campaign) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        <p>Campaign not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 relative">
        {/* Edit button in the top-right corner */}
        <Link
          href={`/campaigns/${id}/edit`}
          className="absolute top-6 right-4 text-green-700 hover:text-green-700 text-sm font-semibold"
        >
          Edit 
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">{campaign[0].name}</h1>


        <p className="text-md text-gray-800 mb-2">
          <strong>Description</strong>

        </p>

        <div className="text-gray-800 text-sm" dangerouslySetInnerHTML={{ __html: campaign[0].description }} />

        <p className="text-md text-gray-800 mb-2">
          <strong>Status</strong>        </p>

        
        <div className="text-gray-800 text-sm" dangerouslySetInnerHTML={{ __html: campaign[0].status }} />

        <p className="text-md text-gray-800 mb-2">
          <strong>How You Can Help</strong>  
          </p>

        <div className="text-gray-800 text-sm"  dangerouslySetInnerHTML={{ __html: campaign[0].contribution }} />
      </div>
    </div>
  );
}
