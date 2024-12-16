import {neon} from '@neondatabase/serverless';
import {User} from './definitions';

export async function fetchUsers(): Promise<User[]> {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT * FROM users`;

    //convert data to type User and return new User object
    return data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      }
    })
    //return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}
