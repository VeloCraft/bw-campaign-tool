import { NextRequest, NextResponse } from 'next/server';
import { deleteGoal } from '@/app/lib/goal';

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id'); // Extract `id` from the query string

    if (!id) {
      return NextResponse.json({ error: "Goal ID is required" }, { status: 400 });
    }

    await deleteGoal(id);

    return NextResponse.json({ message: 'Goal deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: "Failed to delete goal" }, { status: 500 });
  }
}
