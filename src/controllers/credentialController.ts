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