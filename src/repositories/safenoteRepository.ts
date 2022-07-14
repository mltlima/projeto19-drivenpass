import prisma from '../database.js';

export interface Safenote {
    title: string;
    content: string;
}

export async function createSafenote(safenote: Safenote, userId: number) {
    await prisma.safeNote.create({
        data: {
            title: safenote.title,
            content: safenote.content,
            userId: userId
        },
    });
}

export async function getSafenoteById(id: number) {
    return await prisma.safeNote.findFirst({
        where: {
            id
        }
    });
}

export async function getAllSafenotes(userId: number) {
    return await prisma.safeNote.findMany({
        where: {
            userId: userId
        }
    });
}

export async function checkSafenote(title: string, userId: number) {
    return await prisma.safeNote.findFirst({
        where: {
            title: title,
            userId: userId
        }
    });
}

export async function deleteSafenote(id: number) {
    return await prisma.safeNote.delete({
        where: {
            id
        }
    });
}