import { database } from "./__loaddatabase.js";

const users = database.collection('users');

export async function getUser(name) {
    return await users.findOne({ username: name });
}

export async function addUser(user) {
    await users.insertOne(user);
}
