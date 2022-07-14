import dayjs from 'dayjs';
import { cardTypes } from '@prisma/client';
import prisma from '../database.js';

export interface Card {
    label: string;
    number: string;
    nameInCard: string;
    securityCode: string;
    expirationDate: string;
    password: string;
    isVirtual: boolean;
    type: cardTypes;
}

export async function createCard(card: Card, userId: number) {
    await prisma.card.create({
        data: {
            label: card.label,
            number: card.number,
            nameInCard: card.nameInCard,
            securityCode: card.securityCode,
            expiryDate: card.expirationDate,
            password: card.password,
            isVirtual: card.isVirtual,
            type: card.type,
            userId: userId,
        },
    });
}

export async function checkCard(label: string, userId: number) {
    return await prisma.card.findFirst({
        where: {
            label: label,
            userId: userId,
        }
    });
}

export async function getCardById(id: number) {
    return await prisma.card.findFirst({
        where: {
            id: id,
        }
    });
}

export async function getAllCards(userId: number) {
    return await prisma.card.findMany({
        where: {
            userId: userId,
        }
    });
}

export async function deleteCard(id: number) {
    return await prisma.card.delete({
        where: {
            id: id,
        }
    });
}