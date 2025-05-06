import fs from 'fs';
import path from 'path';

// Path to the users.json file
const usersFilePath = 'users.json';

// Function to read and parse users.json into a JS object
function getUsers() {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        const users = JSON.parse(data);
        return users;
    } catch (error) {
        console.error('Error reading or parsing users.json:', error);
        return null;
    }
}

function checkUserExists(username) {
    const users = getUsers();
    if (!users) return false;
    return Object.keys(users).includes(username);
}

// Example usage
const users = getUsers();
export default { users, checkUserExists };
export { users, checkUserExists };