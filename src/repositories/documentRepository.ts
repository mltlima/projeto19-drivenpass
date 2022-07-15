import prisma from '../database.js';
import { documentTypes } from '@prisma/client';

export interface Document {
    fullName: string;
    emissionDate: string;
    expiryDate: string;
    registrationNumber: string;
    issuingAuthority: string;
    type: documentTypes;
}

export async function createDocument(document: Document, userId: number) {
    await prisma.document.create({
        data: {
            fullName: document.fullName,
            emissionDate: document.emissionDate,
            expiryDate: document.expiryDate,
            registrationNumber: document.registrationNumber,
            issuingAuthority: document.issuingAuthority,
            type: document.type,
            userId: userId,
        },
    });
}

export async function checkDocument(type: documentTypes, userId: number) {
    return await prisma.document.findFirst({
        where: {
            type: type,
            userId: userId,
        }
    });
}

export async function getDocumentById(id: number) {
    return await prisma.document.findFirst({
        where: {
            id: id,
        }
    });
}

export async function getAllDocuments(userId: number) {
    return await prisma.document.findMany({
        where: {
            userId: userId,
        }
    });
}

export async function deleteDocument(id: number) {
    return await prisma.document.delete({
        where: {
            id: id,
        }
    });
}