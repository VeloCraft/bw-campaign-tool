import { neon } from '@neondatabase/serverless';


export async function fetchCampaigns() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT * FROM campaigns`;
    return data;

    // console.log('Data fetch completed after 3 seconds.');

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch campaign data.');
  }
}
