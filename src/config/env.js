import dotenv from "dotenv";
dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 4000),
  jwt: {
    secret: process.env.JWT_SECRET || "dev_secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  },
};
