import * as safenoteRepository from '../repositories/safenoteRepository.js';

export async function createSafenote(safenote: safenoteRepository.Safenote, userId: number) {
    const existingSafenote = await safenoteRepository.checkSafenote(safenote.title, userId);
    if (existingSafenote) {
        throw new Error('Safenote already exists');
    }

    await safenoteRepository.createSafenote(safenote, userId);
}

export async function getSafenoteById(id: number, userId: number) {
    const safenote = await safenoteRepository.getSafenoteById(id);
    if (!safenote) {
        throw new Error('Safenote not found');
    }

    if(safenote.userId !== userId) {
        throw new Error('Safenote belongs to another user');
    }

    return safenote;
}

export async function getAllSafenotes(userId: number) {
    return await safenoteRepository.getAllSafenotes(userId);
}

export async function deleteSafenote(id: number, userId: number) {
    const safenote = await safenoteRepository.getSafenoteById(id);
    if (!safenote) {
        throw new Error('Safenote not found');
    }

    if (safenote.userId !== userId) {
        throw new Error('Safenote belongs to another user');
    }

    await safenoteRepository.deleteSafenote(id);
}