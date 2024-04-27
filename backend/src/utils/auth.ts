import "dotenv/config";

import jwt from "jsonwebtoken";
import { AuthUser } from "../types";

/**
 * Generates a JWT token
 * @param params Params(id, acc_type, name) for JWT
 * @returns JWT token
 */
const generateJWT = (params: AuthUser) => {
  return jwt.sign(params, process.env.TOKEN_KEY!, {
    expiresIn: "365d",
  });
};

/**
 * Generates a 6 digit OTP
 * @returns 6 digit OTP
 */
const generateOTP = () => {
  console.log("Generating OTP...");
  const otp = Math.floor(100000 + Math.random() * 900000);

  console.log(`OTP generated: ${otp}`);
  return otp;
};

export { generateJWT, generateOTP };
