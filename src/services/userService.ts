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

export async function signIn(email: string, password: string) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
        throw new Error('Invalid password');
    }

    return user;
}