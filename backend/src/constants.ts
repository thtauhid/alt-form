import "dotenv/config";

export const PORT = Number(process.env.BACKEND_PORT_INTERNAL) || 4000;
