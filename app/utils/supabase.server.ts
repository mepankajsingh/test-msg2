import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with the provided URL and key
const supabaseUrl = 'https://tcblwrhrgeaxfpcvmema.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYmx3cmhyZ2VheGZwY3ZtZW1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NzIxMTIsImV4cCI6MjA1NjM0ODExMn0.8bqwiq5uNZqA6aOxFAox4RsJ3SvJ1XyFmSKf2QWkuDQ';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fetch message from Supabase
export async function getMessage() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching message:', error);
    return { message: 'Failed to load message' };
  }

  return data;
}
