import * as credentialRepository from '../repositories/credentialRepository.js';

export async function createCredential( credential: credentialRepository.Credential, userId: number ) {
    const existingCredential = await credentialRepository.checkCredential(credential.name, userId);
    if (existingCredential) {
        throw new Error('Credential already exists');
    }

    await credentialRepository.createCredential(credential, userId);
}

export async function getCredentialById(id: number, userId: number) {
    const credential = await credentialRepository.getCredentialById(id);
    if (!credential) {
        throw new Error('Credential not found');
    }

    if (credential.userId !== userId) {
        throw new Error('Credential belongs to another user');
    }

    return await credentialRepository.getCredentialById(id);
}

export async function getAllCredentials(userId: number) {
    return await credentialRepository.getAllCredentials(userId);
}

export async function deleteCredential(id: number, userId: number) {
    const credential = await credentialRepository.getCredentialById(id);
    if (!credential) {
        throw new Error('Credential not found');
    }

    if (credential.userId !== userId) {
        throw new Error('Credential belongs to another user');
    }

    await credentialRepository.deleteCredential(id);
}