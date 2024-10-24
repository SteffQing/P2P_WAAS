import { createClient } from "@supabase/supabase-js";
import { getEnvVariable } from "../constants/config";

const SupabaseInstance = createClient<Database>(
  getEnvVariable("SUPABASE_URL"),
  getEnvVariable("SUPABASE_KEY")
);

export default SupabaseInstance;
