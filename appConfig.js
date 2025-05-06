import express from 'express';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import { users, checkUserExists } from './userHandler.js';

const app = express();
const port = process.env.PORT || 3000;

export { app, port, cookieParser, chalk, express, users, };