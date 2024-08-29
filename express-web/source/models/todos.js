import { database } from "./_loaddatabase.js";
const todos = database.todos;
export function getList() {
    return todos;
}