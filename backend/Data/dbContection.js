import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://inmfmanpaarrwhoyyctn.supabase.co';
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlubWZtYW5wYWFycndob3l5Y3RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3NDU3MTIsImV4cCI6MjAyMjMyMTcxMn0.w2-16XFMjPPz9oK1iPFG95V4ZfREZp_7qlkgTHQ4oQ0";

class SupabaseClientSingleton {
    static instance = null;

     static getInstance() {
        if (!this.instance) {
            this.instance = createClient(supabaseUrl, SUPABASE_KEY);
        }
        return this.instance;
    }
}

export {SupabaseClientSingleton};
