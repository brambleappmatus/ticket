import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ijemonzkydvqhaxlrmdw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZW1vbnpreWR2cWhheGxybWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2NDM2MjYsImV4cCI6MjA1MDIxOTYyNn0.gZ2EtjXX040QBLsocyw3moasg9iEQa-TKEnOUH9RD94';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);