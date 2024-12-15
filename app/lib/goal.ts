//create functions for adding, updating, deleting and fetching goals, which have a one-to-many relationship with campaigns
//
//
import {neon} from '@neondatabase/serverless';
import {Goal} from './definitions';

export async function createGoal(goal: Goal) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const targetDate = new Date(goal.target_date);

    // Validate the date format (optional)
    if (isNaN(targetDate.getTime())) {
      throw new Error("Invalid date format");
    }
    const [newGoal] = await sql`INSERT INTO goals (name, description, status, campaign_id, target_date) VALUES (${goal.name},${goal.description},${goal.status},${goal.campaign_id}, ${targetDate} ) RETURNING id`;

    return newGoal.id;

    //get the id of the newly created goal

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create goal');
  }
}

export async function fetchGoals(): Promise<Goal[]> {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT * FROM goals`;

    //convert data to type Goal and return new Goal object
    return data.map((goal) => {
      return {
        id: goal.id,
        name: goal.name,
        description: goal.description,
        status: goal.status,
        campaign_id: goal.campaign_id,
        target_date: goal.target_date
      }
    })
    //return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goal data.');
  }
}

export async function fetchGoal(id: string) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT * FROM goals WHERE id = ${id}`;
    const goal = data[0];
    return goal as Goal
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goal data.');
  }
}

export async function updateGoal(goal: Goal) {
  try {
    //console.log(goal)
    //
    const targetDate = new Date(goal.target_date);
    console.log(goal)
    // Validate the date format (optional)
    if (isNaN(targetDate.getTime())) {
      throw new Error("Invalid date format");
    }
    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      UPDATE goals 
      SET 
        name = ${goal.name},
        description = ${goal.description},
        status = ${goal.status},
        campaign_id = ${goal.campaign_id},
        target_date = ${targetDate}
      WHERE id = ${goal.id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update goal');
  }
}

export async function deleteGoal(id: string) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    await sql`DELETE FROM goals WHERE id = ${id}`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete goal');
  }
}

export async function fetchGoalsByCampaignId(campaign_id: string) {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT * FROM goals WHERE campaign_id = ${campaign_id}`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch goal data.');
  }
}
