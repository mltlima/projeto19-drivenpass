import { Request, Response } from 'express';
import Cryptr from 'cryptr';

import * as wifiService from '../services/wifiService.js';

const cryptr = new Cryptr(process.env.SECRET_KEY!);

export async function newWifi(req: Request, res: Response) {
    const { label, ssid, password, type } = req.body;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    const wifi = { label, ssid, password, type };

    await wifiService.createWifi(wifi, user.userId);

    res.sendStatus(201);
}

export async function getWifiById(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    const wifi = await wifiService.getWifiById(Number(id), user.userId);
    wifi!.password = cryptr.decrypt(wifi!.password);

    res.status(200).send(wifi);
}

export async function getAllWifis(req: Request, res: Response) {
    const { user } = JSON.parse(JSON.stringify(res.locals));

    const wifis = await wifiService.getAllWifis(user.userId);
    wifis.forEach(wifi => {
        wifi.password = cryptr.decrypt(wifi.password);
    });

    res.status(200).send(wifis);
}

export async function deleteWifi(req: Request, res: Response) {
    const { id } = req.params;
    const { user } = JSON.parse(JSON.stringify(res.locals));

    await wifiService.deleteWifi(Number(id), user.userId);

    res.sendStatus(200);
}