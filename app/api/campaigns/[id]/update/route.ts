
// app/api/campaigns/[id]/update/route.js

import { updateCampaign } from '@/app/lib/campaign'; // Adjust the import based on your file structure
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, {
  params,
}: {
  params: Promise<{ id: string }>}) {
  const { id } = await params;  // Get campaign ID from the URL parameters
  const { name, description, status, contribution } = await req.json(); // Get request body

  // Validate required fields
  if (!name || !description || !status || !contribution) {
    return NextResponse.json(
      { message: 'All fields are required.' },
      { status: 400 }
    );
  }

  try {
    // Call the utility function to update the campaign
    await updateCampaign({
      "id": id,
      "name": name,
      "description": description,
      "status": status,
      "contribution":contribution,
    });

    // Return a successful response
    return NextResponse.json({ message: 'Campaign updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to update campaign:', error);
    return NextResponse.json({ message: 'Failed to update campaign' }, { status: 500 });
  }
}
