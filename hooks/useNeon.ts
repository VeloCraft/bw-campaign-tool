import { neon } from '@neondatabase/serverless';
import useSWR from 'swr';

const fetcher = async <T>(query: string) => {
  try {
    const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL as string);
    const data = await sql(query);
    return data as T[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch campaign data.');
  }
};

const useNeon = <T>(query: string) => {
  const { data, error, isLoading } = useSWR(query, fetcher<T>);
  return [data, isLoading, error];
};

export default useNeon;
