//use neon database to fetch campaigns
//define sql entity to interact with the database
import { neon } from '@neondatabase/serverless';
import {Campaign} from './definitions';
export async function createCampaign(campaign: Campaign) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const [newCampaign] = await sql`INSERT INTO campaigns (name, description, status, contribution) VALUES (${campaign.name},${campaign.description},${campaign.status},${campaign.contribution} ) RETURNING id`;

    return newCampaign.id;
  
    //get the id of the newly created campaigns

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create campaign');
  }
 }

export async function fetchCampaigns(): Promise<Record<string, number>[]> {
try {
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT * FROM campaigns`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch campaign data.');
  }
}

export async function fetchCampaign(id: string) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT * FROM campaigns WHERE id = ${id}`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch campaign data.');
  }
}

export async function updateCampaign(campaign: Campaign) {
  try {
    console.log(campaign)
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      UPDATE campaigns 
      SET 
        name = ${campaign.name},
        description = ${campaign.description},
        status = ${campaign.status},
        contribution = ${campaign.contribution}
      WHERE id = ${campaign.id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update campaign');
  }
}

export async function deleteCampaign(id: string) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`DELETE FROM campaigns WHERE id = ${id}`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete campaign');
  }
}
