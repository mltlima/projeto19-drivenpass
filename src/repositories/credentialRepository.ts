import prisma from '../database.js';

export interface Credential {
    url: string;
    username: string;
    password: string;
    name: string;
}

export async function checkCredential(name: string, userId: number) {
    return await prisma.credential.findFirst({
        where: {
            name: name,
            userId: userId
        }
    });
}

export async function getCredentialById(id: number) {
    return await prisma.credential.findFirst({
        where: {
            id
        }
    });
}

export async function getAllCredentials(userId: number) {
    return await prisma.credential.findMany({
        where: {
            userId
        }
    });
}

export async function deleteCredential(id: number) {
    return await prisma.credential.delete({
        where: {
            id
        }
    });
}

export async function createCredential(credential: Credential, userId: number) {
    await prisma.credential.create({
        data: {
            url: credential.url,
            username: credential.username,
            password: credential.password,
            name: credential.name,
            userId: userId
        },
    });
}