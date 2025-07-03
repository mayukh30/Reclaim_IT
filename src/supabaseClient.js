// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ducbefxotlxfilihnpen.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1Y2JlZnhvdGx4ZmlsaWhucGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MjcxMjYsImV4cCI6MjA2NzEwMzEyNn0.2BvhG0AQKEQxHl5GzbU0GWixk5sa4RJbpFsylX6HXGg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
