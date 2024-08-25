import { database } from "./__loaddatabase.js";

const todos = database.todos;

export function getList() {
    return todos;
}
