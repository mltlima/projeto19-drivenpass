import { Request, Response } from 'express';
import Cryptr from 'cryptr';

import * as credentialService from '../services/credentialService.js';

const cryptr = new Cryptr(process.env.SECRET_KEY!);

export async function newCredential(req: Request, res: Response) {
    const { url, username, password, name } = req.body;
    const { user } = JSON.parse(JSON.stringify(res.locals));
    
    const encryptedPassword = cryptr.encrypt(password);
    const credential = {url, username, password: encryptedPassword, name};

    await credentialService.createCredential(credential, user.userId);

    res.sendStatus(201);
}

export async function getCredentialById(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    const credential = await credentialService.getCredentialById(Number(id), user.userId);
    credential!.password = cryptr.decrypt(credential!.password);

    res.status(200).send(credential);
}

export async function getAllCredentials(req: Request, res: Response) {
    const { user } = JSON.parse(JSON.stringify(res.locals));

    const credentials = await credentialService.getAllCredentials(user.userId);
    credentials.forEach(credential => {
        credential.password = cryptr.decrypt(credential.password);
    });

    res.status(200).send(credentials);
}