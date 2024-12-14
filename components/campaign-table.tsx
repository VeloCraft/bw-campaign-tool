'use client';
import { useState } from 'react';
import Link from 'next/link';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'; // Importing Heroicons

export default function CampaignTable({ campaigns } : {campaigns: Record<string, number>[]}) {
  const [data, setData] = useState(campaigns);

  function HandleDelete(id: string) {
    console.log(`Deleting campaign with id ${id}`);
    fetch('/api/campaigns/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then((res) => {
      if (res.ok) {
        console.log('deleted');
        setData(data.filter((campaign) => String(campaign.id) !== id));
      }
    });
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-6 py-2 text-left font-semibold">Name</th>
             <th className="border border-gray-300 px-6 py-2 text-left font-semibold">Edit</th>
             <th className="border border-gray-300 px-6 py-2 text-left font-semibold">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((campaign) => (
            <tr key={campaign.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-6 py-2"><Link href={`/campaigns/${campaign.id}`}>{campaign.name}</Link></td>
              <td className="border border-gray-300 px-6 py-2">
                <Link href={`/campaigns/${campaign.id}/edit`}                  className="text-green-700 hover:text-green-500"
                  aria-label="Edit"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </Link>
              </td>
              <td className="border border-gray-300 px-6 py-2">
                <button
                  onClick={() => HandleDelete(String(campaign.id))}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
