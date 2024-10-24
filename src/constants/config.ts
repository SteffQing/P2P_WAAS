import dotenv from "dotenv";

dotenv.config();

export function getEnvVariable(variableName: string) {
  const value = process.env[variableName];
  if (value === undefined) {
    throw new Error(`Environment variable ${variableName} is not defined`);
  }
  return value;
}
