import "dotenv/config";

export const PORT = Number(process.env.BACKEND_PORT_INTERNAL) || 4000;
export const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
