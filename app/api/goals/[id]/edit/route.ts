import { NextRequest, NextResponse } from "next/server";
import { updateGoal } from "@/app/lib/goal";

export async function PUT(req: NextRequest) {
  try {
    const goal = await req.json(); // Parse the goal object from the request body

    if (!goal || !goal.id) {
      return NextResponse.json(
        { message: "Goal ID and data are required." },
        { status: 400 }
      );
    }

    console.log("Updating goal:", goal);

    // Update the goal in the database
    await updateGoal(goal);

    return NextResponse.json(
      { message: "Goal updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating goal:", error);
    return NextResponse.json(
      { message: "Failed to update goal." },
      { status: 500 }
    );
  }
}
