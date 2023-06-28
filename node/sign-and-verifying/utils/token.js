// Load environment variables
import * as dotenv from "dotenv";
dotenv.config();

import fs from "node:fs";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET;
const PRIVATE_KEY_PATH=process.env.PRIVATE_KEY_PATH;
const PUBLIC_KEY_PATH=process.env.PUBLIC_KEY_PATH;
const ONE_MINUTE_IN_MILLISECONDS = 60 * 1000

export const signToken = (user) => {
  const payload = {
    sub: user.id,
    name: user.fullname,
    exp: Date.now() + ONE_MINUTE_IN_MILLISECONDS,
  };

  if(PRIVATE_KEY_PATH){
    const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
    return jwt.sign(payload, privateKey, { algorithm: "RS256" });
  }

  return jwt.sign(payload, SECRET)
};

export const verifyToken = (token) => {
  if(PRIVATE_KEY_PATH){
    const publicKey = fs.readFileSync(PUBLIC_KEY_PATH, 'utf8');
    return jwt.verify(token, publicKey)  
  }
  let data = jwt.verify(token,SECRET)
  return data
};

export const validateExpiration = (payload) => {
  if (Date.now() > payload.exp) {
    throw new Error("Token expired");
  }
};
