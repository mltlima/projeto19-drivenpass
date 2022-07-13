import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'

import * as userService from '../services/userService.js';

export async function signUp(req: Request, res: Response) {
    const { email, password } = req.body;
    await userService.signUp(email, password);
    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await userService.signIn(email, password);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN!);

    res.status(200).send({token});
}