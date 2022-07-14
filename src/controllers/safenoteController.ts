import { Request, Response } from 'express';

import * as safenoteService from '../services/safenoteService.js';

export async function newSafenote(req: Request, res: Response) {
    const { title, content } = req.body;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    const safenote = {title, content};

    await safenoteService.createSafenote(safenote, user.userId);

    res.sendStatus(201);
}

export async function getSafenoteById(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    const safenote = await safenoteService.getSafenoteById(Number(id), user.userId);

    res.status(200).send(safenote);
}

export async function getAllSafenotes(req: Request, res: Response) {
    const { user } = JSON.parse(JSON.stringify(res.locals));

    const safenotes = await safenoteService.getAllSafenotes(user.userId);

    res.status(200).send(safenotes);
}

export async function deleteSafenote(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    await safenoteService.deleteSafenote(Number(id), user.userId);

    res.sendStatus(200);
}