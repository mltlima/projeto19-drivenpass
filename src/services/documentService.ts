import * as documentRepository from '../repositories/documentRepository.js';

export async function createDocument(document: documentRepository.Document, userId: number) {
    const existingDocument = await documentRepository.checkDocument(document.type, userId);
    if (existingDocument) {
        throw new Error('Document already exists');
    }

    await documentRepository.createDocument(document, userId);
}

export async function getDocumentById(id: number, userId: number) {
    const document = await documentRepository.getDocumentById(id);
    if (!document) {
        throw new Error('Document not found');
    }

    if(document.userId !== userId) {
        throw new Error('Document belongs to another user');
    }

    return document;
}

export async function getAllDocuments(userId: number) {
    return await documentRepository.getAllDocuments(userId);
}

export async function deleteDocument(id: number, userId: number) {
    const document = await documentRepository.getDocumentById(id);
    if (!document) {
        throw new Error('Document not found');
    }

    if(document.userId !== userId) {
        throw new Error('Document belongs to another user');
    }

    await documentRepository.deleteDocument(id);
}