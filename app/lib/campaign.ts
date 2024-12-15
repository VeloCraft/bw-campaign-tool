import { neon } from '@neondatabase/serverless';
import { Campaign, CampaignWithGoals } from './definitions';



// Create a new campaign
export async function createCampaign(campaign: Campaign): Promise<string> {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const [newCampaign] = await sql`
      INSERT INTO campaigns (name, description, status, contribution) 
      VALUES (${campaign.name}, ${campaign.description}, ${campaign.status}, ${campaign.contribution}) 
      RETURNING id
    `;

    return newCampaign.id;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create campaign');
  }
}

// Fetch all campaigns
export async function fetchCampaigns(): Promise<Campaign[]> {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT * FROM campaigns`;
    return data as Campaign[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch campaign data.');
  }
}

// Fetch a single campaign with its goals
export async function fetchCampaign(id: string): Promise<CampaignWithGoals | null> {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const data = await sql`
      SELECT 
        c.*,
        g.id AS goal_id,
        g.name AS goal_name,
        g.description AS goal_description,
        g.status AS goal_status,
        g.target_date AS goal_target_date
      FROM campaigns c
      LEFT JOIN goals g ON c.id = g.campaign_id
      WHERE c.id = ${id}
    `;

    // Transform data into a CampaignWithGoals object
    const campaign = data.reduce<CampaignWithGoals | null>((acc, row) => {
      if (!acc) {
        acc = {
          id: row.id,
          name: row.name,
          description: row.description,
          status: row.status,
          contribution: row.contribution,
          goals: [],
        };
      }

      if (row.goal_id) {
        acc.goals.push({
          id: row.goal_id,
          name: row.goal_name,
          description: row.goal_description,
          status: row.goal_status,
          target_date: row.goal_target_date,
          campaign_id: id,
        });
      }

      return acc;
    }, null);

    return campaign;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch campaign data.");
  }
}

// Update an existing campaign
export async function updateCampaign(campaign: Campaign): Promise<void> {
  try {
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

// Delete a campaign
export async function deleteCampaign(id: string): Promise<void> {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`DELETE FROM campaigns WHERE id = ${id}`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete campaign');
  }
}
