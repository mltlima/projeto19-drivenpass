import Cryptr from 'cryptr';

import * as cardRepository from '../repositories/cardRepository.js';

const cryptr = new Cryptr(process.env.SECRET_KEY!);

export async function createCard(card: cardRepository.Card, userId: number) {
    const existingCard = await cardRepository.checkCard(card.label, userId);
    if (existingCard) {
        throw new Error('Card already exists');
    }

    const encryptedPassword = cryptr.encrypt(card.password);
    card.password = encryptedPassword;

    const encryptedCVV = cryptr.encrypt(card.securityCode);
    card.securityCode = encryptedCVV;

    await cardRepository.createCard(card, userId);
}

export async function getCardById(id: number, userId: number) {
    const card = await cardRepository.getCardById(id);
    if (!card) {
        throw new Error('Card not found');
    }

    if (card.userId !== userId) {
        throw new Error('Card belongs to another user');
    }

    return card;
}

export async function getAllCards(userId: number) {
    return await cardRepository.getAllCards(userId);
}

export async function deleteCard(id: number, userId: number) {
    const card = await cardRepository.getCardById(id);
    if (!card) {
        throw new Error('Card not found');
    }

    if (card.userId !== userId) {
        throw new Error('Card belongs to another user');
    }

    await cardRepository.deleteCard(id);
}