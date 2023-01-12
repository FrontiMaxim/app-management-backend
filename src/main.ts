import express, { Express } from 'express';
import { json } from 'body-parser';
import { config } from 'dotenv';
import userController from './user/user.controller';
import { authorisation } from './middleware/authorisation';
import loginController from './login/login.controller';
import sessionController from './session/session.controller';
import path from 'path';

config();

const app: Express = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const LOGIN_PATH = '/login';
const USER_PATH = '/user';
const SESSION_PATH = '/session';


//app.use('/avatars', express.static(path.join(__dirname, 'public', 'avatars')));

app.use(json());

app.use(LOGIN_PATH, loginController);

app.use(authorisation);

app.use(SESSION_PATH, sessionController);

app.use(USER_PATH, userController);

app.listen(PORT, () => {
    console.log(`Сервер запущен на порте: ${PORT}`);
});

