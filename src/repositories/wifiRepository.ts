import prisma from '../database.js';

export interface Wifi {
    ssid: string;
    password: string;
    label : string;
}

export async function createWifi(wifi: Wifi, userId: number) {
    await prisma.wifi.create({
        data: {
            ssid: wifi.ssid,
            label: wifi.label,
            password: wifi.password,
            userId: userId,
        },
    });
}

export async function checkWifi(ssid: string, userId: number) {
    return await prisma.wifi.findFirst({
        where: {
            ssid: ssid,
            userId: userId,
        }
    });
}

export async function getWifiById(id: number) {
    return await prisma.wifi.findFirst({
        where: {
            id: id,
        }
    });
}

export async function getAllWifis(userId: number) {
    return await prisma.wifi.findMany({
        where: {
            userId: userId,
        }
    });
}

export async function deleteWifi(id: number) {
    return await prisma.wifi.delete({
        where: {
            id: id,
        }
    });
}