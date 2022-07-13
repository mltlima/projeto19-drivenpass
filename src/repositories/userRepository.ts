import prisma from '../database.js';

export interface User {
    email: string;
    password: string;
}


export async function getUserByEmail(email: string) {
    return prisma.user.findFirst({
        where: {
            email
        }
    });
}

export async function createNewUser(email: string, password: string) {
    return prisma.user.create({
        data: {
            email,
            password,
        },
    });
}

export async function getUserById(id: number) {
    return prisma.user.findFirst({
        where: {
            id
        }
    });
}


