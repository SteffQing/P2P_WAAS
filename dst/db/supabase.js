"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var supabase_js_1 = require("@supabase/supabase-js");
var config_1 = require("../constants/config");
var SupabaseInstance = (0, supabase_js_1.createClient)((0, config_1.getEnvVariable)("SUPABASE_URL"), (0, config_1.getEnvVariable)("SUPABASE_KEY"));
exports.default = SupabaseInstance;
