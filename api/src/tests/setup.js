import dotenv from "dotenv";

dotenv.config();

// fallback for GitHub Actions secrets
process.env.SUPABASE_URL ||= process.env.SUPABASE_URL;
process.env.SUPABASE_ANON_KEY ||= process.env.SUPABASE_ANON_KEY;
process.env.SUPABASE_SERVICE_ROLE_KEY ||= process.env.SUPABASE_SERVICE_ROLE_KEY;
process.env.ADMIN_API_KEY ||= process.env.ADMIN_API_KEY;