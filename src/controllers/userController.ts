import { Request, Response } from 'express';

import * as userService from '../services/userService.js';

export async function signUp(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userService.signUp(email, password);
    res.sendStatus(201);
}