import React from 'react';
import Link from 'next/link';
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Welcome to the Campaign Management Tool
        </h1>

        <p className="text-xl text-gray-700 mb-4">
          This platform allows you to manage and track your campaigns with ease.
          You can create new campaigns, edit existing ones, and see all the
          details in one place. Our goal is to make managing and contributing to
          campaigns simple and accessible for everyone!
        </p>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          How to Use the Platform
        </h2>
        <ul className="list-disc pl-8 text-lg text-gray-700 space-y-2">
          <li>
            <strong className="font-bold text-gray-900">
              Create a Campaign:
            </strong>{' '}
            Start by creating a new campaign. Simply provide the campaigns name
            and description.
          </li>
          <li>
            <strong className="font-bold text-gray-900">
              Edit a Campaign:
            </strong>{' '}
            Edit any existing campaign. Add details like status, and contribute
            information to help others get involved.
          </li>
          <li>
            <strong className="font-bold text-gray-900">Track Progress:</strong>{' '}
            Keep track of your campaigns status and how people can help with
            each one.
          </li>
        </ul>

        <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4">
          Need Help?
        </h2>
        <p className="text-lg text-gray-700">
          If you have any questions or need assistance using the platform, feel
          free to reach out. We are here to help you manage your campaigns
          successfully.
        </p>

        <div className="mt-8 text-center">
          <Link
            href="/campaigns"
            className="inline-block px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            View Campaigns
          </Link>
        </div>
      </div>
    </div>
  );
}
