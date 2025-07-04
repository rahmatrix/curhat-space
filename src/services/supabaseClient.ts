import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fpjpnrdwyjgqdwitupbx.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwanBucmR3eWpncWR3aXR1cGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MTMxNjQsImV4cCI6MjA2NzE4OTE2NH0.o1oPNkhp8ItHRdrCpIOfAZfnZ-yz5y2U0JBdrFhWvXU'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);