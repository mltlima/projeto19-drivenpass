import { Request, Response } from 'express';

import * as documentService from '../services/documentService.js';

export async function newDocument(req: Request, res: Response) {
    const {fullName, emissionDate, expiryDate, registrationNumber, issuingAuthority, documentTypes, type} = req.body;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    const document = {fullName, emissionDate, expiryDate, registrationNumber, issuingAuthority, documentTypes, type};

    await documentService.createDocument(document, user.userId);

    res.sendStatus(201);
}

export async function getDocumentById(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    const document = await documentService.getDocumentById(Number(id), user.userId);

    res.status(200).send(document);
}

export async function getAllDocuments(req: Request, res: Response) {
    const { user } = JSON.parse(JSON.stringify(res.locals));

    const documents = await documentService.getAllDocuments(user.userId);

    res.status(200).send(documents);
}

export async function deleteDocument(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    await documentService.deleteDocument(Number(id), user.userId);

    res.sendStatus(200);
}