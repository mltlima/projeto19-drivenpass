import bcrypt from "bcrypt";

import * as userRepository from '../repositories/userRepository.js';

export async function signUp(email: string, password: string) {
    const passwordHash = bcrypt.hashSync(password, 10);

    const user = await userRepository.getUserByEmail(email);
    if (user) {
        throw new Error('Email already exists');
    }

    await userRepository.createNewUser(email, passwordHash);
}