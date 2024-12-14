

import {deleteCampaign} from '@/app/lib/action';
import {NextRequest, NextResponse} from 'next/server';

export async function DELETE(req: NextRequest) {
 // requesting data from the front-end
    const data = await req.json();
// storing user_id in the id var
    const id=data.id; // get campaign id from request
  //const id = await ().id;
  // delete campaign from database
  try {
    await deleteCampaign(id);  
  // return success Response
  return NextResponse.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.error();
  }
}
