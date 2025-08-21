import { catchAsync } from "../utils/catchAsync.js";
import * as service from "../services/user.service.js";

export const me = [
  catchAsync(async (req, res) => {
    const user = await service.getMe(req.user.id);
    res.json({ user });
  }),
];

export const list = [
  catchAsync(async (req, res) => {
    const users = await service.listUsers();
    res.json({ users });
  }),
];
