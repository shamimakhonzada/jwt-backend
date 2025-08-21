import { z } from "zod";
import { catchAsync } from "../utils/catchAsync.js";
import { validate } from "../middlewares/validate.js";
import * as service from "../services/auth.service.js";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().email(),
    password: z.string().min(6).max(128),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(128),
  }),
});

export const register = [
  validate(registerSchema),
  catchAsync(async (req, res) => {
    const { user, token } = await service.register(req.validated.body);
    res.status(201).json({ message: "Registered", user, token });
  }),
];

export const login = [
  validate(loginSchema),
  catchAsync(async (req, res) => {
    const { user, token } = await service.login(req.validated.body);
    res.json({ message: "Logged in", user, token });
  }),
];
