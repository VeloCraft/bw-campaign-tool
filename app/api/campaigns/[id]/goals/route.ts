import { NextRequest, NextResponse } from 'next/server';
import { createGoal } from '@/app/lib/goal';

export async function POST(req: NextRequest, {
  params,
}: {
  params: Promise<{ id: string }>}) {
    const { id } = await params;  // Get campaign ID from the URL parameters
    const  goal = await req.json();
    console.log(goal)

  if (!goal) {
    return NextResponse.json({ message: "Goal is required." }, { status: 400 });
  }

  try {
    goal.campaign_id = id;
    //insert goal into the database, explicitly passing the campaign ID and other attributes
    createGoal(goal)
    return NextResponse.json({ message: "Goal added successfully!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to add goal." }, { status: 500 });
  }
}

