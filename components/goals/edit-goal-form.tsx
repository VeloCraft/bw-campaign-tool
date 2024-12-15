
'use client';
import { useState, useEffect, FormEvent } from "react";
import { Campaign, Goal } from '@/app/lib/definitions';

export default function EditGoalForm({ goal, campaigns } : {goal: Goal, campaigns: Campaign[]}) {
  const [name, setName] = useState(goal.name || "");
  const [description, setDescription] = useState(goal.description || "");
  const [status, setStatus] = useState(goal.status || "pending");
  const [targetDate, setTargetDate] = useState(
    goal.target_date ? new Date(goal.target_date).toISOString().split("T")[0] : ""
  );
  const [selectedCampaignId, setSelectedCampaignId] = useState(goal.campaign_id || "");

  const handleSubmit = async (e : FormEvent ) => {
    e.preventDefault();

    const response = await fetch(`/api/goals/${goal.id}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: goal.id,
        name,
        description,
        status,
        campaign_id: selectedCampaignId,
        target_date: targetDate,
      }),
    });

    if (response.ok) {
      alert("Goal updated successfully!");
    } else {
      alert("Failed to update goal.");
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this goal?");
    if (!confirmed) return;

    const response = await fetch(`/api/goals/delete?id=${goal.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Goal deleted successfully!");
      // Optionally, redirect or update the parent state to remove the goal from the list
    } else {
      alert("Failed to delete goal.");
    }
  };

  useEffect(() => {
    // Update form fields if the goal prop changes
    setName(goal.name || "");
    setDescription(goal.description || "");
    setStatus(goal.status || "pending");
    setTargetDate(goal.target_date ? new Date(goal.target_date).toISOString().split("T")[0] : "");
    setSelectedCampaignId(goal.campaign_id || "");
  }, [goal]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold text-gray-800">Edit Goal</h2>

      {/* Campaign Selector */}
      <div>
        <label htmlFor="campaign" className="block text-sm font-medium text-gray-700">
          Campaign
        </label>
        <select
          id="campaign"
          value={selectedCampaignId}
          onChange={(e) => setSelectedCampaignId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
        >
          <option value="" disabled>Select a campaign</option>
          {campaigns.map((campaign) => (
            <option key={campaign.id} value={campaign.id}>
              {campaign.name}
            </option>
          ))}
        </select>
      </div>

      {/* Goal Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Goal Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter the goal name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a brief description"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
        />
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
        >
          <option value="pending">Incomplete</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Target Date */}
      <div>
        <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700">
          Target Date
        </label>
        <input
          id="targetDate"
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        {/* Save Changes */}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Save Changes
        </button>

        {/* Delete Goal */}
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete Goal
        </button>
      </div>
    </form>
  );
}

