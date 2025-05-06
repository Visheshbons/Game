import fs from 'fs';
import path from 'path';
import { app, port, cookieParser, chalk, express } from './appConfig.js';

const usersFilePath = 'users.json';

function getUsers() {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing users.json:', error);
        return null;
    }
}

function checkUserExists(username) {
    const users = getUsers();
    if (!users) return false;

    const target = username.trim().toLowerCase();
    return Object.values(users).some(user => user.name.toLowerCase() === target);
}

function setupUserRoutes(app) {
    app.get('/user', (req, res) => {
        const username = req.query.name;
        if (!username) {
            return res.status(400).send('Name query parameter is required');
        }
        if (checkUserExists(username)) {
            res.status(200).send(`User ${username} exists` );
        } else {
            res.status(404).send(`User ${username} not found`);
        }
    });
}

const users = getUsers();
export { setupUserRoutes, users, checkUserExists };