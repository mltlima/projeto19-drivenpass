import { Request, Response } from 'express';
import Cryptr from 'cryptr';

import * as cardService from '../services/cardService.js';

const cryptr = new Cryptr(process.env.SECRET_KEY!);

export async function newCard(req: Request, res: Response) {
    const { label, number, nameInCard, securityCode, expirationDate, password, isVirtual, type } = req.body;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    const card = { label, number, nameInCard, securityCode, expirationDate, password, isVirtual, type };

    await cardService.createCard(card, user.userId);

    res.sendStatus(201);
}

export async function getCardById(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    const card = await cardService.getCardById(Number(id), user.userId);
    card!.password = cryptr.decrypt(card!.password);
    card!.securityCode = cryptr.decrypt(card!.securityCode);

    res.status(200).send(card);
}

export async function getAllCards(req: Request, res: Response) {
    const { user } = JSON.parse(JSON.stringify(res.locals));

    const cards = await cardService.getAllCards(user.userId);
    cards.forEach(card => {
        card.password = cryptr.decrypt(card.password);
        card.securityCode = cryptr.decrypt(card.securityCode);
    });

    res.status(200).send(cards);
}

export async function deleteCard(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    await cardService.deleteCard(Number(id), user.userId);

    res.sendStatus(200);
}