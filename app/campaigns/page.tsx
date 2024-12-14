
import { fetchCampaigns } from '@/app/lib/data';
import CampaignsTable from '@/components/campaign-table';
import Link from 'next/link';

export default async function CampaignsPage() {
  const data = await fetchCampaigns();
  if (!data) {
    return <div className="flex justify-center items-center min-h-screen text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Campaigns</h1>
        <div className="bg-white shadow rounded-lg p-4">
          <CampaignsTable campaigns={data} />
        </div>
    </div>
    {/* button to add a new campaign*/}
    <div className="max-w-7xl mx-auto mt-4">
      <Link href="/campaigns/create"><button href="/campaigns/create" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
        Add campaign
      </button></Link>
    </div>
    </div>
  );
}



