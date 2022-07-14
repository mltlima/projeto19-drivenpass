

import * as credentialRepository from '../repositories/credentialRepository.js';

export async function createCredential( credential: credentialRepository.Credential, userId: number ) {
    const existingCredential = await credentialRepository.checkCredential(credential.name, userId);
    if (existingCredential) {
        throw new Error('Credential already exists');
    }

    await credentialRepository.createCredential(credential, userId);
}