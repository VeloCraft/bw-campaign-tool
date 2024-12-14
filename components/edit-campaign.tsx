'use client';

import { useState, FormEvent } from 'react';
import { redirect } from 'next/navigation';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html'; // Import convertToHTML
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function EditCampaignForm({ campaign } : {campaign: Record<string, string>}) {
  // Convert HTML content into EditorState
  const createEditorState = (htmlContent: string) => {
    const blocksFromHTML = convertFromHTML(htmlContent);
    const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
    return EditorState.createWithContent(contentState);
  };

  const [name, setName] = useState(campaign.name);
  const [description, setDescription] = useState(createEditorState(campaign.description || ""));
  const [status, setStatus] = useState(createEditorState(campaign.status || ""));
  const [contribution, setContribution] = useState(createEditorState(campaign.contribution || ""));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Convert the editor content to HTML using convertToHTML
    const descriptionHtml = stateToHTML(description.getCurrentContent());
    const statusHtml = stateToHTML(status.getCurrentContent());
    const contributionHtml = stateToHTML(contribution.getCurrentContent());

    console.log(descriptionHtml);

    const updatedCampaign = {
      name,
      description: descriptionHtml,  // Store HTML content
      status: statusHtml,            // Store HTML content
      contribution: contributionHtml,  // Store HTML content
    };

    const response = await fetch(`/api/campaigns/${campaign.id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCampaign),
    });

    if (response.ok) {
      redirect(`/campaigns/${campaign.id}`);
      alert('Campaign updated successfully!');

      // Optionally redirect or handle success state here
    } else {
      alert('Failed to update campaign. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Campaign</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter campaign name"
            />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <Editor
              editorState={description}
              onEditorStateChange={setDescription}
              toolbarClassName="toolbarClassName"
              editorClassName="editorClassName"
            />
          </div>

          {/* Status Field */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <Editor
              editorState={status}
              onEditorStateChange={setStatus}
              toolbarClassName="toolbarClassName"
              editorClassName="editorClassName"
            />
          </div>

          {/* Contribution Field */}
          <div>
            <label htmlFor="contribution" className="block text-sm font-medium text-gray-700">How Can Others Help?</label>
            <Editor
              editorState={contribution}
              onEditorStateChange={setContribution}
              toolbarClassName="toolbarClassName"
              editorClassName="editorClassName"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
