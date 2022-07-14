import Cryptr from 'cryptr';

import * as wifiRepository from '../repositories/wifiRepository.js';

const cryptr = new Cryptr(process.env.SECRET_KEY!);

export async function createWifi(wifi: wifiRepository.Wifi, userId: number) {
    const existingWifi = await wifiRepository.checkWifi(wifi.ssid, userId);
    if (existingWifi) {
        throw new Error('Wifi already exists');
    }

    const encryptedPassword = cryptr.encrypt(wifi.password);
    wifi.password = encryptedPassword;

    await wifiRepository.createWifi(wifi, userId);
}

export async function getWifiById(id: number, userId: number) {
    const wifi = await wifiRepository.getWifiById(id);
    if (!wifi) {
        throw new Error('Wifi not found');
    }

    if (wifi.userId !== userId) {
        throw new Error('Wifi belongs to another user');
    }

    return wifi;
}

export async function getAllWifis(userId: number) {
    return await wifiRepository.getAllWifis(userId);
}

export async function deleteWifi(id: number, userId: number) {
    const wifi = await wifiRepository.getWifiById(id);
    if (!wifi) {
        throw new Error('Wifi not found');
    }

    if (wifi.userId !== userId) {
        throw new Error('Wifi belongs to another user');
    }

    await wifiRepository.deleteWifi(id);
}